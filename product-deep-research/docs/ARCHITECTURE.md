# Architecture

## Design goals

1. One canonical research methodology across harnesses.
2. Persistent state outside model context.
3. Evidence before recommendation.
4. Parallel research only for independent workstreams.
5. Human approval before roadmap or implementation handoff.

## Pipeline

```text
Product context
  → Research planner
  → Market / Competitor / User Voice / Technology scouts
  → Evidence verifier
  → Signals
  → Insight clustering
  → Opportunity analyst
  → Product strategist
  → WATCH / PROTOTYPE / BUILD / REJECT recommendation
  → Human decision
```

## Storage model

Research state lives in `.product-intelligence/` in the product repository. Signals are append-only JSONL. Insights and opportunities reference signal IDs so recommendations remain auditable.

## Roles

The role prompts under `skills/product-deep-research/agents/` are portable role contracts. A host with subagents should dispatch them independently. A host without subagents should execute them sequentially while preserving the same boundaries.

## Tool abstraction

The skill describes capabilities instead of MCP/vendor names. For example, `semantic search`, `crawl`, `browser`, and `GitHub search` can map to whatever tools the host exposes.
