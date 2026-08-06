$produtos = Invoke-RestMethod `
    -Uri "http://localhost:3000/produtos" `
    -Method GET

$produtos | Format-Table id, nome, preco -AutoSize