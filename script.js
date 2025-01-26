// Элементы HTML
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const statusDiv = document.getElementById("status");
const connectWalletBtn = document.getElementById("connectWallet");
const gameoverDiv = document.getElementById("gameover");
const buyLifeBtn = document.getElementById("buyLife");

// Игровые переменные
let level = 1;
let lives = 3;
let score = 0;
let sequence = [];
let playerSequence = [];
let isPlayerTurn = false;

// Отображение текущего статуса
function updateStatus() {
  statusDiv.innerText = `Level: ${level} | Lives: ${lives} | Score: ${score}`;
}

// Показываем Game Over экран
function showGameOver() {
  gameoverDiv.style.display = "block";
}

// Скрываем Game Over экран
function hideGameOver() {
  gameoverDiv.style.display = "none";
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

// Показываем последовательность
function flashSequence() {
  isPlayerTurn = false;
  let i = 0;

  const interval = setInterval(() => {
    if (i >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        drawSquares();
        isPlayerTurn = true;
        updateStatus();
      }, 500);
      return;
    }

    drawSquares(sequence[i]);
    i++;
  }, 1000);
}

// Генерируем случайное число
function getRandomSquare() {
  return Math.floor(Math.random() * 3);
}

// Начинаем раунд
function startRound() {
  hideGameOver();
  playerSequence = [];
  sequence.push(getRandomSquare());
  flashSequence();
}

// Проверяем последовательность игрока
function checkPlayerSequence() {
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      lives--;
      if (lives === 0) {
        showGameOver();
      } else {
        alert("Wrong sequence! Try again.");
        startRound();
      }
      return;
    }
  }

  if (playerSequence.length === sequence.length) {
    score += 10;
    level++;
    startRound();
  }
}

// Обрабатываем клики на канвасе
canvas.addEventListener("click", (e) => {
  if (!isPlayerTurn) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x >= 50 && x <= 150 && y >= 50 && y <= 150) {
    playerSequence.push(0);
  } else if (x >= 150 && x <= 250 && y >= 50 && y <= 150) {
    playerSequence.push(1);
  } else if (x >= 250 && x <= 350 && y >= 50 && y <= 150) {
    playerSequence.push(2);
  }

  checkPlayerSequence();
});

// Подключение кошелька
connectWalletBtn.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      alert(`Connected: ${accounts[0]}`);
    } catch (error) {
      console.error("User rejected connection:", error);
    }
  } else {
    alert("No Ethereum provider detected. Install MetaMask!");
  }
});

// Покупка жизни
buyLifeBtn.addEventListener("click", () => {
  alert("Payment system not implemented yet!");
  lives++;
  updateStatus();
  hideGameOver();
  startRound();
});

// Запуск игры
updateStatus();
drawSquares();
startRound();
