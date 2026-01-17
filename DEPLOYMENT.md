# 🚀 GitHub Pages Deployment Guide

## The 404 Problem & Solution

You're seeing a 404 because GitHub Pages isn't set up to publish from your repository. Follow these steps:

---

## ✅ Step 1: Push Your Changes to GitHub

1. **Open PowerShell** in your project directory:
```powershell
cd c:\KerrasDev\hellaleweb
```

2. **Check git status**:
```powershell
git status
```

3. **Add all files**:
```powershell
git add .
```

4. **Commit your changes**:
```powershell
git commit -m "Initial blog setup with Jekyll, posts, and styling"
```

5. **Push to main branch**:
```powershell
git push origin main
```

---

## ✅ Step 2: Enable GitHub Pages in Repository Settings

1. **Go to your repository**: https://github.com/KerrasDev/hellaleweb.github.io

2. **Click on Settings** (gear icon at top right)

3. **Scroll down to "Pages" section** (on the left sidebar)

4. **Under "Build and deployment"**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` and `/root` folder
   - Click **Save**

5. **Wait 1-2 minutes** for the site to build

6. **Check the URL**: https://hellaleweb.github.io

---

## ✅ Step 3: Verify Your Repository Name

Your repository name **must** be in this format:
- `username.github.io`
- Your repo: `hellaleweb.github.io` ✅ (Correct!)

---

## ✅ Step 4: Check Build Status

1. Go to your repository
2. Click on the **Actions** tab
3. Look for the GitHub Pages deployment workflow
4. It should show a ✅ (green checkmark) when successful

If you see ❌ (red X):
- Click on the failed workflow
- Check the error logs
- Common issues:
  - Missing Ruby dependencies (Gemfile issue)
  - YAML syntax errors
  - Missing layout files

---

## ✅ Step 5: Troubleshooting

### If site still shows 404:

**Option A: Wait longer**
- GitHub Pages can take 3-5 minutes to first deploy
- Check after 5 minutes

**Option B: Force rebuild**
1. Go to Settings → Pages
2. Change branch to `gh-pages` then back to `main`
3. This forces a rebuild

**Option C: Use GitHub Actions**
- We've created `.github/workflows/build-and-deploy.yml`
- This automates the build process
- Push it to trigger automatic deployment

**Option D: Check for errors**
1. Go to Settings → Pages
2. Look for any build error messages
3. Common fixes:
   - Remove `.nojekyll` file if it exists
   - Check `_config.yml` for YAML errors
   - Ensure all plugins are in `Gemfile`

---

## 📋 Checklist

- [ ] Repository name is `hellaleweb.github.io`
- [ ] All files pushed to `main` branch
- [ ] GitHub Pages enabled in Settings
- [ ] Source set to "Deploy from a branch"
- [ ] Branch is `main` with `/root` folder
- [ ] Wait 3-5 minutes for first build
- [ ] Check https://hellaleweb.github.io
- [ ] If 404, check Actions tab for errors

---

## 🔧 Manual Commands (Optional)

If you want to test locally before pushing:

```powershell
# Navigate to project
cd c:\KerrasDev\hellaleweb

# Build Jekyll site locally
bundle install
bundle exec jekyll build

# Serve locally for testing
bundle exec jekyll serve
```

Then visit: http://localhost:4000

---

## 📞 Need Help?

Common error messages:

| Error | Solution |
|-------|----------|
| `404 - Not Found` | Enable Pages in Settings (see Step 2) |
| `jekyll: command not found` | Run `bundle install` |
| `Liquid syntax error` | Check YAML frontmatter in posts |
| `Build failed` | Check Actions tab for error details |
| `Theme not found` | Add theme to Gemfile: `gem "jekyll-theme-minimal"` |

---

## 🎯 Quick Start

```powershell
# 1. Stage changes
git add .

# 2. Commit
git commit -m "Your message here"

# 3. Push to GitHub
git push origin main

# 4. Wait 3-5 minutes
# 5. Visit https://hellaleweb.github.io

# 6. If error, check: https://github.com/KerrasDev/hellaleweb.github.io/actions
```

---

**Your blog should be live within 5 minutes! 🚀**
