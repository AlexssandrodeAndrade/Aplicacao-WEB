class Musica {
    titulo;
    artista;
    duracao;
    volume;
    tocando;

    constructor(titulo, artista, duracao, volume) {
        this.titulo = titulo;
        this.artista = artista;
        this.duracao = duracao;
        this.tocando = false;

        if (volume < 0 || volume > 100) {
            this.volume = 0;
        } else {
            this.volume = volume;
        }
    }

    tocar() {
        if (this.tocando) {
            return {
                sucesso: false,
                mensagem: 'A música já está tocando.',
            };
        }

        this.tocando = true;

        return {
            sucesso: true,
            mensagem: `Tocando a música ${this.titulo}.`,
        };
    }

    pausar() {
        if (!this.tocando) {
            return {
                sucesso: false,
                mensagem: 'A música já está pausada.',
            };
        }

        this.tocando = false;

        return {
            sucesso: true,
            mensagem: 'Música pausada com sucesso.',
        };
    }

    mostrarDados() {
        return {
            titulo: this.titulo,
            artista: this.artista,
            duracao: this.duracao,
            volume: this.volume,
            tocando: this.tocando,
        };
    }
}

export default Musica;
