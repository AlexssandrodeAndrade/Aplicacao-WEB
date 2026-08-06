$clientes = @(
    @{
        nome  = "Ana Souza"
        email = "ana.souza@email.com"
    },
    @{
        nome  = "Bruno Silva"
        email = "bruno.silva@email.com"
    },
    @{
        nome  = "Carla Oliveira"
        email = "carla.oliveira@email.com"
    }
)

foreach ($cliente in $clientes) {
    $body = $cliente | ConvertTo-Json

    $resposta = Invoke-RestMethod `
        -Uri "http://localhost:3000/clientes" `
        -Method POST `
        -ContentType "application/json" `
        -Body $body

    Write-Host "$($cliente.nome): $($resposta.mensagem)"
}
