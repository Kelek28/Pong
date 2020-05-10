class Ball {
    constructor(cx, cy, r) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.dx = 5;
        this.dy = 5;
        this.color = "white";
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    move() {

        // //prawo
        // if ((this.dx > 0) && (this.cx + this.dx > 999 - this.r)) {
        //     this.dx = -this.dx;
        // }

        //dol
        if ((this.dy > 0) && (this.cy + this.dy > 719 - this.r)) {
            this.dy = -this.dy;
        }
        // // lewo
        // if ((this.dx < 0) && (this.cx + this.dx < this.r)) {
        //     this.dx = -this.dx;
        // }
        //gora
        if ((this.dy < 0) && (this.cy + this.dy < this.r)) {
            this.dy = -this.dy;
        }
        this.cx += this.dx;
        this.cy += this.dy;
    }
}
