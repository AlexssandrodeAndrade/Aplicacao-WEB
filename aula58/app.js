class Produto {
    nome;
    #quantidade;

    constructor(nome, quantidade) {
        this.nome = nome;
        this.#quantidade = quantidade;
    }

    entrada(quantidade) {
        this.#quantidade += quantidade;
    }

    saida(quantidade) {
        if (quantidade > this.#quantidade) {
            console.log(
                'Não possivel fazer a retirada. quantidade atual é: ' +
                    this.getQuantidade() +
                    ', quantidade solicidata de saida é: ' +
                    quantidade,
            );
            return;
        }
        this.#quantidade -= quantidade;
    }

    getQuantidade() {
        return this.#quantidade;
    }
}

const mouse = new Produto('Mouse', 5);
mouse.entrada(50);
mouse.saida(60);

console.log();
