---
layout: page
title: الفئات
description: استعرض مقالات مدونة Hellal Web حسب الفئة
lang: ar
dir: rtl
permalink: /categories/
sitemap: true
---

# الفئات 📂

استعرض المقالات حسب الفئة:

<div class="categories-grid">
{% for category in site.categories %}
  <div class="category-card">
    <h3>
      <a href="/categories/{{ category[0] | downcase }}/">
        {{ category[0] }}
      </a>
    </h3>
    <p class="category-count">
      عدد المقالات: <strong>{{ category[1].size }}</strong>
    </p>
  </div>
{% endfor %}
</div>
