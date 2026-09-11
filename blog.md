---
layout: page
title: Writing
permalink: /blog/
---

Technical essays, research notes, project retrospectives, and experiments that sit outside the linear coursework.

{% if site.posts.size > 0 %}
<div class="writing-list">
  {% for post in site.posts %}
    {% assign summary = post.description %}
    {% if post.pcfh_part == 1 %}{% assign summary = "A candidate architecture for embodied intelligence built around sparse learned dynamical factors, prediction, control, and recursive composition." %}{% endif %}
    {% if post.pcfh_part == 2 %}{% assign summary = "How the same learned factor dynamics could support temporal context, local action sensitivity, reference frames, and downward control." %}{% endif %}
    {% if post.pcfh_part == 3 %}{% assign summary = "A proposal for composing retained factor graphs into smaller predictive-control interfaces that can tile recursively across a hierarchy." %}{% endif %}
    {% if post.pcfh_part == 4 %}{% assign summary = "Concrete experiments, ablations, scaling tests, and failure conditions intended to make the PCFH hypothesis falsifiable." %}{% endif %}
    <article class="writing-card">
      <div class="card-meta">
        {% if post.pcfh_part %}<span class="topic-pill">Embodied AI</span><span class="topic-pill">PCFH</span>{% endif %}
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      </div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {% if summary %}
        <p>{{ summary }}</p>
      {% else %}
        <p>{{ post.excerpt | strip_html | truncatewords: 34 }}</p>
      {% endif %}
    </article>
  {% endfor %}
</div>
{% else %}
No posts yet.
{% endif %}
