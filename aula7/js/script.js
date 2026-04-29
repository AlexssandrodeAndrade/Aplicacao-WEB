function receberDados(){
    let numero = Number(prompt("Digite número;", (Math.floor(Math.random() * 9) + 1)));
    return numero;
}

function soma(a, b){
    return a + b;
}

function subtracao(a, b){
    return a - b;
}

function multiplicacao(a, b){
    return a * b;
}

function divisao(a, b){
    if(b == 0){
        return "Não é possível dividir por zero";
    }
    return a / b;
}

function calcular(){
    let num1 = receberDados();
    let num2 = receberDados();

    let numeros =  document.getElementById("numeros");
    let resultado = document.getElementById("resultado");

    numeros.innerHTML = `
        <p>Número[1]: ${num1}</p>
        <p>Número[2]: ${num2}</p>`
    ;

    resultado.innerHTML = `
        <p>Soma: ${soma(num1, num2)}</p>
        <p>Subtração: ${subtracao(num1, num2)}</p>
        <p>Multiplicação: ${multiplicacao(num1, num2)}</p>
        <p>Divisão: ${divisao(num1, num2)}</p>
    `;
}

calcular();