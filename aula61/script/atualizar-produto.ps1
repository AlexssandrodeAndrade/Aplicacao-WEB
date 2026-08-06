$produtoId = 1

$produto = @{
    nome  = "Teclado Mecânico"
    preco = 249.90
}

$body = $produto | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/produtos/$produtoId" `
    -Method PUT `
    -ContentType "application/json" `
    -Body $body
