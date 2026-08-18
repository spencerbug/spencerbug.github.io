(function () {
  "use strict";

  const path = window.location.pathname;
  if (path === "/" || path === "") return;

  const style = document.createElement("style");
  style.textContent = `
    .site-breadcrumbs {
      border-bottom: 1px solid var(--border);
      color: var(--muted-text);
      font-size: 0.9rem;
      margin: 0 0 1.25rem;
      overflow-x: auto;
      padding: 0 0 0.75rem;
      white-space: nowrap;
    }
    .site-breadcrumbs ol {
      align-items: center;
      display: flex;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .site-breadcrumbs li {
      align-items: center;
      display: inline-flex;
      margin: 0;
    }
    .site-breadcrumbs li + li::before {
      color: var(--muted-text);
      content: "›";
      margin: 0 0.55rem;
    }
    .site-breadcrumbs a {
      color: var(--link);
      text-decoration: none;
    }
    .site-breadcrumbs a:hover,
    .site-breadcrumbs a:focus-visible {
      text-decoration: underline;
    }
    .site-breadcrumbs [aria-current="page"] {
      color: var(--muted-text);
    }
  `;
  document.head.appendChild(style);

  const courseNames = {
    "nic-firmware": "NIC Firmware Engineering",
    "performance-cache": "Performance & Cache Optimization",
    "openbmc": "OpenBMC & UEFI Platform Firmware"
  };

  function titleFromSlug(slug) {
    return slug
      .split("-")
      .filter(Boolean)
      .map(function (word) {
        if (/^(nic|pcie|dma|rdma|rss|numa|cpu|gpu|io|bmc)$/i.test(word)) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function pageTitle() {
    const title = document.querySelector(".post-title");
    if (title) return title.textContent.trim();
    const h1 = document.querySelector(".post-content h1, main h1");
    if (h1) return h1.textContent.trim();
    return document.title.replace(/\s*[|·]\s*.*$/, "").trim();
  }

  const nav = document.createElement("nav");
  nav.className = "site-breadcrumbs";
  nav.setAttribute("aria-label", "Breadcrumb");

  const list = document.createElement("ol");

  function addLink(label, href) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    item.appendChild(link);
    list.appendChild(item);
  }

  function addCurrent(label) {
    const item = document.createElement("li");
    const current = document.createElement("span");
    current.textContent = label;
    current.setAttribute("aria-current", "page");
    item.appendChild(current);
    list.appendChild(item);
  }

  addLink("Home", "/");

  const parts = path.split("/").filter(Boolean);

  if (path === "/courses/") {
    addCurrent("Courses");
  } else if (path.startsWith("/courses/") && parts.length >= 2) {
    const courseSlug = parts[1];
    const courseName = courseNames[courseSlug] || titleFromSlug(courseSlug);

    addLink("Courses", "/courses/");

    if (parts.length === 2) {
      addCurrent(courseName);
    } else {
      addLink(courseName, "/courses/" + courseSlug + "/");
      addCurrent(pageTitle());
    }
  } else if (path === "/blog/") {
    addCurrent("Blog");
  } else if (path === "/about/") {
    addCurrent("About");
  } else if (document.querySelector("article.post .post-meta")) {
    addLink("Blog", "/blog/");
    addCurrent(pageTitle());
  } else {
    addCurrent(pageTitle());
  }

  nav.appendChild(list);

  const post = document.querySelector("article.post");
  const postHeader = post && post.querySelector(":scope > .post-header");
  const postContent = document.querySelector(".post-content");

  if (post && postHeader) {
    post.insertBefore(nav, postHeader);
  } else if (postContent && postContent.parentElement) {
    postContent.parentElement.insertBefore(nav, postContent);
  } else {
    const main = document.querySelector("main .wrapper, main");
    if (main) main.insertBefore(nav, main.firstChild);
  }
})();
