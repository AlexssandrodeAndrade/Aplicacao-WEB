const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  if (req.url === '/teste') {
    const html = fs.readFileSync('./index.html')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  } else if (req.url === '/style.css') {
    const css = fs.readFileSync('./css/style.css')
    res.setHeader('Content-Type', 'text/css')
    return res.end(css)
  } else if (req.url === '/script.js') {
    const js = fs.readFileSync('./script.js')
    res.setHeader('Content-Type', 'application/javascript')
    return res.end(js)
  } else {
    res.end('Erro: 404')
  }
})
server.listen(3000)
