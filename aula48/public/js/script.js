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

carregarJogos()
