const express = require('express')

const app = express()
const PORT = 3000

// app.get('/', (req, res) => {
//   res.send('home')
// })

// app.get('/usuarios', (req, res) => {
//   res.send('Lista de Usurios')
// })

app.get('/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Pedro' },
  ]
  res.json(usuarios)
})

app.use(express.static('public'))

app.listen(PORT, () => console.log(`rodando em http://localhost:${PORT}`))
