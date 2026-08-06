$body = @{
    quantidade = 5
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:3000/saida" `
    -ContentType "application/json" `
    -Body $body