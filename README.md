# Spencer Neilan — Systems Coursework

This repository contains the source for my technical blog and living coursework site.

**Website:** [https://spencerbug.github.io](https://spencerbug.github.io)

Current areas of focus include NIC firmware, OpenBMC and platform firmware, performance and cache optimization, embedded and IoT security, trading systems, and embodied AI research.

## Authoring features

The site supports:

- Markdown/Jekyll course pages and blog posts
- persistent light/dark mode
- browser-local course review annotations
- Mermaid diagrams
- MathJax equations

## Course review annotations

Course pages include a private, browser-local review system implemented by `assets/annotations.js`.

Each `h2`, `h3`, and `h4` section gets a small 💬 button. Comments are stored in `localStorage` for that lesson URL and are not published to GitHub.

Workflow:

1. Read a lesson.
2. Optionally select the specific text the comment refers to.
3. Tap the 💬 button beside the section heading.
4. Choose a type such as Question, Unclear, Expand, Diagram, Example, Correction, Lab idea, or Note.
5. Add the comment.
6. At the bottom of the page, review unresolved/resolved comments.
7. Use **Copy report** or **Copy prompt + report** and paste the Markdown into ChatGPT.
8. After the course page is updated, mark comments resolved, clear resolved comments, or use **Clear all comments** to start the lesson review over.

The generated report includes the page URL, section heading, stable anchor, optional selected text, comment type, and comment body so an agent can locate the intended material reliably.

Annotations are intentionally local to the current browser/device and are meant as temporary review notes rather than permanent storage.

### Mermaid diagrams

Use a fenced `mermaid` block:

````markdown
```mermaid
flowchart LR
    CPU --> TLB
    TLB --> Cache
    Cache --> DRAM
```
````

Mermaid blocks are converted and rendered client-side by `assets/mermaid.js`.

### MathJax equations

Inline equation:

```text
\( E = mc^2 \)
```

Display equation:

```text
$$
AMAT = T_{L1} + MR_{L1} \left(T_{L2} + MR_{L2} T_{mem}\right)
$$
```

Single-dollar inline delimiters are intentionally not enabled so normal dollar amounts in prose are not interpreted as math.

## Agent guidelines

See [`AGENTS.md`](AGENTS.md) for conventions used when updating coursework, handling review comments, preserving lesson structure, and authoring diagrams and equations.
