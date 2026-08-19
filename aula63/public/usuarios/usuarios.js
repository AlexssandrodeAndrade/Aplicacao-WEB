const form = document.querySelector('#form-usuario');
const lista = document.querySelector('#lista-usuarios');
const busca = document.querySelector('#busca');

const cancelar = document.querySelector('#cancelar');

const inputId = document.querySelector('#usuario-id');
const inputNome = document.querySelector('#nome');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');

const tituloFormulario = document.querySelector('#titulo-formulario');
const textoBotao = document.querySelector('#texto-botao');

const totalUsuarios = document.querySelector('#total-usuarios');
const quantidadeResultados = document.querySelector('#quantidade-resultados');

const usuarioLogado = document.querySelector('#usuario-logado');
const botaoSair = document.querySelector('#botao-sair');

const modalExcluir = document.querySelector('#modal-excluir');
const modalExcluirTexto = document.querySelector('#modal-excluir-texto');

const cancelarExclusao = document.querySelector('#cancelar-exclusao');

const confirmarExclusao = document.querySelector('#confirmar-exclusao');

let usuarios = [];
let usuarioParaExcluir = null;

const token = localStorage.getItem('token');

const usuarioId = Number(localStorage.getItem('usuarioId'));

const usuarioEmail = localStorage.getItem('usuarioEmail');

if (!token) {
    window.location.replace('/login/login.html');
} else {
    usuarioLogado.textContent = usuarioEmail
        ? `Logado como ${usuarioEmail}`
        : 'Usuário autenticado';
}

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioEmail');

    window.location.replace('/login/login.html');
});

async function requisicao(url, opcoes = {}) {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.replace('/login/login.html');

        throw new Error('Usuário não autenticado.');
    }

    const resposta = await fetch(url, {
        ...opcoes,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...opcoes.headers,
        },
    });

    const dados = await resposta.json();

    if (resposta.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('usuarioEmail');

        window.location.replace('/login/login.html');

        throw new Error('Sessão inválida.');
    }

    if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Erro na requisição.');
    }

    return dados;
}

function obterIniciais(nome) {
    return nome
        .trim()
        .split(/\s+/)
        .map((parte) => parte[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function criarLinhaUsuario(usuario) {
    const linha = document.createElement('tr');

    const colunaUsuario = document.createElement('td');

    const avatar = document.createElement('span');
    avatar.className = 'avatar';
    avatar.textContent = obterIniciais(usuario.nome);

    const dadosUsuario = document.createElement('span');

    const nome = document.createElement('strong');
    nome.textContent = usuario.nome;

    const id = document.createElement('small');
    id.textContent = `ID #${String(usuario.id).padStart(3, '0')}`;

    dadosUsuario.append(nome, id);
    colunaUsuario.append(avatar, dadosUsuario);

    const colunaEmail = document.createElement('td');
    colunaEmail.textContent = usuario.email;

    const colunaAcoes = document.createElement('td');

    const botaoEditar = document.createElement('button');
    botaoEditar.className = 'acao';
    botaoEditar.dataset.editar = usuario.id;
    botaoEditar.setAttribute('aria-label', `Editar ${usuario.nome}`);
    botaoEditar.textContent = '✎';

    const botaoExcluir = document.createElement('button');
    botaoExcluir.className = 'acao excluir';
    botaoExcluir.textContent = '×';

    const proprioUsuario = usuario.id === usuarioId;

    if (proprioUsuario) {
        botaoExcluir.disabled = true;

        botaoExcluir.setAttribute('aria-label', 'Não é possível excluir o próprio usuário');

        botaoExcluir.title = 'Você não pode excluir o próprio usuário.';
    } else {
        botaoExcluir.dataset.excluir = usuario.id;

        botaoExcluir.setAttribute('aria-label', `Excluir ${usuario.nome}`);
    }

    colunaAcoes.append(botaoEditar, botaoExcluir);

    linha.append(colunaUsuario, colunaEmail, colunaAcoes);

    return linha;
}

function renderizar() {
    const termo = busca.value.trim().toLowerCase();

    const filtrados = usuarios.filter((usuario) =>
        `${usuario.nome} ${usuario.email}`.toLowerCase().includes(termo),
    );

    totalUsuarios.textContent = usuarios.length;

    quantidadeResultados.textContent = `${filtrados.length} resultado(s)`;

    lista.replaceChildren();

    if (filtrados.length === 0) {
        const linha = document.createElement('tr');
        const coluna = document.createElement('td');

        coluna.className = 'vazio';
        coluna.colSpan = 3;
        coluna.textContent = 'Nenhum usuário encontrado.';

        linha.append(coluna);
        lista.append(linha);

        return;
    }

    filtrados.forEach((usuario) => {
        lista.append(criarLinhaUsuario(usuario));
    });
}

async function carregarUsuarios() {
    try {
        usuarios = await requisicao('/usuarios');

        renderizar();
    } catch (erro) {
        window.mostrarMensagem(erro.message, 'erro');
    }
}

function limparFormulario() {
    form.reset();

    inputId.value = '';
    tituloFormulario.textContent = 'Novo usuário';
    textoBotao.textContent = 'Cadastrar usuário';
    inputSenha.required = true;

    cancelar.hidden = true;
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const id = inputId.value;

    const corpo = {
        nome: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        senha: inputSenha.value,
    };

    try {
        const dados = await requisicao(id ? `/usuarios/${id}` : '/usuarios', {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(corpo),
        });

        window.mostrarMensagem(dados.mensagem, 'sucesso');

        limparFormulario();

        await carregarUsuarios();
    } catch (erro) {
        window.mostrarMensagem(erro.message, 'erro');
    }
});

lista.addEventListener('click', async (evento) => {
    const botao = evento.target.closest('button');

    if (!botao) {
        return;
    }

    const idEditar = botao.dataset.editar;
    const idExcluir = botao.dataset.excluir;

    if (idEditar) {
        const usuario = usuarios.find((item) => item.id === Number(idEditar));

        inputId.value = usuario.id;
        inputNome.value = usuario.nome;
        inputEmail.value = usuario.email;
        inputSenha.value = '';

        inputSenha.required = true;

        tituloFormulario.textContent = 'Editar usuário';
        textoBotao.textContent = 'Salvar alterações';

        cancelar.hidden = false;

        form.scrollIntoView({
            behavior: 'smooth',
        });
    }

    if (idExcluir) {
        usuarioParaExcluir = usuarios.find((item) => item.id === Number(idExcluir));

        modalExcluirTexto.textContent = `Deseja realmente excluir ${usuarioParaExcluir.nome}?`;

        modalExcluir.showModal();
    }
});

cancelarExclusao.addEventListener('click', () => {
    usuarioParaExcluir = null;

    modalExcluir.close();
});

confirmarExclusao.addEventListener('click', async () => {
    if (!usuarioParaExcluir) {
        return;
    }

    try {
        const dados = await requisicao(`/usuarios/${usuarioParaExcluir.id}`, {
            method: 'DELETE',
        });

        window.mostrarMensagem(dados.mensagem, 'sucesso');

        usuarioParaExcluir = null;

        modalExcluir.close();

        await carregarUsuarios();
    } catch (erro) {
        window.mostrarMensagem(erro.message, 'erro');
    }
});

busca.addEventListener('input', renderizar);

cancelar.addEventListener('click', limparFormulario);

if (token) {
    carregarUsuarios();
}
