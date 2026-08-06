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
        await pool.query(
            `INSERT INTO produtos
           (nome, preco)
           VALUES ($1, $2)`,
            [this.nome, this.preco],
        );
    }
}
module.exports = Produto;
