function mostrarNumeros() {
  console.log(document.getElementById('num1').value)
  let num1 = Number(document.getElementById('num1').value)
  console.log(num1)

  let num2 = Number(document.getElementById('num2').value)
  let resultado = ''

  if (num1 > num2) {
    document.getElementById('resultado').innerHTML =
      'O primeiro número não pode ser maior que o segundo.'
    return
  }

  for (num1; num1 <= num2; num1++) {
    resultado += num1

    if (num1 < num2) {
      resultado += ', '
    }
  }

  document.getElementById('resultado').innerHTML = resultado
}
