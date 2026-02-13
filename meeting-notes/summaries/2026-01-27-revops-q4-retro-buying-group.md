---
date: 2026-01-27
participants: [Chris, Zach, Peter, Ramon, Jeremy]
type: team-sync
tags: [revops, buying-group, account-plan, q4-retro]
---

# Meeting Summary: RevOps Q4 Retro + Buying Group Planning

## Context (Not Chris-Relevant)

First half covered Q4 look back deck review — Peter/Ramon presenting to Zach. Feedback on graph labeling, footnotes, filters. Deck to be shared with Brian and Amir.

---

## Decisions Made

1. **Account Plan will be recreated as a new object** — out-of-box version has been problematic
2. **Key moments object should be reimagined** — current version "sucks"
3. **Buying group scoring will use AI assessment** instead of traditional weighted scoring model

---

## Projects Created

### Buying Group AI Scoring

> [!info] Project Doc
> [[buying-group-scoring/README|Buying Group AI Scoring]]

Three dimensions:
- **Breadth**: Core personas present
- **Frequency**: 30/60/90 day contact windows
- **Depth**: Holistic engagement (not just email)

Output: Sub-scores + master score, color-coded, with explanations. Run nightly.

> [!warning] EOW Deliverable
> "Current customers with weak buying group strength" view

---

## Asana Tasks Created

| Task | ID |
|------|-----|
| Account Plan Redesign — New Object Structure | `1213005276777573` |
| ↳ Sketch out object structure + supporting objects | `1212969374851367` |
| ↳ Define baseline migration path | `1213005279191353` |
| ↳ Design UI improvements | `1212982899921807` |
| ↳ Plan AI-generated summaries layer | `1213005270114970` |
| Reimagine key moments timeline object | `1213005268615688` |
| Meet with Matthias (Attention) — Headless API/MCP | `1213005292485921` |

> [!note] Existing Task Updated
> Visual representation of system architecture — appended to existing CKO Stage Pres task (`1212970769338375`)

---

## FYIs / Context

- Matthias (Attention) is open to headless API/MCP — Zach wants to be on that call
- 90-day mark is where opportunities get stuck (close loss happening earlier each quarter)
- Account exec summary from Attention could be surfaced in Account Plan UI
- Peter working on view for accounts without buying groups by segment

---

## Source

[[2026-01-27-revops-q4-retro-buying-group|Raw Transcript]]
