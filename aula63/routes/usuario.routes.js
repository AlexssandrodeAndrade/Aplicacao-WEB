import express from 'express';

import controller from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/usuarios', authMiddleware, controller.listar);

router.post('/usuarios', controller.cadastrar);

router.put('/usuarios/:id', authMiddleware, controller.atualizar);

router.delete('/usuarios/:id', authMiddleware, controller.excluir);

export default router;
