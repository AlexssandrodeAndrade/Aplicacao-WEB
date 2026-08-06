class Cliente {
    nome;
    email;

    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }

    mostrar() {
        console.log(`Nome: ${this.nome}`);
        console.log(`E-mail: ${this.email}`);
    }
}

module.exports = Cliente;
