# 🍔 Sistema Web de Pedidos para Lanchonetes

[🇺🇸 Read in English](./README.md)

Aplicação web desenvolvida como projeto final do curso de **Aplicações Web — Entra21 2026**, com o objetivo de ser apresentada na **Mostra de Talentos do Entra21**.

O projeto busca digitalizar todo o processo de atendimento de pequenos estabelecimentos de alimentação, conectando cliente, mesa, cozinha, entrega, pagamento e caixa em uma única plataforma.

---

## 📌 Sobre o Projeto

Muitas pequenas lanchonetes, hamburguerias, cafeterias, bares e restaurantes ainda utilizam comandas em papel ou sistemas que não possuem integração entre as diferentes etapas do atendimento.

Isso pode causar:

- pedidos registrados incorretamente;
- perda de comandas;
- falhas de comunicação entre atendimento e cozinha;
- demora na preparação;
- dificuldade para acompanhar o status dos pedidos;
- retrabalho;
- falta de integração entre cozinha e caixa.

O objetivo do projeto é disponibilizar uma plataforma web capaz de administrar **todo o ciclo de vida de um pedido**.

```text
Mesa
  ↓
Pedido
  ↓
Cozinha
  ↓
Preparação
  ↓
Pronto
  ↓
Entrega
  ↓
Pagamento
  ↓
Finalizado
```

---

## 🎯 Público-Alvo

O público-alvo inicial é composto por pequenos estabelecimentos de alimentação, como:

- lanchonetes;
- hamburguerias;
- cafeterias;
- bares;
- pequenos restaurantes;
- estabelecimentos que ainda utilizam comandas em papel;
- negócios que procuram uma solução digital de baixo custo.

---

## 💡 Solução Proposta

A plataforma centraliza todo o processo de realização e acompanhamento dos pedidos.

O cliente ou funcionário poderá criar um pedido associado a uma mesa.

O pedido será disponibilizado automaticamente para a cozinha, onde os funcionários poderão visualizar suas informações e alterar seu status.

Exemplo:

```text
NOVO
 ↓
RECEBIDO PELA COZINHA
 ↓
EM PREPARAÇÃO
 ↓
PRONTO
 ↓
ENTREGUE
 ↓
AGUARDANDO PAGAMENTO
 ↓
PAGO
 ↓
FINALIZADO
```

Dessa maneira, todos os envolvidos trabalham com as mesmas informações durante todo o atendimento.

---

## 📱 Pedido pelo Cliente

Em uma futura versão, cada mesa poderá possuir um QR Code próprio.

O cliente poderá:

1. ler o QR Code da mesa;
2. acessar o cardápio digital;
3. selecionar os produtos;
4. realizar o pedido;
5. enviar o pedido diretamente para a cozinha;
6. acompanhar seu status;
7. realizar o pagamento pela plataforma.

Funcionários do estabelecimento também poderão registrar pedidos através do sistema.

---

## 👨‍🍳 Tela da Cozinha

A cozinha terá uma interface específica para acompanhar os pedidos recebidos.

Os funcionários poderão visualizar:

- número do pedido;
- número da mesa;
- horário;
- produtos;
- quantidades;
- observações;
- tempo de espera;
- status atual.

Durante a preparação, a cozinha poderá atualizar o status do pedido.

---

## 💳 Pagamentos

O projeto prevê futuramente a realização do pagamento diretamente pela plataforma.

Entre os meios possíveis estão:

- PIX;
- cartão de crédito;
- cartão de débito;
- outros meios suportados pelo provedor de pagamentos.

Após a confirmação do pagamento, o sistema poderá atualizar automaticamente o pedido para pago e posteriormente finalizado.

---

## 🚀 MVP

A primeira versão será focada na validação do fluxo principal do negócio.

### Funcionalidades do MVP

- [ ] Cadastro de produtos
- [ ] Cadastro de mesas
- [ ] Criação de pedidos
- [ ] Inclusão de produtos no pedido
- [ ] Associação do pedido com uma mesa
- [ ] Listagem dos pedidos
- [ ] Tela da cozinha
- [ ] Gerenciamento do status
- [ ] Identificação de pedidos prontos
- [ ] Entrega do pedido
- [ ] Fluxo de pagamento
- [ ] Finalização do pedido

O principal objetivo do MVP será validar o seguinte processo:

```text
Mesa → Pedido → Cozinha → Preparação → Pronto → Entrega → Pagamento → Finalizado
```

---

## 💰 Modelo de Negócio

O projeto foi pensado para futuramente funcionar como uma plataforma **Software as a Service (SaaS)**.

A aplicação será hospedada na nuvem e a empresa desenvolvedora ficará responsável por:

- hospedagem;
- infraestrutura;
- atualizações;
- manutenção;
- backups;
- segurança;
- suporte técnico.

### Modelo de Receita

Em vez de cobrar uma mensalidade fixa elevada, o modelo de negócio proposto será baseado no volume financeiro processado pela plataforma.

> **Será cobrado 1% sobre o total das vendas realizadas através do aplicativo em um período de 30 dias.**

Somente as transações realizadas através da plataforma serão consideradas nesse cálculo.

### Exemplo

