function somar(){
    let valor = Number(document.getElementById("resultado").innerText);
    document.getElementById("resultado").innerText = ++valor;
}

function subtrair(){
    let valor = Number(document.getElementById("resultado").innerText);
    document.getElementById("resultado").innerText = --valor;
}
