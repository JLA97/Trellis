# Spec maintenance reports

Use the analysis report before edits and the maintenance result after approved
edits. Include sections that carry findings, evidence, or decisions. Omit empty
categories and sections about absent optional features. If evidence materially
limits the audit, state the limitation once where it affects the conclusion.
Use the [supported metrics](replay.md#report-supported-metrics) when the evidence
permits. Cite paths, headings or lines, work artifacts, source or tests, and
reliably associated commits for substantive findings.

## Corpus map

Record the lightweight inventory for every file in the agreed audit scope. Use
the full set of columns with concise entries. Cite real routes and consumers and
keep suspected issues distinct from confirmed defects.

```markdown
| Spec path | Title and headings | Package/layer | Purpose | Applicability | Retrieval routes and links | Consumers | Lines | Classification | Suspected issue |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- | --- |
```

## Work item evidence

Use for real sampled work. Identify the evidence behind the implementation
association and make uncertain associations or unavailable historical selections
explicit only where they affect the findings. For an audit without usable replay,
put the resulting verification limit in the summary instead of emitting an empty
table.

```markdown
| Work item | Planned area | Actual changed area | Specs selected historically | Specs apparently needed | Evidence |
| --- | --- | --- | --- | --- | --- |
```

## Analysis and change plan

Use applicable finding categories. Identify observed facts, inferred impact,
and confidence. Label changes as routing-only, structural, semantic, or cleanup.
State when the evidence supports a read-only conclusion with no edits. When
proposing changes, ask for approval of the concrete plan and any semantic changes.

```markdown
# Spec Retrieval and Consolidation Analysis

## Executive Summary
- Audit scope and depth
- Ownership and registry status
- Evidence sample and material limits
- Main retrieval risks
- Whether structural changes are justified

## Corpus Map

## Retrieval Findings
### Missing or Ambiguous Routes
### Orphan or Unreachable Specs
### Historical Work Replay Failures
### Over-Broad or Inefficient Routes
### Broken JSONL or Link Consumers

## Content Findings
### Duplicate or Fragmented Rules
### Conflicting Rules
### Outdated or Ungrounded Rules
### Terminology and Boundary Problems

## Proposed Changes
| Priority | Change and type | Evidence | Confidence | Retrieval benefit | Semantic impact | Consumers to update | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Decisions Required

## Files to Add, Modify, Move, or Delete

## Verification Plan

## Existing Observations Outside Scope
```

## Maintenance result

List checks actually run and their results. Include a comparison only for
metrics supported by comparable evidence. For a limited audit, report verified
routes and the material limitations in Verification Evidence. List problems
caused by the edits separately from pre-existing observations outside scope.

```markdown
# Spec Maintenance Result

## Changes Applied

## Verification Evidence

## Retrieval Comparison
| Metric | Before | After | Evidence quality |
| --- | ---: | ---: | --- |

## Remaining Decisions or Risks

## Existing Observations Outside Scope
```