Caso uma lanchonete movimente:

```text
R$ 20.000,00
```

através da plataforma durante 30 dias:

```text
R$ 20.000,00 × 1% = R$ 200,00
```

O custo da plataforma naquele período será:

**R$ 200,00**

Esse modelo busca tornar o sistema mais acessível para pequenos estabelecimentos:

```text
FATURA MENOS → PAGA MENOS
FATURA MAIS  → PAGA MAIS
```

Assim, o custo acompanha proporcionalmente a utilização da plataforma.

> As eventuais tarifas cobradas pelo provedor responsável pelo processamento dos pagamentos são independentes da taxa de 1% da plataforma.

---

## ⭐ Diferencial do Projeto

O objetivo do projeto não é simplesmente cadastrar pedidos.

O principal diferencial está em acompanhar **todo o ciclo de vida do pedido dentro da mesma plataforma**.

```text
CLIENTE
   ↓
MESA
   ↓
PEDIDO
   ↓
COZINHA
   ↓
PREPARAÇÃO
   ↓
ENTREGA
   ↓
PAGAMENTO
   ↓
GESTÃO
```

Isso reduz a necessidade de comunicação manual e melhora a visibilidade do processo operacional.

---

## 🛠️ Tecnologias

O projeto está sendo desenvolvido utilizando tecnologias estudadas e praticadas durante o curso de Aplicações Web do Entra21.

### Backend

- Node.js
- Express.js
- JavaScript
- API REST
- Programação Orientada a Objetos
- Arquitetura MVC

### Banco de Dados

- PostgreSQL
- SQL
- Modelagem de dados relacionais

### Frontend

- HTML
- CSS
- JavaScript
- Design responsivo

A arquitetura do frontend poderá evoluir conforme o desenvolvimento do MVP.

### Desenvolvimento

- Git
- GitHub
- npm
- VS Code

---

## 🏗️ Arquitetura

O backend utiliza uma estrutura orientada ao padrão MVC.

```text
Routes
   ↓
Controllers
   ↓
Regras de Negócio
   ↓
Models
   ↓
PostgreSQL
```

Conforme o projeto evoluir, poderão ser adicionadas camadas específicas para serviços e validações, mantendo as responsabilidades separadas.

---

## 🗃️ Principais Entidades

A modelagem prevista inclui entidades como:

```text
Empresa
Usuário
Mesa
Cliente
Produto
Categoria
Pedido
ItemPedido
StatusPedido
Pagamento
```

---

## ☁️ Arquitetura SaaS Futura

A visão futura é permitir que vários estabelecimentos utilizem a mesma plataforma mantendo seus dados separados.

```text
PLATAFORMA
│
├── Empresa A
│   ├── Usuários
│   ├── Mesas
│   └── Pedidos
│
├── Empresa B
│   ├── Usuários
│   ├── Mesas
│   └── Pedidos
│
└── Empresa C
    ├── Usuários
    ├── Mesas
    └── Pedidos
```

---

## 🗺️ Roadmap

### Fase 1 — MVP Principal

- Produtos
- Mesas
- Pedidos
- Itens do pedido
- Tela da cozinha
- Status dos pedidos
- Entrega
- Finalização

### Fase 2 — Experiência do Cliente

- QR Code por mesa
- Cardápio digital
- Pedido pelo celular
- Acompanhamento do pedido

### Fase 3 — Pagamentos

- Integração com PIX
- Cartões
- Confirmação de pagamento
- Histórico das transações
- Cálculo da taxa da plataforma

### Fase 4 — Gestão

- Dashboard
- Relatórios
- Histórico de vendas
- Indicadores
- Controle de caixa

### Fase 5 — Plataforma SaaS

- Multiempresa
- Cadastro de novos estabelecimentos
- Administração da plataforma
- Gestão de cobrança
- Monitoramento e infraestrutura

---

## 🔮 Funcionalidades Futuras

Entre possíveis evoluções estão:

- controle de estoque;
- cardápio digital;
- QR Code;
- divisão de conta;
- programa de fidelidade;
- promoções e cupons;
- integração com impressoras térmicas;
- integrações fiscais;
- integração com plataformas de delivery;
- relatórios avançados;
- dashboards gerenciais.

---

## 🎓 Entra21 2026

Este projeto está sendo desenvolvido como parte do curso de **Aplicações Web do Entra21 2026**.

Ele reúne conhecimentos estudados durante a formação, como:

- lógica de programação;
- JavaScript;
- HTML e CSS;
- Git e GitHub;
- banco de dados relacional;
- SQL;
- Programação Orientada a Objetos;
- Node.js;
- Express.js;
- APIs REST;
- arquitetura de software;
- metodologias ágeis;
- deploy.

O projeto também está sendo preparado para apresentação na **Mostra de Talentos do Entra21 2026**.

---

## 👥 Equipe

Projeto desenvolvido por alunos do curso de **Aplicações Web — Entra21 2026**.

---

## 📄 Status

🚧 **Projeto em desenvolvimento — fase de MVP**

A versão atual serve como base técnica para o trabalho final e será evoluída durante o desenvolvimento do projeto para a Mostra de Talentos do Entra21.