function adicionarItem() {
  let input = document.getElementById('inputItem')
  let texto = input.value.trim()

  if (texto === '') return

  let li = document.createElement('li')

  // checkbox
  let checkbox = document.createElement('input')
  checkbox.type = 'checkbox'

  // texto
  let span = document.createElement('span')
  span.className = 'item-text'
  span.innerText = texto

  // botão remover
  let btn = document.createElement('button')
  btn.innerText = 'X'
  btn.className = 'remover'

  // evento remover
  btn.onclick = function () {
    li.remove()
  }

  // evento riscar (DESAFIO PLUS)
  checkbox.onchange = function () {
    span.classList.toggle('comprado')
  }

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(btn)

  document.getElementById('lista').appendChild(li)

  input.value = ''
  input.focus()
}
