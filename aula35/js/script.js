function atualizarTexto() {
  let texto = document.getElementById('texto').value

  document.getElementById('maiusculo').innerText = texto.toUpperCase()
  document.getElementById('minusculo').innerText = texto.toLowerCase()
  document.getElementById('quantidade').innerText = texto.length
}
