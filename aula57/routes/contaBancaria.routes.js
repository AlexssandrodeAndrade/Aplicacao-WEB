import express from 'express';
import ContaBancaria from '../classes/EXE_02.js';

const router = express.Router();

const conta = new ContaBancaria('João', 2500);

router.get('/', (req, res) => {
    res.json(conta.consultarSaldo());
});

router.post('/depositar', (req, res) => {
    const valor = Number(req.body.valor);
    const resultado = conta.depositar(valor);

    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});

router.post('/sacar', (req, res) => {
    const valor = Number(req.body.valor);
    const resultado = conta.sacar(valor);

    res.status(resultado.sucesso ? 200 : 400).json(resultado);
});

export default router;
