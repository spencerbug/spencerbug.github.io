---
title: Build the platform identity and attestation sequence
issue_id: AIINFRA-006
summary: Connect roots of trust, secure boot, measured boot, TPM evidence, component identity, and verifier policy without collapsing them together.
status: ready
priority: P0
type: curriculum
area: platform-security
effort: L
depends_on: [AIINFRA-002]
labels: [security, tpm, attestation]
created: 2026-09-13
updated: 2026-09-13
---

## Outcome

Learners can explain what each trust mechanism proves, what it does not prove, and how evidence moves from boot-time measurement to a fleet admission decision.

## Deliverables

- Separate device identity, firmware authenticity, measured state, authorization, and health.
- Trace PCR extension, event logs, quotes, freshness, endorsement chains, and verifier appraisal.
- Compare host, BMC, NIC/DPU, drive, and accelerator trust boundaries.
- Explain certificate enrollment, provisioning, rotation, revocation, and recovery.
- Include adversarial cases and ambiguous evidence.

## Acceptance criteria

- [ ] Secure boot and measured boot are never presented as interchangeable.
- [ ] The verifier checks freshness and recomputes measurements from the event log.
- [ ] Multi-component ownership and reset boundaries are explicit.
- [ ] Failure handling covers both compromise and ordinary service events.
