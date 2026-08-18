(function () {
  "use strict";

  if (!window.location.pathname.startsWith("/courses/") || window.location.pathname === "/courses/") return;

  const reportPrompt = [
    "Please address every actionable comment in the review report below.",
    "Update the relevant course page in spencerbug/spencerbug.github.io.",
    "Preserve technical accuracy, useful existing content, and stable headings/anchors where practical.",
    "Add requested explanations, notes, Mermaid diagrams, equations, examples, or labs where they improve the lesson.",
    "Keep the lesson focused enough to review in one sitting, splitting it only if necessary.",
    ""
  ].join("\n");

  let editedReport = null;

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

  function enhanceReport() {
    const textarea = document.querySelector(".annotation-report-text");
    if (!textarea) return;

    textarea.removeAttribute("readonly");
    textarea.setAttribute("aria-label", "Editable course review report");

    if (editedReport !== null && textarea.value !== editedReport) {
      textarea.value = editedReport;
    }

    if (!textarea.dataset.reportEditorBound) {
      textarea.dataset.reportEditorBound = "true";
      textarea.addEventListener("input", function () {
        editedReport = textarea.value;
      });
    }
  }

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action='copy-report'], [data-action='copy-prompt']");
    if (!button) return;

    const textarea = document.querySelector(".annotation-report-text");
    if (!textarea) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    editedReport = textarea.value;
    if (button.dataset.action === "copy-prompt") {
      copyText(reportPrompt + editedReport, button);
    } else {
      copyText(editedReport, button);
    }
  }, true);

  const observer = new MutationObserver(function () {
    enhanceReport();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  enhanceReport();
})();
