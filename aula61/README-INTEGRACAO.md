# Aula 61 - CRUD de Clientes, Produtos e Pedidos

Projeto desenvolvido em Node.js com Express e PostgreSQL para implementação de um CRUD de:

- Clientes
- Produtos
- Pedidos

Cada pedido pertence a um cliente e pode possuir um ou mais produtos.

Os produtos de cada pedido são armazenados em uma tabela de relacionamento chamada `pedido_produtos`.

---

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- JavaScript
- Bootstrap 5
- HTML
- CSS

---

## Estrutura do projeto

```text
aula61/
├── controllers/
│   ├── ClienteController.js
│   ├── PedidoController.js
│   └── ProdutoController.js
│
├── database/
│   ├── tabela.clientes.sql
│   ├── tabela.produtos.sql
│   ├── tabela.pedidos.sql
│   └── tabela.pedido_produtos.sql
│
├── models/
│   ├── Cliente.js
│   ├── Pedido.js
│   └── Produto.js
│
├── public/
│   ├── index.html
│   ├── cliente.html
│   ├── produto.html
│   ├── pedido.html
│   └── assets/
│
├── routes/
│   ├── cliente.routes.js
│   ├── pedido.routes.js
│   └── produto.routes.js
│
├── script/
├── .env.example
├── .gitignore
├── app.js
├── database.js
├── package.json
└── package-lock.json
```

---

## Instalação

Após clonar o repositório, entre na pasta do exercício:

```powershell
cd aula61
```

Instale as dependências:

```powershell
npm install
```

---

## Configuração do ambiente

Crie um arquivo `.env` na raiz da pasta `aula61`.

Use o arquivo `.env.example` como referência:

```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
DB_PORT=5432
```

O arquivo `.env` não é enviado para o GitHub, pois está incluído no `.gitignore`.

---

## Criação das tabelas

Antes de executar a aplicação, crie as tabelas no PostgreSQL.

Execute os arquivos SQL nesta ordem:

```text
1. database/tabela.clientes.sql
2. database/tabela.produtos.sql
3. database/tabela.pedidos.sql
4. database/tabela.pedido_produtos.sql
```

A ordem é importante devido aos relacionamentos entre as tabelas.

### Relacionamentos

- Um cliente pode possuir pedidos.
- Cada pedido pertence a um cliente.
- Um pedido pode possuir um ou mais produtos.
- A tabela `pedido_produtos` realiza o relacionamento entre pedidos e produtos.

---

## Executando o projeto

### Modo de desenvolvimento

Execute:

```powershell
npm run dev
```

O comando utiliza o modo `watch` do Node.js:

```text
node --watch app.js
```

Assim, quando um arquivo do backend é alterado e salvo, o servidor é reiniciado automaticamente.

A aplicação ficará disponível em:

```text
http://localhost:3000
```

### Execução normal

Também é possível executar sem o modo de monitoramento:

```powershell
npm start
```

Esse comando executa:

```text
node app.js
```

---

## Frontend

O frontend é servido pelo próprio Express através da pasta `public`.

Acesse:

```text
http://localhost:3000
```

Páginas disponíveis:

```text
/index.html
/cliente.html
/produto.html
/pedido.html
```

---

## Rotas de Clientes

### Listar clientes

```http
GET /clientes
```

### Cadastrar cliente

```http
POST /clientes
```

Exemplo:

```json
{
    "nome": "João da Silva",
    "email": "joao@email.com"
}
```

### Atualizar cliente

```http
PUT /clientes/:id
```

### Excluir cliente

```http
DELETE /clientes/:id
```

---

## Rotas de Produtos

### Listar produtos

```http
GET /produtos
```

### Cadastrar produto

```http
POST /produtos
```

Exemplo:

```json
{
    "nome": "Teclado",
    "preco": 150.90
}
```

### Atualizar produto

```http
PUT /produtos/:id
```

### Excluir produto

```http
DELETE /produtos/:id
```

---

## Rotas de Pedidos

### Listar pedidos

```http
GET /pedidos
```

### Cadastrar pedido

```http
POST /pedidos
```

Exemplo com um produto:

```json
{
    "clienteId": 1,
    "produtos": [1]
}
```

Exemplo com vários produtos:

```json
{
    "clienteId": 1,
    "produtos": [1, 2, 3]
}
```

O pedido deve possuir:

- um cliente válido;
- pelo menos um produto;
- produtos válidos;
- produtos sem repetição dentro do mesmo pedido.

### Atualizar pedido

```http
PUT /pedidos/:id
```

### Excluir pedido

```http
DELETE /pedidos/:id
```

---

## Relacionamento entre pedidos e produtos

Os produtos não são armazenados diretamente na tabela `pedidos`.

A tabela:

```text
pedido_produtos
```

possui os campos:

```text
pedido_id
produto_id
```

Dessa forma, um mesmo pedido pode possuir vários produtos.

---

## Transações

As operações de cadastro, atualização e exclusão dos pedidos utilizam transações no PostgreSQL.

Exemplo do cadastro:

```text
BEGIN
  ↓
Cadastrar pedido
  ↓
Obter o ID do pedido
  ↓
Cadastrar os produtos em pedido_produtos
  ↓
COMMIT
```

Caso ocorra algum erro durante a operação:

```text
ROLLBACK
```

Isso evita que sejam gravados dados incompletos no banco.

---

## Scripts de teste

A pasta `script` contém arquivos PowerShell utilizados para testar as rotas da aplicação.

Exemplo:

```powershell
.\script\listar-produtos.ps1
```

Os scripts permitem testar as operações de cadastro, listagem, atualização e exclusão.

---

## Autor

Alexssandro de Andrade