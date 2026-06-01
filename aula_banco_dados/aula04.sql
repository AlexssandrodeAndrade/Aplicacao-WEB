-- 1. Contar quantos produtos existem
SELECT COUNT(*) AS total_produtos
FROM produtos;

-- 2. Contar quantos produtos estão ativos
SELECT COUNT(*) AS produtos_ativos
FROM produtos
WHERE ativo = TRUE;

-- 3. Soma total dos preços dos produtos
SELECT SUM(preco) AS soma_precos
FROM produtos;

-- 4. Média de preço dos produtos
SELECT AVG(preco) AS media_precos
FROM produtos;

-- 5. Menor e maior preço dos produtos
SELECT 
    MIN(preco) AS menor_preco,
    MAX(preco) AS maior_preco
FROM produtos;

-- 6. Quantidade de produtos por categoria
SELECT categoria, COUNT(*) AS total
FROM produtos
GROUP BY categoria;

-- 7. Média de preço por categoria
SELECT categoria, AVG(preco) AS media_preco
FROM produtos
GROUP BY categoria;

-- 8. Soma dos preços por categoria
SELECT categoria, SUM(preco) AS soma_precos
FROM produtos
GROUP BY categoria;

-- 9. Maior preço por categoria
SELECT categoria, MAX(preco) AS maior_preco
FROM produtos
GROUP BY categoria;

-- 10. Média de preço dos produtos com estoque maior que 5
SELECT AVG(preco) AS media_preco
FROM produtos
WHERE estoque > 5;