UPDATE produtos
SET ativo = false
WHERE estoque < 10;

SELECT COUNT(*)
FROM clientes
WHERE nome LIKE 'A%';

DELETE FROM carros
WHERE ano BETWEEN 2018 AND 2020;

SELECT categoria, AVG(duracao)
FROM filmes
GROUP BY categoria;

SELECT marca, MIN(preco), MAX(preco)
FROM carros
GROUP BY marca;

select nome, estoque from produtos where ativo = true;
Seleciona (mostra) o nome e o estoque de todos os produtos que estão ativos (true).

update produtos set estoque = null where categoria = 'Móveis';
Atualiza a tabela produtos e coloca o campo estoque como vazio (NULL) para todos os produtos da categoria Móveis.

insert into produtos (nome, estoque, valor) values ('Mousepad', 5, 25.00);
Insere um novo produto na tabela produtos: Nome: Mousepad Estoque: 5 Valor: R$ 25,00

delete from filmes where categoria = 'Ficção' and ano > 2020;
Apaga todos os filmes que: são da categoria Ficção e foram lançados após 2020 as duas condições precisam ser verdadeiras.

delete from carros where placa ilike '%3' or marca in ('Toyota', 'Fiat');
Apaga carros que atendam uma das condições: placa termina com 3 (%3) OU marca seja Toyota ou Fiat ILIKE = comparação sem diferenciar maiúsculas/minúsculas (PostgreSQL).