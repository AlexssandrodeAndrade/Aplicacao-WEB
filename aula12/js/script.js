function adicionarParagrafo() {
  let texto = document.getElementById('texto').value
  let p = document.createElement('p')
  p.innerHTML = texto
  p.style.color = 'pink'
  p.id = 'meuTexto'
  document.getElementById('resultado').appendChild(p)
}
