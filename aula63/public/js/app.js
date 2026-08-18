const token = localStorage.getItem('token');
const email = localStorage.getItem('usuarioEmail');

const areaSessao = document.querySelector('#area-sessao');
const statusSessao = document.querySelector('#status-sessao');
const botaoSair = document.querySelector('#botao-sair');
const botaoLogin = document.querySelector('#botao-login');
const botaoUsuarios = document.querySelector('#botao-usuarios');

if (token) {
    statusSessao.textContent = email ? `Logado como ${email}` : 'Usuário autenticado';

    areaSessao.classList.add('autenticado');

    botaoLogin.hidden = true;
    botaoUsuarios.hidden = false;
    botaoSair.hidden = false;
} else {
    statusSessao.textContent = 'Não autenticado';

    botaoLogin.hidden = false;
    botaoUsuarios.hidden = true;
    botaoSair.hidden = true;
}

botaoSair.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioEmail');

    window.location.href = '/login/login.html';
});
