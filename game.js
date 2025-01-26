const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Параметры игры
let level = 1;
let lives = 3;
let score = 0;
let sequence = [];
let playerSequence = [];
let isPlayerTurn = false;

// Квадраты
const squares = [
  { x: 50, y: 50, color: "white" },
  { x: 250, y: 50, color: "white" },
  { x: 50, y: 250, color: "white" },
  { x: 250, y: 250, color: "white" },
];

// Функция отрисовки квадратов
function drawSquares() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  squares.forEach((square) => {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, 100, 100);
  });
}

// Генерация последовательности
function generateSequence() {
  sequence.push(Math.floor(Math.random() * squares.length));
}

// Проигрывание последовательности
async function playSequence() {
  isPlayerTurn = false;
  for (let i = 0; i < sequence.length; i++) {
    const squareIndex = sequence[i];
    squares[squareIndex].color = "yellow";
    drawSquares();
    await new Promise((resolve) => setTimeout(resolve, 800));
    squares[squareIndex].color = "white";
    drawSquares();
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  isPlayerTurn = true;
}

// Проверка последовательности игрока
function checkPlayerSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      lives--;
      alert("Wrong sequence! Try again.");
      if (lives === 0) {
        gameOver();
      }
      return resetRound();
    }
  }
  if (playerSequence.length === sequence.length) {
    score += 10;
    level++;
    nextLevel();
  }
}

// Переход на следующий уровень
function nextLevel() {
  playerSequence = [];
  generateSequence();
  playSequence();
}

// Сброс раунда
function resetRound() {
  playerSequence = [];
  playSequence();
}

// Конец игры
function gameOver() {
  alert("Game Over! Buy more lives to continue.");
  document.getElementById("gameover").style.display = "block";
}

// Начало игры
function startGame() {
  level = 1;
  lives = 3;
  score = 0;
  sequence = [];
  playerSequence = [];
  generateSequence();
  playSequence();
}

// Обработчик клика на квадраты
canvas.addEventListener("click", (e) => {
  if (!isPlayerTurn) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  squares.forEach((square, index) => {
    if (x >= square.x && x <= square.x + 100 && y >= square.y && y <= square.y + 100) {
      playerSequence.push(index);
      square.color = "green";
      drawSquares();
      setTimeout(() => {
        square.color = "white";
        drawSquares();
        checkPlayerSequence();
      }, 500);
    }
  });
});
