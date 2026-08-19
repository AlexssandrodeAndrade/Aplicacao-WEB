const token = localStorage.getItem('token');

if (token) {
    window.location.replace('/usuarios/usuarios.html');
}

const form = document.querySelector('#form-login');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');

const parametros = new URLSearchParams(window.location.search);

const emailCadastro = parametros.get('email');

if (emailCadastro) {
    inputEmail.value = emailCadastro;
    inputSenha.focus();
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
            window.mostrarMensagem(dados.mensagem || 'Não foi possível realizar o login.', 'erro');

            return;
        }

        localStorage.setItem('token', dados.token);

        localStorage.setItem('usuarioId', String(dados.usuario.id));

        localStorage.setItem('usuarioEmail', dados.usuario.email);

        window.location.replace('/usuarios/usuarios.html');
    } catch (erro) {
        console.error(erro);

        window.mostrarMensagem('Erro ao conectar com o servidor.', 'erro', 0);
    }
});
