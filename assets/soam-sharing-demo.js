/* An untrained illustration of deterministic equivalence, not an E1 candidate. */
(function () {
  'use strict';
  const commands = Object.freeze([0.8, 0.8, -0.6, 0.2, -0.8, 1, 0.4, -0.2]);
  function trajectory(initial, actions, weight, clamp) {
    let h = clamp ? 0 : initial;
    const values = [h];
    actions.forEach(action => {
      h = 0.5 * h + 0.5 * Math.tanh(weight * h + 0.3 * action);
      if (clamp) h = 0;
      values.push(h);
    });
    return values;
  }
  function calculate(weight, initial, lesion) {
    const recall = commands.map(() => 0);
    // Each role is a separate reset episode. One weight value is used everywhere.
    return {
      recall: {
        shared: trajectory(initial, recall, weight, lesion),
        tied: trajectory(initial, recall, weight, lesion)
      },
      transition: {
        shared: trajectory(initial, commands, weight, lesion),
        tied: trajectory(initial, commands, weight, false)
      }
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { trajectory, calculate };
  if (typeof document === 'undefined') return;
  const root = document.getElementById('soam-sharing-demo');
  if (!root) return;
  const weight = root.querySelector('#sharing-weight');
  const cue = root.querySelector('#sharing-cue');
  const lesion = root.querySelector('#sharing-lesion');
  const ns = 'http://www.w3.org/2000/svg';
  function element(tag, attrs, text) {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function draw(id, data, name) {
    const svg = root.querySelector(id);
    svg.replaceChildren();
    const x = i => 48 + i * 48;
    const y = v => 103 - v * 78;
    svg.append(element('title', {}, name + ': activity over eight updates'));
    svg.append(element('desc', {}, 'Solid blue is the shared state; dashed orange is the selected tied state. See the numerical comparison below.'));
    [-1, 0, 1].forEach(v => {
      svg.append(element('line', { x1: 48, y1: y(v), x2: 432, y2: y(v), class: 'sharing-grid' }));
      svg.append(element('text', { x: 36, y: y(v) + 5, 'text-anchor': 'end' }, String(v)));
    });
    [0, 2, 4, 6, 8].forEach(i => svg.append(element('text', { x: x(i), y: 205, 'text-anchor': 'middle' }, String(i))));
    svg.append(element('text', { x: 240, y: 226, 'text-anchor': 'middle' }, 'Update number'));
    svg.append(element('text', { x: 48, y: 14 }, 'Activity'));
    ['shared', 'tied'].forEach(kind => {
      const points = data[kind].map((v, i) => x(i) + ',' + y(v)).join(' ');
      svg.append(element('polyline', { points, class: 'sharing-' + kind }));
    });
  }
  function update() {
    const w = Number(weight.value), h = Number(cue.value);
    root.querySelector('#sharing-weight-value').value = w.toFixed(2);
    root.querySelector('#sharing-cue-value').value = h.toFixed(2);
    const values = calculate(w, h, lesion.checked);
    draw('#sharing-recall', values.recall, 'Recall episode');
    draw('#sharing-transition', values.transition, 'Transition episode');
    const gap = role => Math.max(...values[role].shared.map((v, i) => Math.abs(v - values[role].tied[i])));
    const prefix = lesion.checked
      ? 'The transition traces differ because only the shared transition state was clamped. These are different interventions, not different learned prediction abilities. '
      : 'Both implementations produce exactly equal traces in each role. ';
    root.querySelector('#sharing-status').textContent = prefix + 'Maximum absolute difference: recall ' + gap('recall').toFixed(6) + '; transition ' + gap('transition').toFixed(6) + '.';
  }
  [weight, cue].forEach(input => input.addEventListener('input', update));
  lesion.addEventListener('change', update);
  update();
})();
