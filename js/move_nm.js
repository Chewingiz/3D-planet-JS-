let cnv = document.querySelector("#myCanvas");
let renderer = new THREE.WebGLRenderer({canvas: cnv, antialiasing: true});
renderer.setSize(window.innerWidth, window.innerHeight);
/*import { RectAreaLightHelper }  from "/autre/RectAreaLightHelper.js"
import { RectAreaLightUniformsLib }  from "./autre/RectAreaLightUniformsLib.js"*/

let scene = new THREE.Scene();
let planet = new THREE.Scene();

/*let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
directionalLight.position.set( 0, 1, 0.5 );*/

// white spotlight shining from the side, modulated by a texture, casting a shadow

let  spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 2, 2, 0 );
//spotLight.map = new THREE.TextureLoader().load( url );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

let  light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//light.target.position.set( toX, toY, toZ );

let camera = new THREE.PerspectiveCamera(75,
window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 4);
camera.lookAt(0, 0, 0);
scene.add(camera);


/*Texture creation for "cartoon" style*/
let  threeTone = new THREE.TextureLoader().load('assets/threeTone.jpg');
threeTone.minFilter = THREE.NearestFilter;
threeTone.magFilter = THREE.NearestFilter;

let  fiveTone = new THREE.TextureLoader().load('assets/fiveTone.jpg');
fiveTone .minFilter = THREE.NearestFilter;
fiveTone .magFilter = THREE.NearestFilter;

/*Vehicule creation*/

let vehicule = new THREE.Scene();

let geometry_center_vehicule = new THREE.SphereGeometry(1.0, 20, 20);
let material_center_vehicule  = new THREE.MeshToonMaterial({ color: 0xdcdcdc,gradientMap : fiveTone  });
let sphere_center_vehicule  = new THREE.Mesh(geometry_center_vehicule , material_center_vehicule );

let geometry_torus_vehicule = new THREE.TorusGeometry( 1.5, 0.2, 10, 100 );
let texture_torus_vehicule  = 0x00ff00 ;
let material_torus_vehicule  = new THREE.MeshToonMaterial({ color: 0xdcdcdc,gradientMap : threeTone });
material_torus_vehicule.gradientMap = threeTone;
let torus_vehicule  = new THREE.Mesh(geometry_torus_vehicule , material_torus_vehicule );
torus_vehicule.rotation.x += -Math. PI/2;

vehicule.add( sphere_center_vehicule);
vehicule.add(torus_vehicule);

//scene.add(vehicule);

/*Planet creation*/
let geometry = new THREE.SphereGeometry(1.0, 20, 20);
//let texture = new THREE.TextureLoader().load("assets/texture_toon.png");
let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
let sphere = new THREE.Mesh(geometry, material);
planet.add(sphere);

// help https://tympanus.net/codrops/2021/08/31/surface-sampling-in-three-js/
let  sampler = new THREE.MeshSurfaceSampler(sphere).build();

let  boxGeometry = new THREE.BoxGeometry( 0.1,1, 0.1  );;
let  boxMaterial = new THREE.MeshToonMaterial({ color: 0xdcdcdc,gradientMap : threeTone });
let  boxs = new THREE.InstancedMesh(boxGeometry, boxMaterial, 300);
planet.add(boxs);	

let  tempPosition = new THREE.Vector3();
let  tempObject = new THREE.Object3D();
for (let i = 0; i < 300; i++) {
  sampler.sample(tempPosition);
  //tempObject.position.setFromSphericalCoords(tempPosition.x, tempPosition.y, tempPosition.z);
  
  tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
  
  /*angles of the buildings*/
  
  
  /*ajout test  y positif ou negatif*/
  if (tempPosition.y>0){/*Top*/
	  tempObject.rotation.x = Math.atan2(tempPosition.z,tempPosition.y)+ Math.PI ;
	  //tempObject.rotation.y = Math.atan2(tempPosition.z,tempPosition.x) ;
	  tempObject.rotation.z = Math.atan2(tempPosition.x,tempPosition.y) ;
  }else { /*Bottom*/
  	  tempObject.rotation.x = Math.atan2(tempPosition.z,tempPosition.y) ;
	  //tempObject.rotation.y = Math.atan2(tempPosition.z,tempPosition.x) ;
	  tempObject.rotation.z = Math.atan2(tempPosition.x,tempPosition.y) ;
  }
  
  tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
  tempObject.updateMatrix();
  boxs.setMatrixAt(i, tempObject.matrix);
}	

/*Windows for buildings*/
THREE.RectAreaLightUniformsLib.init();
let  width = 0.5;
let  height = 0.5;
let  intensity = 1;
let  rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 2, 2, 0 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight );

let  rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );


/*let geometry_cube = new THREE.BoxGeometry( 0.1,0.1, 0.1  );
let material_cube  = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry_cube , material_cube  )
planet.add( cube );
*/


scene.add( planet);


//cube.rotation.z += Math.atan2(0,0);//-Math. PI/4; 

/*Math.atan2(x, y) return the angle the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y) 

I use it to get the angle for the buildings */


// lien exemple planet : https://medium.com/@joshmarinacci/quaternions-are-spooky-3a228444956d


/*sky texture*/
let sky_box = new THREE.BoxGeometry(100, 100, 100);
let texture = new THREE.TextureLoader().load("assets/space.jpg");
let material_sky  = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
let box_sky  = new THREE.Mesh(sky_box , material_sky  );
scene.add(box_sky);

/*Cel shading effect creation*/
let effect = new THREE.OutlineEffect( renderer, {
  	defaultThickness: 0.02,
  	defaultColor: [ 0, 0, 0 ],
  	defaultAlpha: 0.8,
  	defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
  } );
 /* function render() {
 
  	effect.render( scene, camera );
 
  }*/
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
			planet.rotation.x += 0.01; sphere.rotation.z += 0.01;
		}
	//renderer.render(scene, camera);
	effect.render( scene, camera );
	//planet.rotation.z +=0.01;
	requestAnimationFrame(update);
}
window.addEventListener("resize", onWindowResize, false);
requestAnimationFrame(update);

