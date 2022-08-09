import React, { useEffect, useRef } from 'react'
import styles from '../css/stylesglobal.css'

const Landing = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    console.log(ctx)
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
        ctx.fillStyle = 'red';
        ctx.font = '30px Verdana';
        ctx.fillText('Hello World', 10 , 50);   
        const textCoordinates = ctx.getImageData(0, 0, 300, 300)
        console.log(textCoordinates)

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
                    this.x += directionX;
                    this.y += directionY;
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
            // for (let i = 0; i < 5000; i++){
            //     let x = Math.random() * canvas.width;
            //     let y = Math.random() * canvas.height;
            //     particleArray.push(new Particle (x, y)); } 
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
      

        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for ( let i = 0; i < particleArray.length; i++){
                particleArray[i].draw();
                particleArray[i].update();
            }
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