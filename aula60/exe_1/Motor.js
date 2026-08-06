class Motor {
    //atributos
    cilindros;
    temperatura;
    ligado;

    constructor(cilindros, temperatura, ligado = false) {
        this.cilindros = cilindros;
        this.temperatura = temperatura;
        this.ligado = ligado;
    }

    ligar() {
        this.ligado = true;
        console.log('Motor ligado.');
    }

    desligar() {
        this.ligado = false;
        console.log('Motor desligado.');
    }

    acelerar() {
        if (this.ligado) {
            this.temperatura += 10;
            console.log('Vrummm!');
        } else {
            console.log('O motor está desligado.');
        }
    }

    mostrar() {
        console.log('Cilindros:', this.cilindros);
        console.log('Temperatura:', this.temperatura);
        console.log('Ligado:', this.ligado);
    }
}

module.exports = Motor;
