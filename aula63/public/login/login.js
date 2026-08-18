const token = localStorage.getItem('token');

if (token) {
    window.location.replace('/usuarios/usuarios.html');
}

const form = document.querySelector('#form-login');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');
const mensagem = document.querySelector('#mensagem');

const parametros = new URLSearchParams(window.location.search);
const emailCadastro = parametros.get('email');

if (emailCadastro) {
    inputEmail.value = emailCadastro;
    inputSenha.focus();
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
    mensagem.className = 'mensagem erro';
}

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const email = inputEmail.value.trim();
    const senha = inputSenha.value;

    try {
        const resposta = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mostrarMensagem(dados.mensagem || 'Não foi possível realizar o login.');

            return;
        }

        localStorage.setItem('token', dados.token);

        localStorage.setItem('usuarioId', String(dados.usuario.id));

        localStorage.setItem('usuarioEmail', dados.usuario.email);

        window.location.replace('/usuarios/usuarios.html');
    } catch (erro) {
        console.error(erro);

        mostrarMensagem('Erro ao conectar com o servidor.');
    }
});
