---
layout: page
title: التصنيفات
permalink: /categories/
---

<div class="categories-list">
  {% for category in site.categories %}
    <h3>{{ category[0] }}</h3>
    <ul>
      {% for post in category[1] %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          <span style="font-size: 0.8em; color: #666;"> - {{ post.date | date: "%Y-%m-%d" }}</span>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>