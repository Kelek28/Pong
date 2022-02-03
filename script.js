var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var wynikLewy = 0;
var wynikPrawy = 0;
var plopSound = document.getElementById("plop");
var plopSpeed = document.getElementById("plopspeed");
var ball = new Ball(500, 360, 15);
var padLeft = new Pad(50, 295);
var padRight = new Pad(950, 295);
var graDziala = false;
function frame() {
    ctx.clearRect(0, 0, 1000, 720)
    liniaNaSrodku();
    padRight.draw(ctx);
    padLeft.draw(ctx);
    kolo();
    // odbijanie prawa paleta
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
    //odbijanie lewa paletka
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
    // punkt dla lewego gracza
    if (ball.dx > 0) {
        if (ball.cx > 995) {
            wynikLewy++;
            ball.cx = 500;
            ball.dx = 5;
            ball.dy = 5;
        }
    }
    // punkt dla prawego gracza
    if (ball.dx < 0) {
        if (ball.cx < 5) {
            wynikPrawy++;
            ball.cx = 500;
            ball.dx = 5;
            ball.dy = 5;
            Odbicia = 0;
        }
    }
    // Sprawdzanie wyniku
    if (wynikLewy == 11 || wynikPrawy == 11) {
        graDziala = false;
        wynikLewy = 0;
        wynikPrawy = 0;
        ctx.clearRect(0, 0, 1000, 720)
        rozpocznijText();
        GameOver();
        return
    }
    requestAnimationFrame(frame);
}

function keydown(event) {
    // strzalka w dol

    if (event == 40) {
        padRight.dy = padRight.speed;
    }
    // strzalka w gore
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
    // strzalka w dol
    if (event == 40 && padRight.dy > 0) {
        padRight.dy = 0;
    }
    // strzalka w gore
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
function rozpocznijText() {
    ctx.fillStyle = 'white';
    ctx.font = "55px Anton"
    ctx.fillText("Press space to start", 200, 370);
}
function GameOver() {
    ctx.fillStyle = 'white';
    ctx.font = "100px Anton"
    ctx.fillText("Game Over", 250, 280);
}
function liniaNaSrodku() {
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
    ctx.fillText(wynikLewy, 250, 150);
    ctx.fillText(wynikPrawy, 750, 150);
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

    key = event.keyCode;
    if (key == 32 && !graDziala) {
        graDziala = true;
        requestAnimationFrame(frame);
    }
})
