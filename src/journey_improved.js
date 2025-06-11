// Modern 3D Journey Page with smooth animations and interactions
import './journey_improved.css';
import * as THREE from 'three';

// Timeline data for Life Story and Education sections
const timelineData = {
    life: [
        {
            year: '1998',
            title: 'The Beginning',
            text: 'Born in Kolkata, India. The journey begins!',
            img: './gallery/gallery-1.jpg'
        },
        {
            year: '2005',
            title: 'Digital Discovery',
            text: 'First computer. Discovered a love for technology and creativity that would shape my future interests and career path.',
            img: './gallery/gallery-2.jpg'
        },
        {
            year: '2015',
            title: 'Academic Milestone',
            text: 'Graduated high school with honors, started exploring coding and design as potential career paths.',
            img: './gallery/gallery-3.jpg'
        },
        {
            year: '2020',
            title: 'Professional Growth',
            text: 'Began PhD journey, blending science, art, and technology to explore new frontiers in research and innovation.',
            img: './gallery/gallery-4.jpg'
        }
    ],
    education: [
        {
            year: '2015',
            title: 'High School',
            text: 'Graduated top of the class with honors in mathematics and sciences, laying the foundation for my academic journey.',
            img: './gallery/gallery-1.jpg'
        },
        {
            year: '2018',
            title: 'Bachelor\'s Degree',
            text: 'Earned BSc in Physics from University of Calcutta, focusing on computational methods and theoretical frameworks.',
            img: './gallery/gallery-2.jpg'
        },
        {
            year: '2020',
            title: 'Master\'s Degree',
            text: 'Completed MSc in Physics at IIT Kharagpur with specialization in quantum mechanics and advanced mathematical methods.',
            img: './gallery/gallery-3.jpg'
        },
        {
            year: '2022',
            title: 'Doctoral Research',
            text: 'Started PhD in Computational Neuroscience, investigating the intersection of mathematics, physics, and biology.',
            img: './gallery/gallery-4.jpg'
        }
    ]
};

// Setup hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Initialize the 3D background scene
    initBackgroundScene();

    // Set up the journey interaction
    setupJourneyInteraction();
});

// 3D Background Scene with Three.js
let scene, camera, renderer, particles, animationId;

function initBackgroundScene() {
    scene = new THREE.Scene();

    // Setup camera with perspective
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Setup WebGL renderer with alpha for transparency
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('journey-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Add particle system for background effect
    createParticleSystem();

    // Animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function createParticleSystem() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;

    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    // Create position and scale data for particles
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position particles in a 3D space
        posArray[i] = (Math.random() - 0.5) * 200;      // X
        posArray[i + 1] = (Math.random() - 0.5) * 200;    // Y
        posArray[i + 2] = (Math.random() - 0.5) * 200;    // Z

        // Random scale for each particle
        scaleArray[i / 3] = Math.random();
    }

    // Set attributes for the geometry
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Create particle material with custom shader for better performance
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.5,
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create the particle system
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

function animate() {
    animationId = requestAnimationFrame(animate);

    // Rotate and move particles slightly for floating effect
    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0002;

    // Move camera slightly based on mouse position for parallax effect
    if (mouseX && mouseY) {
        camera.position.x += (mouseX - camera.position.x) * 0.01;
        camera.position.y += (-mouseY - camera.position.y) * 0.01;
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

// Track mouse movement for parallax effect
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
});

// Main journey interaction setup
let selectedTimeline = null;
let currentIndex = 0;
let isTransitioning = false;

function setupJourneyInteraction() {
    const lifeBtn = document.getElementById('life-btn');
    const eduBtn = document.getElementById('edu-btn');
    const choiceSection = document.querySelector('.journey-choice-section');
    const timelineSection = document.querySelector('.journey-timeline-section');

    lifeBtn.addEventListener('click', () => showTimeline('life', choiceSection, timelineSection));
    eduBtn.addEventListener('click', () => showTimeline('education', choiceSection, timelineSection));

    // Handle touch events for mobile swiping
    let touchStartY;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
        if (!selectedTimeline || isTransitioning) return;

        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < timelineData[selectedTimeline].length - 1) {
                nextTimelineItem();
                touchStartY = touchY;
            } else if (diff < 0 && currentIndex > 0) {
                prevTimelineItem();
                touchStartY = touchY;
            }
        }
    });

    // Handle mouse wheel for scrolling through timeline
    document.addEventListener('wheel', (e) => {
        if (!selectedTimeline || isTransitioning) return;

        if (e.deltaY > 0 && currentIndex < timelineData[selectedTimeline].length - 1) {
            nextTimelineItem();
        } else if (e.deltaY < 0 && currentIndex > 0) {
            prevTimelineItem();
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!selectedTimeline) return;

        if (e.key === 'ArrowDown' && currentIndex < timelineData[selectedTimeline].length - 1) {
            nextTimelineItem();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            prevTimelineItem();
        } else if (e.key === 'Escape') {
            returnToChoice();
        }
    });
}

