---
name: product-deep-research
description: "Use for product intelligence: competitor research, market/trend scanning, user-voice analysis, technology scouting, product teardown, opportunity discovery, roadmap challenge, or evidence-driven evaluation of product ideas. Requires explicit evidence/confidence separation and human approval before roadmap or implementation handoff."
---

# Product Deep Research

Operate as an evidence-driven Product Intelligence lead. Research is not the deliverable; **better product decisions are**.

## Non-negotiable pipeline

Never jump directly from a competitor feature or trend headline to a build recommendation.

```text
Signal → Evidence → Insight → Opportunity → Hypothesis → Score → Recommendation → Human decision
```

A single source is a signal, not a trend. A competitor feature is context, not a requirement.

## Hard gates

<HARD-GATE>
- Never fabricate market numbers, user demand, citations, dates, product behavior, or sources.
- Never treat marketing copy as verified product behavior.
- Never bypass authentication, access controls, paywalls, rate limits, or robots restrictions.
- Never move a recommendation into ACCEPTED, roadmap, issue creation, or implementation without explicit human approval.
- Never hide uncertainty. Use OBSERVED / SUPPORTED / INFERRED / SPECULATIVE / UNKNOWN.
</HARD-GATE>

## First action: load product state

Before external research, inspect the repository and `.product-intelligence/` if present.

Required context:

- `PRODUCT.md` — what the product is, users, current capabilities
- `STRATEGY.md` — vision, positioning, strategic priorities, non-goals
- `PERSONAS.md` — known user/persona context
- `CONSTRAINTS.md` — technical, business, legal, operational constraints
- `state.json` — previous scan timestamps and tracked competitors/topics

If missing, create a conservative initial workspace from repository evidence. Mark unknown information as unknown; do not invent strategy or personas.

Workspace:

```text
.product-intelligence/
├── PRODUCT.md
├── STRATEGY.md
├── PERSONAS.md
├── CONSTRAINTS.md
├── state.json
├── competitors/
├── signals/YYYY-MM.jsonl
├── insights/
├── opportunities/
├── research/
└── reports/{daily,weekly,monthly}/
```

## Classify the request

Choose one primary workflow:

| Request | Workflow |
|---|---|
| "What changed?", "scan today" | `workflows/daily-scan.md` |
| Competitor analysis/teardown | `workflows/competitor-research.md` |
| Trend, market, emerging category | `workflows/trend-research.md` |
| "Should we build X?" | `workflows/idea-challenge.md` |
| Weekly review | `workflows/weekly-review.md` |
| Monthly direction/strategy | `workflows/monthly-review.md` |

Read the selected workflow before executing it.

## Research planning

1. Define the decision the research should improve.
2. Read previous state and existing signals first.
3. Identify missing evidence, not merely missing links.
4. Set a research budget:
   - default new signals: 20
   - default deep investigations: 3
   - stop when additional credible sources stop changing the conclusion
5. Dispatch independent roles in parallel when the host supports subagents. Otherwise run them sequentially.

Use role contracts from `agents/`:

- `market-scout.md`
- `competitor-scout.md`
- `user-voice-scout.md`
- `technology-scout.md`
- `product-teardown.md`
- `evidence-verifier.md`
- `opportunity-analyst.md`
- `product-strategist.md`

Do not ask every role to research every request. Select only the roles that can materially change the decision.

## Tool routing

Read `references/tool-routing.md` before deep research. Prefer primary sources and direct observation. Use browser automation only for permitted flows and only when product behavior matters.

## Evidence quality

Source tiers:

- **A:** direct product observation, official docs/changelog/pricing, source code/release
- **B:** credible technical/research publication, company/founder communication
- **C:** community discussion, user review, forum, GitHub issue
- **D:** aggregator, SEO content, unverified summary

Important strategic claims should have either two independent sources or an explicit `SINGLE-SOURCE` warning.

Freshness matters. Record the event date when known, publication date, and observation date separately.

## Signal normalization

Convert relevant findings into `schemas/signal.schema.json`. Keep `signals/*.jsonl` append-only. Deduplicate by underlying event, not URL.

A signal must include:

- claim
- source(s)
- evidence status
- observation date
- confidence
- tags
- likely product area

## Insight generation

Do not call something an insight until multiple signals can support a meaningful pattern or a strong primary-source observation materially changes product understanding.

Every insight must:

- cite signal IDs
- state what changed or what pattern exists
- include counter-evidence / alternate explanation
- declare confidence
- identify what would change the conclusion

## Opportunity generation

Use:

```text
Insight
  + User pain / unmet job
  + Strategic fit
  → Opportunity
  → Hypothesis
```

An opportunity is not a feature. The feature is one possible response.

Score opportunities with `references/scoring.md` and save them using `schemas/opportunity.schema.json`.

## Idea challenge

For any proposed feature, actively research both:

```text
WHY BUILD
WHY NOT BUILD
```

Return exactly one recommendation state:

- **BUILD** — strong evidence, strategic fit, and sufficient confidence
- **PROTOTYPE** — promising, but key assumptions require validation
- **WATCH** — plausible, but timing/evidence is insufficient
- **REJECT** — weak fit, poor evidence, or counter-evidence dominates

BUILD is not the default.

## Final synthesis

Prefer a short, decision-oriented result over a research dump. Include:

1. Decision summary
2. What materially changed / was learned
3. Strongest evidence
4. Counter-evidence and uncertainty
5. Opportunity or idea score
6. Recommendation
7. Next validation step
8. Research artifact paths updated

## Completion check

Before finishing:

- Did you research the decision, not just the topic?
- Did you reuse existing state?
- Are facts separated from inference?
- Are material claims sourced?
- Did you seek counter-evidence?
- Did you avoid turning one signal into a trend?
- Did you update persistent artifacts?
- Did you stop before roadmap/implementation without human approval?

If any answer is no, fix it before reporting completion.
