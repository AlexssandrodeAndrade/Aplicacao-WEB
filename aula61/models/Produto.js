const pool = require('../database');
class Produto {
    id;
    nome;
    preco;

    constructor(id, nome, preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }

    static async listar() {
        const resultado = await pool.query('SELECT * FROM produtos ORDER BY id');
        return resultado.rows;
    }

    async cadastrar() {
        const resultado = await pool.query(
            `INSERT INTO produtos
        (nome, preco)
        VALUES ($1, $2)
        RETURNING *`,
            [this.nome, this.preco],
        );

        return resultado.rows[0];
    }

    async atualizar() {
        const resultado = await pool.query(
            `UPDATE produtos
            SET nome = $1,
                preco = $2
            WHERE id = $3
            RETURNING *`,
            [this.nome, this.preco, this.id],
        );

        return resultado.rows[0];
    }

    static async excluir(id) {
        const resultado = await pool.query(
            `DELETE FROM produtos
            WHERE id = $1
            RETURNING *`,
            [id],
        );

        return resultado.rows[0];
    }
}
module.exports = Produto;
