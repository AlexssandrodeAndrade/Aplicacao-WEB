function salvar() {
  let texto = document.getElementById('textoTela')
  let buscar = document.getElementById('buscar').value
  let alterar = document.getElementById('alterar').value

  texto.innerText = texto.innerText.replace(buscar, alterar)
}
