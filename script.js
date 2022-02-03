var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var leftScore = 0;
var rightScore = 0;
var plopSound = document.getElementById("plop");
var plopSpeed = document.getElementById("plopspeed");
var ball = new Ball(500, 360, 15);
var padLeft = new Pad(50, 295);
var padRight = new Pad(950, 295);
var gameIsOn = false;
function frame() {
    ctx.clearRect(0, 0, 1000, 720)
    middleLine();
    padRight.draw(ctx);
    padLeft.draw(ctx);
    kolo();
    // rigtht player hit
    if (ball.dx > 0) {
        if ((ball.cy <= (1 / 5 * padRight.h)) && (ball.cy >= padRight.y)) {
            if (ball.cx >= padRight.x - 2.5 * ball.r && ball.cx <= padRight.x + 10) {
                ball.dx = -getRndInteger(6, 9);
                plopSpeed.play();
            }
        }
        if ((ball.cy >= (padRight.y + (4 / 5 * padRight.h))) && (ball.cy <= (padRight.y + padRight.h))) {
            if (ball.cx >= padRight.x - 2.5 * ball.r && ball.cx <= padRight.x + 10) {
                ball.dx = -getRndInteger(6, 9);
                plopSpeed.play();
            }
        }
        if (ball.cy > (padRight.y + (1 / 5 * padRight.h)) && ball.cy < (padRight.y + (4 / 5 * padRight.h))) {
            if (ball.cx >= padRight.x - 2.5 * ball.r && ball.cx <= padRight.x + 10) {
                ball.dx = -5;
                plopSound.play();
            }
        }
    }
    //  left player hit
    if (ball.dx < 0) {
        if (ball.cy > (padLeft.y + (1 / 5 * padLeft.h)) && ball.cy < (padLeft.y + (4 / 5 * padLeft.h))) {
            if (ball.cx >= padLeft.x
                && ball.cx <= padLeft.x + padLeft.w + 2.5 * ball.r) {
                ball.dx = 5;
                plopSound.play();
            }
        }
        if ((ball.cy >= (padLeft.y + (4 / 5 * padLeft.h))) && (ball.cy <= (padLeft.y + padLeft.h))) {
            if (ball.cx >= padLeft.x
                && ball.cx <= padLeft.x + padLeft.w + 2.5 * ball.r) {
                ball.dx = -getRndInteger(6, 9);
                plopSpeed.play();
            }
        }
        if ((ball.cy <= padLeft.y + (1 / 5 * padLeft.h)) && (ball.cy >= padLeft.y)) {
            if (ball.cx >= padLeft.x
                && ball.cx <= padLeft.x + padLeft.w + 2.5 * ball.r) {
                ball.dx = -getRndInteger(6, 9);
                plopSpeed.play();
            }
        }
    }
    // left player point
    if (ball.dx > 0) {
        if (ball.cx > 995) {
            leftScore++;
            ball.cx = 500;
            ball.dx = 5;
            ball.dy = 5;
        }
    }
    // right player point
    if (ball.dx < 0) {
        if (ball.cx < 5) {
            rightScore++;
            ball.cx = 500;
            ball.dx = 5;
            ball.dy = 5;
            Odbicia = 0;
        }
    }
    // Check score
    if (leftScore == 11 || rightScore == 11) {
        gameIsOn = false;
        leftScore = 0;
        rightScore = 0;
        ctx.clearRect(0, 0, 1000, 720)
        startText();
        GameOver();
        return
    }
    requestAnimationFrame(frame);
}

function keydown(event) {
    // arrow down

    if (event == 40) {
        padRight.dy = padRight.speed;
    }
    // arrow up
    if (event == 38) {
        padRight.dy = -padRight.speed;
    }
    // a
    if (event == 65) {
        padLeft.dy = -padLeft.speed;
    }
    // z
    if (event == 90) {
        padLeft.dy = padLeft.speed;
    }
}
function keyup(event) {
    // arrow down
    if (event == 40 && padRight.dy > 0) {
        padRight.dy = 0;
    }
    // arrow up
    if (event == 38 && padRight.dy < 0) {
        padRight.dy = 0;
    }
    // a
    if (event == 65 && padLeft.dy < 0) {
        padLeft.dy = 0;
    }
    // z
    if (event == 90 && padLeft.dy > 0) {
        padLeft.dy = 0;
    }
}
function startText() {
    ctx.fillStyle = 'white';
    ctx.font = "55px Anton"
    ctx.fillText("Press space to start", 280, 370);
}
function GameOver() {
    ctx.fillStyle = 'white';
    ctx.font = "100px Anton"
    ctx.fillText("Game Over", 250, 280);
}
function middleLine() {
    ctx.beginPath();
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 720);
    ctx.stroke();
}
function wynik() {
    ctx.font = "100px Arial"
    ctx.fillText(leftScore, 250, 150);
    ctx.fillText(rightScore, 750, 150);
    ctx.fillStyle = "#e6e6e6";
}
function kolo() {
    ball.draw(ctx);
    ball.move();
    padLeft.move();
    padRight.move();
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
addEventListener("keypress", function startGry() {

    key = keyCode;
    if (key == 32 && !gameIsOn) {
        gameIsOn = true;
        requestAnimationFrame(frame);
    }
})
