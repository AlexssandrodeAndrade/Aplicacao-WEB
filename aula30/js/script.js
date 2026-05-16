let lista = []

function inserirTextoNalista() {
  let texto = document.getElementById('texto').value
  lista.push(texto)
}

function atualizaLista() {
  for (let i = 0; i < lista.length; i++) {
    let li = document.createElement('li')
    li.innerHTML = lista[i]
    document.getElementById('lista').appendChild(li)
  }
}
