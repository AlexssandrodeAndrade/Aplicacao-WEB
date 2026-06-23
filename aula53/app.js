const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('public'))
const PORT = 3000

let listaCompras = []
let proximoId = 1

app.get('/compras', (req, res) => {
  res.json(listaCompras)
})

app.get('/compras/:id', (req, res) => {
  const id = Number(req.params.id)

  const item = listaCompras.find((item) => item.id === id)

  if (!item) {
    return res.status(404).json({
      erro: 'Item não encontrado.',
    })
  }

  res.json(item)
})

app.post('/compras', (req, res) => {
  const { nome } = req.body

  if (!nome || nome.trim() === '') {
    return res.status(400).json({
      erro: 'O nome do item é obrigatório.',
    })
  }

  const novoItem = {
    id: proximoId++,
    nome: nome.trim(),
    comprado: false,
  }

  listaCompras.push(novoItem)

  res.status(201).json(novoItem)
})

app.put('/compras/:id', (req, res) => {
  const id = Number(req.params.id)
  const { nome, comprado } = req.body

  const item = listaCompras.find((item) => item.id === id)

  if (!item) {
    return res.status(404).json({
      erro: 'Item não encontrado.',
    })
  }

  if (nome !== undefined) {
    if (nome.trim() === '') {
      return res.status(400).json({
        erro: 'O nome do item não pode ficar vazio.',
      })
    }

    item.nome = nome.trim()
  }

  if (comprado !== undefined) {
    item.comprado = comprado
  }

  res.json(item)
})

app.delete('/compras/:id', (req, res) => {
  const id = Number(req.params.id)

  const indice = listaCompras.findIndex((item) => item.id === id)

  if (indice === -1) {
    return res.status(404).json({
      erro: 'Item não encontrado.',
    })
  }

  listaCompras.splice(indice, 1)

  res.json({
    mensagem: 'Item removido com sucesso.',
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
