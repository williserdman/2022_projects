import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
// PerspectiveCamera(fov, aspect ratio, frustrum min, frustrum max);

let torus: THREE.Mesh, moon: THREE.Mesh, me: THREE.Mesh;
// let controls: OrbitControls;
function setup() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.position.setZ(30);

	const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
	const material = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // required no light source
	torus = new THREE.Mesh(geometry, material);

	Array(200).fill(0).forEach(addStar);

	const spaceTex = new THREE.TextureLoader().load("background.jpg");
	scene.background = spaceTex;

	const myTex = new THREE.TextureLoader().load("me.jpg");
	me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: myTex }));
	scene.add(me);

	const moonTex = new THREE.TextureLoader().load("moon.jpg");
	const moonNormalMap = new THREE.TextureLoader().load("moon_normal.jpg");
	moon = new THREE.Mesh(
		new THREE.SphereGeometry(3, 32, 32),
		new THREE.MeshStandardMaterial({ map: moonTex, normalMap: moonNormalMap })
	);
	moon.position.z = 30;
	moon.position.setX(-10);

	scene.add(moon);

	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight, ambientLight);

	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	// scene.add(lightHelper, gridHelper);

	scene.add(torus);

	// controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;

	// controls.update();

	renderer.render(scene, camera);

	document.body.onscroll = moveCamera;
}

export function createScene(bg: HTMLCanvasElement) {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: bg });

	setup();
	animate();
}

function addStar() {
	const geo = new THREE.SphereGeometry(0.25, 24, 24);
	const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geo, mat);

	const [x, y, z] = Array(3)
		.fill(0)
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

function moveCamera() {
	const t = document.body.getBoundingClientRect().top; // shows how far from top of webpage
	moon.rotation.x += 0.05;
	moon.rotation.y += 0.075;
	moon.rotation.z += 0.05;

	me.rotation.y += 0.01;
	me.rotation.z += 0.01;

	camera.position.z = t * -0.01 + 30;
	camera.position.x = t * -0.0002;
	camera.position.y = t * -0.0002;
}
