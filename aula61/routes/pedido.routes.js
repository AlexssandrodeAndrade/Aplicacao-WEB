const express = require('express');

const router = express.Router();

const controller = require('../controllers/PedidoController');

router.get('/pedidos', controller.listar);
router.post('/pedidos', controller.cadastrar);
router.put('/pedidos/:id', controller.atualizar);
router.delete('/pedidos/:id', controller.excluir);

module.exports = router;
