const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProdutoController');

//Rota de consultar produtos
router.get('/produtos', controller.listar);

router.post('/produtos', controller.cadastrar);

module.exports = router;
