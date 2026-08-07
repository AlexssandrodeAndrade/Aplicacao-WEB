document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formProduto');
    const inputId = document.getElementById('produtoId');
    const inputNome = document.getElementById('nome');
    const inputPreco = document.getElementById('preco');
    const tabela = document.getElementById('tabelaProdutos');
    const tituloFormulario = document.getElementById('tituloFormulario');
    const botaoSalvar = document.getElementById('botaoSalvar');
    const botaoCancelar = document.getElementById('botaoCancelar');
    const botaoAtualizarLista = document.getElementById('botaoAtualizarLista');

    let produtos = [];

    function limparFormulario() {
        form.reset();
        form.classList.remove('was-validated');
        inputId.value = '';
        tituloFormulario.textContent = 'Novo produto';
        botaoSalvar.textContent = 'Cadastrar produto';
        botaoCancelar.classList.add('d-none');
    }

    function iniciarEdicao(produto) {
        inputId.value = produto.id;
        inputNome.value = produto.nome;
        inputPreco.value = Number(produto.preco).toFixed(2);
        tituloFormulario.textContent = `Editar produto #${produto.id}`;
        botaoSalvar.textContent = 'Salvar alterações';
        botaoCancelar.classList.remove('d-none');
        inputNome.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function excluirProduto(produto) {
        const confirmado = await ui.confirmar(
            `Deseja excluir o produto "${produto.nome}"?`,
        );

        if (!confirmado) {
            return;
        }

        try {
            const resposta = await api.excluirProduto(produto.id);

            ui.mostrarMensagem(
                resposta?.mensagem || 'Produto excluído com sucesso.',
            );

            if (String(inputId.value) === String(produto.id)) {
                limparFormulario();
            }

            await carregarProdutos();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        }
    }

    function renderizarProdutos() {
        tabela.replaceChildren();

        if (produtos.length === 0) {
            tabela.appendChild(
                ui.criarLinhaVazia(4, 'Nenhum produto cadastrado.'),
            );
            return;
        }

        for (const produto of produtos) {
            const linha = document.createElement('tr');

            const celulaId = document.createElement('td');
            celulaId.textContent = produto.id;

            const celulaNome = document.createElement('td');
            celulaNome.textContent = produto.nome;

            const celulaPreco = document.createElement('td');
            celulaPreco.textContent = ui.formatarMoeda(produto.preco);

            const celulaAcoes = document.createElement('td');
            celulaAcoes.className = 'text-end table-actions';

            const botaoEditar = ui.criarBotao(
                'Editar',
                'btn btn-outline-primary btn-sm me-2',
                () => iniciarEdicao(produto),
            );

            const botaoExcluir = ui.criarBotao(
                'Excluir',
                'btn btn-outline-danger btn-sm',
                () => excluirProduto(produto),
            );

            celulaAcoes.append(botaoEditar, botaoExcluir);
            linha.append(celulaId, celulaNome, celulaPreco, celulaAcoes);
            tabela.appendChild(linha);
        }
    }

    async function carregarProdutos() {
        tabela.replaceChildren(
            ui.criarLinhaCarregamento(4, 'Carregando produtos...'),
        );

        try {
            produtos = await api.listarProdutos();
            renderizarProdutos();
        } catch (erro) {
            produtos = [];
            tabela.replaceChildren(
                ui.criarLinhaVazia(4, 'Não foi possível carregar os produtos.'),
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

        const produto = {
            nome: inputNome.value.trim(),
            preco: Number(inputPreco.value),
        };

        try {
            ui.definirBotaoCarregando(botaoSalvar, true);

            const resposta = inputId.value
                ? await api.atualizarProduto(inputId.value, produto)
                : await api.cadastrarProduto(produto);

            ui.mostrarMensagem(
                resposta?.mensagem || 'Produto salvo com sucesso.',
            );

            limparFormulario();
            await carregarProdutos();
        } catch (erro) {
            ui.mostrarMensagem(erro.message, 'danger');
        } finally {
            ui.definirBotaoCarregando(botaoSalvar, false);
        }
    });

    botaoCancelar.addEventListener('click', limparFormulario);
    botaoAtualizarLista.addEventListener('click', carregarProdutos);

    carregarProdutos();
});
