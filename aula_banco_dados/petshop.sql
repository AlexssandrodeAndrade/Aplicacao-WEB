create database petshop;

create table clientes (
    id serial primary key,
    nome varchar(100),
    telefone varchar(20),
    endereco varchar(150)
);

create table pets (
    id serial primary key,
    nome varchar(100),
    especie varchar(50),
    raca varchar(50),
    idade int,
    cliente_id int,
    foreign key (cliente_id) references clientes(id)
);

create table atendimentos (
    id serial primary key,
    data_atendimento date,
    servico varchar(100),
    valor decimal(10,2),
    pet_id int,
    foreign key (pet_id) references pets(id)
);

insert into clientes (nome, telefone, endereco) values
('Alexssandro', '47999990001', 'Rua A, 123'),
('Maria Silva', '47999990002', 'Rua B, 456'),
('João Pedro', '47999990003', 'Rua C, 789');

insert into pets (nome, especie, raca, idade, cliente_id) values
('Rex', 'Cachorro', 'Labrador', 5, 1),
('Mimi', 'Gato', 'Siamês', 3, 2),
('Thor', 'Cachorro', 'Pinscher', 2, 3),
('Luna', 'Gato', 'Persa', 4, 1);

insert into atendimentos (data_atendimento, servico, valor, pet_id) values
('2026-05-14', 'Banho', 50.00, 1),
('2026-05-14', 'Tosa', 70.00, 2),
('2026-05-15', 'Consulta', 120.00, 3),
('2026-05-15', 'Vacinação', 90.00, 4);

SELECT * FROM atendimentos