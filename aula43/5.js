// Crie um array com objetos de alunos contendo: nome, idade e nota.
// Apresente todos os alunos e ao final mostre a maior nota e o nome do aluno que tirou a maior nota.

let alunos = []

alunos.push({ nome: 'Alexssandro', idade: 36, nota: 8 })
alunos.push({ nome: 'Maria', idade: 20, nota: 8.5 })
alunos.push({ nome: 'Ana', idade: 22, nota: 9 })
alunos.push({ nome: 'Pedro', idade: 50, nota: 10 })
alunos.push({ nome: 'João', idade: 25, nota: 7 })

let maiorAluno = alunos[0]

// console.log('Nome'.padEnd(22) + 'Idade'.padEnd(10) + 'Nota')

console.log('-'.repeat(30))
console.table(alunos)
for (let i = 0; i < alunos.length; i++) {
  //   console.log(
  //     alunos[i].nome.padEnd(22) +
  //       String(alunos[i].idade).padEnd(10) +
  //       alunos[i].nota,
  //   )
  if (alunos[i].nota > maiorAluno.nota) {
    maiorAluno = alunos[i]
  }
}

console.log('-'.repeat(30))

// for (let i = 0; i < alunos.length; i++) {
//   let aluno = `Nome: ${alunos[i].nome}, Idade: ${alunos[i].idade}, Nota: ${alunos[i].nota}`
//   console.log(aluno)
//   if (alunos[i].nota > maiorAluno.nota) {
//     maiorAluno = alunos[i]
//   }
// }

console.log(
  'O aluno(a): ' + maiorAluno.nome + ', tem maior nota: ' + maiorAluno.nota,
)
