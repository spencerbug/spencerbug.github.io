(function () {
  const storageKey = "site-theme";
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (_) {
      return null;
    }
  }

  function resolvedTheme() {
    const saved = storedTheme();
    if (saved === "light" || saved === "dark") return saved;
    return systemDark.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      const dark = theme === "dark";
      toggle.textContent = dark ? "☀️" : "🌙";
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("aria-pressed", String(dark));
    }
  }

  applyTheme(resolvedTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    nav.appendChild(toggle);

    applyTheme(resolvedTheme());

    toggle.addEventListener("click", function () {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, next);
      } catch (_) {
        // Theme still works for this page even if storage is unavailable.
      }
      applyTheme(next);
    });
  });

  systemDark.addEventListener("change", function () {
    if (!storedTheme()) applyTheme(systemDark.matches ? "dark" : "light");
  });
})();
