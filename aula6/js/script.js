// function texto() {
//     document.getElementById("demo").innerHTML = "Olá Mundo!";
// }

// texto();

// function somarDoisNumeros(n1, n2) {
//     let soma = n1 + n2;
//     document.getElementById("demo").innerHTML = "A soma é: " + soma;
// }

// somarDoisNumeros(10, 20);

function recebeNumero() {
    let numero = Math.floor(Math.random() * 10);
    let num = Number(prompt("Digite um número:", numero));
    return num;
}

function somarDoisNumeros(n1, n2) {
    let soma = n1 + n2;
    return soma;
}

function texto() {
    document.getElementById("demo").innerHTML = "Olá Mundo!";
}

let n1 = recebeNumero();
let n2 = recebeNumero();

let resultado = somarDoisNumeros(n1, n2);

document.getElementById("demo").innerHTML = "A soma é: " + resultado;   