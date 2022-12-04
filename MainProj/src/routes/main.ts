import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

const scene = new THREE.Scene();

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
// PerspectiveCamera(fov, aspect ratio, frustrum min, frustrum max);

let controls: FirstPersonControls;
function setup(div: HTMLDivElement) {
	window.addEventListener(
		"resize",
		() => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		},
		false
	);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.position.set(-10, 50, 15);
	camera.rotation.set(-3, 0.75, 3);

	Array(200).fill(0).forEach(addStar);

	const loader = new GLTFLoader();
	loader.load(
		"office_props_pack/scene.gltf",
		(gltf) => {
			scene.add(gltf.scene);
			gltf.scene.scale.set(10, 10, 10);
		},
		(p) => console.log(p),
		(e) => console.error(e)
	);

	let cssObj = new CSS3DObject(div);
	cssObj.position.set(-20, 100, 30);
	scene.add(cssObj);

	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight, ambientLight);

	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(lightHelper, gridHelper);

	controls = new FirstPersonControls(camera, renderer.domElement);
	controls.movementSpeed = 100;
	controls.lookSpeed = 0.05;
}

function animate() {
	requestAnimationFrame(animate);

	controls.update(1 / 60);

	renderer.render(scene, camera);

	// console.log(camera.position);
	console.log(camera.rotation);

	// document.body.onscroll = moveCamera;
}

export function createScene(bg: HTMLCanvasElement, div: HTMLDivElement) {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: bg });

	setup(div);
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
