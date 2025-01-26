let userWallet;

// Элементы HTML
const connectWalletBtn = document.getElementById("connectWallet");
const playGameBtn = document.getElementById("playGame");
const canvas = document.getElementById("gameCanvas");

// Подключение кошелька
connectWalletBtn.addEventListener("click", async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userWallet = accounts[0];
      alert(`Connected: ${userWallet}`);
      connectWalletBtn.style.display = "none"; // Скрываем кнопку "Connect Wallet"
      playGameBtn.style.display = "block"; // Показываем кнопку "Play"
    } else {
      alert("No Ethereum wallet detected. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Error connecting wallet. Check console for details.");
  }
});

// Запуск игры
playGameBtn.addEventListener("click", () => {
  canvas.style.display = "block"; // Показываем канвас
  playGameBtn.style.display = "none"; // Скрываем кнопку "Play"
  startGame(); // Вызываем логику игры
});
