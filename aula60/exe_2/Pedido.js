const Cliente = require('./Cliente');
const Produto = require('./Produto');

class Pedido {
    cliente;
    produtos;

    constructor(cliente) {
        if (!(cliente instanceof Cliente)) {
            throw new Error('O cliente informado deve ser um objeto da classe Cliente.');
        }

        this.cliente = cliente;
        this.produtos = [];
    }

    adicionarProduto(produto) {
        if (!(produto instanceof Produto)) {
            throw new Error('O produto informado deve ser um objeto da classe Produto.');
        }

        this.produtos.push(produto);
    }

    mostrar() {
        console.log('=== DADOS DO PEDIDO ===');

        console.log('\nCliente:');
        console.log(`Nome: ${this.cliente.nome}`);
        console.log(`E-mail: ${this.cliente.email}`);

        console.log(`\nQuantidade de produtos: ${this.produtos.length}`);

        console.log('\nProdutos:');

        this.produtos.forEach((produto, indice) => {
            console.log(`\nProduto ${indice + 1}:`);
            console.log(`Nome: ${produto.nome}`);
            console.log(`Preço: R$ ${produto.preco.toFixed(2)}`);
        });
    }
}

module.exports = Pedido;
