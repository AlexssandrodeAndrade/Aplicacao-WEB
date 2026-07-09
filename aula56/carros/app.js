import express from 'express';
import 'dotenv/config';

import apiRoutes from './routes/api.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Servidor de carros e marcas funcionando',
    });
});

app.use('/api', apiRoutes);

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
