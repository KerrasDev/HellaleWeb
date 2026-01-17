#!/bin/bash
# GitHub Pages Setup Status Check

echo "=========================================="
echo "Hellal Web - GitHub Pages Status Check"
echo "=========================================="
echo ""

echo "✓ Checking repository files..."
files=(
  "index.md"
  "_config.yml"
  "Gemfile"
  "about.md"
  "README.md"
  "robots.txt"
  "sitemap.xml"
  "_layouts/default.html"
  "_layouts/post.html"
  "_layouts/home.html"
  "_includes/header.html"
  "_includes/footer.html"
  "assets/css/style.css"
  ".github/workflows/build-and-deploy.yml"
)

missing=0
for file in "${files[@]}"; do
  if [ -f "$file" ] || [ -d "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file - MISSING"
    ((missing++))
  fi
done

echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Push your changes to GitHub:"
echo "   git add ."
echo "   git commit -m 'Deploy blog'"
echo "   git push origin main"
echo ""
echo "2. Go to: https://github.com/KerrasDev/hellaleweb.github.io/settings/pages"
echo ""
echo "3. Set:"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main / (root)"
echo ""
echo "4. Wait 3-5 minutes for deployment"
echo ""
echo "5. Visit: https://hellaleweb.github.io"
echo ""
echo "=========================================="

if [ $missing -eq 0 ]; then
  echo "✅ All files present! Ready for deployment."
else
  echo "⚠️  $missing file(s) missing. Check above."
fi
