$body = @{
    quantidade = 10
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:3000/entrada" `
    -ContentType "application/json" `
    -Body $body