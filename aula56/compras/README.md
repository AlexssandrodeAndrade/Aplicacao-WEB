# Desafio 02 - Lista de Compras com PostgreSQL

Projeto desenvolvido para a aula 56 do curso de Aplicações Web.

O objetivo do desafio é criar uma aplicação de lista de compras usando Node.js, Express, PostgreSQL e frontend integrado ao backend.

A aplicação permite cadastrar, consultar, alterar e excluir itens da lista de compras. Os dados são armazenados em banco de dados PostgreSQL.

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

## Funcionalidades

- Listar itens da lista de compras
- Cadastrar novo item
- Alterar item existente
- Marcar item como comprado ou não comprado
- Excluir item
- Exibir mensagens de sucesso ou erro no frontend
- Persistir os dados no PostgreSQL

## Estrutura do projeto

```txt
compras/
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

## Banco de dados

Banco utilizado no projeto:

```txt
aula56_compras
```

Tabela utilizada:

```sql
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    comprado BOOLEAN NOT NULL DEFAULT false,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Campos da tabela

| Campo | Tipo | Descrição |
|---|---|---|
| id | SERIAL | Identificador único do item |
| nome | VARCHAR(150) | Nome do item da lista |
| comprado | BOOLEAN | Indica se o item já foi comprado |
| criado_em | TIMESTAMP | Data e hora de criação do registro |

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=aula56_compras
```

O arquivo `.env` não deve ser enviado para o GitHub, pois contém informações locais de configuração do banco de dados.

## Instalação

Execute o comando abaixo para instalar as dependências:

```bash
npm install
```

## Como executar

Para iniciar o servidor:

```bash
npm start
```

Ou, em modo de desenvolvimento com atualização automática:

```bash
npm run dev
```

O servidor será iniciado na porta configurada no `.env`.

Exemplo:

```txt
http://localhost:3000
```

Ao acessar esse endereço no navegador, o frontend será carregado pela pasta `public`.

## Rotas da API

### Teste da API

```http
GET /
```

Essa rota também carrega o frontend da aplicação quando acessada pelo navegador.

---

### Listar itens

```http
GET /compras
```

Exemplo de resposta:

```json
[
    {
        "id": 1,
        "nome": "Arroz",
        "comprado": false,
        "criado_em": "2026-07-02T18:00:00.000Z"
    }
]
```

---

### Buscar item por ID

```http
GET /compras/:id
```

Exemplo:

```http
GET /compras/1
```

---

### Cadastrar item

```http
POST /compras
```

Exemplo de body JSON:

```json
{
    "nome": "Açúcar",
    "comprado": false
}
```

Exemplo de resposta:

```json
{
    "mensagem": "Item cadastrado com sucesso",
    "item": {
        "id": 2,
        "nome": "Açúcar",
        "comprado": false,
        "criado_em": "2026-07-02T18:10:00.000Z"
    }
}
```

---

### Alterar item

```http
PUT /compras/:id
```

Exemplo:

```http
PUT /compras/1
```

Exemplo de body JSON:

```json
{
    "nome": "Arroz integral",
    "comprado": true
}
```

Exemplo de resposta:

```json
{
    "mensagem": "Item alterado com sucesso",
    "item": {
        "id": 1,
        "nome": "Arroz integral",
        "comprado": true,
        "criado_em": "2026-07-02T18:00:00.000Z"
    }
}
```

---

### Deletar item

```http
DELETE /compras/:id
```

Exemplo:

```http
DELETE /compras/1
```

Exemplo de resposta:

```json
{
    "mensagem": "Item deletado com sucesso",
    "item": {
        "id": 1,
        "nome": "Arroz integral",
        "comprado": true,
        "criado_em": "2026-07-02T18:00:00.000Z"
    }
}
```

## Scripts SQL

Os scripts do banco estão dentro da pasta `database`.

### `database/tabelas.sql`

Arquivo responsável pela criação da tabela `compras`.

### `database/inserts.sql`

Arquivo responsável por inserir dados iniciais para teste.

## Frontend

O frontend está dentro da pasta `public`.

Ele consome a própria API do backend usando `fetch`, com as seguintes rotas:

```txt
GET    /compras
POST   /compras
PUT    /compras/:id
DELETE /compras/:id
```

Como o frontend é servido pelo próprio Express, não foi necessário utilizar `cors`.

## Testes

As rotas da API foram testadas utilizando o Thunder Client.

Rotas testadas:

```txt
GET    http://localhost:3000/compras
GET    http://localhost:3000/compras/1
POST   http://localhost:3000/compras
PUT    http://localhost:3000/compras/1
DELETE http://localhost:3000/compras/1
```

## Observação

Este projeto reaproveita o frontend desenvolvido em aula anterior, agora integrado com backend Node.js e banco de dados PostgreSQL.

Antes, os dados eram manipulados apenas pelo frontend ou em memória.  
Nesta versão, os registros são persistidos no banco de dados.