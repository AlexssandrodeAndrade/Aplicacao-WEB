(() => {
    class ApiError extends Error {
        constructor(message, status, data) {
            super(message);
            this.name = 'ApiError';
            this.status = status;
            this.data = data;
        }
    }

    async function request(endpoint, options = {}) {
        const config = {
            method: 'GET',
            ...options,
        };

        config.headers = {
            Accept: 'application/json',
            ...(options.headers || {}),
        };

        if (config.body !== undefined) {
            config.headers['Content-Type'] = 'application/json';
        }

        let response;

        try {
            response = await fetch(endpoint, config);
        } catch (error) {
            throw new ApiError(
                'Não foi possível conectar ao servidor.',
                0,
                null,
            );
        }

        const contentType = response.headers.get('content-type') || '';
        let data = null;

        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = text ? { mensagem: text } : null;
        }

        if (!response.ok) {
            throw new ApiError(
                data?.mensagem || `Erro HTTP ${response.status}.`,
                response.status,
                data,
            );
        }

        return data;
    }

    window.api = {
        listarClientes() {
            return request('/clientes');
        },

        cadastrarCliente(cliente) {
            return request('/clientes', {
                method: 'POST',
                body: JSON.stringify(cliente),
            });
        },

        atualizarCliente(id, cliente) {
            return request(`/clientes/${id}`, {
                method: 'PUT',
                body: JSON.stringify(cliente),
            });
        },

        excluirCliente(id) {
            return request(`/clientes/${id}`, {
                method: 'DELETE',
            });
        },

        listarProdutos() {
            return request('/produtos');
        },

        cadastrarProduto(produto) {
            return request('/produtos', {
                method: 'POST',
                body: JSON.stringify(produto),
            });
        },

        atualizarProduto(id, produto) {
            return request(`/produtos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(produto),
            });
        },

        excluirProduto(id) {
            return request(`/produtos/${id}`, {
                method: 'DELETE',
            });
        },

        listarPedidos() {
            return request('/pedidos');
        },

        cadastrarPedido(pedido) {
            return request('/pedidos', {
                method: 'POST',
                body: JSON.stringify(pedido),
            });
        },

        atualizarPedido(id, pedido) {
            return request(`/pedidos/${id}`, {
                method: 'PUT',
                body: JSON.stringify(pedido),
            });
        },

        excluirPedido(id) {
            return request(`/pedidos/${id}`, {
                method: 'DELETE',
            });
        },
    };
})();
