const itemPadrao = {
  id: null,
  nome: '',
  comprado: false,
}

const state = {
  item: { ...itemPadrao },
}

const elementos = {
  lista: document.getElementById('lista'),
  inputItem: document.getElementById('inputItem'),
  mensagem: document.getElementById('mensagem'),
  btnSalvar: document.querySelector('.btn-add'),
}

function estaEditandoItem(id) {
  return state.item.id === id
}

elementos.btnSalvar.addEventListener('click', salvarItem)

async function carregarItens() {
  const resposta = await fetch('/compras')
  const itens = await resposta.json()

  elementos.lista.innerHTML = ''

  itens.forEach((item) => {
    criarItemNaTela(item)
  })
}

function criarItemNaTela(item) {
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
  btnEditar.className = 'btn btn-outline-warning btn-sm'

  const btnRemover = document.createElement('button')
  btnRemover.innerText = 'X'
  btnRemover.className = 'btn btn-outline-danger btn-sm'

  if (estaEditandoItem(item.id)) {
    btnRemover.title = 'Finalize a edição antes de excluir este item'
    btnRemover.classList.add('opacity-50')
  }

  checkbox.addEventListener('change', () =>
    alterarStatus(item, checkbox.checked),
  )
  btnEditar.addEventListener('click', () => editarItem(item))
  btnRemover.addEventListener('click', () => removerItem(item.id))

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(btnEditar)
  li.appendChild(btnRemover)

  elementos.lista.appendChild(li)
}

async function salvarItem() {
  limparMensagem()

  const nome = elementos.inputItem.value.trim()

  state.item.nome = nome

  let resposta

  if (state.item.id !== null) {
    resposta = await alterarItem()
  } else {
    resposta = await cadastrarItem()
  }

  if (!resposta.ok) {
    const erro = await resposta.json()
    mostrarErro(erro.erro || 'Erro ao salvar item.')
    return
  }

  limparFormulario()
  carregarItens()
}

async function alterarStatus(item, comprado) {
  state.item = {
    ...item,
    comprado,
  }

  const resposta = await alterarItem()

  if (resposta.ok) {
    carregarItens()
  }
}

function editarItem(item) {
  state.item = { ...item }

  elementos.inputItem.value = item.nome
  elementos.inputItem.focus()
  elementos.btnSalvar.innerText = 'Salvar Alteração'

  carregarItens()
}

async function removerItem(id) {
  if (estaEditandoItem(id)) {
    mostrarErro('Finalize a edição antes de excluir este item.')
    return
  }

  const resposta = await deletarItem(id)

  if (resposta.ok) {
    carregarItens()
  }
}

async function cadastrarItem() {
  return await fetch('/compras', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: state.item.nome,
    }),
  })
}

async function alterarItem() {
  return await fetch(`/compras/${state.item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: state.item.nome,
      comprado: state.item.comprado,
    }),
  })
}

async function deletarItem(id) {
  return await fetch(`/compras/${id}`, {
    method: 'DELETE',
  })
}

function limparFormulario() {
  state.item = { ...itemPadrao }

  elementos.inputItem.value = ''
  elementos.inputItem.focus()
  elementos.btnSalvar.innerText = 'Adicionar'
}

function limparMensagem() {
  elementos.mensagem.textContent = ''
  elementos.mensagem.className = ''
}

function mostrarErro(texto) {
  elementos.mensagem.textContent = texto
  elementos.mensagem.className = 'text-center fw-bold mt-4 text-danger'
}

carregarItens()
