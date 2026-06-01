let funcionarios = []

function cadastrarFuncionario() {
  let nome = document.getElementById('nome').value
  let funcao = document.getElementById('funcao').value
  let salario = document.getElementById('salario').value

  let funcionario = {
    nome: nome,
    funcao: funcao,
    salario: salario,
  }

  funcionarios.push(funcionario)

  let tabela = document.getElementById('tabelaFuncionarios')
  tabela.innerHTML = ''

  for (let i = 0; i < funcionarios.length; i++) {
    tabela.innerHTML += `
                    <tr>
                        <td>${funcionarios[i].nome}</td>
                        <td>${funcionarios[i].funcao}</td>
                        <td>R$ ${funcionarios[i].salario}</td>
                    </tr>
                `
  }

  document.getElementById('nome').value = ''
  document.getElementById('funcao').value = ''
  document.getElementById('salario').value = ''
}
