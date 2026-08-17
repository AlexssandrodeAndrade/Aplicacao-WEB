import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
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

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = usuario;

        next();
    } catch (erro) {
        return res.status(401).json({
            mensagem: 'Token inválido',
        });
    }
}

export default authMiddleware;
