let nome = prompt("Digite seu nome:");
let idade = Number(prompt("Digite sua idade:"));

if (isNaN(idade)) {
    alert("Idade inválida! Por favor, insira um número.");
    idade = 0; // Define idade como 0 para evitar erros posteriores
}else {
    document.getElementById("texto").innerText = 'Olá, ' + nome + '! \n\n Idade: ' + idade + '\n';
    let status = (idade >= 18) ? "Maior de Idade" : "Menor de Idade";
    document.getElementById("status").innerHTML = status;
}
