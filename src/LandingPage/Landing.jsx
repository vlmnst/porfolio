import React, { useEffect, useRef } from 'react'
import styles from '../css/stylesglobal.css'
import Particle from './Particle';
const Landing = (props) => {
    const canvasRef = useRef(null)

    useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight/2;
 
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
        ctx.font = '29px Serif';
        ctx.fillText('Hello World', 15 , 40);   
        const textCoordinates = ctx.getImageData(0, 0, 300, 300)

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
                particleArray[i].draw(ctx);
                particleArray[i].update(ctx, mouse);
            }
            connect()
            requestAnimationFrame(animate)
        }
        animate()

    },[])

    return(
        <div className={styles.body}>
          <canvas ref={canvasRef} {...props} />  
        </div>
        
    )
};

export default Landing