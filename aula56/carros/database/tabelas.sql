CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE carros (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca_id INTEGER NOT NULL,
    ano INTEGER NOT NULL,

    CONSTRAINT fk_carros_marcas
        FOREIGN KEY (marca_id)
        REFERENCES marcas(id)
);