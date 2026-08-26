"use strict";
// Utilizando a interface no parâmetro da função
function exibirUsuario(usuario) {
    console.log("Usuário: ", usuario.nome);
    console.log("Idade: ", usuario.idade);
    console.log("Ativo: ", usuario.ativo);
    console.log("E-mail: ", usuario.email);
    console.log("Estado Civil: ", usuario.estadoCivil);
}
// Chamando a função com o objeto no parâmetro
exibirUsuario({ nome: "Alexssandro", idade: 36, ativo: true, email: "alexssandro@teste.com.br", estadoCivil: "casado" });
