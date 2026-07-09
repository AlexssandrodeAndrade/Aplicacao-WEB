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

router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query(`
      SELECT id, nome
      FROM marcas
      ORDER BY id ASC
    `);

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar marcas',
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
      SELECT id, nome
      FROM marcas
      WHERE id = $1
      `,
            [id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Marca não encontrada',
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar marca',
        });
    }
});

router.post('/', async (req, res) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Nome da marca é obrigatório',
        });
    }

    try {
        const resultado = await pool.query(
            `
      INSERT INTO marcas (nome)
      VALUES ($1)
      RETURNING id, nome
      `,
            [nome.trim()],
        );

        res.status(201).json({
            mensagem: 'Marca cadastrada com sucesso',
            marca: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23505') {
            return res.status(409).json({
                erro: 'Já existe uma marca cadastrada com este nome',
            });
        }

        res.status(500).json({
            erro: 'Erro ao cadastrar marca',
        });
    }
});

router.put('/:id', async (req, res) => {
    const id = obterId(req, res);

    if (!id) {
        return;
    }

    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Nome da marca é obrigatório',
        });
    }

    try {
        const resultado = await pool.query(
            `
      UPDATE marcas
      SET nome = $1
      WHERE id = $2
      RETURNING id, nome
      `,
            [nome.trim(), id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Marca não encontrada',
            });
        }

        res.json({
            mensagem: 'Marca alterada com sucesso',
            marca: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23505') {
            return res.status(409).json({
                erro: 'Já existe uma marca cadastrada com este nome',
            });
        }

        res.status(500).json({
            erro: 'Erro ao alterar marca',
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
      DELETE FROM marcas
      WHERE id = $1
      RETURNING id, nome
      `,
            [id],
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: 'Marca não encontrada',
            });
        }

        res.json({
            mensagem: 'Marca deletada com sucesso',
            marca: resultado.rows[0],
        });
    } catch (erro) {
        console.error(erro);

        if (erro.code === '23503') {
            return res.status(409).json({
                erro: 'Não é possível deletar esta marca porque existem carros vinculados a ela',
            });
        }

        res.status(500).json({
            erro: 'Erro ao deletar marca',
        });
    }
});

export default router;
