const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let sequence = [];
let playerSequence = [];
let level = 1;
let lives = 3;
let score = 0;

function startGame() {
  resetGame();
  nextLevel();
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  lives = 3;
  score = 0;
  updateStatus();
}

function nextLevel() {
  sequence.push(Math.floor(Math.random() * 3)); // Добавляем новый шаг
  playerSequence = [];
  showSequence();
}

function showSequence() {
  let i = 0;
  const interval = setInterval(() => {
    if (i < sequence.length) {
      highlightSquare(sequence[i]);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => promptPlayer(), 500);
    }
  }, 1000);
}

function highlightSquare(index) {
  const colors = ["#FFD700", "#FFFFFF"]; // Yellow, White
  const positions = [50, 150, 250];

  // Показываем квадрат
  ctx.fillStyle = colors[0];
  ctx.fillRect(positions[index], 150, 80, 80);

  setTimeout(() => {
    ctx.fillStyle = colors[1];
    ctx.fillRect(positions[index], 150, 80, 80);
  }, 500);
}

function promptPlayer() {
  canvas.addEventListener("click", handlePlayerInput);
}

function handlePlayerInput(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;

  let clickedSquare;
  if (x >= 50 && x <= 130) clickedSquare = 0;
  else if (x >= 150 && x <= 230) clickedSquare = 1;
  else if (x >= 250 && x <= 330) clickedSquare = 2;

  if (clickedSquare !== undefined) {
    playerSequence.push(clickedSquare);
    checkPlayerInput(clickedSquare);
  }
}

function checkPlayerInput(clickedSquare) {
  const currentStep = playerSequence.length - 1;

  if (clickedSquare === sequence[currentStep]) {
    highlightSquare(clickedSquare, true); // Зеленый
    if (playerSequence.length === sequence.length) {
      score += 10;
      level++;
      updateStatus();
      canvas.removeEventListener("click", handlePlayerInput);
      setTimeout(() => nextLevel(), 1000);
    }
  } else {
    highlightSquare(clickedSquare, false); // Красный
    lives--;
    updateStatus();
    if (lives === 0) {
      gameOver();
    } else {
      canvas.removeEventListener("click", handlePlayerInput);
      setTimeout(() => showSequence(), 1000);
    }
  }
}

function gameOver() {
  alert("Game Over! Lives exhausted.");
}

function updateStatus() {
  document.getElementById("status").textContent = `Level: ${level} | Lives: ${lives} | Score: ${score}`;
}
