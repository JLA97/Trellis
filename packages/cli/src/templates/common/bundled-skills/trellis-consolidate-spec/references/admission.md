# Spec content admission

Add or strengthen guidance in `.trellis/spec/` only when all three checks pass.

1. **Durable authority.** Cite an in-force project decision, a documented
   supported contract, or a binding requirement traceable to a consumer or
   protocol. Source, tests, and reproductions can verify behavior. Current
   behavior, repeated patterns, one-off fixes, and generic advice are not
   sufficient evidence that the project must keep following a rule.
2. **Concrete use and scope.** Identify the future implementation or check the
   rule changes, the consequence it prevents, and how to verify it. Limit its
   scope and strength to what the evidence supports. A rare, high-impact case
   can qualify at a narrow scope under the same standard.
3. **A gap in the owning spec.** Read the relevant index, spec, and adjacent
   guidance. Fill only the missing part at its canonical location. Reuse an
   equivalent rule and add a link only if an affected reader lacks a route to
   it. Apply this gate to guides and examples as well as normative prose.

If the evidence, scope, or ownership is uncertain, leave the spec unchanged.
Reject temporary workarounds and duplicates. No candidate record is required.
Use an existing task record only when a concrete follow-up would benefit.
