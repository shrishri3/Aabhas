const container = document.querySelector('#backdrop-container');

const bg_scene = new THREE.Scene();
bg_scene.background = new THREE.Color('skyblue');

//loaded Object3D models
var ground;
var brush;

//camera
const fov = 70; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100000; // the far clipping plane
const bg_camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
bg_camera.position.set(0, 120, 20);
bg_camera.rotateX(-0.1);

// sky
var sky_sphere = new THREE.SphereGeometry( 99000, 200, 200 );
var skyTexture = new THREE.TextureLoader().load( '/assets/img/background-sky.jpg' );
var sky_mat = new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.BackSide});
var sky_mesh = new THREE.Mesh( sky_sphere, sky_mat );
bg_scene.add( sky_mesh );
sky_mesh.position.setY(1000);

// ground
var moon_sphere = new THREE.SphereGeometry( 300, 200, 200 );
moon_sphere.rotateX( - Math.PI / 2 );
var moonTexture = new THREE.TextureLoader().load( '/assets/img/moon-surface.png' );
moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping;
moonTexture.repeat.set(15, 15);
var moon_mat = new THREE.MeshBasicMaterial({map: moonTexture, side: THREE.FrontSide});
var moon_mesh = new THREE.Mesh( moon_sphere, moon_mat );
bg_scene.add( moon_mesh );
moon_mesh.position.set(0, -200, -5);

//renderer
bg_renderer = new THREE.WebGLRenderer( { antialias: true } );
bg_renderer.setSize(container.clientWidth, container.clientHeight);
bg_renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(bg_renderer.domElement);
bg_renderer.render(bg_scene, bg_camera);

function render() {
    requestAnimationFrame(render);
    bg_renderer.render(bg_scene, bg_camera);
    sky_mesh.rotation.x += 0.0001;
}
render(); // if you don't repeatedly re-render it goes away :(
