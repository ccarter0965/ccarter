/***********
 * Cassandra Carter
 * 
 * Assignment 2 , Problem 2
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
    let pryamind = pyramindToruses(10,16,1.5,2.5);
    scene.add(pryamind);
}


function pyramindToruses(nbrTorus, majRadius, tubeRadius, height) {
    let ypos = height / 2.0;
    var root = new THREE.Object3D();

    //Adding toruses to prymaind
    for (let i = 0; i <= nbrTorus; i++) { 

        //Add a cherry once all the toruses are created, otherwise stop adding
        //toruses to pryamind and then add the cherry
        if (i == nbrTorus || majRadius <= 0){
            let horizSegments = 100;
            let vertSegments = 100;

            let geomCherry = new THREE.SphereGeometry(majRadius, horizSegments, vertSegments);
            let cherryColor = new THREE.MeshBasicMaterial( { color: getRandomColor() } );
            let cherry = new THREE.Mesh( geomCherry, cherryColor );
            cherry.position.y = ypos-1
            root.add(cherry);

            return root;
        }

        //create a new torus
        let geom = new THREE.TorusGeometry(majRadius, tubeRadius, 16, 32);
        let mat = new THREE.MeshBasicMaterial( { color: getRandomColor() } );        
        let torus = new THREE.Mesh(geom, mat);
        
        torus.rotation.x = 1.5708; //rotate 90 degrees
        torus.position.y = ypos;
        root.add(torus);
        ypos += height;
        majRadius = majRadius - 1;
    }
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
    camera.position.set(0, 0, 30);
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

