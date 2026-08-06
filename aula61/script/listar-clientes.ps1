$clientes = Invoke-RestMethod `
    -Uri "http://localhost:3000/clientes" `
    -Method GET

$clientes | Format-Table id, nome, email -AutoSize
