(function () {
  "use strict";

  const path = window.location.pathname;
  if (!path.startsWith("/courses/") || path === "/courses/") return;

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
