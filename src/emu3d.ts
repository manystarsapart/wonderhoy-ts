import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

// =============================
// SCENE

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

// debug
// const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
// scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 7);

const canvas = document.getElementById('canvas')!;
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  premultipliedAlpha: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;0xffffff
document.body.appendChild(renderer.domElement);

// =============================
// LIGHT

const light = new THREE.AmbientLight(0xe8afaf, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// =============================
// GLTF MODEL

let emu: THREE.Group | null = null;

const loader = new GLTFLoader();
loader.load(
    '/assets/emu.glb',
    function (gltf) {
        emu = gltf.scene;
        emu.scale.set(5, 5, 5);
        emu.position.set(0, -5, 0);
        emu.rotation.x = 0.2;
        scene.add(emu);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// =============================
// RESIZING
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

// =============================
// SCROLL UTILITIES

function lerp(x: number, y: number, a: number): number {
    return (1 - a) * x + a * y;
}
function scalePercent(start: number, end: number) {
    return (scrollPercent - start) / (end - start);
}

// =============================
// ANIMATIONS




const animationScripts: { start: number; end: number; func: () => void }[] = [];

// 0% - 40% scroll
// z pos: -10 --> 0
animationScripts.push({
    start: 0,
    end: 40,
    func: () => {
        if (emu) {
            emu.position.z = lerp(-10, 0, scalePercent(0, 40));
            // emu.position.y = lerp(-5, 0, scalePercent(0, 40))
        }
        camera.position.set(0, 1, 7);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
});

// 40% - 60% scroll
// rotate y
animationScripts.push({
    start: 40,
    end: 60,
    func: () => {
        if (emu) {
            // emu.rotation.y = lerp(0, Math.PI, scalePercent(40, 60));
            emu.rotation.y += 0.2;
        }
        camera.position.set(0, 1, 7);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
});

// 60% - 80% scroll
// move camera pos 
animationScripts.push({
    start: 60,
    end: 80,
    func: () => {
        // camera.position.x = lerp(0, 1, scalePercent(60, 80));
        camera.position.x = 0;
        camera.position.y = 1;
        // camera.position.y += 0.1;
        // camera.position.y = lerp(1, 20, scalePercent(60, 80));

        camera.position.z = 7;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
});

// 80% - 100% scroll
// auto rotate
animationScripts.push({
    start: 80,
    end: 101,
    func: () => {
        if (emu) {
            // emu.rotation.x += 0.1;

            emu.rotation.z += 0.5;
        }
    }
});

// misc. TODO
function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
        }
    });
}

// =============================
// TRACKING SCROLL

let scrollPercent = 0;

if (!document.getElementById('scrollProgress')) {
    const scrollDiv = document.createElement('div');
    scrollDiv.id = 'scrollProgress';
    scrollDiv.style.position = 'fixed';
    scrollDiv.style.top = '10px';
    scrollDiv.style.right = '10px';
    scrollDiv.style.background = 'rgba(0,0,0,0.5)';
    scrollDiv.style.color = 'white';
    scrollDiv.style.padding = '6px 12px';
    scrollDiv.style.borderRadius = '4px';
    document.body.appendChild(scrollDiv);
}

document.body.onscroll = () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100;
    (document.getElementById('scrollProgress') as HTMLDivElement).innerText =
        'Scroll Progress : ' + scrollPercent.toFixed(2);
};

// =============================
// STATS

const stats = new Stats();
document.body.appendChild(stats.dom);

// =============================
// ANIMATION LOOP

function animate() {
    requestAnimationFrame(animate);
    playScrollAnimations();
    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

window.scrollTo({ top: 0, behavior: 'smooth' });
animate();
