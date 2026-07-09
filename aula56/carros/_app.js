const express = require('express');
const pool = require('./database/database');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de carros funcionando',
    });
});

app.get('/carros', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT id, placa, modelo, marca, ano
            FROM carros
            ORDER BY id ASC
        `);

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar carros',
        });
    }
});

app.post('/carros', async (req, res) => {
    const { placa, modelo, marca, ano } = req.body;

    if (!placa || !modelo || !marca || !ano) {
        return res.status(400).json({
            erro: 'Placa, modelo, marca e ano são obrigatórios',
        });
    }

    try {
        const resultado = await pool.query(
            `
            INSERT INTO carros (placa, modelo, marca, ano)
            VALUES ($1, $2, $3, $4)
            RETURNING id, placa, modelo, marca, ano
            `,
            [placa.trim().toUpperCase(), modelo.trim(), marca.trim(), ano],
        );

        res.status(201).json({
            mensagem: 'Carro cadastrado com sucesso',
            carro: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23505') {
            return res.status(409).json({
                erro: 'Já existe um carro cadastrado com esta placa',
            });
        }

        res.status(500).json({
            erro: 'Erro ao cadastrar carro',
        });
    }
});

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`Servidor de carros rodando na porta ${porta}`);
});
