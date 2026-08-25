"use strict";
// STRING
let nome = "João";
let cidade = "Rio do Sul";
// NUMBER
let idade = 20;
let preco = 99.90;
// BOOLEAN
let ativo = true;
let possuiEstoque = false;
let alunos = [
    "João",
    "Maria",
    "Carlos",
    "12365"
];
let notas = [
    7,
    8,
    10
];
function calcularTotal(preco, quantidade) {
    return preco * quantidade;
}
function exibirMensagem(mensagem) {
    console.log(mensagem);
}
function cadastrarUsuario(nome, idade) {
    console.log(nome);
    if (idade) {
        console.log(idade);
    }
}
/////////////////////////
console.log(nome);
console.log(cidade);
console.log(idade);
console.log(preco);
console.log(ativo);
console.log(possuiEstoque);
console.log(alunos);
console.log(notas);
console.log(calcularTotal(5, 20));
exibirMensagem("Hello World!!");
// PODEMOS CHAMAR:
cadastrarUsuario("João");
// OU:
cadastrarUsuario("Maria", 25);
