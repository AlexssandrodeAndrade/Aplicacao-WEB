// Exercício 01 - Aplicar desconto

function aplicarDesconto(preco: number, porcentagem: number): number {
    return preco - preco * (porcentagem / 100);
}

console.log("Exercício 01:");
console.log(aplicarDesconto(100, 10));


// Exercício 02 - Pesquisa de palavras

const dicionario: string[] = [
    "computador",
    "teclado",
    "mouse",
    "monitor",
    "internet"
];

function pesquisarPalavra(palavra: string): boolean {
    return dicionario.includes(palavra);
}

console.log("\nExercício 02:");
console.log(pesquisarPalavra("mouse"));
console.log(pesquisarPalavra("celular"));