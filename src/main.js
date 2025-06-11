import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'

// ===============================
// 3D PORTFOLIO APPLICATION
// ===============================

class Portfolio3D {
  constructor() {
    this.init()
  }

  init() {
    this.setupThreeJS()
    this.createScene()
    this.setupEventListeners()
    this.setupAnimations()
    this.setupParticles()
    this.setupCustomCursor()
    this.setupScrollAnimations()
    this.setupGallerySlideshow()
    this.hideLoadingScreen()
    this.animate()
  }

  setupThreeJS() {
    // Create scene
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('three-canvas'),
      antialias: true,
      alpha: true
    })
    
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Position camera
    this.camera.position.z = 5
    this.camera.position.y = 1
  }

  createScene() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    this.scene.add(ambientLight)

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)

    // Point lights for dynamic lighting
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.8, 10)
    pointLight1.position.set(-3, 2, 3)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff6b35, 0.6, 8)
    pointLight2.position.set(3, -2, 2)
    this.scene.add(pointLight2)

    // Create floating geometric shapes
    this.createFloatingGeometry()
    
    // Create interactive elements for sections
    this.createProjectPreviews()
    // this.createSkillVisualization() // Removed - no longer needed
    this.createContactScene()
  }

  createFloatingGeometry() {
    this.floatingObjects = []
    
    // Create various geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.DodecahedronGeometry(0.3),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.ConeGeometry(0.4, 0.8, 6)
    ]

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x00d4ff : 0x7c3aed,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.7
      })

      const mesh = new THREE.Mesh(geometry, material)
      
      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      )
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      // Store initial position for animation
      mesh.userData = {
        initialPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatRange: Math.random() * 2 + 1
      }

      this.scene.add(mesh)
      this.floatingObjects.push(mesh)
    }
  }

  createProjectPreviews() {
    this.projectPreviews = []
    
    // Create 3D previews for each project
    for (let i = 1; i <= 6; i++) {
      const container = document.getElementById(`project-preview-${i}`)
      if (!container) continue

      // Create mini scene for project preview
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 100)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      
      renderer.setSize(container.offsetWidth, container.offsetHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // Add lighting
      const light = new THREE.DirectionalLight(0x00d4ff, 1)
      light.position.set(2, 2, 2)
      scene.add(light)
      
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
      scene.add(ambientLight)

      // Create different shapes for each project
      let geometry, material
      
      switch(i) {
        case 1:
          geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16)
          material = new THREE.MeshPhongMaterial({ 
            color: 0x00d4ff, 
            wireframe: true 
          })
          break
        case 2:
          geometry = new THREE.SphereGeometry(1, 32, 32)
          material = new THREE.MeshPhongMaterial({ 
            color: 0xff6b35,
            transparent: true,
            opacity: 0.8
          })
          break
        case 3:
          geometry = new THREE.CylinderGeometry(0.5, 1, 1.5, 8)
          material = new THREE.MeshPhongMaterial({ 
            color: 0x7c3aed,
            flatShading: true
          })
          break
        case 4:
          geometry = new THREE.OctahedronGeometry(1)
          material = new THREE.MeshPhongMaterial({ 
            color: 0x10b981,
            wireframe: true
          })
          break
        case 5:
          geometry = new THREE.DodecahedronGeometry(1)
          material = new THREE.MeshPhongMaterial({ 
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.9
          })
          break
        case 6:
          geometry = new THREE.TetrahedronGeometry(1.2)
          material = new THREE.MeshPhongMaterial({ 
            color: 0xef4444,
            flatShading: true
          })
          break
      }

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      
      camera.position.z = 3

      this.projectPreviews.push({
        scene,
        camera,
        renderer,
        mesh,
        container
      })
    }
  }

  createSkillVisualization() {
    const container = document.getElementById('skill-visualization')
    if (!container) return

    // Create skill visualization scene
    this.skillScene = new THREE.Scene()
    this.skillCamera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 100)
    this.skillRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    this.skillRenderer.setSize(container.offsetWidth, container.offsetHeight)
    this.skillRenderer.setClearColor(0x000000, 0)
    container.appendChild(this.skillRenderer.domElement)

    // Add lighting
    const light = new THREE.DirectionalLight(0x00d4ff, 1)
    light.position.set(2, 2, 2)
    this.skillScene.add(light)
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    this.skillScene.add(ambientLight)

    // Create interconnected nodes representing skills
    this.skillNodes = []
    const nodePositions = [
      [-1.5, 1, 0], [0, 1.5, 0], [1.5, 1, 0],
      [-1.5, -1, 0], [0, -1.5, 0], [1.5, -1, 0]
    ]

    nodePositions.forEach((pos, index) => {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16)
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x00d4ff,
        emissive: 0x001122
      })
      const node = new THREE.Mesh(geometry, material)
      node.position.set(...pos)
      
      this.skillScene.add(node)
      this.skillNodes.push(node)
    })

    // Create connections between nodes
    this.skillConnections = []
    for (let i = 0; i < this.skillNodes.length; i++) {
      for (let j = i + 1; j < this.skillNodes.length; j++) {
        const points = [
          this.skillNodes[i].position,
          this.skillNodes[j].position
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({ 
          color: 0x00d4ff,
          transparent: true,
          opacity: 0.3
        })
        const line = new THREE.Line(geometry, material)
        this.skillScene.add(line)
        this.skillConnections.push(line)
      }
    }

    this.skillCamera.position.z = 4
  }

  createContactScene() {
    const container = document.getElementById('contact-3d-scene')
    if (!container) return

    // Create contact section 3D scene
    this.contactScene = new THREE.Scene()
    this.contactCamera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 100)
    this.contactRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    this.contactRenderer.setSize(container.offsetWidth, container.offsetHeight)
    this.contactRenderer.setClearColor(0x000000, 0)
    container.appendChild(this.contactRenderer.domElement)

    // Add lighting
    const light = new THREE.DirectionalLight(0x00d4ff, 1)
    light.position.set(2, 2, 2)
    this.contactScene.add(light)
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    this.contactScene.add(ambientLight)

    // Create animated envelope/message icon
    const envelopeGroup = new THREE.Group()
    
    // Envelope body
    const bodyGeometry = new THREE.BoxGeometry(2, 1.2, 0.1)
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x00d4ff })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    envelopeGroup.add(body)

    // Envelope flap
    const flapGeometry = new THREE.PlaneGeometry(2, 1)
    const flapMaterial = new THREE.MeshPhongMaterial({ color: 0x7c3aed })
    const flap = new THREE.Mesh(flapGeometry, flapMaterial)
    flap.position.y = 0.6
    flap.rotation.x = Math.PI / 4
    envelopeGroup.add(flap)

    this.contactScene.add(envelopeGroup)
    this.contactEnvelope = envelopeGroup
    
    this.contactCamera.position.z = 4
  }

  setupParticles() {
    const particlesContainer = document.getElementById('particles')
    this.particles = []

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 6 + 's'
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's'
      
      particlesContainer.appendChild(particle)
      this.particles.push(particle)
    }
  }

  setupCustomCursor() {
    const cursor = document.getElementById('cursor')
    const cursorDot = cursor.querySelector('.cursor-dot')
    const cursorOutline = cursor.querySelector('.cursor-outline')

    // Add will-change for GPU acceleration
    cursorDot.style.willChange = 'transform';
    cursorOutline.style.willChange = 'transform';

    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let outlineX = 0, outlineY = 0

    // Only store mouse position on mousemove
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    // Animate both dot and outline in a single rAF loop
    const animateCursor = () => {
      // Dot follows mouse instantly, but with a small lerp for smoothness
      dotX += (mouseX - dotX) * 0.35
      dotY += (mouseY - dotY) * 0.35
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`

      // Outline follows with more lag
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`

      requestAnimationFrame(animateCursor)
    }
    animateCursor()

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-method, .nav-link, .btn')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('expand')
      })
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('expand')
      })
    })
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    // Special observer for publication cards with 3D carousel effect
    const publicationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, index * 200) // Stagger the animations
        }
      })
    }, observerOptions)

    // Regular observer for other elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Apply special observer to publication cards
    document.querySelectorAll('.publication-card').forEach(card => {
      publicationObserver.observe(card)
    })

    // Add observer to other animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
      if (!el.classList.contains('publication-card')) {
        observer.observe(el)
      }
    })

    // Navbar scroll effect
    const navbar = document.getElementById('navbar')
    let lastScrollY = window.scrollY

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }

      // Update active nav link
      this.updateActiveNavLink()
    })
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')

    let current = ''

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  }

  setupEventListeners() {
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href').substring(1)
        const targetSection = document.getElementById(targetId)
        
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    })

    // Hero buttons
    document.getElementById('explore-btn')?.addEventListener('click', () => {
      document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
      })
    })

    document.getElementById('contact-btn')?.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
      })
    })

    // Skill item interactions (removed 3D visualization)
    document.querySelectorAll('.skill-item').forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        // 3D visualization removed - just use CSS hover effects
      })

      item.addEventListener('mouseleave', () => {
        // 3D visualization removed - just use CSS hover effects
      })
    })

    // Project card interactions
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        const preview = this.projectPreviews[index]
        if (preview && preview.mesh) {
          // Animate project preview on hover
          new TWEEN.Tween(preview.mesh.rotation)
            .to({ y: preview.mesh.rotation.y + Math.PI * 2 }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start()
        }
      })
    })

    // Profile image interactions and loading
    const profileImg = document.querySelector('.profile-image')
    const profileFrame = document.querySelector('.profile-image-frame')
    
    if (profileImg && profileFrame) {
      // Handle loading state
      profileFrame.classList.add('loading')
      
      profileImg.addEventListener('load', () => {
        profileFrame.classList.remove('loading')
        profileImg.classList.add('loaded')
      })
      
      // Handle error state
      profileImg.addEventListener('error', () => {
        profileFrame.classList.remove('loading')
        profileImg.style.display = 'none'
      })
      
      // Interactive effects
      profileFrame.addEventListener('mouseenter', () => {
        profileFrame.style.transform = 'scale(1.05) rotateX(5deg) rotateY(5deg)'
      })

      profileFrame.addEventListener('mouseleave', () => {
        profileFrame.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)'
      })

      // Click interaction for fun effect
      profileFrame.addEventListener('click', () => {
        profileFrame.style.animation = 'none'
        setTimeout(() => {
          profileFrame.style.animation = 'profileFloat 6s ease-in-out infinite'
        }, 100)
        
        // Create a ripple effect
        const ripple = document.createElement('div')
        ripple.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(0, 212, 255, 0.3);
          transform: translate(-50%, -50%);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
        `
        
        profileFrame.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)
      })
    }

    // Profile image parallax scroll effect
    const profileImageFrame = document.querySelector('.profile-image-frame')
    if (profileImageFrame) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.2
        profileImageFrame.style.transform = `translateY(${parallax}px)`
      })
    }

    // Window resize
    window.addEventListener('resize', () => {
      this.onWindowResize()
    })
  }

  setupAnimations() {
    // Animate hero title letters
    const heroLines = document.querySelectorAll('.hero-title .line')
    heroLines.forEach((line, lineIndex) => {
      const text = line.textContent
      line.innerHTML = ''
      
      text.split('').forEach((char, charIndex) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.setProperty('--i', charIndex)
        span.style.animationDelay = `${(lineIndex * 0.1) + (charIndex * 0.05)}s`
        line.appendChild(span)
      })
    })

    // Add animation classes to elements
    document.querySelector('.about-text')?.classList.add('fade-in')
    document.querySelector('.skills-grid')?.classList.add('slide-in-left')
    document.querySelector('.about-visual')?.classList.add('slide-in-right')
    document.querySelector('.projects-grid')?.classList.add('fade-in')
    document.querySelector('.contact-info')?.classList.add('slide-in-left')

    // Staggered animations for about section elements
    this.setupAboutAnimations()
  }

  setupAboutAnimations() {
    // Animate stat items with stagger
    const statItems = document.querySelectorAll('.stat-item')
    statItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.2}s`
      item.classList.add('fade-in')
    })

    // Animate skill items with stagger
    const skillItems = document.querySelectorAll('.skill-item')
    skillItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.classList.add('skill-fade-in')
    })

    // Add hover effects for skill items
    skillItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-8px) rotateY(5deg) scale(1.05)'
      })

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) rotateY(0deg) scale(1)'
      })
    })

    // Interactive stat counter animation
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    }

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number')
          const finalValue = statNumber.textContent
          const numericValue = parseInt(finalValue.replace(/\D/g, ''))

          // Animate counter
          let currentValue = 0
          const increment = numericValue / 30
          const timer = setInterval(() => {
            currentValue += increment
            if (currentValue >= numericValue) {
              currentValue = numericValue
              clearInterval(timer)
            }
            statNumber.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '')
          }, 50)

          statObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    statItems.forEach(item => {
      statObserver.observe(item)
    })

    // Skills intersection observer
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    skillItems.forEach(item => {
      skillsObserver.observe(item)
    })

    this.setupGallerySlideshow()
  }

  setupGallerySlideshow() {
    const slides = document.querySelectorAll('.gallery-slide')
    const dots = document.querySelectorAll('.gallery-dot')
    const prevBtn = document.querySelector('.prev-btn')
    const nextBtn = document.querySelector('.next-btn')

    if (!slides.length) return

    let currentSlide = 0
    const totalSlides = slides.length

    const updateSlideshow = () => {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'))
      dots.forEach(dot => dot.classList.remove('active'))

      // Add active class to current slide and dot
      slides[currentSlide].classList.add('active')
      dots[currentSlide].classList.add('active')
    }

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlideshow()
    }

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateSlideshow()
    }

    const goToSlide = (slideIndex) => {
      currentSlide = slideIndex
      updateSlideshow()
    }

    // Event listeners
    nextBtn?.addEventListener('click', nextSlide)
    prevBtn?.addEventListener('click', prevSlide)

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index))
    })

    // Auto-advance slideshow every 5 seconds
    setInterval(nextSlide, 5000)

    // Initialize
    updateSlideshow()
  }

  // ...existing code...

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen')
      loadingScreen.classList.add('hidden')
      
      // Remove loading screen after animation
      setTimeout(() => {
        loadingScreen.remove()
      }, 600)
    }, 2000)
  }

  onWindowResize() {
    // Update main camera
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Update project preview renderers
    this.projectPreviews.forEach(preview => {
      const container = preview.container
      preview.camera.aspect = container.offsetWidth / container.offsetHeight
      preview.camera.updateProjectionMatrix()
      preview.renderer.setSize(container.offsetWidth, container.offsetHeight)
    })

    // Update skill visualization
    if (this.skillRenderer) {
      const container = document.getElementById('skill-visualization')
      this.skillCamera.aspect = container.offsetWidth / container.offsetHeight
      this.skillCamera.updateProjectionMatrix()
      this.skillRenderer.setSize(container.offsetWidth, container.offsetHeight)
    }

    // Update contact scene
    if (this.contactRenderer) {
      const container = document.getElementById('contact-3d-scene')
      this.contactCamera.aspect = container.offsetWidth / container.offsetHeight
      this.contactCamera.updateProjectionMatrix()
      this.contactRenderer.setSize(container.offsetWidth, container.offsetHeight)
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate())
    
    // Update TWEEN animations
    TWEEN.update()

    const time = Date.now() * 0.001

    // Animate floating objects
    this.floatingObjects.forEach((obj, index) => {
      // Rotation animation
      obj.rotation.x += obj.userData.rotationSpeed.x
      obj.rotation.y += obj.userData.rotationSpeed.y
      obj.rotation.z += obj.userData.rotationSpeed.z

      // Floating animation
      obj.position.y = obj.userData.initialPosition.y + 
        Math.sin(time * obj.userData.floatSpeed + index) * obj.userData.floatRange
    })

    // Animate camera based on mouse position
    if (this.mouseX !== undefined && this.mouseY !== undefined) {
      const targetX = (this.mouseX / window.innerWidth - 0.5) * 0.5
      const targetY = -(this.mouseY / window.innerHeight - 0.5) * 0.5
      
      this.camera.position.x += (targetX - this.camera.position.x) * 0.02
      this.camera.position.y += (targetY - this.camera.position.y) * 0.02
    }

    // Animate project previews
    this.projectPreviews.forEach(preview => {
      if (preview.mesh) {
        preview.mesh.rotation.x += 0.01
        preview.mesh.rotation.y += 0.01
        preview.renderer.render(preview.scene, preview.camera)
      }
    })

    // Animate skill visualization (removed)
    // if (this.skillNodes) {
    //   this.skillNodes.forEach((node, index) => {
    //     node.position.y += Math.sin(time * 2 + index) * 0.01
    //     node.material.emissive.setHSL(
    //       (time * 0.1 + index * 0.1) % 1,
    //       0.5,
    //       0.1
    //     )
    //   })
    //   this.skillRenderer.render(this.skillScene, this.skillCamera)
    // }

    // Animate contact scene
    if (this.contactEnvelope) {
      this.contactEnvelope.rotation.y += 0.02
      this.contactEnvelope.position.y = Math.sin(time * 2) * 0.2
      this.contactRenderer.render(this.contactScene, this.contactCamera)
    }

    // Render main scene
    this.renderer.render(this.scene, this.camera)
  }
}

// Mouse position tracking
let mouseX = 0, mouseY = 0
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio3D()
})

// Handle mouse position for camera movement
document.addEventListener('mousemove', (e) => {
  Portfolio3D.prototype.mouseX = e.clientX
  Portfolio3D.prototype.mouseY = e.clientY
})
