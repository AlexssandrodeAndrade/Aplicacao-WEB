$body = @{
    nome = "Mouse Gamer"
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:3000/produto" `
    -ContentType "application/json" `
    -Body $body