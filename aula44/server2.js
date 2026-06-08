const http = require('http')

const alunos = [
  {
    nome: 'Ana Silva',
    idade: 16,
    turma: '1º Ano A',
    nota: 8.5,
  },
  {
    nome: 'João Santos',
    idade: 17,
    turma: '2º Ano B',
    nota: 7.8,
  },
  {
    nome: 'Maria Oliveira',
    idade: 15,
    turma: '1º Ano B',
    nota: 9.2,
  },
]

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    head(res, 'text/html')
    res.end(
      layout(`
        <h1>Sistema Escolar</h1>

        <a href="/sobre">Sobre</a>
        <a href="/contatos">Contatos</a>
        <a href="/alunos">Alunos JSON</a>
      `),
    )
  } else if (req.url === '/sobre') {
    head(res, 'text/html')

    res.end(
      layout(`
        <h1>Sobre o Sistema</h1>

        <p>
          Este sistema escolar foi criado para organizar informações básicas
          da escola, como dados dos alunos, contatos e informações gerais.
        </p>

        <a href="/">Voltar</a>
      `),
    )
  } else if (req.url === '/contatos') {
    head(res, 'text/html')

    res.end(
      layout(`
        <h1>Contatos da Escola</h1>

        <p><strong>Telefone:</strong> (47) 99999-9999</p>
        <p><strong>Email:</strong> contato@escola.com.br</p>
        <p><strong>Endereço:</strong> Rua Principal, 123 - Centro</p>

        <a href="/">Voltar</a>
      `),
    )
  } else if (req.url === '/alunos') {
    head(res, 'application/json')

    res.end(JSON.stringify(alunos, null, 2))
  } else {
    res.statusCode = 404
    head(res, 'text/html')

    res.end(layout('<h1>Página não encontrada</h1><a href="/">Voltar</a>'))
  }
})

function head(res, tipo) {
  return res.setHeader('Content-Type', `${tipo}; charset=utf-8`)
}

function layout(conteudo) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Sistema Escolar</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
          }

          a {
            display: inline-block;
            padding: 10px 20px;
            margin: 5px;
            background: #0d6efd;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }

          a:hover {
            background: #0b5ed7;
          }

          p {
            font-size: 18px;
          }
        </style>
      </head>

      <body>
        ${conteudo}
      </body>
    </html>
  `
}

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
