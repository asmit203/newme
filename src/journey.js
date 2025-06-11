// journey.js - Handles the interactive timeline for Life Story and Education
import './journey.css';

const timelineData = {
    life: [
        {
            year: '1998',
            text: 'Born in Kolkata, India. The journey begins!',
            img: './gallery/gallery-1.jpg'
        },
        {
            year: '2005',
            text: 'First computer. Discovered a love for technology and creativity.',
            img: './gallery/gallery-2.jpg'
        },
        {
            year: '2015',
            text: 'Graduated high school, started exploring coding and design.',
            img: './gallery/gallery-3.jpg'
        },
        {
            year: '2020',
            text: 'Began PhD journey, blending science, art, and technology.',
            img: './gallery/gallery-4.jpg'
        }
    ],
    education: [
        {
            year: '2015',
            text: 'High School Graduation - Top of the class.',
            img: './gallery/gallery-1.jpg'
        },
        {
            year: '2018',
            text: 'BSc in Physics, University of Calcutta.',
            img: './gallery/gallery-2.jpg'
        },
        {
            year: '2020',
            text: 'MSc in Physics, IIT Kharagpur.',
            img: './gallery/gallery-3.jpg'
        },
        {
            year: '2022',
            text: 'Started PhD in Computational Neuroscience.',
            img: './gallery/gallery-4.jpg'
        }
    ]
};

// Setup hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

const choiceSection = document.querySelector('.journey-choice-section');
const timelineSection = document.querySelector('.journey-timeline-section');
const canvas = document.getElementById('journey-canvas');
const overlay = document.getElementById('timeline-overlay');

let selectedTimeline = 'life';
let timeline = [];
let currentIndex = 0;

function showTimeline(type) {
    selectedTimeline = type;
    timeline = timelineData[type];
    choiceSection.style.display = 'none';
    timelineSection.style.display = 'block';
    currentIndex = 0;
    renderTimeline();
}

document.getElementById('life-btn').onclick = () => showTimeline('life');
document.getElementById('edu-btn').onclick = () => showTimeline('education');

function renderTimeline() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw timeline line
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 100);
    ctx.lineTo(canvas.width / 2, canvas.height - 100);
    ctx.stroke();
    ctx.restore();

    // Draw all previous entries faded, current entry with 3D flip
    timeline.forEach((entry, i) => {
        const y = canvas.height - 180 - (currentIndex - i) * 320;
        if (i < currentIndex) {
            // Faded previous
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 28px Inter';
            ctx.fillText(entry.year, canvas.width / 2 - 120, y);
            ctx.font = '20px Inter';
            ctx.fillText(entry.text, canvas.width / 2 - 120, y + 40);
            ctx.restore();
        } else if (i === currentIndex) {
            // 3D flip effect for current
            drawFlipCard(ctx, entry, y, 1);
        } else if (i === currentIndex + 1) {
            // Next card, slightly visible
            drawFlipCard(ctx, entry, y + 60, 0.3);
        }
    });

    // Overlay image and text for current entry
    overlay.innerHTML = '';
    const entry = timeline[currentIndex];
    if (entry) {
        const card = document.createElement('div');
        card.className = 'timeline-card';
        card.innerHTML = `<img src="${entry.img}" alt="${entry.year}"/><div class="timeline-card-text"><h2>${entry.year}</h2><p>${entry.text}</p></div>`;
        overlay.appendChild(card);
        card.classList.add('flip-in');
    }
}

function drawFlipCard(ctx, entry, y, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.strokeStyle = 'rgba(0,212,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 180, y - 60);
    ctx.lineTo(canvas.width / 2 + 180, y - 60);
    ctx.lineTo(canvas.width / 2 + 180, y + 120);
    ctx.lineTo(canvas.width / 2 - 180, y + 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

window.addEventListener('wheel', (e) => {
    if (!timeline.length) return;
    if (e.deltaY > 0 && currentIndex < timeline.length - 1) {
        currentIndex++;
        renderTimeline();
    } else if (e.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
        renderTimeline();
    }
});

window.addEventListener('resize', renderTimeline);
