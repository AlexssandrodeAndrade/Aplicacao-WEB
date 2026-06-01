
-- 01 - Quantidade de carros por marca
SELECT 
    m.nome AS marca,
    COUNT(c.id) AS quantidade_carros
FROM marca m
JOIN carro c
    ON c.id_marca = m.id
GROUP BY m.nome
ORDER BY quantidade_carros DESC;

-- 02 - Total de compras por produto
SELECT
    p.nome AS produto,
    SUM(cp.quantidade) AS total_comprado
FROM produtos p
JOIN compra_produto cp
    ON cp.produto_id = p.id
GROUP BY p.nome
ORDER BY total_comprado DESC;

-- 03 - Produtos do mais caro ao mais barato
SELECT
    nome,
    preco
FROM produtos
ORDER BY preco DESC;

-- 04 - Nome do proprietário e placa do veículo onde o nome começa com "A"
SELECT
    p.nome AS proprietario,
    v.placa
FROM proprietario p
JOIN veiculo v
    ON v.id_proprietario = p.id
WHERE p.nome LIKE 'A%';


-- 05 - Marca com maior quantidade de carros
SELECT
    m.nome AS marca,
    COUNT(c.id) AS quantidade_carros
FROM marca m
JOIN carro c
    ON c.id_marca = m.id
GROUP BY m.nome
ORDER BY quantidade_carros DESC
LIMIT 1;

-- Agora o DESAFIO:
-- TABELA SERIES
CREATE TABLE serie (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- TABELA EPISODIOS
CREATE TABLE episodio (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracao INT NOT NULL,
    id_serie INT NOT NULL,
    
    FOREIGN KEY (id_serie)
    REFERENCES serie(id)
);

-- TABELA GENEROS
CREATE TABLE genero (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- TABELA RELACIONAMENTO N:N
CREATE TABLE serie_genero (
    id_serie INT NOT NULL,
    id_genero INT NOT NULL,

    PRIMARY KEY (id_serie, id_genero),

    FOREIGN KEY (id_serie)
    REFERENCES serie(id),

    FOREIGN KEY (id_genero)
    REFERENCES genero(id)
);

-- Exemplo de inserts:
-- SERIES
INSERT INTO serie (nome) VALUES
('Breaking Bad'),
('Dark'),
('Stranger Things');

-- EPISODIOS
INSERT INTO episodio (titulo, duracao, id_serie) VALUES
('Piloto', 58, 1),
('Cat''s in the Bag', 48, 1),
('Segredos', 52, 2),
('The Vanishing', 47, 3);

-- GENEROS
INSERT INTO genero (nome) VALUES
('Drama'),
('Ficção'),
('Suspense');

-- RELACIONAMENTO
INSERT INTO serie_genero (id_serie, id_genero) VALUES
(1,1),
(1,3),
(2,2),
(2,3),
(3,2),
(3,3);