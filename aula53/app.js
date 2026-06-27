const express = require('express')

const app = express()
app.use(express.json())
app.use(express.static('public'))
const PORT = 3000

let listaCompras = []
let proximoId = 1

function validarNomeItem(nome, idIgnorado = null) {
  if (!nome || nome.trim() === '') {
    return 'O nome do item é obrigatório.'
  }

  const nomeTratado = nome.trim().toLowerCase()

  const itemExistente = listaCompras.find(
    (item) => item.id !== idIgnorado && item.nome.toLowerCase() === nomeTratado,
  )

  if (itemExistente) {
    return 'Este item já está na lista.'
  }

  return null
}

function obterId(req, res) {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({
      erro: 'ID inválido.',
    })
    return null
  }

  return id
}

app.get('/compras', (req, res) => {
  res.json(listaCompras)
})

app.get('/compras/:id', (req, res) => {
  const id = obterId(req, res)

  if (id === null) {
    return
  }

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

  const erro = validarNomeItem(nome)

  if (erro) {
    return res.status(400).json({ erro })
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
  const id = obterId(req, res)

  if (id === null) {
    return
  }

  const { nome, comprado } = req.body

  const item = listaCompras.find((item) => item.id === id)

  if (!item) {
    return res.status(404).json({
      erro: 'Item não encontrado.',
    })
  }

  if (nome !== undefined) {
    const erro = validarNomeItem(nome, id)

    if (erro) {
      return res.status(400).json({ erro })
    }

    item.nome = nome.trim()
  }

  if (comprado !== undefined) {
    item.comprado = comprado
  }

  res.json(item)
})

app.delete('/compras/:id', (req, res) => {
  const id = obterId(req, res)

  if (id === null) {
    return
  }

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
