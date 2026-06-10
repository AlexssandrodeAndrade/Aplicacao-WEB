let musicas = []

function salvarMusica() {
  let nome = document.getElementById('nome').value
  let autor = document.getElementById('autor').value
  let duracao = document.getElementById('duracao').value
  let colaborador = document.getElementById('colaborador').value
  let link = document.getElementById('link').value

  let musica = {
    nome: nome,
    autor: autor,
    duracao: duracao,
    colaborador: colaborador,
    link: link,
  }

  musicas.push(musica)

  mostrarMusicas()
  limparCampos()
}

function mostrarMusicas() {
  let tabela = document.getElementById('tabelaMusicas')
  tabela.innerHTML = ''

  for (let i = 0; i < musicas.length; i++) {
    tabela.innerHTML += `
          <tr>
            <td>${musicas[i].nome}</td>
            <td>${musicas[i].autor}</td>
            <td>${musicas[i].duracao}</td>
            <td>${musicas[i].colaborador}</td>
            <td>
              <a href="${musicas[i].link}" target="_blank">Abrir</a>
            </td>
          </tr>
        `
  }
}

function exportarMusicas() {
  let json = JSON.stringify(musicas, null, 2)
  document.getElementById('exportarJson').value = json
}

function importarMusicas() {
  let textoJson = document.getElementById('importarJson').value

  let novasMusicas = JSON.parse(textoJson)

  for (let i = 0; i < novasMusicas.length; i++) {
    musicas.push(novasMusicas[i])
  }

  mostrarMusicas()
  document.getElementById('importarJson').value = ''
}

function limparCampos() {
  document.getElementById('nome').value = ''
  document.getElementById('autor').value = ''
  document.getElementById('duracao').value = ''
  document.getElementById('colaborador').value = ''
  document.getElementById('link').value = ''
}

function feedbackBotao(botaoId, texto, icone, classe = 'btn-success') {
  const botao = document.getElementById(botaoId)

  const textoOriginal = botao.dataset.originalText || botao.innerHTML
  const classeOriginal = botao.dataset.originalClass || botao.className

  botao.dataset.originalText = textoOriginal
  botao.dataset.originalClass = classeOriginal

  botao.innerHTML = `${icone} ${texto}`
  botao.className = `btn btn-sm ${classe}`

  setTimeout(() => {
    botao.innerHTML = textoOriginal
    botao.className = classeOriginal
  }, 2000)
}

async function colarJson() {
  try {
    const texto = await navigator.clipboard.readText()

    if (!texto) {
      feedbackBotao('btnColar', 'Vazio', '⚠️', 'btn-warning')
      return
    }

    document.getElementById('importarJson').value = texto
    feedbackBotao('btnColar', 'Colado!', '✅')
  } catch (erro) {
    feedbackBotao('btnColar', 'Erro', '❌', 'btn-danger')
  }
}

async function copiarJson() {
  try {
    const texto = document.getElementById('exportarJson').value

    if (!texto) {
      feedbackBotao('btnCopiar', 'Sem JSON', '⚠️', 'btn-warning')
      return
    }

    await navigator.clipboard.writeText(texto)
    feedbackBotao('btnCopiar', 'Copiado!', '✅')
  } catch (erro) {
    feedbackBotao('btnCopiar', 'Erro', '❌', 'btn-danger')
  }
}
