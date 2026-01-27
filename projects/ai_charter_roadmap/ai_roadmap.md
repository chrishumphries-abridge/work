# GTM Systems AI Roadmap
## H1 2026

---

## How to Read This Roadmap

| Status | Meaning |
|--------|---------|
| **Shipped** | Live and available |
| **In Progress** | Actively being built |
| **Exploring** | Researching and scoping |
| **On Deck** | Identified opportunity, not yet started |

This is a directional roadmap, not a commitment list. Priorities will evolve based on feedback and impact.

---

# Now: Shipped & In Progress

## Next Steps Hygiene
**Status:** Shipped (Jan 2026)
**For:** Sales

AI-powered next step suggestions embedded in Salesforce.

| What It Does | The Impact |
|--------------|------------|
| Surfaces deals missing a next step | No more forgotten follow-ups |
| Flags stale next steps (not updated in 7+ days) | Keeps pipeline current |
| AI suggests what to do next | Guidance based on recent activity |
| One-click to update | Saves time, improves data quality |

**How it works:** The AI reads your recent emails and call transcripts, then suggests a specific next action — who to contact, what to discuss, when to do it.

---

## Buying Group Members
**Status:** Shipped (2025)
**For:** Sales

See who's involved in every deal at a glance.

| What It Does | The Impact |
|--------------|------------|
| Shows stakeholders by role | Know who the decision-makers are |
| Tracks engagement by person | See who's active, who's gone quiet |
| Flags missing personas | "You don't have a technical champion yet" |

**Foundation for everything else:** This is the data model that powers future AI features — you can't coach on relationships you can't see.

---

## Buying Group Expansion — Ent/Strat/National
**Status:** In Progress (Q1 2026)
**For:** Sales, Operations

Extending Buying Group tracking to additional sales segments.

| What It Does | The Impact |
|--------------|------------|
| Same relationship visibility for all segments | Consistent experience across the org |
| Persona tracking tailored by segment | Right roles for right deals |

**Foundation Used:** Buying Group Model

---

## Deal Risk Signals
**Status:** Ready to Launch (Q1 2026)
**For:** Sales

Proactive alerts when deals show warning signs.

| What It Does | The Impact |
|--------------|------------|
| Flags deals that have gone quiet | "No activity in 14 days" |
| Warns about missing stakeholders | "No executive sponsor identified" |
| Highlights close-date urgency | "Closing in 7 days, champion hasn't responded" |
| AI explains why it's flagged | Not just "at risk" — but *why* |

**How it works:** Combines activity data, buying group health, and deal timing into a risk assessment. Built and tested — ready to turn on.

---

# Next: Exploring (Q1-Q2)

## Meeting Prep Brief
**Status:** Exploring
**For:** Sales, Partner Success

Automatic pre-meeting briefing delivered before every call.

| Capability | Description |
|------------|-------------|
| Email Summary | Recent thread highlights (from Weflow) |
| Call Highlights | Key moments from past conversations (from Attention) |
| Stakeholder Context | Who you're meeting, their engagement history |
| Suggested Talking Points | AI-generated agenda based on deal context |
| Delivery | Email, Slack, or calendar — wherever you prep |

**Foundation Used:** Email Activity + Conversation Intelligence + Buying Group

**Market Validation:** Companies report 20-30% reduction in prep time, 20+ hrs/week saved.

---

## Next Best Action Engine
**Status:** Exploring
**For:** Sales

Proactive guidance on where to focus across your pipeline.

| Capability | Description |
|------------|-------------|
| Engagement Monitoring | Track activity patterns across deals |
| Silence Alerts | "This deal went quiet — reach out to your champion" |
| Stakeholder Triggers | "New contact added — schedule intro" |
| Competitive Signals | "Competitor mentioned — review battlecard" |
| Prioritization | Rank deals by urgency and opportunity |

**Foundation Used:** Email Activity + Conversation Intelligence + Buying Group

---

## Account Health Signals (Planhat)
**Status:** Exploring
**For:** Partner Success

Proactive health visibility surfaced in Planhat.

