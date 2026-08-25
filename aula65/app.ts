// STRING
let nome: string = "João";
let cidade: string = "Rio do Sul";

// NUMBER
let idade: number = 20;
let preco: number = 99.90;

// BOOLEAN
let ativo: boolean = true;
let possuiEstoque: boolean = false;

let alunos: string[] = [
   "João",
   "Maria",
   "Carlos",
   "12365"
];

let notas: number[] = [
   7,
   8,
   10
];

function calcularTotal(preco: number, quantidade: number): number {
   return preco * quantidade;
}

function exibirMensagem(mensagem: string): void {
   console.log(mensagem);
}

function cadastrarUsuario(nome: string, idade?: number): void {
   console.log(nome);
   if(idade){
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
