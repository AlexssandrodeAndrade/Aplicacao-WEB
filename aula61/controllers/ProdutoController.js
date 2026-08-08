const Produto = require('../models/Produto');

function idValido(id) {
    const numero = Number(id);

    return Number.isInteger(numero) && numero > 0;
}

class ProdutoController {
    async listar(req, res) {
        try {
            const produtos = await Produto.listar();

            return res.status(200).json(produtos);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar produtos.',
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, preco } = req.body;
            const precoNumerico = Number(preco);

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                !Number.isFinite(precoNumerico) ||
                precoNumerico <= 0
            ) {
                return res.status(400).json({
                    mensagem: 'Informe um nome e um preço válidos.',
                });
            }

            const produto = new Produto(null, nome.trim(), precoNumerico);

            const produtoCadastrado = await produto.cadastrar();

            return res.status(201).json({
                mensagem: 'Produto cadastrado com sucesso!',
                produto: produtoCadastrado,
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar produto.',
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco } = req.body;
            const precoNumerico = Number(preco);

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do produto é inválido.',
                });
            }

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                !Number.isFinite(precoNumerico) ||
                precoNumerico <= 0
            ) {
                return res.status(400).json({
                    mensagem: 'Informe um nome e um preço válidos.',
                });
            }

            const produto = new Produto(Number(id), nome.trim(), precoNumerico);

            const produtoAtualizado = await produto.atualizar();

            if (!produtoAtualizado) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!',
                produto: produtoAtualizado,
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao atualizar produto.',
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do produto é inválido.',
                });
            }

            const produtoExcluido = await Produto.excluir(Number(id));

            if (!produtoExcluido) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Produto excluído com sucesso!',
                produto: produtoExcluido,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23503') {
                return res.status(409).json({
                    mensagem: 'O produto não pode ser excluído porque pertence a um pedido.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao excluir produto.',
            });
        }
    }
}

module.exports = new ProdutoController();
