import { englishWords } from './array_en.js'
import { portugueseWords } from './array_pt-BR.js'

carregarLista(englishWords, 'lista_en')
carregarLista(portugueseWords, 'lista_pt-BR')

function carregarLista(array, idLista) {
  let lista = document.getElementById(idLista)

  lista.innerHTML = ''

  for (let i = 0; i < array.length; i++) {
    let li = document.createElement('li')
    li.innerText = array[i]
    lista.appendChild(li)
  }
}

function buscar() {
  let termo = document.getElementById('pesquisa').value.toLowerCase()
  let resultado = document.getElementById('resultado')

  resultado.innerHTML = ''

  if (termo === '') {
    resultado.innerHTML =
      '<p class="erro">Digite uma palavra para pesquisar.</p>'
    return
  }

  let encontrou = false

  for (let i = 0; i < englishWords.length; i++) {
    if (
      englishWords[i].toLowerCase().includes(termo) ||
      portugueseWords[i].toLowerCase().includes(termo)
    ) {
      resultado.innerHTML += `
        <div class="card">
          <strong>Inglês:</strong> ${englishWords[i]} <br>
          <strong>Português:</strong> ${portugueseWords[i]}
        </div>
      `
      encontrou = true
    }
  }

  if (!encontrou) {
    resultado.innerHTML = '<p class="erro">Palavra não encontrada.</p>'
  }
}

window.buscar = buscar
