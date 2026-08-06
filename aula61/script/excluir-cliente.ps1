$clienteId = 1

Invoke-RestMethod `
    -Uri "http://localhost:3000/clientes/$clienteId" `
    -Method DELETE
