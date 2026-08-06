class Notebook {
    marca;
    modelo;
    ram;
    placa_video;
    processador;
    armazenamento;

    ligar() {
        console.log('Notebook ligado.');
    }
    desligar() {
        console.log('Notebook desligado.');
    }

    exibirInformacoes() {
        console.log(`Marca: ${this.marca}`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`RAM: ${this.ram}`);
        console.log(`Placa de Vídeo: ${this.placa_video}`);
        console.log(`Processador: ${this.processador}`);
        console.log(`Armazenamento: ${this.armazenamento}`);
    }

    upgradeRam(novaRam) {
        this.ram = novaRam;
    }
}

const note_professor = new Notebook();

note_professor.marca = 'Acer';
note_professor.modelo = 'Nitro 5';
note_professor.ram = '16GB';
note_professor.placa_video = 'GTX 1650';
note_professor.processador = 'Intel Core i5';
note_professor.armazenamento = '1TB';

// console.log(note_professor);

const note_sanai = new Notebook();

note_sanai.marca = 'HP';
note_sanai.modelo = 'ProBook 445G11';
note_sanai.ram = '16GB';
note_sanai.placa_video = 'interna';
note_sanai.processador = 'Ryzan 5 7535u';
note_sanai.armazenamento = '477GB';

note_sanai.upgradeRam('64GB');
note_sanai.exibirInformacoes();
