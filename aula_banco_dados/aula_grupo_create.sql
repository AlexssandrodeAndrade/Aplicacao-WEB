CREATE DATABASE hotel_internacional;

-- Depois de criar o banco, conecte nele antes de criar as tabelas.

CREATE TABLE hoteis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pais VARCHAR(80) NOT NULL,
    cidade VARCHAR(80) NOT NULL,
    endereco VARCHAR(150),
    telefone VARCHAR(30),
    email VARCHAR(100),
    moeda VARCHAR(10) NOT NULL
);

CREATE TABLE hospedes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(30),
    documento VARCHAR(50) NOT NULL,
    nacionalidade VARCHAR(80),
    data_nascimento DATE
);

CREATE TABLE quartos (
    id SERIAL PRIMARY KEY,
    hotel_id INT NOT NULL,
    numero INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL,
    preco_diaria NUMERIC(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL,

    CONSTRAINT fk_quartos_hoteis
        FOREIGN KEY (hotel_id)
        REFERENCES hoteis(id)
);

CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    hotel_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(30),
    salario NUMERIC(10,2),
    data_contratacao DATE,

    CONSTRAINT fk_funcionarios_hoteis
        FOREIGN KEY (hotel_id)
        REFERENCES hoteis(id)
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    hospede_id INT NOT NULL,
    quarto_id INT NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    quantidade_pessoas INT NOT NULL,
    status VARCHAR(30) NOT NULL,

    CONSTRAINT fk_reservas_hospedes
        FOREIGN KEY (hospede_id)
        REFERENCES hospedes(id),

    CONSTRAINT fk_reservas_quartos
        FOREIGN KEY (quarto_id)
        REFERENCES quartos(id),

    CONSTRAINT chk_datas_reserva
        CHECK (data_saida > data_entrada)
);

CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    reserva_id INT NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    moeda VARCHAR(10) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    data_pagamento DATE,

    CONSTRAINT fk_pagamentos_reservas
        FOREIGN KEY (reserva_id)
        REFERENCES reservas(id)
);
