// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Get the scrollable container
            const scrollContainer = document.querySelector('.scrollable-main-content');
            if (scrollContainer) {
                // Calculate the target scroll position relative to the container
                // Adjust for sticky navbar if necessary, but with scroll-snap, it often aligns
                const targetOffset = targetElement.offsetTop - scrollContainer.offsetTop;
                scrollContainer.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for general smooth scroll if scrollable-main-content not found
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    root: document.querySelector('.scrollable-main-content') // Observe within the scrollable area
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Optional: reset animation when not intersecting if you want it to re-animate on scroll back
            // entry.target.style.opacity = '0';
            // entry.target.style.transform = 'translateY(50px)';
        }
    });
}, observerOptions);

// Observe all software cards (and other scroll-snap-items)
document.querySelectorAll('.software-card, .resources-section, .footer').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});


// Navbar scroll effect (existing code, might need adjustment for new layout)
// This might be less relevant with the sticky navbar within the scrollable content,
// but keeping it for now if you want to apply effects based on overall scroll.
window.addEventListener('scroll', () => {
    // This listener is for the overall window scroll, not the scrollable-main-content
    // If you want effects on the navbar-scroll, you'd listen to the scrollable-main-content's scroll event.
});


// Video lazy loading
const videos = document.querySelectorAll('iframe');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            // Add loading animation
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                iframe.style.opacity = '1';
            }, 300);
            
            videoObserver.unobserve(iframe);
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    videoObserver.observe(video);
});

// Search functionality (basic implementation)
function addSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="search-input" placeholder="Search software..." />
        <button id="search-btn"><i class="fas fa-search"></i></button>
    `;
    
    // This part needs to be adjusted based on where you want the search bar.
    // If you want it in the fixed sidebar, target that element.
    // Example: const sidebar = document.querySelector('.fixed-sidebar');
    // sidebar.appendChild(searchContainer);
    
    const searchInput = document.getElementById('search-input');
    const softwareCards = document.querySelectorAll('.software-card');
    
    if (searchInput) { // Check if searchInput exists before adding listener
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            softwareCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.software-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex'; // Changed from grid to flex due to new card styling
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Contact form handling (if form is added)
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.success) {
                    // Replaced alert with a custom message box
                    showMessageBox('Thank you for your message! We will get back to you soon.');
                    form.reset();
                } else {
                    showMessageBox('Error: ' + result.error);
                }
            } catch (error) {
                console.error('Error submitting contact form:', error);
                showMessageBox('An error occurred while submitting the form.');
            }
        });
    }
}

// Custom Message Box (replaces alert())
function showMessageBox(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'custom-message-box';
    messageBox.innerHTML = `
        <p>${message}</p>
        <button class="close-message-box">OK</button>
    `;
    document.body.appendChild(messageBox);

    const closeButton = messageBox.querySelector('.close-message-box');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(messageBox);
    });

    // Optional: Auto-hide after some time
    setTimeout(() => {
        if (document.body.contains(messageBox)) {
            document.body.removeChild(messageBox);
        }
    }, 5000); // Hide after 5 seconds
}

// --- Three.js Background Animation ---
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    const canvas = document.getElementById('backgroundCanvas');

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xcccccc, 0.0002); // Subtle fog

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    const particleCount = 2000; // Number of particles
    const spread = 2000; // How far particles spread

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * spread - spread / 2;
        const y = Math.random() * spread - spread / 2;
        const z = Math.random() * spread - spread / 2;
        vertices.push(x, y, z);

        // Assign random colors
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5 + Math.random() * 0.2); // Hues of blue/purple/pink
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 3, // Size of particles
        vertexColors: true, // Use colors from geometry
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending // For glow effect
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5; // Reduce sensitivity
    mouseY = (event.clientY - windowHalfY) * 0.5;
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = (event.touches[0].pageX - windowHalfX) * 0.5;
        mouseY = (event.touches[0].pageY - windowHalfY) * 0.5;
    }
}

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    // Animate camera
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('PoL Data Management Tools page loaded');
    addSearchFunctionality(); // Call search functionality if needed
    handleContactForm(); // Call contact form handling if needed

    // Initialize Three.js background
    initThreeJS();
    animateThreeJS();
});