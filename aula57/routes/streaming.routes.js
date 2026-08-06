import express from 'express';
import ContaStreaming from '../classes/EXE_03.js';

const router = express.Router();

const conta = new ContaStreaming('Alexssandro');

router.get('/', (req, res) => {
    res.json(conta.mostrarConta());
});

router.get('/entrar', (req, res) => {
    const resultado = conta.entrar();

    res.status(resultado.sucesso ? 200 : 403).json({ resultado, conta: conta.mostrarConta() });
});

router.post('/assinar', (req, res) => {
    const resultado = conta.assinarPlano(req.body.plano);

    res.status(resultado.sucesso ? 200 : 400).json({
        ...resultado,
        conta: conta.mostrarConta(),
    });
});

router.delete('/cancelar', (req, res) => {
    const resultado = conta.cancelarPlano();

    res.status(resultado.sucesso ? 200 : 400).json({
        ...resultado,
        conta: conta.mostrarConta(),
    });
});

export default router;
