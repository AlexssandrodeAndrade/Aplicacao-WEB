const express = require('express');
const pool = require('./database');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
    res.json({
        mensagem: 'API de lista de compras funcionando',
    });
});

function validarId(id) {
    const numero = Number(id);

    return Number.isInteger(numero) && numero > 0;
}

app.get('/compras', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT id, nome, comprado, criado_em
            FROM compras
            ORDER BY id ASC
        `);

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar lista de compras',
        });
    }
});

app.get('/compras/:id', async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({
            erro: 'ID inválido',
        });
    }

    try {
        const resultado = await pool.query(
            `
            SELECT id, nome, comprado, criado_em
            FROM compras
            WHERE id = $1
            `,
            [id],
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                erro: 'Item não encontrado',
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar item',
        });
    }
});

app.post('/compras', async (req, res) => {
    const { nome, comprado } = req.body;

    if (!validarNome(nome)) {
        return res.status(400).json({
            erro: 'Nome do item é obrigatório',
        });
    }

    if (comprado !== undefined && !validarBoolean(comprado)) {
        return res.status(400).json({
            erro: 'O campo comprado deve ser true ou false',
        });
    }

    try {
        const resultado = await pool.query(
            `
            INSERT INTO compras (nome, comprado)
            VALUES ($1, $2)
            RETURNING id, nome, comprado, criado_em
            `,
            [nome.trim(), comprado ?? false],
        );

        res.status(201).json({
            mensagem: 'Item cadastrado com sucesso',
            item: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar item',
        });
    }
});

app.put('/compras/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, comprado } = req.body;

    if (!validarId(id)) {
        return res.status(400).json({
            erro: 'ID inválido',
        });
    }

    if (!validarNome(nome)) {
        return res.status(400).json({
            erro: 'Nome do item é obrigatório',
        });
    }

    if (!validarBoolean(comprado)) {
        return res.status(400).json({
            erro: 'O campo comprado deve ser true ou false',
        });
    }

    try {
        const resultado = await pool.query(
            `
            UPDATE compras
            SET nome = $1,
                comprado = $2
            WHERE id = $3
            RETURNING id, nome, comprado, criado_em
            `,
            [nome.trim(), comprado, id],
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                erro: 'Item não encontrado',
            });
        }

        res.json({
            mensagem: 'Item alterado com sucesso',
            item: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao alterar item',
        });
    }
});

app.delete('/compras/:id', async (req, res) => {
    const { id } = req.params;

    if (!validarId(id)) {
        return res.status(400).json({
            erro: 'ID inválido',
        });
    }

    try {
        const resultado = await pool.query(
            `
            DELETE FROM compras
            WHERE id = $1
            RETURNING id, nome, comprado, criado_em
            `,
            [id],
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                erro: 'Item não encontrado',
            });
        }

        res.json({
            mensagem: 'Item deletado com sucesso',
            item: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao deletar item',
        });
    }
});

function validarNome(nome) {
    return typeof nome === 'string' && nome.trim() !== '';
}

function validarBoolean(valor) {
    return typeof valor === 'boolean';
}

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`Servidor de compras rodando na porta ${porta}`);
});
