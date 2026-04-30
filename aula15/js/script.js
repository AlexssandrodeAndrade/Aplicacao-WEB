function adicionar() {
  let input = document.getElementById('texto')
  let lista = document.getElementById('lista')

  const valor = input.value.trim()

  if (valor === '') {
    return // evita adicionar vazio
  }

  let li = document.createElement('li')
  li.textContent = valor

  lista.appendChild(li)

  input.value = ''
}

function limpar() {
  let lista = document.getElementById('lista')
  lista.innerHTML = '' // limpa tudo
}
