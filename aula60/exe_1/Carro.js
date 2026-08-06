const Veiculo = require('./Veiculo');
const Motor = require('./Motor');

class Carro extends Veiculo {
    //atributos
    cavalos;
    cambio;
    combustivel;
    motor;

    constructor(placa, ano, marca, modelo, cavalos, cambio, combustivel, motor) {
        super(placa, ano, marca, modelo);

        this.cavalos = cavalos;
        this.cambio = cambio;
        this.combustivel = combustivel;
        this.motor = motor;
    }

    mostrar() {
        super.mostrar();
        console.log(`Cavalos: ${this.cavalos}`);
        console.log(`Cambio: ${this.cambio}`);
        console.log(`Combustivel: ${this.combustivel}`);
        motor.mostrar();
    }
}
const motor = new Motor(4, 15, true);

let carro = new Carro('ABC-1234', 2024, 'Toyota', 'Corolla', 177, 'Automático', 'Flex', motor);

carro.mostrar();
carro.motor.ligar();
carro.motor.acelerar();
