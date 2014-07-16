//setup scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, 600 / 400, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize( 600, 400 );
renderer.shadowMapEnabled = false;;

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 70;
//camera.lookAt(new THREE.Vector3(0,0,0))

//setup cube
var cubeGeometry = new THREE.BoxGeometry(10,10,10);
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

var cubeMaterials = [ 
    new THREE.MeshBasicMaterial({color:0xFF0000}), 
    new THREE.MeshBasicMaterial({color:0x00FF00}), 
    new THREE.MeshBasicMaterial({color:0x0000FF}), 
    new THREE.MeshBasicMaterial({color:0xFFFF00}), 
    new THREE.MeshBasicMaterial({color:0x00FFFF}), 
    new THREE.MeshBasicMaterial({color:0xFFFFFF}) 
];
var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);

var cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
//cubeMesh.rotation.z = Math.PI/4;
//cubeMesh.rotation.x = Math.PI/4;
cubeMesh.rotation.y = Math.PI/4;
//scene.add(cubeMesh);

var bevelOptions = {
    amount: 3,
    bevelThickness: 2,
    bevelSize: 2,
    bevelSegments: 10,
    bevelEnabled: false,
    curveSegments: 15,
    steps: 3
};
var pidgeon = createMesh(new THREE.ExtrudeGeometry(getPidgeon(), bevelOptions));
scene.add(pidgeon);

var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position = new THREE.Vector3(80, 80, 80);
scene.add(light);

var step = 0;

$('#threeContainer').append( renderer.domElement );
render();

function getPidgeon() {
    var svgString = $("#pidgeon-path").attr("d");
    var shape = transformSVGPathExposed(svgString);
    // return the shape
    return shape;
}

function createMesh(geom) {
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-140, -200, 0));
    // assign two materials
	//var meshMaterial = new THREE.MeshNormalMaterial({transparent:true, opacity:0.7});

    var meshMaterial = new THREE.MeshPhongMaterial({specular: 0xffffff, color: 0xCCCCCC, shininess: 100, metal: true, wireframe: false, shading: THREE.FlatShading});

    //  meshMaterial.side = THREE.DoubleSide;
    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
    mesh.scale.x = 0.1;
    mesh.scale.y = 0.1;


    mesh.rotation.z = Math.PI;
    //mesh.rotation.x = -1.1;
    return mesh;
}

function render() {
	pidgeon.rotation.y = step += 0.01;
	requestAnimationFrame(render);
	//cubeMesh.rotation.y += 0.01;
	//cubeMesh.rotation.x += 0.02;
	renderer.render(scene, camera);
}

