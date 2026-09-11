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
  <div class="card-meta"><span class="topic-pill">Embodied AI</span><span class="topic-pill">Research architecture</span></div>
  <h3><a href="{{ '/blog/predictive-control-factor-hierarchy/' | relative_url }}">Predictive Control Factor Hierarchy</a></h3>
  <p>A four-part exploration of whether learned dynamical relationships can be composed into a hierarchy that supports both prediction and control.</p>
  <p class="card-links"><a href="{{ '/blog/predictive-control-factor-hierarchy/' | relative_url }}">Part I</a> · <a href="{{ '/blog/predictive-control-factor-hierarchy/dynamics-control/' | relative_url }}">Part II</a> · <a href="{{ '/blog/predictive-control-factor-hierarchy/composition-scaling/' | relative_url }}">Part III</a> · <a href="{{ '/blog/predictive-control-factor-hierarchy/experiments/' | relative_url }}">Part IV</a></p>
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
