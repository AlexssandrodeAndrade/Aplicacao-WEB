"use strict";
// Exercício 01 - Aplicar desconto
function aplicarDesconto(preco, porcentagem) {
    return preco - preco * (porcentagem / 100);
}
console.log("Exercício 01:");
console.log(aplicarDesconto(100, 10));
// Exercício 02 - Pesquisa de palavras
const dicionario = [
    "computador",
    "teclado",
    "mouse",
    "monitor",
    "internet"
];
function pesquisarPalavra(palavra) {
    return dicionario.includes(palavra);
}
console.log("\nExercício 02:");
console.log(pesquisarPalavra("mouse"));
console.log(pesquisarPalavra("celular"));
