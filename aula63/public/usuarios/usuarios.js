const form = document.querySelector('#form-usuario');
const lista = document.querySelector('#lista-usuarios');
const busca = document.querySelector('#busca');
const mensagem = document.querySelector('#mensagem');
const cancelar = document.querySelector('#cancelar');

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

function renderizar() {
    const termo = busca.value.trim().toLowerCase();

    const filtrados = usuarios.filter((usuario) =>
        `${usuario.nome} ${usuario.email}`.toLowerCase().includes(termo),
    );

    document.querySelector('#total-usuarios').textContent = usuarios.length;

    document.querySelector('#quantidade-resultados').textContent =
        `${filtrados.length} resultado(s)`;

    lista.innerHTML = filtrados.length
        ? filtrados
              .map(
                  (usuario) => `
                    <tr>
                        <td>
                            <span class="avatar">
                                ${usuario.nome
                                    .split(' ')
                                    .map((parte) => parte[0])
                                    .slice(0, 2)
                                    .join('')}
                            </span>

                            <span>
                                <strong>${usuario.nome}</strong>

                                <small>
                                    ID #${String(usuario.id).padStart(3, '0')}
                                </small>
                            </span>
                        </td>

                        <td>
                            ${usuario.email}
                        </td>

                        <td>
                            <button
                                class="acao"
                                data-editar="${usuario.id}"
                                aria-label="Editar ${usuario.nome}"
                            >
                                ✎
                            </button>

                            <button
                                class="acao excluir"
                                data-excluir="${usuario.id}"
                                aria-label="Excluir ${usuario.nome}"
                            >
                                ×
                            </button>
                        </td>
                    </tr>
                `,
              )
              .join('')
        : `
            <tr>
                <td class="vazio" colspan="3">
                    Nenhum usuário encontrado.
                </td>
            </tr>
        `;
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

    document.querySelector('#usuario-id').value = '';

    document.querySelector('#titulo-formulario').textContent = 'Novo usuário';

    document.querySelector('#texto-botao').textContent = 'Cadastrar usuário';

    document.querySelector('#senha').required = true;

    cancelar.hidden = true;
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const id = document.querySelector('#usuario-id').value;

    const corpo = {
        nome: document.querySelector('#nome').value.trim(),
        email: document.querySelector('#email').value.trim(),
        senha: document.querySelector('#senha').value,
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

        document.querySelector('#usuario-id').value = usuario.id;
        document.querySelector('#nome').value = usuario.nome;
        document.querySelector('#email').value = usuario.email;
        document.querySelector('#senha').value = '';

        document.querySelector('#senha').required = true;

        document.querySelector('#titulo-formulario').textContent = 'Editar usuário';

        document.querySelector('#texto-botao').textContent = 'Salvar alterações';

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

carregarUsuarios();
