const pool = require('../database');

class Cliente {
    id;
    nome;
    email;

    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    static async listar() {
        const resultado = await pool.query(
            'SELECT * FROM clientes ORDER BY id',
        );

        return resultado.rows;
    }

    async cadastrar() {
        const resultado = await pool.query(
            `INSERT INTO clientes
            (nome, email)
            VALUES ($1, $2)
            RETURNING *`,
            [this.nome, this.email],
        );

        return resultado.rows[0];
    }

    async atualizar() {
        const resultado = await pool.query(
            `UPDATE clientes
            SET nome = $1,
                email = $2
            WHERE id = $3
            RETURNING *`,
            [this.nome, this.email, this.id],
        );

        return resultado.rows[0];
    }

    static async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM clientes
            WHERE id = $1
            RETURNING *`,
            [id],
        );

        return resultado.rows[0];
    }
}

module.exports = Cliente;
