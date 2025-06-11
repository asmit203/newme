# Dynamic Publication System

This system allows you to easily add new publications without creating separate HTML pages. Simply add entries to the JSON file and the system will automatically generate detailed publication pages.

## How to Add a New Publication

### 1. Add Publication Data

Edit `src/publications-data.json` and add a new publication object to the `publications` array:

```json
{
  "id": "unique-publication-id",
  "title": "Your Publication Title",
  "authors": ["First Author", "Second Author", "Third Author"],
  "venue": "Conference/Journal Name",
  "year": "2024",
  "type": "Conference", // Conference, Journal, Workshop, Preprint, etc.
  "icon": "🔬", // Emoji icon for the publication
  "abstract": "Short abstract for the main page",
  "fullAbstract": "Complete abstract with multiple paragraphs separated by \\n\\n",
  "keywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
  "links": {
    "paper": "https://link-to-paper.com",
    "code": "https://github.com/repo",
    "slides": "https://link-to-slides.com", // optional
    "poster": "https://link-to-poster.com" // optional
  },
  "images": {
    "hero": "/public/publications/hero-image.jpg", // optional
    "architecture": "/public/publications/arch-image.jpg", // optional
    "results": "/public/publications/results-image.jpg" // optional
  },
  "citation": "@article{author2024title,\\n  title={Your Publication Title},\\n  author={Author, First and Author, Second},\\n  journal={Journal Name},\\n  year={2024}\\n}",
  "status": "Published" // Published, Preprint, Submitted
}
```

### 2. Add Publication to Main Page

Edit `index.html` and add a new publication card in the publications section:

```html
<div
  class="publication-card fade-in"
  onclick="window.location.href='publication-detail.html?id=unique-publication-id'"
>
  <div class="publication-image">
    <div class="publication-icon">🔬</div>
  </div>
  <div class="publication-info">
    <h3>Your Publication Title</h3>
    <p class="publication-venue">Conference/Journal Name</p>
    <p class="publication-abstract">Short abstract for the main page</p>
    <div class="publication-links">
      <a
        href="publication-detail.html?id=unique-publication-id"
        class="publication-link"
        onclick="event.stopPropagation()"
        >View Details</a
      >
      <a
        href="https://link-to-paper.com"
        class="publication-link"
        onclick="event.stopPropagation()"
        >View Paper</a
      >
      <a
        href="https://github.com/repo"
        class="publication-link"
        onclick="event.stopPropagation()"
        >View Code</a
      >
    </div>
  </div>
</div>
```

### 3. Add Images (Optional)

If you have publication images:

1. Add them to the `public/publications/` directory
2. Update the `images` object in your JSON entry with the correct paths
3. Use descriptive filenames like: `publication-id-hero.jpg`, `publication-id-architecture.jpg`, etc.

### 4. Test Your Publication

1. Save all files
2. Open your browser and navigate to the main page
3. Click on your new publication card
4. Verify all information appears correctly on the detail page

## File Structure

```
├── src/
│   ├── publications-data.json     # Publication data
│   ├── publication-detail.js      # Detail page logic
│   └── style.css                  # Styles (includes publication detail styles)
├── public/
│   └── publications/              # Publication images
│       ├── hero-images/
│       ├── architecture-diagrams/
│       └── results-figures/
├── index.html                     # Main page with publication cards
└── publication-detail.html        # Dynamic detail page template
```

## Features

- **Dynamic Content**: No need to create separate HTML files
- **Responsive Design**: Works on all devices
- **Modern UI**: Glassmorphism design matching your portfolio
- **Rich Content**: Support for abstracts, keywords, citations, images
- **Interactive Elements**: Hover effects, smooth animations
- **Copy Citation**: One-click citation copying
- **Error Handling**: Graceful handling of missing publications

## Customization

### Status Badges

Supported status types with automatic styling:

- `"Published"` - Green badge
- `"Preprint"` - Orange badge
- `"Submitted"` - Blue badge

### Icons

Use any emoji as the publication icon. Common choices:

- 📄 General paper
- 🔬 Research/Science
- 👁️ Computer Vision
- 🧠 AI/ML
- 💻 Software/Systems
- 📊 Data Analysis

### Images

For best results:

- **Hero images**: 16:9 aspect ratio, 800x450px minimum
- **Architecture diagrams**: Any aspect ratio, 600px width minimum
- **Results figures**: Any aspect ratio, 600px width minimum
- **Format**: JPG, PNG, or WebP
- **Size**: Keep under 500KB for fast loading

## Tips

1. **Unique IDs**: Use descriptive, URL-friendly IDs like `"kan-ophthalmic"` or `"semantify-memes"`
2. **Abstracts**: Keep the main page abstract short (1-2 sentences), use full abstract for detail page
3. **Keywords**: Use 3-7 relevant keywords for best display
4. **Citations**: Include proper BibTeX formatting with line breaks (`\\n`)
5. **Links**: Always test external links before publishing

## Troubleshooting

**Publication not showing**: Check that the ID in the URL matches the ID in the JSON file exactly.

**Images not loading**: Verify the image paths start with `/public/` and files exist in the correct directory.

**Styling issues**: Clear browser cache and ensure CSS files are properly linked.

**JavaScript errors**: Check browser console for specific error messages.
