const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  res.end('Olá Mundo!')
})
server.listen(3000)
