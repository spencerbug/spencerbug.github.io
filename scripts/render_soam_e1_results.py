#!/usr/bin/env python3
"""Render archived E1 statistics only. No model runs or statistical re-estimation.

Requires matplotlib and numpy. Run from any directory; outputs SVG + PNG.
"""
from pathlib import Path
import hashlib
import json

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/research/soam-e1-results"
provenance = json.loads((OUT / "provenance.json").read_text())
for record in provenance["files"]:
    assert hashlib.sha256((OUT / record["download"]).read_bytes()).hexdigest() == record["sha256"]
s = json.loads((OUT / "statistics.json").read_text())
BLUE, ORANGE, INK = "#176c91", "#b65540", "#233746"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 13,
                     "axes.labelcolor": INK, "text.color": INK,
                     "xtick.color": INK, "ytick.color": INK,
                     "axes.spines.top": False, "axes.spines.right": False,
                     "svg.fonttype": "none", "svg.hashsalt": "soam-e1-results-v1"})

def save(fig, name):
    fig.set_facecolor("white")
    fig.savefig(OUT / (name + ".svg"), bbox_inches="tight", metadata={"Date": None})
    svg = OUT / (name + ".svg")
    svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
    fig.savefig(OUT / (name + ".png"), bbox_inches="tight", dpi=180)
    plt.close(fig)

def interval(ax, stats, y, color, dots=False):
    if dots:
        values = stats["root_values"]
        ax.scatter(values, y + np.linspace(-.12, .12, len(values)), color=color,
                   alpha=.45, s=28, zorder=2)
    m, lo, hi = stats["mean"], stats["lower95"], stats["upper95"]
    ax.errorbar(m, y, xerr=[[m-lo], [hi-m]], fmt="o", color=color, capsize=5,
                markersize=8, linewidth=2.5, zorder=3)

fig, ax = plt.subplots(figsize=(5.5, 3.4), layout="constrained")
ax.axvspan(0, .02, color="#e2eee5")
ax.axvline(.02, color="#476852", linestyle="--", linewidth=1.5)
for y, key, color in [(1, "recall_pre", BLUE), (0, "recall_final", ORANGE)]:
    interval(ax, s["model_statistics"]["S32"][key], y, color, dots=True)
ax.set(yticks=[0, 1], yticklabels=["After joint\ntraining", "Recall-only\ncheckpoint"],
       xlim=(0, .17), ylim=(-.65, 1.65), xlabel="Recall error (NMSE) · lower is better")
ax.text(.022, 1.48, "Required ≤ 0.02", fontsize=12, color="#476852")
ax.set_xticks([0, .04, .08, .12, .16])
ax.grid(axis="x", alpha=.15)
save(fig, "recall-gate")

fig, ax = plt.subplots(figsize=(5.5, 4.5), layout="constrained")
names = ["S32", "D25", "D16", "G28", "G32", "L12", "SYM32"]
labels = ["S32 · shared", "D25 · disjoint", "D16 · disjoint", "G28 · GRU", "G32 · GRU", "L12 · linear", "SYM32 · symmetric"]
for y, name in enumerate(names):
    color = ORANGE if name == "S32" else BLUE
    interval(ax, s["model_statistics"][name]["free8_nmse"], y, color)
ax.set(yticks=range(len(names)), yticklabels=labels, xlim=(0, .215),
       xlabel="Free-8 error (NMSE) · lower is better")
ax.invert_yaxis()
ax.set_xticks([0, .05, .10, .15, .20]); ax.grid(axis="x", alpha=.15)
save(fig, "prediction")

fig, ax = plt.subplots(figsize=(4.5, 3.9), layout="constrained")
for key, label, color in [("distance_ratios_by_episode", "S32", ORANGE),
                           ("zero_S_distance_ratios_by_episode", "S = 0 control", BLUE)]:
    # Step zero is d(0)/d(0) = 1 by definition, not an additional observation.
    rows = [{"mean": 1.0, "lower95": 1.0, "upper95": 1.0}] + s["recovery_curves"][key]
    x = np.arange(0, 11)
    ax.plot(x, [r["mean"] for r in rows], marker="o", markersize=4, label=label, color=color)
    ax.fill_between(x, [r["lower95"] for r in rows], [r["upper95"] for r in rows], color=color, alpha=.18)
ax.set(xlabel="Recovery step", ylabel="Hidden distance / initial distance", xlim=(0,10), ylim=(0,1.03))
ax.set_xticks([0, 2, 4, 6, 8, 10]); ax.legend(frameon=False, fontsize=12); ax.grid(alpha=.15)
save(fig, "contraction")

fig, ax = plt.subplots(figsize=(4.5, 3.9), layout="constrained")
for x, key, color in [(0,"perturb",ORANGE), (1,"zero_S_perturb",BLUE)]:
    row=s["diagnostic_statistics"][key]["recall_nmse"]
    ax.bar(x, row["mean"], width=.55, color=color)
    ax.errorbar(x, row["mean"], yerr=[[row["mean"]-row["lower95"]], [row["upper95"]-row["mean"]]], color=INK, capsize=5)
    ax.text(x, row["upper95"]+.03, f'{row["mean"]:.3f}', ha="center", fontsize=14)
ax.axhline(.02, color="#476852", linestyle="--")
ax.set(xticks=[0,1], xticklabels=["S32", "S = 0 control"], ylim=(0,1.17), ylabel="Perturbed recall error (NMSE)")
ax.text(.98, .10, "Required ≤ 0.02", transform=ax.transAxes, ha="right", fontsize=11,
        color="#476852", bbox={"facecolor": "white", "edgecolor": "none", "pad": 3})
save(fig, "recovery-error")

fig, ax = plt.subplots(figsize=(5.5, 4), layout="constrained")
u=s["utility"]
for y in range(5):
    m=u["mean"][y]; lo=u["lower"][y]; hi=u["upper"][y]
    ax.errorbar(100*m, y, xerr=[[100*(m-lo)], [100*(hi-m)]], fmt="o", color=BLUE, capsize=5, linewidth=2)
ax.axvline(0,color=INK,linewidth=1); ax.axvline(10,color="#476852",linestyle="--")
ax.set(yticks=range(5), yticklabels=["vs D25", "vs D16", "vs G28", "vs G32", "vs L12"],
       xlabel="S32 relative gain (%) · positive favors S32", xlim=(-250, 45))
ax.invert_yaxis(); ax.grid(axis="x",alpha=.15)
save(fig, "benefit-intervals")
print("Verified evidence checksums; rendered 5 figures as SVG + PNG. No new inference.")
