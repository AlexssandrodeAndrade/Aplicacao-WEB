# Aula 63 - Autenticação de Usuários com JWT

Projeto desenvolvido durante o curso de Aplicações Web do SENAI.

A Aula 63 é uma evolução da Aula 62, adicionando autenticação de usuários com JWT e proteção das operações de consulta, alteração e exclusão de usuários.

## Tecnologias utilizadas

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- bcryptjs
- JSON Web Token (JWT)
- HTML
- CSS

## Funcionalidades

O projeto permite:

- cadastrar usuários;
- realizar login com e-mail e senha;
- gerar token JWT após autenticação;
- listar usuários autenticados;
- alterar usuários autenticados;
- excluir usuários autenticados;
- impedir que o usuário logado exclua a própria conta;
- proteger rotas utilizando middleware de autenticação;
- armazenar senhas criptografadas com bcrypt;
- criar e configurar o banco de dados através da própria aplicação.

## Autenticação

O login é realizado através da rota:

```http
POST /login
```

Após validar o e-mail e a senha, a API retorna um token JWT.

As rotas protegidas devem receber o token no cabeçalho:

```http
Authorization: Bearer TOKEN
```

O middleware verifica o token antes de permitir o acesso à operação solicitada.

## Rotas

### Autenticação

```http
POST /login
```

Rota pública utilizada para autenticar o usuário e gerar o token JWT.

### Usuários

```http
POST /usuarios
```

Rota pública utilizada para cadastrar um usuário.

O cadastro permanece público para permitir a criação do primeiro usuário quando o banco ainda está vazio.

```http
GET /usuarios
```

Rota protegida utilizada para listar os usuários.

```http
PUT /usuarios/:id
```

Rota protegida utilizada para alterar um usuário.

```http
DELETE /usuarios/:id
```

Rota protegida utilizada para excluir um usuário.

O sistema não permite que o usuário autenticado exclua a própria conta.

## Estrutura do projeto

```text
aula63/
├── controllers/
│   ├── AuthController.js
│   └── UsuarioController.js
│
├── database/
│   └── tables/
│       └── 01-usuarios.sql
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   └── Usuario.js
│
├── public/
│   ├── cadastro/
│   │   ├── cadastro.css
│   │   ├── cadastro.html
│   │   └── cadastro.js
│   │
│   ├── login/
│   │   ├── login.css
│   │   ├── login.html
│   │   └── login.js
│   │
│   ├── usuarios/
│   │   ├── usuarios.css
│   │   ├── usuarios.html
│   │   └── usuarios.js
│   │
│   ├── index.css
│   ├── index.html
│   ├── index.js
│   └── mensagem.js
│
├── routes/
│   ├── auth.routes.js
│   └── usuario.routes.js
│
├── scripts/
│   └── setup-database.js
│
├── .env.example
├── .gitignore
├── app.js
├── database.js
├── package.json
└── README.md
```

## Configuração

### 1. Instalar as dependências

Dentro da pasta `aula63`, execute:

```bash
npm install
```

### 2. Criar o arquivo `.env`

Copie o arquivo:

```text
.env.example
```

para:

```text
.env
```

Exemplo:

```env
PORT=3000

JWT_SECRET=troque_por_uma_chave_secreta

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=aula63
DB_PORT=5432
```

O arquivo `.env` não deve ser enviado ao GitHub.

### 3. Configurar o banco de dados

Execute:

```bash
npm run db:setup
```

Esse comando cria o banco configurado em `DB_NAME` e executa os arquivos SQL necessários.

Caso o banco já exista, o script informa essa situação e mantém os dados existentes.

Para apagar e recriar completamente o banco:

```bash
npm run db:reset
```

> Atenção: `db:reset` remove o banco existente e recria sua estrutura. Os dados armazenados serão perdidos.

### 4. Executar a aplicação

Modo desenvolvimento:

```bash
npm run dev
```

Ou execução normal:

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## Primeiro acesso

O projeto não depende de um usuário previamente cadastrado no banco.

Na página inicial:

1. escolha **Criar usuário**;
2. informe nome, e-mail e senha;
3. após o cadastro, faça login;
4. o sistema gera o token JWT;
5. o usuário é redirecionado para a área protegida de gerenciamento de usuários.

## Segurança implementada

As senhas não são armazenadas em texto puro.

Antes do cadastro ou alteração, a senha é processada com `bcryptjs`.

O login compara a senha informada com o hash armazenado utilizando `bcrypt.compare()`.

As rotas protegidas utilizam JWT através do header:

```http
Authorization: Bearer TOKEN
```

O sistema também impede a exclusão da própria conta do usuário autenticado.

## Scripts disponíveis

```bash
npm run dev
```

Executa o servidor utilizando o modo `--watch` do Node.js.

```bash
npm start
```

Executa normalmente o servidor.

```bash
npm run db:setup
```

Cria e configura o banco de dados.

```bash
npm run db:reset
```

Remove e recria o banco de dados.

## Objetivo do exercício

O exercício solicita adicionar as ações de alterar e excluir usuários garantindo que elas somente possam ser executadas por usuários autenticados.

Nesta implementação, as operações de consulta, alteração e exclusão são protegidas pelo middleware JWT.

Assim:

```text
POST /usuarios       → público
POST /login          → público

GET /usuarios        → autenticado
PUT /usuarios/:id    → autenticado
DELETE /usuarios/:id → autenticado
```

Além do solicitado, o projeto também possui interface para login, cadastro inicial, gerenciamento de sessão, mensagens globais e proteção contra a exclusão da própria conta.