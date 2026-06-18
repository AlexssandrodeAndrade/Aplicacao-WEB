const express = require('express')
const app = express()

let usuarios = [
  { id: 1, nome: 'Pedro' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'aa' },
  { id: 4, nome: 'Alexssandro' },
  { id: 5, nome: 'Tati' },
]

app.use(express.json())

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
  const usuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
  }

  usuarios.push(usuario)

  res.json(usuarios)
})

app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find((u) => u.id == req.params.id)

  usuario.nome = req.body.nome

  res.json(usuario)
})

app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter((u) => u.id != req.params.id)

  res.send('Usuário removido')
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
