let frutas = ['Maçã', 'Banana', 'Uva', 'Laranja', 'Morango']
let lista = document.getElementById('lista')

for (let i = 0; i < frutas.length; i++) {
  let item = document.createElement('li')
  item.innerText = frutas[i]
  lista.appendChild(item)
}
