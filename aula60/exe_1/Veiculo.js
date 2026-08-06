class Veiculo {
    //atributos
    placa;
    ano;
    marca;
    modelo;

    constructor(placa, ano, marca, modelo) {
        this.placa = placa;
        this.ano = ano;
        this.marca = marca;
        this.modelo = modelo;
    }
    mostrar() {
        console.log(`Placa: ${this.placa}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`Marca: ${this.marca}`);
        console.log(`Modelo: ${this.modelo}`);
    }
}

module.exports = Veiculo;
