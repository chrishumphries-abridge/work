---
date: 2026-02-10
participants: Chris Humphries, team (CKO session)
type: feedback
tags: [account-page, cko, salesforce, ux]
---

# CKO Account Page Feedback

## Summary

Team walkthrough and feedback session on the reimagined account page at CKO. Covered the full page design — left sidebar, center context sections, buying groups, project teams, and the right-hand action panel. Strong enthusiasm for the action panel as the most transformative piece. General theme: visual uplift and layout improvements can ship quickly; the AI-powered action panel requires more plumbing (Attention APIs, Tray routing) but is the long-term differentiator.

## Key Moments / Timeline

- AI-suggested key moments (competitor mentioned, champion left, etc.) with CTAs to add
- Manual key moment creation for ad-hoc events
- Role action execution should appear on the timeline — track when playbook steps get completed
- Attention already has call type mapping; just needs to be pulled in (never was)
- Connect key moments to events + conversations so you can drill into the artifact, see questions asked, rate the interaction
- Playbook execution in Planhat should push back as key moments

## Buying Groups

- Engagement scoring is good — gives actual insight (breadth, frequency, depth) not just completion
- **Segment indexing**: Commercial accounts get dinged on scores; need to index based on segment. Only doing 250+ doctors, which all will have
- **No custom buying groups**: Don't let reps customize per deal. "The data is the data" — benchmark from there. Buying groups serve downstream purposes too
- Health scoring is fresh / needs rephrasing ("N88 is a good score" doesn't land)
- **Layout**: Too much white space. Test scooting activity data above buying group cards, smaller CTAs. Shrinks well on the side panel already
- **Activity drill-in**: If someone has 40 emails, make the count clickable to pop up a filtered list (last 30 days, important only, etc.)
- **Person insights**: When you click into a buying group member, surface what we know — recent engagement, signals from background jobs. "Really good real estate" that should be more interactive
- Tabs per buying group member (not per buying group) — good approach

## Account Planning

- Current account planning is too static — creates momentum at review time but doesn't sustain it
- Distinction needed: **account plan** (point-in-time review) vs. **account game plan** (ongoing, drives action)
- Need to migrate the account plan object
- Should track both customer objectives (their goals) and our objectives (MRU targets, expansion, etc.)
- CKO conversation needed to define what this ecosystem looks like
- Can drive objectives back from conversations — "what objective did this company touch on?"

## Context Sections (Center Panel)

- External signals (news capture) — categorize and display
- Solution consulting — what's happening on the solutions front
- Implementations — status and context across implementation records
- Active account plan
- Pricing tiers visualized (actual tiers, cleaner layout)
- Next steps should include upcoming meetings + tasks, with buying group signal connections

## Project Teams / Status Page

- New project team view solves managing teams at scale
- Integrates with status page via checkboxes (subscribe/unsubscribe)
- Long-term should be handled by product; doing it here for now
- Bulk update of multiple contact fields — saves ton of time
- **Hannah Stover feedback**: Need bulk update/manage view for all subscribed people, bulk member addition
- Topics should be checkboxes on front end (multi-select on back end) to reduce clicks

## Right-Hand Action Panel (Most Exciting)

> "This is what the Salesforce action market was supposed to be so many years ago."

- Customizable per role — what actions are you leaving this page to go do?
- **Email drafting**: Draft and send right from the account page
- **Meeting prep**: Use Attention data to generate prep docs. Store as retrievable artifacts (files/related list)
- **Exec summary**: Auto-generate, needs work but the concept is there
- **Sales handoff doc**: Generate handoff documentation
- **Close-loss analysis**: Click to launch guided Q&A based on existing data, ask detailed follow-up questions. Templatize for every new logo (pre-fill known, surface gaps)
- **Resource requesting**: Hook into existing flows. Modal with available resource types, click to kick off request. Store requests on the account
- **ROI calculator**: Link out to existing calculator, store generated file in Salesforce
- **Attention integration**: Use their APIs directly instead of going through Slack. Run meeting prep, call insights from here. "I'd rather do that."
- **Google Doc creation**: Option to auto-create Google Docs from generated content
- Documents should be stored — related list or files. "Every time I generate one, make it a file somewhere."

## Links & Resources Section

- Dashboard links (Sigma)
- Google Drive folder link — well received
- Invoice status — "pretty sick." Reps who've experienced clawbacks will love seeing this immediately
- Contracts
- Last 30 days MRU usage
- Last 38 encounters

## Sigma / Usage Data

- Idea: iframe Sigma dashboards with query parameters (work ID) to show usage over time
- Click Account Summary → see MRU consumption trend
- **Blocker**: Authentication — users would need to be logged into Sigma
- Alternative: Show data points on the page itself alongside license count and target %

## Health Scoring

- Green dot at top should be clickable — show why it's scored that way
- Planhat scoring not deeply explored yet — opportunity there
- Emoji mapping from Planhat: resolved ("they figured it out")
- Time period data / growth over time could be brought in

## Clinician Feedback

- Currently captured in Slack
- Could attach feedback directly from the account page in Salesforce instead
- Need to ask users what they prefer

## Attention Integration

- Don't flood timeline with every call
- Surface particularly salient calls — "you have cleanup to do"
- Use Attention APIs directly (they're exposing them)
- Call type mapping already exists in Attention, needs to be pulled in

## Prioritization Discussion

**Quick wins (visual uplift):**
- Project teams (almost ready)
- Top icon section / key fields
- Layout: context sections (external signals, solution consulting, implementations)
- Key fields cleanup

**Bigger lift (plumbing needed):**
- Right-hand action panel — needs Tray routing + Attention APIs
- Resource requests as first action panel item
- AI layer on top of actions
- Must be fast — "it can't be slow"

## Strategic Framing

- Building blocks earned the right to reimagine the account page
- Account page approach should be **reusable** for opportunities and other parent objects
- Side panels could persist across objects → eventual "rep command center"
- "We've reimagined completely the experience" — Salesforce has only changed its UI twice in 15 years

---
*Processed from: [[processed/2026-02-10-cko-account-page-feedback]]*