function showTimeline(type, choiceSection, timelineSection) {
    selectedTimeline = type;
    currentIndex = 0;
    isTransitioning = true;

    // Create timeline container if it doesn't exist
    let timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) {
        timelineContainer = document.createElement('div');
        timelineContainer.id = 'timeline-container';
        timelineSection.appendChild(timelineContainer);

        // Add timeline vertical line
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline-vertical-line';
        timelineContainer.appendChild(timelineLine);

        // Add controls
        const controls = document.createElement('div');
        controls.className = 'timeline-controls';

        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&uarr;';
        prevBtn.addEventListener('click', prevTimelineItem);

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&darr;';
        nextBtn.addEventListener('click', nextTimelineItem);

        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.innerHTML = '&larr;';
        backBtn.addEventListener('click', returnToChoice);

        controls.appendChild(prevBtn);
        controls.appendChild(backBtn);
        controls.appendChild(nextBtn);
        timelineSection.appendChild(controls);

        // Add progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'timeline-progress';
        timelineSection.appendChild(progressBar);
    }

    // Fade out choice section
    choiceSection.style.opacity = '0';
    setTimeout(() => {
        choiceSection.style.display = 'none';
        timelineSection.style.display = 'block';

        // Reset timeline container
        const timelineContainer = document.getElementById('timeline-container');
        timelineContainer.innerHTML = '<div class="timeline-vertical-line"></div>';

        // Render timeline
        renderTimelineItems();

        // Fade in timeline section
        setTimeout(() => {
            timelineSection.style.opacity = '1';
            isTransitioning = false;
        }, 100);
    }, 600);
}

function renderTimelineItems() {
    const timeline = timelineData[selectedTimeline];
    const timelineContainer = document.getElementById('timeline-container');

    // Update progress bar
    const progressBar = document.querySelector('.timeline-progress');
    const progress = ((currentIndex + 1) / timeline.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Clear existing timeline dots
    const existingDots = document.querySelectorAll('.timeline-dot');
    existingDots.forEach(dot => dot.remove());

    // Add timeline dots for navigation
    timeline.forEach((item, index) => {
        const dot = document.createElement('div');
        dot.className = `timeline-dot${index === currentIndex ? ' active' : ''}`;
        dot.style.top = `${150 + index * 300}px`;
        dot.addEventListener('click', () => {
            if (index !== currentIndex) {
                currentIndex = index;
                renderTimelineItems();
            }
        });
        timelineContainer.appendChild(dot);
    });

    // Create or update timeline card
    let card = document.querySelector('.timeline-card-wrapper');
    if (!card) {
        card = document.createElement('div');
        card.className = 'timeline-card-wrapper timeline-entrance';
        timelineContainer.appendChild(card);
    } else {
        card.innerHTML = '';
    }

    const currentItem = timeline[currentIndex];
    const timelineCard = document.createElement('div');
    timelineCard.className = 'timeline-card';

    timelineCard.innerHTML = `
        <div class="timeline-card-img">
            <img src="${currentItem.img}" alt="${currentItem.title}">
        </div>
        <div class="timeline-card-content">
            <div class="timeline-year-badge">${currentItem.year}</div>
            <h3>${currentItem.title}</h3>
            <p>${currentItem.text}</p>
        </div>
    `;

    card.appendChild(timelineCard);
}

function nextTimelineItem() {
    if (isTransitioning || currentIndex >= timelineData[selectedTimeline].length - 1) return;

    isTransitioning = true;
    currentIndex++;

    const card = document.querySelector('.timeline-card-wrapper');
    card.style.opacity = '0';
    card.style.transform = 'translateY(-50px)';

    setTimeout(() => {
        renderTimelineItems();
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        isTransitioning = false;
    }, 400);
}

function prevTimelineItem() {
    if (isTransitioning || currentIndex <= 0) return;

    isTransitioning = true;
    currentIndex--;

    const card = document.querySelector('.timeline-card-wrapper');
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';

    setTimeout(() => {
        renderTimelineItems();
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        isTransitioning = false;
    }, 400);
}

function returnToChoice() {
    isTransitioning = true;
    const choiceSection = document.querySelector('.journey-choice-section');
    const timelineSection = document.querySelector('.journey-timeline-section');

    timelineSection.style.opacity = '0';
    setTimeout(() => {
        timelineSection.style.display = 'none';
        choiceSection.style.display = 'flex';

        setTimeout(() => {
            choiceSection.style.opacity = '1';
            selectedTimeline = null;
            isTransitioning = false;
        }, 100);
    }, 600);
}

// Create particles on mouse move
document.addEventListener('mousemove', createParticle);

function createParticle(e) {
    if (!selectedTimeline) return; // Only create particles in timeline view

    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 8 + 3;
    const duration = Math.random() * 1.5 + 1;
    const opacity = Math.random() * 0.5 + 0.3;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;

    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;

    particle.style.animation = `fadeOut ${duration}s ease-out forwards`;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% { transform: translate(0, 0); opacity: var(--initial-opacity); }
        100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 20}px); opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
