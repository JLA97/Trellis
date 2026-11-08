# Read-only spec audit

## Use the project's existing evidence

Inventory the corpus, test retrieval, inspect the rules implicated by the
findings, and propose changes only where they improve the outcome. Treat specs,
consumer files, config, and product code as read-only during the audit.

The retrieval interface consists of the package and layer indexes, applicability
statements, checklists, and related-spec links. Inline workflows follow those
routes before development and use the Quality Check routes after the actual
changed paths are known. Sub-agent workflows may record the selected spec and
research paths in `implement.jsonl` and `check.jsonl`. A manifest records the
selection after discovery. A configured registry may own the spec source.

Use existing tasks, issues, design docs, source, tests, and Git history. Use
additional local tools only when they resolve a material evidence gap. The
method works without Trellis collaboration, memory, agents, task tooling, or
optional analysis integrations. Keep installation, configuration, and auditing
of optional features outside scope. Their absence is normal. Omit warnings and
empty report sections about them, and proceed with the available evidence.

## Establish scope and ownership

1. Confirm that Trellis is initialized and `.trellis/spec/` exists. Bound the
   audit to the whole tree, selected packages or layers, or a named retrieval
   problem before reading the corpus.
2. Inspect Git status, `.trellis/config.yaml`, the spec-related portions of
   `.trellis/workflow.md`, and `.trellis/.template-hashes.json` when present.
   Record modified, staged and untracked target or consumer files. Use
   `python3 ./.trellis/scripts/get_context.py --mode packages` if available to
   check how the project discovers packages and layers.
3. Check `registry.spec` and its source and template settings. Use the configured
   ownership and update behavior to identify where the change belongs. The
   local tree, the registry, or a documented synchronization of both can be the
   edit target. If ownership is unclear, keep the audit read-only and ask for
   direction before planning an edit that an update could overwrite.

## Build a corpus map

Start with a lightweight inventory of every spec file in scope. Record the path,
title and headings, line count, owning package or layer, stated purpose, and
applicability or when-to-read signals. Trace links to and from indexes,
checklists, and related specs. Record known consumers, including any relevant
`implement.jsonl` and `check.jsonl` references. Flag obvious placeholders,
stale path names, and broken links as candidates for inspection. Use the
[corpus map template](report-templates.md#corpus-map). Read full files only when
the map, retrieval replay, or an evidence conflict gives a reason.

| Classification | Meaning |
| --- | --- |
| Entry point | A deliberate route into the corpus, usually an `index.md`. |
| Normative spec | Project-specific contracts and conventions. |
| Cross-cutting guide | Reasoning or verification that spans packages or layers. |
| Supporting reference | Guidance reached through another spec or route. |
| Template or placeholder | Content still awaiting repository evidence. |
| Orphan candidate | No valid retrieval route has been found. Verify before declaring an orphan. |
| Ownership uncertain | The local, registry, or template edit source remains unclear. |

Assign the applicable classification to each row and retain uncertainty where
necessary.

## Audit retrieval routes

Trace the routes a future agent could follow from the work description and the
entry points available before coding. For each package or layer index in scope,
check the following.

| Check | What to inspect |
| --- | --- |
| Applicability | Identify the code area and behavior the layer covers. State where similarly named guidance ceases to apply. |
| Before and after | Look for a usable Pre-Development Checklist and a Quality Check section with routes that can be followed once the actual changes are known. Follow each relevant verification route through to the command, test, or example it names. Confirm the destination provides the promised evidence, even when the intermediate spec link resolves. |
| Concrete signals | Route by observable changes, such as touching `packages/cli/src/migrations/**`, changing a persisted schema, adding a platform, or fixing public behavior. A label like “Errors” or “Platform” needs an applicability condition. |
| Selection size | Reach the smallest complete set of required specs from each signal. Trigger shared guides only on concrete conditions. |

Trace each active spec to an index checklist or Quality Check, a related-spec
link from a reachable file, a documented shared-guide trigger, or another
deliberate project entry point. Report confirmed orphans, routes to missing
files, routes reachable only by guessing filenames, excessive fan-out, circular
or contradictory routes, and in-scope manifests with missing or moved paths.
Treat route labels and applicability as part of the interface. A supporting
file can be reachable through a valid indirect route.

Where suitable work exists, [replay retrieval](replay.md) and compare selections
to actual changed paths and tests. When historical evidence is insufficient,
finish a limited audit using the declared routes and available content evidence.
State which conclusions require replay or additional evidence.

## Assess evidence for rule changes

Read the [shared spec admission rules](admission.md) before proposing new or
stronger guidance. If the reference is unavailable, omit those changes from
the plan. Keep content judgment separate from the approval to edit.

Missing evidence alone does not invalidate an existing rule. Keep it in place
without broadening its reach. Propose removal or narrowing only when evidence
shows which scope or version is wrong or superseded. Treat departures from a
still-binding rule as implementation drift.

## Audit content and structure

| Finding | How to assess it |
| --- | --- |
| Duplication or fragmentation | Find repeated normative rules, a single contract spread across files usually read together, or a guide repeating a package-owned rule. Prefer a canonical rule with links. Merge only when applicability and ownership match. Keep valid rules that are old, rarely used, duplicated, or currently violated until evidence justifies a change. |
| Stale or ungrounded content | Check removed paths, commands, libraries, fields or architecture, template prose, generic advice, rules inferred from one accidental implementation, and examples that fail or no longer show the preferred pattern. |
| Placement | Keep concrete conventions with the owning package or layer, shared reasoning and verification in cross-cutting guides, and temporary facts in work artifacts. Cross-cutting guides may need detail. |
| Context cost | Investigate unrelated applicability domains in one file, large reads for a small used section, contracts that require several files together, broad indexes with weak routes, frequently used rules buried behind several hops, and background duplicated from work artifacts. Use length and file counts as diagnostic signals and justify splits or merges by applicability and ownership. |

### Classify conflicts

1. Quote or precisely locate each rule and determine whether scopes or versions
   allow both to apply correctly.
2. Check accepted decisions, public behavior and tests, accepted work and
   migration history, then repeated source patterns. Current implementation,
   majority style, and document recency can supply clues about drift.
3. Classify the conflict as stale guidance, implementation drift, scope
   ambiguity, or an unresolved product decision. When normative intent remains
   uncertain, preserve both rules temporarily, document the conflict, and ask
   for the needed decision. Report implementation drift separately from spec
   changes.

## Present the plan for approval

Use the [analysis report](report-templates.md#analysis-and-change-plan). Cite
exact paths and headings, lines, tests, or reliably associated commits for
substantive findings. Separate observations from inferred impact and label
confidence as high, medium, or low. Keep out-of-scope historical observations
separate from in-scope findings and issues introduced by actual edits.

Classify changes as routing-only, structural with preserved meaning, semantic,
or cleanup. Prioritize reachable routes and broken consumers before cosmetic
consistency. Name the exact files and operations, consumer effects, semantic
impact, risk, and verification for every proposed change. Obtain plan approval
before editing, plus explicit approval of the intended meaning for any semantic
change.

Stop without edits when the corpus is accurate and usable, the only findings
are cosmetic, ownership is unresolved, evidence cannot support a change, or a
semantic decision awaits approval. Report what is verified and uncertain and the
smallest next step that could resolve a material gap. A scoped audit can finish
with concrete findings even when replay is unavailable.
