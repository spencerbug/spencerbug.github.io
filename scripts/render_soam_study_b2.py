#!/usr/bin/env python3
"""Render archived B2 estimates and a labeled conceptual schematic; no inference."""

import hashlib
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/research/soam-study-b2"
PREVIEW = Path("/tmp/soam-b2-publication-figures")
PREVIEW.mkdir(exist_ok=True)
provenance = json.loads((OUT / "provenance.json").read_text())
for record in provenance["files"]:
    data = (OUT / record["download"]).read_bytes()
    assert len(data) == record["bytes"]
    assert hashlib.sha256(data).hexdigest() == record["sha256"]
stats = json.loads((OUT / "statistics.json").read_text())
resources = json.loads((OUT / "resources.json").read_text())
d = stats["descriptive"]
ORIGINAL, ADAPTIVE, NEURAL, INK = "#b65540", "#168070", "#176c91", "#233746"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 13,
    "axes.labelcolor": INK, "text.color": INK,
    "xtick.color": INK, "ytick.color": INK,
    "axes.spines.top": False, "axes.spines.right": False,
    "svg.fonttype": "none", "svg.hashsalt": "soam-study-b2-publication-v1",
})


def save(fig, name):
    fig.set_facecolor("white")
    fig.savefig(OUT / f"{name}.svg", bbox_inches="tight", metadata={"Date": None})
    path = OUT / f"{name}.svg"
    path.write_text("\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n")
    fig.savefig(PREVIEW / f"{name}.png", bbox_inches="tight", dpi=150)
    plt.close(fig)


def bar(label, value, maximum, kind, formatted=None):
    return (f'<div class="b2-bar-row"><span>{label}</span>'
            f'<span class="b2-track" aria-hidden="true"><span class="b2-fill {kind}" '
            f'style="width:{100 * value / maximum:.5f}%"></span></span>'
            f'<b>{formatted or f"{value:.5f}"}</b></div>')


headlines = ['<!-- Generated from the hash-verified frozen B2 statistics. -->', '<div class="b2-metrics">']
for key, title in [('J', 'Ordinary prediction'), ('corrupt', 'Original corruption test'), ('change', 'Genuine state change')]:
    maximum = max(d[n][key]['mean'] for n in ('FILTER2', 'ADAPT1', 'PC16'))
    headlines.append(f'<div class="b2-metric"><strong>{title} · error ↓</strong>')
    for model, label, kind in [('FILTER2', 'Original filter', ''), ('ADAPT1', 'Adaptive variance', 'adaptive'), ('PC16', 'Neural reference', 'neural')]:
        headlines.append(bar(label, d[model][key]['mean'], maximum, kind))
    headlines.append('</div>')
headlines.append('</div>\n<p class="b2-caption">Measured means; each panel has its own linear scale. Fresh B2 confirmation, ten fitted roots. Error bars and all eight models are in the companion report.</p>')
(ROOT / '_includes/soam-b2-headline.html').write_text('\n'.join(headlines) + '\n')

cost = ['<!-- Generated from the archived B2 resource measurements. -->', '<div class="b2-costs">']
for title, values, formats in [
    ('Fitted scalars · smaller ↓', [resources[n]['fitted_scalars'] for n in ('ADAPT1', 'PC16')], ['64', '1,340']),
    ('Measured μs / step · faster ↓', [resources[n]['latency']['1']['mean_us_per_step'] for n in ('ADAPT1', 'PC16')], ['102.78', '28.73']),
]:
    cost.append(f'<div class="b2-cost"><strong>{title}</strong>')
    for label, value, kind, formatted in zip(['Adaptive variance', 'Neural reference'], values, ['adaptive', 'neural'], formats):
        cost.append(bar(label, value, max(values), kind, formatted))
    cost.append('</div>')
cost.append('</div>\n<p class="b2-caption">Same Apple M3 Max, one Torch thread, batch one, every-four sensing; minimal prediction/correction loops. Adaptive variance uses float64, the neural reference float32. Scalars exclude hand-selected constants; full storage and operation accounting is in the report.</p>')
(ROOT / '_includes/soam-b2-cost.html').write_text('\n'.join(cost) + '\n')

# Deliberately synthetic geometry: an explanatory slice of the feature space.
fig, axes = plt.subplots(1, 3, figsize=(9, 4.4))
fig.subplots_adjust(left=.06, right=.98, bottom=.23, top=.72, wspace=.27)
titles = ['Genuine displacement', 'Inconsistent channels', 'Coherent false cue']
for ax, title, end, color in zip(axes, titles, [(1.6, 0), (1.15, 1.2), (1.6, 0)], [NEURAL, ORIGINAL, NEURAL]):
    ax.set(xlim=(-.15, 2), ylim=(-.45, 1.65))
    ax.axhline(0, color=INK, linewidth=1.6)
    ax.annotate('', xy=end, xytext=(0, 0), arrowprops={'arrowstyle': '-|>', 'lw': 3, 'color': color})
    if end[1]:
        ax.plot([end[0], end[0]], [0, end[1]], color=ADAPTIVE, linestyle='--', linewidth=2)
        ax.text(.2, 1.42, 'Leftover disagreement', fontsize=11, color=ADAPTIVE)
    else:
        ax.text(.15, 1.1, 'Fits a possible\nstate displacement', fontsize=12, color=NEURAL)
    ax.set_title(title, fontsize=12, pad=16, weight='bold')
    ax.set_axis_off()
