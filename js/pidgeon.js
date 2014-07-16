//setup scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//setup cube
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );

scene.add(cube);
//move camera out of cube
camera.position.z = 5;

document.body.appendChild( renderer.domElement );

function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
render();