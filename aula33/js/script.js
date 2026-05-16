let lista = []

function adicionar() {
  let valor = document.getElementById('textoAdicionar').value

  if (valor === '') {
    document.getElementById('resultado').innerText = 'Digite um valor!'
    return
  }

  lista.push(valor)
  let li = document.createElement('li')
  li.innerText = valor
  document.getElementById('lista').appendChild(li)
  document.getElementById('textoAdicionar').value = ''
}

function pesquisar() {
  let busca = document.getElementById('textoPesquisar').value
  let encontrado = false

  if (busca === '') {
    document.getElementById('resultado').innerText =
      'Digite um valor para pesquisar!'
    return
  }

  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === busca) {
      encontrado = true
    }
  }

  if (encontrado) {
    document.getElementById('resultado').innerText =
      'Valor encontrado na lista!'
  } else {
    document.getElementById('resultado').innerText =
      'Valor não encontrado na lista!'
  }
}
