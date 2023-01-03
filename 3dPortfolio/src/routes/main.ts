import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//@ts-ignore
import { gsap } from "gsap/dist/gsap";
//@ts-ignore
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCALE = 40;

let renderer: THREE.WebGLRenderer;
let cssRenderer: CSS3DRenderer;
let camera: THREE.PerspectiveCamera;
let screenCenter: THREE.Vector3 = new THREE.Vector3(-3.23 * SCALE, 56 * SCALE, -11.5 * SCALE);

const cameraEndPos = new THREE.Vector3(0, 10.65 * SCALE, 60);
const cameraStartPos = new THREE.Vector3(-3100, 3110, 2220);

const scene = new THREE.Scene();

//let controls: OrbitControls;
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
	document.querySelector("#css")?.appendChild(cssRenderer.domElement);

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xecf8ff);
	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = "0";
	renderer.domElement.style.left = "0";
	document.querySelector("#webgl")?.appendChild(renderer.domElement);
	// renderer.shadowMap.enabled = true;

	camera.position.set(cameraStartPos.x, cameraStartPos.y, cameraStartPos.z);
	camera.lookAt(screenCenter);

	// for credit: "Desk Low-Poly" (https://skfb.ly/6RTZN) by Pedro Silva is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
	new GLTFLoader().load("desk_low-poly/scene.gltf", (gltf) => {
		scene.add(gltf.scene);
		gltf.scene.scale.set(SCALE / 5, SCALE / 5, SCALE / 5);
		//gltf.scene.position.set()
		gltf.scene.rotateOnAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
	});

	/* const tmpMesh = new THREE.Mesh(
		new THREE.BoxGeometry(100, 100, 100),
		new THREE.MeshStandardMaterial()
	); */
	//scene.add(tmpMesh);
	//tmpMesh.position.set(-3 * SCALE, 55.5 * SCALE, -11 * SCALE);
	screenCenter = new THREE.Vector3(-3.23 * SCALE, 55.35 * SCALE, -11.24 * SCALE);
	createScreen(screenCenter);

	// Adds a couple basic lights to the scene
	const pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(10, 10, 0);
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	scene.add(pointLight, ambientLight, directionalLight);

	// Adds some helpers to the scene
	const lightHelper = new THREE.PointLightHelper(pointLight);
	const gridHelper = new THREE.GridHelper(200, 50);
	//scene.add(lightHelper, gridHelper);

	//controls = new OrbitControls(camera, cssRenderer.domElement);
}

function update(time: number) {
	requestAnimationFrame(update);

	//controls.update();

	renderer.render(scene, camera);
	cssRenderer.render(scene, camera);
}

export function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 99, 7999);

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	cssRenderer = new CSS3DRenderer();

	setup();

	gsap.timeline().to(camera.position, {
		scrollTrigger: {
			trigger: "#main",
			start: "top top",
			end: "+=800%",
			scrub: true,
			//markers: true,
			immediateRender: false
		},
		x: screenCenter.x,
		y: screenCenter.y,
		z: 60,
		ease: "power4",
		onUpdate: () => camera.lookAt(screenCenter)
	});

	update(performance.now());
}

function createScreen(pos: THREE.Vector3) {
	const screen = makeCSSObject("iframe", 32 * SCALE, 18 * SCALE);
	// @ts-ignore
	screen.css3dObject.element.src = "screen";
	screen.position.set(pos.x, pos.y, pos.z);
	screenCenter = screen.position;
	scene.add(screen);
	screenCenter = pos;
	return screen;
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
