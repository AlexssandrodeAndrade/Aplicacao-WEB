const express = require('express');

const router = express.Router();

const controller = require('../controllers/ClienteController');

router.get('/clientes', controller.listar);
router.post('/clientes', controller.cadastrar);
router.put('/clientes/:id', controller.atualizar);
router.delete('/clientes/:id', controller.excluir);

module.exports = router;
