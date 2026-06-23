async function carregarMensagem() {
  const resposta = await fetch('/mensagem')
  const dados = await resposta.json()

  document.getElementById('mensagem').innerText = dados.mensagem
}

async function alterarNome() {
  const nome = document.getElementById('nome').value

  if (!nome) {
    alert('Digite um nome.')
    return
  }

  await fetch('/usuario/nome', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome }),
  })

  document.getElementById('nome').value = ''

  carregarMensagem()
}

carregarMensagem()
