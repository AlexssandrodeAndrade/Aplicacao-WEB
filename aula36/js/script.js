function adicionar() {
  let texto = document.getElementById('nomes').value
  let nomes = texto.split(',')
  let lista = document.getElementById('lista')

  lista.innerHTML = ''

  for (let i = 0; i < nomes.length; i++) {
    let li = document.createElement('li')
    li.innerText = nomes[i].trim()
    lista.appendChild(li)
  }
}
