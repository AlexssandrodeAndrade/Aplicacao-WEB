import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import pg from 'pg';

const { Client } = pg;

const pastaAtual = dirname(fileURLToPath(import.meta.url));
const raizProjeto = join(pastaAtual, '..');
const caminhoEnv = join(raizProjeto, '.env');
const caminhoEnvExemplo = join(raizProjeto, '.env.example');

const existeEnv = existsSync(caminhoEnv);
const arquivoEnv = existeEnv ? caminhoEnv : caminhoEnvExemplo;
const argumentos = process.argv.slice(2);
const usarForce = argumentos.includes('--force');
const mostrarAjuda = argumentos.includes('--help') || argumentos.includes('-h');
const argumentosPermitidos = new Set(['--force', '--help', '-h']);

const argumentosInvalidos = argumentos.filter(
  (argumento) => !argumentosPermitidos.has(argumento)
);

if (argumentosInvalidos.length > 0) {
  console.error(`Argumentos invalidos: ${argumentosInvalidos.join(', ')}`);
  console.error('Use --help para ver as opcoes disponiveis.');
  process.exit(1);
}

if (mostrarAjuda) {
  console.log(`
Uso:
  npm run db:setup
  npm run db:reset

Opcoes:
  --force   Apaga e recria o banco configurado em DB_NAME.
`);
  process.exit(0);
}

if (existsSync(arquivoEnv)) {
  dotenv.config({ path: arquivoEnv });
}

const nomeBanco = process.env.DB_NAME?.trim() || 'lanchonete';
const senhaBanco = process.env.DB_PASSWORD?.trim();

const conexaoBase = {
  host: process.env.DB_HOST?.trim() || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER?.trim() || 'postgres'
};

if (senhaBanco && senhaBanco !== 'sua_senha') {
  conexaoBase.password = senhaBanco;
}

if (!Number.isInteger(conexaoBase.port) || conexaoBase.port <= 0) {
  throw new Error('DB_PORT precisa ser um numero valido.');
}

function escaparIdentificador(valor) {
  if (!valor || valor.includes('\0')) {
    throw new Error('DB_NAME invalido.');
  }

  return `"${valor.replaceAll('"', '""')}"`;
}

function validarBancoAlvo() {
  const bancosProtegidos = new Set(['postgres', 'template0', 'template1']);

  if (bancosProtegidos.has(nomeBanco.toLowerCase())) {
    throw new Error(`DB_NAME nao pode ser "${nomeBanco}". Escolha outro banco.`);
  }
}

async function bancoExiste(cliente) {
  const resultado = await cliente.query(
    'SELECT 1 FROM pg_database WHERE datname = $1',
    [nomeBanco]
  );

  return resultado.rowCount > 0;
}

async function derrubarConexoesBanco(cliente) {
  await cliente.query(
    `
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1
        AND pid <> pg_backend_pid()
    `,
    [nomeBanco]
  );
}

async function prepararBanco() {
  validarBancoAlvo();

  const cliente = new Client({
    ...conexaoBase,
    database: 'postgres'
  });

  await cliente.connect();

  try {
    const existeBanco = await bancoExiste(cliente);

    if (usarForce && existeBanco) {
      console.log(`Apagando banco "${nomeBanco}" por causa do --force...`);
      await derrubarConexoesBanco(cliente);
      await cliente.query(`DROP DATABASE ${escaparIdentificador(nomeBanco)}`);
    } else if (existeBanco) {
      console.log(`Banco "${nomeBanco}" ja existe. Nada foi alterado.`);
      console.log('Para recriar tudo do zero, rode: npm run db:reset');
      return false;
    }

    await cliente.query(`CREATE DATABASE ${escaparIdentificador(nomeBanco)}`);
    console.log(`Banco "${nomeBanco}" criado.`);
    return true;
  } finally {
    await cliente.end();
  }
}

async function executarScript(cliente, caminhoRelativo) {
  const caminhoCompleto = join(raizProjeto, caminhoRelativo);

  if (!existsSync(caminhoCompleto)) {
    throw new Error(`Script nao encontrado: ${caminhoRelativo}`);
  }

  const sql = readFileSync(caminhoCompleto, 'utf8').trim();

  if (!sql) {
    console.log(`Script vazio ignorado: ${caminhoRelativo}`);
    return;
  }

  console.log(`Executando script: ${caminhoRelativo}`);
  await cliente.query(sql);
}

function listarArquivosSql(caminhoRelativoPasta, obrigatorio = true) {
  const pastaCompleta = join(raizProjeto, caminhoRelativoPasta);

  if (!existsSync(pastaCompleta)) {
    if (obrigatorio) {
      throw new Error(`Pasta ${caminhoRelativoPasta} nao encontrada.`);
    }

    return [];
  }

  const arquivosSql = readdirSync(pastaCompleta)
    .filter((arquivo) => arquivo.toLowerCase().endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b));

  if (obrigatorio && arquivosSql.length === 0) {
    throw new Error(`Nenhum script .sql encontrado em ${caminhoRelativoPasta}.`);
  }

  return arquivosSql.map((arquivo) => join(caminhoRelativoPasta, arquivo));
}

async function executarGrupoScripts(cliente, nomeGrupo, pasta, obrigatorio) {
  const arquivos = listarArquivosSql(pasta, obrigatorio);

  if (arquivos.length === 0) {
    console.log(`Nenhum script encontrado em ${pasta}.`);
    return;
  }

  console.log(`Executando ${nomeGrupo}:`);

  for (const arquivo of arquivos) {
    await executarScript(cliente, arquivo);
  }
}

async function executarScriptsDoBanco() {
  const cliente = new Client({
    ...conexaoBase,
    database: nomeBanco
  });

  await cliente.connect();

  try {
    await executarGrupoScripts(cliente, 'criacao de tabelas', 'database/tables', true);
    await executarGrupoScripts(cliente, 'dados de teste', 'database/seeds', false);
  } finally {
    await cliente.end();
  }
}

async function main() {
  if (existeEnv) {
    console.log('Arquivo .env encontrado. Usando dados dele.');
  } else {
    console.log('Arquivo .env nao encontrado. Usando valores padrao do projeto.');
  }

  if (usarForce) {
    console.log('Modo --force ativo. O banco sera recriado do zero.');
  }

  const deveExecutarScripts = await prepararBanco();

  if (!deveExecutarScripts) {
    return;
  }

  await executarScriptsDoBanco();

  console.log('Banco criado e configurado com sucesso.');
}

main().catch((erro) => {
  console.error('Nao foi possivel configurar o banco.');
  console.error(erro.message);

  if (!existeEnv || senhaBanco === 'sua_senha') {
    console.error('Confira o arquivo .env e coloque a senha correta do PostgreSQL.');
  }

  process.exit(1);
});
