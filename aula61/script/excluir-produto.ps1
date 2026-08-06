$produtoId = 1

Invoke-RestMethod `
    -Uri "http://localhost:3000/produtos/$produtoId" `
    -Method DELETE
