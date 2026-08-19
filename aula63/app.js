import 'dotenv/config';
import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';

const pastaAtual = dirname(fileURLToPath(import.meta.url));
const porta = Number(process.env.PORT);
const jwtSecret = process.env.JWT_SECRET?.trim();

if (!porta) {
    throw new Error('A variável PORT não foi definida corretamente no .env.');
}

if (!jwtSecret) {
    throw new Error('A variável JWT_SECRET não foi definida corretamente no .env.');
}

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(usuarioRoutes);

app.use(express.static(join(pastaAtual, 'public')));

app.listen(porta, () => {
    console.log(`Servidor executando em http://localhost:${porta}`);
});
