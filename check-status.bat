@echo off
REM GitHub Pages Setup Status Check (Windows)

echo.
echo ==========================================
echo Hellal Web - GitHub Pages Status Check
echo ==========================================
echo.

echo Checking repository files...
setlocal enabledelayedexpansion

set missing=0
for %%F in (
  "index.md"
  "_config.yml"
  "Gemfile"
  "about.md"
  "README.md"
  "robots.txt"
  "sitemap.xml"
  "_layouts\default.html"
  "_layouts\post.html"
  "_layouts\home.html"
  "_includes\header.html"
  "_includes\footer.html"
  "assets\css\style.css"
  ".github\workflows\build-and-deploy.yml"
) do (
  if exist "%%F" (
    echo   [OK] %%F
  ) else (
    echo   [MISSING] %%F
    set /a missing=!missing!+1
  )
)

echo.
echo ==========================================
echo Next Steps:
echo ==========================================
echo.
echo 1. Push your changes to GitHub:
echo    git add .
echo    git commit -m "Deploy blog"
echo    git push origin main
echo.
echo 2. Go to GitHub repository settings:
echo    https://github.com/KerrasDev/hellaleweb.github.io/settings/pages
echo.
echo 3. Set:
echo    - Source: Deploy from a branch
echo    - Branch: main / (root)
echo    - Click Save
echo.
echo 4. Wait 3-5 minutes for deployment
echo.
echo 5. Visit your blog:
echo    https://hellaleweb.github.io
echo.
echo ==========================================

if %missing% equ 0 (
  echo [SUCCESS] All files present! Ready for deployment.
) else (
  echo [WARNING] %missing% file(s) missing. Check above.
)

pause
