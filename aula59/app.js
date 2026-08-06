const express = require('express');
const app = express();
const PORT = 3000;

const Produto = require('./Produto');
const protudo = new Produto('Mouse Gamer', 10);

app.use(express.json());

app.get('/produto', (req, res) => {
    let quantidade = protudo.getQuantidade();

    res.json({ quantidade: quantidade, nome: protudo.nome });
});

app.post('/entrada', (req, res) => {
    const retorno = protudo.entrada(req.body.quantidade);
    res.json({ mensagem: retorno });
});

app.post('/saida', (req, res) => {
    const retorno = protudo.saida(req.body.quantidade);

    res.json({ mensagem: retorno });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
