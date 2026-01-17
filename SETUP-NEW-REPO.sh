#!/bin/bash
# Setup HellaleWeb Repository - Step by Step Guide

echo "════════════════════════════════════════════════════════════"
echo "HellaleWeb Blog Setup - kerrasdev.github.io/HellaleWeb"
echo "════════════════════════════════════════════════════════════"
echo ""

# STEP 1: Create new directory
echo "STEP 1: Create new directory for HellaleWeb repo"
echo "─────────────────────────────────────────────────"
echo "Commands:"
echo "  mkdir HellaleWeb"
echo "  cd HellaleWeb"
echo ""

# STEP 2: Initialize git
echo "STEP 2: Initialize git and create initial commit"
echo "─────────────────────────────────────────────────"
echo "Run these commands:"
echo ""
echo "  git init"
echo "  echo '# HellaleWeb' > README.md"
echo "  git add README.md"
echo "  git commit -m 'Initial commit - HellaleWeb blog'"
echo "  git branch -M main"
echo ""

# STEP 3: Add remote
echo "STEP 3: Add GitHub remote"
echo "─────────────────────────"
echo "Run:"
echo "  git remote add origin https://github.com/KerrasDev/HellaleWeb.git"
echo ""

# STEP 4: Copy files from current blog
echo "STEP 4: Copy all blog files"
echo "────────────────────────────"
echo "Copy these folders/files from c:\KerrasDev\hellaleweb:"
echo ""
echo "  Files to copy:"
echo "  ├── _posts/           (blog posts)"
echo "  ├── _layouts/         (page templates)"
echo "  ├── _includes/        (header, footer)"
echo "  ├── assets/           (CSS styling)"
echo "  ├── posts/            (posts listing)"
echo "  ├── categories/       (categories page)"
echo "  ├── tags/             (tags page)"
echo "  ├── _config.yml       (configuration - ALREADY UPDATED)"
echo "  ├── Gemfile           (dependencies)"
echo "  ├── index.md          (homepage)"
echo "  ├── about.md          (about page)"
echo "  ├── robots.txt        (SEO)"
echo "  ├── sitemap.xml       (SEO)"
echo "  └── .github/          (workflows)"
echo ""

# STEP 5: Commit all files
echo "STEP 5: Stage and commit all files"
echo "──────────────────────────────────"
echo "Run:"
echo "  git add ."
echo "  git commit -m 'Add Hellal Web blog - Jekyll site'"
echo ""

# STEP 6: Push to GitHub
echo "STEP 6: Push to GitHub"
echo "─────────────────────"
echo "Run:"
echo "  git push -u origin main"
echo ""

# STEP 7: Enable GitHub Pages
echo "STEP 7: Enable GitHub Pages"
echo "──────────────────────────"
echo "1. Go to: https://github.com/KerrasDev/HellaleWeb/settings/pages"
echo "2. Under 'Build and deployment':"
echo "   - Source: 'Deploy from a branch'"
echo "   - Branch: 'main' / '(root)'"
echo "   - Click Save"
echo ""

# STEP 8: Done!
echo "STEP 8: Wait & Visit"
echo "───────────────────"
echo "Wait 2-3 minutes for deployment"
echo "Then visit: https://kerrasdev.github.io/HellaleWeb"
echo ""

echo "════════════════════════════════════════════════════════════"
echo "Your blog will be live at: https://kerrasdev.github.io/HellaleWeb"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "✅ Configuration updated:"
echo "   url: https://kerrasdev.github.io"
echo "   baseurl: /HellaleWeb"
echo ""
