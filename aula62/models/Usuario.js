import pool from '../database.js';

class Usuario {
    id;
    nome;
    email;
    senha;

    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    static async listar() {
        const resultado = await pool.query(
            `SELECT id, nome, email
             FROM usuarios
             ORDER BY id`,
        );

        return resultado.rows;
    }

    async cadastrar() {
        const resultado = await pool.query(
            `INSERT INTO usuarios (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING id, nome, email`,
            [this.nome, this.email, this.senha],
        );

        return resultado.rows[0];
    }

    async atualizar() {
        const resultado = await pool.query(
            `UPDATE usuarios
             SET nome = $1,
                 email = $2,
                 senha = $3
             WHERE id = $4
             RETURNING id, nome, email`,
            [this.nome, this.email, this.senha, this.id],
        );

        return resultado.rows[0];
    }

    static async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM usuarios
             WHERE id = $1
             RETURNING id, nome, email`,
            [id],
        );

        return resultado.rows[0];
    }
}

export default Usuario;
