let produto = prompt("Digite o nome do produto:");
let preco = Number(prompt("Digite o preço do produto:"));
let estoque = Number(prompt("Digite o estoque disponível:"));

let ganho = preco * estoque;

document.getElementById("resultado").innerHTML = `
  <h1><b>Produto: ${produto}</b></h1>
  <p><b>Estoque:</b> ${estoque} unidades</p>
  <p><b>Preço:</b> R$ ${preco.toFixed(2).replace(".", ",")}</p>
  <p><b>Ganho estimado:</b> R$ ${ganho.toFixed(2).replace(".", ",")}</p>
`;