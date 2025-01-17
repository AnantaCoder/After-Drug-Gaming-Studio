
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap/gsap-core';
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let fighter;
let mixer;
const loader = new GLTFLoader();
loader.load('/fighter.glb',
    function (gltf) {
        fighter = gltf.scene;
        fighter.scale.set(0.6,0.6,0.6)
        scene.add(fighter);

        mixer = new THREE.AnimationMixer(fighter);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },

);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Ambient golden light
const ambientLight = new THREE.AmbientLight(0x364e9c, 4); // Softer, warm golden light
scene.add(ambientLight);

// Directional golden light
const topLight = new THREE.DirectionalLight(0xFFD700, 10); // Bright golden directional light
topLight.position.set(50, 50, 50);
topLight.castShadow = true; // Enable shadows for more depth

// Configure shadow properties for more realism
topLight.shadow.mapSize.width = 1024; // Shadow quality
topLight.shadow.mapSize.height = 1024;
topLight.shadow.camera.near = 0.5; // Adjust near clipping plane
topLight.shadow.camera.far = 500; // Adjust far clipping plane

scene.add(topLight);



const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: -0.2, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: 1.4, y: -1, z: 0 },
        rotation: { x: 0, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(fighter.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power2.out"
        });
        gsap.to(fighter.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power2.out"
        })
    }
}
window.addEventListener('scroll', () => {
    if (fighter) {
        modelMove();
    }
})
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})