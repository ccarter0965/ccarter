/***********
 * Cassandra Carter
 * 
 * Assignment 4 , Problem 2
 ***********/


let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();

let subject = new Subject();

function sequence(...fncs) {
    return function(delta) { fncs.forEach(g => g.call(this, delta)) };
}

function createScene() {

    trous = ringToruses(10, 16, 0.5);
    moveChildren(trous, makeArithYRotator(0.05, 0.02), makeColorAnimator(-0.1));

    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light2.position.set(0, 0, -40);
    let ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(trous);

}

function moveChildren(root, ...fncs) {
    let children = root.children;
    children.forEach(function (child, i, children) {
        let animFncs = fncs.map(g => g(child, i, children));
        child.update = sequence(...animFncs);
        subject.register(child);
    });
}


function makeArithYRotator(rpsA, rpsB) {
    let spinY = makeSpin(1);
    function f(child, i) {
        child.rps = rpsA + rpsB * i;
        return spinY;
    }
    return f;
}


function makeColorAnimator(rate, saturation=1.0, lightness=0.5) {
    function f(child, i, children) {
        child.crate = rate;
        child.cval = i / children.length;
        return function (delta) {
            this.cval += delta * this.crate;
            this.cval = mod(this.cval, 1);
            let color = new THREE.Color().setHSL(this.cval, saturation, lightness);
            this.material.color = color;
        }
    }
    return f;
}


function ringToruses(nbrTorus, majRadius, tubeRadius) {
    var root = new THREE.Object3D();

    //Adding toruses
    for (let i = 0; i <= nbrTorus; i++) { 

        //Add a cherry once all the toruses are created, otherwise stop adding
        //toruses and then add the cherry
        if (i == nbrTorus || majRadius <= 0){
            let horizSegments = 100;
            let vertSegments = 100;

            let geomCherry = new THREE.SphereGeometry(majRadius, horizSegments, vertSegments);
            let cherryColor = new THREE.MeshBasicMaterial( { color: getRandomColor() } );
            let cherry = new THREE.Mesh( geomCherry, cherryColor );
            root.add(cherry);

            return root;
        }

        //create a new torus
        let geom = new THREE.TorusGeometry(majRadius, tubeRadius, 16, 32);
        let mat = new THREE.MeshBasicMaterial( { color: getRandomColor() } );        
        let torus = new THREE.Mesh(geom, mat);
        
        torus.rotation.x = 1.5708; //rotate 90 degrees
        root.add(torus);
        majRadius = majRadius - 1;
    }
}


function update() {
    let delta = clock.getDelta();
    subject.notify(delta);
}


function init() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);
    renderer.setAnimationLoop( () => {
        update();
        renderer.render(scene, camera);
    });

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(12, 50, 45);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}



init();
createScene();
addToDOM();