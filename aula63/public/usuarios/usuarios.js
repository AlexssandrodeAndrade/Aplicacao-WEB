const form = document.querySelector('#form-usuario');
const lista = document.querySelector('#lista-usuarios');
const busca = document.querySelector('#busca');
const mensagem = document.querySelector('#mensagem');
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

let usuarios = [];

const token = localStorage.getItem('token');
const usuarioEmail = localStorage.getItem('usuarioEmail');

if (!token) {
    window.location.replace('/');
} else {
    usuarioLogado.textContent = usuarioEmail
        ? `Logado como ${usuarioEmail}`
        : 'Usuário autenticado';
}

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioEmail');

    window.location.replace('/');
});

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? '#b84e4e' : '#1f8a70';
}

async function requisicao(url, opcoes = {}) {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.replace('/');

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
        localStorage.removeItem('usuarioEmail');

        window.location.replace('/');

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
    botaoExcluir.dataset.excluir = usuario.id;
    botaoExcluir.setAttribute('aria-label', `Excluir ${usuario.nome}`);
    botaoExcluir.textContent = '×';

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
        mostrarMensagem(erro.message, true);
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

        mostrarMensagem(dados.mensagem);

        limparFormulario();

        await carregarUsuarios();
    } catch (erro) {
        mostrarMensagem(erro.message, true);
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
        const usuario = usuarios.find((item) => item.id === Number(idExcluir));

        if (!confirm(`Deseja excluir ${usuario.nome}?`)) {
            return;
        }

        try {
            const dados = await requisicao(`/usuarios/${idExcluir}`, {
                method: 'DELETE',
            });

            mostrarMensagem(dados.mensagem);

            await carregarUsuarios();
        } catch (erro) {
            mostrarMensagem(erro.message, true);
        }
    }
});

busca.addEventListener('input', renderizar);

cancelar.addEventListener('click', limparFormulario);

if (token) {
    carregarUsuarios();
}
