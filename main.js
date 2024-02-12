
// import { Text } from 'troika-three-text';       // for text 
// Rotating Cube

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {
// 	requestAnimationFrame( animate );

//     cube.rotation.x += 0.001;
//     cube.rotation.y += 0.001;

// 	renderer.render( scene, camera );
// }
// animate();

//Drawing Lines

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );  //LineDashedMaterial also can be used.

// const points = [];
// points.push( new THREE.Vector3( -10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );

// scene.add( line );
// renderer.render( scene, camera );

// Creating Text 

// // Create:
// const myText = new Text()
// myScene.add(myText)

// // Set properties to configure:

// myText.text = 'Hello world!'
// myText.fontSize = 0.2
// myText.position.z = -2
// myText.color = 0x9966FF

// // Update the rendering:

// myText.sync()

// myScene.remove(myText)
// myText.dispose()

// Loading 3D Models
// Import necessary libraries
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import * as THREE from 'three';
import { HalfFloatType } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
camera.position.x = 0;
camera.position.y = 1;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ 
    powerPreference: "high-performance",
	antialias: true,
	stencil: true,
	depth: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer, {
	frameBufferType: HalfFloatType
    }
);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect()));

requestAnimationFrame(function render() {

	requestAnimationFrame(render);
	composer.render();

});

// Create lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 5, 8);
scene.add(directionalLight);

// Load the 3D model
const loader = new GLTFLoader();
loader.load(
    'models/658be9e8fc8bec93d06806f3.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.rotation.set(0, Math.PI/18, 0);
        scene.add(model);

        // Load the animation using FBXLoader
    //     const fbxLoader = new FBXLoader();
    //     fbxLoader.load(
    //         'animations/avatar_animation.fbx',
    //         (animation) => {
    //             const mixer = new THREE.AnimationMixer(animation);
    //             const action = mixer.clipAction(animation.animations[0]);
    //             action.play();
                
    //             function update() {
    //                 mixer.update(0.01);
    //             }
                
    //             function render() {
    //                 requestAnimationFrame(render);
    //                 update();
    //                 renderer.render(scene, camera);
    //             }
                
    //             render();
    //         },
    //         undefined,
    //         (error) => {
    //             console.error('Error loading animation:', error);
    //         }
    //     );
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
    }
);

// Add background image
// const textureLoader = new THREE.TextureLoader();
// textureLoader.load(
//     'path/to/your/image.jpg',
//     (texture) => {
//         // Create a plane geometry for the background
//         const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
//         // Create a material using the loaded texture
//         const material = new THREE.MeshBasicMaterial({ map: texture });
//         // Create a mesh with the geometry and material
//         const background = new THREE.Mesh(geometry, material);
//         // Set the position of the background mesh to be behind the camera
//         background.position.z = -1;
//         // Add the background mesh to the scene
//         scene.add(background);
//     },
//     undefined,
//     (error) => {
//         console.error('Error loading texture:', error);
//     }
// );

// Load the background 3D model
loader.load(
    'models/low-poly_city_night.glb',
    (gltf) => {
        const backgroundModel = gltf.scene;
        backgroundModel.position.set(-1, 0, 0);
        scene.add(backgroundModel);
    },
    undefined,
    (error) => {
        console.error('Error loading background model:', error);
    }
);

// Add event listener for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Define a function to render the scene
const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

// Call the render function
animate();

