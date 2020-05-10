class Pad{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 100;
        this.color = "white";
        this.dy= 0;
        this.speed = 8;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y,this.w,this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    move(){
        
        this.y = this.y + this.dy;
        if(this.y > 720-this.h){
           this.y = 720-this.h;
        }
        if(this.y < 0){
            this.y = 0;
        }
        
    }
}