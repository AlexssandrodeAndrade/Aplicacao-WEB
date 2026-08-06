const Veiculo = require('./Veiculo');

class Moto extends Veiculo {
    //atributos
    cilindradas;
    partidaEletrica;
    bau;

    constructor(placa, ano, marca, modelo, cilindradas, partidaEletrica, bau) {
        super(placa, ano, marca, modelo);

        this.cilindradas = cilindradas;
        this.partidaEletrica = partidaEletrica;
        this.bau = bau;
    }

    mostrar() {
        super.mostrar();
        console.log(`Cilindradas: ${this.cilindradas}`);
        console.log(`Partida elétrica: ${this.partidaEletrica}`);
        console.log(`Baú: ${this.bau}`);
    }
}

let moto = new Moto('MOT-2026', 2024, 'Honda', 'CG 160', 160, true, false);

moto.mostrar();
