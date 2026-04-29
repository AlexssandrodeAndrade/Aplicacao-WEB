const campo1 = document.getElementById("campo1");
const campo2 = document.getElementById("campo2");
const resultado = document.getElementById("resultado");

function mostrarMaiorTexto() {
    let texto1 = campo1.value;
    let texto2 = campo2.value;

    if (texto1.length > texto2.length) {
        resultado.textContent = texto1;
    } else if (texto2.length > texto1.length) {
        resultado.textContent = texto2;
    } else {
        resultado.textContent = "Os textos têm o mesmo tamanho";
    }
}

campo1.addEventListener("input", mostrarMaiorTexto);
campo2.addEventListener("input", mostrarMaiorTexto);
