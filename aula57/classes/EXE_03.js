class ContaStreaming {
    usuario;
    plano;
    ativo;

    constructor(usuario) {
        this.usuario = usuario;
        this.plano = null;
        this.ativo = false;
    }

    entrar() {
        if (!this.ativo) {
            return {
                sucesso: false,
                mensagem: 'Não foi possível entrar: sua assinatura está inativa.',
            };
        }

        return {
            sucesso: true,
            mensagem: `Bem-vindo ao streaming, ${this.usuario}!`,
        };
    }

    assinarPlano(plano) {
        if (typeof plano !== 'string' || plano.trim() === '') {
            return {
                sucesso: false,
                mensagem: 'Informe um plano válido.',
            };
        }

        this.plano = plano.trim();
        this.ativo = true;

        return {
            sucesso: true,
            mensagem: `Plano ${this.plano} assinado com sucesso.`,
        };
    }

    cancelarPlano() {
        if (!this.ativo) {
            return {
                sucesso: false,
                mensagem: 'A conta já está sem uma assinatura ativa.',
            };
        }

        const planoCancelado = this.plano;

        this.plano = null;
        this.ativo = false;

        return {
            sucesso: true,
            mensagem: `Plano ${planoCancelado} cancelado com sucesso.`,
        };
    }

    mostrarConta() {
        return {
            usuario: this.usuario,
            plano: this.plano,
            ativo: this.ativo,
        };
    }
}

export default ContaStreaming;
