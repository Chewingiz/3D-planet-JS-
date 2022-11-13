let cnv = document.querySelector("#myCanvas");
let renderer = new THREE.WebGLRenderer({canvas: cnv, antialiasing: true});
renderer.setSize(window.innerWidth, window.innerHeight);



let scene = new THREE.Scene();
let planet = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,
window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 4);
camera.lookAt(0, 0, 0);
scene.add(camera);

let geometry = new THREE.SphereGeometry(1.0, 20, 20);
let texture = new THREE.TextureLoader().load("assets/grass.jpg");
let material = new THREE.MeshBasicMaterial({ map: texture});
let sphere = new THREE.Mesh(geometry, material);
//scene.add(sphere);
//let v =  new THREE.Vector3( 0.5,2, 0.5 ).setFromSphericalCoords ( 1, 0, 0 );
let geometry_cube = new THREE.BoxGeometry( 0.5,2, 0.5  );//
let material_cube  = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry_cube , material_cube  )
planet.add( cube );

//const sampler = new THREE.MeshSurfaceSampler(cube).build();
//console.log(cube.face[0]);


// .setRotationFromAxisAngle ( axis : Vector3, angle : Float ) : undefined   axis -- A normalized vector in object space. 

				

scene.add( planet);
//cube.translateX ( 3 );
cube.rotation.z += Math.atan2(-100,-10);//-Math. PI/4; 
//cube.rotation.z += 2;
//cube.rotateX ( 3 ); 
//cube.rotation.x += 1;
/*return the angle the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y) 

I use it to get the angle for the buildings */
// lien exemple planet : https://medium.com/@joshmarinacci/quaternions-are-spooky-3a228444956d

function onWindowResize() {
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

let previousTimeStamp = undefined;
let updateTime = 20, elapsed = updateTime+1;
function update(timestamp) {
	if(previousTimeStamp != undefined) { elapsed = timestamp-previousTimeStamp; }
		if(elapsed > updateTime) {
			previousTimeStamp = timestamp;
			sphere.rotation.x += 0.01; sphere.rotation.z += 0.01;
		}
	renderer.render(scene, camera);
	//planet.rotation.z +=0.01;
	requestAnimationFrame(update);
}
window.addEventListener("resize", onWindowResize, false);
requestAnimationFrame(update);

/*let  scene = new THREE.Scene();
let  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let  renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

let  geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
let  material_cube  = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let  cube = new THREE.Mesh( geometry_cube , material_cube  );
scene.add( cube );
cube.translateX ( 3 ); 
//cube.rotateX ( 3 ); 
cube.rotation.x += 1;

let geometry = new THREE.SphereGeometry(1.0, 20, 20);
//let texture = new THREE.TextureLoader().load("assets/namek.png");
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	//sphere.translateX ( 0.10 ); 
	//sphere.rotation.x += 0.01;
	
	renderer.render( scene, camera );
}
animate();*/




