let contador = 1

while (contador <= 10) {
  let p = document.createElement('p')
  p.innerText = contador

  document.body.appendChild(p)

  contador++
}

//for (para)
for (let i = 1; i <= 5; i++) {
  let p = document.createElement('p')
  p.innerText = i
  document.body.appendChild(p)
}
