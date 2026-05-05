function adicionarTexto() {
  let texto = document.getElementById('texto').value

  if (texto === '') return

  let div = document.createElement('div')

  let p = document.createElement('p')
  p.innerText = texto

  let btn = document.createElement('button')
  btn.innerText = 'Excluir'

  btn.onclick = function () {
    div.remove()
  }

  div.appendChild(p)
  div.appendChild(btn)

  document.getElementById('sessao').appendChild(div)

  document.getElementById('texto').value = ''
}
