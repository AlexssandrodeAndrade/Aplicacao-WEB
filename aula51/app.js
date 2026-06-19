const express = require('express')

const app = express()
const PORT = 3000

let jogos = [
  { id: 1, nome: 'Minecraft', genero: 'Sandbox', ano: 2011 },
  { id: 2, nome: 'Tibia', genero: 'MMORPG', ano: 1997 },
  { id: 3, nome: 'Ragnarok', genero: 'MMORPG', ano: 2002 },
  { id: 4, nome: 'GTA V', genero: 'Ação', ano: 2013 },
  { id: 5, nome: 'The Sims 4', genero: 'Simulação', ano: 2014 },
]

app.use(express.json())

app.get('/jogos', (req, res) => {
  res.json(jogos)
})

app.post('/jogos', (req, res) => {
  const novoJogo = {
    id: jogos.length + 1,
    nome: req.body.nome,
    genero: req.body.genero,
    ano: Number(req.body.ano),
  }

  jogos.push(novoJogo)
  res.status(201).json(novoJogo)
})

app.put('/jogos/:id', (req, res) => {
  const id = Number(req.params.id)

  const jogo = jogos.find((jogo) => jogo.id === id)

  if (!jogo) {
    return res.status(404).json({ mensagem: 'Jogo não encontrado.' })
  }

  jogo.nome = req.body.nome
  jogo.genero = req.body.genero
  jogo.ano = Number(req.body.ano)

  res.json(jogo)
})

app.delete('/jogos/:id', (req, res) => {
  const id = Number(req.params.id)

  jogos = jogos.filter((jogo) => jogo.id !== id)

  res.json({ mensagem: 'Jogo deletado com sucesso.' })
})

app.use(express.static('public'))

app.listen(PORT, () => console.log(`rodando em http://localhost:${PORT}`))