fig.text(.5, .93, 'Large innovation: sensor fault or real movement?', ha='center', size=18, weight='bold')
fig.text(.5, .12, 'Horizontal: changes the learned observation model can explain.\nVertical: residual disagreement after removing that component.', ha='center', size=12)
fig.text(.5, .025, 'Conceptual slice, not measured data. The two blue cases can look identical.', ha='center', size=11)
save(fig, 'disagreement')

conditions = [('isolated', 'Isolated outlier'), ('channels', 'Two corrupted channels'), ('corrupt', 'Original corruption'), ('heavy', 'Heavy-tailed noise'), ('biased', 'Biased / correlated noise'), ('coherent', 'Coherent snapshot'), ('sustained', 'Sustained plausible fault')]
fig, ax = plt.subplots(figsize=(8, 6.6), layout='constrained')
for idx, (key, label) in enumerate(conditions):
    for name, offset, color in [('FILTER2', -.13, ORIGINAL), ('ADAPT1', .13, ADAPTIVE)]:
        v = d[name][key]
        ax.errorbar(v['mean'], idx + offset, xerr=[[v['mean'] - v['lo']], [v['hi'] - v['mean']]], fmt='o', color=color, capsize=3, markersize=6, lw=1.5, label=('Original filter' if name == 'FILTER2' else 'Adaptive variance') if idx == 0 else None)
ax.axhspan(4.5, 6.5, color='#fff1da', zorder=-2)
ax.set(yticks=np.arange(len(conditions)), yticklabels=[v[1] for v in conditions], ylim=(6.6, -.7), xlim=(-.02, .61), xlabel='Feature error (NMSE) · lower is better')
ax.set_title('Strong gains on inconsistent evidence\nAlmost none on plausible false states', size=17, weight='bold', pad=18)
ax.grid(axis='x', alpha=.15)
ax.legend(loc='center right', bbox_to_anchor=(1, .43), frameon=False, fontsize=11)
save(fig, 'faults')

# Explicitly descriptive intervals; primary family-adjusted comparisons stay separate.
models = [('FILTER2', 'Original filter'), ('STABLE', 'Stable arithmetic'), ('R100', 'Conservative variance'), ('NIS99', 'Nominal hard gate'), ('CHANNEL2', 'Channel Huber'), ('NISEMP', 'Calibrated hard gate'), ('ADAPT1', 'Adaptive variance'), ('PC16', 'Neural reference')]
fig, axes = plt.subplots(1, 3, figsize=(10, 6.8), sharey=True, layout='constrained')
for ax, key, title, target in zip(axes, ['J', 'corrupt', 'change'], ['Ordinary prediction', 'Original corruption', 'Genuine change'], [.05, .15, .07]):
    for i, (name, _) in enumerate(models):
        v = d[name][key]
        color = ADAPTIVE if name in {'ADAPT1', 'NISEMP'} else NEURAL if name == 'PC16' else ORIGINAL
        ax.errorbar(v['mean'], i, xerr=[[v['mean'] - v['lo']], [v['hi'] - v['mean']]], fmt='o', color=color, capsize=3)
    ax.axvline(target, ls='--', color='#8b6d32', lw=1)
    ax.set_title(title, size=12)
    ax.set_xlabel('NMSE ↓')
    ax.grid(axis='x', alpha=.15)
axes[0].set(yticks=np.arange(len(models)), yticklabels=[v[1] for v in models], ylim=(7.6, -.6))
fig.suptitle('Eight confirmed designs · means and ordinary 95% intervals\nDashed lines: frozen absolute targets', size=15)
save(fig, 'all-correctors')

table = ['<!-- Generated from archived estimates; intervals in linked statistics. -->', '<div class="e1-table-scroll"><table><thead><tr><th>Corrector (ID)</th><th>Ordinary J</th><th>Balanced corruption C</th><th>Original corruption</th><th>Genuine change</th></tr></thead><tbody>']
for name, label in models:
    table.append(f'<tr><th scope="row">{label} ({name})</th>' + ''.join(f'<td>{d[name][k]["mean"]:.5f}</td>' for k in ('J', 'C', 'corrupt', 'change')) + '</tr>')
table.append('</tbody></table></div>')
(ROOT / '_includes/soam-b2-confirmation-table.html').write_text('\n'.join(table) + '\n')
print(f'Verified {len(provenance["files"])} evidence hashes; rendered 3 figures and 3 includes. No new inference.')
