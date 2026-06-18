const express = require('express')
const app = express()

let livros = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899 },
  {
    id: 2,
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    ano: 1943,
  },
]

app.use(express.json())

// LISTAR TODOS
app.get('/livros', (req, res) => {
  res.json(livros)
})

// BUSCAR POR ID
app.get('/livros/:id', (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id)

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' })
  }

  res.json(livro)
})

// CADASTRAR
app.post('/livros', (req, res) => {
  const livro = {
    id: livros.length + 1,
    titulo: req.body.titulo,
    autor: req.body.autor,
    ano: req.body.ano,
  }

  livros.push(livro)

  res.status(201).json(livro)
})

// ATUALIZAR
app.put('/livros/:id', (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id)

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' })
  }

  livro.titulo = req.body.titulo
  livro.autor = req.body.autor
  livro.ano = req.body.ano

  res.json(livro)
})

// DELETAR
app.delete('/livros/:id', (req, res) => {
  livros = livros.filter((l) => l.id != req.params.id)

  res.json({ mensagem: 'Livro removido' })
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
