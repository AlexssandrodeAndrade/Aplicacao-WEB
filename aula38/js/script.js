function salvarCarro() {
  let placa = document.getElementById('placa').value
  let modelo = document.getElementById('modelo').value
  let marca = document.getElementById('marca').value
  let ano = document.getElementById('ano').value

  let carro = {
    placa: placa,
    modelo: modelo,
    marca: marca,
    ano: ano,
  }

  document.getElementById('resultado').innerHTML = `
        Placa: ${carro.placa} <br>
        Modelo: ${carro.modelo} <br>
        Marca: ${carro.marca} <br>
        Ano: ${carro.ano}
      `
}
