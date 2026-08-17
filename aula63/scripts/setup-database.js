import 'dotenv/config';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;

const raizProjeto = join(dirname(fileURLToPath(import.meta.url)), '..');

const nomeBanco = process.env.DB_NAME;
const forcarRecriacao = process.argv.includes('--force');

const configuracao = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

if (!nomeBanco) {
    throw new Error('DB_NAME não foi definido no arquivo .env.');
}

if (!/^[a-zA-Z0-9_]+$/.test(nomeBanco)) {
    throw new Error('DB_NAME deve conter somente letras, números e underline.');
}

async function criarBanco() {
    const cliente = new Client({
        ...configuracao,
        database: 'postgres',
    });

    await cliente.connect();

    try {
        const resultado = await cliente.query('SELECT 1 FROM pg_database WHERE datname = $1', [
            nomeBanco,
        ]);

        const bancoExiste = resultado.rowCount > 0;

        if (bancoExiste && !forcarRecriacao) {
            console.log(`Banco "${nomeBanco}" já existe.`);
            console.log('Use npm run db:reset para recriá-lo.');
            return false;
        }

        if (bancoExiste) {
            await cliente.query(
                `SELECT pg_terminate_backend(pid)
         FROM pg_stat_activity
         WHERE datname = $1 AND pid <> pg_backend_pid()`,
                [nomeBanco],
            );

            await cliente.query(`DROP DATABASE "${nomeBanco}"`);
            console.log(`Banco "${nomeBanco}" removido.`);
        }

        await cliente.query(`CREATE DATABASE "${nomeBanco}"`);
        console.log(`Banco "${nomeBanco}" criado.`);

        return true;
    } finally {
        await cliente.end();
    }
}

async function executarPasta(cliente, pasta) {
    const caminhoPasta = join(raizProjeto, pasta);

    if (!existsSync(caminhoPasta)) {
        console.log(`Pasta ${pasta} não encontrada. Ignorando.`);
        return;
    }

    const arquivos = readdirSync(caminhoPasta)
        .filter((arquivo) => arquivo.endsWith('.sql'))
        .sort();

    if (arquivos.length === 0) {
        console.log(`Nenhum script encontrado em ${pasta}.`);
        return;
    }

    for (const arquivo of arquivos) {
        const caminhoArquivo = join(caminhoPasta, arquivo);
        const sql = readFileSync(caminhoArquivo, 'utf8');

        console.log(`Executando: ${pasta}/${arquivo}`);
        await cliente.query(sql);
    }
}

async function configurarBanco() {
    const bancoCriado = await criarBanco();

    if (!bancoCriado) return;

    const cliente = new Client({
        ...configuracao,
        database: nomeBanco,
    });

    await cliente.connect();

    try {
        await executarPasta(cliente, 'database/tables');
        await executarPasta(cliente, 'database/seeds');

        console.log('Banco configurado com sucesso.');
    } finally {
        await cliente.end();
    }
}

configurarBanco().catch((erro) => {
    console.error('Erro ao configurar o banco:');
    console.error(erro.message);
    process.exit(1);
});
