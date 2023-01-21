/* Cassandra Carter
* Assignment 1
* Problem 1
*/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {

    var innerColor = new THREE.Color(1, 0, 0);
    var outerColor = new THREE.Color(0, 0, 1);
    var geom = regularPolygonMesh(8, 2, innerColor, outerColor);
    scene.add(geom);
    
    var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
    light.position.set(0, 0, 10);
    var light2 = new THREE.PointLight(0xFFFFFF, 1, 1000);
    light2.position.set(0, -10, -10);
    var ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(light, light2, ambientLight);
    
    //test where vertices located on the axes
    //var axes = new THREE.AxesHelper(10);
    //scene.add(axes);
}


function regularPolygonMesh(n, rad, innerColor, outerColor ) {
    var geom = new THREE.Geometry();

    //create center on the origin line
    geom.vertices.push(new THREE.Vector3(0, 0, 0));

    // create vertices
    let inc = 2 * Math.PI / n;
    for (let i = 0, a = 0; i <= n + 1; i++, a += inc) {
        let cos = Math.cos(a);
        let sin = Math.sin(a);
        geom.vertices.push(new THREE.Vector3(rad * cos, rad * sin, 0));
    }

    // push the n triangle faces
    for (var i = 1; i <= n; i++) {
        var face = new THREE.Face3(i+1, i, 0);
        geom.faces.push(face);

        //create mesh on each n triangle
        face.vertexColors.push(outerColor, outerColor, innerColor);
     }
    
    //display meshed polygon
    let args = {vertexColors: THREE.VertexColors, side: THREE.DoubleSide};
    let mat = new THREE.MeshBasicMaterial(args);
    let mesh = new THREE.Mesh(geom, mat);

    return mesh;
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

