let userWallet;

const connectWalletBtn = document.getElementById("connectWallet");

connectWalletBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      userWallet = accounts[0];
      connectWalletBtn.textContent = "Wallet Connected!";
      console.log("Connected wallet:", userWallet);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  } else {
    alert("No wallet provider found! Install MetaMask or Coinbase Wallet.");
  }
});
