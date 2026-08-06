$clienteId = 1

$cliente = @{
    nome  = "Ana Souza Atualizada"
    email = "ana.atualizada@email.com"
}

$body = $cliente | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/clientes/$clienteId" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
