@echo off
REM Setup HellaleWeb Repository - Windows Version

color 0A
cls

echo.
echo ========================================
echo HellaleWeb Blog Setup Guide
echo kerrasdev.github.io/HellaleWeb
echo ========================================
echo.

echo STEP 1: Create new directory
echo ────────────────────────────
echo Run in PowerShell:
echo   mkdir HellaleWeb
echo   cd HellaleWeb
echo.
pause

cls
echo STEP 2: Initialize git repository
echo ──────────────────────────────────
echo Run in PowerShell:
echo.
echo   git init
echo   echo "# HellaleWeb" ^> README.md
echo   git add README.md
echo   git commit -m "Initial commit - HellaleWeb blog"
echo   git branch -M main
echo.
pause

cls
echo STEP 3: Add GitHub remote
echo ─────────────────────────
echo Run in PowerShell:
echo.
echo   git remote add origin https://github.com/KerrasDev/HellaleWeb.git
echo.
pause

cls
echo STEP 4: Copy blog files from current location
echo ──────────────────────────────────────────────
echo Copy from: c:\KerrasDev\hellaleweb
echo Copy to: HellaleWeb folder
echo.
echo Folders/Files to copy:
echo   - _posts/             (blog posts)
echo   - _layouts/           (page templates)
echo   - _includes/          (header, footer)
echo   - assets/             (CSS styling)
echo   - posts/              (posts page)
echo   - categories/         (categories page)
echo   - tags/               (tags page)
echo   - _config.yml         (config - UPDATED!)
echo   - Gemfile             (dependencies)
echo   - index.md            (homepage)
echo   - about.md            (about page)
echo   - robots.txt          (SEO)
echo   - sitemap.xml         (SEO)
echo   - .github/            (workflows)
echo.
echo Use Windows Explorer to copy files, or use:
echo   xcopy c:\KerrasDev\hellaleweb\* . /E /I /Y
echo.
pause

cls
echo STEP 5: Stage all files in git
echo ──────────────────────────────
echo Run in PowerShell:
echo.
echo   git add .
echo   git commit -m "Add Hellal Web blog - Jekyll site with posts, pages, styling"
echo.
pause

cls
echo STEP 6: Push to GitHub
echo ─────────────────────
echo Run in PowerShell:
echo.
echo   git push -u origin main
echo.
echo Wait for push to complete...
pause

cls
echo STEP 7: Enable GitHub Pages
echo ──────────────────────────
echo 1. Open: https://github.com/KerrasDev/HellaleWeb/settings/pages
echo 2. Under "Build and deployment":
echo    - Source: "Deploy from a branch"
echo    - Branch: "main" / "(root)"
echo    - Click: Save
echo.
pause

cls
echo STEP 8: Wait for Deployment
echo ────────────────────────────
echo Wait 2-3 minutes for build to complete
echo.
echo Check status: https://github.com/KerrasDev/HellaleWeb/actions
echo.
pause

cls
echo ========================================
echo Your blog is live!
echo ========================================
echo.
echo 🌐 Blog URL: https://kerrasdev.github.io/HellaleWeb
echo.
echo ✅ Configuration:
echo    url: https://kerrasdev.github.io
echo    baseurl: /HellaleWeb
echo.
echo All files are ready to copy!
echo.
pause
