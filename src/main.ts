import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Cena e câmera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const vertices: THREE.Vector3[] = [
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3( 1, -1, -1),
  new THREE.Vector3( 1,  1, -1),
  new THREE.Vector3(-1,  1, -1),
  new THREE.Vector3(-1, -1,  1),
  new THREE.Vector3( 1, -1,  1),
  new THREE.Vector3( 1,  1,  1),
  new THREE.Vector3(-1,  1,  1),
];


const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const materialColorLine = new THREE.LineBasicMaterial({ color: 0x0000ff });

// Criar as linhas
edges.forEach(([start, end]) => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    vertices[start],
    vertices[end],
  ]);
  const line = new THREE.Line(geometry, materialColorLine);
  scene.add(line);
});


// Eixos de referência

//scene.add(new THREE.AxesHelper(2));

function createAxisLabel(text: string, position: THREE.Vector3): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 256;

  context.fillStyle = 'blue';
  context.font = '48px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.5, 0.5, 1); // tamanho do texto
  sprite.position.copy(position);

  return sprite;
}

// Adiciona os rótulos nas pontas dos eixos
scene.add(createAxisLabel('X', new THREE.Vector3(2, 0, 0)));
scene.add(createAxisLabel('Y', new THREE.Vector3(0, 2, 0)));
scene.add(createAxisLabel('Z', new THREE.Vector3(0, 0, 2)));

// Animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Ajustar ao redimensionar a tela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
