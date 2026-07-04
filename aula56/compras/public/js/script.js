const itemPadrao = {
    id: null,
    nome: '',
    comprado: false,
};

const state = {
    item: { ...itemPadrao },
    itens: [],
    templateItem: '',
};

const elementos = {
    formulario: document.getElementById('formCompra'),
    lista: document.getElementById('lista'),
    inputId: document.getElementById('inputId'),
    inputItem: document.getElementById('inputItem'),
    mensagem: document.getElementById('mensagem'),
    modoFormulario: document.getElementById('modoFormulario'),
    btnSalvar: document.querySelector('.btn-add'),
    btnCancelar: document.getElementById('btnCancelar'),
};

elementos.formulario.addEventListener('submit', salvarItem);
elementos.btnCancelar.addEventListener('click', cancelarEdicao);
elementos.lista.addEventListener('click', tratarCliqueLista);
elementos.lista.addEventListener('change', tratarMudancaLista);

async function iniciar() {
    try {
        atualizarModoFormulario('cadastro');
        await carregarTemplateItem();
        await carregarItens();
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

async function carregarItens() {
    try {
        state.itens = await buscarCompras();

        renderizarItens();
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

async function carregarTemplateItem() {
    const resposta = await fetch('/templates/item.html');

    if (!resposta.ok) {
        throw new Error('Erro ao carregar template do item.');
    }

    state.templateItem = await resposta.text();
}

async function requisitarApi(url, opcoes = {}) {
    const configuracao = {
        method: opcoes.method || 'GET',
        headers: {
            Accept: 'application/json',
            ...(opcoes.body ? { 'Content-Type': 'application/json' } : {}),
            ...opcoes.headers,
        },
    };

    if (opcoes.body) {
        configuracao.body = JSON.stringify(opcoes.body);
    }

    const resposta = await fetch(url, configuracao);

    const contentType = resposta.headers.get('content-type') || '';
    const dados = contentType.includes('application/json') ? await resposta.json() : null;

    if (!resposta.ok) {
        throw new Error(dados?.erro || dados?.mensagem || 'Erro na requisição.');
    }

    return dados;
}

async function buscarCompras() {
    return await requisitarApi('/compras');
}

async function cadastrarCompra(nome) {
    return await requisitarApi('/compras', {
        method: 'POST',
        body: {
            nome,
        },
    });
}

async function alterarCompra(item) {
    return await requisitarApi(`/compras/${item.id}`, {
        method: 'PUT',
        body: {
            nome: item.nome,
            comprado: item.comprado,
        },
    });
}

async function deletarCompra(id) {
    return await requisitarApi(`/compras/${id}`, {
        method: 'DELETE',
    });
}

function estaEditandoItem(id) {
    return state.item.id === id;
}

async function salvarItem(event) {
    event.preventDefault();
    limparMensagem();

    const id = elementos.inputId.value ? Number(elementos.inputId.value) : null;
    const nome = elementos.inputItem.value.trim();

    if (!nome) {
        mostrarAviso('Informe o nome do item antes de salvar.');
        return;
    }

    try {
        if (id !== null) {
            await alterarCompra({
                ...state.item,
                id,
                nome,
            });

            mostrarSucesso('Item alterado com sucesso.');
        } else {
            await cadastrarCompra(nome);

            mostrarSucesso('Item cadastrado com sucesso.');
        }

        limparFormulario();
        await carregarItens();
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

async function alterarStatus(item, comprado) {
    try {
        await alterarCompra({
            ...item,
            comprado,
        });

        if (estaEditandoItem(item.id)) {
            state.item = {
                ...state.item,
                comprado,
            };
        }

        await carregarItens();
    } catch (erro) {
        mostrarErro(erro.message);
        await carregarItens();
    }
}

function editarItem(item) {
    state.item = { ...item };

    elementos.inputId.value = item.id;
    elementos.inputItem.value = item.nome;
    elementos.inputItem.focus();

    atualizarModoFormulario('edicao');

    renderizarItens();
}

async function removerItem(id) {
    if (estaEditandoItem(id)) {
        mostrarAviso('Finalize ou cancele a edição antes de excluir este item.');
        return;
    }

    try {
        await deletarCompra(id);
        mostrarSucesso('Item removido com sucesso.');
        await carregarItens();
    } catch (erro) {
        mostrarErro(erro.message);
    }
}

function montarTemplateItem(item) {
    const editando = estaEditandoItem(item.id);

    return state.templateItem
        .replaceAll('{{id}}', item.id)
        .replaceAll('{{nome}}', escaparHtml(item.nome))
        .replaceAll('{{checked}}', item.comprado ? 'checked' : '')
        .replaceAll('{{classeComprado}}', item.comprado ? 'comprado' : '')
        .replaceAll('{{classeRemover}}', editando ? 'opacity-50' : '')
        .replaceAll(
            '{{tituloRemover}}',
            editando ? 'Finalize a edição antes de excluir este item' : 'Excluir item',
        );
}

function renderizarItens() {
    elementos.lista.textContent = '';

    if (state.itens.length === 0) {
        const li = document.createElement('li');

        li.className = 'list-group-item text-center text-muted';
        li.textContent = 'Nenhum item cadastrado.';

        elementos.lista.appendChild(li);
        return;
    }

    state.itens.forEach((item) => {
        const html = montarTemplateItem(item);
        const fragmento = document.createRange().createContextualFragment(html);

        elementos.lista.appendChild(fragmento);
    });
}

function tratarCliqueLista(event) {
    const botao = event.target.closest('button[data-action]');

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const action = botao.dataset.action;

    if (action === 'editar') {
        const item = buscarItemPorId(id);

        if (!item) {
            mostrarErro('Item não encontrado na lista.');
            return;
        }

        editarItem(item);
        return;
    }

    if (action === 'remover') {
        removerItem(id);
    }
}

async function tratarMudancaLista(event) {
    const checkbox = event.target;

    if (checkbox.dataset.action !== 'status') {
        return;
    }

    const id = Number(checkbox.dataset.id);
    const item = buscarItemPorId(id);

    if (!item) {
        mostrarErro('Item não encontrado na lista.');
        return;
    }

    await alterarStatus(item, checkbox.checked);
}

function atualizarModoFormulario(modo) {
    if (modo === 'edicao') {
        elementos.modoFormulario.textContent = 'Modo edição: altere o item selecionado.';
        elementos.modoFormulario.className = 'alert alert-warning text-center py-2 mb-3';
        elementos.btnSalvar.textContent = 'Salvar Alteração';
        elementos.btnCancelar.classList.remove('d-none');

        return;
    }

    elementos.modoFormulario.textContent =
        'Modo cadastro: informe um item para adicionar na lista.';
    elementos.modoFormulario.className = 'alert alert-info text-center py-2 mb-3';
    elementos.btnSalvar.textContent = 'Adicionar';
    elementos.btnCancelar.classList.add('d-none');
}

function limparFormulario() {
    state.item = { ...itemPadrao };

    elementos.inputId.value = '';
    elementos.inputItem.value = '';
    elementos.inputItem.focus();

    atualizarModoFormulario('cadastro');

    if (state.templateItem) {
        renderizarItens();
    }
}

function cancelarEdicao() {
    limparFormulario();
    mostrarMensagem('Edição cancelada. O formulário voltou para o modo cadastro.', 'info');
}

function mostrarMensagem(texto, tipo = 'info') {
    const classes = {
        sucesso: 'alert alert-success text-center fw-bold mb-3',
        erro: 'alert alert-danger text-center fw-bold mb-3',
        aviso: 'alert alert-warning text-center fw-bold mb-3',
        info: 'alert alert-info text-center fw-bold mb-3',
    };

    elementos.mensagem.textContent = texto;
    elementos.mensagem.className = classes[tipo] || classes.info;
}

function limparMensagem() {
    elementos.mensagem.textContent = '';
    elementos.mensagem.className = 'd-none';
}

function mostrarErro(texto) {
    mostrarMensagem(texto, 'erro');
}

function mostrarSucesso(texto) {
    mostrarMensagem(texto, 'sucesso');
}

function mostrarAviso(texto) {
    mostrarMensagem(texto, 'aviso');
}

function escaparHtml(texto) {
    return String(texto)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function buscarItemPorId(id) {
    return state.itens.find((item) => item.id === id);
}

iniciar();
