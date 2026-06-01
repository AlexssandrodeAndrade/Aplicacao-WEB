
CREATE TABLE proprietario (
   id SERIAL PRIMARY KEY,
   nome VARCHAR(100) NOT NULL,
   cpf VARCHAR(20) NOT NULL
);

CREATE TABLE veiculo (
   id SERIAL PRIMARY KEY,
   placa VARCHAR(50) NOT NULL,
   modelo VARCHAR(50) NOT NULL,
   id_proprietario INTEGER NOT NULL UNIQUE,
   FOREIGN KEY (id_proprietario) REFERENCES proprietario(id)
);

CREATE TABLE marca (
   id SERIAL PRIMARY KEY,
   nome VARCHAR(255) NOT NULL
);

CREATE TABLE carro (
   id SERIAL PRIMARY KEY,
   placa VARCHAR(255) NOT NULL,
   modelo VARCHAR(255) NOT NULL,
   id_marca INT,
   FOREIGN KEY (id_marca) REFERENCES marca(id)
);

CREATE TABLE produtos (
   id SERIAL PRIMARY KEY,
   nome VARCHAR(255) NOT NULL,
   preco DECIMAL(10, 2) NOT NULL,
   estoque INT NOT NULL
);

CREATE TABLE compras (
   id SERIAL PRIMARY KEY,
   cliente VARCHAR(255) NOT NULL,
   data_compra DATE NOT NULL
);

CREATE TABLE compra_produto (
   id SERIAL PRIMARY KEY,
   compra_id INT NOT NULL,
   produto_id INT NOT NULL,
   quantidade INT NOT NULL,
   FOREIGN KEY (compra_id) REFERENCES compras(id),
   FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
