function criarElemento() {
  let texto = document.getElementById('texto').value
  let tipo = document.getElementById('tipo').value
  let resultado = document.getElementById('resultado')
  let mensagem = document.getElementById('mensagem')

  mensagem.textContent = ''

  if (texto.trim() === '') {
    mensagem.textContent = 'Digite um texto!'
    return
  }

  let elemento = document.createElement(tipo)
  elemento.textContent = texto

  let br = document.createElement('br')

  resultado.appendChild(elemento)
  resultado.appendChild(br)

  document.getElementById('texto').value = ''
}
