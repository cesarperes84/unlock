let ctx, points = 0;
let ballOrientation;
const h=480, w=320;
let speedBallX = 10;
let speedBallY = 10;
let clickStartGame = false;
var angleBall = 0;
let hit = false;
const rightAngle = 90;
var url1 = 'assets/img/bullet.png';
var url2 = 'assets/img/trajectory.png';
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
        setInterval(loop, 50000/60);
        handleBallOrientation();
        loadImages();
    }
    clickStartGame = true;
};

const loop = () => {
    draw();
};

const handleBallOrientation = () => {
    ballOrientation *= -1;
};

const draw = () => {
    angleBall += 1;
    // console.log('angleBall1', Math.ceil(angleBall));
    // drawPath(10, 20, 300, 300);
    drawBall(20, 20);
    
};

const drawBall = (x, y)  => {
    if (!hit) {
        
        ctx.clearRect(0, 0, w, h);
        ctx.imageSmoothingEnabled = true;
        // Path
        scale = 0.9;
        ctx.save();
        ctx.translate(x + imageBall.width * scale / 2, y + imageBall.height * scale / 2);
        ctx.rotate(rightAngle);
        ctx.translate(- x - imageBall.width * scale / 2, - y - imageBall.height * scale / 2);
        ctx.drawImage(imagePath, x, y, imageBall.width * scale, imageBall.height * scale);
        ctx.restore();

        // Ball
        ctx.save();
        ctx.translate(x + imageBall.width * scale / 2, y + imageBall.height * scale / 2);
        console.log('angleB', angleBall)
        ctx.rotate(angleBall);
        // ctx.rotate(280);
        ctx.translate(- x - imageBall.width * scale / 2, - y - imageBall.height * scale / 2);
        ctx.drawImage(imageBall, x, y, imageBall.width * scale, imageBall.height * scale);
        ctx.restore();
        writeScore();
    }
};

const writeScore = () => {
    ctx.font = "22px monospace";
    ctx.fillStyle = "#fff";
    ctx.fillText(`SCORE ${points}`, 120, 370);
};

const hitCheck = (ev) => {
    
    if (clickStartGame) {       
        if (angleBall === rightAngle) {
            points++;
            hit = true;
            handleBallOrientation();
        }
    }
}

document.body.addEventListener('click', (ev) => hitCheck(ev), false);

document.addEventListener("click", (ev) => {
    startGame();
});

setup();