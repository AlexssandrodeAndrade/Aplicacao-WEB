-- apenas nome e preço de todos os produtos
select nome, preco
from produtos;

-- produtos da categoria "informática"
select *
from produtos
where categoria = 'informática';

-- produtos com estoque maior que 5
select *
from produtos
where estoque > 5;

-- produtos ativos
select *
from produtos
where ativo = true;

select *
from produtos
where ativo;

insert into produtos (nome, categoria, preco, estoque, ativo)
values
('teclado mecânico rgb', 'informática', 450.00, 8, true),
('fone bluetooth jbl', 'áudio', 320.00, 15, true),
('micro-ondas electrolux', 'eletrodomésticos', 890.00, 4, true);

select * from produtos where categoria = 'móveis';

update produtos
set ativo = false
where categoria = 'móveis';

select * from produtos where preco < 200.00;

delete from produtos
where preco < 200.00;
