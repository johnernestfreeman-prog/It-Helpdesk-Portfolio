import { gsap } from "gsap";
import './style.css';
import './desktop.css';
import './monitorDesktop.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createOverlay } from './overlay.js';
import './desktop.js'; // wires up the resume overlay's sidebar/tab nav clicks
import { createDesktopShortcuts, createAppWindows, initMonitorDesktop, toggleDesktopShortcuts } from './monitorDesktop.js';
 
import monitorIconsHTML from "./monitorIcons.html?raw";
import "./monitorIcons.css";
 
// IMPORTANT: static `import` statements are hoisted and run before any other
// code in this module, no matter where they're written. The old code did
// `import "./monitorIcons.js"` up here, but that file calls
// document.getElementById("resumeBtn") immediately on load — before the HTML
// below had even been inserted into the page — so it always threw
// "Cannot set properties of null". Inserting the HTML first, then
// dynamically importing the wiring script, fixes the ordering.
document.body.insertAdjacentHTML(
    "beforeend",
    monitorIconsHTML
);
import("./monitorIcons.js");
 
createOverlay();
createDesktopShortcuts();
createAppWindows();
initMonitorDesktop();

const clickHint = document.createElement("div");

clickHint.id = "clickHint";

clickHint.innerHTML = "🖱️ Click the workstation to explore my portfolio";

document.body.appendChild(clickHint);

 
// FEATURE: the desktop shortcut icons (My Showcase / Oregon Trail / Doom /
// Resume.doc) used to be visible the whole time, even from the wide
// zoomed-out shot of the room. They're now hidden by default and only
// revealed once the camera has finished zooming in on the monitor (see
// zoomToMonitor's onComplete below).
toggleDesktopShortcuts(false);
 
// // Scene // //
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);
 
// // Camera // //
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
// // Renderer // //
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
// // Controls // //
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
 
// // Lights // //
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
 
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
 
// // Mouse // //
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let centerMonitor = null;
let resumeAnchor = null; // world-space point the resume window tracks
let shortcutsAnchor = null; // world-space point the desktop shortcuts track
 
// // Load Model // //
const loader = new GLTFLoader();
loader.load(
  '/models/IT HELPDESK ROOM.glb',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
 
    // Find monitor
    centerMonitor = model.getObjectByName("CenterMonitor");
    console.log("Monitor loaded:", centerMonitor);
 
    if (centerMonitor) {
      const monitorBox = new THREE.Box3().setFromObject(centerMonitor);
      shortcutsAnchor = monitorBox.getCenter(new THREE.Vector3());
    }
 
    // Camera Position
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    camera.position.set(center.x + 3.8, center.y + 1.2, center.z - 2.5);
    controls.target.set(center.x, center.y + 0.5, center.z);
    controls.update();
    console.log("Model Loaded!");
  },
  undefined,
  (error) => {
    console.error(error);
  }
);
 
// // Resize // //
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
 
// // Mouse Move // //
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
 
// // Click // //
window.addEventListener("click", () => {
  if (!centerMonitor) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(centerMonitor, true);
  if (intersects.length > 0) {
    console.log("CENTER MONITOR CLICKED!");
    zoomToMonitor();
  }
});
 
// // Zoom In // //
function zoomToMonitor() {
  controls.enabled = false;
  toggleDesktopShortcuts(false);
  document.getElementById("clickHint")?.remove();
  const box = new THREE.Box3().setFromObject(centerMonitor);
  const target = new THREE.Vector3();
  box.getCenter(target);
  resumeAnchor = target.clone(); // resume window will track this world point
 
  gsap.to(camera.position, {
    duration: 2,
    x: target.x + 0.9,
    y: target.y + 0.05,
    z: target.z,
    ease: "power2.inOut",
    onUpdate() {
      camera.lookAt(target);
      controls.target.copy(target);
    },
    onComplete() {
      controls.update();
      const overlay = document.getElementById('resume-overlay');
      if (overlay) {
        overlay.classList.remove('hidden');
      }
 
      // FEATURE: reveal the desktop shortcut icons only once we've actually
      // arrived at the monitor, so they fade in right as the resume window
      // pops up rather than being visible the whole time.
      toggleDesktopShortcuts(true);
 
      const closeBtn = document.getElementById('close-resume-btn');
      if (closeBtn) {
        closeBtn.replaceWith(closeBtn.cloneNode(true));
        document.getElementById('close-resume-btn').addEventListener('click', () => {
          zoomOutFromMonitor(target);
        });
      }
    }
  });
}
 
// // Zoom Out // //
function zoomOutFromMonitor(monitorTarget) {
  const overlay = document.getElementById('resume-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
  resumeAnchor = null;
  // Zooming back out to the wide shot — hide the shortcut icons again so
  // they only ever show up once you're zoomed in on the monitor.
  toggleDesktopShortcuts(false);
 
  gsap.to(camera.position, {
    duration: 1.5,
    x: monitorTarget.x + 3.8,
    y: monitorTarget.y + 1.2,
    z: monitorTarget.z - 2.5,
    ease: "power2.out",
    onUpdate() {
      camera.lookAt(monitorTarget);
      controls.target.copy(monitorTarget);
    },
    onComplete() {
      controls.enabled = true;
      controls.update();
    }
  });
}
 
// // Animation Loop // //
function animate() {
  requestAnimationFrame(animate);
  controls.update();
 
  if (resumeAnchor) {
    const overlay = document.getElementById('resume-overlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      const win = overlay.querySelector('.tracked-window');
      if (win) {
        const projected = resumeAnchor.clone().project(camera);
        const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
        win.style.left = `${x}px`;
        win.style.top = `${y}px`;
      }
    }
  }
 
  if (shortcutsAnchor) {
    const shortcuts = document.getElementById('desktop-shortcuts');
    if (shortcuts && !shortcuts.classList.contains('hidden-shortcuts')) {
      const projected = shortcutsAnchor.clone().project(camera);
      // The shortcuts and the resume window both track the same monitor-
      // center anchor point, so without an offset they'd render directly on
      // top of each other. Nudge the icon stack left (and slightly up) so
      // it sits beside the window instead of underneath it. Tweak these two
      // numbers to reposition — larger negative X = further left,
      // negative Y = higher up.
      const SHORTCUTS_OFFSET_X = -480;
      const SHORTCUTS_OFFSET_Y = -30;
      const x = (projected.x * 0.5 + 0.5) * window.innerWidth + SHORTCUTS_OFFSET_X;
      const y = (-projected.y * 0.5 + 0.5) * window.innerHeight + SHORTCUTS_OFFSET_Y;
      shortcuts.style.left = `${x}px`;
      shortcuts.style.top = `${y}px`;
    }
  }
 
  if (centerMonitor) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(centerMonitor, true);
    if (intersects.length > 0) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }
 
  renderer.render(scene, camera);
}
 
animate();
 