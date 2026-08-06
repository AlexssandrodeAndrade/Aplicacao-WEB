const Produto = require('../models/Produto');

class ProdutoController {
    async listar(req, res) {
        try {
            const produtos = await Produto.listar();

            res.status(200).json(produtos);
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                mensagem: 'Erro ao listar produtos.',
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, preco } = req.body;

            const produto = new Produto(null, nome, preco);

            const produtoCadastrado = await produto.cadastrar();

            res.status(201).json({
                mensagem: 'Produto inserido com sucesso!',
                produto: produtoCadastrado,
            });
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                mensagem: 'Erro ao cadastrar produto.',
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco } = req.body;

            const produto = new Produto(id, nome, preco);

            const produtoAtualizado = await produto.atualizar();

            if (!produtoAtualizado) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.',
                });
            }

            res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!',
                produto: produtoAtualizado,
            });
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                mensagem: 'Erro ao atualizar produto.',
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            const produtoExcluido = await Produto.excluir(id);

            if (!produtoExcluido) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.',
                });
            }

            res.status(200).json({
                mensagem: 'Produto excluído com sucesso!',
                produto: produtoExcluido,
            });
        } catch (erro) {
            console.error(erro);

            res.status(500).json({
                mensagem: 'Erro ao excluir produto.',
            });
        }
    }
}

module.exports = new ProdutoController();
