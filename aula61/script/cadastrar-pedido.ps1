$pedido = @{
    clienteId = 1
    produtos  = @(1, 2)
}

$body = $pedido | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/pedidos" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
