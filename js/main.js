document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicControl = document.getElementById('musicControl');
    let isMusicPlaying = false;

    // Function to handle music toggle
    function toggleMusic() {
        if (isMusicPlaying) {
            music.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            music.play();
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // Add click event listener to music control button
    musicControl.addEventListener('click', toggleMusic);

    // Add auto-play with user interaction
    document.addEventListener('click', function initAudio() {
        if (!isMusicPlaying) {
            toggleMusic();
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
});

onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    // Three.js setup with responsive sizing
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Function to handle responsive sizing
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Adjust text size based on screen width - increased scale for better visibility
      const textScale = width < 768 ? 0.5 : 0.7; // Increased from 0.4 to 0.5 for mobile
      if (textMesh) textMesh.scale.set(textScale, textScale, textScale);
      
      // Adjust camera position based on screen width
      camera.position.z = width < 768 ? 18 : 15; // Reduced from 20 to 18 for mobile
      camera.position.y = width < 768 ? 2 : 1;
      
      // Update renderer and camera
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('textContainer').appendChild(renderer.domElement);

    let textMesh; // Declare textMesh in broader scope

    // Create 3D text
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
      const textGeometry = new THREE.TextGeometry('Happy Valentine\'s Day Babe', {
        font: font,
        size: window.innerWidth < 768 ? 1.2 : 1,    // Increased size for mobile
        height: window.innerWidth < 768 ? 0.4 : 0.3, // Increased depth for mobile
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: window.innerWidth < 768 ? 0.03 : 0.02, // Increased thickness for mobile
        bevelSize: window.innerWidth < 768 ? 0.02 : 0.01,      // Increased bevel for mobile
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Update material for bolder appearance
      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff1a1a,
        specular: 0xffffff,
        shininess: window.innerWidth < 768 ? 80 : 100, // Reduced shininess for bolder appearance on mobile
        emissive: 0x330000,                // Added slight emissive for better visibility
        emissiveIntensity: 0.2
      });

      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.center();
      
      // Initial position
      textMesh.position.y = window.innerWidth < 768 ? 3 : 2;
      
      scene.add(textMesh);

      // Add lights
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 0, 1);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      // Initial size update
      updateSize();

      // Animation function
      function animate() {
        requestAnimationFrame(animate);
        textMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      animate();
    });

    // Handle window resize
    window.addEventListener('resize', updateSize);

    clearTimeout(c);
  }, 1000);
};