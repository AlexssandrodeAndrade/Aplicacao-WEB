(() => {
    function mostrarMensagem(
        mensagem,
        tipo = 'success',
        containerId = 'mensagemPagina',
    ) {
        const container = document.getElementById(containerId);

        if (!container) {
            return;
        }

        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
        alerta.setAttribute('role', 'alert');

        const texto = document.createElement('span');
        texto.textContent = mensagem;

        const botaoFechar = document.createElement('button');
        botaoFechar.type = 'button';
        botaoFechar.className = 'btn-close';
        botaoFechar.setAttribute('data-bs-dismiss', 'alert');
        botaoFechar.setAttribute('aria-label', 'Fechar');

        alerta.append(texto, botaoFechar);
        container.replaceChildren(alerta);
    }

    function limparMensagem(containerId = 'mensagemPagina') {
        const container = document.getElementById(containerId);

        if (container) {
            container.replaceChildren();
        }
    }

    function formatarMoeda(valor) {
        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            return 'R$ 0,00';
        }

        return numero.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    function criarBotao(texto, classe, onClick) {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = classe;
        botao.textContent = texto;
        botao.addEventListener('click', onClick);

        return botao;
    }

    function criarLinhaVazia(colunas, mensagem) {
        const linha = document.createElement('tr');
        const celula = document.createElement('td');

        celula.colSpan = colunas;
        celula.className = 'empty-state';
        celula.textContent = mensagem;

        linha.appendChild(celula);

        return linha;
    }

    function criarLinhaCarregamento(colunas, mensagem = 'Carregando...') {
        const linha = document.createElement('tr');
        linha.className = 'loading-row';

        const celula = document.createElement('td');
        celula.colSpan = colunas;

        const spinner = document.createElement('span');
        spinner.className = 'spinner-border spinner-border-sm me-2';
        spinner.setAttribute('aria-hidden', 'true');

        const texto = document.createElement('span');
        texto.textContent = mensagem;

        celula.append(spinner, texto);
        linha.appendChild(celula);

        return linha;
    }

    function definirBotaoCarregando(
        botao,
        carregando,
        textoCarregando = 'Salvando...',
    ) {
        if (carregando) {
            botao.dataset.textoOriginal = botao.textContent;
            botao.dataset.textoCarregando = textoCarregando;
            botao.disabled = true;
            botao.textContent = textoCarregando;
            return;
        }

        botao.disabled = false;

        if (botao.textContent === botao.dataset.textoCarregando) {
            botao.textContent =
                botao.dataset.textoOriginal || botao.textContent;
        }

        delete botao.dataset.textoOriginal;
        delete botao.dataset.textoCarregando;
    }

    function confirmar(mensagem) {
        return new Promise((resolve) => {
            const modalElemento = document.getElementById('confirmacaoModal');
            const mensagemElemento = document.getElementById(
                'confirmacaoModalMensagem',
            );
            const botaoConfirmar = document.getElementById(
                'confirmacaoModalBotao',
            );

            if (!modalElemento || !mensagemElemento || !botaoConfirmar) {
                resolve(window.confirm(mensagem));
                return;
            }

            mensagemElemento.textContent = mensagem;

            const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);
            let resolvido = false;

            function finalizar(valor) {
                if (resolvido) {
                    return;
                }

                resolvido = true;
                botaoConfirmar.removeEventListener('click', confirmarExclusao);
                modalElemento.removeEventListener('hidden.bs.modal', cancelar);
                resolve(valor);
            }

            function confirmarExclusao() {
                finalizar(true);
                modal.hide();
            }

            function cancelar() {
                finalizar(false);
            }

            botaoConfirmar.addEventListener('click', confirmarExclusao);
            modalElemento.addEventListener('hidden.bs.modal', cancelar);
            modal.show();
        });
    }

    window.ui = {
        mostrarMensagem,
        limparMensagem,
        formatarMoeda,
        criarBotao,
        criarLinhaVazia,
        criarLinhaCarregamento,
        definirBotaoCarregando,
        confirmar,
    };
})();
