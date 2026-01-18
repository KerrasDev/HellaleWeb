---
layout: default
title: جميع الفئات
description: استعرض مقالات مدونة Hellal Web حسب الفئة
lang: ar
dir: rtl
permalink: /categories/
sitemap: true
---

<div class="categories-page">
  <header class="page-header">
    <h1>📂 جميع الفئات</h1>
    <p>تصفح المقالات حسب الموضوع</p>
  </header>

  <div class="categories-grid">
    {% assign categories_list = site.categories | sort %}
    {% for category in categories_list %}
      <div class="category-card">
        <h3>
          <a href="{{ '/categories/' | append: category[0] | slugify | append: '/' | relative_url }}">
            {{ category[0] }}
          </a>
        </h3>
        <p class="category-count">
          {{ category[1].size }} مقالة
        </p>
      </div>
    {% endfor %}
  </div>
</div>