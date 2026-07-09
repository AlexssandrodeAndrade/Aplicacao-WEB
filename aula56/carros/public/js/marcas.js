const API_URL = '/api/marcas';

const formMarca = document.getElementById('formMarca');
const marcaId = document.getElementById('marcaId');
const nome = document.getElementById('nome');
const tabelaMarcas = document.getElementById('tabelaMarcas');
const mensagem = document.getElementById('mensagem');
const tituloFormulario = document.getElementById('tituloFormulario');
const btnCancelar = document.getElementById('btnCancelar');
const btnAtualizar = document.getElementById('btnAtualizar');

function mostrarMensagem(texto, tipo = 'success') {
    mensagem.className = `alert alert-${tipo}`;
    mensagem.textContent = texto;

    setTimeout(() => {
        mensagem.className = 'alert d-none';
        mensagem.textContent = '';
    }, 4000);
}

function limparFormulario() {
    marcaId.value = '';
    nome.value = '';
    tituloFormulario.textContent = 'Cadastrar Marca';
    btnCancelar.classList.add('d-none');
}

async function tratarResposta(response) {
    const dados = await response.json();

    if (!response.ok) {
        throw new Error(dados.erro || 'Erro ao processar requisição');
    }

    return dados;
}

async function carregarMarcas() {
    try {
        const response = await fetch(API_URL);
        const marcas = await tratarResposta(response);

        tabelaMarcas.replaceChildren();

        if (marcas.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');

            td.colSpan = 3;
            td.className = 'text-center text-muted';
            td.textContent = 'Nenhuma marca cadastrada.';

            tr.appendChild(td);
            tabelaMarcas.appendChild(tr);

            return;
        }

        marcas.forEach((marca) => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = marca.id;

            const tdNome = document.createElement('td');
            tdNome.textContent = marca.nome;

            const tdAcoes = document.createElement('td');
            tdAcoes.className = 'text-end';

            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-sm btn-warning me-2';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                editarMarca(marca.id, marca.nome);
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn btn-sm btn-danger';
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => {
                deletarMarca(marca.id);
            });

            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnExcluir);

            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdAcoes);

            tabelaMarcas.appendChild(tr);
        });
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

function editarMarca(id, nomeMarca) {
    marcaId.value = id;
    nome.value = nomeMarca;
    tituloFormulario.textContent = 'Editar Marca';
    btnCancelar.classList.remove('d-none');
    nome.focus();
}

async function salvarMarca(event) {
    event.preventDefault();

    const nomeMarca = nome.value.trim();

    if (!nomeMarca) {
        mostrarMensagem('Informe o nome da marca.', 'warning');
        return;
    }

    const id = marcaId.value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeMarca,
            }),
        });

        const dados = await tratarResposta(response);

        mostrarMensagem(dados.mensagem);
        limparFormulario();
        await carregarMarcas();
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

async function deletarMarca(id) {
    const confirmar = confirm('Deseja realmente excluir esta marca?');

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        const dados = await tratarResposta(response);

        mostrarMensagem(dados.mensagem);
        await carregarMarcas();
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

formMarca.addEventListener('submit', salvarMarca);
btnCancelar.addEventListener('click', limparFormulario);
btnAtualizar.addEventListener('click', carregarMarcas);

carregarMarcas();
