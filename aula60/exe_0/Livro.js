const Produto = require('./Produto');

class Livro extends Produto {
    constructor(nome, quantidade, autor, ano) {
        super(nome, quantidade);
        this.autor = autor;
        this.ano = ano;
    }
    mostrar() {
        super.mostrar();
        console.log(`Autor: ${this.autor}`);
        console.log(`Ano: ${this.ano}`);
    }
}

let hamlet = new Livro('Hamlet', 5, 'Não sei', 1900);
hamlet.mostrar();
