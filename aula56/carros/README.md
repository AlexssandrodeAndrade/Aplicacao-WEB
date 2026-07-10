# Exercício 01 - CRUD de Carros e Marcas

Projeto desenvolvido para a aula 56 do curso de Aplicações Web.

O objetivo do exercício é criar um CRUD com duas telas no mesmo projeto: uma tela para cadastro de marcas e outra tela para cadastro de carros.

O projeto utiliza Node.js, Express e PostgreSQL no backend, além de HTML, JavaScript e Bootstrap 5 no frontend.

## Descrição do exercício

O sistema possui duas entidades principais:

### Marca

A marca possui os seguintes campos:

- id
- nome

### Carro

O carro possui os seguintes campos:

- id
- modelo
- marca
- ano

No banco de dados, a marca é cadastrada em uma tabela própria. A tabela de carros armazena o `marca_id`, criando um relacionamento entre carro e marca.

Para exibir o nome da marca na listagem de carros, foi utilizada uma consulta com `INNER JOIN` entre as tabelas `carros` e `marcas`.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- HTML
- JavaScript
- Bootstrap 5

## Funcionalidades

### Marcas

- Cadastrar marca
- Listar marcas
- Editar marca
- Excluir marca

### Carros

- Cadastrar carro
- Listar carros
- Editar carro
- Excluir carro
- Exibir o nome da marca vinculada ao carro

## Segurança no frontend

O frontend evita inserir dados vindos da API usando `innerHTML`.

Para reduzir o risco de XSS, os dados de carros e marcas são adicionados na tela usando:

- `createElement`
- `textContent`
- `addEventListener`
- `replaceChildren`

Assim, valores cadastrados pelo usuário não são interpretados como HTML pelo navegador.

## Estrutura do projeto

```txt
carros/
├── app.js
├── database.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── README.md
├── database/
│   ├── tabelas.sql
│   └── inserts.sql
├── routes/
│   ├── api.js
│   └── api/
│       ├── carro.routes.js
│       └── marca.routes.js
└── public/
    ├── index.html
    ├── carros.html
    ├── marcas.html
    └── js/
        ├── carros.js
        └── marcas.js
```

## Configuração do ambiente

Antes de executar o projeto, é necessário criar um arquivo `.env` na raiz da pasta do projeto.

Existe um arquivo `.env.example` com o modelo das variáveis necessárias.

Exemplo de configuração:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

A variável `PORT` é obrigatória.

O projeto não define uma porta padrão automaticamente, pois a porta deve ser informada no arquivo `.env`.

Caso a variável `PORT` não esteja configurada, o servidor não será iniciado corretamente.

## Banco de dados

O script de criação das tabelas está em:

```txt
database/tabelas.sql
```

O script de inserts iniciais está em:

```txt
database/inserts.sql
```

### Tabela marcas

```sql
CREATE TABLE marcas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);
```

### Tabela carros

```sql
CREATE TABLE carros (
  id SERIAL PRIMARY KEY,
  modelo VARCHAR(100) NOT NULL,
  marca_id INTEGER NOT NULL,
  ano INTEGER NOT NULL,

  CONSTRAINT fk_carros_marcas
    FOREIGN KEY (marca_id)
    REFERENCES marcas(id)
);
```

## Consulta com JOIN

A listagem de carros utiliza `INNER JOIN` para mostrar o nome da marca:

```sql
SELECT
  c.id,
  c.modelo,
  c.marca_id,
  m.nome AS marca_nome,
  c.ano
FROM carros c
INNER JOIN marcas m ON m.id = c.marca_id
ORDER BY c.id ASC;
```

## Rotas da API

### Marcas

```txt
GET    /api/marcas
GET    /api/marcas/:id
POST   /api/marcas
PUT    /api/marcas/:id
DELETE /api/marcas/:id
```

### Carros

```txt
GET    /api/carros
GET    /api/carros/:id
POST   /api/carros
PUT    /api/carros/:id
DELETE /api/carros/:id
```

## Exemplos de requisição

### Cadastrar marca

```json
{
  "nome": "Honda"
}
```

### Cadastrar carro

```json
{
  "modelo": "Civic",
  "marca_id": 1,
  "ano": 2020
}
```

## Como executar o projeto

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`.

Execute o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Ou execute em modo normal:

```bash
npm start
```

Acesse no navegador usando a porta configurada no `.env`.

Exemplo:

```txt
http://localhost:3000
```

Telas disponíveis:

```txt
http://localhost:3000/marcas.html
http://localhost:3000/carros.html
```

## Observação

Este projeto foi atualizado para separar o cadastro de marcas do cadastro de carros.

Antes, a marca poderia ser tratada apenas como texto dentro do carro. Agora, a marca possui uma tabela própria e os carros são vinculados por meio de chave estrangeira, deixando o projeto mais organizado e mais próximo de uma modelagem relacional correta.