#!/usr/bin/env python3
"""Render archived A/B estimates; verify snapshot hashes; never refit or infer.

Requires matplotlib. Run from any directory. Produces SVG and PNG figures.
"""
from pathlib import Path
import hashlib
import json

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/research/soam-studies-ab"
provenance = json.loads((OUT / "provenance.json").read_text())
for record in provenance["files"]:
    data = (OUT / record["download"]).read_bytes()
    assert len(data) == record["bytes"]
    assert hashlib.sha256(data).hexdigest() == record["sha256"]

a = json.loads((OUT / "study-a/statistics.json").read_text())
b = json.loads((OUT / "study-b/statistics.json").read_text())
BLUE, ORANGE, INK = "#176c91", "#b65540", "#233746"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 12,
    "axes.labelcolor": INK, "text.color": INK,
    "xtick.color": INK, "ytick.color": INK,
    "axes.spines.top": False, "axes.spines.right": False,
    "svg.fonttype": "none", "svg.hashsalt": "soam-studies-ab-v1",
})


def save(fig, name):
    fig.set_facecolor("white")
    fig.savefig(OUT / f"{name}.svg", bbox_inches="tight", metadata={"Date": None})
    path = OUT / f"{name}.svg"
    path.write_text("\n".join(line.rstrip() for line in path.read_text().splitlines()) + "\n")
    fig.savefig(OUT / f"{name}.png", bbox_inches="tight", dpi=160)
    plt.close(fig)


fig, ax = plt.subplots(figsize=(7.2, 3.2), layout="constrained")
gain = a["contrasts"]["gain_FU38"]["adjusted"]
m, lo, hi = [100 * gain[k] for k in ("mean", "lo", "hi")]
ax.axvline(0, color=INK, linewidth=1)
ax.axvline(10, color="#476852", linestyle="--", linewidth=1.6)
ax.errorbar(m, 0, xerr=[[m-lo], [hi-m]], fmt="o", color=BLUE,
            capsize=7, markersize=9, linewidth=2.5)
ax.text(m, .23, f"{m:.4f}% mean", ha="center", color=BLUE, weight="bold")
ax.text(10.35, -.35, "10% practical minimum", color="#476852", fontsize=11)
ax.text(0.7, -.68, "Adjusted interval: 0.6950% to 19.5834%", fontsize=11)
ax.set(xlim=(-1, 22), ylim=(-.9, .65), yticks=[],
       xlabel="G32 relative J improvement over FU38 (%)",
       title="Study A · isolated adaptive update benefit")
ax.grid(axis="x", alpha=.15)
save(fig, "a-gain")

fig, ax = plt.subplots(figsize=(7.2, 5.6), layout="constrained")
labels = {
    "FILTER2": (18, 0, "FILTER2 · fitted filter\n~110 linear MACs/step"),
    "PC16": (-115, -50, "PC16 · fixed correction\n~718 linear MACs/step"),
    "PC32": (30, -15, "PC32 · fixed correction\n~1,948 linear MACs/step"),
    "GA32": (25, 32, "GA32 · learned gain\n~1,967 linear MACs/step"),
}
for name, (dx, dy, label) in labels.items():
    x, y = b[name]["J"], b[name]["corrupt"]
    color = ORANGE if name == "FILTER2" else BLUE
    ax.errorbar(x["mean"], y["mean"],
                xerr=[[x["mean"]-x["lo"]], [x["hi"]-x["mean"]]],
                yerr=[[y["mean"]-y["lo"]], [y["hi"]-y["mean"]]],
                fmt="o", color=color, capsize=4, markersize=7, linewidth=1.5)
    ax.annotate(label, (x["mean"], y["mean"]), xytext=(dx, dy),
                textcoords="offset points", fontsize=10, color=color,
                arrowprops={"arrowstyle": "-", "color": color, "alpha": .6})
ax.set(xlim=(.035, .077), ylim=(.045, .43),
       xlabel="Primary prediction error J (NMSE) · lower is better",
       ylabel="Corruption error (NMSE) · lower is better",
       title="Study B v1 · prediction and corruption resistance")
ax.grid(alpha=.15)
save(fig, "b-tradeoff")
print(f"Verified {len(provenance['files'])} evidence hashes; rendered 2 figures. No new inference.")
