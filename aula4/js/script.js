// script.js
let numero = Number(prompt("Digite um número:"));
let titulo = document.getElementById("titulo");

if(numero >= 0){
    titulo.innerHTML = "Número Positivo";
    titulo.style.color = "green";
}else{
    titulo.innerHTML = "Número Negativo";
    titulo.style.color = "red";
}