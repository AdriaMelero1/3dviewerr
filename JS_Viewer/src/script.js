import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'


//Get dom elements
const btnZoomIn = document.getElementById('zoomIn')
const btnZoomOut = document.getElementById('zoomOut')
const zoomBar = document.querySelector('.zoomBar')
const zoomDone = document.querySelector('.zoomDone')

btnZoomIn.addEventListener('click', () => {

})

/**
 * Base
 */
// Debug
const gui = new GUI()

gui.hide()



//Add gui controls



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xFFFFFF)

/* 
    Models
*/
// const modelName = 'Fox'
// const modelExtension = 'gltf'
const path = '/static/models/'
const modelName = 'Duck'
const modelExtension = 'gltf'

const model = modelName + modelExtension;


if (modelExtension == 'fbx') {
    /* 
    FBXLoader
    */
    const fbxLoader = new FBXLoader()

    fbxLoader.load(
        '/models/' + modelName + '.' + modelExtension,
        (fbx) => {
            //Change sizes

            fbx.scale.multiplyScalar(.01);

            gui.add(fbx.scale, 'x').name('scale x').min(.1).max(10).step(.1);
            gui.add(fbx.scale, 'y').name('scale y').min(.1).max(10).step(.1);
            gui.add(fbx.scale, 'z').name('scale z').min(.1).max(10).step(.1);
            scene.add(fbx)
        }
    )

} else if (modelExtension == 'gltf') {

    /* 
    GLTFLoader
*/
    const gltfLoader = new GLTFLoader()

    gltfLoader.load(
        '/models/' + modelName + '.' + modelExtension,
        (gltf) => {
            //Change sizes

            // gltf.scale.set(.01, .01, .01)
            scene.add(gltf.scene)
            gui.add(gltf.scene.scale, 'x').name('scale x').min(.1).max(10).step(.1);
            gui.add(gltf.scene.scale, 'y').name('scale y').min(.1).max(10).step(.1);
            gui.add(gltf.scene.scale, 'z').name('scale z').min(.1).max(10).step(.1);
        }
    )

} else {

    console.log("Model extension not recognised");
}


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.enablePan = false
controls.maxZoom = 1.5
controls.minZoom = 0.5
// controls.enableZoom = false


btnZoomIn.addEventListener('click', () => {
    if (camera.zoom <= 1.5) {
        camera.zoom += .1;
        camera.updateProjectionMatrix()
        updateZoomBar()
    }


})

btnZoomOut.addEventListener('click', () => {
    if (camera.zoom >= 0.7) {
        camera.zoom -= .1;
        camera.updateProjectionMatrix()
        updateZoomBar()
    }

})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



function updateZoomBar() {

    let actualProgress = Math.round((camera.zoom - 0.5) * 10) / 10
    console.log("Updating zoom bar: " + actualProgress);

    zoomDone.style.width = `${actualProgress * 100}%`
}





controls.addEventListener( 'change', getControlsZoom );

var originalDistance = null

function getControlsZoom() {
    if (originalDistance == null)
        originalDistance = controls.getDistance();

    var zoom = originalDistance / controls.getDistance();
    zoom = Math.round(zoom * 1e4) / 1e4;

    console.log(zoom);

    if (zoom >= 1.5) {
        console.log("zoom >= 1.5");
        camera.zoom = 1.5;
    } 
    else if (zoom <= 0.5) { 
        console.log("zoom >= 0.5");
        
        camera.zoom = 0.5;
    } else {
        console.log("zoom");

        camera.zoom = zoom;
    }

    // Update camera zoom
    camera.updateProjectionMatrix();

    // Update zoom bar
    updateZoomBar();
}

window.onload = () => {
    updateZoomBar()
};