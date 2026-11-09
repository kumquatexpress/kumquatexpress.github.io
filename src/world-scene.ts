import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type IslandScene = {
  rotate: (direction: number) => void;
  launch: () => void;
  setPaused: (paused: boolean) => void;
  dispose: () => void;
};

function releaseScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
      geometries.add(object.geometry);
      const material = object.material;
      (Array.isArray(material) ? material : [material]).forEach((item) =>
        materials.add(item),
      );
    }
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value instanceof THREE.Texture) textures.add(value);
    });
    material.dispose();
  });
  textures.forEach((texture) => texture.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  renderer.dispose();
  renderer.domElement.remove();
}

export async function createIsland(
  host: HTMLElement,
  onContextLost: () => void,
): Promise<IslandScene> {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.touchAction = "pan-y";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 80);
  const world = new THREE.Group();
  world.rotation.y = -0.22;
  scene.add(world);
  scene.add(new THREE.HemisphereLight("#fff0dd", "#5f4f96", 1.8));
  const sun = new THREE.DirectionalLight("#ffd4ac", 3.3);
  sun.position.set(-5, 9, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -8,
    right: 8,
    top: 8,
    bottom: -8,
    far: 30,
  });
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#92fdff", 1.7);
  rim.position.set(5, 3, -5);
  scene.add(rim);

  const materials = {
    grass: new THREE.MeshStandardMaterial({ color: "#89c6a1", roughness: 0.9 }),
    rock: new THREE.MeshStandardMaterial({
      color: "#8d82b3",
      roughness: 0.85,
      flatShading: true,
    }),
    stone: new THREE.MeshStandardMaterial({ color: "#fff1cc", roughness: 0.8 }),
    purple: new THREE.MeshStandardMaterial({
      color: "#725cbd",
      roughness: 0.38,
    }),
    orange: new THREE.MeshStandardMaterial({
      color: "#ff922f",
      roughness: 0.48,
    }),
    peach: new THREE.MeshStandardMaterial({ color: "#ffc29b", roughness: 0.6 }),
    leaf: new THREE.MeshStandardMaterial({ color: "#237e6f", roughness: 0.7 }),
    dark: new THREE.MeshStandardMaterial({ color: "#231f4c", roughness: 0.4 }),
    glow: new THREE.MeshStandardMaterial({
      color: "#fff0ba",
      emissive: "#ff9e42",
      emissiveIntensity: 0.85,
    }),
    pink: new THREE.MeshStandardMaterial({ color: "#f278ba", roughness: 0.6 }),
  };
  function mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: [number, number, number],
    scale?: [number, number, number],
    parent: THREE.Object3D = world,
  ) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...position);
    if (scale) object.scale.set(...scale);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const roundBox = new RoundedBoxGeometry(1, 1, 1, 3, 0.1);
  const pebble = new THREE.IcosahedronGeometry(1, 1);
  let seed = 27;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  const terrain = new THREE.CylinderGeometry(3.9, 3.3, 0.65, 64, 1);
  const points = terrain.attributes.position;
  for (let i = 0; i < points.count; i++) {
    const x = points.getX(i),
      z = points.getZ(i);
    const a = Math.atan2(z, x);
    const variation = 1 + 0.035 * Math.sin(a * 7) + 0.035 * Math.cos(a * 3);
    points.setXYZ(i, x * variation, points.getY(i), z * variation * 0.8);
  }
  terrain.computeVertexNormals();
  mesh(terrain, materials.grass, [0, -0.28, 0]);
  mesh(
    new THREE.ConeGeometry(3.5, 2.8, 9, 2),
    materials.rock,
    [0, -1.7, 0],
    [1, -1, 0.82],
  );
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI * 2) / 16;
    mesh(
      pebble,
      i % 3 ? materials.rock : materials.peach,
      [Math.cos(a) * 3.2, -0.5 - random() * 0.3, Math.sin(a) * 2.6],
      [0.45 + random() * 0.4, 0.5, 0.5],
    );
  }

  const arch = new THREE.Shape();
  arch.moveTo(-1.7, 0);
  arch.lineTo(-1.7, 2.3);
  arch.absarc(0, 2.3, 1.7, Math.PI, 0, true);
  arch.lineTo(1.7, 0);
  arch.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-1.21, 0.05);
  hole.lineTo(1.21, 0.05);
  hole.lineTo(1.21, 2.3);
  hole.absarc(0, 2.3, 1.21, 0, Math.PI, false);
  hole.lineTo(-1.21, 0.05);
  arch.holes.push(hole);
  mesh(
    new THREE.ExtrudeGeometry(arch, {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: 3,
      curveSegments: 28,
    }),
    materials.stone,
    [0, 0.04, -1.2],
  );
  const portalShape = new THREE.Shape();
  portalShape.moveTo(-1.2, 0.08);
  portalShape.lineTo(1.2, 0.08);
  portalShape.lineTo(1.2, 2.3);
  portalShape.absarc(0, 2.3, 1.2, 0, Math.PI, false);
  portalShape.lineTo(-1.2, 0.08);
  const portalMaterial = new THREE.MeshStandardMaterial({
    color: "#f7b1d9",
    emissive: "#f082b6",
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide,
  });
  const portal = mesh(
    new THREE.ShapeGeometry(portalShape, 28),
    portalMaterial,
    [0, 0.04, -0.94],
  );
  portal.castShadow = false;
  const textureLoader = new THREE.TextureLoader();
  let cinemaTexture: THREE.Texture;
  try {
    cinemaTexture = await textureLoader.loadAsync(
      new URL("art/cinema.webp", document.baseURI).href,
    );
  } catch (error) {
    releaseScene(scene, renderer);
    throw error;
  }
  cinemaTexture.colorSpace = THREE.SRGBColorSpace;
  // Map the arch's local x/y coordinates into the landscape image.
  const uv = portal.geometry.attributes.uv;
  const pos = portal.geometry.attributes.position;
  for (let i = 0; i < uv.count; i++)
    uv.setXY(i, (pos.getX(i) + 1.2) / 2.4, pos.getY(i) / 3.55);
  portalMaterial.map = cinemaTexture;
  portalMaterial.emissiveMap = cinemaTexture;
  portalMaterial.emissive.set("#ffffff");
  portalMaterial.needsUpdate = true;
  for (let i = 0; i < 6; i++) {
    const z = 2.8 - i * 0.58;
    const step = mesh(
      new THREE.CylinderGeometry(0.5, 0.56, 0.13, 7),
      materials.stone,
      [Math.sin(i * 0.9) * 0.18, 0.1, z],
      [1, 1, 0.7],
    );
    step.rotation.y = i * 0.4;
  }

  const arcade = new THREE.Group();
  arcade.position.set(-2.1, 0.1, 0.35);
  arcade.rotation.y = 0.28;
  world.add(arcade);
  mesh(roundBox, materials.purple, [0, 0.8, 0], [0.88, 1.55, 0.85], arcade);
  mesh(roundBox, materials.purple, [0, 1.75, 0.07], [1.0, 0.28, 0.94], arcade);
  mesh(roundBox, materials.dark, [0, 1.15, 0.44], [0.73, 0.65, 0.08], arcade);
  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 128;
  screenCanvas.height = 128;
  const ctx = screenCanvas.getContext("2d")!;
  ctx.fillStyle = "#142b64";
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = "#fa94b8";
  ctx.beginPath();
  ctx.arc(90, 30, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#9fd9d7";
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(42, 40);
  ctx.lineTo(82, 95);
  ctx.lineTo(107, 64);
  ctx.lineTo(128, 85);
  ctx.lineTo(128, 128);
  ctx.lineTo(0, 128);
  ctx.fill();
  ctx.fillStyle = "#fff8c5";
  ctx.font = "bold 19px monospace";
  ctx.textAlign = "center";
  ctx.fillText("PLAY?", 64, 112);
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  mesh(
    new THREE.PlaneGeometry(0.64, 0.55),
    new THREE.MeshBasicMaterial({ map: screenTexture }),
    [0, 1.15, 0.49],
    undefined,
    arcade,
  );
  const desk = mesh(
    roundBox,
    materials.peach,
    [0, 0.75, 0.5],
    [0.92, 0.15, 0.38],
    arcade,
  );
  desk.rotation.x = 0.12;
  mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.22),
    materials.dark,
    [-0.2, 0.9, 0.57],
    undefined,
    arcade,
  );
  mesh(
    sphere,
    materials.orange,
    [-0.2, 1.02, 0.57],
    [0.08, 0.08, 0.08],
    arcade,
  );
  mesh(sphere, materials.pink, [0.15, 0.86, 0.58], [0.08, 0.03, 0.08], arcade);
  mesh(
    sphere,
    materials.glow,
    [0.32, 0.86, 0.58],
    [0.065, 0.03, 0.065],
    arcade,
  );

  const citrus = new THREE.Group();
  citrus.position.set(2.0, 1.05, 0.5);
  world.add(citrus);
  mesh(sphere, materials.orange, [0, 0, 0], [0.87, 1.0, 0.87], citrus);
  const leaf = mesh(
    sphere,
    materials.leaf,
    [0.18, 0.93, 0],
    [0.43, 0.11, 0.2],
    citrus,
  );
  leaf.rotation.z = 0.6;
  mesh(
    sphere,
    materials.dark,
    [-0.23, 0.1, 0.79],
    [0.045, 0.07, 0.035],
    citrus,
  );
  mesh(sphere, materials.dark, [0.23, 0.1, 0.79], [0.045, 0.07, 0.035], citrus);
  const orbit = mesh(
    new THREE.TorusGeometry(1.25, 0.022, 8, 80),
    materials.glow,
    [0, -0.1, 0],
    undefined,
    citrus,
  );
  orbit.rotation.x = 1.1;
  orbit.rotation.y = 0.3;
  mesh(sphere, materials.pink, [1.19, -0.36, 0.2], [0.14, 0.14, 0.14], citrus);
  mesh(roundBox, materials.stone, [2, 0.1, 0.5], [1.4, 0.22, 1.1]);

  const grass = new THREE.ConeGeometry(0.06, 0.35, 4);
  for (let i = 0; i < 110; i++) {
    const x = (random() - 0.5) * 7.0,
      z = (random() - 0.5) * 5.4;
    if (
      (x * x) / 12 + (z * z) / 6.7 > 1 ||
      Math.abs(x) < 0.6 ||
      (x < -1.5 && z > -0.2 && z < 1.2) ||
      (x > 1 && z > -0.5 && z < 1.5)
    )
      continue;
    if (i % 3 === 0) {
      const stem = mesh(
        new THREE.CylinderGeometry(0.015, 0.02, 0.4),
        materials.leaf,
        [x, 0.24, z],
      );
      mesh(
        sphere,
        i % 2 ? materials.pink : materials.glow,
        [x, stem.position.y + 0.22, z],
        [0.09, 0.065, 0.09],
      );
    } else {
      const tuft = mesh(grass, materials.leaf, [x, 0.18, z]);
      tuft.rotation.z = (random() - 0.5) * 0.5;
    }
  }
  // Cascading vines and a few detached islands make a recognizable floating silhouette.
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    for (let j = 0; j < 5; j++)
      mesh(
        sphere,
        materials.leaf,
        [Math.cos(a) * (3.65 - j * 0.04), -0.25 - j * 0.23, Math.sin(a) * 2.7],
        [0.13, 0.18, 0.13],
      );
  }
  const satellites: THREE.Group[] = [];
  for (let i = 0; i < 5; i++) {
    const group = new THREE.Group(),
      a = (i * Math.PI * 2) / 5;
    group.position.set(
      Math.cos(a) * 5.0,
      -1.0 + (i % 2) * 1.5,
      Math.sin(a) * 3.8,
    );
    mesh(pebble, materials.rock, [0, 0, 0], [0.42, 0.55, 0.4], group);
    mesh(
      new THREE.CylinderGeometry(0.43, 0.3, 0.12, 7),
      materials.grass,
      [0, 0.32, 0],
      undefined,
      group,
    );
    world.add(group);
    satellites.push(group);
  }
  const sparkGeometry = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(40 * 3);
  for (let i = 0; i < sparkPositions.length; i++)
    sparkPositions[i] = (random() - 0.5) * 14;
  sparkGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(sparkPositions, 3),
  );
  const sparkles = new THREE.Points(
    sparkGeometry,
    new THREE.PointsMaterial({
      color: "#fff4bd",
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    }),
  );
  world.add(sparkles);

  let yaw = 0,
    time = 0,
    last = 0,
    request = 0,
    visible = true,
    paused = false,
    launchTime = -10,
    disposed = false;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function render() {
    renderer.render(scene, camera);
    host.dataset.frames = String(Number(host.dataset.frames ?? 0) + 1);
  }
  function frame(now: number) {
    request = 0;
    if (disposed || paused || motion.matches || !visible || document.hidden)
      return;
    if (last && now - last < 1000 / 30) {
      request = requestAnimationFrame(frame);
      return;
    }
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    time += delta;
    world.position.y = Math.sin(time * 0.75) * 0.075;
    citrus.rotation.y = Math.sin(time * 0.45) * 0.12;
    const jump = time - launchTime;
    citrus.position.y =
      1.05 + (jump < 1.5 ? Math.sin((jump / 1.5) * Math.PI) * 2.1 : 0);
    if (jump < 1.5) citrus.rotation.z = (jump / 1.5) * Math.PI * 2;
    else citrus.rotation.z = 0;
    satellites.forEach((object, i) => {
      object.rotation.y += delta * 0.12;
      object.position.y += Math.sin(time + i) * delta * 0.045;
    });
    sparkles.rotation.y = time * 0.035;
    render();
    request = window.requestAnimationFrame(frame);
  }
  function updateLoop() {
    if (request) cancelAnimationFrame(request);
    request = 0;
    last = 0;
    const animate =
      !disposed && !paused && !motion.matches && visible && !document.hidden;
    host.dataset.motion = animate ? "running" : "still";
    if (animate) request = requestAnimationFrame(frame);
    else if (!disposed) render();
  }
  function resize() {
    const width = host.clientWidth,
      height = host.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    const distance = width / height < 1 ? 19.5 : 15.7;
    camera.position.set(
      Math.sin(yaw) * distance,
      distance * 0.56,
      Math.cos(yaw) * distance,
    );
    camera.lookAt(0, 0.6, 0);
    camera.updateProjectionMatrix();
    render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateLoop();
  });
  intersection.observe(host);
  const visibility = () => updateLoop();
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", updateLoop);
  let pointerX: number | null = null;
  function pointerDown(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    pointerX = event.clientX;
    renderer.domElement.setPointerCapture(event.pointerId);
  }
  function pointerMove(event: PointerEvent) {
    if (pointerX === null) return;
    yaw += (event.clientX - pointerX) * 0.006;
    pointerX = event.clientX;
    resize();
  }
  function pointerUp() {
    pointerX = null;
  }
  function lost(event: Event) {
    event.preventDefault();
    onContextLost();
  }
  renderer.domElement.addEventListener("pointerdown", pointerDown);
  renderer.domElement.addEventListener("pointermove", pointerMove);
  renderer.domElement.addEventListener("pointerup", pointerUp);
  renderer.domElement.addEventListener("pointercancel", pointerUp);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  resize();
  updateLoop();
  return {
    rotate(direction) {
      yaw += direction * 0.3;
      resize();
    },
    launch() {
      launchTime = time;
      if (motion.matches || paused) {
        citrus.rotation.y += Math.PI / 3;
        render();
      }
    },
    setPaused(value) {
      paused = value;
      updateLoop();
    },
    dispose() {
      disposed = true;
      host.dataset.motion = "still";
      if (request) cancelAnimationFrame(request);
      resizeObserver.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", updateLoop);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      releaseScene(scene, renderer);
    },
  };
}
