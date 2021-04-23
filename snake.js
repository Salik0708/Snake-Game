const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

const borderColor = "black";
const backgroundColor = "white";

const snakeBorderColor = "darkgreen";
const snakeBackgroundColor = "lightgreen";

const foodBorderColor = "darkred";
const foodBackgroundColor = "red";

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let score = 0;

let dx = 10;
let dy = 0;

ctx.fillStyle = backgroundColor;
ctx.strokeStyle = borderColor;

ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

createFood();
main();

function main() {
  if (didGameEnd()) return;
  setTimeout(() => {
    clearCanvas();
    drawFood();
    advancedSnake();
    drawSnake();
    //main call again
    main();
  }, 60);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = snakeBackgroundColor;
  ctx.strokeStyle = snakeBorderColor;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function advancedSnake() {
  const snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(snakeHead);
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, gameCanvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);
  snake.forEach((part) => {
    const isFoodOnSnake = part.x === foodX && part.y === foodY;
    if (isFoodOnSnake) {
      createFood();
    }
  });
}

function drawFood() {
  ctx.fillStyle = foodBackgroundColor;
  ctx.strokeStyle = foodBorderColor;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }

  const hitLeftWall = snake[0].x === 0;
  const hitRightWall = snake[0].x === gameCanvas.width - 10;
  const hitUpperWall = snake[0].y === 0;
  const hitDownWall = snake[0].y === gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitUpperWall || hitDownWall;
}

function changeDirection(e) {
  const leftkey = 37;
  const rightKey = 39;
  const upKey = 38;
  const downKey = 40;
  const keyPressed = e.keyCode;
  const goingLeft = dx === -10;
  const goingRight = dx === 10;
  const goingUp = dy === -10;
  const goingDown = dy === 10;

  if (leftkey === keyPressed && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (rightKey === keyPressed && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (upKey === keyPressed && !goingDown) {
    dy = -10;
    dx = 0;
  }
  if (downKey === keyPressed && !goingUp) {
    dy = 10;
    dx = 0;
  }
}

document.addEventListener("keydown", changeDirection);
