const Pedido = require('../models/Pedido');

function idValido(id) {
    const numero = Number(id);

    return Number.isInteger(numero) && numero > 0;
}

function validarPedido(clienteId, produtos) {
    const clienteIdNumerico = Number(clienteId);

    if (!idValido(clienteIdNumerico)) {
        return {
            valido: false,
            mensagem: 'Informe um clienteId válido.',
        };
    }

    const produtosNumericos = produtos.map(Number);

    if (produtosNumericos.some((produtoId) => !idValido(produtoId))) {
        return {
            valido: false,
            mensagem: 'Todos os IDs dos produtos devem ser válidos.',
        };
    }

    if (new Set(produtosNumericos).size !== produtosNumericos.length) {
        return {
            valido: false,
            mensagem: 'Não repita o mesmo produto no pedido.',
        };
    }

    return {
        valido: true,
        clienteId: clienteIdNumerico,
        produtos: produtosNumericos,
    };
}

class PedidoController {
    async listar(req, res) {
        try {
            const pedidos = await Pedido.listar();

            return res.status(200).json(pedidos);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar pedidos.',
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { clienteId, produtos } = req.body;
            const validacao = validarPedido(clienteId, produtos);

            if (!validacao.valido) {
                return res.status(400).json({
                    mensagem: validacao.mensagem,
                });
            }

            const pedido = new Pedido(null, validacao.clienteId, validacao.produtos);

            const pedidoCadastrado = await pedido.cadastrar();

            return res.status(201).json({
                mensagem: 'Pedido inserido com sucesso!',
                pedido: pedidoCadastrado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23503') {
                return res.status(400).json({
                    mensagem: 'O cliente ou algum produto informado não existe.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar pedido.',
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { clienteId, produtos } = req.body;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do pedido é inválido.',
                });
            }

            const validacao = validarPedido(clienteId, produtos);

            if (!validacao.valido) {
                return res.status(400).json({
                    mensagem: validacao.mensagem,
                });
            }

            const pedido = new Pedido(Number(id), validacao.clienteId, validacao.produtos);

            const pedidoAtualizado = await pedido.atualizar();

            if (!pedidoAtualizado) {
                return res.status(404).json({
                    mensagem: 'Pedido não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Pedido atualizado com sucesso!',
                pedido: pedidoAtualizado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23503') {
                return res.status(400).json({
                    mensagem: 'O cliente ou algum produto informado não existe.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao atualizar pedido.',
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do pedido é inválido.',
                });
            }

            const pedidoExcluido = await Pedido.excluir(Number(id));

            if (!pedidoExcluido) {
                return res.status(404).json({
                    mensagem: 'Pedido não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Pedido excluído com sucesso!',
                pedido: pedidoExcluido,
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir pedido.',
            });
        }
    }
}

module.exports = new PedidoController();
