# Exercício 01 - API de Carros

Projeto desenvolvido para a aula 56 do curso de Aplicações Web.

O objetivo do exercício é criar uma API em Node.js com PostgreSQL para cadastrar e consultar carros em um banco de dados.

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- cors
- dotenv
- Thunder Client

## Funcionalidades

- Consultar carros cadastrados
- Cadastrar novos carros no banco de dados

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
└── database/
    ├── tabelas.sql
    └── inserts.sql