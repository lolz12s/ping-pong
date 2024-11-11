// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Paddle settings
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = canvas.width / 2 - paddleWidth / 2; // Center the paddle at start

// Ball settings
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 4,
  dy: 4,
};

// Score
let score = 0;

// Draw Paddle
function drawPaddle() {
  ctx.fillStyle = "#FFF";
  ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

// Draw Ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

// Draw Score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#FFF";
  ctx.fillText(`Score: ${score}`, 20, 30);
}

// Reset Ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx; // Change direction
  ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1); // Randomize vertical direction
}

// Update Game State
function update() {
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with left and right walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx *= -1;
  }

  // Ball collision with top wall
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Ball collision with paddle
  if (
    ball.y + ball.radius > canvas.height - paddleHeight - 10 &&
    ball.x > paddleX &&
    ball.x < paddleX + paddleWidth
  ) {
    ball.dy *= -1;
    score++; // Increase score when ball hits paddle
  }

  // Ball goes off the bottom side (Game Over)
  if (ball.y - ball.radius > canvas.height) {
    alert(`Game Over! Your score: ${score}`);
    score = 0; // Reset score
    resetBall(); // Reset ball position
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawScore();
}

// Game Loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Mouse movement to control the paddle
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  paddleX = e.clientX - rect.left - paddleWidth / 2;

  // Keep the paddle within the canvas bounds
  if (paddleX < 0) paddleX = 0;
  if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
});

// Start Game
gameLoop();
