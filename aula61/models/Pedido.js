const pool = require('../database');

class Pedido {
    id;
    clienteId;
    produtos;

    constructor(id, clienteId, produtos) {
        this.id = id;
        this.clienteId = clienteId;
        this.produtos = produtos;
    }

    static async listar() {
        const resultado = await pool.query(
            `SELECT
                pedidos.id,
                json_build_object(
                    'id', clientes.id,
                    'nome', clientes.nome,
                    'email', clientes.email
                ) AS cliente,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', produtos.id,
                            'nome', produtos.nome,
                            'preco', produtos.preco
                        )
                        ORDER BY produtos.id
                    ) FILTER (WHERE produtos.id IS NOT NULL),
                    '[]'::json
                ) AS produtos
            FROM pedidos
            INNER JOIN clientes
                ON clientes.id = pedidos.cliente_id
            LEFT JOIN pedido_produtos
                ON pedido_produtos.pedido_id = pedidos.id
            LEFT JOIN produtos
                ON produtos.id = pedido_produtos.produto_id
            GROUP BY
                pedidos.id,
                clientes.id,
                clientes.nome,
                clientes.email
            ORDER BY pedidos.id`,
        );

        return resultado.rows;
    }

    async cadastrar() {
        const clienteBanco = await pool.connect();

        try {
            await clienteBanco.query('BEGIN');

            const resultadoPedido = await clienteBanco.query(
                `INSERT INTO pedidos
                (cliente_id)
                VALUES ($1)
                RETURNING id`,
                [this.clienteId],
            );

            const pedidoId = resultadoPedido.rows[0].id;

            for (const produtoId of this.produtos) {
                await clienteBanco.query(
                    `INSERT INTO pedido_produtos
                    (pedido_id, produto_id)
                    VALUES ($1, $2)`,
                    [pedidoId, produtoId],
                );
            }

            await clienteBanco.query('COMMIT');

            return {
                id: pedidoId,
                clienteId: this.clienteId,
                produtos: this.produtos,
            };
        } catch (erro) {
            await clienteBanco.query('ROLLBACK');
            throw erro;
        } finally {
            clienteBanco.release();
        }
    }

    async atualizar() {
        const clienteBanco = await pool.connect();

        try {
            await clienteBanco.query('BEGIN');

            const resultadoPedido = await clienteBanco.query(
                `UPDATE pedidos
                SET cliente_id = $1
                WHERE id = $2
                RETURNING id`,
                [this.clienteId, this.id],
            );

            if (resultadoPedido.rowCount === 0) {
                await clienteBanco.query('ROLLBACK');
                return null;
            }

            await clienteBanco.query(
                `DELETE FROM pedido_produtos
                WHERE pedido_id = $1`,
                [this.id],
            );

            for (const produtoId of this.produtos) {
                await clienteBanco.query(
                    `INSERT INTO pedido_produtos
                    (pedido_id, produto_id)
                    VALUES ($1, $2)`,
                    [this.id, produtoId],
                );
            }

            await clienteBanco.query('COMMIT');

            return {
                id: Number(this.id),
                clienteId: this.clienteId,
                produtos: this.produtos,
            };
        } catch (erro) {
            await clienteBanco.query('ROLLBACK');
            throw erro;
        } finally {
            clienteBanco.release();
        }
    }

    static async excluir(id) {
        const clienteBanco = await pool.connect();

        try {
            await clienteBanco.query('BEGIN');

            await clienteBanco.query(
                `DELETE FROM pedido_produtos
                WHERE pedido_id = $1`,
                [id],
            );

            const resultadoPedido = await clienteBanco.query(
                `DELETE FROM pedidos
                WHERE id = $1
                RETURNING *`,
                [id],
            );

            await clienteBanco.query('COMMIT');

            return resultadoPedido.rows[0];
        } catch (erro) {
            await clienteBanco.query('ROLLBACK');
            throw erro;
        } finally {
            clienteBanco.release();
        }
    }
}

module.exports = Pedido;
