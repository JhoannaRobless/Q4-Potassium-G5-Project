Code
javascript
135 lines

//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;

// Cookie functions
function setCookie(name, value, days = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 86400000));
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        const [key, val] = c.trim().split('=');
        if (key === name) return val;
    }
    return null;
}

// On window load
window.onload = () => {
    const username = getCookie("snakeUser ");
    const highscore = getCookie("snakeHighScore") || 0;

    if (username) {
        document.getElementById("greeting").textContent = `Welcome back, ${username}! 🐍`;
    }

    document.getElementById("highscore").textContent = highscore;
};

// Username form submission
document.getElementById("usernameForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    if (/^[A-Za-z0-9]+$/.test(username)) {
        setCookie("snakeUser ", username);
        setCookie("snakeHighScore", 0); // reset or init
        alert(`Hello, ${username}! You're ready to play.`);
        location.reload();
    } else {
        alert("Invalid username! Letters and numbers only.");
    }
});

// Game initialization
window.onsubmit = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    let difficulty = document.getElementById("difficulty").value;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    let gameSpeed = difficulty === 'easy' ? 1000/10 : difficulty === 'medium' ? 1000/15 : 1000/20;
   
    setInterval(update, gameSpeed); 
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        updateScore(); // Update score when food is eaten
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over conditions
    if (snakeX < 0 || snakeX >= rows * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
        updateHighScore();
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            updateHighScore();
            return;
        }
    }
	
	function changeDirection(e) {
    if (e.code == "W" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "S" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "A" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "D" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function updateScore() {
    let score = snakeBody.length;
    document.getElementById("score").textContent = score;
}
}

