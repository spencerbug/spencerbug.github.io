(function () {
  "use strict";

  if (!window.location.pathname.startsWith("/courses/") || window.location.pathname === "/courses/") return;

  const article = document.querySelector(".post-content");
  if (!article) return;

  const storageKey = "course-annotations:v1:" + window.location.pathname;
  const draftStorageKey = "course-annotation-drafts:v1:" + window.location.pathname;
  const headingSelector = "h2, h3, h4";
  const commentTypes = ["Question", "Unclear", "Expand", "Diagram", "Example", "Correction", "Lab idea", "Note"];

  let storageAvailable = true;
  let comments = loadJson(storageKey, []);
  let drafts = loadJson(draftStorageKey, {});
  let activeHeading = null;
  let activeCommentId = null;
  let lastSelection = { anchor: "", text: "" };

  function loadJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (_) {
      storageAvailable = false;
      return fallback;
    }
  }

  function saveJson(key, value, empty) {
    if (!storageAvailable) return;
    try {
      if (empty) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      storageAvailable = false;
    }
  }

  function saveComments() { saveJson(storageKey, comments, comments.length === 0); }
  function saveDrafts() { saveJson(draftStorageKey, drafts, Object.keys(drafts).length === 0); }

  function makeId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeText(value) { return String(value || "").replace(/\s+/g, " ").trim(); }
  function markdownText(value) { return String(value || "").replace(/\r\n/g, "\n").trim(); }

  function ensureHeadingId(heading) {
    if (heading.id) return heading.id;
    const base = normalizeText(heading.textContent)
      .toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
      .replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
    let id = base;
    let suffix = 2;
    while (document.getElementById(id)) id = base + "-" + suffix++;
    heading.id = id;
    return id;
  }

  function directArticleChild(node) {
    let element = node && node.nodeType === Node.ELEMENT_NODE ? node : node && node.parentElement;
    if (!element || !article.contains(element)) return null;
    while (element.parentElement && element.parentElement !== article) element = element.parentElement;
    return element.parentElement === article ? element : null;
  }

  function precedingHeading(node) {
    let element = directArticleChild(node);
    while (element) {
      if (element.matches && element.matches(headingSelector)) return element;
      element = element.previousElementSibling;
    }
    return null;
  }

  function rememberSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
    const text = normalizeText(selection.toString());
    if (!text) return;
    const range = selection.getRangeAt(0);
    if (!article.contains(range.commonAncestorContainer)) return;
    const heading = precedingHeading(range.startContainer);
    if (!heading) return;
    lastSelection = { anchor: ensureHeadingId(heading), text: text.slice(0, 800) };
  }

  article.addEventListener("mouseup", rememberSelection);
  article.addEventListener("touchend", function () { window.setTimeout(rememberSelection, 0); });

  const dialog = document.createElement("dialog");
  dialog.className = "annotation-dialog";
  dialog.innerHTML = `
    <form method="dialog" class="annotation-form">
      <div class="annotation-dialog-header">
        <div>
          <strong class="annotation-dialog-title">Add review comment</strong>
          <div class="annotation-dialog-section"></div>
        </div>
        <button type="button" class="annotation-icon-button" data-dialog-close aria-label="Close comment form">×</button>
      </div>

      <div class="annotation-comment-nav" style="display:flex;align-items:center;justify-content:space-between;gap:.5rem">
        <button type="button" class="annotation-button secondary" data-comment-prev aria-label="Previous comment">←</button>
        <span class="annotation-comment-position" style="color:var(--muted-text);font-size:.9rem;text-align:center"></span>
        <button type="button" class="annotation-button secondary" data-comment-next aria-label="Next comment">→</button>
      </div>

      <label>
        Type
        <select class="annotation-type">
          ${commentTypes.map(function (type) { return `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`; }).join("")}
        </select>
      </label>

      <div class="annotation-quote-wrap" hidden>
        <span class="annotation-field-label">Selected text</span>
        <blockquote class="annotation-quote"></blockquote>
      </div>

      <label>
        Comment
        <textarea class="annotation-text" rows="5" required placeholder="What should be clarified, expanded, corrected, diagrammed, or tested?"></textarea>
      </label>

      <div class="annotation-form-actions">
        <button type="button" class="annotation-button danger" data-discard-draft>Discard draft</button>
        <button type="button" class="annotation-button secondary" data-dialog-close>Cancel</button>
        <button type="submit" class="annotation-button primary" data-save-comment>Save comment</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);

  const dialogTitle = dialog.querySelector(".annotation-dialog-title");
  const dialogSection = dialog.querySelector(".annotation-dialog-section");
  const dialogType = dialog.querySelector(".annotation-type");
  const dialogText = dialog.querySelector(".annotation-text");
  const quoteWrap = dialog.querySelector(".annotation-quote-wrap");
  const quoteElement = dialog.querySelector(".annotation-quote");
  const positionElement = dialog.querySelector(".annotation-comment-position");
  const prevButton = dialog.querySelector("[data-comment-prev]");
  const nextButton = dialog.querySelector("[data-comment-next]");
  const discardButton = dialog.querySelector("[data-discard-draft]");
  const saveButton = dialog.querySelector("[data-save-comment]");

  function headingComments() {
    if (!activeHeading) return [];
    const anchor = ensureHeadingId(activeHeading);
    return comments.filter(function (comment) { return comment.anchor === anchor; });
  }

  function saveActiveDraft() {
    if (!activeHeading || activeCommentId) return;
    const anchor = ensureHeadingId(activeHeading);
    const text = dialogText.value;
    const type = dialogType.value;
    const quote = lastSelection.anchor === anchor ? lastSelection.text : "";
    if (!text && type === "Question" && !quote) delete drafts[anchor];
    else drafts[anchor] = {
      section: activeHeading.dataset.annotationSection || normalizeText(activeHeading.textContent),
      anchor: anchor,
      quote: quote,
      type: type,
      comment: text,
      updatedAt: new Date().toISOString()
    };
    saveDrafts();
  }

  function clearDraft(anchor) {
    delete drafts[anchor];
    saveDrafts();
  }

  function renderDialogState(commentId) {
    if (!activeHeading) return;
    activeCommentId = commentId || null;
    const anchor = ensureHeadingId(activeHeading);
    const sectionComments = headingComments();
    const currentIndex = activeCommentId
      ? sectionComments.findIndex(function (comment) { return comment.id === activeCommentId; })
      : sectionComments.length;

    dialogSection.textContent = activeHeading.dataset.annotationSection || normalizeText(activeHeading.textContent);

    if (activeCommentId && currentIndex >= 0) {
      const comment = sectionComments[currentIndex];
      dialogTitle.textContent = "Edit review comment";
      dialogText.value = comment.comment || "";
      dialogType.value = commentTypes.includes(comment.type) ? comment.type : "Question";
      quoteWrap.hidden = !comment.quote;
      quoteElement.textContent = comment.quote || "";
      positionElement.textContent = "Comment " + (currentIndex + 1) + " of " + sectionComments.length;
      discardButton.hidden = true;
      saveButton.textContent = "Save changes";
      prevButton.disabled = currentIndex <= 0;
      nextButton.disabled = false;
    } else {
      const draft = drafts[anchor] || null;
      dialogTitle.textContent = "Add review comment";
      dialogText.value = draft ? (draft.comment || "") : "";
      dialogType.value = draft && commentTypes.includes(draft.type) ? draft.type : "Question";
      const quote = draft && draft.quote ? draft.quote : (lastSelection.anchor === anchor ? lastSelection.text : "");
      if (quote) lastSelection = { anchor: anchor, text: quote };
      quoteWrap.hidden = !quote;
      quoteElement.textContent = quote;
      positionElement.textContent = sectionComments.length ? "New comment · " + sectionComments.length + " existing" : "New comment";
      discardButton.hidden = false;
      saveButton.textContent = "Save comment";
      prevButton.disabled = sectionComments.length === 0;
      nextButton.disabled = true;
    }
  }

  function goPrevious() {
    saveActiveDraft();
    const sectionComments = headingComments();
    if (!sectionComments.length) return;
    if (!activeCommentId) {
      renderDialogState(sectionComments[sectionComments.length - 1].id);
      return;
    }
    const index = sectionComments.findIndex(function (comment) { return comment.id === activeCommentId; });
    if (index > 0) renderDialogState(sectionComments[index - 1].id);
  }

  function goNext() {
    const sectionComments = headingComments();
    if (!activeCommentId) return;
    const index = sectionComments.findIndex(function (comment) { return comment.id === activeCommentId; });
    if (index < 0) return;
    if (index < sectionComments.length - 1) renderDialogState(sectionComments[index + 1].id);
    else renderDialogState(null);
  }

  prevButton.addEventListener("click", goPrevious);
  nextButton.addEventListener("click", goNext);
  dialogText.addEventListener("input", saveActiveDraft);
  dialogType.addEventListener("change", saveActiveDraft);

  dialog.querySelectorAll("[data-dialog-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      saveActiveDraft();
      dialog.close();
    });
  });

  discardButton.addEventListener("click", function () {
    if (!activeHeading || activeCommentId) return;
    const anchor = ensureHeadingId(activeHeading);
    clearDraft(anchor);
    dialogText.value = "";
    dialogType.value = "Question";
    lastSelection = { anchor: "", text: "" };
    renderDialogState(null);
  });

  dialog.addEventListener("cancel", saveActiveDraft);

  dialog.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (!activeHeading) return;
    const text = markdownText(dialogText.value);
    if (!text) return;

    const anchor = ensureHeadingId(activeHeading);
    if (activeCommentId) {
      const existing = comments.find(function (comment) { return comment.id === activeCommentId; });
      if (!existing) return;
      existing.type = dialogType.value;
      existing.comment = text;
      existing.updatedAt = new Date().toISOString();
    } else {
      comments.push({
        id: makeId(),
        section: activeHeading.dataset.annotationSection || normalizeText(activeHeading.textContent),
        anchor: anchor,
        quote: lastSelection.anchor === anchor ? lastSelection.text : "",
        type: dialogType.value,
        comment: text,
        createdAt: new Date().toISOString(),
        resolved: false
      });
      clearDraft(anchor);
    }

    saveComments();
    dialogText.value = "";
    dialogType.value = "Question";
    lastSelection = { anchor: "", text: "" };
    activeCommentId = null;
    activeHeading = null;
    dialog.close();
    render();
  });

  function openCommentDialog(heading) {
    activeHeading = heading;
    activeCommentId = null;
    renderDialogState(null);
    dialog.showModal();
    window.setTimeout(function () { dialogText.focus(); }, 0);
  }

  const headings = Array.from(article.querySelectorAll(headingSelector));
  headings.forEach(function (heading) {
    ensureHeadingId(heading);
    heading.dataset.annotationSection = normalizeText(heading.textContent);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "annotation-add";
    button.setAttribute("aria-label", "Add or edit review comments for " + heading.dataset.annotationSection);
    button.setAttribute("title", "Add or edit review comments");
    button.innerHTML = `<span aria-hidden="true">💬</span><span class="annotation-count" hidden></span>`;
    button.addEventListener("click", function () { openCommentDialog(heading); });
    heading.appendChild(button);
  });

  const reviewPanel = document.createElement("section");
  reviewPanel.className = "annotation-review";
  reviewPanel.setAttribute("aria-labelledby", "annotation-review-title");
  article.appendChild(reviewPanel);

  function unresolvedComments() { return comments.filter(function (comment) { return !comment.resolved; }); }

  function buildReport() {
    const active = unresolvedComments();
    const pageTitleElement = document.querySelector(".post-title") || document.querySelector("h1");
    const pageTitle = pageTitleElement ? normalizeText(pageTitleElement.textContent) : document.title;
    const lines = ["# Course Review Report", "", "Page: " + pageTitle, "URL: " + window.location.pathname, "Unresolved comments: " + active.length, ""];
    if (!active.length) {
      lines.push("No unresolved comments.");
      return lines.join("\n");
    }
    active.forEach(function (comment, index) {
      lines.push("## Comment " + (index + 1) + " — " + comment.type, "", "Section: " + comment.section, "Anchor: #" + comment.anchor);
      if (comment.quote) lines.push("Selected text:", "> " + comment.quote.replace(/\n/g, "\n> "));
      lines.push("", "Comment:", comment.comment, "");
    });
    return lines.join("\n").trim();
  }

  function buildPromptAndReport() {
    return [
      "Please address every actionable comment in the review report below.",
      "Update the relevant course page in spencerbug/spencerbug.github.io.",
      "Preserve technical accuracy, useful existing content, and stable headings/anchors where practical.",
      "Add requested explanations, notes, Mermaid diagrams, equations, examples, or labs where they improve the lesson.",
      "Keep the lesson focused enough to review in one sitting, splitting it only if necessary.",
      "",
      buildReport()
    ].join("\n");
  }

  async function copyText(text, button) {
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (_) {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
      helper.remove();
    }
    if (copied && button) {
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(function () { button.textContent = original; }, 1200);
    }
  }

  function renderHeadingCounts() {
    headings.forEach(function (heading) {
      const anchor = ensureHeadingId(heading);
      const count = comments.filter(function (comment) { return comment.anchor === anchor && !comment.resolved; }).length;
      const countElement = heading.querySelector(".annotation-count");
      if (!countElement) return;
      countElement.textContent = count ? String(count) : "";
      countElement.hidden = count === 0;
      heading.classList.toggle("has-annotations", count > 0);
    });
  }

  function renderReviewPanel() {
    const active = unresolvedComments();
    const resolvedCount = comments.length - active.length;
    const cards = comments.map(function (comment) {
      return `
        <article class="annotation-card${comment.resolved ? " resolved" : ""}" data-comment-id="${escapeHtml(comment.id)}">
          <div class="annotation-card-head">
            <div><span class="annotation-type-badge">${escapeHtml(comment.type)}</span><a href="#${escapeHtml(comment.anchor)}">${escapeHtml(comment.section)}</a></div>
            <button type="button" class="annotation-icon-button" data-action="delete" aria-label="Delete comment">×</button>
          </div>
          ${comment.quote ? `<blockquote class="annotation-card-quote">${escapeHtml(comment.quote)}</blockquote>` : ""}
          <div class="annotation-card-text">${escapeHtml(comment.comment).replace(/\n/g, "<br>")}</div>
          <label class="annotation-resolved-toggle"><input type="checkbox" data-action="resolve" ${comment.resolved ? "checked" : ""}> Resolved</label>
        </article>`;
    }).join("");

    reviewPanel.innerHTML = `
      <div class="annotation-review-header"><div><h2 id="annotation-review-title">Review comments</h2><p>${active.length} unresolved${resolvedCount ? ` · ${resolvedCount} resolved` : ""}</p></div></div>
      ${storageAvailable ? "" : `<p class="annotation-storage-warning"><strong>Local storage is unavailable.</strong> Comments and drafts will only last for this page session.</p>`}
      <div class="annotation-list">${cards || `<p class="annotation-empty">No comments yet. Use the 💬 button beside a section heading to add one.</p>`}</div>
      <div class="annotation-report">
        <h3>Review report</h3>
        <p>This report is generated from the comments above. Edit individual comments from their section controls.</p>
        <textarea class="annotation-report-text" rows="10" readonly></textarea>
        <div class="annotation-report-actions">
          <button type="button" class="annotation-button primary" data-action="copy-report" ${active.length ? "" : "disabled"}>Copy report</button>
          <button type="button" class="annotation-button" data-action="copy-prompt" ${active.length ? "" : "disabled"}>Copy prompt + report</button>
          <button type="button" class="annotation-button secondary" data-action="clear-resolved" ${resolvedCount ? "" : "disabled"}>Clear resolved</button>
          <button type="button" class="annotation-button danger" data-action="clear-all" ${comments.length ? "" : "disabled"}>Clear all comments</button>
        </div>
      </div>`;
    reviewPanel.querySelector(".annotation-report-text").value = buildReport();
  }

  reviewPanel.addEventListener("change", function (event) {
    if (event.target.dataset.action !== "resolve") return;
    const card = event.target.closest("[data-comment-id]");
    if (!card) return;
    const comment = comments.find(function (item) { return item.id === card.dataset.commentId; });
    if (!comment) return;
    comment.resolved = event.target.checked;
    saveComments();
    render();
  });

  reviewPanel.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "delete") {
      const card = button.closest("[data-comment-id]");
      if (!card) return;
      comments = comments.filter(function (comment) { return comment.id !== card.dataset.commentId; });
      saveComments();
      render();
      return;
    }
    if (action === "copy-report") return copyText(buildReport(), button);
    if (action === "copy-prompt") return copyText(buildPromptAndReport(), button);
    if (action === "clear-resolved") {
      comments = comments.filter(function (comment) { return !comment.resolved; });
      saveComments();
      render();
      return;
    }
    if (action === "clear-all") {
      if (!window.confirm("Delete all review comments for this lesson?")) return;
      comments = [];
      saveComments();
      render();
    }
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) {
      comments = loadJson(storageKey, []);
      render();
    }
    if (event.key === draftStorageKey) drafts = loadJson(draftStorageKey, {});
  });

  function render() {
    renderHeadingCounts();
    renderReviewPanel();
  }

  render();
})();
