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
        window.location.href = "game.html"();
    } else {
        alert("Invalid username! Letters and numbers only.");
    }
});



