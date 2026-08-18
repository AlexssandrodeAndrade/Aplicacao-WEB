const formLogin = document.querySelector('#form-login');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');
const mensagem = document.querySelector('#mensagem');

// function mostrarMensagem(texto, tipo) {
//     mensagem.textContent = texto;

//     mensagem.className = `alert alert-${tipo}`;
// }

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
    mensagem.className = `mensagem ${tipo}`;
}

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

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
            mostrarMensagem(dados.mensagem || 'Não foi possível realizar o login.', 'erro');

            return;
        }

        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuarioEmail', email);

        mostrarMensagem('Login realizado com sucesso!', 'sucesso');

        window.location.href = '/';
    } catch (erro) {
        console.error(erro);

        mostrarMensagem('Erro ao conectar com o servidor.', 'erro');
    }
});
