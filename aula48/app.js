const express = require('express')

const app = express()
const PORT = 3000

app.get('/jogos', (req, res) => {
  const jogos = [
    { id: 1, nome: 'Minecraft', genero: 'Sandbox', ano: 2011 },
    { id: 2, nome: 'Tibia', genero: 'MMORPG', ano: 1997 },
    { id: 3, nome: 'Ragnarok', genero: 'MMORPG', ano: 2002 },
    { id: 4, nome: 'GTA V', genero: 'Ação', ano: 2013 },
    { id: 5, nome: 'The Sims 4', genero: 'Simulação', ano: 2014 },
  ]
  res.json(jogos)
})

app.use(express.static('public'))

app.listen(PORT, () => console.log(`rodando em http://localhost:${PORT}`))
