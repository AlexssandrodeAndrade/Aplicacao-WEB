document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCliente');
    const inputId = document.getElementById('clienteId');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const tabela = document.getElementById('tabelaClientes');
    const tituloFormulario = document.getElementById('tituloFormulario');
    const botaoSalvar = document.getElementById('botaoSalvar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const botaoAtualizarLista = document.getElementById('botaoAtualizarLista');

    let clientes = [];

    function limparFormulario() {
        form.reset();
        form.classList.remove('was-validated');
        inputId.value = '';
        tituloFormulario.textContent = 'Novo cliente';
        botaoSalvar.textContent = 'Cadastrar cliente';
        botaoCancelar.classList.add('d-none');
    }

    function iniciarEdicao(cliente) {
        inputId.value = cliente.id;
        inputNome.value = cliente.nome;
        inputEmail.value = cliente.email;
        tituloFormulario.textContent = `Editar cliente #${cliente.id}`;
        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.classList.remove('d-none');
        inputNome.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function excluirCliente(cliente) {
        const confirmado = await ui.confirmar(
            `Deseja excluir o cliente "${cliente.nome}"?`,
        );

        if (!confirmado) {
            return;
        }

        try {
            const resposta = await api.excluirCliente(cliente.id);

            ui.mostrarMensagem(
                resposta?.mensagem || 'Cliente excluído com sucesso.',
            );

            if (String(inputId.value) === String(cliente.id)) {
                limparFormulario();
            }

            await carregarClientes();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    function renderizarClientes() {
        tabela.replaceChildren();

        if (clientes.length === 0) {
            tabela.appendChild(
                ui.criarLinhaVazia(4, 'Nenhum cliente cadastrado.'),
            );
            return;
        }

        for (const cliente of clientes) {
            const linha = document.createElement('tr');

            const celulaId = document.createElement('td');
            celulaId.textContent = cliente.id;

            const celulaNome = document.createElement('td');
            celulaNome.textContent = cliente.nome;

            const celulaEmail = document.createElement('td');
            celulaEmail.textContent = cliente.email;

            const celulaAcoes = document.createElement('td');
            celulaAcoes.className = 'text-end table-actions';

            const botaoEditar = ui.criarBotao(
                'Editar',
                'btn btn-outline-primary btn-sm me-2',
                () => iniciarEdicao(cliente),
            );

            const botaoExcluir = ui.criarBotao(
                'Excluir',
                'btn btn-outline-danger btn-sm',
                () => excluirCliente(cliente),
            );

            celulaAcoes.append(botaoEditar, botaoExcluir);
            linha.append(celulaId, celulaNome, celulaEmail, celulaAcoes);
            tabela.appendChild(linha);
        }
    }

    async function carregarClientes() {
        tabela.replaceChildren(
            ui.criarLinhaCarregamento(4, 'Carregando clientes...'),
        );

        try {
            clientes = await api.listarClientes();
            renderizarClientes();
        } catch (erro) {
            clientes = [];
            tabela.replaceChildren(
                ui.criarLinhaVazia(4, 'Não foi possível carregar os clientes.'),
            );
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            return;
        }

        const cliente = {
            nome: inputNome.value.trim(),
            email: inputEmail.value.trim(),
        };

        try {
            ui.definirBotaoCarregando(botaoSalvar, true);

            const resposta = inputId.value
                ? await api.atualizarCliente(inputId.value, cliente)
                : await api.cadastrarCliente(cliente);

            ui.mostrarMensagem(
                resposta?.mensagem || 'Cliente salvo com sucesso.',
            );

            limparFormulario();
            await carregarClientes();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        } finally {
            ui.definirBotaoCarregando(botaoSalvar, false);
        }
    });

    botaoCancelar.addEventListener('click', limparFormulario);
    botaoAtualizarLista.addEventListener('click', carregarClientes);

    carregarClientes();
});
