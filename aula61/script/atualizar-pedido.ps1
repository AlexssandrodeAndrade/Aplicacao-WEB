$pedidoId = 1

$pedido = @{
    clienteId = 1
    produtos  = @(2, 3)
}

$body = $pedido | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/pedidos/$pedidoId" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
