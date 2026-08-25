# 🍔 Smart Ordering System

[🇧🇷 Leia em Português](./README.pt.md)

Web application developed as the final project of the **Web Applications course — Entra21 2026**, with the goal of being presented at the **Entra21 Talent Showcase**.

The project focuses on digitizing the complete ordering process of small food businesses, connecting customers, tables, kitchen staff, order delivery, payment, and checkout in a single platform.

---

## 📌 About the Project

Many small snack bars, burger restaurants, cafés, bars, and restaurants still use paper tickets or disconnected systems to manage their orders.

This can cause:

- incorrect orders;
- lost order tickets;
- communication failures between attendants and kitchen staff;
- delays in food preparation;
- difficulty tracking order status;
- duplicated work;
- lack of integration between the kitchen and checkout.

The purpose of this project is to provide a simple web platform capable of managing the **entire order lifecycle**.

```text
Table
  ↓
Order
  ↓
Kitchen
  ↓
Preparation
  ↓
Ready
  ↓
Delivery
  ↓
Payment
  ↓
Completed
```

---

## 🎯 Target Audience

The initial target audience consists of small food businesses such as:

- snack bars;
- burger restaurants;
- cafés;
- bars;
- small restaurants;
- businesses that still use paper order tickets;
- establishments looking for an affordable digital ordering solution.

---

## 💡 Proposed Solution

The platform centralizes the entire ordering process.

Customers or attendants can create an order associated with a table.

The order is automatically sent to the kitchen, where employees can follow its details and update its status.

Example:

```text
NEW
 ↓
RECEIVED BY KITCHEN
 ↓
IN PREPARATION
 ↓
READY
 ↓
DELIVERED
 ↓
WAITING FOR PAYMENT
 ↓
PAID
 ↓
COMPLETED
```

This allows everyone involved in the process to work with the same information in real time.

---

## 📱 Customer Ordering

A future version of the system will allow each table to have its own QR Code.

The customer will be able to:

1. scan the table QR Code;
2. access the digital menu;
3. select products;
4. create the order;
5. send the order directly to the kitchen;
6. track the order status;
7. make the payment through the platform.

Orders can also be created by restaurant employees.

---

## 👨‍🍳 Kitchen Dashboard

The kitchen will have its own interface to manage incoming orders.

Kitchen staff will be able to view:

- order number;
- table number;
- order time;
- products;
- quantities;
- customer notes;
- waiting time;
- current status.

The kitchen can update the order status as the preparation progresses.

---

## 💳 Payments

The project is planned to support payments directly through the platform.

Possible payment methods include:

- PIX;
- credit card;
- debit card;
- other methods supported by the payment provider.

Once the payment is confirmed, the order can automatically be marked as paid and completed.

---

## 🚀 MVP

The first version will focus on validating the main business workflow.

### MVP Features

- [ ] Product registration
- [ ] Table registration
- [ ] Order creation
- [ ] Add products to orders
- [ ] Associate orders with tables
- [ ] Order listing
- [ ] Kitchen dashboard
- [ ] Order status management
- [ ] Ready order identification
- [ ] Order delivery
- [ ] Payment workflow
- [ ] Order completion

The main goal of the MVP is to validate the following flow:

```text
Table → Order → Kitchen → Preparation → Ready → Delivery → Payment → Completed
```

---

## 💰 Business Model

The project is designed to evolve into a **Software as a Service (SaaS)** platform.

The application will run in the cloud, and the development company will be responsible for:

- hosting;
- infrastructure;
- system updates;
- maintenance;
- backups;
- security;
- technical support.

### Revenue Model

Instead of charging a high fixed monthly subscription, the proposed business model is based on the amount processed through the platform.

> **The platform charges 1% of the total sales processed through the application every 30 days.**

Only transactions processed through the platform are considered.

### Example

If a business processes:

```text
R$ 20,000.00
```

through the application during 30 days:

```text
R$ 20,000.00 × 1% = R$ 200.00
```

