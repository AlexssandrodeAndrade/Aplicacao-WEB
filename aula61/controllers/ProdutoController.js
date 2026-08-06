const Produto = require('../models/Produto');

class ProdutoController {
    async listar(req, res) {
        const produtos = await Produto.listar();
        res.json(produtos);
    }

    async cadastrar(req, res) {
        const produto = new Produto(null, req.body.nome, req.body.preco);
        await produto.cadastrar();
        res.json({ mensagem: 'Produto inserido com sucesso!' });
    }
}
module.exports = new ProdutoController();
