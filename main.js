import * as THREE from 'three';
// import { Text } from 'troika-three-text'; // for text 
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

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );  //LineDashedMaterial also can be used.

const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera );

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

