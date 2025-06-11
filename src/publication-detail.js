// Publication Detail Page JavaScript
import publicationsData from './publications-data.json' assert { type: 'json' };

class PublicationDetailPage {
    constructor() {
        this.publicationId = this.getPublicationIdFromURL();
        this.publicationData = null;
        this.init();
    }

    getPublicationIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    async init() {
        try {
            // Find the publication data
            this.publicationData = publicationsData.publications.find(
                pub => pub.id === this.publicationId
            );

            if (!this.publicationData) {
                this.showErrorPage();
                return;
            }

            // Initialize page components
            this.setupCursor();
            this.setupParticles();
            this.setupThreeJS();
            this.setupIntersectionObserver();
            this.populateContent();
            this.setupNavigation();

            // Hide loading screen after content is loaded
            this.hideLoadingScreen();

            // Update page title
            document.title = `${this.publicationData.title} - Portfolio`;
        } catch (error) {
            console.error('Error initializing publication detail page:', error);
            this.showErrorPage();
        }
    }

    populateContent() {
        // Update hero section
        document.getElementById('publication-icon').textContent = this.publicationData.icon;
        document.getElementById('publication-title').textContent = this.publicationData.title;
        document.getElementById('publication-venue').textContent = this.publicationData.venue;
        document.getElementById('publication-year').textContent = this.publicationData.year;
        document.getElementById('publication-type').textContent = this.publicationData.type;

        // Update status badge
        const statusBadge = document.querySelector('.status-badge');
        statusBadge.textContent = this.publicationData.status;
        statusBadge.className = `status-badge status-${this.publicationData.status.toLowerCase()}`;

        // Update abstract
        document.getElementById('abstract-content').innerHTML = this.formatAbstract(this.publicationData.fullAbstract);

        // Update keywords
        this.populateKeywords();

        // Update authors
        this.populateAuthors();

        // Update links
        this.populateLinks();

        // Update citation
        document.getElementById('citation-text').textContent = this.publicationData.citation;

        // Update sidebar info
        document.getElementById('info-venue').textContent = this.publicationData.venue;
        document.getElementById('info-year').textContent = this.publicationData.year;
        document.getElementById('info-type').textContent = this.publicationData.type;

        // Update gallery
        this.populateGallery();

        // Setup hero image
        this.setupHeroImage();
    }

    formatAbstract(abstract) {
        return abstract.split('\n\n').map(paragraph =>
            `<p>${paragraph}</p>`
        ).join('');
    }

    populateKeywords() {
        const keywordsContainer = document.getElementById('keywords-list');
        keywordsContainer.innerHTML = this.publicationData.keywords.map(keyword =>
            `<span class="keyword-tag">${keyword}</span>`
        ).join('');
    }

    populateAuthors() {
        const authorsContainer = document.getElementById('authors-list');
        authorsContainer.innerHTML = this.publicationData.authors.map((author, index) =>
            `<div class="author-item ${index === 0 ? 'primary-author' : ''}">
        <div class="author-avatar">${author.charAt(0)}</div>
        <div class="author-info">
          <span class="author-name">${author}</span>
          ${index === 0 ? '<span class="author-role">Primary Author</span>' : ''}
        </div>
      </div>`
        ).join('');
    }

    populateLinks() {
        const linksContainer = document.getElementById('publication-links');
        const links = [];

        if (this.publicationData.links.paper) {
            links.push(`<a href="${this.publicationData.links.paper}" class="publication-link" target="_blank">
        <span>📄</span>
        <span>View Paper</span>
      </a>`);
        }

        if (this.publicationData.links.code) {
            links.push(`<a href="${this.publicationData.links.code}" class="publication-link" target="_blank">
        <span>💻</span>
        <span>View Code</span>
      </a>`);
        }

        if (this.publicationData.links.slides) {
            links.push(`<a href="${this.publicationData.links.slides}" class="publication-link" target="_blank">
        <span>📊</span>
        <span>View Slides</span>
      </a>`);
        }

        if (this.publicationData.links.poster) {
            links.push(`<a href="${this.publicationData.links.poster}" class="publication-link" target="_blank">
        <span>🖼️</span>
        <span>View Poster</span>
      </a>`);
        }

        linksContainer.innerHTML = links.join('');
    }

    populateGallery() {
        const galleryContainer = document.getElementById('publication-gallery');
        const images = this.publicationData.images;

        const galleryItems = [];

        if (images.architecture) {
            galleryItems.push(`
        <div class="gallery-item">
          <img src="${images.architecture}" alt="Architecture Diagram" loading="lazy">
          <div class="gallery-caption">
            <h4>System Architecture</h4>
            <p>Overview of the proposed system architecture and methodology</p>
          </div>
        </div>
      `);
        }

        if (images.results) {
            galleryItems.push(`
        <div class="gallery-item">
          <img src="${images.results}" alt="Results Visualization" loading="lazy">
          <div class="gallery-caption">
            <h4>Results & Analysis</h4>
            <p>Key findings and performance metrics from our experiments</p>
          </div>
        </div>
      `);
        }

        // Add placeholder images if no images are available
        if (galleryItems.length === 0) {
            galleryItems.push(`
        <div class="gallery-item placeholder">
          <div class="placeholder-content">
            <span class="placeholder-icon">${this.publicationData.icon}</span>
            <h4>Visual Content</h4>
            <p>Detailed figures and diagrams available in the full paper</p>
          </div>
        </div>
      `);
        }

        galleryContainer.innerHTML = `
      <div class="gallery-grid">
        ${galleryItems.join('')}
      </div>
    `;
    }

    setupHeroImage() {
        const heroImageContainer = document.getElementById('publication-hero-image');
        if (this.publicationData.images.hero) {
            heroImageContainer.innerHTML = `
        <img src="${this.publicationData.images.hero}" alt="${this.publicationData.title}" class="hero-image">
      `;
        } else {
            heroImageContainer.innerHTML = `
        <div class="hero-placeholder">
          <div class="hero-icon">${this.publicationData.icon}</div>
        </div>
      `;
        }
    }

    setupCursor() {
        const cursor = document.getElementById('cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .publication-link, .back-btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('expand');
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('expand');
            });
        });
    }

    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (6 + Math.random() * 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    setupThreeJS() {
        // Basic Three.js setup for background effects
        // This would be similar to your main page Three.js setup
        console.log('Three.js setup for publication detail page');
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    }

    setupNavigation() {
        // Handle navigation
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    showErrorPage() {
        document.body.innerHTML = `
      <div class="error-page">
        <div class="error-content">
          <h1>Publication Not Found</h1>
          <p>The requested publication could not be found.</p>
          <a href="index.html#publications" class="btn btn-primary">Back to Publications</a>
        </div>
      </div>
    `;
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');

                // Remove loading screen after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 600);
            }
        }, 1000); // Show loading for 1 second to give smooth transition
    }
}

// Copy citation functionality
window.copyCitation = function () {
    const citationText = document.getElementById('citation-text').textContent;
    navigator.clipboard.writeText(citationText).then(() => {
        const copyBtn = document.querySelector('.copy-citation-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✅</span><span>Copied!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
};

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PublicationDetailPage();
});
