document.addEventListener('DOMContentLoaded', () => {
    const totalClientes = document.getElementById('totalClientes');
    const totalProdutos = document.getElementById('totalProdutos');
    const totalPedidos = document.getElementById('totalPedidos');
    const statusApi = document.getElementById('statusApi');
    const botaoAtualizar = document.getElementById('botaoAtualizar');

    async function carregarIndicadores() {
        botaoAtualizar.disabled = true;
        statusApi.className = 'badge text-bg-secondary';
        statusApi.textContent = 'Verificando...';

        const resultados = await Promise.allSettled([
            api.listarClientes(),
            api.listarProdutos(),
            api.listarPedidos(),
        ]);

        const [clientes, produtos, pedidos] = resultados;

        totalClientes.textContent =
            clientes.status === 'fulfilled' ? clientes.value.length : '—';

        totalProdutos.textContent =
            produtos.status === 'fulfilled' ? produtos.value.length : '—';

        totalPedidos.textContent =
            pedidos.status === 'fulfilled' ? pedidos.value.length : '—';

        const apiDisponivel = resultados.every(
            (resultado) => resultado.status === 'fulfilled',
        );

        if (apiDisponivel) {
            statusApi.className = 'badge text-bg-success';
            statusApi.textContent = 'Conectada';
            ui.limparMensagem();
        } else {
            statusApi.className = 'badge text-bg-danger';
            statusApi.textContent = 'Indisponível';

            ui.mostrarMensagem(
                'Não foi possível carregar todos os indicadores. Verifique se o servidor e o banco estão ativos.',
                'warning',
            );
        }

        botaoAtualizar.disabled = false;
    }

    botaoAtualizar.addEventListener('click', carregarIndicadores);

    carregarIndicadores();
});
