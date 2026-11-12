---
layout: page
title: Spencer Neilan
permalink: /
---

<p class="home-tagline">Embedded Linux · Platform Firmware · Systems · Embodied Intelligence</p>

I’m a senior embedded systems and Linux engineer working across production firmware, boot and device security, networking, update systems, and hardware/software debugging. I use this site for technical writing, experiments, living coursework, and research ideas about systems that interact with the physical world.

<div class="landing-links">
  <a class="landing-card" href="{{ '/blog/' | relative_url }}">
    <strong>Writing</strong>
    <span>Technical essays, research notes, project retrospectives, and experiments.</span>
  </a>
  <a class="landing-card" href="{{ '/research/' | relative_url }}">
    <strong>Reports</strong>
    <span>Research protocols, measured results, uncertainty, and the decisions they support.</span>
  </a>
  <a class="landing-card" href="{{ '/courses/' | relative_url }}">
    <strong>Coursework</strong>
    <span>Living systems-engineering courses built around mental models, debugging, measurement, and labs.</span>
  </a>
  <a class="landing-card" href="{{ '/about/' | relative_url }}">
    <strong>About</strong>
    <span>My engineering background, current technical interests, and the threads connecting this work.</span>
  </a>
</div>

## Current writing

<div class="feature-card">
  <div class="card-meta"><span class="topic-pill">Embodied AI</span><span class="topic-pill">Recurrent memory</span></div>
  <h3><a href="{{ '/blog/self-organizing-attractor-memory/' | relative_url }}">Self-Organizing Attractor Memory (SOAM)</a></h3>
  <p>An ongoing research series exploring recurrent memory for embodied intelligence, from the architectural idea to controlled experiments on shared neurons, action-conditioned prediction, and memory.</p>
  <p>Studies A and B now examine recurrent gates and sensory correction, beginning a six-study series branching from E1. The results retain simpler references and make accuracy, robustness, and computation tradeoffs explicit.</p>
  <p class="card-links"><a href="{{ '/blog/soam-studies-a-b-gates-and-correction/' | relative_url }}">Latest article</a> · <a href="{{ '/research/soam-studies-a-b/' | relative_url }}">A + B report</a> · <a href="{{ '/research/soam-studies/' | relative_url }}">Studies A–F</a> · <a href="{{ '/research/soam-e1-results/' | relative_url }}">E1 results</a></p>
</div>

## Current coursework

<div class="course-grid">
  <a class="course-card" href="{{ '/courses/nic-firmware/' | relative_url }}">
    <strong>NIC Firmware Engineering</strong>
    <span>Packet paths, DMA, descriptor rings, interrupts, PCIe, drivers, RDMA, and SmartNIC/DPU architecture.</span>
  </a>
  <a class="course-card" href="{{ '/courses/openbmc/' | relative_url }}">
    <strong>OpenBMC &amp; UEFI Platform Firmware</strong>
    <span>BMC architecture, Yocto, D-Bus, Redfish, IPMI, MCTP/PLDM, update, security, and fleet reliability.</span>
  </a>
  <a class="course-card" href="{{ '/courses/performance-cache/' | relative_url }}">
    <strong>Performance &amp; Cache Optimization</strong>
    <span>TLBs, caches, DRAM, coherence, memory ordering, atomics, profiling, and low-latency experiments.</span>
  </a>
</div>

The site itself is also iterative. The coursework and writing include a browser-local review system that I use to turn questions and annotations back into revisions. [How this site works →]({{ '/site/' | relative_url }})
