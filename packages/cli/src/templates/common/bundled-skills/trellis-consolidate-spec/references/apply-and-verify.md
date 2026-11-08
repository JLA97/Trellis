# Apply and verify an approved plan

## Apply within the approval

- Match the edits to the approved files and operations. Recheck Git status and
  reread each target and affected consumer before editing. Preserve user changes
  and seek direction when they overlap with a proposed edit. Treat product
  source and tests as read-only evidence throughout this workflow.
- Keep patches focused. Preserve the meaning of a moved, split, merged or
  rephrased rule. Apply a semantic change only when its evidence and intended
  meaning are explicit and approved. Pause for approval if evidence or scope
  changes during the work.
- When creating or reshaping a spec, include the applicable conditions and
  boundaries, the project-specific pattern, evidence paths, symbols, tests or
  accepted decisions, common failures and anti-patterns, reliable verification,
  and related specs that own adjacent rules. Put the change in the approved
  local or registry source and follow the documented synchronization path.
- After a split, merge, move, addition, or deletion, update affected Guidelines
  Index entries, Pre-Development Checklist and Quality Check routes, and related
  links. Find manifests and other consumers of the affected paths when present.
  Apply only approved consumer changes. Historical records require explicit
  approval to edit, and the result report must identify any such edits.
- The standard Trellis JSONL `file` field takes a real repository-relative file
  path with no Markdown fragment. Use a focused file if a section needs to be
  loaded independently. A project with a verified section-aware schema can use
  the format its implementation supports.

## Verify the affected paths

Limit link and consumer checks to the agreed audit scope and the dependencies of
actual edits, including consumers of paths moved or removed by those edits.
Compare with the pre-edit state. Report unrelated pre-existing stale links and
consumers separately from issues caused by the edits. Fix introduced issues
within the approval or report the additional approval needed.

### Structure

Resolve links and file references in that scope. Trace each in-scope active
spec from a deliberate entry point, and check that affected indexes reflect the
final file set. Check affected indexes, related links, active JSONL, and other
affected consumers for references to paths moved or removed by this work. Check
in-scope placeholders and template-only prose, and account for what was resolved,
deliberately retained, or still needs approval. Run
`python3 ./.trellis/scripts/get_context.py --mode packages` when available and
relevant to confirm the intended package and layer structure.

### Meaning

Review the diff rule by rule, including each removal or rewording. Verify that
structural changes preserve normative meaning and that semantic changes match
what was approved. Check applicability and evidence for important rules. Resolve
conflicts with evidence or flag them explicitly, and check that guides and
package specs do not become competing authorities. Report implementation drift
separately. Product source remains read-only during spec maintenance.

### Retrieval

Walk changed checklist and verification routes before and after. Where the
evidence supports it, use the same historical sample and inspect its actual
changed paths. Compare required-spec retrieval, irrelevant loading, and
unexplained selections. Check whether critical-spec recall improved or held
steady without disproportionate context growth. With insufficient comparable
evidence, report the static routes verified and label recall and any dependent
comparison as unverified.

### Runtime

Run applicable repository documentation or spec checks. Validate affected JSONL
with the project's Trellis validation command where available, and check that
standard `file` entries resolve to real repository-relative files. Inspect
paths directly if dedicated tooling is unavailable. Record checks, results, and
material verification limits in the [result report](report-templates.md#maintenance-result).

## Completion

Finish within the agreed scope when the owner and scope are explicit, the corpus
inventory and deliberate routes are verified, important rules are evidence-backed,
and the Pre-Development and Quality Check routes are usable. Account for changes
to meaning and affected consumers, and confirm that applicable checks passed.
Use comparable real work to verify critical-spec retrieval when reliable
evidence exists. Otherwise finish a limited audit with the verified findings and
explicitly mark replay and non-regression as unverified. Stop with findings only
when the evidence justifies no changes.
