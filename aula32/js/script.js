let numeros = []

function adicionarNumero() {
  let numero = Number(document.getElementById('numero').value)

  if (document.getElementById('numero').value === '') {
    document.getElementById('resultado').innerText = 'Digite um número!'
    return
  }

  numeros.push(numero)

  let item = document.createElement('li')
  item.innerText = numero
  document.getElementById('lista').appendChild(item)

  document.getElementById('numero').value = ''
}

function mostrarMaior() {
  if (numeros.length === 0) {
    document.getElementById('resultado').innerText = 'A lista está vazia!'
    return
  }

  let maior = numeros[0]

  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
      maior = numeros[i]
    }
  }

  document.getElementById('resultado').innerText = 'Maior número: ' + maior
}
