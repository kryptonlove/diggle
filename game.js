let walletConnected = false;
let web3;
let userAccount;
let score = 0;
let lives = 2;
let circles = [];
let correctCircleIndex = -1;
let gameStarted = false;

function setup() {
    createCanvas(400, 400);
    background(255);

    // Connect Wallet Button
    document.getElementById('connect-btn').addEventListener('click', connectWallet);

    // Play Button
    document.getElementById('play-btn').addEventListener('click', startGame);

    // Buy Life Button
    document.getElementById('buy-life').addEventListener('click', buyLife);
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
    
    for (let i = 0; i < 3; i++) {
        let x = spacing * (i + 1);
        let y = height / 2;
        
        if (dist(mouseX, mouseY, x, y) < circleSize / 2) {
            if (i === correctCircleIndex) {
                score++;
            } else {
                lives--;
            }
            correctCircleIndex = floor(random(3));
        }
    }
}

function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            userAccount = accounts[0];
            walletConnected = true;
            document.getElementById('wallet-info').innerText = `Connected: ${userAccount}`;
            document.getElementById('play-btn').style.display = 'inline-block';
            document.getElementById('connect-btn').style.display = 'none';
        });
    } else {
        alert('Please install MetaMask!');
    }
}

function startGame() {
    gameStarted = true;
    correctCircleIndex = floor(random(3));
    document.getElementById('game-screen').style.display = 'none';
}

function showGameOver() {
    gameStarted = false;
    document.getElementById('gameover-screen').style.display = 'block';
}

function buyLife() {
    // Here you'd interact with smart contracts for USDC transfer
    alert('Buying life for 1 USDC...');
    lives = 1; // Reset lives after purchase
    document.getElementById('gameover-screen').style.display = 'none';
    gameStarted = true;
    score = 0;
}
