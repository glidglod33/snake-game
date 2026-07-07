const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let dx = 0;
let dy = 0;

let snake = [
    { x: 10, y: 10 }
];

let food = { x: 5, y: 5 };

// Game loop
function drawGame() {
    updateSnakePosition();
    
    if (checkGameOver()) {
        alert("Game Over! Score: " + score);
        resetGame();
        return;
    }

    checkFoodCollision();
    drawBackground();
    drawFood();
    drawSnake();
    
    setTimeout(drawGame, 100);
}

function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function updateSnakePosition() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        scoreElement.innerHTML = score;
        
        // nieuw deel toe aan de slang
        snake.push({}); 
        
        // random eten naar een nieuwe plek
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
}

function checkGameOver() {
    // Muur botsing
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        return true;
    }
    
    // Zelf botsing
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.innerHTML = score;
    drawGame();
}

// Besturing
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case "ArrowDown":
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case "ArrowLeft":
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case "ArrowRight":
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

drawGame();

aaaaaaaaa