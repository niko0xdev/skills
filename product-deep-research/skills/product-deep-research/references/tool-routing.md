# Tool Routing

Choose tools by capability, not vendor name.

| Need | Preferred capability | Notes |
|---|---|---|
| Discover products/topics/discussions | semantic/web search | Prefer multiple query formulations and date filters |
| Official page/doc/changelog capture | fetch/crawl/scrape | Preserve source URL and observation date |
| Site-wide docs/pricing change | crawl/monitor/diff | Compare against previous snapshot |
| Product behavior / UX | browser automation | Only permitted flows; no bypassing access controls |
| OSS/release/adoption evidence | GitHub search | Prefer releases, source, issues, commits; stars are only a weak adoption signal |
| Community user voice | web/community search | Treat as qualitative evidence, not population statistics |

## Search order

1. Primary/direct source
2. Independent corroboration
3. User/community evidence
4. Secondary summaries only for discovery

## Parallelism

Parallelize independent searches. Do not parallelize steps when later work depends on the verified output of earlier work.
