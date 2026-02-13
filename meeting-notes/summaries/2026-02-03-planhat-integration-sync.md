---
date: 2026-02-03
participants: Chris Humphries, Madeline, Chris (RevOps)
type: planning
tags: [planhat, integration, salesforce, mvp]
---

# PlanHat Integration Planning Sync

## Summary

Alignment meeting on Salesforce-to-PlanHat data mapping for March MVP pilot. PS team (Madeline) presented refined scope after PlanHat AI workshop. Key shift: focus on day-to-day account management tools rather than point-in-time strategy docs like account plans.

## Decisions

> [!note] Account plan deprioritized for MVP
> API limitations require custom integration. Current workflow works well enough. Will revisit post-pilot.

> [!note] Buying groups simplified for V1
> Focus on contact-level engagement data rather than full buying group object. Thursday call with Aaron will determine PlanHat representation.

> [!note] Bring all contacts into PlanHat
> Even large accounts like Kaiser (200+ contacts). Will iterate based on pilot feedback.

> [!note] Key moments workflow changing
> PS team will manage in PlanHat, sync back to SFDC for Sales visibility. Jeremy has related thoughts on key moments.

> [!note] Timeline confirmed
> Build/test final week of Feb, pilot launch March. "Looks fine" from RevOps perspective.

## Action Items

- [ ] Check ED physicians data in SFDC/Definitive — [Asana](https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1213080949335441)
- [ ] Review PlanHat plan with Zach (out this week) — [Asana](https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1213105159164572)
- [ ] Thursday call with Aaron on PlanHat mechanics + buying groups — [Asana](https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1213079054474588)
- [ ] Respond on Chicago build sprint date (waiting on PS team for dates)

## FYIs

- **Weflow** syncs Google Calendar events to SFDC (turned on fall 2025, backfilled)
- Email + calendar + Attention calls all captured as SFDC records
- Aaron = data integration contact; Peter = workflow/design contact
- Zach + Aaron mapped comms topics into PlanHat on Friday
- Potential Chicago build sprint week of ~Feb 10 (one-day trip possible)

## Open Questions

- How to represent buying groups in PlanHat (Thursday meeting)
- Attention integration approach — still TBD
- How far in advance Weflow syncs calendar events
