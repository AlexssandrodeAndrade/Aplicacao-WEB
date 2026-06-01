-- =========================================================
-- SCRIPT COMPLETO DE INSERTS - BANCO HOTEL INTERNACIONAL
-- Observação:
-- Este script apaga os dados atuais e reinsere dados organizados.
-- Use somente se puder limpar as tabelas do banco.
-- =========================================================

TRUNCATE TABLE pagamentos, reservas, funcionarios, quartos, hospedes, hoteis
RESTART IDENTITY CASCADE;

-- =========================
-- INSERT HOTEIS
-- =========================

INSERT INTO hoteis (nome, pais, cidade, endereco, telefone, email, moeda)
VALUES
('Grand Palace Hotel', 'Estados Unidos', 'Nova York', '5th Avenue, 1200', '+1 212-555-1000', 'contato@grandpalace.com', 'USD'),
('Royal Sunset Hotel', 'Reino Unido', 'Londres', 'Baker Street, 221B', '+44 20-5555-2000', 'contato@royalsunset.com', 'GBP'),
('Hotel Bella Vista', 'Brasil', 'São Paulo', 'Av. Paulista, 1500', '+55 11-4000-3000', 'contato@bellavista.com', 'BRL'),
('Alpine Lake Resort', 'Suíça', 'Zurique', 'Lake Road, 88', '+41 44-555-4000', 'contact@alpinelake.com', 'CHF'),
('Sakura Garden Hotel', 'Japão', 'Tóquio', 'Shinjuku Street, 45', '+81 3-5555-5000', 'contact@sakuragarden.jp', 'JPY');

-- =========================
-- INSERT HOSPEDES
-- =========================

INSERT INTO hospedes (nome, email, telefone, documento, nacionalidade, data_nascimento)
VALUES
('John Smith', 'john.smith@email.com', '+1 202-555-0101', 'P123456', 'Americano', '1985-04-10'),
('Maria Garcia', 'maria.garcia@email.com', '+34 600-123-456', 'ES987654', 'Espanhola', '1992-08-15'),
('Hans Müller', 'hans.muller@email.com', '+49 151-222333', 'DE456789', 'Alemão', '1978-11-03'),
('Alexssandro Andrade', 'alex@email.com', '+55 47-99999-8888', 'BR123456789', 'Brasileiro', '1989-06-20'),
('Emma Johnson', 'emma.johnson@email.com', '+44 7777-123456', 'UK741852', 'Britânica', '1995-01-12'),
('Luca Rossi', 'luca.rossi@email.com', '+39 333-555-1212', 'IT159753', 'Italiano', '1988-09-25'),
('Sophie Martin', 'sophie.martin@email.com', '+33 612-345-678', 'FR357951', 'Francesa', '1990-02-18'),
('Yuki Tanaka', 'yuki.tanaka@email.com', '+81 90-1111-2222', 'JP852741', 'Japonesa', '1998-12-05'),
('Robert Miller', 'robert.miller@email.com', '+1 303-555-0199', 'US963852', 'Americano', '1975-07-30'),
('Camila Oliveira', 'camila.oliveira@email.com', '+55 21-98888-1111', 'BR741963', 'Brasileira', '1993-03-11'),
('Pedro Almeida', 'pedro.almeida@email.com', '+351 912-444-555', 'PT258369', 'Português', '1984-10-09'),
('Olivia Brown', 'olivia.brown@email.com', '+44 7555-888999', 'UK147258', 'Britânica', '1997-05-22'),
('Chen Wei', 'chen.wei@email.com', '+86 138-0000-1234', 'CN369258', 'Chinês', '1982-01-17'),
('Ana Torres', 'ana.torres@email.com', '+52 55-1111-2222', 'MX789456', 'Mexicana', '1991-06-14'),
('Noah Williams', 'noah.williams@email.com', '+1 646-555-1212', 'US654321', 'Canadense', '1986-09-01');

-- =========================
-- INSERT QUARTOS
-- =========================