| Capability | Description |
|------------|-------------|
| Usage Monitoring | Product usage trends and drop-off detection |
| Engagement Tracking | Contact activity and silence alerts |
| Renewal Risk | Early warning before renewal approaches |
| Expansion Signals | Indicators of upsell opportunity |
| Planhat Integration | Insights surfaced where PS already works |

**Foundation Used:** Product usage data + Activity history

---

## Contextual Enablement
**Status:** Exploring
**For:** Everyone

Right resource, right moment — without searching.

| Capability | Description |
|------------|-------------|
| Competitor Triggers | Battlecards surface when competitor mentioned |
| Objection Handling | Relevant guides appear at point of need |
| Stage-Based Content | Materials relevant to current deal stage |
| Delivery | Inline in Salesforce, Planhat, or via Slack |

**Foundation Used:** Conversation Intelligence + Enablement content library

---

# Later: On Deck (H2 Possibilities)

## Coaching Intelligence
**Status:** On Deck
**For:** Leadership

Evidence-based coaching visibility for managers.

| Capability | Description |
|------------|-------------|
| Deal Attention Flags | Which deals need manager involvement |
| Rep Patterns | Activity and engagement trends by rep |
| Forecast Confidence | AI-informed forecast accuracy |
| Coaching Suggestions | Where to focus 1:1 time |

---

## Email/Outreach Assistant
**Status:** On Deck
**For:** Sales

AI-generated outreach drafts based on deal context.

| Capability | Description |
|------------|-------------|
| Context-Aware Drafts | Emails that know the deal history |
| Stakeholder Personalization | Tailored to recipient role and engagement |
| Follow-Up Generation | Post-call follow-ups from transcript |

---

## Pipeline Agent
**Status:** On Deck (Quick Win Identified)
**For:** Sales, Leadership

On-demand deal analysis via natural language.

| Capability | Description |
|------------|-------------|
| Deal Q&A | "What's the status of the Acme deal?" |
| Pipeline Summary | "Show me deals at risk this quarter" |
| Trend Analysis | "Which deals have gone quiet?" |

---

## Prep Sheet Agent
**Status:** On Deck (Quick Win Identified)
**For:** Sales

Instant meeting prep on demand.

| Capability | Description |
|------------|-------------|
| On-Demand Briefs | "Prep me for my 2pm call" |
| Deep Context | Pull from all available data sources |
| Format Flexibility | Delivered via Slack, email, or inline |

---

# Foundation: What Makes This Possible

Every AI feature above runs on data. In 2025, we built the data foundation. In 2026, we put AI to work on top of it.

| Foundation | What It Is | What It Enables |
|------------|------------|-----------------|
| **Buying Group Model** | Custom objects tracking who's involved in every deal | Stakeholder visibility, engagement scoring, gap detection |
| **Email Activity Sync** (Weflow) | Every email touchpoint flowing into Salesforce automatically | Activity history, engagement trends, silence detection |
| **Conversation Intelligence** (Attention) | Call recordings and transcripts linked to deals | Call summaries, key moments, AI context |
| **LLM Integration** (Tray.io) | Secure connection to AI models | Powers all "AI suggests..." features |

### In Progress
| Investment | Status | Impact |
|------------|--------|--------|
| Buying Group (Ent/Strat/National) | Q1 | Same visibility for all segments |
| API Reliability Monitoring | Q1 | Ensures AI features stay online |

---

# Feature × Role Matrix

| Feature | Sales | Partner Success | Leadership | Supporting |
|---------|-------|-----------------|------------|------------|
| Revenue Intelligence | Primary | — | Secondary | — |
| Meeting Prep Brief | Primary | Primary | — | — |
| Next Best Action | Primary | Secondary | — | — |
| Account Health (Planhat) | — | Primary | Secondary | — |
| Contextual Enablement | Primary | Primary | — | Primary |
| Coaching Intelligence | — | — | Primary | Secondary |
| Email Assistant | Primary | Secondary | — | — |
| Pipeline Agent | Primary | — | Primary | — |

---

*GTM Systems & Analytics | H1 2026*
*Last Updated: January 2026*
