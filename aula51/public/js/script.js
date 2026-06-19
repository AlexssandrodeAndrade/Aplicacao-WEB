let listaJogos = []

async function carregarJogos() {
  const resposta = await fetch('/jogos')
  listaJogos = await resposta.json()

  mostrarTabela()
}

async function buscarTemplate(caminho) {
  const resposta = await fetch(caminho)
  return await resposta.text()
}

function preencherTemplate(template, dados) {
  let html = template

  for (let chave in dados) {
    html = html.replaceAll(`{{${chave}}}`, dados[chave])
  }

  return html
}

async function mostrarTabela() {
  const resultado = document.getElementById('resultado')

  const templateTabela = await buscarTemplate('/templates/tabela.html')
  const templateLinha = await buscarTemplate('/templates/linha-tabela.html')

  let linhas = ''

  for (let jogo of listaJogos) {
    linhas += preencherTemplate(templateLinha, jogo)
  }

  const htmlFinal = preencherTemplate(templateTabela, {
    total: listaJogos.length,
    linhas: linhas,
  })

  resultado.innerHTML = htmlFinal
}

async function mostrarCards() {
  const resultado = document.getElementById('resultado')

  const templateCards = await buscarTemplate('/templates/cards.html')
  const templateCard = await buscarTemplate('/templates/card.html')

  let cards = ''

  for (let jogo of listaJogos) {
    cards += preencherTemplate(templateCard, jogo)
  }

  const htmlFinal = preencherTemplate(templateCards, {
    cards: cards,
  })

  resultado.innerHTML = htmlFinal
}

let idEdicao = null

function novoJogo() {
  idEdicao = null

  document.getElementById('formJogo').reset()
  document.getElementById('tituloModalJogo').textContent = 'Novo Jogo'

  const modal = new bootstrap.Modal(document.getElementById('modalJogo'))
  modal.show()
}

async function salvarJogo(event) {
  event.preventDefault()

  const jogo = {
    nome: document.getElementById('nome').value,
    genero: document.getElementById('genero').value,
    ano: document.getElementById('ano').value,
  }

  if (idEdicao === null) {
    await fetch('/jogos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jogo),
    })
  } else {
    await fetch(`/jogos/${idEdicao}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jogo),
    })

    idEdicao = null
  }

  document.getElementById('formJogo').reset()

  const modalElemento = document.getElementById('modalJogo')
  const modal = bootstrap.Modal.getInstance(modalElemento)
  modal.hide()

  await carregarJogos()
}

function editarJogo(id) {
  id = Number(id)

  const jogo = listaJogos.find((jogo) => jogo.id === id)

  if (!jogo) {
    return
  }

  document.getElementById('nome').value = jogo.nome
  document.getElementById('genero').value = jogo.genero
  document.getElementById('ano').value = jogo.ano
  document.getElementById('tituloModalJogo').textContent = 'Alterar Jogo'

  idEdicao = id

  const modal = new bootstrap.Modal(document.getElementById('modalJogo'))
  modal.show()
}

async function deletarJogo(id) {
  await fetch(`/jogos/${id}`, {
    method: 'DELETE',
  })

  carregarJogos()
}

async function mostrarFormulario() {
  const formulario = document.getElementById('formulario')
  const templateFormulario = await buscarTemplate(
    '/templates/modalFormulario.html',
  )

  formulario.innerHTML = templateFormulario
}
mostrarFormulario()
carregarJogos()
