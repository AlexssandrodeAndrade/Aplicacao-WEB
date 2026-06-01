-- Listar todos os quartos com o nome do hotel
SELECT 
    quartos.id AS quarto_id,
    quartos.numero AS numero_quarto,
    quartos.tipo,
    quartos.capacidade,
    quartos.preco_diaria,
    quartos.status,
    hoteis.nome AS hotel,
    hoteis.cidade,
    hoteis.pais
FROM quartos
JOIN hoteis
    ON quartos.hotel_id = hoteis.id
ORDER BY hoteis.nome, quartos.numero;

-- Listar reservas com hóspede, hotel e quarto
SELECT 
    reservas.id AS reserva_id,
    hospedes.nome AS hospede,
    hoteis.nome AS hotel,
    quartos.numero AS quarto,
    quartos.tipo AS tipo_quarto,
    reservas.data_entrada,
    reservas.data_saida,
    reservas.quantidade_pessoas,
    reservas.status AS status_reserva
FROM reservas
JOIN hospedes
    ON reservas.hospede_id = hospedes.id
JOIN quartos
    ON reservas.quarto_id = quartos.id
JOIN hoteis
    ON quartos.hotel_id = hoteis.id
ORDER BY reservas.data_entrada;

-- Listar quartos disponíveis
SELECT 
    hoteis.nome AS hotel,
    hoteis.cidade,
    hoteis.pais,
    quartos.numero AS quarto,
    quartos.tipo,
    quartos.capacidade,
    quartos.preco_diaria,
    quartos.status
FROM quartos
JOIN hoteis
    ON quartos.hotel_id = hoteis.id
WHERE quartos.status = 'Available'
ORDER BY quartos.preco_diaria;

-- Calcular o faturamento por hotel
SELECT 
    hoteis.nome AS hotel,
    hoteis.pais,
    pagamentos.moeda,
    SUM(pagamentos.valor) AS total_faturado
FROM pagamentos
JOIN reservas
    ON pagamentos.reserva_id = reservas.id
JOIN quartos
    ON reservas.quarto_id = quartos.id
JOIN hoteis
    ON quartos.hotel_id = hoteis.id
WHERE pagamentos.status = 'Paid'
GROUP BY hoteis.nome, hoteis.pais, pagamentos.moeda
ORDER BY total_faturado DESC;

-- Listar funcionários por hotel
SELECT 
    funcionarios.id AS funcionario_id,
    funcionarios.nome AS funcionario,
    funcionarios.cargo,
    funcionarios.email,
    funcionarios.telefone,
    funcionarios.salario,
    funcionarios.data_contratacao,
    hoteis.nome AS hotel,
    hoteis.cidade,
    hoteis.pais
FROM funcionarios
JOIN hoteis
    ON funcionarios.hotel_id = hoteis.id
ORDER BY hoteis.nome, funcionarios.cargo, funcionarios.nome;

-- consulta mais avançada para reservas em andamento
SELECT 
    reservas.id AS reserva_id,
    hospedes.nome AS hospede,
    hoteis.nome AS hotel,
    quartos.numero AS quarto,
    reservas.data_entrada,
    reservas.data_saida,
    reservas.status
FROM reservas
JOIN hospedes
    ON reservas.hospede_id = hospedes.id
JOIN quartos
    ON reservas.quarto_id = quartos.id
JOIN hoteis
    ON quartos.hotel_id = hoteis.id
WHERE CURRENT_DATE BETWEEN reservas.data_entrada AND reservas.data_saida
ORDER BY reservas.data_entrada;

-- quantos registros existem em cada tabela do banco.
SELECT 'funcionarios' AS tabela, COUNT(*) AS quantidade_linhas
FROM funcionarios

UNION ALL

SELECT 'hospedes' AS tabela, COUNT(*) AS quantidade_linhas
FROM hospedes

UNION ALL

SELECT 'hoteis' AS tabela, COUNT(*) AS quantidade_linhas
FROM hoteis

UNION ALL

SELECT 'pagamentos' AS tabela, COUNT(*) AS quantidade_linhas
FROM pagamentos

UNION ALL

SELECT 'quartos' AS tabela, COUNT(*) AS quantidade_linhas
FROM quartos

UNION ALL

SELECT 'reservas' AS tabela, COUNT(*) AS quantidade_linhas
FROM reservas;