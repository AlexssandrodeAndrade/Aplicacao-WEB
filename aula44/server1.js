const http = require('http')

const numero1 = 10
const numero2 = 5

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end(
      layout(`
        <h1>Calculadora Node.js</h1>

        <a href="/soma">Soma</a>
        <a href="/subtracao">Subtração</a>
        <a href="/multiplicacao">Multiplicação</a>
        <a href="/divisao">Divisão</a>
      `),
    )
  } else if (req.url === '/soma') {
    res.end(layout(`<h1>Soma: ${numero1 + numero2}</h1><a href="/">Voltar</a>`))
  } else if (req.url === '/subtracao') {
    res.end(
      layout(`<h1>Subtração: ${numero1 - numero2}</h1><a href="/">Voltar</a>`),
    )
  } else if (req.url === '/multiplicacao') {
    res.end(
      layout(
        `<h1>Multiplicação: ${numero1 * numero2}</h1><a href="/">Voltar</a>`,
      ),
    )
  } else if (req.url === '/divisao') {
    res.end(
      layout(`<h1>Divisão: ${numero1 / numero2}</h1><a href="/">Voltar</a>`),
    )
  } else {
    res.statusCode = 404
    res.end(layout('<h1>Página não encontrada</h1>'))
  }
})
function layout(conteudo) {
  return `
    <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <title>Calculadora</title>
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
