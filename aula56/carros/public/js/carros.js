const API_CARROS = '/api/carros';
const API_MARCAS = '/api/marcas';

const formCarro = document.getElementById('formCarro');
const carroId = document.getElementById('carroId');
const modelo = document.getElementById('modelo');
const marcaId = document.getElementById('marcaId');
const ano = document.getElementById('ano');
const tabelaCarros = document.getElementById('tabelaCarros');
const mensagem = document.getElementById('mensagem');
const tituloFormulario = document.getElementById('tituloFormulario');
const btnCancelar = document.getElementById('btnCancelar');
const btnAtualizar = document.getElementById('btnAtualizar');

let carros = [];

function mostrarMensagem(texto, tipo = 'success') {
    mensagem.className = `alert alert-${tipo}`;
    mensagem.textContent = texto;

    setTimeout(() => {
        mensagem.className = 'alert d-none';
        mensagem.textContent = '';
    }, 4000);
}

function limparFormulario() {
    carroId.value = '';
    modelo.value = '';
    marcaId.value = '';
    ano.value = '';
    tituloFormulario.textContent = 'Cadastrar Carro';
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
        const response = await fetch(API_MARCAS);
        const marcas = await tratarResposta(response);

        marcaId.replaceChildren();

        const optionInicial = document.createElement('option');
        optionInicial.value = '';
        optionInicial.textContent = 'Selecione uma marca';

        marcaId.appendChild(optionInicial);

        marcas.forEach((marca) => {
            const option = document.createElement('option');
            option.value = marca.id;
            option.textContent = marca.nome;

            marcaId.appendChild(option);
        });
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

async function carregarCarros() {
    try {
        const response = await fetch(API_CARROS);
        carros = await tratarResposta(response);

        tabelaCarros.replaceChildren();

        if (carros.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');

            td.colSpan = 5;
            td.className = 'text-center text-muted';
            td.textContent = 'Nenhum carro cadastrado.';

            tr.appendChild(td);
            tabelaCarros.appendChild(tr);

            return;
        }

        carros.forEach((carro) => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = carro.id;

            const tdModelo = document.createElement('td');
            tdModelo.textContent = carro.modelo;

            const tdMarca = document.createElement('td');
            tdMarca.textContent = carro.marca_nome;

            const tdAno = document.createElement('td');
            tdAno.textContent = carro.ano;

            const tdAcoes = document.createElement('td');
            tdAcoes.className = 'text-end';

            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-sm btn-warning me-2';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                editarCarro(carro.id);
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn btn-sm btn-danger';
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => {
                deletarCarro(carro.id);
            });

            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnExcluir);

            tr.appendChild(tdId);
            tr.appendChild(tdModelo);
            tr.appendChild(tdMarca);
            tr.appendChild(tdAno);
            tr.appendChild(tdAcoes);

            tabelaCarros.appendChild(tr);
        });
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

function editarCarro(id) {
    const carro = carros.find((item) => item.id === id);

    if (!carro) {
        mostrarMensagem('Carro não encontrado na lista.', 'warning');
        return;
    }

    carroId.value = carro.id;
    modelo.value = carro.modelo;
    marcaId.value = carro.marca_id;
    ano.value = carro.ano;

    tituloFormulario.textContent = 'Editar Carro';
    btnCancelar.classList.remove('d-none');
    modelo.focus();
}

async function salvarCarro(event) {
    event.preventDefault();

    const modeloCarro = modelo.value.trim();
    const marcaSelecionada = marcaId.value;
    const anoCarro = ano.value;

    if (!modeloCarro) {
        mostrarMensagem('Informe o modelo do carro.', 'warning');
        return;
    }

    if (!marcaSelecionada) {
        mostrarMensagem('Selecione uma marca.', 'warning');
        return;
    }

    if (!anoCarro) {
        mostrarMensagem('Informe o ano do carro.', 'warning');
        return;
    }

    const id = carroId.value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${API_CARROS}/${id}` : API_CARROS;

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modelo: modeloCarro,
                marca_id: Number(marcaSelecionada),
                ano: Number(anoCarro),
            }),
        });

        const dados = await tratarResposta(response);

        mostrarMensagem(dados.mensagem);
        limparFormulario();
        await carregarCarros();
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

async function deletarCarro(id) {
    const confirmar = confirm('Deseja realmente excluir este carro?');

    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${API_CARROS}/${id}`, {
            method: 'DELETE',
        });

        const dados = await tratarResposta(response);

        mostrarMensagem(dados.mensagem);
        await carregarCarros();
    } catch (erro) {
        mostrarMensagem(erro.message, 'danger');
    }
}

formCarro.addEventListener('submit', salvarCarro);
btnCancelar.addEventListener('click', limparFormulario);
btnAtualizar.addEventListener('click', async () => {
    await carregarMarcas();
    await carregarCarros();
});

carregarMarcas();
carregarCarros();
