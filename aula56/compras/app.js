const express = require('express')
const pool = require('./database')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/api', (req, res) => {
  res.json({
    mensagem: 'API de lista de compras funcionando',
  })
})

function validarId(id) {
  const numero = Number(id)

  return Number.isInteger(numero) && numero > 0
}

app.get('/compras', async (req, res) => {
  try {
    const resultado = await pool.query(`
            SELECT id, nome, comprado, criado_em
            FROM compras
            ORDER BY id ASC
        `)

    res.json(resultado.rows)
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: 'Erro ao buscar lista de compras',
    })
  }
})

app.get('/compras/:id', async (req, res) => {
  const { id } = req.params

  if (!validarId(id)) {
    return res.status(400).json({
      erro: 'ID inválido',
    })
  }

  try {
    const resultado = await pool.query(
      `
            SELECT id, nome, comprado, criado_em
            FROM compras
            WHERE id = $1
            `,
      [id],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        erro: 'Item não encontrado',
      })
    }

    res.json(resultado.rows[0])
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: 'Erro ao buscar item',
    })
  }
})

app.post('/compras', async (req, res) => {
  const { nome, comprado } = req.body

  const validacaoNome = validarNome(nome)

  if (!validacaoNome.valido) {
    return res.status(400).json({
      erro: validacaoNome.erro,
    })
  }

  const validacaoComprado = validarBoolean(comprado, 'Comprado', false)

  if (!validacaoComprado.valido) {
    return res.status(400).json({
      erro: validacaoComprado.erro,
    })
  }

  try {
    const resultado = await pool.query(
      `
            INSERT INTO compras (nome, comprado)
            VALUES ($1, $2)
            RETURNING id, nome, comprado, criado_em
            `,
      [validacaoNome.valor, validacaoComprado.valor ?? false],
    )

    res.status(201).json({
      mensagem: 'Item cadastrado com sucesso',
      item: resultado.rows[0],
    })
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: 'Erro ao cadastrar item',
    })
  }
})

app.put('/compras/:id', async (req, res) => {
  const { id } = req.params
  const { nome, comprado } = req.body

  if (!validarId(id)) {
    return res.status(400).json({
      erro: 'ID inválido',
    })
  }

  const validacaoNome = validarNome(nome)

  if (!validacaoNome.valido) {
    return res.status(400).json({
      erro: validacaoNome.erro,
    })
  }

  const validacaoComprado = validarBoolean(comprado, 'Comprado')

  if (!validacaoComprado.valido) {
    return res.status(400).json({
      erro: validacaoComprado.erro,
    })
  }

  try {
    const resultado = await pool.query(
      `
            UPDATE compras
            SET nome = $1,
                comprado = $2
            WHERE id = $3
            RETURNING id, nome, comprado, criado_em
            `,
      [validacaoNome.valor, validacaoComprado.valor, id],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        erro: 'Item não encontrado',
      })
    }

    res.json({
      mensagem: 'Item alterado com sucesso',
      item: resultado.rows[0],
    })
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: 'Erro ao alterar item',
    })
  }
})

app.delete('/compras/:id', async (req, res) => {
  const { id } = req.params

  if (!validarId(id)) {
    return res.status(400).json({
      erro: 'ID inválido',
    })
  }

  try {
    const resultado = await pool.query(
      `
            DELETE FROM compras
            WHERE id = $1
            RETURNING id, nome, comprado, criado_em
            `,
      [id],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        erro: 'Item não encontrado',
      })
    }

    res.json({
      mensagem: 'Item deletado com sucesso',
      item: resultado.rows[0],
    })
  } catch (erro) {
    console.error(erro)

    res.status(500).json({
      erro: 'Erro ao deletar item',
    })
  }
})

function validarNome(nome) {
  if (typeof nome !== 'string') {
    return {
      valido: false,
      erro: 'Nome do item é obrigatório',
    }
  }

  const nomeTratado = nome.trim()

  if (nomeTratado === '') {
    return {
      valido: false,
      erro: 'Nome do item é obrigatório',
    }
  }

  if (nomeTratado.length > 150) {
    return {
      valido: false,
      erro: 'Nome do item deve ter no máximo 150 caracteres',
    }
  }

  return {
    valido: true,
    valor: nomeTratado,
  }
}

function validarBoolean(valor, campo = 'Campo', obrigatorio = true) {
  if (valor === undefined && !obrigatorio) {
    return {
      valido: true,
      valor: undefined,
    }
  }

  if (typeof valor !== 'boolean') {
    return {
      valido: false,
      erro: `${campo} é obrigatório e deve ser true ou false`,
    }
  }

  return {
    valido: true,
    valor,
  }
}

const porta = process.env.PORT || 3000

app.listen(porta, () => {
  console.log(`Servidor de compras rodando na porta ${porta}`)
})
