import React, { useRef, useEffect} from "react";
import styles from './Scene.module.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import typefaceFont from "../Font/Astronaut.txt";

const Scene = () => {
    const mountRef = useRef(null)

    useEffect(()=>{
        const currentMount = mountRef.current
        console.log(currentMount)
        //Scene
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            25, //fov
            currentMount.clientWidth / currentMount.clientHeight, // relacion de aspecto
            0.1,
            1000
        )
        camera.position.z = 5
        camera.position.y = 0
        scene.add(camera)
        //Renderer
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, 
                        currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)
        //Controls
        const controls = new OrbitControls(camera, renderer.domElement)

    
        //Lights
        const pointLight = new THREE.PointLight(0xffffff, 1.2)
        const pointLight2 = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(-3,4,6)
        pointLight2.position.set(0,1.5,-5)
        scene.add(pointLight)
        
       
        //TEXT
        const fontLoader = new FontLoader();

        fontLoader.load(typefaceFont, (font) => {
        const textMaterial = new THREE.MeshStandardMaterial();
        const textAbout = new TextGeometry("About",
        {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.01,
                beveloffset: 0,
                bevelSegments: 5
            }
        );   
        const aboutText = new THREE.Mesh(textAbout, textMaterial);
        aboutText.name = 'About'
        aboutText.position.set(-6, 0, -3)
        scene.add(aboutText);
        });

        fontLoader.load(typefaceFont, (font) => {
            const textMaterial = new THREE.MeshStandardMaterial();
    
            const textProyect = new TextGeometry("Proyects",
            {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    beveloffset: 0,
                    bevelSegments: 5
                }
            );    
            const proyectsText = new THREE.Mesh(textProyect, textMaterial);
            proyectsText.name = 'Proyects' 
            proyectsText.position.set(-1.5, 0, -2)
            scene.add(proyectsText);
            });
        
            fontLoader.load(typefaceFont, (font) => {
                const textMaterial = new THREE.MeshStandardMaterial();
                const textContact = new TextGeometry("Contact",
                {
                        font: font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        beveloffset: 0,
                        bevelSegments: 5
                    }
                );
                const contactText = new THREE.Mesh(textContact, textMaterial);
                contactText.name = 'Contact' 
                contactText.position.set(3.5, 0, -3)
                scene.add(contactText);
                });
        //Raycaster
        const raycaster = new THREE.Raycaster()
        console.log(raycaster)                   
        //Pointer coors
        const pointer = new THREE.Vector2(-100, -100)
        function onPointerMove(event){
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(event.clientY / window.innerHeight/1.5) * 2 + 1
        }
        window.addEventListener('pointermove', onPointerMove)
        console.log(scene)
        //handle click
        let meshCurrentClick = null
        const handleMeshesClick = () => {
            try {
                switch (meshCurrentClick.name) {
                case 'About':
                    return console.log('click about');
                case 'Proyects':
                    return console.log('click proyects')
                case 'Contact':
                    return console.log('click contact')
                default:
                    return null
                 }
            } catch (error) {
                
            }
            
        }
        window.addEventListener('click', () => handleMeshesClick())
        //Render the scene and animate
        let meshCurrentHover = null
        const animate = () => {
            raycaster.setFromCamera(pointer, camera)
            const intersects = raycaster.intersectObjects(
                scene.children,
                true
            )
            //mouse onleave
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh){
                    child.material.color.set(0xffffff)
                }
            })

            if(intersects.length) {
                meshCurrentHover = null
                meshCurrentHover = intersects[0].object
                meshCurrentClick = intersects[0].object
                intersects[0].object.material.color.set('#FFCB5D')
            }
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
        renderer.render(scene, camera)

        //Clean up
        return () => {
            currentMount.removeChild(renderer.domElement)
        }
    }, [])

    return(
        <div>
            <div 
            className={styles.container}
            ref= {mountRef}
            > 
            </div>
        </div>


    )     
}

export default Scene