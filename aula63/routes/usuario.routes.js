import express from 'express';
import controller from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/usuarios', controller.listar);
router.post('/usuarios', controller.cadastrar);
router.put('/usuarios/:id', controller.atualizar);
router.delete('/usuarios/:id', controller.excluir);

export default router;
