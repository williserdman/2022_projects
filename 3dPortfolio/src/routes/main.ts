import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import gsap from "gsap";

const SCALE = 40;

let renderer: THREE.WebGLRenderer;
let cssRenderer: CSS3DRenderer;
let camera: THREE.PerspectiveCamera;
let screenCenter: THREE.Vector3 = new THREE.Vector3(0, 10.65 * SCALE, -10.65 * SCALE);

const cameraEndPos = new THREE.Vector3(-0.7770185084587191, 434.6044300582179, 58.527510632008216);
const cameraStartPos = new THREE.Vector3(
	-2099.2246488333626,
	1110.4891140553996,
	2221.310294422909
);

const otherInfo = `
{isEuler: true, _x: -0.30893971996719555, _y: -0.5001468311828967, _z: -0.1518754142208954, _order: 'XYZ', …}
{isEuler: true, _x: -0.01395548132400472, _y: 0.001318569940072002, _z: 0.00001840246751468038, _order: 'XYZ', …}
`;

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

	camera.position.set(cameraStartPos.x, cameraStartPos.y, cameraStartPos.z);
	camera.lookAt(screenCenter);

	scene.add(createLaptop());

	new GLTFLoader().load(
		"office_desk/scene.gltf",
		(gltf) => {
			console.log("Desk Added");
			scene.add(gltf.scene);
			//console.log(scene);
			gltf.scene.scale.set(1.5 * SCALE, 1.5 * SCALE, 1.5 * SCALE);
			gltf.scene.position.set(-52 * SCALE, -46.6 * SCALE, 12 * SCALE);
		},
		(p) => console.log(p),
		(e) => console.error(e)
	);

	/* document.addEventListener("keypress", () => {
		console.log("pos:", camera.position, "rot:", camera.rotation);
	}); */

	document.addEventListener("mousedown", () => {
		gsap.to(camera.position, {
			x: cameraEndPos.x,
			y: cameraEndPos.y,
			z: cameraEndPos.z,
			duration: 2,
			onUpdate: () => camera.lookAt(screenCenter)
		});
	});

	const tmpMesh = new THREE.Mesh(
		new THREE.BoxGeometry(10, 10, 10),
		new THREE.MeshStandardMaterial()
	);
	scene.add(tmpMesh);
	tmpMesh.position.set(0, 10.65 * SCALE, -10.65 * SCALE);

	// Adds a couple basic lights to the scene
	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	scene.add(pointLight, ambientLight, directionalLight);

	// Adds some helpers to the scene
	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	scene.add(lightHelper, gridHelper);

	// Initial setup for the controls
	controls = new OrbitControls(camera, cssRenderer.domElement);

	//camera.position.set(-0.7 * SCALE, 23.5 * SCALE, 31.5 * SCALE);
	//camera.rotation.set(-0.64, -0.02, -0.01);

	//camera.position.set(0, 440, 120);
	//camera.position.set(90, 380, 260);
	//camera.rotation.set(-0.02, 0.14, 0.015);
}

function update(time: number) {
	requestAnimationFrame(update);

	//controls.update();

	//console.log(camera.position, camera.rotation);

	renderer.render(scene, camera);
	cssRenderer.render(scene, camera);
	camera.lookAt(screenCenter);
}

export function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 99, 7999);

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	cssRenderer = new CSS3DRenderer();

	setup();
	update(performance.now());
}

function createLaptop() {
	const group = new THREE.Group();
	new GLTFLoader().load(
		"laptop/scene.gltf",
		(gltf) => {
			console.log("Laptop Added.");
			group.add(gltf.scene);
			gltf.scene.scale.set(1 * SCALE, 1 * SCALE, 1 * SCALE);
		},
		(p) => console.log(p),
		(e) => console.error(e)
	);

	const screen = makeCSSObject("iframe", 29.5 * SCALE, 17.15 * SCALE);
	// @ts-ignore
	screen.css3dObject.element.src = "screen";
	screen.position.set(0, 10.65 * SCALE, -10.65 * SCALE);
	screenCenter = screen.position;
	//screen.position.y = 10.65 * SCALE;
	//screen.position.z -= 10.65 * SCALE;
	group.add(screen);

	return group;
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
		color: new THREE.Color(0x010101),
		blending: THREE.NoBlending
		// side	: THREE.DoubleSide,
	});
	const geometry = new THREE.BoxGeometry(width, height, 1);
	const mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	// obj.lightShadowMesh = mesh
	obj.add(mesh);

	return obj;
}
