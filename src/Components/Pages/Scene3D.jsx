import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Estilo para garantir que o container ocupe a tela toda
const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#111",
  overflow: "hidden",
};
const canvasStyle = {
  width: "80vw",
  height: "80vh",
  maxWidth: "1200px",
  maxHeight: "90vh",
  borderRadius: "16px",
  boxShadow: "0 0 32px #000a",
  background: "#222",
};

const Scene3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // === 1. SETUP DA CENA ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    // A posição da câmera será ajustada dinamicamente
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const setRendererSize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    setRendererSize();

    // REMOVEMOS a linha 'renderer.setClearColor(0x222222);' daqui

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    currentMount.appendChild(renderer.domElement);

    // === 2. SKYBOX (CÓDIGO ADICIONADO) ===
    let skyboxLoaded = false;
    try {
      const cubeTextureLoader = new THREE.CubeTextureLoader();
      cubeTextureLoader.setPath("/skybox/");
      const skyboxTexture = cubeTextureLoader.load(
        ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        () => {
          skyboxLoaded = true;
          scene.background = skyboxTexture;
          scene.environment = skyboxTexture;
        },
        undefined,
        (err) => {
          console.error("Erro ao carregar skybox:", err);
          skyboxLoaded = false;
          scene.background = new THREE.Color(0xeeeeee);
        }
      );
      // fallback imediato caso as imagens estejam erradas
      setTimeout(() => {
        if (!skyboxLoaded) scene.background = new THREE.Color(0xeeeeee);
      }, 2000);
    } catch (e) {
      scene.background = new THREE.Color(0xeeeeee);
    }

    // === 3. ILUMINAÇÃO E AJUDA VISUAL ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 16);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(10, 15, 7.5);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 6);
    directionalLight2.position.set(-10, -10, 10);
    scene.add(directionalLight2);
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    // === 4. CARREGAR O MODELO 3D ===
    let model;
    let box, center, size, distance;
    const adjustCameraAndModel = () => {
      if (model) {
        box = new THREE.Box3().setFromObject(model);
        center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        size = box.getSize(new THREE.Vector3()).length();
        const fitHeightDistance =
          size / (2 * Math.atan((Math.PI * camera.fov) / 360));
        const fitWidthDistance =
          size / (2 * camera.aspect * Math.atan((Math.PI * camera.fov) / 360));
        distance = Math.max(fitHeightDistance, fitWidthDistance);
        camera.position.set(0, 0, distance * 1.2);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }
    };
    const loader = new GLTFLoader();
    loader.load(
      "/models/card_deck_suits.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.05, 0.05, 0.05);
        scene.add(model);
        adjustCameraAndModel();
        console.log("Modelo carregado, centralizado e câmera ajustada!");
      },
      undefined,
      (error) => console.error("Erro ao carregar o modelo:", error)
    );

    // === 5. INTERATIVIDADE ===
    const keysPressed = {};
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraTheta = 0; // ângulo horizontal
    let cameraPhi = Math.PI / 2; // ângulo vertical (PI/2 = plano horizontal)
    const cameraRadius = () => (distance ? distance * 1.2 : 50);

    const handleKeyDown = (event) => {
      keysPressed[event.key.toLowerCase()] = true;
    };
    const handleKeyUp = (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    };
    const handleMouseDown = (event) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };
    const handleMouseUp = () => {
      isDragging = false;
    };
    const handleMouseMove = (event) => {
      if (!isDragging) return;
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;
      previousMousePosition = { x: event.clientX, y: event.clientY };
      // Ajusta os ângulos
      cameraTheta -= deltaX * 0.01;
      cameraPhi -= deltaY * 0.01;
      // Limita a elevação para não virar de cabeça para baixo
      cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraPhi));
      updateCameraPosition();
    };
    function updateCameraPosition() {
      const r = cameraRadius();
      const x = r * Math.sin(cameraPhi) * Math.sin(cameraTheta);
      const y = r * Math.cos(cameraPhi);
      const z = r * Math.sin(cameraPhi) * Math.cos(cameraTheta);
      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }

    // Inicializa a posição da câmera
    updateCameraPosition();

    const handleResize = () => {
      if (currentMount) {
        setRendererSize();
        adjustCameraAndModel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // === 6. LOOP DE ANIMAÇÃO ===
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (model) {
        if (keysPressed["a"]) model.rotation.y += 0.02;
        if (keysPressed["d"]) model.rotation.y -= 0.02;
        if (keysPressed["w"]) model.rotation.x += 0.02;
        if (keysPressed["s"]) model.rotation.x -= 0.02;
      }
      renderer.render(scene, camera);
    };
    animate();

    // === 7. LIMPEZA (CLEANUP) ===
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div ref={mountRef} style={canvasStyle} />
    </div>
  );
};

export default Scene3D;
