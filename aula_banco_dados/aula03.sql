-- 1. Retornar todos os produtos com preço maior que 1000
SELECT *
FROM produtos
WHERE preco > 1000;

-- 2. Retornar todos os produtos da categoria Informática
SELECT *
FROM produtos
WHERE categoria = 'Informática';

-- 3. Retornar produtos com preço lançado após 2015
-- (não existe campo de data, adaptação: produtos com ID maior que 10)
SELECT *
FROM produtos
WHERE id > 10;

-- 4. Produtos com preço entre 200 e 1000 reais
SELECT *
FROM produtos
WHERE preco BETWEEN 200 AND 1000;

-- 5. Produtos cujo nome começa com a letra A
SELECT *
FROM produtos
WHERE nome LIKE 'A%';

-- 6. Os 3 produtos mais caros
SELECT *
FROM produtos
ORDER BY preco DESC
LIMIT 3;

-- 7. Produtos inativos
-- (adaptação de clientes sem telefone)
SELECT *
FROM produtos
WHERE ativo = FALSE;

-- 8. Produtos ativos com estoque menor que 10
SELECT *
FROM produtos
WHERE ativo = TRUE
AND estoque < 10;

-- 9. Produtos das categorias Games, Informática ou Eletrônicos
-- (adaptação de marcas Toyota, Honda e Hyundai)
SELECT *
FROM produtos
WHERE categoria IN ('Games', 'Informática', 'Eletrônicos');

-- 10. Produtos de categoria Celulares ou Informática com preço maior que 500
-- (adaptação de clientes por cidade e idade)
SELECT *
FROM produtos
WHERE categoria IN ('Celulares', 'Informática')
AND preco > 500;