let idEditando = null
let compradoEditando = false

async function carregarItens() {
  const resposta = await fetch('/compras')
  const itens = await resposta.json()

  const lista = document.getElementById('lista')
  lista.innerHTML = ''

  itens.forEach((item) => {
    criarItemNaTela(item)
  })
}

function criarItemNaTela(item) {
  const lista = document.getElementById('lista')

  const li = document.createElement('li')
  li.className = 'list-group-item d-flex align-items-center gap-3'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = item.comprado

  const span = document.createElement('span')
  span.className = 'item-text'
  span.innerText = item.nome

  if (item.comprado) {
    span.classList.add('comprado')
  }

  const btnEditar = document.createElement('button')
  btnEditar.innerText = 'Editar'
  btnEditar.className = 'btn btn-outline-warning btn-sm' //editar

  const btnRemover = document.createElement('button')
  btnRemover.innerText = 'X'
  btnRemover.className = 'btn btn-outline-danger btn-sm' //remover

  checkbox.onchange = async function () {
    await alterarItem(item.id, item.nome, checkbox.checked)
  }

  btnEditar.onclick = function () {
    document.getElementById('inputItem').value = item.nome

    idEditando = item.id
    compradoEditando = item.comprado

    document.querySelector('.btn-add').innerText = 'Salvar Alteração'
  }

  btnRemover.onclick = async function () {
    await deletarItem(item.id)
  }

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(btnEditar)
  li.appendChild(btnRemover)

  lista.appendChild(li)
}

async function salvarItem() {
  const mensagem = document.getElementById('mensagem')
  const input = document.getElementById('inputItem')
  const nome = input.value.trim()

  if (nome === '') {
    mensagem.textContent = 'Digite um item.'
    mensagem.className = 'text-center fw-bold mt-4 text-warning'
    return
  }

  if (idEditando !== null) {
    await alterarItem(idEditando, nome, compradoEditando)

    idEditando = null

    document.querySelector('.btn-add').innerText = 'Adicionar'
  } else {
    await fetch('/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    })
  }

  input.value = ''
  input.focus()

  carregarItens()
}

async function alterarItem(id, nome, comprado) {
  await fetch(`/compras/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome,
      comprado,
    }),
  })

  carregarItens()
}

async function deletarItem(id) {
  await fetch(`/compras/${id}`, {
    method: 'DELETE',
  })

  carregarItens()
}

carregarItens()
