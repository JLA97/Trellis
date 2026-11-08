# Update Code-Spec - Capture Executable Contracts

At task close, after debugging, or after a design decision, review whether the
work warrants a local spec update. API, cross-layer, schema, and infrastructure
changes are reasons to review the relevant contract.

Read the [shared spec admission rules](../trellis-consolidate-spec/references/admission.md)
relative to this installed skill before writing. If the reference is unavailable
or no change qualifies, complete the review without editing spec files. Apply
qualifying changes within the current task's authorization. Use
`trellis-consolidate-spec` for an explicitly requested audit or cross-spec cleanup.

---

## Spec Structure Overview

```
.trellis/spec/
├── <layer>/           # Per-layer coding standards (e.g., backend/, frontend/, api/)
│   ├── index.md       # Overview and links
│   └── *.md           # Topic-specific guidelines
└── guides/            # Thinking checklists (NOT coding specs!)
    ├── index.md       # Guide index
    └── *.md           # Topic-specific guides
```

### CRITICAL: Code-Spec vs Guide - Know the Difference

| Type | Location | Purpose | Content Style |
|------|----------|---------|---------------|
| **Code-Spec** | `<layer>/*.md` | Tell AI "how to implement safely" | Signatures, contracts, matrices, cases, test points |
| **Guide** | `guides/*.md` | Help AI "what to think about" | Checklists, questions, pointers to specs |

**Decision Rule**: Ask yourself:

- "This is **how to write** the code" → Put in a spec layer directory
- "This is **what to consider** before writing" → Put in `guides/`

**Example**:

| Learning | Wrong Location | Correct Location |
|----------|----------------|------------------|
| An established contract requires API X for writes to Y | ❌ `guides/` (concrete contract) | ✅ Owning spec file |
| When changing an event schema, find its consumers in the compatibility spec | ❌ Duplicate contract in a new spec | ✅ Retrieval hint in `guides/` if the route is missing |

**Guides should be short checklists that point to specs**, not duplicate the detailed rules.

---

## Update Process

1. Apply the shared admission rules to the proposed change and its owning spec.
2. For an admitted change, state the applicable scope, required behavior, and
   how to verify it. Include signatures, payload fields, failure behavior, or
   examples where they help a reader apply the contract safely.
3. Update the index only if the change affects a retrieval route.

---

## Update Templates

Use only the parts that clarify an admitted change.

### Example Structure for Infra/Cross-Layer Work

```markdown
## Scenario: <name>

### 1. Scope / Trigger
- Trigger: <why this requires code-spec depth>

### 2. Signatures
- Backend command/API/DB signature(s)

### 3. Contracts
- Request fields (name, type, constraints)
- Response fields (name, type, constraints)
- Environment keys (required/optional)

### 4. Validation & Error Matrix
- <condition> -> <error>

### 5. Good/Base/Bad Cases
- Good: ...
- Base: ...
- Bad: ...

### 6. Tests Required
- Unit/Integration/E2E with assertion points

### 7. Wrong vs Correct
#### Wrong
...
#### Correct
...
```

### Adding a Design Decision

```markdown
### Design Decision: [Decision Name]

**Context**: What problem were we solving?

**Options Considered**:
1. Option A - brief description
2. Option B - brief description

**Decision**: We chose Option X because...

**Example**:
\`\`\`typescript
// How it's implemented
code example
\`\`\`

**Extensibility**: How to extend this in the future...
```

### Adding a Project Convention

```markdown
### Convention: [Convention Name]

**What**: Brief description of the convention.

**Why**: Why we do it this way in this project.

**Example**:
\`\`\`typescript
// How to follow this convention
code example
\`\`\`

**Related**: Links to related conventions or specs.
```

### Adding a New Pattern

```markdown
### Pattern Name

**Problem**: What problem does this solve?

**Solution**: Brief description of the approach.

**Example**:
\`\`\`
// Good
code example

// Bad
code example
\`\`\`

**Why**: Explanation of why this works better.
```

### Adding a Forbidden Pattern

```markdown
### Don't: Pattern Name

**Problem**:
\`\`\`
// Don't do this
bad code example
\`\`\`

**Why it's bad**: Explanation of the issue.

**Instead**:
\`\`\`
// Do this instead
good code example
\`\`\`
```

### Adding a Common Mistake

```markdown
### Common Mistake: Description

**Symptom**: What goes wrong

**Cause**: Why this happens

**Fix**: How to correct it

**Prevention**: How to avoid it in the future
```

### Adding a Gotcha

```markdown
> **Warning**: Brief description of the non-obvious behavior.
>
> Details about when this happens and how to handle it.
```

---

## Relationship to Other Commands

- {{CMD_REF:break-loop}} supplies root-cause evidence and prevention options.
- {{CMD_REF:finish-work}} wraps up the task after review.
