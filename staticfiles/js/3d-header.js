document.addEventListener('DOMContentLoaded', () => {
    console.log("3D script loaded!");
    const container = document.getElementById('3d-canvas');
    if (!container) {
        console.error("3d-canvas element not found!");
        return;
    }
    console.log("3d-canvas element found, initializing Three.js...");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Pure black background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Mobile Performance Check
    const isMobile = window.innerWidth < 768;

    // 1. AI Flying Data Particles (Neural Points)
    const particleCount = isMobile ? 300 : 800; // Less particles on phone
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        // x, y, z positions
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        // Random flying speed towards camera
        velocities.push(Math.random() * 0.2 + 0.05); 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xFFD700, // Electric Yellow theme color
        size: 0.25,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Flying Tech Shapes (AI Nodes)
    const shapes = [];
    const shapeGeo = new THREE.IcosahedronGeometry(1, 0); // Geometric tech shape
    const shapeMat = new THREE.MeshBasicMaterial({
        color: 0xFFC400, // Slightly lighter/darker yellow
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });

    const shapeCount = isMobile ? 8 : 20; // Less shapes on phone
    for (let i = 0; i < shapeCount; i++) {
        const mesh = new THREE.Mesh(shapeGeo, shapeMat);
        // Scatter shapes randomly
        mesh.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 100
        );
        // Assign random speeds and rotation
        const speed = Math.random() * 0.1 + 0.02;
        const rotX = (Math.random() - 0.5) * 0.02;
        const rotY = (Math.random() - 0.5) * 0.02;
        shapes.push({ mesh, speed, rotX, rotY });
        scene.add(mesh);
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Animate particles flying towards camera
        const positionAttr = particles.geometry.attributes.position;
        const posArray = positionAttr.array;
        
        for (let i = 0; i < particleCount; i++) {
            posArray[i * 3 + 2] += velocities[i]; // Move Z forward
            
            // Reset particle to back if it passes camera
            if (posArray[i * 3 + 2] > 25) {
                posArray[i * 3 + 2] = -50;
            }
        }
        positionAttr.needsUpdate = true;
        
        // Slowly rotate the entire particle field
        particles.rotation.z += 0.0005;

        // Animate 3D tech nodes
        shapes.forEach(shape => {
            shape.mesh.position.z += shape.speed;
            shape.mesh.rotation.x += shape.rotX;
            shape.mesh.rotation.y += shape.rotY;

            // Reset node to back if it passes camera
            if (shape.mesh.position.z > 25) {
                shape.mesh.position.z = -60;
                shape.mesh.position.x = (Math.random() - 0.5) * 80;
                shape.mesh.position.y = (Math.random() - 0.5) * 80;
            }
        });

        renderer.render(scene, camera);
    }

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
});