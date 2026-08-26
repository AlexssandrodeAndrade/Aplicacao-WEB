
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { executarExercicio1 } from "./exercicio1/exercicio.js";
import { executarExercicio2 } from "./exercicio2/usuario.js";
import { executarExercicio3 } from "./exercicio3/pedido.js";

const terminal = readline.createInterface({
    input,
    output
});

async function main(): Promise<void> {
    console.log("================================");
    console.log("        AULA 65 - TYPESCRIPT");
    console.log("================================");
    console.log("1 - Exercício 1");
    console.log("2 - Exercício 2");
    console.log("3 - Exercício 3");
    console.log("0 - Sair");
    console.log("================================");

    const opcao: string = await terminal.question(
        "Escolha um exercício: "
    );

    console.log();

    switch (opcao) {
        case "1":
            executarExercicio1();
            break;

        case "2":
            executarExercicio2();
            break;

        case "3":
            executarExercicio3();
            break;

        case "0":
            console.log("Programa encerrado.");
            break;

        default:
            console.log("Opção inválida.");
    }

    terminal.close();
}

main();