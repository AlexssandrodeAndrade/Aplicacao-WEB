class Produto {
    nome;
    preco;

    constructor(nome, preco) {
        this.nome = nome;
        this.preco = Number(preco);
    }

    mostrar() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    }
}

module.exports = Produto;
