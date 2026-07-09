import express from 'express';

import pool from '../../database.js';

const router = express.Router();

function obterId(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
            erro: 'ID inválido',
        });

        return null;
    }

    return id;
}

function validarCarro({ modelo, marca_id, ano }) {
    if (!modelo || modelo.trim() === '') {
        return 'Modelo é obrigatório';
    }

    if (!marca_id) {
        return 'Marca é obrigatória';
    }

    const marcaIdNumero = Number(marca_id);

    if (!Number.isInteger(marcaIdNumero) || marcaIdNumero <= 0) {
        return 'Marca inválida';
    }

    if (!ano) {
        return 'Ano é obrigatório';
    }

    const anoNumero = Number(ano);

    if (!Number.isInteger(anoNumero) || anoNumero < 1900) {
        return 'Ano inválido';
    }

    return null;
}

router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(`
      SELECT
        c.id,
        c.modelo,
        c.marca_id,
        m.nome AS marca_nome,
        c.ano
      FROM carros c
      INNER JOIN marcas m ON m.id = c.marca_id
      ORDER BY c.id ASC
    `);

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar lista de carros',
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = obterId(req, res);

    if (!id) {
        return;
    }

    try {
        const resultado = await pool.query(
            `
      SELECT
        carros.id,
        carros.modelo,
        carros.marca_id,
        marcas.nome AS marca_nome,
        carros.ano
      FROM carros
      INNER JOIN marcas ON marcas.id = carros.marca_id
      WHERE carros.id = $1
      `,
            [id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Carro não encontrado',
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar carro por id',
        });
    }
});

router.post('/', async (req, res) => {
    const { modelo, marca_id, ano } = req.body;

    const erroValidacao = validarCarro({ modelo, marca_id, ano });

    if (erroValidacao) {
        return res.status(400).json({
            erro: erroValidacao,
        });
    }

    try {
        const resultado = await pool.query(
            `
      INSERT INTO carros (modelo, marca_id, ano)
      VALUES ($1, $2, $3)
      RETURNING id, modelo, marca_id, ano
      `,
            [modelo.trim(), Number(marca_id), Number(ano)],
        );

        res.status(201).json({
            mensagem: 'Carro cadastrado com sucesso',
            carro: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23503') {
            return res.status(400).json({
                erro: 'Marca informada não existe',
            });
        }

        res.status(500).json({
            erro: 'Erro ao cadastrar carro',
        });
    }
});

router.put('/:id', async (req, res) => {
    const id = obterId(req, res);

    if (!id) {
        return;
    }

    const { modelo, marca_id, ano } = req.body;

    const erroValidacao = validarCarro({ modelo, marca_id, ano });

    if (erroValidacao) {
        return res.status(400).json({
            erro: erroValidacao,
        });
    }

    try {
        const resultado = await pool.query(
            `
      UPDATE carros
      SET modelo = $1,
          marca_id = $2,
          ano = $3
      WHERE id = $4
      RETURNING id, modelo, marca_id, ano
      `,
            [modelo.trim(), Number(marca_id), Number(ano), id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Carro não encontrado',
            });
        }

        res.json({
            mensagem: 'Carro alterado com sucesso',
            carro: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23503') {
            return res.status(400).json({
                erro: 'Marca informada não existe',
            });
        }

        res.status(500).json({
            erro: 'Erro ao alterar carro',
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = obterId(req, res);

    if (!id) {
        return;
    }

    try {
        const resultado = await pool.query(
            `
      DELETE FROM carros
      WHERE id = $1
      RETURNING id, modelo, marca_id, ano
      `,
            [id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Carro não encontrado',
            });
        }

        res.json({
            mensagem: 'Carro deletado com sucesso',
            carro: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao deletar carro',
        });
    }
});

export default router;