INSERT INTO quartos (hotel_id, numero, tipo, capacidade, preco_diaria, status)
VALUES
-- Hotel 1 - Grand Palace Hotel
(1, 101, 'Single Room', 1, 120.00, 'Available'),
(1, 102, 'Double Room', 2, 220.00, 'Occupied'),
(1, 103, 'Double Room', 2, 240.00, 'Available'),
(1, 201, 'Luxury Suite', 4, 650.00, 'Available'),
(1, 202, 'Family Room', 5, 480.00, 'Maintenance'),

-- Hotel 2 - Royal Sunset Hotel
(2, 101, 'Single Room', 1, 150.00, 'Available'),
(2, 102, 'Double Room', 2, 260.00, 'Occupied'),
(2, 201, 'Luxury Suite', 4, 750.00, 'Available'),
(2, 202, 'Family Room', 5, 500.00, 'Maintenance'),
(2, 301, 'Executive Room', 2, 430.00, 'Available'),

-- Hotel 3 - Hotel Bella Vista
(3, 301, 'Double Room', 2, 280.00, 'Available'),
(3, 302, 'Luxury Suite', 4, 700.00, 'Occupied'),
(3, 303, 'Single Room', 1, 180.00, 'Available'),
(3, 401, 'Family Room', 5, 450.00, 'Available'),
(3, 402, 'Standard Room', 2, 230.00, 'Maintenance'),

-- Hotel 4 - Alpine Lake Resort
(4, 101, 'Single Room', 1, 210.00, 'Available'),
(4, 102, 'Double Room', 2, 380.00, 'Available'),
(4, 201, 'Chalet Suite', 2, 900.00, 'Occupied'),
(4, 202, 'Family Mountain Room', 5, 720.00, 'Available'),
(4, 301, 'Premium Suite', 4, 1100.00, 'Available'),

-- Hotel 5 - Sakura Garden Hotel
(5, 101, 'Compact Room', 1, 16000.00, 'Available'),
(5, 102, 'Twin Room', 2, 22000.00, 'Occupied'),
(5, 201, 'Garden Suite', 2, 45000.00, 'Available'),
(5, 202, 'Family Room', 4, 38000.00, 'Available'),
(5, 301, 'Traditional Suite', 3, 60000.00, 'Maintenance');

-- =========================
-- INSERT FUNCIONARIOS
-- =========================

INSERT INTO funcionarios (hotel_id, nome, cargo, email, telefone, salario, data_contratacao)
VALUES
-- Hotel 1
(1, 'Michael Brown', 'Manager', 'michael@grandpalace.com', '+1 212-555-8888', 8500.00, '2022-03-10'),
(1, 'Sarah Wilson', 'Receptionist', 'sarah@grandpalace.com', '+1 212-555-7777', 3200.00, '2023-06-01'),
(1, 'David Clark', 'Housekeeper', 'david@grandpalace.com', '+1 212-555-6666', 2600.00, '2024-02-15'),

-- Hotel 2
(2, 'James Carter', 'Manager', 'james@royalsunset.com', '+44 20-5555-9999', 9000.00, '2021-09-15'),
(2, 'Emily White', 'Housekeeper', 'emily@royalsunset.com', '+44 20-5555-6666', 2500.00, '2024-01-20'),
(2, 'George Harris', 'Receptionist', 'george@royalsunset.com', '+44 20-5555-1212', 3100.00, '2023-08-12'),

-- Hotel 3
(3, 'Carlos Silva', 'Manager', 'carlos@bellavista.com', '+55 11-4000-9999', 7000.00, '2020-05-01'),
(3, 'Fernanda Souza', 'Receptionist', 'fernanda@bellavista.com', '+55 11-4000-8888', 2800.00, '2023-11-10'),
(3, 'Juliana Rocha', 'Housekeeper', 'juliana@bellavista.com', '+55 11-4000-7777', 2400.00, '2024-03-05'),

