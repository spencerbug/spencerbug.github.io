---
title: Teach rack onboarding and continuous host assurance
issue_id: AIINFRA-005
summary: Explain how an operator establishes and continuously rechecks the identity, composition, firmware, and configuration of vendor-built racks.
status: ready
priority: P0
type: research
area: host-assurance
effort: L
depends_on: [AIINFRA-002]
labels: [supply-chain, assurance, fleet]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

A lesson sequence connects factory evidence, receiving inspection, discovery, inventory, attestation, configuration validation, burn-in, fleet admission, and continuous runtime assurance.

## Why it matters

An operator cannot safely infer that a delivered rack contains the expected components, firmware, roots of trust, and configuration merely because it came from an approved vendor. At AI-infrastructure scale, assurance must be automatable, repeatable, and useful after the initial intake check.

## Deliverables

- Define threat model, trust anchors, identities, evidence, policies, and failure responses.
- Compare factory, offline intake, installation-time, and continuous checks.
- Trace component discovery across BMC, Redfish, PLDM, PCIe, SMBIOS, firmware inventory, and attestation evidence.
- Explain where physical fixtures help and where they become a throughput bottleneck.
- Develop a concrete onboarding state machine and evidence record.

## Acceptance criteria

- [ ] The material distinguishes authenticity, integrity, configuration compliance, and health.
- [ ] Every claimed property names its evidence source and trust boundary.
- [ ] The workflow includes quarantine, remediation, exception handling, and later drift detection.
- [ ] The lesson identifies what cannot be proven purely in software.
