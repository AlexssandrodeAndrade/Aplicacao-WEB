import 'dotenv/config';
import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pastaAtual = dirname(fileURLToPath(import.meta.url));
const porta = Number(process.env.PORT);

if (!porta) {
    throw new Error('A variável PORT não foi definida corretamente no .env.');
}

const app = express();

app.use(express.json());
app.use(express.static(join(pastaAtual, 'public')));

app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`);
});
