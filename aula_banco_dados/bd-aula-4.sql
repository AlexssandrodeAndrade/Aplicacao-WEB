-- =========================================
-- TABELA CLIENTES
-- =========================================

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    cidade VARCHAR(100),
    idade INT,
    telefone VARCHAR(20),
    ativo BOOLEAN
);

INSERT INTO clientes (nome, cidade, idade, telefone, ativo)
VALUES
('Ana Silva', 'Rio do Sul', 22, '47999990001', TRUE),
('Bruno Costa', 'Blumenau', 35, NULL, TRUE),
('Carlos Mendes', 'Itajaí', 28, '47999990003', FALSE),
('Amanda Souza', 'Rio do Sul', 19, '47999990004', TRUE),
('Fernanda Lima', 'Florianópolis', 41, NULL, TRUE),
('João Pedro', 'Lages', 30, '47999990006', FALSE),
('Mariana Alves', 'Joinville', 25, '47999990007', TRUE),
('Lucas Rocha', 'Blumenau', 18, '47999990008', TRUE);


-- =========================================
-- TABELA PRODUTOS
-- =========================================

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
('Notebook Dell', 'Informática', 4500.00, 5, TRUE),
('Mouse Gamer', 'Informática', 150.00, 30, TRUE),
('Teclado Mecânico', 'Informática', 320.00, 12, TRUE),
('Monitor LG', 'Informática', 1200.00, 8, TRUE),
('Cadeira Gamer', 'Móveis', 980.00, 3, FALSE),
('Fone Bluetooth', 'Áudio', 250.00, 20, TRUE),
('Caixa JBL', 'Áudio', 600.00, 7, TRUE),
('Mesa Escritório', 'Móveis', 700.00, 4, TRUE);
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

-- =========================================
-- TABELA FILMES
-- =========================================

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    categoria VARCHAR(50),
    ano INT,
    duracao INT
);

INSERT INTO filmes (titulo, categoria, ano, duracao)
VALUES
('Vingadores Ultimato', 'Ação', 2019, 181),
('Interestelar', 'Ficção', 2014, 169),
('Toy Story', 'Animação', 1995, 81),
('John Wick', 'Ação', 2023, 140),
('Invocação do Mal', 'Terror', 2013, 112),
('O Máskara', 'Comédia', 1994, 101),
('Avatar', 'Ficção', 2022, 192),
('Shrek', 'Animação', 2001, 90);


-- =========================================
-- TABELA CARROS
-- =========================================

CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INT,
    preco NUMERIC(10,2),
    placa VARCHAR(10)
);

INSERT INTO carros (marca, modelo, ano, preco, placa)
VALUES
('Toyota', 'Corolla', 2022, 145000.00, 'ABC1A23'),
('Hyundai', 'HB20', 2021, 82000.00, 'BRA2B45'),
('Honda', 'Civic', 2020, 120000.00, 'CAR3C67'),
('Fiat', 'Uno', 2015, 35000.00, 'DOG4D89'),
('Chevrolet', 'Onix', 2023, 95000.00, 'ECO5E10'),
('Hyundai', 'Creta', 2024, 165000.00, 'FOX6F11'),
('Toyota', 'Yaris', 2019, 78000.00, 'GOL7G22'),
('Volkswagen', 'Golf', 2018, 99000.00, 'HOT8H33');