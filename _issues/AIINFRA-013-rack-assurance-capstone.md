---
title: Design the rack onboarding and assurance capstone
issue_id: AIINFRA-013
summary: Integrate management, PCIe, networking, security, and fleet operations in a realistic vendor-rack admission and drift incident.
status: backlog
priority: P1
type: capstone
area: host-assurance
effort: XL
depends_on: [AIINFRA-005, AIINFRA-006, AIINFRA-007, AIINFRA-008, AIINFRA-009, AIINFRA-010]
labels: [capstone, assurance, debugging]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

The learner receives an imperfect evidence bundle for a newly delivered rack, decides whether to admit it to the fleet, then investigates a later configuration or firmware drift event.

## Scenario elements

- Expected bill of materials and signed vendor manifest.
- BMC/Redfish inventory, host enumeration, firmware versions, measured-boot evidence, and network identity.
- Benign discrepancies, one genuine policy violation, and at least one ambiguous signal.
- Admission, quarantine, remediation, exception, and audit decisions.
- A later drift alert that requires correlating multiple control planes.

## Acceptance criteria

- [ ] The capstone requires evidence-based reasoning across at least four specialization tracks.
- [ ] No single command or checksum trivially reveals the answer.
- [ ] The expected solution distinguishes what is known, inferred, and unproven.
- [ ] The final artifact is a concise admission decision and root-cause report.
