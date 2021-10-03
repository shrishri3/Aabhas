var mod_renderer = new THREE.WebGLRenderer( { antialias: true } );
var controls;

function examineTool(type) {

    const mod_container = document.querySelector('.model-viewport');
    const mod_scene = new THREE.Scene();
    mod_scene.background = new THREE.Color('rgb(180,205,255)');

    // cameras
    const mod_aspect = mod_container.clientWidth / mod_container.clientHeight;
    const mod_camera = new THREE.PerspectiveCamera(300, mod_aspect, 0.1, 5000); // fov, aspect, near_clip, far_clip
    mod_camera.position.set(0, 0, 15);

    // light
    var light = new THREE.AmbientLight(0x404040, 1); // soft white light
    mod_scene.add(light);
    var dirlight1 = new THREE.DirectionalLight( 0xffffff );
    dirlight1.position.set( 1, 1, 1 );
    mod_scene.add( dirlight1 );
    var dirlight2 = new THREE.DirectionalLight( 0xffffff );
    dirlight2.position.set( -1, -1, -1 );
    mod_scene.add( dirlight2 );

    // the loaded model
    var tool;
    var tool_file = (type == 'scoop') ? ('assets/mod/moonkit-scoop.glb')
                  : (type == 'shovel') ? ('assets/mod/moonkit-shovel.glb')
                  : (type == 'brush') ? ('assets/mod/moonkit-brush.glb')
                  : (type == 'compartment') ? ('assets/mod/moonkit-compartment.glb')
                  : (type == 'drill') ? ('assets/mod/moonkit-drill.glb')
                  : (type == 'scongs') ? ('assets/mod/moonkit-scongs.glb')
                  : (type == 'penetrometer') ? ('assets/mod/moonkit-penetrometer.glb')
                  : (type == 'sampler') ? ('assets/mod/moonkit-sampler.glb')
                  : console.log('Model not found.');

    // loaded models become instances of Object3D
    var loader = new THREE.GLTFLoader();
    const onProgress = () => {};
    const onError = (errorMessage) => { console.log(errorMessage); };
    loader.load(tool_file, function (gltf) {
        tool = gltf.scene;
        tool.castShadow = true;

        if (type == 'scoop') {
            tool.scale.set(15,15,15);
            tool.position.set(0, 7, 0);
            tool.rotation.set( Math.PI, -1, -0.2 );
        } else if (type == 'shovel') {
            tool.scale.set(3.5,3.5,3.5);
            tool.position.set(0, 5, 0);
            tool.rotation.set( Math.PI, -0.7, 0 );
        } else if (type == 'brush') {
            tool.scale.set(40,40,40);
            tool.position.set(0, 2, 0);
            tool.rotation.set( Math.PI, -0.4, -0.2 );
        } else if (type == 'compartment') {
            tool.scale.set(3,3,3);
            tool.position.set(-2, 2, 0);
            tool.rotation.set( Math.PI, -2, -0.5 );
        } else if (type == 'drill') {
            tool.scale.set(12,12,12);
            tool.position.set(0, 4, 0);
            tool.rotation.set( (Math.PI - 0.6), -0.4, -0.2 );
        } else if (type == 'scongs') {
            tool.scale.set(3.5,3.5,3.5);
            tool.position.set(0, 6, 0);
            tool.rotation.set( Math.PI, -0.4, 0 );
        } else if (type == 'penetrometer') {
            tool.scale.set(20,20,20);
            tool.position.set(0, 12, 0);
            tool.rotation.set( Math.PI, -0.4, 0 );
        } else if (type == 'sampler') {
            tool.scale.set(20,20,20);
            tool.position.set(0, 6, 0);
            tool.rotation.set( Math.PI, -1.9, 0 );
        }

        mod_scene.add(tool);
    }, onProgress, onError);

    //create camera trackball controls
    controls = new THREE.TrackballControls( mod_camera, mod_container );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.5;

    //renderer
    mod_renderer.setSize(mod_container.clientWidth, mod_container.clientHeight);
    mod_renderer.setPixelRatio(window.devicePixelRatio);
    mod_container.appendChild(mod_renderer.domElement);
    mod_renderer.render(mod_scene, mod_camera);

    function render_mod() {
        requestAnimationFrame(render_mod);
        mod_renderer.render(mod_scene, mod_camera);
        controls.update();
    }
    render_mod(); // if you don't repeatedly re-render it goes away :(

}

// menu clicking logic
/* when menu item is clicked, display modal */
$("document").ready(function(){
    var modal = $('.model-container');
    $('.tool_menu_item').click(function(event) {
        /* get modal name from clicked item */
        var id = event.currentTarget.id;
        /* close any open modals */
        modal.css("display", "none");
        $('.model-viewport').empty();
        /* display modal */
        modal.css("display", "block");
        examineTool(id);
    });
    /* when exit button is clicked, hide modals */
    $('img.exit-icon').click(function(event) {
        modal.css("display", "none");
        $('.model-viewport').empty();
    });
});