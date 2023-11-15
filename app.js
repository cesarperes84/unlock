let ctx, points = 0;
let ballOrientation;
const h=480, w=320;
let speedBallX = 10;
let speedBallY = 10;
let clickStartGame = false;
var angleBall = 0;
let hit = false;
var rightAngle = 220;
const url1 = 'assets/img/bullet.png';
const url2 = 'assets/img/trajectory.png';
let pause = false;
var imageBall = new Image();
var imagePath = new Image();

const loadImages = async () => { 
    await new Promise(r => imageBall.onload=r, imageBall.src=url1);
    await new Promise(r2 => imagePath.onload=r2, imagePath.src=url2); 
}

const setup = () => {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
};

const startGame = () => {
    if (!clickStartGame) {
        setInterval(loop, 10);
        loadImages();
    }
    clickStartGame = true;
};

const loop = () => {
    draw();
};

const goNextLevel = () => {
    // ballOrientation *= -1;
    setTimeout(() => {
        rightAngle = Math.floor(Math.random() * 360);
        hit = false;
        angleBall = 0;
        pause = false;
    }, 3000)
    
};

const draw = () => {
    if (!hit && !pause) {
        if (angleBall === 360) angleBall = 0;
        angleBall += 1;
        angleBall = parseFloat(angleBall.toFixed(2));
        drawBall(20, 20);
    } else {
        angleBall = rightAngle;
        drawBall(20, 20);
        pause = true;
    }
};

const drawBall = (x, y)  => {
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    scale = 0.9;

    // Path
    ctx.save();
    ctx.translate(x + imagePath.width * scale / 2, y + imagePath.height * scale / 2);
    ctx.rotate(rightAngle * Math.PI / 180);
    ctx.translate(- x - imagePath.width * scale / 2, - y - imagePath.height * scale / 2);
    ctx.drawImage(imagePath, x, y, imageBall.width * scale, imagePath.height * scale);
    ctx.restore();
    
    // Ball
    ctx.save();
    ctx.translate(x + imageBall.width * scale / 2, y + imageBall.height * scale / 2);
    ctx.rotate(angleBall * Math.PI / 180);
    ctx.translate(- x - imageBall.width * scale / 2, - y - imageBall.height * scale / 2);
    ctx.drawImage(imageBall, x, y, imageBall.width * scale, imageBall.height * scale);
    ctx.restore();
    writeScore();
};

const writeScore = () => {
    ctx.font = "22px monospace";
    ctx.fillStyle = "#fff";
    ctx.fillText(`SCORE ${points}`, 120, 370);
};

const hitCheck = (ev) => {
    if (clickStartGame && !pause) {  
       if (angleBall > (rightAngle-5) && angleBall <= (rightAngle+5)) {  
            points++;
            hit = true;
            goNextLevel();
        }
    }
}

document.body.addEventListener('click', (ev) => hitCheck(ev), false);

document.addEventListener("click", (ev) => {
    startGame();
});

setup();