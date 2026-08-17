import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario.js';

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);

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
