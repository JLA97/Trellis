---
name: trellis-consolidate-spec
description: "Audit and maintain an established .trellis/spec tree. Use when the user asks to consolidate existing Trellis specs, fix how agents find them, reconcile stale or conflicting rules, or improve spec verification across a tree or a named area."
---

# Trellis Consolidate Spec

Help a future agent find the right entry points, distinguish required guidance
from useful background, and verify the work once the actual changed paths are
known. Judge maintenance by retrieval, accuracy, and verification.

## Choose the scope

| User intent | Skill |
| --- | --- |
| Establish the first codebase-backed spec set | `trellis-spec-bootstrap` |
| Capture a convention or lesson from one concrete task | `trellis-update-spec` |
| Audit or maintain an existing spec system, across the tree or in one area | `trellis-consolidate-spec` |

Use this workflow for explicit spec maintenance. Load its references as needed
during that work.

## Workflow

1. Start with [the read-only audit](references/audit.md). Establish scope,
   registry ownership and dirty files. Trace entry points and verify findings
   against evidence. Read [replay guidance](references/replay.md) when real work
   items can test the retrieval routes. A limited audit can finish with the
   evidence available and a clear account of what remains unverified.
2. Use the [report templates](references/report-templates.md) to present a
   file-level plan with evidence, affected consumers, semantic impact, and
   verification. Wait for approval before editing specs, consumers, or project
   config. Obtain explicit approval for each change to a normative rule. If no
   change is justified, report the audit findings and stop.
3. Follow [apply and verify](references/apply-and-verify.md) within the approved
   scope. Preserve user changes and treat product source as read-only evidence.
   Separate issues introduced by the edits from existing observations outside
   scope.
