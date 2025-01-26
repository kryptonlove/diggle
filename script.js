const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const statusDiv = document.getElementById("status");
const gameoverDiv = document.getElementById("gameover");
const buyLifeBtn = document.getElementById("buyLife");

// Game variables
let level = 1;
let lives = 3;
let score = 0;
let sequence = [];
let playerSequence = [];
let isPlayerTurn = false;

// Utility functions
function updateStatus() {
  statusDiv.innerText = `Level: ${level} | Lives: ${lives} | Score: ${score}`;
}

function showGameOver() {
  gameoverDiv.style.display = "block";
}

function hideGameOver() {
  gameoverDiv.style.display = "none";
}

function drawSquares() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const squareSize = 100;
  const positions = [
    [50, 50],
    [150, 50],
    [250, 50],
  ];

  positions.forEach(([x, y], index) => {
    ctx.fillStyle = sequence.includes(index) ? "yellow" : "gray";
    ctx.fillRect(x, y, squareSize, squareSize);
  });
}

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

    drawSquares();
    ctx.fillStyle = "yellow";
    const squareSize = 100;
    const [x, y] = [
      50 + sequence[i] * 100,
      50,
    ];
    ctx.fillRect(x, y, squareSize, squareSize);

    i++;
  }, 800);
}

function nextLevel() {
  level++;
  score += 10;
  sequence.push(Math.floor(Math.random() * 3));
  flashSequence();
}

function loseLife() {
  lives--;
  if (lives <= 0) {
    showGameOver();
  } else {
    playerSequence = [];
    flashSequence();
  }
}

canvas.addEventListener("click", (e) => {
  if (!isPlayerTurn) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clickedIndex = Math.floor(x / 100) + Math.floor(y / 100) * 3;
  playerSequence.push(clickedIndex);

  if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
    loseLife();
    return;
  }

  if (playerSequence.length === sequence.length) {
    playerSequence = [];
    nextLevel();
  }
});

// Start game
updateStatus();
nextLevel();

// Ethereum provider check
async function checkEthereumProvider() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Ethereum provider detected");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected account:", accounts[0]);
    return accounts[0];
  } else {
    alert("No Ethereum provider found. Please install MetaMask or Coinbase Wallet.");
    return null;
  }
}

buyLifeBtn.addEventListener("click", async () => {
  const account = await checkEthereumProvider();
  if (!account) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tx = {
    to: "0xYourWalletAddressHere", // Replace with your wallet address
    value: ethers.utils.parseEther("1"),
  };

  try {
    const transaction = await signer.sendTransaction(tx);
    console.log("Transaction hash:", transaction.hash);

    // Restore one life after payment
    lives++;
    hideGameOver();
    updateStatus();
    flashSequence();
  } catch (error) {
    console.error("Payment failed:", error);
  }
});
