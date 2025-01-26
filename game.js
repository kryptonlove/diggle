// Элементы
const connectWalletBtn = document.getElementById("connectWallet");
const playGameBtn = document.getElementById("playGame");
const gameCanvas = document.getElementById("gameCanvas");
const gameOverDiv = document.getElementById("gameOver");
const statusDiv = document.getElementById("status");
let ctx = gameCanvas.getContext("2d");

// Данные игры
let level = 1;
let lives = 3;
let score = 0;

// Подключение кошелька
connectWalletBtn.addEventListener("click", async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectWalletBtn.style.display = "none";
      playGameBtn.style.display = "inline-block";
      alert("Wallet connected!");
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  } catch (error) {
    alert("Error connecting wallet.");
  }
});

// Начало игры
playGameBtn.addEventListener("click", () => {
  playGameBtn.style.display = "none";
  gameCanvas.style.display = "block";
  startGame();
});

// Основной цикл игры
function startGame() {
  statusDiv.textContent = `Level: ${level} | Lives: ${lives} | Score: ${score}`;
  drawCanvas();
}

// Отрисовка канваса
function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  ctx.fillStyle = "white";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(50 + i * 120, 150, 100, 100);
  }
}
