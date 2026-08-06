import express from 'express';

import musicaRoutes from './routes/musica.routes.js';
import contaBancariaRoutes from './routes/contaBancaria.routes.js';
import streamingRoutes from './routes/streaming.routes.js';

const app = express();
const porta = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor dos exercícios em execução.',
        rotas: {
            musica: '/musica',
            contaBancaria: '/conta-bancaria',
            streaming: '/streaming',
        },
    });
});

app.use('/musica', musicaRoutes);
app.use('/conta-bancaria', contaBancariaRoutes);
app.use('/streaming', streamingRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
