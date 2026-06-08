CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE turma (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE matricula (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,

    FOREIGN KEY (aluno_id) REFERENCES aluno(id),
    FOREIGN KEY (turma_id) REFERENCES turma(id)
);

-- ALUNOS

INSERT INTO aluno (nome) VALUES
('João'),
('Maria'),
('Pedro'),
('Ana'),
('Carlos'),
('Fernanda'),
('Lucas'),
('Juliana'),
('Roberto'),
('Patricia'),
('Gabriel'),
('Camila');

-- TURMAS

INSERT INTO turma (nome) VALUES
('Java'),
('Banco de Dados'),
('Node.js'),
('PHP'),
('Python'),
('React'),
('C#'),
('Docker');

-- MATRICULAS

INSERT INTO matricula (aluno_id, turma_id) VALUES
(1, 1),  -- João -> Java
(1, 2),  -- João -> Banco de Dados

(2, 1),  -- Maria -> Java
(2, 3),  -- Maria -> Node

(3, 2),  -- Pedro -> Banco

(4, 4),  -- Ana -> PHP
(4, 5),  -- Ana -> Python

(5, 1),  -- Carlos -> Java
(5, 2),  -- Carlos -> Banco
(5, 6),  -- Carlos -> React

(6, 5),  -- Fernanda -> Python

(7, 3),  -- Lucas -> Node
(7, 6),  -- Lucas -> React

(8, 1),  -- Juliana -> Java
(8, 7),  -- Juliana -> C#

(9, 4),  -- Roberto -> PHP

(10, 2), -- Patricia -> Banco
(10, 3), -- Patricia -> Node
(10, 5), -- Patricia -> Python

(11, 1); -- Gabriel -> Java
