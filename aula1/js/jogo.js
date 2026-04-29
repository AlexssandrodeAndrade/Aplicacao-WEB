const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tamanho = 20;

// cobrinha (array de partes)
let snake = [
    { x: 5, y: 5 }
];

// direção inicial
let direcao = { x: 1, y: 0 };

// comida
let comida = gerarComida();

// controle de tempo (velocidade)
let ultimoTempo = 0;
const velocidade = 150; // ms

// teclado
document.addEventListener("keydown", (e) => {
    const tecla = e.key.toLowerCase();

    if ((tecla === "arrowup" || tecla === "w") && direcao.y !== 1) {
        direcao = { x: 0, y: -1 };
    }
    if ((tecla === "arrowdown" || tecla === "s") && direcao.y !== -1) {
        direcao = { x: 0, y: 1 };
    }
    if ((tecla === "arrowleft" || tecla === "a") && direcao.x !== 1) {
        direcao = { x: -1, y: 0 };
    }
    if ((tecla === "arrowright" || tecla === "d") && direcao.x !== -1) {
        direcao = { x: 1, y: 0 };
    }
});

// gerar comida
function gerarComida() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tamanho)),
        y: Math.floor(Math.random() * (canvas.height / tamanho))
    };
}

// atualizar jogo
function atualizar() {
    const cabeca = {
        x: snake[0].x + direcao.x,
        y: snake[0].y + direcao.y
    };

    const maxX = canvas.width / tamanho;
    const maxY = canvas.height / tamanho;

    // 🌀 efeito túnel (wrap around)
    if (cabeca.x < 0) cabeca.x = maxX - 1;
    if (cabeca.x >= maxX) cabeca.x = 0;

    if (cabeca.y < 0) cabeca.y = maxY - 1;
    if (cabeca.y >= maxY) cabeca.y = 0;

    // colisão com o próprio corpo
    for (let parte of snake) {
        if (parte.x === cabeca.x && parte.y === cabeca.y) {
            return gameOver();
        }
    }

    snake.unshift(cabeca);

    // comida
    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        comida = gerarComida();
    } else {
        snake.pop();
    }
}
// desenhar
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cobra
    ctx.fillStyle = "green";
    for (let parte of snake) {
        ctx.fillRect(parte.x * tamanho, parte.y * tamanho, tamanho, tamanho);
    }

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x * tamanho, comida.y * tamanho, tamanho, tamanho);
}

// game over
function gameOver() {
    alert("Game Over 💀");
    snake = [{ x: 5, y: 5 }];
    direcao = { x: 1, y: 0 };
    comida = gerarComida();
}

// loop principal com controle de tempo
function loop(tempoAtual) {
    if (tempoAtual - ultimoTempo > velocidade) {
        atualizar();
        desenhar();
        ultimoTempo = tempoAtual;
    }

    requestAnimationFrame(loop);
}

loop();