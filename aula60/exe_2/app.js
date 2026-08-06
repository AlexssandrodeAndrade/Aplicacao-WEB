const Cliente = require('./Cliente');
const Produto = require('./Produto');
const Pedido = require('./Pedido');

const cliente = new Cliente('Alexssandro de Andrade', 'alexssandro@email.com');

const produto1 = new Produto('Teclado', 150);
const produto2 = new Produto('Mouse', 89.9);
const produto3 = new Produto('Monitor', 1299.99);

const pedido = new Pedido(cliente);

pedido.adicionarProduto(produto1);
pedido.adicionarProduto(produto2);
pedido.adicionarProduto(produto3);

pedido.mostrar();
