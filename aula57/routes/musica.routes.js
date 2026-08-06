import express from 'express';
import Musica from '../classes/EXE_01.js';

const router = express.Router();

const musica = new Musica('Evidências', 'Chitãozinho & Xororó', '4:39', 80);

router.get('/', (req, res) => {
    res.json(musica.mostrarDados());
});

router.get('/tocar', (req, res) => {
    const resultado = musica.tocar();

    res.status(resultado.sucesso ? 200 : 400).json({
        ...resultado,
        musica: musica.mostrarDados(),
    });
});

router.get('/pausar', (req, res) => {
    const resultado = musica.pausar();

    res.status(resultado.sucesso ? 200 : 400).json({
        ...resultado,
        musica: musica.mostrarDados(),
    });
});

export default router;
