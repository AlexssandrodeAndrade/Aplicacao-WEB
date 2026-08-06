class Produto {
    nome;
    #quantidade;
    constructor(nome, quantidade) {
        this.nome = nome;
        this.#quantidade = Number(quantidade) || 0;
    }
    getQuantidade() {
        return this.#quantidade;
    }
}
