# Frontend Bootstrap 5 — Aula 61

## Estrutura

```text
public/
├── index.html
├── cliente.html
├── produto.html
├── pedido.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js
        ├── common.js
        ├── index.js
        ├── cliente.js
        ├── produto.js
        └── pedido.js
```

## Como instalar no projeto

1. Copie a pasta `public` para a raiz de `aula61`.

2. No `app.js`, importe `path`:

```js
const path = require('path');
```

3. Depois de `app.use(express.json());`, registre a pasta pública:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

4. Mantenha as rotas da API registradas depois do `express.static`:

```js
app.use(produtoRoutes);
app.use(clienteRoutes);
app.use(pedidoRoutes);
```

5. Inicie a aplicação:

```powershell
node app.js
```

6. Abra no navegador:

```text
http://localhost:3000
```

Não abra os arquivos HTML diretamente com `file://`. O frontend foi preparado para
usar as rotas do mesmo servidor Express.

## Rotas esperadas

```text
GET    /clientes
POST   /clientes
PUT    /clientes/:id
DELETE /clientes/:id

GET    /produtos
POST   /produtos
PUT    /produtos/:id
DELETE /produtos/:id

GET    /pedidos
POST   /pedidos
PUT    /pedidos/:id
DELETE /pedidos/:id
```

O pedido é enviado neste formato:

```json
{
    "clienteId": 1,
    "produtos": [1, 2]
}
```

## Bootstrap

O projeto usa Bootstrap 5.3.8 por CDN, sem processo de build.
