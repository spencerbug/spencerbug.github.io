(function () {
  'use strict';

  function css(name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }

  function theme() {
    return {
      bg: css('--page-bg', '#ffffff'),
      text: css('--text', '#24292f'),
      muted: css('--muted-text', '#57606a'),
      surface: css('--surface', '#f6f8fa'),
      border: css('--border', '#d0d7de'),
      link: css('--link', '#0969da')
    };
  }

  function commonLayout(height) {
    var t = theme();
    return {
      autosize: true,
      height: height,
      margin: { l: 70, r: 30, t: 70, b: 70 },
      paper_bgcolor: t.bg,
      plot_bgcolor: t.bg,
      font: { color: t.text, family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }
    };
  }

  var labels = ['u₁', 'q₁', 'i₁', 'q₂', 'p_hand', 'touch'];
  var heads = [
    {
      name: 'Head 0 · command / response',
      z: [
        [0.00, 0.94, 0.88, 0.08, 0.05, 0.02],
        [0.94, 0.00, 0.83, 0.31, 0.28, 0.04],
        [0.88, 0.83, 0.00, 0.09, 0.07, 0.02],
        [0.08, 0.31, 0.09, 0.00, 0.22, 0.03],
        [0.05, 0.28, 0.07, 0.22, 0.00, 0.12],
        [0.02, 0.04, 0.02, 0.03, 0.12, 0.00]
      ]
    },
    {
      name: 'Head 1 · kinematic / contact',
      z: [
        [0.00, 0.20, 0.06, 0.03, 0.02, 0.01],
        [0.20, 0.00, 0.11, 0.91, 0.76, 0.09],
        [0.06, 0.11, 0.00, 0.08, 0.05, 0.02],
        [0.03, 0.91, 0.08, 0.00, 0.89, 0.18],
        [0.02, 0.76, 0.05, 0.89, 0.00, 0.93],
        [0.01, 0.09, 0.02, 0.18, 0.93, 0.00]
      ]
    }
  ];

  function renderCompatibility() {
    var el = document.getElementById('pcfh-compatibility-heatmap');
    if (!el || !window.Plotly) return;

    var t = theme();
    var trace = {
      type: 'heatmap',
      x: labels,
      y: labels,
      z: heads[0].z,
      zmin: 0,
      zmax: 1,
      colorscale: 'Viridis',
      colorbar: { title: 'score' },
      hovertemplate: '%{y} ↔ %{x}<br>compatibility=%{z:.2f}<extra></extra>'
    };

    var layout = commonLayout(460);
    layout.title = { text: heads[0].name, x: 0.02, xanchor: 'left' };
    layout.xaxis = { title: 'candidate token j', side: 'bottom', color: t.text };
    layout.yaxis = { title: 'candidate token i', autorange: 'reversed', color: t.text };
    layout.updatemenus = [{
      type: 'dropdown',
      x: 1,
      xanchor: 'right',
      y: 1.17,
      yanchor: 'top',
      buttons: heads.map(function (head) {
        return {
          label: head.name,
          method: 'update',
          args: [{ z: [head.z] }, { title: { text: head.name, x: 0.02, xanchor: 'left' } }]
        };
      })
    }];

    Plotly.react(el, [trace], layout, { responsive: true, displaylogo: false });
  }

  function renderPipeline() {
    var el = document.getElementById('pcfh-pipeline-sankey');
    if (!el || !window.Plotly) return;

    var t = theme();
    var nodeLabels = [
      'Layer ℓ tokens',
      'Compatibility heads',
      'Sparse pairwise edges',
      'Grouping 1: participant sets',
      'Predictive factor slots',
      'Retained factor graph',
      'Grouping 2: composable subgraphs',
      'Compose interface',
      'Layer ℓ+1 macro-tokens'
    ];

    var trace = {
      type: 'sankey',
      arrangement: 'snap',
      orientation: 'h',
      node: {
        label: nodeLabels,
        pad: 20,
        thickness: 18,
        line: { color: t.border, width: 1 },
        color: nodeLabels.map(function (_, i) { return i === 8 ? t.link : t.surface; }),
        hovertemplate: '%{label}<extra></extra>'
      },
      link: {
        source: [0, 1, 2, 3, 4, 5, 6, 7],
        target: [1, 2, 3, 4, 5, 6, 7, 8],
        value:  [9, 8, 6, 5, 5, 4, 3, 3],
        hovertemplate: '%{source.label} → %{target.label}<extra></extra>'
      }
    };

    var layout = commonLayout(520);
    layout.title = { text: 'One complete upward PCFH block', x: 0.02, xanchor: 'left' };
    layout.margin = { l: 20, r: 20, t: 70, b: 20 };

    Plotly.react(el, [trace], layout, { responsive: true, displaylogo: false });
  }

  function renderScaling() {
    var el = document.getElementById('pcfh-scaling-explorer');
    if (!el || !window.Plotly) return;

    var n = [32, 64, 128, 256, 512, 1024, 2048, 4096];
    var h = 8;
    var k = 16;
    var dense = n.map(function (x) { return h * x * x; });
    var sparse = n.map(function (x) { return h * x * k; });

    var traces = [
      {
        x: n,
        y: dense,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'dense H·N² pair scores',
        hovertemplate: 'N=%{x}<br>scores=%{y:,}<extra></extra>'
      },
      {
        x: n,
        y: sparse,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'retained H·N·k edges (k=16)',
        hovertemplate: 'N=%{x}<br>retained=%{y:,}<extra></extra>'
      }
    ];

    var layout = commonLayout(440);
    layout.title = { text: 'Dense pair search vs. a bounded sparse edge budget', x: 0.02, xanchor: 'left' };
    layout.xaxis = { title: 'input tokens N', type: 'log' };
    layout.yaxis = { title: 'head-specific pair/edge count', type: 'log' };
    layout.legend = { orientation: 'h', y: -0.2 };

    Plotly.react(el, traces, layout, { responsive: true, displaylogo: false });
  }

  function renderAll() {
    renderCompatibility();
    renderPipeline();
    renderScaling();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll, { once: true });
  } else {
    renderAll();
  }

  window.addEventListener('site-theme-change', renderAll);
})();
