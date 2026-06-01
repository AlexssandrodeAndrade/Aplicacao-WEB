let musicas = []

$('#btnSalvarMusica').click(function () {
  let nome = $('#nome').val()
  let autor = $('#autor').val()
  let duracao = $('#duracao').val()
  let colaborador = $('#colaborador').val()
  let link = $('#link').val()

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
})

$('#btnExportar').click(function () {
  let json = JSON.stringify(musicas, null, 2)
  $('#exportarJson').val(json)
})

$('#btnImportar').click(function () {
  let textoJson = $('#importarJson').val()

  let novasMusicas = JSON.parse(textoJson)

  for (let i = 0; i < novasMusicas.length; i++) {
    musicas.push(novasMusicas[i])
  }

  mostrarMusicas()
  $('#importarJson').val('')
})

$('#btnArquivo').click(async function () {
  try {
    let resposta = await fetch('./Alexssandro.json')
    let conteudo = await resposta.text()

    $('#importarJson').val(conteudo)

    feedbackBotao('btnArquivoJson', 'Carregado!', '✅')
  } catch (erro) {
    feedbackBotao('btnArquivoJson', 'Erro', '❌', 'btn-danger')
  }
})

$('#btnColar').click(async function () {
  try {
    const texto = await navigator.clipboard.readText()

    if (!texto) {
      feedbackBotao('btnColar', 'Vazio', '⚠️', 'btn-warning')
      return
    }

    $('#importarJson').val(texto)
    feedbackBotao('btnColar', 'Colado!', '✅')
  } catch (erro) {
    feedbackBotao('btnColar', 'Erro', '❌', 'btn-danger')
  }
})

$('#btnCopiar').click(async function () {
  try {
    const texto = $('#exportarJson').val()
    if (!texto) {
      feedbackBotao('btnCopiar', 'Sem JSON', '⚠️', 'btn-warning')
      return
    }
    await navigator.clipboard.writeText(texto)
    feedbackBotao('btnCopiar', 'Copiado!', '✅')
    $('#exportarJson').val('')
  } catch (erro) {
    feedbackBotao('btnCopiar', 'Erro', '❌', 'btn-danger')
  }
})

function mostrarMusicas() {
  let tabela = $('#tabelaMusicas')

  tabela.html('')

  for (let i = 0; i < musicas.length; i++) {
    tabela.append(`
      <tr>
        <td>${musicas[i].nome}</td>
        <td>${musicas[i].autor}</td>
        <td>${musicas[i].duracao}</td>
        <td>${musicas[i].colaborador}</td>
        <td>
          <a href="${musicas[i].link}" target="_blank">Abrir</a>
        </td>
      </tr>
    `)
  }
}

function limparCampos() {
  $('#nome').val('')
  $('#autor').val('')
  $('#duracao').val('')
  $('#colaborador').val('')
  $('#link').val('')
}

function feedbackBotao(botaoId, texto, icone, classe = 'btn-success') {
  let botao = $('#' + botaoId)

  let textoOriginal = botao.data('originalText') || botao.html()
  let classeOriginal = botao.data('originalClass') || botao.attr('class')

  botao.data('originalText', textoOriginal)
  botao.data('originalClass', classeOriginal)

  botao.html(`${icone} ${texto}`)
  botao.attr('class', `btn btn-sm ${classe}`)

  setTimeout(() => {
    botao.html(textoOriginal)
    botao.attr('class', classeOriginal)
  }, 2000)
}
