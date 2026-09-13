---
layout: page
title: Course Board
permalink: /issues/
---

This board tracks the work required to turn the current systems coursework into an **AI Infrastructure Firmware Engineering** specialization. Tickets are Markdown files in the repository, so the plan can evolve alongside lessons, labs, diagrams, reviews, and source history.

The board is the working backlog, not a claim that every listed topic has already been studied or published. A separate [GitHub Project view](https://github.com/users/spencerbug/projects/4/views/1) can be used for repository-level planning when synchronization is available.

{% assign issues = site.issues | sort: "issue_id" %}
{% assign in_progress_count = site.issues | where: "status", "in-progress" | size %}
{% assign ready_count = site.issues | where: "status", "ready" | size %}
{% assign backlog_count = site.issues | where: "status", "backlog" | size %}
{% assign blocked_count = site.issues | where: "status", "blocked" | size %}
{% assign done_count = site.issues | where: "status", "done" | size %}

<div class="issue-board">
  <section class="issue-column issue-column--in-progress">
    <h2>In progress</h2>
    <div class="issue-column-count">{{ in_progress_count }} ticket{% unless in_progress_count == 1 %}s{% endunless %}</div>
    {% for issue in issues %}
      {% if issue.status == "in-progress" %}
        {% include issue-card.html issue=issue %}
      {% endif %}
    {% endfor %}
  </section>

  <section class="issue-column issue-column--ready">
    <h2>Ready</h2>
    <div class="issue-column-count">{{ ready_count }} ticket{% unless ready_count == 1 %}s{% endunless %}</div>
    {% for issue in issues %}
      {% if issue.status == "ready" %}
        {% include issue-card.html issue=issue %}
      {% endif %}
    {% endfor %}
  </section>

  <section class="issue-column issue-column--backlog">
    <h2>Backlog</h2>
    <div class="issue-column-count">{{ backlog_count }} ticket{% unless backlog_count == 1 %}s{% endunless %}</div>
    {% for issue in issues %}
      {% if issue.status == "backlog" %}
        {% include issue-card.html issue=issue %}
      {% endif %}
    {% endfor %}
  </section>

  <section class="issue-column issue-column--blocked">
    <h2>Blocked</h2>
    <div class="issue-column-count">{{ blocked_count }} ticket{% unless blocked_count == 1 %}s{% endunless %}</div>
    {% for issue in issues %}
      {% if issue.status == "blocked" %}
        {% include issue-card.html issue=issue %}
      {% endif %}
    {% endfor %}
  </section>

  <section class="issue-column issue-column--done">
    <h2>Done</h2>
    <div class="issue-column-count">{{ done_count }} ticket{% unless done_count == 1 %}s{% endunless %}</div>
    {% for issue in issues %}
      {% if issue.status == "done" %}
        {% include issue-card.html issue=issue %}
      {% endif %}
    {% endfor %}
  </section>
</div>

## Ticket conventions

- **P0** establishes the foundation or unblocks several other tickets; **P1–P3** indicate decreasing urgency.
- Effort is relative: **S**, **M**, **L**, or **XL**. It is not a deadline or hour estimate.
- A ticket moves to **done** only when its acceptance criteria are satisfied.
- Browser-local lesson annotations remain the fine-grained review workflow. Tickets capture larger, durable units of course work.
