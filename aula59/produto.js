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

    entrada(quantidade) {
        const saldoAnterior = this.#quantidade;

        this.#quantidade += quantidade;

        return `Entrada realizada com sucesso. Quantidade adicionada: ${quantidade}. Saldo anterior: ${saldoAnterior}. Saldo atual: ${this.#quantidade}.`;
    }

    saida(quantidade) {
        if (quantidade > this.#quantidade) {
            return `Estoque insuficiente. Solicitado: ${quantidade}. Disponível: ${this.#quantidade}.`;
        }
        this.#quantidade -= quantidade;
        return `Saída realizada com sucesso. Quantidade retirada: ${quantidade}. Estoque atual: ${this.#quantidade}.`;
    }
}

module.exports = Produto;
