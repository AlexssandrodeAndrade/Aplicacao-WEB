create database aula01;

create table alunos(
	id serial primary key,
	nome varchar(100),
	idade int,
	turma varchar(100)
);

insert into alunos (nome, idade,turma) values 
('Alexssandro', 36, 'Aplicações Web'),
('Alexssandro', 40, 'PHP'),
('Maria Silva', 22, 'Banco de Dados'),
('João Pedro', 19, 'JavaScript'),
('Carla Souza', 27, 'Desenvolvimento Web'),
('Lucas Fernandes', 24, 'Node.js');

select * from alunos

select nome, idade from alunos