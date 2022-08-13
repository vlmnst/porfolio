class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 100 )+ 5;
        }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        }
    update(ctx, mouse){
        ctx.fillStyle = 'white'
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
            if (distance < mouse.radius){
                ctx.fillStyle = 'white'
                this.x -= directionX;
                this.y -= directionY;
            }else{
               if(this.x !== this.baseX){
                ctx.fillStyle = 'blue'
                let dx = this.x - this.baseX;
                this.x -= dx/7;
               }
               if(this.y !== this.baseY){
                ctx.fillStyle = 'blue'
                let dy = this.y - this.baseY;
                this.y -= dy/7;
               }
            }
        }
    }

    export default Particle