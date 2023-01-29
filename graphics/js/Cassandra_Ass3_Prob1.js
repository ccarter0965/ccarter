/***********
 * Cassandra Carter
 * 
 * Assignment 3 , Problem 1
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let root = null;
let wireframe;
let tetrahedronGeom, mat;



function createSceneA() { 
    tetrahedronGeom = new THREE.TetrahedronGeometry(35);
    let matArgs = {color: 0xFF00FF, transparent: false, opacity: 1, side: THREE.DoubleSide};
    mat = new THREE.MeshLambertMaterial(matArgs);

    update();    

    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(10, 20, 20);
    let light2 = new THREE.PointLight(0xFFFFFF, 0.6, 1000 );
    light2.position.set(-20, -20, -20);
    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
}



function makeSnowflake(level,scale) {    

    if (level == 0) {
        return new THREE.Mesh(tetrahedronGeom, mat);
    } else {
        let root = new THREE.Object3D();
        root.scale.set(scale, scale, scale);
        let tf = (1 - scale) / scale;
        for (let v of tetrahedronGeom.vertices) {

            let root2 = new THREE.Object3D();
            let cloneObj = v.clone().multiplyScalar(tf);            
            root2.position.set(cloneObj.x, cloneObj.y, cloneObj.z);
            root2.add(makeSnowflake(level-1, scale));
            root.add(root2);
        }

        return root;
    }
}



function animate() {
    window.requestAnimationFrame(animate);
    render();
}

let controls = new function() {
    this.nbrLevels = 1;   
}

function initGui() {
    let gui = new dat.GUI();
    gui.add(controls, 'nbrLevels', 0, 6).name('level').step(1).onChange(update);
}

function update() {
    if (root)
        scene.remove(root);
    root = makeSnowflake(controls.nbrLevels, 0.6309);
    scene.add(root);

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
    camera.position.set(0, 0, 40);
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
createSceneA();
initGui();
addToDOM();
animate();