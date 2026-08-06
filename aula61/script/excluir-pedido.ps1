$pedidoId = 1

Invoke-RestMethod `
    -Uri "http://localhost:3000/pedidos/$pedidoId" `
    -Method DELETE
