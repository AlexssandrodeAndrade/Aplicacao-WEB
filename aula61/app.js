const express = require('express');
const app = express();
const produtoRoutes = require('./routes/produto.routes');

const porta = Number(process.env.PORT);

app.use(express.json());
app.use(produtoRoutes);

if (!porta) {
    throw new Error('A variavel PORT nao foi definida corretamente no .env.');
}

app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`);
});
