-- =========================================
-- PROPRIETARIOS
-- =========================================

INSERT INTO proprietario (nome, cpf) VALUES
('André Silva', '111.111.111-01'),
('Carlos Souza', '111.111.111-02'),
('Ana Oliveira', '111.111.111-03'),
('Marcos Lima', '111.111.111-04'),
('Fernanda Alves', '111.111.111-05'),
('Juliana Rocha', '111.111.111-06'),
('Ricardo Martins', '111.111.111-07'),
('Patricia Gomes', '111.111.111-08'),
('Lucas Ferreira', '111.111.111-09'),
('Camila Santos', '111.111.111-10'),
('Roberto Costa', '111.111.111-11'),
('Aline Mendes', '111.111.111-12'),
('Eduardo Ribeiro', '111.111.111-13'),
('Vanessa Lopes', '111.111.111-14'),
('Bruno Carvalho', '111.111.111-15'),
('Larissa Freitas', '111.111.111-16'),
('Felipe Moraes', '111.111.111-17'),
('Renata Cardoso', '111.111.111-18'),
('Gabriel Pinto', '111.111.111-19'),
('Daniela Barbosa', '111.111.111-20');

-- =========================================
-- VEICULOS (1:1)
-- =========================================

INSERT INTO veiculo (placa, modelo, id_proprietario) VALUES
('AAA1A11', 'Civic', 1),
('BBB2B22', 'Corolla', 2),
('CCC3C33', 'HB20', 3),
('DDD4D44', 'Onix', 4),
('EEE5E55', 'Golf', 5),
('FFF6F66', 'Cruze', 6),
('GGG7G77', 'Argo', 7),
('HHH8H88', 'Compass', 8),
('III9I99', 'Toro', 9),
('JJJ1J10', 'Ka', 10),
('KKK2K20', 'Fusion', 11),
('LLL3L30', 'Tracker', 12),
('MMM4M40', 'Creta', 13),
('NNN5N50', 'Kwid', 14),
('OOO6O60', 'Renegade', 15),
('PPP7P70', 'Polo', 16),
('QQQ8Q80', 'Virtus', 17),
('RRR9R90', 'T-Cross', 18),
('SSS1S00', 'Palio', 19),
('TTT2T10', 'Uno', 20);

-- =========================================
-- MARCAS
-- =========================================

INSERT INTO marca (nome) VALUES
('Honda'),
('Toyota'),
('Hyundai'),
('Chevrolet'),
('Volkswagen'),
('Fiat'),
('Jeep'),
('Ford'),
('Renault'),
('Nissan'),
('Peugeot'),
('Citroen'),
('BMW'),
('Audi'),
('Mercedes'),
('Kia'),
('Mitsubishi'),
('Volvo'),
('Suzuki'),
('Chery');

-- =========================================
-- CARROS (1:N)
-- =========================================

INSERT INTO carro (placa, modelo, id_marca) VALUES
('CAR1A11', 'Civic', 1),
('CAR2B22', 'Corolla', 2),
('CAR3C33', 'HB20', 3),
('CAR4D44', 'Onix', 4),
('CAR5E55', 'Golf', 5),
('CAR6F66', 'Argo', 6),
('CAR7G77', 'Compass', 7),
('CAR8H88', 'Fusion', 8),
('CAR9I99', 'Kwid', 9),
('CAR1J10', 'Sentra', 10),
('CAR2K20', '208', 11),
('CAR3L30', 'C4', 12),
('CAR4M40', '320i', 13),
('CAR5N50', 'A3', 14),
('CAR6O60', 'Classe C', 15),
('CAR7P70', 'Sportage', 16),
('CAR8Q80', 'Lancer', 17),
('CAR9R90', 'XC60', 18),
('CAR1S00', 'Jimny', 19),
('CAR2T10', 'Tiggo', 20);

-- =========================================
-- PRODUTOS
-- =========================================

INSERT INTO produtos (nome, preco, estoque) VALUES
('Notebook', 3500.00, 10),
('Mouse', 120.00, 50),
('Teclado', 250.00, 30),
('Monitor', 900.00, 20),
('Headset', 320.00, 25),
('Webcam', 180.00, 15),
('SSD 1TB', 450.00, 40),
('Memoria RAM', 300.00, 35),
('Cadeira Gamer', 1500.00, 8),
('Mesa Escritório', 700.00, 12),
('Impressora', 850.00, 9),
('Microfone', 270.00, 14),
('Fonte 600W', 390.00, 18),
('Placa de Video', 2800.00, 5),
('Processador', 1800.00, 11),
('Cooler', 150.00, 22),
('HD Externo', 420.00, 17),
('Caixa de Som', 230.00, 16),
('Switch', 140.00, 19),
('Roteador', 310.00, 13);

-- =========================================
-- COMPRAS
-- =========================================

INSERT INTO compras (cliente, data_compra) VALUES
('André Silva', '2026-01-05'),
('Carlos Souza', '2026-01-07'),
('Ana Oliveira', '2026-01-10'),
('Marcos Lima', '2026-01-12'),
('Fernanda Alves', '2026-01-15'),
('Juliana Rocha', '2026-01-18'),
('Ricardo Martins', '2026-01-20'),
('Patricia Gomes', '2026-01-22'),
('Lucas Ferreira', '2026-01-25'),
('Camila Santos', '2026-01-28'),
('Roberto Costa', '2026-02-01'),
('Aline Mendes', '2026-02-03'),
('Eduardo Ribeiro', '2026-02-06'),
('Vanessa Lopes', '2026-02-08'),
('Bruno Carvalho', '2026-02-11'),
('Larissa Freitas', '2026-02-13'),
('Felipe Moraes', '2026-02-16'),
('Renata Cardoso', '2026-02-18'),
('Gabriel Pinto', '2026-02-21'),
('Daniela Barbosa', '2026-02-24');

-- =========================================
-- COMPRA_PRODUTO (N:N)
-- =========================================

INSERT INTO compra_produto (compra_id, produto_id, quantidade) VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 1),
(2, 4, 1),
(3, 5, 2),
(3, 6, 1),
(4, 7, 1),
(4, 8, 2),
(5, 9, 1),
(5, 10, 1),
(6, 11, 1),
(6, 12, 2),
(7, 13, 1),
(7, 14, 1),
(8, 15, 1),
(8, 16, 3),
(9, 17, 1),
(9, 18, 2),
(10, 19, 1),
(10, 20, 1);