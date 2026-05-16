create database oficina;

create table carros (
    id serial primary key,
    modelo varchar(100),
    marca varchar(100),
    ano int,
    proprietario varchar(100)
);

insert into carros (modelo, marca, ano, proprietario) values
('Civic', 'Honda', 2020, 'Alexssandro'),
('Gol', 'Volkswagen', 2018, 'Maria Silva'),
('Corolla', 'Toyota', 2022, 'João Pedro'),
('Onix', 'Chevrolet', 2021, 'Carla Souza'),
('HB20', 'Hyundai', 2019, 'Lucas Fernandes');

select * from carros