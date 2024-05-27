<template>
    <div ref="container" class="three-container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const container = ref(null);
let camera, scene, renderer, controls, model;

onMounted(() => {
    initThree();
});

function initThree() {
    // Create a scene
    scene = new THREE.Scene();

    // Set the background to a dark gray gradient
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(1, "#050505"); // Dark gray
    gradient.addColorStop(0, "#333333"); // Lighter gray
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    scene.background = backgroundTexture;

    // Create a camera
    camera = new THREE.PerspectiveCamera(
        75,
        1,
        0.1,
        1000
    );

    // Create a renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(500, 500);

    // Append the renderer's DOM element to the container
    container.value.appendChild(renderer.domElement);
    renderer.domElement.classList.add("three-canvas");

    // Add OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.ROTATE,
        RIGHT: THREE.MOUSE.ROTATE,
    };
    controls.minDistance = 1; // Limit the minimum distance the camera can zoom
    controls.maxDistance = 1.5; // Limit the maximum distance the camera can zoom
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 2;
    controls.update(camera.position.set(5, 6, 100));

    // Load the glTF model
    const loader = new GLTFLoader();
    loader.load(
        // Adjust the path to match the correct location of your model
        "/src/assets/models/girslovesbl/scene.gltf",
        (gltf) => {
            // Add the loaded model to the scene
            model = gltf.scene;
            scene.add(model);
            model.position.y = -1;
            // Adjust the camera position to focus on the loaded model
            const boundingBox = new THREE.Box3().setFromObject(model);
            const size = boundingBox.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            // Optionally, add lighting to the scene
            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xf542bc, 1);
            const directionalLight2 = new THREE.DirectionalLight(0xf542bc, 1);
            directionalLight.position.set(0, 1, 0);
            directionalLight2.position.set(1,0,0);
            scene.add(directionalLight);
        },
        undefined,
        (error) => {
            console.error("Error loading model:", error);
        }
    );

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the model
        if (model) {
            model.rotation.y += 0.01; // Adjust the speed of rotation as needed
        }

        renderer.render(scene, camera);
    };
    animate();
}

// Handle window resize

</script>

<style scoped>
.three-container {
    position: relative;
    width: 500px;
    height: 500px;
}
.three-canvas {
    display: block;
}
</style>
