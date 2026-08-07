document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPedido');
    const inputId = document.getElementById('pedidoId');
    const selectCliente = document.getElementById('clienteId');
    const listaProdutos = document.getElementById('listaProdutos');
    const tabela = document.getElementById('tabelaPedidos');
    const tituloFormulario = document.getElementById('tituloFormulario');
    const botaoSalvar = document.getElementById('botaoSalvar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const botaoAtualizarLista = document.getElementById('botaoAtualizarLista');

    let clientes = [];
    let produtos = [];
    let pedidos = [];

    function idsProdutosDoPedido(pedido) {
        if (!Array.isArray(pedido.produtos)) {
            return [];
        }

        return pedido.produtos
            .map((produto) => Number(produto.id ?? produto.produtoId ?? produto))
            .filter(Number.isFinite);
    }

    function nomeClienteDoPedido(pedido) {
        return (
            pedido.cliente?.nome ||
            clientes.find(
                (cliente) => Number(cliente.id) === Number(pedido.clienteId ?? pedido.cliente_id),
            )?.nome ||
            `Cliente #${pedido.clienteId ?? pedido.cliente_id ?? '?'}`
        );
    }

    function limparFormulario() {
        form.reset();
        form.classList.remove('was-validated');
        inputId.value = '';
        tituloFormulario.textContent = 'Novo pedido';
        botaoSalvar.textContent = 'Cadastrar pedido';
        botaoCancelar.classList.add('d-none');

        for (const checkbox of listaProdutos.querySelectorAll('input[type="checkbox"]')) {
            checkbox.checked = false;
        }
    }

    function preencherClientes() {
        const valorAtual = selectCliente.value;
        const opcaoInicial = document.createElement('option');
        opcaoInicial.value = '';
        opcaoInicial.textContent = 'Selecione um cliente';

        selectCliente.replaceChildren(opcaoInicial);

        for (const cliente of clientes) {
            const opcao = document.createElement('option');
            opcao.value = cliente.id;
            opcao.textContent = `${cliente.nome} (${cliente.email})`;
            selectCliente.appendChild(opcao);
        }

        if (Array.from(selectCliente.options).some((opcao) => opcao.value === valorAtual)) {
            selectCliente.value = valorAtual;
        }
    }

    function preencherProdutos() {
        const selecionados = new Set(
            Array.from(listaProdutos.querySelectorAll('input[type="checkbox"]:checked')).map(
                (checkbox) => Number(checkbox.value),
            ),
        );

        listaProdutos.replaceChildren();

        if (produtos.length === 0) {
            const aviso = document.createElement('p');
            aviso.className = 'text-body-secondary mb-0';
            aviso.textContent = 'Cadastre produtos antes de criar um pedido.';
            listaProdutos.appendChild(aviso);
            return;
        }

        for (const produto of produtos) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-check';

            const checkbox = document.createElement('input');
            checkbox.className = 'form-check-input';
            checkbox.type = 'checkbox';
            checkbox.name = 'produtos';
            checkbox.value = produto.id;
            checkbox.id = `produto-${produto.id}`;
            checkbox.checked = selecionados.has(Number(produto.id));

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = checkbox.id;
            label.textContent = `${produto.nome} — ${ui.formatarMoeda(produto.preco)}`;

            wrapper.append(checkbox, label);
            listaProdutos.appendChild(wrapper);
        }
    }

    function iniciarEdicao(pedido) {
        inputId.value = pedido.id;
        selectCliente.value = pedido.cliente?.id ?? pedido.clienteId ?? pedido.cliente_id ?? '';

        const produtosSelecionados = new Set(idsProdutosDoPedido(pedido));

        for (const checkbox of listaProdutos.querySelectorAll('input[type="checkbox"]')) {
            checkbox.checked = produtosSelecionados.has(Number(checkbox.value));
        }

        tituloFormulario.textContent = `Editar pedido #${pedido.id}`;
        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.classList.remove('d-none');
        selectCliente.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function excluirPedido(pedido) {
        const confirmado = await ui.confirmar(`Deseja excluir o pedido #${pedido.id}?`);

        if (!confirmado) {
            return;
        }

        try {
            const resposta = await api.excluirPedido(pedido.id);

            ui.mostrarMensagem(resposta?.mensagem || 'Pedido excluído com sucesso.');

            if (String(inputId.value) === String(pedido.id)) {
                limparFormulario();
            }

            await carregarPedidos();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    function renderizarPedidos() {
        tabela.replaceChildren();

        if (pedidos.length === 0) {
            tabela.appendChild(ui.criarLinhaVazia(4, 'Nenhum pedido cadastrado.'));
            return;
        }

        for (const pedido of pedidos) {
            const linha = document.createElement('tr');

            const celulaId = document.createElement('td');
            celulaId.textContent = pedido.id;

            const celulaCliente = document.createElement('td');
            celulaCliente.textContent = nomeClienteDoPedido(pedido);

            const celulaProdutos = document.createElement('td');

            if (Array.isArray(pedido.produtos) && pedido.produtos.length > 0) {
                for (const item of pedido.produtos) {
                    const produto =
                        typeof item === 'object'
                            ? item
                            : produtos.find((registro) => Number(registro.id) === Number(item));

                    const badge = document.createElement('span');
                    badge.className =
                        'badge rounded-pill text-bg-light border text-dark badge-product';
                    badge.textContent = produto?.nome || `Produto #${item}`;
                    celulaProdutos.appendChild(badge);
                }
            } else {
                celulaProdutos.textContent = 'Sem produtos';
            }

            const celulaAcoes = document.createElement('td');
            celulaAcoes.className = 'text-end table-actions';

            const botaoEditar = ui.criarBotao('Editar', 'btn btn-outline-primary btn-sm me-2', () =>
                iniciarEdicao(pedido),
            );

            const botaoExcluir = ui.criarBotao('Excluir', 'btn btn-outline-danger btn-sm', () =>
                excluirPedido(pedido),
            );

            celulaAcoes.append(botaoEditar, botaoExcluir);
            linha.append(celulaId, celulaCliente, celulaProdutos, celulaAcoes);
            tabela.appendChild(linha);
        }
    }

    async function carregarCadastros() {
        const [clientesCarregados, produtosCarregados] = await Promise.all([
            api.listarClientes(),
            api.listarProdutos(),
        ]);

        clientes = clientesCarregados;
        produtos = produtosCarregados;

        preencherClientes();
        preencherProdutos();

        const podeCadastrar = clientes.length > 0 && produtos.length >= 2;
        botaoSalvar.disabled = !podeCadastrar;

        if (!podeCadastrar) {
            ui.mostrarMensagem(
                'Para cadastrar pedidos, é necessário ter pelo menos um cliente e dois produtos.',
                'warning',
            );
        }
    }

    async function carregarPedidos() {
        tabela.replaceChildren(ui.criarLinhaCarregamento(4, 'Carregando pedidos...'));

        try {
            pedidos = await api.listarPedidos();
            renderizarPedidos();
        } catch (erro) {
            pedidos = [];
            tabela.replaceChildren(ui.criarLinhaVazia(4, 'Não foi possível carregar os pedidos.'));
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    async function carregarPagina() {
        try {
            await carregarCadastros();
            await carregarPedidos();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        form.classList.add('was-validated');

        const produtosSelecionados = Array.from(
            listaProdutos.querySelectorAll('input[type="checkbox"]:checked'),
        ).map((checkbox) => Number(checkbox.value));

        if (!form.checkValidity()) {
            return;
        }

        const pedido = {
            clienteId: Number(selectCliente.value),
            produtos: produtosSelecionados,
        };

        try {
            ui.definirBotaoCarregando(botaoSalvar, true);

            const resposta = inputId.value
                ? await api.atualizarPedido(inputId.value, pedido)
                : await api.cadastrarPedido(pedido);

            ui.mostrarMensagem(resposta?.mensagem || 'Pedido salvo com sucesso.');

            limparFormulario();
            await carregarPedidos();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        } finally {
            ui.definirBotaoCarregando(botaoSalvar, false);
        }
    });

    botaoCancelar.addEventListener('click', limparFormulario);
    botaoAtualizarLista.addEventListener('click', carregarPagina);

    carregarPagina();
});