The platform fee for that period would be:

**R$ 200.00**

This model makes the solution more accessible to small businesses:

```text
LOWER SALES  → LOWER COST
HIGHER SALES → HIGHER COST
```

The cost of the platform grows proportionally with the customer's usage.

> Payment provider transaction fees are independent of the platform's 1% service fee.

---

## ⭐ Project Differentiator

The main purpose of the application is not simply to register orders.

The differentiator is managing the **complete lifecycle of an order** within the same platform.

```text
CUSTOMER
   ↓
TABLE
   ↓
ORDER
   ↓
KITCHEN
   ↓
PREPARATION
   ↓
DELIVERY
   ↓
PAYMENT
   ↓
MANAGEMENT
```

This reduces manual communication and provides better visibility of the operation.

---

## 🛠️ Technologies

The project is being developed using technologies covered and practiced during the Entra21 Web Applications course.

### Backend

- Node.js
- Express.js
- JavaScript
- REST API
- Object-Oriented Programming
- MVC architecture

### Database

- PostgreSQL
- SQL
- Relational data modeling

### Frontend

- HTML
- CSS
- JavaScript
- Responsive Web Design

The frontend architecture may evolve as the MVP develops.

### Development

- Git
- GitHub
- npm
- VS Code

---

## 🏗️ Architecture

The backend follows an MVC-oriented structure.

```text
Routes
   ↓
Controllers
   ↓
Business Rules
   ↓
Models
   ↓
PostgreSQL
```

As the project evolves, additional service and validation layers may be introduced to keep responsibilities separated.

---

## 🗃️ Main Entities

The planned data model includes entities such as:

```text
Company
User
Table
Customer
Product
Category
Order
OrderItem
OrderStatus
Payment
```

---

## ☁️ Future SaaS Architecture

The long-term goal is to support multiple businesses on the same platform while keeping their information isolated.

```text
PLATFORM
│
├── Business A
│   ├── Users
│   ├── Tables
│   └── Orders
│
├── Business B
│   ├── Users
│   ├── Tables
│   └── Orders
│
└── Business C
    ├── Users
    ├── Tables
    └── Orders
```

---

## 🗺️ Roadmap

### Phase 1 — Core MVP

- Products
- Tables
- Orders
- Order items
- Kitchen dashboard
- Order status
- Delivery
- Order completion

### Phase 2 — Customer Experience

- QR Code per table
- Digital menu
- Mobile ordering
- Real-time order tracking

### Phase 3 — Payments

- PIX integration
- Card payments
- Payment confirmation
- Transaction history
- Platform fee calculation

### Phase 4 — Management

- Dashboard
- Sales reports
- Order history
- Business indicators
- Checkout management

### Phase 5 — SaaS Platform

- Multi-company support
- Customer onboarding
- Platform administration
- Billing management
- Monitoring and infrastructure

---

## 🔮 Future Features

Possible future improvements include:

- inventory management;
- digital menu;
- QR Code ordering;
- bill splitting;
- customer loyalty program;
- coupons and promotions;
- thermal printer integration;
- fiscal integrations;
- delivery platform integrations;
- advanced reports;
- management dashboards.

---

## 🎓 Entra21 2026

This project is being developed as part of the **Web Applications course of Entra21 2026**.

It brings together concepts studied throughout the course, including:

- programming logic;
- JavaScript;
- HTML and CSS;
- Git and GitHub;
- relational databases;
- SQL;
- Object-Oriented Programming;
- Node.js;
- Express.js;
- REST APIs;
- software architecture;
- agile development;
- deployment.

The project is also intended to be presented at the **Entra21 Talent Showcase 2026**.

---

## 👥 Team

Project developed by students of the **Entra21 2026 — Web Applications** course.

---

## 📄 Status

🚧 **Project under development — MVP stage**

The current version serves as the technical foundation for the final project and will evolve during the development of the Entra21 Talent Showcase project.