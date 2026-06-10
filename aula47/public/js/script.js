async function carregaClientes() {
  const resposta = await fetch('/usuarios')
  const usuarios = await resposta.json()
  console.log(usuarios)
}
carregaClientes()
