class Produto {
    nome;
    #quantidade;

    constructor(nome, quantidade) {
        this.nome = nome;
        this.#quantidade = Number(quantidade) || 0;
    }

    entrada(quantidade) {
        if (quantidade < 0) {
            return "Não é possível fazer entrada negativa.";
        }
        this.#quantidade += quantidade;
        return "Entrada realizada com sucesso!";
    }

    saida(quantidade) {
        if (quantidade > this.#quantidade) {
            return "Não é possível fazer a saída.";
        }
        this.#quantidade -= quantidade;
        return "Saída realizada com sucesso!";
    }

    mostrar(){
        console.log(`Nome: ${this.nome}`);
        console.log(`Quantidade: ${this.getQuantidade()}`);
    }

    getQuantidade() {
        return this.#quantidade;
    }
}

module.exports = Produto;