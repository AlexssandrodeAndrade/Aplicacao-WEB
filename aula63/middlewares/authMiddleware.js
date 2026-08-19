import jwt from 'jsonwebtoken';

import Usuario from '../models/Usuario.js';

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: 'Token não informado',
        });
    }

    const [tipo, token] = authHeader.split(' ');

    if (tipo !== 'Bearer' || !token) {
        return res.status(401).json({
            mensagem: 'Token inválido',
        });
    }

    let dadosToken;

    try {
        dadosToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido',
        });
    }

    try {
        const usuario = await Usuario.buscarPorId(dadosToken.id);

        if (!usuario) {
            return res.status(401).json({
                mensagem: 'Usuário não encontrado',
            });
        }

        req.usuario = usuario;

        next();
    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            mensagem: 'Erro ao validar usuário',
        });
    }
}

export default authMiddleware;
