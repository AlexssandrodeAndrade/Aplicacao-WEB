function mostrarNumeros() {
  let num1 = Number(document.getElementById('num1').value)
  let num2 = Number(document.getElementById('num2').value)
  let resultado = ''

  if (num1 > num2) {
    document.getElementById('resultado').innerHTML =
      'O primeiro número não pode ser maior que o segundo.'
    return
  }

  for (let i = num1; i <= num2; i++) {
    resultado += i

    if (i < num2) {
      resultado += ', '
    }
  }

  document.getElementById('resultado').innerHTML = resultado
}
