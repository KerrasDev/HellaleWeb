---
layout: page
title: جميع المقالات
description: قائمة بجميع مقالات مدونة Hellal Web التقنية
lang: ar
dir: rtl
permalink: /posts/
sitemap: true
---

# جميع المقالات 📖

استعرض كل المقالات التقنية على مدونة Hellal Web:

{% for post in site.posts %}
<article class="post-list-item">
  <div class="post-list-header">
    <h3>
      <a href="{{ post.url | relative_url }}" class="post-list-link">
        {{ post.title }}
      </a>
    </h3>
    <div class="post-list-meta">
      <span class="post-date">📅 {{ post.date | date: "%d %b %Y" }}</span>
      {% if post.categories %}
        <span class="post-categories">
          📂 
          {% for category in post.categories %}
            <a href="{{ site.baseurl }}/categories/{{ category | downcase }}/" class="category-link">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </span>
      {% endif %}
    </div>
  </div>
  
  <div class="post-list-excerpt">
    {{ post.excerpt | strip_html | truncatewords: 40 }}
    <a href="{{ post.url | relative_url }}" class="read-more">اقرأ المزيد ←</a>
  </div>
  
  {% if post.tags %}
    <div class="post-tags-list">
      {% for tag in post.tags %}
        <a href="/tags/{{ tag | downcase }}" class="tag-small">{{ tag }}</a>
      {% endfor %}
    </div>
  {% endif %}
  
  <hr class="post-divider">
</article>
{% endfor %}
