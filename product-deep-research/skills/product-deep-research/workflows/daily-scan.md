# Daily Scan

Goal: detect deltas, not re-research the market.

1. Read `state.json`, tracked competitors/topics, and the latest signals.
2. Search only since the last daily scan where the tool permits date filtering.
3. Prioritize primary-source releases/changelogs/pricing/docs, then user/community signals.
4. Add at most 20 deduplicated signals.
5. Escalate at most 3 items for deeper investigation.
6. Update existing insights/opportunities only if new evidence changes confidence or direction.
7. Write `reports/daily/YYYY-MM-DD.md` with: important changes, why they matter, uncertainty, and investigations to run next.
8. Update `state.json`.

Do not generate a new roadmap.
