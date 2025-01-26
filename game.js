const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let level = 1;
let lives = 3;
let score = 0;
let sequence = [];
let playerSequence = [];
let isPlayerTurn = false;

// Обновление статуса
function updateStatus() {
  const statusDiv = document.getElementById("status");
  statusDiv.textContent = `Level: ${level} | Lives: ${lives} | Score: ${score}`;
}

// Рисуем квадраты
function drawSquares(highlightIndex = -1) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const squareSize = 100;
  const positions = [
    [50, 50],
    [150, 50],
    [250, 50],
  ];

  positions.forEach(([x, y], index) => {
    ctx.fillStyle = index === highlightIndex ? "yellow" : "gray";
    ctx.fillRect(x, y, squareSize, squareSize);
  });
}

// Показ последовательности
function flashSequence() {
  isPlayerTurn = false;
  let i = 0;

  const interval = setInterval(() => {
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        drawSquares();
        isPlayerTurn = true;
      }, 500);
      return;
    }

    drawSquares(sequence[i]);
    i++;
  }, 1000);
}

// Генерация новой последовательности
function nextSequence() {
  sequence.push(Math.floor(Math.random() * 3));
  flashSequence();
}

// Проверка ответа игрока
function checkPlayerInput() {
  if (playerSequence.length === sequence.length) {
    if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
      score += 10;
      level++;
      playerSequence = [];
      nextSequence();
    } else {
      lives--;
      if (lives <= 0) {
        showGameOver();
      } else {
        playerSequence = [];
        nextSequence();
      }
    }
    updateStatus();
  }
}

// Обработка кликов игрока
canvas.addEventListener("click", (event) => {
  if (!isPlayerTurn) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x >= 50 && x <= 150 && y >= 50 && y <= 150) playerSequence.push(0);
  if (x >= 150 && x <= 250 && y >= 50 && y <= 150) playerSequence.push(1);
  if (x >= 250 && x <= 350 && y >= 50 && y <= 150) playerSequence.push(2);

  checkPlayerInput();
});

// Игра начинается
updateStatus();
nextSequence();
