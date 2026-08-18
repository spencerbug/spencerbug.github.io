import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const diagramSources = new WeakMap();
let renderPromise = Promise.resolve();

function promoteMermaidCodeBlocks() {
  const blocks = document.querySelectorAll('.language-mermaid pre code, pre code.language-mermaid');

  blocks.forEach((code) => {
    const wrapper = code.closest('.language-mermaid') || code.closest('pre');
    if (!wrapper || wrapper.classList.contains('mermaid')) return;

    const diagram = document.createElement('pre');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    diagramSources.set(diagram, code.textContent);
    wrapper.replaceWith(diagram);
  });
}

function restoreDiagramSources(diagrams) {
  diagrams.forEach((diagram) => {
    let source = diagramSources.get(diagram);
    if (!source) {
      source = diagram.textContent;
      diagramSources.set(diagram, source);
    }

    diagram.textContent = source;
    diagram.removeAttribute('data-processed');
  });
}

async function renderMermaidNow() {
  promoteMermaidCodeBlocks();

  const diagrams = Array.from(document.querySelectorAll('.mermaid'));
  if (!diagrams.length) return;

  restoreDiagramSources(diagrams);

  const dark = document.documentElement.dataset.theme === 'dark';
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: dark ? 'dark' : 'neutral'
  });

  try {
    await mermaid.run({ querySelector: '.mermaid' });
  } catch (error) {
    console.error('Mermaid rendering failed:', error);
  }
}

function renderMermaid() {
  renderPromise = renderPromise.then(renderMermaidNow, renderMermaidNow);
  return renderPromise;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMermaid, { once: true });
} else {
  renderMermaid();
}

window.addEventListener('site-theme-change', renderMermaid);
