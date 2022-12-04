import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

let renderer: THREE.WebGLRenderer;
let cssRenderer: CSS3DRenderer;
let camera: THREE.PerspectiveCamera;

const scene = new THREE.Scene();

let controls: OrbitControls;
function setup() {
	// Catches the window resize and updates the canvas
	window.addEventListener(
		"resize",
		() => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			cssRenderer.setSize(window.innerWidth, window.innerHeight);
		},
		false
	);

	cssRenderer.domElement.style.position = "absolute";
	cssRenderer.domElement.style.top = "0";
	cssRenderer.domElement.style.left = "0";
	cssRenderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(document.createElement("div.css").appendChild(cssRenderer.domElement));

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xecf8ff);
	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = "0";
	renderer.domElement.style.left = "0";
	console.log("doing things");
	document.body.appendChild(document.createElement("div.webgl").appendChild(renderer.domElement));
	// renderer.shadowMap.enabled = true;

	camera.position.set(-10, 50, 15);
	camera.rotation.set(-3, 0.75, 3);

	// Loads the office model into the scene
	new GLTFLoader().load(
		"laptop/scene.gltf",
		(gltf) => {
			console.log("added gltf");
			scene.add(gltf.scene);
			gltf.scene.scale.set(10, 10, 10);
		},
		(p) => console.log(p),
		(e) => console.error(e)
	);

	const screen = makeCSSObject("iframe", 250, 150);
	// @ts-ignore
	screen.css3dObject.element.src = "https://threejs.org";
	screen.position.y += 125;
	scene.add(screen);

	// Adds a couple basic lights to the scene
	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	scene.add(pointLight, ambientLight, directionalLight);

	// Adds some helpers to the scene
	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(lightHelper, gridHelper);

	// Initial setup for the controls
	controls = new OrbitControls(camera, renderer.domElement);
}

function update(time: number) {
	requestAnimationFrame(update);

	controls.update();

	renderer.render(scene, camera);
	cssRenderer.render(scene, camera);
}

export function createScene() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	cssRenderer = new CSS3DRenderer();

	setup();
	update(0);
}

function makeCSSObject(type: string, width: number, height: number) {
	const obj = new THREE.Object3D();
	const el = document.createElement(type);
	el.style.width = width + "px";
	el.style.height = height + "px";
	el.style.boxSizing = "border-box";

	const cssObj = new CSS3DObject(el);
	// @ts-ignore
	obj.css3dObject = cssObj;
	obj.add(cssObj);

	const material = new THREE.MeshPhongMaterial({
		opacity: 0.15,
		color: new THREE.Color(0x111111),
		blending: THREE.NoBlending
		// side	: THREE.DoubleSide,
	});
	const geometry = new THREE.BoxGeometry(width, height, 0.1);
	const mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	// obj.lightShadowMesh = mesh
	obj.add(mesh);

	return obj;
}
