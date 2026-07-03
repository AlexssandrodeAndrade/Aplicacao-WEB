# Aula 56 - Node.js com PostgreSQL

Esta aula contém dois projetos separados desenvolvidos com Node.js, Express e PostgreSQL.

O objetivo foi praticar a criação de APIs integradas com banco de dados, utilizando variáveis de ambiente com `.env` e scripts SQL separados para criação das tabelas e inserção de dados iniciais.

## Projetos da aula

### 1. Carros

API para cadastro e consulta de carros.

Funcionalidades:

- Consultar carros cadastrados
- Cadastrar novos carros
- Persistir os dados no PostgreSQL
- Testar as rotas pelo Thunder Client

Campos da tabela:

- id
- placa
- modelo
- marca
- ano

Rotas principais:

```txt
GET  /carros
POST /carros
```

---

### 2. Compras

Aplicação de lista de compras com backend, frontend e banco de dados.

Funcionalidades:

- Listar itens da lista de compras
- Cadastrar item
- Alterar item
- Marcar item como comprado ou não comprado
- Deletar item
- Persistir os dados no PostgreSQL
- Utilizar frontend integrado ao backend

Campos da tabela:

- id
- nome
- comprado
- criado_em

Rotas principais:

```txt
GET    /compras
GET    /compras/:id
POST   /compras
PUT    /compras/:id
DELETE /compras/:id
```

## Estrutura da aula

```txt
aula56/
├── carros/
│   ├── app.js
│   ├── database.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── database/
│       ├── tabelas.sql
│       └── inserts.sql
│
└── compras/
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
    └── public/
        ├── index.html
        ├── css/
        │   └── style.css
        └── js/
            └── script.js
```

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- HTML
- CSS
- JavaScript
- Bootstrap
- Thunder Client

## Configuração dos projetos

Cada projeto possui um arquivo `.env.example`.

Para executar, crie um arquivo `.env` dentro da pasta do projeto desejado, seguindo o modelo do `.env.example`.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

O arquivo `.env` não deve ser enviado para o GitHub, pois contém configurações locais do ambiente e dados de conexão com o banco.

## Como executar

Entre na pasta do projeto desejado.

Exemplo para carros:

```bash
cd carros
npm install
npm run dev
```

Exemplo para compras:

```bash
cd compras
npm install
npm run dev
```

Os dois projetos usam a porta padrão `3000`.

Por isso, execute apenas um projeto por vez.

## Banco de dados

Cada projeto possui uma pasta `database` com os scripts SQL:

```txt
database/
├── tabelas.sql
└── inserts.sql
```

O arquivo `tabelas.sql` cria a tabela necessária para o projeto.

O arquivo `inserts.sql` insere dados iniciais para teste.

## Observação

O projeto `carros` foi desenvolvido somente como API, sem frontend.

O projeto `compras` possui frontend integrado ao backend, servido pelo próprio Express através da pasta `public`.