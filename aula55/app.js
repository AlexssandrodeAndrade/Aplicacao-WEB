const pool = require('./database')
const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))

// async function testaConexao() {
//   const resultado = await pool.query('SELECT NOW()')
//   console.log(resultado.rows)
// }
// testaConexao()

app.get('/usuarios', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM usuarios')
  res.json(resultado.rows)
})

app.post('/usuarios', async (req, res) => {
  const resultado = await pool.query(
    `INSERT INTO usuarios(nome)
        VALUES($1)`,
    [req.body.nome],
  )
  res.status(201).json({ mensagem: 'Usuário incluído com sucesso!' })
})

app.put('/usuarios/:id', async (req, res) => {
  console.log(req.params.id)

  const resultado = await pool.query(
    `UPDATE usuarios
        SET nome = $1
        WHERE id = $2`,
    [req.body.nome, req.params.id],
  )
  res.json({ mensagem: 'Usuário alterado com sucesso!' })
})

app.delete('/usuarios/:id', async (req, res) => {
  const resultado = await pool.query(
    `DELETE FROM usuarios
        WHERE id = $1`,
    [req.params.id],
  )
  res.json({ mensagem: 'Usuário removido com sucesso!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
