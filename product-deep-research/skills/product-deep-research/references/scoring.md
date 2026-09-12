# Opportunity Scoring

Score each dimension from 0–10, then apply the weight.

| Dimension | Weight |
|---|---:|
| Strategic Fit | 25% |
| User Pain | 20% |
| Market Evidence | 15% |
| Differentiation | 15% |
| Business Value | 10% |
| Feasibility | 10% |
| Timing | 5% |

`raw_score = weighted sum × 10` (0–100)

Apply confidence separately:

`confidence_adjusted_score = raw_score × confidence`

Confidence is 0.0–1.0 and must reflect evidence quality, source independence, freshness, and contradiction level.

Track effort separately as `XS / S / M / L / XL`; do not let low effort automatically make a weak opportunity look strategically strong.

Suggested interpretation:

- 75–100 adjusted: strong candidate, still requires human decision
- 55–74: prototype/validate
- 35–54: watch/research
- <35: reject/deprioritize unless strategy changes
