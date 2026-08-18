import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario.js';

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (
                typeof email !== 'string' ||
                email.trim() === '' ||
                typeof senha !== 'string' ||
                senha === ''
            ) {
                return res.status(400).json({
                    mensagem: 'Informe e-mail e senha.',
                });
            }

            const usuario = await Usuario.buscarPorEmail(email.trim().toLowerCase());

            if (!usuario) {
                return res.status(401).json({
                    mensagem: 'Email ou senha inválidos',
                });
            }

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta) {
                return res.status(401).json({
                    mensagem: 'Email ou senha inválidos',
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                },
                process.env.JWT_SECRET,
            );

            return res.status(200).json({
                token: token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                },
            });
        } catch (erro) {
            console.error(erro);

            return res.status(500).json({
                mensagem: 'Erro ao realizar login',
            });
        }
    }
}

export default new AuthController();
