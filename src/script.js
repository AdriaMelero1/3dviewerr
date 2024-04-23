

/* Imports not working */
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// console.log(OrbitControls);

// import { OrbitControls } from '../js/threejs/examples/jsm/controls/OrbitControls.js';

// import { FBXLoader } from '/js/threejs/examples/jsm/loaders/FBXLoader.js'

if (typeof modelPath !== 'undefined') {
	console.log("Model encontrado");
	console.log(modelPath);
} else if (typeof errorMessage !== 'undefined') {
	console.log(errorMessage);
} else {
	console.log("Unexpected error");
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



/*    FBXLoader not working */

// const fbxLoader = new THREE.FBXLoader();
// console.log(THREE.FBXLoader);

// fbxLoader.load('/models/WomensFoot.fbx', (object) => {
//     scene.add(object);
//   });




/**
 * Sizes
 */
const sizes = {
	width: 800,
	height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const controls = new THREE.OrbitControls(camera, renderer)
