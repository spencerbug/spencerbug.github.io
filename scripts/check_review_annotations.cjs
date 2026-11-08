/* DOM behavior checks, not a substitute for real-browser layout inspection.
 * Build Jekyll first. Install jsdom in a temporary test directory and expose
 * its node_modules with NODE_PATH; no production dependency is required.
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, "..");
const script = name => fs.readFileSync(path.join(root, "assets", name), "utf8");
let cases = 0;

function page(url, stored = {}, unavailable = false) {
  const html = fs.readFileSync(path.join(root, "_site", url, "index.html"), "utf8");
  const dom = new JSDOM(html, {url: "https://example.test" + url, runScripts: "outside-only"});
  const w = dom.window;
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; };
  w.matchMedia = () => ({matches: false, addEventListener() {}});
  let copied = "";
  Object.defineProperty(w.navigator, "clipboard", {value: {writeText: async text => {copied = text;}}});
  w.confirm = () => true;
  for (const [key, value] of Object.entries(stored)) w.localStorage.setItem(key, value);
  if (unavailable) Object.defineProperty(w, "localStorage", {get() {throw Error("blocked");}});
  w.eval(script("breadcrumbs.js"));
  w.eval(script("annotations.js"));
  w.eval(script("blog-annotations.js"));
  return {dom, w, d: w.document, copied: () => copied};
}
function stored(w) { return Object.fromEntries(Object.keys(w.localStorage).map(k => [k, w.localStorage.getItem(k)])); }
function event(w, element, name) {element.dispatchEvent(new w.Event(name, {bubbles: true, cancelable: true}));}
function save(p, text, type = "Theory") {
  const input = p.d.querySelector(".annotation-text"); input.value = text;
  p.d.querySelector(".annotation-type").value = type;
  event(p.w, input, "input"); event(p.w, p.d.querySelector(".annotation-form"), "submit");
}

async function run() {
  for (const url of ["/research/", "/research/soam-e1/", "/research/soam-e1-results/",
                     "/blog/testing-shared-recurrent-memory/", "/blog/a-memory-can-settle-and-still-be-wrong/"]) {
    const prefix = url.startsWith("/research/") ? "report" : "blog";
    const key = prefix + "-annotations:v1:" + url;
    const draftKey = prefix + "-annotation-drafts:v1:" + url;
    let p = page(url);
    assert.equal(p.d.querySelectorAll(".annotation-review").length, 1);
    assert.equal(p.d.querySelectorAll(".annotation-dialog").length, 1);
    assert(p.d.querySelector('.site-nav .page-link[href="/research/"]'));
    assert(p.d.querySelector('.site-nav label[for="nav-trigger"]'));
    assert.equal(p.d.querySelectorAll(".annotation-type option").length, 11);
    assert(p.d.querySelector('.annotation-type option[value="Report issue"]'));
    assert(p.d.querySelector('.annotation-type option[value="Theory"]'));
    assert(p.d.querySelector('.annotation-type option[value="Ideas"]'));
    if (prefix === "report" && url !== "/research/") assert(p.d.querySelector('.site-breadcrumbs a[href="/research/"]'));

    // A selected excerpt and draft survive a close/reload, with URL isolation.
    const para = [...p.d.querySelectorAll(".post-content > p")].find(e => e.textContent.trim());
    const range = p.d.createRange(); range.selectNodeContents(para);
    p.w.getSelection().addRange(range); event(p.w, para, "mouseup");
    p.d.querySelector(".post-title .annotation-add").click();
    const input = p.d.querySelector(".annotation-text"); input.value = "Review fixture";
    p.d.querySelector(".annotation-type").value = "Theory"; event(p.w, input, "input");
    assert(p.w.localStorage.getItem(draftKey));
    const snapshot = stored(p.w); p.dom.window.close(); p = page(url, snapshot);
    p.d.querySelector(".post-title .annotation-add").click();
    assert.equal(p.d.querySelector(".annotation-text").value, "Review fixture");
    assert(p.d.querySelector(".annotation-quote").textContent.length > 0);
    save(p, "Review fixture");
    let records = JSON.parse(p.w.localStorage.getItem(key));
    assert.equal(records[0].type, "Theory"); assert.equal(records[0].anchor, "article-introduction");
    assert.equal(p.w.localStorage.getItem(draftKey), null);
    const saved = stored(p.w); p.dom.window.close(); p = page(url, saved);
    assert.equal(p.d.querySelectorAll(".annotation-card").length, 1);
    assert(!p.d.querySelector(".annotation-report-text").value.includes("💬"));
    assert(p.d.querySelector(".annotation-report-text").value.includes("URL: " + url));

    // Editing, copy report/prompt, resolution and removal use the same controls.
    p.d.querySelector(".post-title .annotation-add").click();
    p.d.querySelector("[data-comment-prev]").click(); save(p, "Edited fixture", "Ideas");
    p.d.querySelector('[data-action="copy-report"]').click(); await Promise.resolve();
    assert(p.copied().includes("Edited fixture"));
    p.d.querySelector('[data-action="copy-prompt"]').click(); await Promise.resolve();
    assert(p.copied().includes("relevant " + (prefix === "report" ? "report" : "blog post")));
    const toggle = p.d.querySelector('[data-action="resolve"]'); toggle.checked = true; event(p.w, toggle, "change");
    assert.equal(JSON.parse(p.w.localStorage.getItem(key))[0].resolved, true);
    assert(p.d.querySelector(".annotation-report-text").value.includes("No unresolved comments."));
    p.d.querySelector('[data-action="clear-resolved"]').click(); assert.equal(p.w.localStorage.getItem(key), null);
    p.d.querySelector(".post-title .annotation-add").click(); save(p, "Delete fixture");
    p.d.querySelector('[data-action="delete"]').click(); assert.equal(p.w.localStorage.getItem(key), null);
    p.d.querySelector(".post-title .annotation-add").click(); save(p, "Clear fixture");
    p.w.confirm = () => false; p.d.querySelector('[data-action="clear-all"]').click();
    assert(p.w.localStorage.getItem(key));
    p.w.confirm = () => true; p.d.querySelector('[data-action="clear-all"]').click();
    assert.equal(p.w.localStorage.getItem(key), null);
    const other = page(url === "/research/" ? "/research/soam-e1/" : "/research/", saved);
    assert.equal(other.d.querySelectorAll(".annotation-card").length, 0); other.dom.window.close();
    p.dom.window.close(); cases++;
  }

  const url="/blog/testing-shared-recurrent-memory/", key="blog-annotations:v1:"+url;
  const legacy=[{id:"preexisting",anchor:"article-introduction",section:"Introduction",type:"Report issue",comment:"Existing note",resolved:false}];
  let p=page(url,{[key]:JSON.stringify(legacy)});
  assert(p.d.querySelector(".annotation-card-text").textContent.includes("Existing note"));
  assert.equal(p.w.localStorage.getItem(key),JSON.stringify(legacy)); p.dom.window.close(); cases++;

  p=page("/research/soam-e1-results/",{},true);
  assert(p.d.querySelector(".annotation-storage-warning"));
  p.d.querySelector(".post-title .annotation-add").click(); save(p,"Session-only fixture");
  assert(p.d.querySelector(".annotation-card-text").textContent.includes("Session-only fixture")); p.dom.window.close(); cases++;

  for (const url of ["/", "/blog/", "/courses/"]) {
    p=page(url); assert.equal(p.d.querySelectorAll(".annotation-review").length,0); p.dom.window.close(); cases++;
  }
  const courseFile=fs.readdirSync(path.join(root,"_site/courses/nic-firmware"),{withFileTypes:true}).find(e=>e.isDirectory() && fs.existsSync(path.join(root,"_site/courses/nic-firmware",e.name,"index.html")));
  assert(courseFile);
  p=page("/courses/nic-firmware/"+courseFile.name+"/");
  assert.equal(p.d.querySelectorAll(".annotation-review").length,1); p.dom.window.close(); cases++;

  p=page("/research/"); p.w.eval(script("theme.js")); event(p.w,p.d,"DOMContentLoaded");
  assert.equal(p.d.documentElement.dataset.theme,"light");
  p.d.querySelector(".theme-toggle").click(); assert.equal(p.d.documentElement.dataset.theme,"dark");
  assert.equal(p.w.localStorage.getItem("site-theme"),"dark"); p.dom.window.close(); cases++;
  console.log(`PASS: ${cases} DOM scenarios; persistence/drafts/selection/edit/copy/resolve/delete/isolation, legacy blog keys, course separation, unavailable storage, navigation and theme toggling.`);
}
run().catch(error => {console.error(error); process.exitCode=1;});
