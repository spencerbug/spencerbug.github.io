---
layout: page
title: Blog
permalink: /blog/
---

# Blog

Technical write-ups, project notes, experiments, and ideas live here.

{% if site.posts.size > 0 %}
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>{{ post.date | date: "%Y-%m-%d" }}</small>
    </li>
  {% endfor %}
</ul>
{% else %}
No posts yet. The old blog has been cleared so new posts can start from a clean slate.
{% endif %}
