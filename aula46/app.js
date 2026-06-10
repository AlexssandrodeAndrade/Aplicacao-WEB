const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  if (req.url === '/playlist') {
    const html = fs.readFileSync('./playlist/index.html')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  } else if (req.url === '/playlist/style.css') {
    const css = fs.readFileSync('./playlist/css/style.css')
    res.setHeader('Content-Type', 'text/css')
    return res.end(css)
  } else if (req.url === '/playlist/jquery.js') {
    const js = fs.readFileSync('./playlist/js/jquery.js')
    res.setHeader('Content-Type', 'application/javascript')
    return res.end(js)
  } else if (req.url === '/playlist/Alexssandro.json') {
    const json = fs.readFileSync('./playlist/Alexssandro.json')
    res.setHeader('Content-Type', 'application/json', 'charset=utf-8')
    return res.end(json)
  } else if (req.url === '/mercado') {
    const html = fs.readFileSync('./mercado/index.html')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    return res.end(html)
  } else if (req.url === '/mercado/style.css') {
    const css = fs.readFileSync('./mercado/css/style.css')
    res.setHeader('Content-Type', 'text/css')
    return res.end(css)
  } else if (req.url === '/mercado/script.js') {
    const js = fs.readFileSync('./mercado/js/script.js')
    res.setHeader('Content-Type', 'application/javascript')
    return res.end(js)
  } else {
    res.end('Erro: 404')
  }
})
server.listen(3000)
