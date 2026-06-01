CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    categoria VARCHAR(50),
    preco NUMERIC(10,2),
    estoque INT,
    ativo BOOLEAN
);

INSERT INTO produtos (nome, categoria, preco, estoque, ativo)
VALUES
('HD Externo 1TB', 'Informática', 399.90, 9, TRUE),
('Caixa de Som JBL', 'Áudio', 520.00, 6, TRUE),
('Tablet Samsung', 'Celulares', 1800.00, 5, TRUE),
('Mouse Pad Gamer', 'Informática', 79.90, 25, TRUE),
('Smart TV 50', 'Eletrônicos', 3200.00, 3, TRUE),
('Ventilador Arno', 'Eletrodomésticos', 210.00, 11, TRUE),
('Geladeira Brastemp', 'Eletrodomésticos', 4200.00, 2, TRUE),
('Air Fryer Mondial', 'Eletrodomésticos', 350.00, 7, TRUE),
('PlayStation 5', 'Games', 4500.00, 2, TRUE),
('Controle Xbox', 'Games', 399.00, 10, TRUE),
('Câmera Logitech', 'Informática', 650.00, 4, TRUE),
('Notebook Lenovo', 'Informática', 3900.00, 3, TRUE),
('Alexa Echo Dot', 'Eletrônicos', 299.90, 14, TRUE),
('Carregador Turbo', 'Celulares', 89.90, 30, TRUE),
('Monitor Gamer 27', 'Informática', 1450.00, 5, TRUE),
('Roteador TP-Link', 'Informática', 240.00, 12, TRUE),
('Cadeira Gamer', 'Móveis', 1350.00, 4, TRUE),
('Fogão 4 Bocas', 'Eletrodomésticos', 1700.00, 2, FALSE),
('Smartwatch Xiaomi', 'Celulares', 550.00, 8, TRUE),
('Projetor Epson', 'Eletrônicos', 2600.00, 1, TRUE);
