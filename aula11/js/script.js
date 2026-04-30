const senha = document.getElementById('senha')
const mensagem = document.getElementById('mensagem')

function alterarSenha() {
  let tamanho = senha.value.length

  if (tamanho < 4) {
    mensagem.textContent = 'Senha muito fraca'
    mensagem.style.color = 'red'
  } else if (tamanho >= 4 && tamanho <= 8) {
    mensagem.textContent = 'Senha fraca'
    mensagem.style.color = 'orange'
  } else {
    mensagem.textContent = 'Senha forte'
    mensagem.style.color = 'green'
  }
}
