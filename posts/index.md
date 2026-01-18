---
layout: page
title: جميع المقالات
description: قائمة بجميع مقالات مدونة هلال ويب التقنية
lang: ar
dir: rtl
permalink: /posts/
sitemap: true
---

# جميع المقالات 📖

استعرض كل المقالات التقنية على مدونة هلال ويب:

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
      <!-- View counter placeholder -->
      <span class="post-views-list" data-post-url="{{ post.url }}">👁️ <span class="view-count">--</span> مشاهدة</span>
    </div>
  </div>
  
  <div class="post-list-excerpt">
    {{ post.excerpt | strip_html | truncatewords: 40 }}
    <a href="{{ post.url | relative_url }}" class="read-more">اقرأ المزيد ←</a>
  </div>
  
  {% if post.tags %}
    <div class="post-tags-list">
      {% for tag in post.tags %}
        <a href="{{ site.baseurl }}/tags/{{ tag | downcase }}/" class="tag-small">{{ tag }}</a>
      {% endfor %}
    </div>
  {% endif %}
  
  <hr class="post-divider">
</article>
{% endfor %}

<!-- View Counter Script for Post List -->
<script>
  (function() {
    const viewCountElements = document.querySelectorAll('.post-views-list');
    const namespace = 'hellaleweb';
    
    viewCountElements.forEach(element => {
      const postUrl = element.getAttribute('data-post-url');
      const postPath = postUrl.replace(/\//g, '-').replace(/^-|-$/g, '');
      
      // Use 'get' instead of 'hit' to not increment on list pages
      fetch(`https://api.countapi.xyz/get/${namespace}/${postPath}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          element.querySelector('.view-count').textContent = (data.value || 0);
        })
        .catch(() => {
          element.querySelector('.view-count').textContent = '0';
        });
    });
  })();
</script>