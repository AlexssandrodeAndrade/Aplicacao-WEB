const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProdutoController');

// Listar produtos
router.get('/produtos', controller.listar);

// Cadastrar produto
router.post('/produtos', controller.cadastrar);

// Atualizar produto
router.put('/produtos/:id', controller.atualizar);

// Excluir produto
router.delete('/produtos/:id', controller.excluir);

module.exports = router;
