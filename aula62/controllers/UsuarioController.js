import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

function idValido(id) {
    const numero = Number(id);

    return Number.isInteger(numero) && numero > 0;
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

class UsuarioController {
    async listar(req, res) {
        try {
            const usuarios = await Usuario.listar();

            return res.status(200).json(usuarios);
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao listar usuários.',
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                typeof email !== 'string' ||
                !emailValido(email.trim()) ||
                typeof senha !== 'string' ||
                senha.length < 5
            ) {
                return res.status(400).json({
                    mensagem: 'Informe nome, e-mail e uma senha com pelo menos 5 caracteres.',
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = new Usuario(
                null,
                nome.trim(),
                email.trim().toLowerCase(),
                senhaCriptografada,
            );

            const usuarioCadastrado = await usuario.cadastrar();

            return res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                usuario: usuarioCadastrado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23505') {
                return res.status(409).json({
                    mensagem: 'Já existe um usuário com esse e-mail.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao cadastrar usuário.',
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do usuário é inválido.',
                });
            }

            if (
                typeof nome !== 'string' ||
                nome.trim() === '' ||
                typeof email !== 'string' ||
                !emailValido(email.trim()) ||
                typeof senha !== 'string' ||
                senha.length < 5
            ) {
                return res.status(400).json({
                    mensagem: 'Informe nome, e-mail e uma senha com pelo menos 5 caracteres.',
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = new Usuario(
                Number(id),
                nome.trim(),
                email.trim().toLowerCase(),
                senhaCriptografada,
            );

            const usuarioAtualizado = await usuario.atualizar();

            if (!usuarioAtualizado) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso!',
                usuario: usuarioAtualizado,
            });
        } catch (erro) {
            console.error(erro);

            if (erro.code === '23505') {
                return res.status(409).json({
                    mensagem: 'Já existe um usuário com esse e-mail.',
                });
            }

            return res.status(500).json({
                mensagem: 'Erro ao atualizar usuário.',
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            if (!idValido(id)) {
                return res.status(400).json({
                    mensagem: 'O ID do usuário é inválido.',
                });
            }

            const usuarioExcluido = await Usuario.excluir(Number(id));

            if (!usuarioExcluido) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado.',
                });
            }

            return res.status(200).json({
                mensagem: 'Usuário excluído com sucesso!',
                usuario: usuarioExcluido,
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao excluir usuário.',
            });
        }
    }
}

export default new UsuarioController();
