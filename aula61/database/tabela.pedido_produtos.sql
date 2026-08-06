CREATE TABLE pedido_produtos (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,

    PRIMARY KEY (pedido_id, produto_id),

    CONSTRAINT fk_pedido_produtos_pedidos
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id),

    CONSTRAINT fk_pedido_produtos_produtos
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
);