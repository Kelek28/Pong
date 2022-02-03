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

        // down
        if ((this.dy > 0) && (this.cy + this.dy > 719 - this.r)) {
            this.dy = -this.dy;
        }
        // up
        if ((this.dy < 0) && (this.cy + this.dy < this.r)) {
            this.dy = -this.dy;
        }
        this.cx += this.dx;
        this.cy += this.dy;
    }
}
