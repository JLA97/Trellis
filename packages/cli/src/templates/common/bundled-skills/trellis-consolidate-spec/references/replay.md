# Replay retrieval against real work

## Select and document real work

Start from accepted task or design artifacts, repository-owned issue or change
descriptions, inspectable commits with meaningful messages, and regression
tests or migration and release records that explain intent. Read relevant
`prd.md`, `design.md`, `implement.md`, JSONL manifests, research, and legacy
equivalents when present. With no Trellis task artifacts, use real commits,
diffs, and repository-owned change descriptions.

Inspect all usable work items when the set is small. For larger sets, stratify
across the following dimensions where the work actually exists.

- Packages and layers in scope.
- Features, bugs, refactors, migrations, docs, tests, and cross-cutting work.
- Recent changes and changes associated with known regressions.
- Work whose manifests or diffs touch frequently used or suspicious specs.

Record the selection method, coverage, and omitted work. Label a sample as such.
Associate an implementation with an item only when an explicit reference or
inspectable evidence supports the match. For each reliable association, inspect
the actual changed paths, relevant tests, and final behavior. Available graph or
impact tools can illuminate callers, execution flows, and cross-package effects.
Language tooling can identify exact symbols and types. Confirm implementation
observations against source and tests. Use Git history for migrations,
compatibility decisions, and intentional exceptions.

## Replay the original decision

1. Start from the accepted requirements and design or a reliable change
   description available before implementation. Keep the final diff out of this
   routing step. Exclude items with no reliable pre-implementation description
   from replay metrics. Use their verified diffs for content evidence where
   useful.
2. Follow the package and layer indexes. Record required specs supported by
   explicit path, behavior, work, or dependency evidence. Record recommended
   specs with plausible relevance. Give a short reason for every selection.
3. Compare with historical `implement.jsonl` and `check.jsonl` selections when
   present, then with actual changed paths, tests, and final behavior when
   reliably associated. Assess historical selections on evidence.
4. Record planned and actual areas, historical selections, and specs apparently
   needed in the [work evidence table](report-templates.md#work-item-evidence).
   Distinguish missing, ambiguous, stale, and over-broad routes from omitted
   work signals, JSONL curation errors, and spec content gaps.

## Report supported metrics

| Measure | Evidence needed |
| --- | --- |
| Work items with all critical specs retrieved, and work items with at least one retrieval gap | Usable replay sample with defensible required selections. |
| Orphan spec count and broken route or reference count | Scoped corpus map and verified routes or consumers. |
| Unmapped changed-area count | Reliably associated implementation changes and known spec coverage. |
| Median and maximum spec files selected per work item | Actual selections for the reported replay sample. |
| Frequently loaded but mostly irrelevant specs | Repeat selections with evidence of applicability and use. |
| High-confidence conflicts and stale rules | Specific findings backed by the evidence order in the audit. |

Give sample sizes and denominators where they apply. Label estimates and
incomplete samples. Use only observed work and known evidence. If reliable
replay evidence is sparse or missing, complete the limited audit and state which
claims or metrics remain unverified. The absence of historical material is
expected in some projects and carries no defect on its own.

After approved edits, replay the same usable items where comparable evidence
exists. Compare required-spec retrieval, irrelevant loading, unexplained
selections, and verification routes. Check the actual changed paths again where
available. A claim of preserved or improved critical-spec recall requires
evidence from comparable replay and a review of context growth.
