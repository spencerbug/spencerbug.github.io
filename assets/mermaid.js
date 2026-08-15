import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

function promoteMermaidCodeBlocks() {
  const blocks = document.querySelectorAll('.language-mermaid pre code, pre code.language-mermaid');

  blocks.forEach((code) => {
    const wrapper = code.closest('.language-mermaid') || code.closest('pre');
    if (!wrapper || wrapper.classList.contains('mermaid')) return;

    const diagram = document.createElement('pre');
    diagram.className = 'mermaid';
    diagram.textContent = code.textContent;
    wrapper.replaceWith(diagram);
  });
}

async function renderMermaid() {
  promoteMermaidCodeBlocks();

  if (!document.querySelector('.mermaid')) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'neutral'
  });

  try {
    await mermaid.run({ querySelector: '.mermaid' });
  } catch (error) {
    console.error('Mermaid rendering failed:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMermaid, { once: true });
} else {
  renderMermaid();
}
