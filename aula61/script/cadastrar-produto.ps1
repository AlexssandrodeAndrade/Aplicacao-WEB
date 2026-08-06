$produtos = @(
    @{
        nome  = "Teclado"
        preco = 150.90
    },
    @{
        nome  = "Mouse"
        preco = 89.90
    },
    @{
        nome  = "Monitor"
        preco = 899.90
    },
    @{
        nome  = "Headset"
        preco = 219.90
    },
    @{
        nome  = "Webcam"
        preco = 179.90
    }
)

foreach ($produto in $produtos) {
    $body = $produto | ConvertTo-Json

    $resposta = Invoke-RestMethod `
        -Uri "http://localhost:3000/produtos" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body

    Write-Host "$($produto.nome): $($resposta.mensagem)"
}