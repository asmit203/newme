# 🚀 Asmit Ganguly - 3D Portfolio

A modern, interactive 3D portfolio website showcasing AI/ML research, publications, and innovative projects. Built with **Vite**, **Three.js**, and packed with stunning animations for optimal research presentation.

## 🔬 About Asmit

Computer Science and Engineering researcher passionate about AI and ML, specializing in:
- **Neuroimaging** - Advanced brain imaging analysis
- **Biomedical Image Processing** - Healthcare AI applications  
- **Natural Language Processing** - Clinical document analysis
- **Quantum Computing** - Next-generation algorithms
- **Deep Learning** - Interpretable AI models

## ✨ Portfolio Features

- **🎨 Modern 3D Graphics** - Interactive research showcase powered by Three.js
- **⚡ Smooth Animations** - Professional presentation with Tween.js
- **📱 Fully Responsive** - Perfect experience across all devices
- **🎯 Performance Optimized** - Fast loading for academic environments
- **🔥 Interactive Elements** - Engaging project demonstrations
- **🎪 Custom Cursor** - Immersive browsing experience
- **📜 Scroll Animations** - Progressive content revelation
- **🌓 Modern Design** - Academic-friendly dark theme with professional accents
- **📄 Publications Section** - Dedicated research publications showcase
- **🚀 Project Previews** - 3D visualization of 6 featured projects

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Three.js](https://threejs.org/)** - 3D graphics and WebGL
- **[Tween.js](https://github.com/tweenjs/tween.js/)** - Smooth animations
- **Vanilla JavaScript** - For maximum performance
- **CSS3** - Modern styling with custom properties
- **GitHub Pages** - Static hosting

## 📊 Research Showcase

### Featured Publications
1. **SEMANTIFY: Unveiling Memes with Robust Interpretability beyond Input Attribution** (IJCAI 2024 Main)
2. **AlpaPICO: Extraction of PICO Frames from Clinical Trial Documents Using LLMs** (Method)
3. **Cracking the code: enhancing interpretability and accessibility of ophthalmic disorders detection using KAN** (SPIE Photonics West)

### Featured Projects
1. **TalkitOut** - Full-stack social media platform with AI Co-Pilot integration
2. **Domain Specific Question Answering (DevRev)** - Gold medalist solution for Inter IIT 11.0
3. **Neural Activity Classifier** - EEG-based action classification with 75% accuracy
4. **Ping Pong on FPGA** - Hardware implementation on DE1-SOC board
5. **LostFound Android App** - Firebase-powered lost & found system
6. **Assembler Emulator** - Custom instruction set with C++ implementation

### Research Skills
- **Deep Learning** - Advanced neural network architectures
- **Mathematical Analysis** - Optimization and algorithm development
- **Data Analysis** - Pattern recognition and statistical modeling
- **Technical Writing** - Scientific publication and documentation
- **Web Development** - Modern full-stack applications
- **Collaboration** - Cross-functional team leadership

## 🚀 Quick Start

### Development

```bash
# Clone the repository
git clone https://github.com/asmit203/asmit203.github.io.git
cd asmit203.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio in action!

### Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions deployment
│   └── copilot-instructions.md # Copilot guidance
├── public/
│   └── vite.svg               # Favicon
├── src/
│   ├── main.js                # Main application logic
│   └── style.css              # Modern CSS styles
├── index.html                 # Main HTML file
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Customization

### Personal Information
Update the content in `index.html`:
- Change name and title in the hero section
- Update the about section text
- Modify project information
- Update contact links

### Visual Styling
Customize the design in `src/style.css`:
- Color scheme variables in `:root`
- Animation timings and effects
- Responsive breakpoints
- Typography settings

### 3D Elements
Modify 3D scenes in `src/main.js`:
- Floating geometry shapes
- Lighting and materials
- Animation behaviors
- Interactive elements

## 🌟 Key Features Explained

### **3D Background Scene**
- Floating geometric shapes with physics-based animation
- Dynamic lighting with multiple colored lights
- Mouse-responsive camera movement

### **Project Previews**
- Individual 3D scenes for each project
- Interactive animations on hover
- Customizable 3D models per project

### **Skill Visualization**
- Network-style node connections
- Animated skill representations
- Interactive hover effects

### **Smooth Scrolling & Animations**
- Intersection Observer for scroll-triggered animations
- Smooth navigation between sections
- Progressive content reveal

### **Performance Optimizations**
- Code splitting for Three.js libraries
- Optimized asset loading
- Efficient animation loops

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (480px - 767px)
- **Small Mobile** (<480px)

## 🚀 Deployment

### Automatic Deployment (Recommended)
Push to the `main` branch to trigger automatic deployment via GitHub Actions.

### Manual Deployment
```bash
npm run deploy
```

### GitHub Pages Setup
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Your site will be available at `https://asmit203.github.io`

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` is optimized for GitHub Pages with:
- Correct base path for your domain
- Asset optimization
- Code splitting for better performance

### GitHub Actions
The `.github/workflows/deploy.yml` handles:
- Automatic builds on push
- Deployment to GitHub Pages
- Node.js 18 environment

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format for better compression
2. **Lazy Loading**: Three.js scenes load progressively
3. **Code Splitting**: Libraries are split into separate chunks
4. **CSS Optimization**: Custom properties for efficient styling

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js version 18+ is installed
- Clear `node_modules` and reinstall if needed
- Check for TypeScript/JavaScript compatibility

### 3D Scene Issues
- Verify WebGL support in browser
- Check console for Three.js errors
- Ensure proper canvas sizing

### Deployment Issues
- Verify GitHub Pages is enabled
- Check repository visibility settings
- Ensure proper base path in Vite config

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Inspiration

This portfolio showcases modern web development techniques and serves as a template for creating immersive, interactive portfolios. Feel free to use it as inspiration for your own projects!

## 📞 Contact

- **Website**: [asmit203.github.io](https://asmit203.github.io)
- **GitHub**: [@asmit203](https://github.com/asmit203)
- **Email**: contact@asmit203.github.io

---

⭐ **Star this repository if you found it helpful!** ⭐
