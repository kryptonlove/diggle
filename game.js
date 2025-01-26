let provider, signer, usdcContract;
let userAddress = '';
const usdcAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // Адрес контракта USDC в сети Base
const myAddress = '0x097d5f575eCF546103fc9A5b1504872231cC5DAd'; // Твой адрес кошелька

async function setup() {
    // Создаем канвас
    const canvas = createCanvas(400, 400);
    canvas.parent('game-container');
    document.getElementById('game-container').style.display = 'none';

    // Слушаем кнопку старта игры
    document.getElementById('start-btn').addEventListener('click', startGame);

    // Подключаем MetaMask
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is available!');
        provider = new ethers.providers.Web3Provider(window.ethereum); // Правильное подключение
    } else {
        alert('Please install MetaMask');
    }

    // Инициализируем контракт USDC
    const usdcAbi = [
        "function transfer(address recipient, uint amount) public returns (bool)"
    ];
    usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);
}

async function startGame() {
    // Подключение MetaMask
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        signer = provider.getSigner();  // Получаем signer после подключения
        userAddress = await signer.getAddress();
        console.log('Connected address:', userAddress);
        gameStarted = true;
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('start-btn').style.display = 'none';
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function handleGameOver() {
    // Показываем окно для покупки жизни
    if (lives <= 0) {
        const buyButton = document.createElement('button');
        buyButton.innerText = 'Buy 1 Life for 1 USDC';
        buyButton.onclick = buyLife;
        document.body.appendChild(buyButton);
    }
}

async function buyLife() {
    try {
        const amount = ethers.parseUnits("1", 6); // 1 USDC (с учетом 6 десятичных знаков)
        const tx = await usdcContract.transfer(myAddress, amount);
        await tx.wait();
        console.log('Payment successful');
        lives = 1; // Возвращаем 1 жизнь игроку
        document.body.removeChild(document.querySelector('button')); // Убираем кнопку после покупки
    } catch (error) {
        console.error('Error making payment:', error);
    }
}
