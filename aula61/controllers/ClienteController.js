const Cliente = require('../models/Cliente');

function idValido(id) {
    const numero = Number(id);

    return Number.isInteger(numero) && numero > 0;
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

class ClienteController {
    async listar(req, res) {
        try {
            const clientes = await Cliente.listar();

            return res.status(200).json(clientes);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar clientes.',
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email } = req.body;

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                typeof email !== 'string' ||
                !emailValido(email.trim())
            ) {
                return res.status(400).json({
                    mensagem: 'Informe um nome e um e-mail válidos.',
                });
            }

            const cliente = new Cliente(
                null,
                nome.trim(),
                email.trim().toLowerCase(),
            );

            const clienteCadastrado = await cliente.cadastrar();

            return res.status(201).json({
                mensagem: 'Cliente inserido com sucesso!',
                cliente: clienteCadastrado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23505') {
                return res.status(409).json({
                    mensagem: 'Já existe um cliente com esse e-mail.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar cliente.',
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do cliente é inválido.',
                });
            }

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                typeof email !== 'string' ||
                !emailValido(email.trim())
            ) {
                return res.status(400).json({
                    mensagem: 'Informe um nome e um e-mail válidos.',
                });
            }

            const cliente = new Cliente(
                Number(id),
                nome.trim(),
                email.trim().toLowerCase(),
            );

            const clienteAtualizado = await cliente.atualizar();

            if (!clienteAtualizado) {
                return res.status(404).json({
                    mensagem: 'Cliente não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Cliente atualizado com sucesso!',
                cliente: clienteAtualizado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23505') {
                return res.status(409).json({
                    mensagem: 'Já existe um cliente com esse e-mail.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao atualizar cliente.',
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do cliente é inválido.',
                });
            }

            const clienteExcluido = await Cliente.excluir(Number(id));

            if (!clienteExcluido) {
                return res.status(404).json({
                    mensagem: 'Cliente não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Cliente excluído com sucesso!',
                cliente: clienteExcluido,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23503') {
                return res.status(409).json({
                    mensagem:
                        'O cliente não pode ser excluído porque possui pedidos.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao excluir cliente.',
            });
        }
    }
}

module.exports = new ClienteController();
