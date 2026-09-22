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

  var robot = [0.5, 1.5];
  var target = [2.8, 2.1];
  var distractor = [3.2, 0.8];
  var bins = [-55, -45, -35, -25, -15, -5, 5, 15, 25, 35, 45, 55];
  var times = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
  var pans = [0, 3, 6, 9, 12, 14];
  var commands = [30, 30, 30, 30, 20, 0];
  var targetWorldBearing = bearing(robot, target);
  var distractorWorldBearing = bearing(robot, distractor);

  function radians(degrees) {
    return degrees * Math.PI / 180;
  }

  function bearing(from, to) {
    return Math.atan2(to[1] - from[1], to[0] - from[0]) * 180 / Math.PI;
  }

  function gaussian(x, center, sigma) {
    var d = x - center;
    return Math.exp(-(d * d) / (2 * sigma * sigma));
  }

  function rayEnd(angleDeg, length) {
    return [
      robot[0] + length * Math.cos(radians(angleDeg)),
      robot[1] + length * Math.sin(radians(angleDeg))
    ];
  }

  function geometryTraces(index) {
    var pan = pans[index];
    var axis = rayEnd(pan, 3.3);
    var fovLow = rayEnd(pan - 55, 3.3);
    var fovHigh = rayEnd(pan + 55, 3.3);
    var targetRetinal = targetWorldBearing - pan;
    var distractorRetinal = distractorWorldBearing - pan;
    var targetActivation = bins.map(function (bin) {
      return Math.abs(targetRetinal) <= 55 ? gaussian(bin, targetRetinal, 6) : 0;
    });
    var distractorActivation = bins.map(function (bin) {
      return Math.abs(distractorRetinal) <= 55 ? gaussian(bin, distractorRetinal, 6) : 0;
    });
    var combined = bins.map(function (_, i) {
      return Math.min(1, targetActivation[i] + distractorActivation[i]);
    });

    return [
      {
        x: [robot[0], target[0], distractor[0]],
        y: [robot[1], target[1], distractor[1]],
        xaxis: 'x', yaxis: 'y',
        type: 'scatter', mode: 'markers+text',
        text: ['camera', 'green marker', 'amber marker'],
        textposition: ['bottom center', 'top center', 'bottom center'],
        marker: { size: [15, 18, 16], color: ['#57606a', '#2da44e', '#bf8700'], symbol: ['square', 'circle', 'diamond'] },
        hovertemplate: '%{text}<br>x=%{x:.2f} m<br>y=%{y:.2f} m<extra></extra>',
        showlegend: false
      },
      {
        x: [robot[0], axis[0]], y: [robot[1], axis[1]], xaxis: 'x', yaxis: 'y',
        type: 'scatter', mode: 'lines', line: { color: '#0969da', width: 3 },
        hoverinfo: 'skip', showlegend: false
      },
      {
        x: [fovLow[0], robot[0], fovHigh[0]], y: [fovLow[1], robot[1], fovHigh[1]], xaxis: 'x', yaxis: 'y',
        type: 'scatter', mode: 'lines', fill: 'toself',
        line: { color: 'rgba(9,105,218,0.35)', width: 1 }, fillcolor: 'rgba(9,105,218,0.08)',
        hoverinfo: 'skip', showlegend: false
      },
      {
        x: bins, y: targetActivation, xaxis: 'x2', yaxis: 'y2',
        type: 'scatter', mode: 'lines+markers', name: 'green component (diagnostic)', line: { color: '#2da44e' },
        hovertemplate: 'bin=%{x}°<br>green diagnostic=%{y:.3f}<extra></extra>'
      },
      {
        x: bins, y: distractorActivation, xaxis: 'x2', yaxis: 'y2',
        type: 'scatter', mode: 'lines+markers', name: 'amber component (diagnostic)', line: { color: '#bf8700' },
        hovertemplate: 'bin=%{x}°<br>amber diagnostic=%{y:.3f}<extra></extra>'
      },
      {
        x: bins, y: combined, xaxis: 'x2', yaxis: 'y2',
        type: 'bar', name: 'combined input', marker: { color: '#6985ab' }, opacity: 0.65,
        hovertemplate: 'bin=%{x}°<br>unlabeled input=%{y:.3f}<extra></extra>'
      }
    ];
  }

  function geometryLayout(index) {
    var t = theme();
    var narrow = window.innerWidth < 650;
    return {
      autosize: true,
      height: narrow ? 720 : 590,
      margin: { l: 55, r: 20, t: 100, b: 110 },
      paper_bgcolor: t.bg,
      plot_bgcolor: t.bg,
      font: { color: t.text, family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
      title: {
        text: 'Scripted geometry · t=' + times[index].toFixed(1) + ' s<br>pan=' + pans[index] + '° · green bearing=' + (targetWorldBearing - pans[index]).toFixed(2) + '°',
        font: { size: narrow ? 15 : 18 },
        x: 0.02, xanchor: 'left'
      },
      barmode: 'group',
      legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 10 } },
      xaxis: { domain: narrow ? [0, 1] : [0, 0.44], anchor: 'y', range: [0, 4], title: { text: 'world x (m)' }, gridcolor: t.border, zeroline: false },
      yaxis: { domain: narrow ? [0.58, 1] : [0, 1], anchor: 'x', range: [0, 3], title: { text: 'world y (m)' }, scaleanchor: 'x', scaleratio: 1, gridcolor: t.border, zeroline: false },
      xaxis2: { domain: narrow ? [0, 1] : [0.61, 1], anchor: 'y2', range: [-61, 61], title: { text: 'retinal bearing (°)' }, gridcolor: t.border, zeroline: false },
      yaxis2: { domain: narrow ? [0, 0.4] : [0, 1], anchor: 'x2', range: [0, 1.08], title: { text: 'intensity' }, gridcolor: t.border, zeroline: false },
      sliders: [{
        active: index,
        currentvalue: { prefix: 'time: ', suffix: ' s' },
        pad: { t: 58 },
        steps: times.map(function (time, i) {
          return {
            label: time.toFixed(1),
            method: 'animate',
            args: [['frame-' + i], { mode: 'immediate', frame: { duration: 0, redraw: true }, transition: { duration: 0 } }]
          };
        })
      }]
    };
  }

  function renderGeometry() {
    var el = document.getElementById('rpr-geometry-explorer');
    if (!el || !window.Plotly) return;
    Plotly.purge(el);
    var frames = times.map(function (_, i) {
      return { name: 'frame-' + i, data: geometryTraces(i), layout: geometryLayout(i) };
    });
    Plotly.newPlot(el, geometryTraces(0), geometryLayout(0), { responsive: true, displaylogo: false })
      .then(function () { return Plotly.addFrames(el, frames); });
  }

  function renderTrajectory() {
    var el = document.getElementById('rpr-state-trajectory');
    if (!el || !window.Plotly) return;
    var t = theme();
    var retinal = pans.map(function (pan) { return targetWorldBearing - pan; });
    var trace = {
      type: 'scatter3d',
      mode: 'lines+markers+text',
      x: retinal,
      y: pans,
      z: commands,
      text: times.map(function (time) { return 't=' + time.toFixed(1) + 's'; }),
      textposition: 'top center',
      marker: { size: 6, color: times, colorscale: 'Viridis', colorbar: { title: 'time (s)' } },
      line: { color: t.link, width: 6 },
      hovertemplate: '%{text}<br>green retinal bearing=%{x:.2f}°<br>camera pan=%{y:.1f}°<br>command=%{z:.1f}°/s<extra></extra>'
    };
    var layout = {
      autosize: true,
      height: 520,
      margin: { l: 20, r: 20, t: 70, b: 20 },
      paper_bgcolor: t.bg,
      font: { color: t.text, family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
      title: { text: 'Scripted physical trajectory<br>not a learned latent space', font: { size: 17 }, x: 0.02, xanchor: 'left' },
      scene: {
        bgcolor: t.bg,
        xaxis: { title: { text: 'green bearing (°)' }, gridcolor: t.border },
        yaxis: { title: { text: 'camera pan (°)' }, gridcolor: t.border },
        zaxis: { title: { text: 'pan command (°/s)' }, gridcolor: t.border },
        camera: { eye: { x: 1.5, y: 1.5, z: 1.0 } }
      }
    };
    Plotly.react(el, [trace], layout, { responsive: true, displaylogo: false });
  }

  function renderAll() {
    renderGeometry();
    renderTrajectory();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll, { once: true });
  } else {
    renderAll();
  }

  window.addEventListener('site-theme-change', renderAll);
})();
