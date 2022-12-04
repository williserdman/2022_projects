import * as THREE from "three";
// @ts-ignore
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
	//document.body.appendChild(document.createElement("div.css").appendChild(cssRenderer.domElement));
	document.querySelector("#css")?.appendChild(cssRenderer.domElement);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xecf8ff);
	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = "0";
	renderer.domElement.style.left = "0";
	document.querySelector("#webgl")?.appendChild(renderer.domElement);
	//document.body.appendChild(document.createElement("div.webgl").appendChild(renderer.domElement)); // absolutely NO idea why this doesn't work
	// renderer.shadowMap.enabled = true;

	camera.position.set(-10, 50, 15);
	camera.rotation.set(-3, 0.75, 3);

	// Loads the office model into the scene
	new GLTFLoader().load(
		"laptop/scene.gltf",
		(gltf) => {
			console.log("added gltf");
			scene.add(gltf.scene);
			gltf.scene.scale.set(100, 100, 100);
		},
		(p) => console.log(p),
		(e) => console.error(e)
	);

	const screen = makeCSSObject("iframe", 2930, 1700);
	// @ts-ignore
	screen.css3dObject.element.src = "http://localhost:5173";
	screen.position.y = 1075;
	screen.position.z -= 1040;
	scene.add(screen);

	/* 	const button = makeCSSObject("button", 75, 20);
	// @ts-ignore
	button.css3dObject.element.style.border = "2px solid #fa5a85";
	// @ts-ignore
	button.css3dObject.element.textContent = "Click me!";
	// @ts-ignore
	button.css3dObject.element.addEventListener("click", () =>
		alert("You clicked a <button> element in the DOM!")
	);
	button.position.y = 100;
	button.position.z = 10;
	// @ts-ignore
	button.css3dObject.element.style.background = "#e64e77";
	scene.add(button); */

	// Adds a couple basic lights to the scene
	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff, 1);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	scene.add(pointLight, ambientLight, directionalLight);

	// Adds some helpers to the scene
	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	//scene.add(lightHelper, gridHelper);

	// Initial setup for the controls
	controls = new OrbitControls(camera, cssRenderer.domElement);

	camera.position.set(-70, 2350, 3150);
	camera.rotation.set(-0.64, -0.02, -0.01);
}

function update(time: number) {
	requestAnimationFrame(update);

	controls.update();

	//console.log(camera.position, camera.rotation);

	renderer.render(scene, camera);
	cssRenderer.render(scene, camera);
}

export function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 9999);

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	cssRenderer = new CSS3DRenderer();

	setup();
	update(performance.now());
}

function makeCSSObject(type: string, width: number, height: number) {
	const obj = new THREE.Object3D();
	const el = document.createElement(type);
	el.style.width = width + "px";
	el.style.height = height + "px";
	//el.style.opacity = "0.999";
	el.style.boxSizing = "border-box";

	const cssObj = new CSS3DObject(el);
	// @ts-ignore
	obj.css3dObject = cssObj;
	obj.add(cssObj);

	const material = new THREE.MeshPhongMaterial({
		opacity: 0.2,
		color: new THREE.Color(0x111111),
		blending: THREE.NoBlending
		// side	: THREE.DoubleSide,
	});
	const geometry = new THREE.BoxGeometry(width, height, 10);
	const mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	// obj.lightShadowMesh = mesh
	obj.add(mesh);

	return obj;
}
