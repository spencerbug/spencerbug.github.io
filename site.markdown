---
layout: page
title: About This Site
permalink: /site/
---

This site is both a public technical site and a working environment. The writing is meant to be readable on its own, while the coursework is deliberately built to change as I study, test ideas, find gaps, and revise explanations.

It runs on Jekyll and GitHub Pages with a lightly customized Minima theme. Mermaid diagrams, MathJax equations, interactive course quizzes, light/dark theming, and a small browser-local annotation system are layered on top without a separate application backend.

## What are the comment buttons?

On course lessons and technical articles, section headings can have a small 💬 control beside them. Those are **review annotations**, not public comments.

I use them while reading my own material. A comment can be attached to an `h2`, `h3`, or `h4` section and categorized as a question, unclear explanation, expansion request, diagram request, example, correction, lab idea, or general note. If I select text before opening the comment control, that excerpt is captured with the note as additional context.

## Where do the comments go?

They stay in the browser.

Course annotations and writing annotations are stored in `localStorage`, scoped to the page URL. Draft comments are local as well. Nothing is posted to GitHub, sent to a server, or made visible to another visitor.

That also means the annotations do **not** automatically follow me between browsers or devices. They are intentionally lightweight working notes rather than a synchronized comment account.

## How they become revisions

At the bottom of a page with annotations, a review panel collects the notes for that page. Comments can be marked resolved or deleted, and the unresolved set can be copied as either a Markdown report or a prompt plus report.

The authoring loop is roughly:

```text
Read a lesson or article
→ select text when useful
→ add review comments beside sections
→ collect unresolved comments at the bottom
→ copy the Markdown review report
→ give the report to a coding/writing agent
→ revise the source in GitHub
→ mark the addressed comments resolved
```

The useful part is that the handoff contains the page URL, section heading, heading anchor, selected text when present, comment type, and the comment itself. A vague reaction like “this assumes too much” can therefore become a concrete edit against a specific section of the source.

## Why build it this way?

The coursework is meant to behave more like a living technical textbook than a pile of notes. Questions and misunderstandings are evidence about the material: maybe an explanation is weak, a prerequisite appeared too early, a diagram is missing, or a mental model does not survive an experiment.

Keeping the review layer in the browser makes that feedback loop cheap while keeping the public site static and simple.

## Source

The site source is public on [GitHub](https://github.com/spencerbug/spencerbug.github.io). The annotation implementation lives in `assets/annotations.js` and `assets/blog-annotations.js`; the repository's `AGENTS.md` documents the authoring and review conventions used to keep the coursework coherent as it evolves.
