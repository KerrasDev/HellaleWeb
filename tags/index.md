---
layout: page
title: الوسوم
description: استعرض مقالات مدونة Hellal Web حسب الوسم
lang: ar
dir: rtl
permalink: /tags/
sitemap: true
---

# الوسوم 🏷️

استعرض المقالات حسب الوسم:

<div class="tags-grid">
{% for tag in site.tags %}
  <div class="tag-card">
    <a href="{{ site.baseurl }}/tags/{{ tag[0] | downcase }}/">
      {{ tag[0] }}
      <span class="tag-count">{{ tag[1].size }}</span>
    </a>
  </div>
{% endfor %}
</div>
