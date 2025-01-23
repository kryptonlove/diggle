const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Пример: отрисовка фона
function draw() {
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

draw();

// Подключение кошелька
document.getElementById('connectWallet').addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log('Connected wallet:', address);
      alert('Wallet connected: ' + address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  } else {
    alert('No wallet found. Please install MetaMask.');
  }
});