-- Hotel 4
(4, 'Lena Fischer', 'Manager', 'lena@alpinelake.com', '+41 44-555-1111', 9800.00, '2019-04-18'),
(4, 'Marco Keller', 'Receptionist', 'marco@alpinelake.com', '+41 44-555-2222', 3900.00, '2022-12-01'),
(4, 'Anna Weber', 'Security', 'anna@alpinelake.com', '+41 44-555-3333', 4200.00, '2021-06-21'),

-- Hotel 5
(5, 'Kenji Sato', 'Manager', 'kenji@sakuragarden.jp', '+81 3-5555-1111', 950000.00, '2020-08-07'),
(5, 'Aiko Nakamura', 'Receptionist', 'aiko@sakuragarden.jp', '+81 3-5555-2222', 320000.00, '2023-01-16'),
(5, 'Hiro Tanaka', 'Housekeeper', 'hiro@sakuragarden.jp', '+81 3-5555-3333', 280000.00, '2024-04-01');

-- =========================
-- INSERT RESERVAS
-- =========================

INSERT INTO reservas (hospede_id, quarto_id, data_entrada, data_saida, quantidade_pessoas, status)
VALUES
-- Reservas em andamento próximas de 29/05/2026
(1, 2, '2026-05-28', '2026-06-02', 2, 'Confirmed'),
(2, 7, '2026-05-25', '2026-05-31', 2, 'Confirmed'),
(3, 12, '2026-05-20', '2026-05-30', 4, 'Confirmed'),
(4, 18, '2026-05-27', '2026-06-03', 2, 'Confirmed'),
(5, 22, '2026-05-26', '2026-06-01', 2, 'Confirmed'),

-- Reservas futuras
(6, 4, '2026-06-10', '2026-06-15', 3, 'Confirmed'),
(7, 8, '2026-06-20', '2026-06-25', 2, 'Pending'),
(8, 14, '2026-07-05', '2026-07-10', 4, 'Confirmed'),
(9, 19, '2026-07-12', '2026-07-18', 5, 'Pending'),
(10, 23, '2026-08-01', '2026-08-06', 2, 'Confirmed'),

-- Reservas finalizadas ou canceladas
(11, 1, '2026-04-10', '2026-04-13', 1, 'Finished'),
(12, 6, '2026-04-15', '2026-04-20', 1, 'Finished'),
(13, 11, '2026-04-22', '2026-04-25', 2, 'Cancelled'),
(14, 16, '2026-03-01', '2026-03-05', 1, 'Finished'),
(15, 21, '2026-03-10', '2026-03-12', 1, 'Finished');

-- =========================
-- INSERT PAGAMENTOS
-- =========================

INSERT INTO pagamentos (reserva_id, valor, moeda, forma_pagamento, status, data_pagamento)
VALUES
(1, 1100.00, 'USD', 'Credit Card', 'Paid', '2026-05-28'),
(2, 1560.00, 'GBP', 'Debit Card', 'Paid', '2026-05-25'),
(3, 7000.00, 'BRL', 'Pix', 'Paid', '2026-05-20'),
(4, 6300.00, 'CHF', 'Credit Card', 'Paid', '2026-05-27'),
(5, 132000.00, 'JPY', 'Credit Card', 'Paid', '2026-05-26'),

(6, 3250.00, 'USD', 'Bank Transfer', 'Paid', '2026-06-10'),
(7, 3750.00, 'GBP', 'Bank Transfer', 'Pending', NULL),
(8, 2250.00, 'BRL', 'Pix', 'Paid', '2026-07-05'),
(9, 4320.00, 'CHF', 'Credit Card', 'Pending', NULL),
(10, 225000.00, 'JPY', 'Credit Card', 'Paid', '2026-08-01'),

(11, 360.00, 'USD', 'Cash', 'Paid', '2026-04-10'),
(12, 750.00, 'GBP', 'Debit Card', 'Paid', '2026-04-15'),
(13, 840.00, 'BRL', 'Credit Card', 'Refunded', '2026-04-22'),
(14, 840.00, 'CHF', 'Cash', 'Paid', '2026-03-01'),
(15, 32000.00, 'JPY', 'Debit Card', 'Paid', '2026-03-10');
