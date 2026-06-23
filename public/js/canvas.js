document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("hero-canvas");
  if (!container || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Elegant dark particle torus knot
  const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 64);
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.01,
    transparent: true,
    opacity: 0.6,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  const target = new THREE.Vector2(0, 0);
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener("mousemove", (event) => {
    // Interactive mouse movement for modern feel
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth subtle rotation
    target.x = mouseX * 0.5;
    target.y = mouseY * 0.5;
    
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
    
    // Add interaction rotation
    particles.rotation.y += (target.x - particles.rotation.y) * 0.05;
    particles.rotation.x += (target.y - particles.rotation.x) * 0.05;

    // Pulse effect
    particles.scale.x = 1 + Math.sin(elapsedTime * 0.5) * 0.02;
    particles.scale.y = 1 + Math.sin(elapsedTime * 0.5) * 0.02;
    particles.scale.z = 1 + Math.sin(elapsedTime * 0.5) * 0.02;

    renderer.render(scene, camera);
  }

  animate();

  // Handle Resize
  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
