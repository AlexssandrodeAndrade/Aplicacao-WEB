const express = require('express');
const path = require('path');
const porta = Number(process.env.PORT);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// const produtoRoutes = require('./routes/produto.routes');
// const clienteRoutes = require('./routes/cliente.routes');
// const pedidoRoutes = require('./routes/pedido.routes');

// app.use(produtoRoutes);
// app.use(clienteRoutes);
// app.use(pedidoRoutes);

if (!porta) {
    throw new Error('A variável PORT não foi definida corretamente no .env.');
}

app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`);
});
