/***********
 * Cassandra Carter
 * 
 * Assignment 4 , Problem 1
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
    let pryamind = randomBoxes(100, 5, 20, 5, 60);
    scene.add(pryamind);

    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light2.position.set(0, 0, -40);
    let ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);

    let geom = new THREE.PlaneGeometry(200, 200);
    let mat = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide} );
    let plane = new THREE.Mesh(geom, mat);
    plane.rotation.x = 1.5708;
    scene.add(plane);
}


function randomBoxes(nbrBoxes, minSide, maxSide, minHeight, maxHeight) {

    for (let i = 0; i <= nbrBoxes; i++){

        //generate random sizes for sides and height
        var ranSide =  Math.floor(Math.random() * (maxSide - minSide + 1)) + minSide;
        var ranHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        //generate the boundaries where a box can be positioned
        var maxPosition = 100 - (ranSide/2);
        var minPosition = -100 + (ranSide/2);

        //generate random position
        var ranPosition_x = Math.floor(Math.random() * (maxPosition - minPosition + 1)) + minPosition;
        var ranPosition_z = Math.floor(Math.random() * (maxPosition - minPosition + 1)) + minPosition;
        
        //create box
        let geom = new THREE.BoxGeometry(ranSide, ranHeight, ranSide);
        let mat = new THREE.MeshBasicMaterial({color: generateRandomColor(), transparent: true, opacity: Math.random()});
        let box = new THREE.Mesh(geom, mat);

        box.position.set(ranPosition_x, ranHeight/2, ranPosition_z);
        scene.add(box);
    }
}


function generateRandomColor(){
    var color = new THREE.Color();
    var color1 =  Math.random();
    color.setHSL(color1, 1, 0.5);
    return color;
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}


function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}


function init() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let canvasRatio = canvasWidth / canvasHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 180, 250);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
    let container = document.getElementById('container');
    let canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}


init();
createScene();
addToDOM();
render();
animate();

