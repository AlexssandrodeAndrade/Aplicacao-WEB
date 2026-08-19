function mostrarMensagem(texto, tipo = 'sucesso', duracao = 3500) {
    let container = document.querySelector('#container-mensagens');

    if (!container) {
        container = document.createElement('div');

        container.id = 'container-mensagens';
        container.className = 'container-mensagens';

        document.body.append(container);
    }

    const mensagem = document.createElement('div');

    mensagem.className = `mensagem-global ${tipo}`;

    const textoMensagem = document.createElement('span');
    textoMensagem.textContent = texto;

    const botaoFechar = document.createElement('button');

    botaoFechar.type = 'button';
    botaoFechar.className = 'mensagem-fechar';
    botaoFechar.setAttribute('aria-label', 'Fechar mensagem');
    botaoFechar.textContent = '×';

    mensagem.append(textoMensagem, botaoFechar);

    container.append(mensagem);

    function fecharMensagem() {
        mensagem.classList.add('saindo');

        setTimeout(() => {
            mensagem.remove();

            if (!container.hasChildNodes()) {
                container.remove();
            }
        }, 200);
    }

    botaoFechar.addEventListener('click', fecharMensagem);

    if (duracao > 0) {
        setTimeout(fecharMensagem, duracao);
    }
}

window.mostrarMensagem = mostrarMensagem;
