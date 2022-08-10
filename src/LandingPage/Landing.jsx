import React, { useEffect, useRef } from 'react'
import styles from '../css/stylesglobal.css'

const Landing = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 
    let particleArray = []
    const mouse = {
        x: null,
        y: null,
        radius: 100
    }
    //handle mouse    
    window.addEventListener('mousemove', function(event){
            mouse.x = event.x;
            mouse.y = event.y;
        })

    //draw text
        ctx.fillStyle = 'white';
        ctx.font = '30px Verdana';
        ctx.fillText('Hello World', 10 , 50);   
        const textCoordinates = ctx.getImageData(0, 0, 300, 300)

    class Particle {
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.size = 2;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 100 )+ 5;
            }
        draw(){
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            }
        update(){
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
                    this.x -= directionX;
                    this.y -= directionY;
                    ctx.fillStyle = 'red'
                }else{
                   if(this.x !== this.baseX){
                    let dx = this.x - this.baseX;
                    this.x -= dx/7;
                   }
                   if(this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy/7;
                   }
                }
            }
        }

        function init() {
            
            particleArray = [];
            for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
                for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
                  let a =  (y * 4 * textCoordinates.width);
                  let b =  (x * 4);
                    if(textCoordinates.data[a + b + 3] > 128){
                        let positionX = x;
                        let positionY = y;
                        particleArray.push(new Particle(
                            positionX * 10, 
                            positionY * 10
                            ))
                    }
                }
            }
        }
        init();
        let opacityValue = 1
        function connect(){
            for (let a = 0; a < particleArray.length; a++){
                for (let b = 0; b < particleArray.length; b++){
                    let dx = particleArray[a].x - particleArray[b].x;
                    let dy = particleArray[a].y- particleArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if(distance < 15){
                        opacityValue = 1 - (distance/20)
                        ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue + ')';
                        ctx.lineWidht = 2;
                        ctx.beginPath();
                        ctx.moveTo(particleArray[a].x, particleArray[a].y);
                        ctx.lineTo(particleArray[b].x, particleArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for ( let i = 0; i < particleArray.length; i++){
                particleArray[i].draw();
                particleArray[i].update();
            }
            connect()
            requestAnimationFrame(animate)
        }
        animate()
    },[])

    
    
    return(
        <div style={styles.body}>
          <canvas ref={canvasRef} {...props} />  
        </div>
        
    )
};

export default Landing