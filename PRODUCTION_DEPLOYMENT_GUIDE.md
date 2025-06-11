# Production Deployment Guide

This document outlines the steps taken to ensure the portfolio website works correctly in production environments.

## 📋 Key Implementations

1. **Relative Path References**

   - All asset paths use the `./` prefix for proper relative pathing
   - CSS, JavaScript, and image references updated for production compatibility
   - Navigation links consistent across all pages

2. **Multiple HTML Pages Integration**

   - Custom Vite configuration to include multiple HTML entry points
   - Proper bundling of assets for each page
   - Updated `vite.config.js` with multi-page support

3. **GitHub Pages Compatibility**
   - Base URL set to `./` in Vite config
   - Automatic deployment workflow with GitHub Actions
   - Asset paths optimized for subpath hosting

## 🛠️ Production Build Instructions

1. **Development Environment**

   ```bash
   # Install dependencies
   npm install

   # Run development server
   npm run dev
   ```

2. **Production Build**

   ```bash
   # Build for production
   npm run build

   # Preview production build locally
   npx vite preview --host --port 3001
   ```

3. **Deployment**
   - Push to `main` branch to trigger GitHub Pages deployment
   - Production assets will be built and deployed to `gh-pages` branch
   - Site will be available at your GitHub Pages URL

## 🔍 Troubleshooting

- If images don't load, check that all paths use the `./` prefix
- If pages aren't accessible, verify the Vite config includes all HTML entries
- For navigation issues, ensure consistent URL patterns across all links
