#!/usr/bin/env python3
"""Render hash-verified Study C estimates; no model fitting or inference."""

import hashlib
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/research/soam-study-c"
PREVIEW = Path("/private/tmp/soam-study-c-figures")
PREVIEW.mkdir(exist_ok=True)
provenance = json.loads((OUT / "provenance.json").read_text())
for record in provenance["files"]:
    data = (OUT / record["download"]).read_bytes()
    assert len(data) == record["bytes"]
    assert hashlib.sha256(data).hexdigest() == record["sha256"]
stats = json.loads((OUT / "statistics.json").read_text())
limits = json.loads((OUT / "ambiguity-limits.json").read_text())
runtime = json.loads((OUT / "runtime.json").read_text())
delayed = json.loads((OUT / "delayed-resolution.json").read_text())
names = ["PC16", "PC32", "TWO16", "ADAPT1-C", "ADAPT1-M"]
colors = ["#64748b", "#b77b27", "#176c91", "#168070", "#7650a0"]
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 12,
    "axes.spines.top": False, "axes.spines.right": False,
    "axes.labelcolor": "#233746", "text.color": "#233746",
    "svg.fonttype": "none", "svg.hashsalt": "soam-study-c-publication-v1",
})


def save(fig, name):
    fig.set_facecolor("white")
    fig.savefig(OUT / f"{name}.svg", bbox_inches="tight", metadata={"Date": None})
    p = OUT / f"{name}.svg"
    svg = p.read_text().replace("font-family: 'DejaVu Sans'", "font-family: 'DejaVu Sans', Arial, sans-serif")
    p.write_text("\n".join(line.rstrip() for line in svg.splitlines()) + "\n")
    fig.savefig(PREVIEW / f"{name}.png", bbox_inches="tight", dpi=150)
    plt.close(fig)


fig, ax = plt.subplots(figsize=(8.1, 4.5), layout="constrained")
comparisons = ["TWO16 vs PC16", "TWO16 vs PC32", "ADAPT1-M vs ADAPT1-C", "TWO16 vs ADAPT1-M"]
labels = ["Two neural states vs PC16", "Two neural states vs PC32", "Filter mixture vs collapsed filter", "Two neural states vs filter mixture"]
for i, (key, color) in enumerate(zip(comparisons, [colors[2], colors[2], colors[3], colors[4]])):
    v = stats["comparisons"][key]["contrasts"]["benefit"]
    ax.errorbar(v["mean"], i, xerr=[[v["mean"] - v["lo"]], [v["hi"] - v["mean"]]],
                fmt="o", color=color, capsize=4, markersize=7, linewidth=2)
ax.axvline(0, color="#64748b", linewidth=1)
ax.axvline(.01, color="#b65540", linestyle="--", linewidth=1.5)
ax.axvspan(.01, .026, color="#e5f4ee", zorder=-2)
ax.set(yticks=range(4), yticklabels=labels, xlim=(-.002, .026), ylim=(3.5, -.7),
       xlabel="Absolute Brier improvement →", title="The neural benefit survives the capacity control")
ax.text(.0104, -.47, "Declared practical target: 0.01", color="#944431", fontsize=11)
save(fig, "primary-effects")

fig, axes = plt.subplots(2, 1, figsize=(7.7, 6.4), layout="constrained", sharex=True)
for ax, field, scale, title, ylabel in [
    (axes[0], "paired_brier_post24", 1, "Identical histories, different hidden causes", "Paired Brier ↓"),
    (axes[1], "confident_fraction_post24", 100, "How often confidence exceeds 95%", "Post-event steps (%)"),
]:
    for i, (name, color) in enumerate(zip(names, colors)):
        v = limits[name][field]
        ax.bar(i, v["mean"] * scale, color=color, width=.65)
        ax.errorbar(i, v["mean"] * scale, yerr=[[scale * (v["mean"] - v["lo"])] ,
                    [scale * (v["hi"] - v["mean"])]], color="#233746", capsize=4)
        ax.text(i, v["hi"] * scale + (.012 if scale == 1 else 2),
                f"{v['mean']:.3f}" if scale == 1 else f"{100 * v['mean']:.1f}%", ha="center", fontsize=11)
    ax.set(title=title, ylabel=ylabel)
axes[0].axhline(.25, color="#b65540", linestyle="--", label="Equal-prior optimum: 0.25")
axes[0].legend(loc="upper left", frameon=False, fontsize=11)
axes[0].set_ylim(0, .53)
axes[1].set(xticks=range(5), xticklabels=names, ylim=(0, 85))
save(fig, "cause-ambiguity")

fig, ax = plt.subplots(figsize=(7.7, 4.7), layout="constrained")
for i, (name, color) in enumerate(zip(names, colors)):
    first, second = delayed[name]["first_revealing_cue_brier"], delayed[name]["next_cue_brier"]
    ax.plot([0, 1], [first["mean"], second["mean"]], "o-", color=color, label=name)
    for x, v in enumerate([first, second]):
        ax.errorbar(x, v["mean"], yerr=[[v["mean"]-v["lo"]], [v["hi"]-v["mean"]]], color=color, capsize=4)
ax.set(xticks=[0, 1], xticklabels=["First revealing cue\n(step 28)", "Next cue"], xlim=(-.3, 1.3),
       ylim=(-.002, .065), ylabel="Brier score ↓", title="What happens when evidence returns?")
ax.legend(loc="upper right", fontsize=10)
save(fig, "delayed-cues")

lines = ["<!-- Generated directly from archived Study C means and intervals. -->",
         '<div class="e1-table-scroll"><table><thead><tr><th>Model</th><th>Primary Brier [95% CI]</th><th>Prior NMSE</th><th>Late Brier</th><th>Retained scalars</th><th>Serial p95 μs</th></tr></thead><tbody>']
inventory = json.loads((OUT / "development-selection.json").read_text())["inventory"]
for name in inventory:
    d = stats["descriptive"][name]
    b = d["brier"]
    resources = next(iter(runtime.values()))[name]["resources"]
    latency = np.mean([r[name]["timing"]["1"]["p95_us_per_episode_step"] for r in runtime.values()])
    lines.append(f'<tr><th scope="row">{name}</th><td>{b["mean"]:.5f} [{b["lo"]:.5f}, {b["hi"]:.5f}]</td><td>{d["prior_nmse"]["mean"]:.5f}</td><td>{d["late_brier"]["mean"]:.5f}</td><td>{resources["retained_scalars"]}</td><td>{latency:.2f}</td></tr>')
lines.append('</tbody></table></div>')
(ROOT / "_includes/soam-c-confirmation-table.html").write_text("\n".join(lines) + "\n")
generated = [OUT / f"{n}.svg" for n in ("primary-effects", "cause-ambiguity", "delayed-cues")]
generated += [ROOT / "_includes/soam-c-confirmation-table.html", Path(__file__)]
(OUT / "publication-rendering.json").write_text(json.dumps({
    "scope": "Publication figures and table derived from existing estimates; no new scientific observations, fitting, inference, or selection",
    "inputs_manifest_sha256": hashlib.sha256((OUT / "provenance.json").read_bytes()).hexdigest(),
    "generated": {str(p.relative_to(ROOT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in generated},
}, indent=2) + "\n")
print(f"Verified {len(provenance['files'])} evidence files; rendered three figures and the full comparison table.")
