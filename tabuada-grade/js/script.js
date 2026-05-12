function gerarTabuada() {
  let limite = Number(document.getElementById('limite').value)
  let tabela = '<table>'

  tabela += '<tr><th>0</th>'

  for (let i = 1; i <= limite; i++) {
    tabela += '<th>' + i + '</th>'
  }

  tabela += '</tr>'

  for (let linha = 1; linha <= limite; linha++) {
    tabela += '<tr>'
    tabela += '<th>' + linha + '</th>'

    for (let coluna = 1; coluna <= limite; coluna++) {
      resultado = linha * coluna
      title = linha + ' X ' + coluna + ' = ' + resultado
      tabela += '<td title="' + title + '">' + resultado + '</td>'
    }

    tabela += '</tr>'
  }

  tabela += '</table>'

  document.getElementById('resultado').innerHTML = tabela
}
