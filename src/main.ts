import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Cena e câmera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Vértices do cubo
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

// Arestas
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

// Material azul
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// Criar as linhas
edges.forEach(([start, end]) => {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    vertices[start],
    vertices[end],
  ]);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
});

// Eixos de referência
scene.add(new THREE.AxesHelper(3));

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
