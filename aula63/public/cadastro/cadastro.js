const token = localStorage.getItem('token');

if (token) {
    window.location.replace('/usuarios/usuarios.html');
}

const form = document.querySelector('#form-cadastro');
const inputNome = document.querySelector('#nome');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenha.value;

    try {
        const resposta = await fetch('/usuarios', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                nome,
                email,
                senha,
            }),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            window.mostrarMensagem(
                dados.mensagem || 'Não foi possível cadastrar o usuário.',
                'erro',
            );

            return;
        }

        window.mostrarMensagem(dados.mensagem || 'Usuário cadastrado com sucesso!', 'sucesso');

        form.reset();

        setTimeout(() => {
            window.location.href = `/login/login.html?email=${encodeURIComponent(
                email.toLowerCase(),
            )}`;
        }, 1200);
    } catch (erro) {
        console.error(erro);

        window.mostrarMensagem('Erro ao conectar com o servidor.', 'erro', 0);
    }
});
