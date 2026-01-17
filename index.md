---
layout: home
title: Hellal Web - مدونة تقنية عربية
description: مدونة متخصصة في نشر مقالات تقنية عربية عالية الجودة
lang: ar
dir: rtl
permalink: /
sitemap: true
---

# مرحبًا بك في Hellal Web 🚀

**Hellal Web** هي مدونة تقنية عربية متخصصة في نشر محتوى برمجي وتحليلي بشكل سريع ومنظم.

## ما نقدمه

- 📝 **مقالات تقنية عربية** عالية الجودة
- 💻 **شروحات برمجية** شاملة وعملية
- 🔧 **نصائح وحيل** تطوير الويب
- 📚 **مراجع تقنية** موثوقة

---

## 📚 آخر المقالات

{% for post in site.posts limit:10 %}
<article class="post-preview">
  <div class="post-header-preview">
    <h3>
      <a href="{{ post.url | relative_url }}" class="post-link">
        {{ post.title }}
      </a>
    </h3>
    <div class="post-meta">
      <span class="post-date">📅 {{ post.date | date: "%d %b %Y" }}</span>
      {% if post.categories %}
      <span class="post-categories">
        📂 
        {% for category in post.categories %}
          <a href="/categories/{{ category | downcase }}" class="category-link">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      </span>
      {% endif %}
    </div>
  </div>
  
  <div class="post-excerpt">
    {{ post.excerpt | strip_html | truncatewords: 50 }}
    <a href="{{ post.url | relative_url }}" class="read-more">اقرأ المزيد ←</a>
  </div>
  
  {% if post.tags %}
  <div class="post-tags-preview">
    {% for tag in post.tags %}
      <a href="/tags/{{ tag | downcase }}" class="tag">{{ tag }}</a>
    {% endfor %}
  </div>
  {% endif %}
  
  <hr class="post-divider">
</article>
{% endfor %}

---

## 🔍 استكشف المدونة

<div class="explore-links">
  <a href="/posts/" class="explore-btn">📖 جميع المقالات</a>
  <a href="/categories/" class="explore-btn">📂 استعرض حسب الفئة</a>
  <a href="/tags/" class="explore-btn">🏷️ استعرض حسب الوسم</a>
  <a href="/about/" class="explore-btn">👤 عن المدونة</a>
</div>
