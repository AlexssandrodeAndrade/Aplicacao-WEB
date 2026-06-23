const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('public'))
const PORT = 3000

let nomeUsuario = 'Alexssandro'

app.get('/mensagem', (req, res) => {
  res.json({
    mensagem: `Olá, ${nomeUsuario}!`,
  })
})

app.put('/usuario/nome', (req, res) => {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({
      erro: 'O nome é obrigatório.',
    })
  }

  nomeUsuario = nome

  res.json({
    mensagem: 'Nome alterado com sucesso.',
    nome: nomeUsuario,
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
