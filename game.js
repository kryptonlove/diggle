let gameStarted = false;
let score = 0;
let lives = 2;
let correctCircleIndex = -1;
let circleSize = 50;
let spacing = 100;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('game-canvas');  // Привязываем canvas к элементу в HTML

    // Обработчик нажатия на кнопку
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', startGame);

    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
}

function draw() {
    if (gameStarted) {
        background(255);

        // Отображаем круги
        displayCircles();
        
        // Отображаем счет и жизни
        displayScoreAndLives();
    }
}

function displayCircles() {
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
    for (let i = 0; i < 3; i++) {
        let x = spacing * (i + 1);
        let y = height / 2;

        // Проверяем, был ли кликнут правильный круг
        if (dist(mouseX, mouseY, x, y) < circleSize / 2) {
            if (i === correctCircleIndex) {
                score++;
            } else {
                lives--;
            }
            correctCircleIndex = floor(random(3)); // Обновляем, какой круг зеленый
        }
    }

    // Если жизни закончились
    if (lives <= 0) {
        gameStarted = false;
        alert('Game Over!');
    }
}

function startGame() {
    gameStarted = true;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    // Начальный круг для угадывания
    correctCircleIndex = floor(random(3));
}
