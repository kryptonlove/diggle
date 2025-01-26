let userWallet;

// Кнопка "Connect Wallet"
const connectWalletBtn = document.getElementById("connectWallet");

// Обработчик нажатия на кнопку
connectWalletBtn.addEventListener("click", async () => {
  try {
    // Проверяем наличие Ethereum провайдера (например, MetaMask)
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask detected!");

      // Запрашиваем доступ к кошельку
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userWallet = accounts[0]; // Получаем адрес подключённого кошелька
      alert(`Connected: ${userWallet}`);
      connectWalletBtn.innerText = "Wallet Connected"; // Обновляем текст кнопки
    } else {
      alert("No Ethereum wallet detected. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Error connecting wallet. Check console for details.");
  }
});
