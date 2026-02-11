---
date: 2026-02-03
participants: Chris Humphries, Jeremy, Matias (Attention)
type: sync
tags: [attention, salesforce, account-page, cko, api, skills]
---

# Attention Sync — Jeremy & Matias

## Summary

Demo and vision alignment session with Attention. Chris walked Matias through what's been built in Salesforce using Claude Code — next steps hygiene tool, buying group UI, and the account page concept with the action panel. Strong alignment on Attention becoming the execution/context layer behind Salesforce-native actions. Agreed on a "skills" model (inspired by Claude Code) for structuring Attention's API. Also discussed single-bot recording, desktop app, and CKO presentation planning.

## What We Showed Attention

- **Claude Code + Salesforce workflow**: Pull down sandbox, give Claude Code context on objects/fields, generate LWCs that look native using Lightning Design System
- **Next Steps Hygiene tool**: Live in production. Pulls context from emails + Attention calls, suggests next steps via Tray, user can accept or edit. Sales leader no longer has to nag about stale next steps — "not seeing that call happen anymore"
- **Buying Group UI**: Custom LWC replacing clunky related list + flows. Shows members, marketing engagement, emails, calls. Coverage view. Natural next step: AI-driven enrichment (warm contacts, outreach suggestions)
- **Account page concept**: Summary bar, customer health, buying groups, key moments, open opportunities, and the "What do you want to do?" action panel

## Attention's Reaction

> "I still can't get over how native it looks."

> "This is an awesome forcing function for us — right now we've built everything mostly under the conception that people will be in Attention or in Slack. Thinking about Salesforce as the shell makes us think about how to structure this in a smart way."

Matias offered to help with the Salesforce managed package side — Jeremy clarified we want to own the UI, Attention provides the context/execution layer via API.

## Skills Model (Key Alignment)

Attention is splitting their architecture:
- **Agents**: Run on schedules, respond to triggers (existing model)
- **Skills**: Discrete, ad-hoc actions — triggered by click in Salesforce or tagging Attention in Slack

Each skill = an API endpoint with a natural language description of what it should do (format, output structure, etc.). Skills can be created by chatting with the "super agent."

**Example skills for account page:**
- Meeting prep doc
- Account brief / exec summary
- Email draft
- Close-loss analysis
- ROI summary
- Sales handoff doc

Attention would expose: `create [skill]` + `get history of [skill]` endpoints. Generated artifacts stored as custom objects in Salesforce for future reference and context.

> "The things that those discrete actions could maybe be framed as skills... you'd be able to trigger that by clicking on it in Salesforce, and you could also call that skill by tagging the Abridge helper in Slack."

## Account Page Feedback (Jeremy)

- Loves the "What do you want to do?" action panel — "fucking awesome"
- Summary bar at top + core details bar = "really slick"
- Customer health, buying groups, key moments, next steps, open opportunities — all great
- **Add**: Direct link to renewal opp somewhere prominent (top bar area?)
- **Add**: Hot links in the ARR bar — open renewal, go to account plan, account summary
- **Consider**: Related lists and standard Salesforce components still need a home. Tab element? Separate view? "Big paradigm shift from what they're used to"
- **Consider**: Implementation object and account plans need representation — maybe links at top
- **Consider**: Weave in what Zach and Ramon are building (solution design requests, resource request process)
- **Latency**: Reps said if it's not instant, that's fine — 1-2 minutes later doesn't matter as long as they get alerted. Daily summary job could also work.

## Key Moments / Timeline

- Timeline showing execution along playbook + key events (competitor mentioned, champion leaving, etc.)
- Attention already has call types — can place execution on temporal axis
- Analogy: "Account as patient" — tracking labs, vitals, signals over time
- Agents running pre-call and post-call, important things standing out on the timeline

## Desktop Recording / Single Bot

Attention building a Notion-style desktop recorder app:
- Desktop app replaces bot joining — picks up Zoom meetings automatically
- Still processes through Attention, same output
- Diarization slightly worse without bot API (uses active Zoom tile instead)

**Considerations raised:**
- **Permissions**: When multiple people are on a call, inherit the most open settings from whoever's bot was scheduled. Need ability for anyone on the call to veto/remove the bot (not just the bot owner)
- **Admin controls**: Universal org-level access for removing bots needed
- **External notice**: If recording via desktop (no visible bot), need explicit notification to external parties
- **Bot vs. desktop guidance**: Bot is still superior for speaker identification. Need clear UX for when to use which — popup on call join with "use bot" vs "use desktop recording"
- **Pilot interest**: Jeremy wants to pilot this

## CKO Presentation Planning

**Main Stage** (Jeremy + Brad):
- Minimal slides, more verbal + demo
- Story arc: building blocks → next steps tool → buying groups → account page vision
- Show actual production components + sandbox account page if possible
- Chris to try getting account page into sandbox for live demo

**Wednesday Tactical Session** (Chris):
- More practical/technical — "here's stuff actually coming that you could use"
- Less slides, more demo
- Could include easy wins like PSD update component
- Show how things connect to what Zach/Ramon are building

**AI Foundations Session** (Chris):
- Longer format, more AI 101 for commercial team
- Generative vs. agentic, prompting tips, "how to get started"
- Level the playing field — make AI accessible

**Common thread**: All sessions should feel connected, not disparate

## Strategic Context

- Building blocks approach: next steps → buying groups → account page → home experience → forecasting
- "Earning the right" to tackle larger things by proving value incrementally
- Account page framework should be reusable for opportunities and other objects
- End goal: redesign entire Salesforce home experience + forecasting
- Attention building their own forecasting module — "should wipe the floor with Gong"

## Matias Takeaways (Stated)

1. Work with Chris on the API / skills stuff
2. Permissions model for bot removal
3. Desktop vs. bot join controls

---
*Processed from: [[processed/2026-02-03-attention-sync-jeremy-matias]]*
