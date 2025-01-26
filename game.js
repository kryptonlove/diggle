let walletConnected = false;
let web3;
let userAccount;
let score = 0;
let lives = 2;
let correctCircleIndex = -1;
let gameStarted = false;

function setup() {
    console.log("Setup function started");
    createCanvas(400, 400);
    background(255);

    // Проверяем, что элементы загружены
    const connectBtn = document.getElementById('connect-btn');
    const playBtn = document.getElementById('play-btn');
    const buyLifeBtn = document.getElementById('buy-life');

    if (!connectBtn || !playBtn || !buyLifeBtn) {
        console.error("One or more buttons are missing in the HTML!");
    } else {
        console.log("Buttons found and ready.");
    }

    // Прячем стартовый экран сразу
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('gameover-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('play-btn').style.display = 'none';

    // Кнопка для подключения кошелька
    connectBtn.addEventListener('click', connectWallet);

    // Кнопка для начала игры
    playBtn.addEventListener('click', startGame);

    // Кнопка для покупки жизни
    buyLifeBtn.addEventListener('click', buyLife);
}

function draw() {
    if (gameStarted) {
        displayCircles();
        displayScoreAndLives();

        if (lives <= 0) {
            showGameOver();
        }
    }
}

function displayCircles() {
    let circleSize = 50;
    let spacing = 100;

    console.log("Displaying circles");

    // Рисуем три круга, один из которых зеленый
    for (let i = 0; i < 3; i++) {
        let x = spacing * (i + 1);
        let y = height / 2;
        let c = (i === correctCircleIndex) ? color(0, 255, 0) : color(255);
        fill(c);
        ellipse(x, y, circleSize);
    }
}

function displayScoreAndLives() {
    textSize(20);
    fill(0);
    text("Score: " + score, 10, 30);
    text("Lives: " + lives, width - 100, 30);
}

function mousePressed() {
    if (gameStarted) {
        checkCircleHit();
    }
}

function checkCircleHit() {
    let circleSize = 50;
    let spacing = 100;

    console.log("Checking circle hit");

    for (let i = 0; i < 3; i++) {
        let x = spacing * (i + 1);
        let y = height / 2;

        // Проверяем, был ли кликнут правильный круг
        if (dist(mouseX, mouseY, x, y) < circleSize / 2) {
            console.log("Circle clicked: " + i);
            if (i === correctCircleIndex) {
                console.log("Correct circle clicked");
                score++;
            } else {
                console.log("Incorrect circle clicked");
                lives--;
            }
            correctCircleIndex = floor(random(3)); // Обновляем зеленый круг
        }
    }
}

async function connectWallet() {
    console.log("Connecting wallet");

    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        try {
            // Запрашиваем аккаунты пользователя
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected accounts:", accounts);
            userAccount = accounts[0];
            walletConnected = true;
            document.getElementById('wallet-info').innerText = `Connected: ${userAccount}`;
            document.getElementById('play-btn').style.display = 'inline-block';
            document.getElementById('start-screen').style.display = 'none'; // Скрываем стартовый экран
            document.getElementById('game-screen').style.display = 'block'; // Показываем экран игры
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Ошибка подключения кошелька. Пожалуйста, попробуйте снова.");
        }
    } else {
        console.log("MetaMask is not installed");
        alert('Please install MetaMask!');
    }
}

function startGame() {
    console.log("Game started");
    gameStarted = true;
    correctCircleIndex = floor(random(3)); // Задаем случайный индекс для зеленого круга
    document.getElementById('play-btn').style.display = 'none'; // Скрываем кнопку Play
}

function showGameOver() {
    console.log("Game Over");
    gameStarted = false;
    document.getElementById('gameover-screen').style.display = 'block'; // Показываем Game Over экран
}

function buyLife() {
    console.log("Buying life");
    // Имитация покупки жизни за USDC (реализуй с помощью смарт-контрактов позже)
    alert('Buying life for 1 USDC...');
    lives = 1; // Сбрасываем жизни после покупки
    document.getElementById('gameover-screen').style.display = 'none'; // Скрываем Game Over экран
    gameStarted = true; // Перезапускаем игру
    score = 0; // Сбрасываем счет
}
