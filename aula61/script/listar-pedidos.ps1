$pedidos = Invoke-RestMethod `
    -Uri "http://localhost:3000/pedidos" `
    -Method GET

$pedidos | ConvertTo-Json -Depth 10
