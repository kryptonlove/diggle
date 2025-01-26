let userWallet;

const connectWalletBtn = document.getElementById("connectWallet");
const playGameBtn = document.getElementById("playGame");
const gameCanvas = document.getElementById("gameCanvas");

// Кошелёк
connectWalletBtn.addEventListener("click", async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userWallet = accounts[0];
      alert(`Connected: ${userWallet}`);
      connectWalletBtn.style.display = "none"; // Скрыть кнопку подключения
      playGameBtn.style.display = "inline-block"; // Показать кнопку Play
    } else {
      alert("No Ethereum wallet detected. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Error connecting wallet. Check console for details.");
  }
});

// Кнопка Play
playGameBtn.addEventListener("click", () => {
  playGameBtn.style.display = "none"; // Скрыть кнопку Play
  gameCanvas.style.display = "block"; // Показать канвас
  startGame(); // Запуск игры
});
