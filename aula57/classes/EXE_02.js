class ContaBancaria {
    titular;
    saldo;

    constructor(titular, saldoInicial) {
        this.titular = titular;

        if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
            this.saldo = 0;
        } else {
            this.saldo = saldoInicial;
        }
    }

    depositar(valor) {
        if (!Number.isFinite(valor) || valor <= 0) {
            return {
                sucesso: false,
                mensagem: 'O valor do depósito deve ser maior que zero.',
            };
        }

        const saldoAnterior = this.saldo;

        this.saldo += valor;

        return {
            sucesso: true,
            mensagem: 'Depósito realizado com sucesso.',
            valorDepositado: valor,
            saldoAnterior,
            saldoAtual: this.saldo,
        };
    }

    sacar(valor) {
        if (!Number.isFinite(valor) || valor <= 0) {
            return {
                sucesso: false,
                mensagem: 'O valor do saque deve ser maior que zero.',
            };
        }

        if (valor > this.saldo) {
            return {
                sucesso: false,
                mensagem: 'Não foi possível realizar o saque: saldo insuficiente.',
                valorSolicitado: valor,
                saldoAtual: this.saldo,
            };
        }

        const saldoAnterior = this.saldo;

        this.saldo -= valor;

        return {
            sucesso: true,
            mensagem: 'Saque realizado com sucesso.',
            valorSacado: valor,
            saldoAnterior,
            saldoAtual: this.saldo,
        };
    }

    consultarSaldo() {
        return {
            titular: this.titular,
            saldo: this.saldo,
        };
    }
}

export default ContaBancaria;
