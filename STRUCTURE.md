# Hellal Web - Site Structure & Navigation Guide

## 🌐 Site URL
**https://hellaleweb.github.io**

---

## 📍 Main Pages & Links

### Homepage
- **URL**: `/` or `https://hellaleweb.github.io`
- **File**: `index.md`
- **Layout**: `home`
- **Features**: Latest posts preview, hero section, CTA buttons

### Posts
- **URL**: `/posts/` or `https://hellaleweb.github.io/posts/`
- **File**: `posts/index.md`
- **Layout**: `page`
- **Features**: Complete list of all blog posts

### Categories
- **URL**: `/categories/` or `https://hellaleweb.github.io/categories/`
- **File**: `categories/index.md`
- **Layout**: `page`
- **Features**: Grid view of all categories with post counts

### Tags
- **URL**: `/tags/` or `https://hellaleweb.github.io/tags/`
- **File**: `tags/index.md`
- **Layout**: `page`
- **Features**: Tag cloud with post counts

### About
- **URL**: `/about/` or `https://hellaleweb.github.io/about/`
- **File**: `about.md`
- **Layout**: `page`
- **Features**: Blog information, mission, author bio

---

## 🔗 Navigation Structure

All pages are linked through:

1. **Header Navigation** (`_includes/header.html`)
   - Sticky header with main navigation
   - Quick links to all main pages
   - Active link highlighting

2. **Footer** (`_includes/footer.html`)
   - Quick links section
   - Social media links
   - Copyright information

3. **Home Page Links**
   - Explore buttons for posts, categories, tags, about

4. **Post Preview Cards**
   - Clickable titles
   - Category links
   - Tag links
   - "Read More" buttons

5. **Related Posts**
   - Automatically generated based on tags
   - Found at bottom of each post

---

## 📝 Blog Posts

### Post Location
- Stored in: `_posts/`
- Naming convention: `YYYY-MM-DD-title.md`
- Example: `_posts/2026-01-17-welcome.md`

### Post Frontmatter
```yaml
---
layout: post
title: "Post Title"
categories: [Web]
tags: [jekyll, blog]
author: Author Name
date: 2026-01-17
description: Brief description
---
```

### Post Features
- Automatic date display
- Category links
- Tag links
- Related posts section
- Schema.org markup for SEO

---

## 🎨 CSS & Styling

### Main Styles
- **File**: `assets/css/style.css`
- **Features**:
  - RTL support for Arabic
  - LTR support for code blocks
  - Responsive design
  - Dark/Light theme support

### Layout Files
- `_layouts/default.html` - Base layout with SEO meta tags
- `_layouts/home.html` - Homepage specific layout
- `_layouts/page.html` - Regular pages layout
- `_layouts/post.html` - Blog post layout with schema markup

---

## 🔍 SEO Features

✅ **Meta Tags**
- Title tags with site name
- Meta descriptions
- Keywords
- Author information

✅ **Open Graph**
- Social media sharing cards
- Twitter Cards

✅ **Schema.org Markup**
- BlogPosting schema
- Organization schema

✅ **Sitemaps**
- `sitemap.xml` - Auto-generated
- `robots.txt` - Crawler directives

✅ **Performance**
- GZIP compression
- Asset caching
- Security headers

---

## 📊 Configuration

### Main Config
- **File**: `_config.yml`
- **Key Settings**:
  - Site title & description
  - URL: `https://hellaleweb.github.io`
  - Language: Arabic (`ar`)
  - Direction: RTL
  - Theme: Minimal
  - Plugins: Feed, SEO tag, Archives, Sitemap

### Plugins
- `jekyll-feed` - RSS feed generation
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-archives` - Category/tag pages
- `jekyll-sitemap` - Sitemap generation

---

## 🔄 Linking Between Pages

### Relative Links (Recommended)
```markdown
[Link Text]({{ page.url | relative_url }})
[Posts](/posts/)
[About](/about/)
```

### Absolute Links
```markdown
[Link Text](https://hellaleweb.github.io/path/)
```

### Category Links
```markdown
[Posts in Web]({{ '/categories/web/' | relative_url }})
```

### Tag Links
```markdown
[Posts with jekyll tag]({{ '/tags/jekyll/' | relative_url }})
```

---

## 📱 Responsive Design

- **Desktop**: Full multi-column layout
- **Tablet (768px)**: 1-2 column layout
- **Mobile (480px)**: Single column layout
- All fonts and spacing scale appropriately

---

## 🚀 Deployment

The site is deployed to GitHub Pages automatically when you push to the `main` branch.

### To publish:
1. Make changes locally
2. Commit: `git commit -m "Your message"`
3. Push: `git push origin main`
4. Site updates at: `https://hellaleweb.github.io`

---

## 📧 Contact & Social

- **GitHub**: [@KerrasDev](https://github.com/KerrasDev)
- **Email**: contact@hellaleweb.github.io
- **Twitter**: @KerrasDev

---

**Last Updated**: January 17, 2026
