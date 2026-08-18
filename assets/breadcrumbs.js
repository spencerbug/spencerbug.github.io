(function () {
  "use strict";

  const path = window.location.pathname;
  if (!path.startsWith("/courses/") || path === "/courses/") return;

  const style = document.createElement("style");
  style.textContent = `
    .course-breadcrumbs {
      border-bottom: 1px solid var(--border);
      color: var(--muted-text);
      font-size: 0.9rem;
      margin: 0 0 1.25rem;
      overflow-x: auto;
      padding: 0 0 0.75rem;
      white-space: nowrap;
    }
    .course-breadcrumbs ol {
      align-items: center;
      display: flex;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .course-breadcrumbs li {
      align-items: center;
      display: inline-flex;
      margin: 0;
    }
    .course-breadcrumbs li + li::before {
      color: var(--muted-text);
      content: "›";
      margin: 0 0.55rem;
    }
    .course-breadcrumbs a {
      color: var(--link);
      text-decoration: none;
    }
    .course-breadcrumbs a:hover,
    .course-breadcrumbs a:focus-visible {
      text-decoration: underline;
    }
    .course-breadcrumbs [aria-current="page"] {
      color: var(--muted-text);
    }
  `;
  document.head.appendChild(style);

  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2 || parts[0] !== "courses") return;

  const courseSlug = parts[1];
  const courseNames = {
    "nic-firmware": "NIC Firmware Engineering",
    "performance-cache": "Performance & Cache Optimization",
    "openbmc": "OpenBMC & Platform Firmware"
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
    return document.title.replace(/\s*[|·-]\s*.*$/, "").trim();
  }

  const courseName = courseNames[courseSlug] || titleFromSlug(courseSlug);
  const isCourseIndex = parts.length === 2;

  const nav = document.createElement("nav");
  nav.className = "course-breadcrumbs";
  nav.setAttribute("aria-label", "Course breadcrumb");

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

  addLink("Courses", "/courses/");

  if (isCourseIndex) {
    addCurrent(courseName);
  } else {
    addLink(courseName, "/courses/" + courseSlug + "/");
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
  }
})();
