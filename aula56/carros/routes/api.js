import express from 'express';

import marcaRoutes from './api/marca.routes.js';
import carroRoutes from './api/carro.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        status: 'ok',
        message: 'API de carros e marcas funcionando.',
    });
});

router.use('/marcas', marcaRoutes);
router.use('/carros', carroRoutes);

export default router;
