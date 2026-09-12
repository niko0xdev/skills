# Product Deep Research

A portable **Product Intelligence / Deep Research** skill for coding agents. It turns Claude Code, Codex, Pi, or OpenCode into an evidence-driven product researcher that can continuously study markets, competitors, users, and technology signals before proposing product opportunities.

> **Signal → Evidence → Insight → Opportunity → Hypothesis → Score → Recommendation → Human decision**

The skill is host-neutral. One canonical `SKILL.md` contains the research methodology; host adapters only handle discovery and tool mapping.

## Capabilities

- Competitive intelligence and product teardown
- Trend and market scanning
- User-voice mining and pain-point clustering
- Technology scouting
- Evidence verification and contradiction checks
- Opportunity generation and weighted scoring
- BUILD / PROTOTYPE / WATCH / REJECT recommendations
- Daily, weekly, and monthly product-intelligence loops
- Persistent research state so the agent researches deltas instead of starting over

## Layout

```text
product-deep-research/
├── .claude-plugin/
├── .codex-plugin/
├── .opencode/
├── .pi/
├── docs/
├── package.json
└── skills/product-deep-research/
    ├── SKILL.md
    ├── agents/
    ├── references/
    ├── schemas/
    ├── templates/
    └── workflows/
```

This follows the cross-harness packaging pattern used by `obra/superpowers`: a canonical skills directory plus thin host-specific adapters.

## Setup

### Claude Code — 2 steps

```text
/plugin marketplace add niko0xdev/skills
/plugin install product-deep-research@niko0xdev-skills
```

Restart Claude Code, then ask: `Use product-deep-research to scan this product's market.`

### Codex CLI — 2 steps

```bash
git clone --depth 1 https://github.com/niko0xdev/skills.git ~/.local/share/niko0xdev-skills
```

Then in Codex open `/plugins`, add the local marketplace at `~/.local/share/niko0xdev-skills`, and install `product-deep-research`. The repo includes `.agents/plugins/marketplace.json` plus `.codex-plugin/plugin.json`.

### Pi — 1 step

```bash
pi install git:github.com/niko0xdev/skills
```

Then run `/skill:product-deep-research` or let Pi auto-load it when the task matches.

### OpenCode — 1 step

Add the plugin to `opencode.json`:

```json
{
  "plugin": ["product-deep-research@git+https://github.com/niko0xdev/skills.git"]
}
```

Restart OpenCode and load `product-deep-research` with the native `skill` tool.

## Initialize product intelligence

Inside the product repository:

```text
Use product-deep-research. Initialize product intelligence for this repository, infer what you can from the code/docs, then create the missing context files without inventing unknown facts.
```

The skill creates or maintains:

```text
.product-intelligence/
├── PRODUCT.md
├── STRATEGY.md
├── PERSONAS.md
├── CONSTRAINTS.md
├── state.json
├── competitors/
├── signals/
├── insights/
├── opportunities/
├── research/
└── reports/
```

## Example requests

```text
Use product-deep-research to scan competitors and tell me what materially changed this week.
```

```text
Deep-research autonomous mobile testing. Separate observed facts from inference and find counter-evidence before recommending anything.
```

```text
Challenge this idea: "AI-generated test cases". Return BUILD, PROTOTYPE, WATCH, or REJECT with evidence and confidence.
```

```text
Run the weekly product-intelligence review and update opportunity scores from the newest signals only.
```

## Optional research tools

The skill works with native web/browser tools. It becomes stronger when the host provides equivalents of semantic web search, crawl/scrape + page-change monitoring, browser automation, and GitHub search/issues/releases.

The skill does not require one vendor-specific MCP. Tool routing rules are defined in `references/tool-routing.md`.

## Research rules

- Never bypass authentication, paywalls, access controls, rate limits, or robots restrictions.
- Never collect private user data or credentials.
- Treat marketing claims as claims, not facts.
- Separate `OBSERVED`, `SUPPORTED`, `INFERRED`, `SPECULATIVE`, and `UNKNOWN`.
- Do not convert a single signal into a trend.
- Do not automatically add a proposed feature to the roadmap or implementation backlog.

## License

MIT
