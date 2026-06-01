let produtos = [
  {
    nome: 'Notebook',
    quantidade: 5,
    preco: 3500,
  },
  {
    nome: 'Mouse',
    quantidade: 10,
    preco: 80,
  },
  {
    nome: 'Teclado',
    quantidade: 7,
    preco: 150,
  },
  {
    nome: 'Monitor',
    quantidade: 3,
    preco: 1200,
  },
]

let tabela = document.getElementById('tabelaProdutos')

for (let i = 0; i < produtos.length; i++) {
  tabela.innerHTML += `
                <tr>
                    <td>${produtos[i].nome}</td>
                    <td>${produtos[i].quantidade}</td>
                    <td>R$ ${produtos[i].preco}</td>
                </tr>
            `
}
