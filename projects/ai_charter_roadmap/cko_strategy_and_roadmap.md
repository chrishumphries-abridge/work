# GTM Systems AI — CKO Strategy & Roadmap

## Meeting Summary

This document synthesizes the key decisions and direction from the Jan 29 planning session with Jeremy and Zach.

---

## Part 1: CKO Presentation

### Format
- **Breakout session**: 5-7 minutes
- **Potential main stage**: If elevated, still ~5 min but focused on "how you actually did it" — the guts, examples, live demo

### Story Arc
1. **Problem** — What pain points exist today
2. **Foundation/Principles** — Why we're building this way
3. **What we've done** — Buying Groups, Next Step Hygiene (in production)
4. **Vision** — Where we're going (new account experience + role-based views)

### Principles to Emphasize
From the meeting, these principles resonated:

| Principle | What it means |
|-----------|---------------|
| **Earn the right** | Build foundational blocks before tackling complex views |
| **Incrementality** | It's okay to build, learn, and retire — this is evolution, not linear |
| **Useful > Pretty** | "No hand turkeys" — everything we ship must be genuinely helpful |
| **Easier than default** | Has to be easier than the existing option (ChatGPT, existing tools) |
| **Role-aware** | Build for the context of who you are and what you're trying to do |

### What to Show

**For breakout (confirmed):**
- Product reveal animation (already built)
- Buying Groups demo
- Next Step Hygiene demo
- Vision slides with mockups

**For main stage (if elevated):**
- Live demo of how Claude Code works
- Show the "guts" — how a conversation becomes a working feature
- Potentially: feed the meeting transcript back in and show iteration

**Stretch goal for CKO:**
- Mock-up of the new **Account Page** structure
- If possible: working prototype of **Communication Preferences** editor (quick win for PX)

---

## Part 2: Strategic Direction

### Key Pivot from the Meeting

**Original thinking:** Build out role-specific homepages and dashboards (territory view, manager dashboard, etc.)

**New direction:** Focus on the **Account Page** first as the central building block.

> "We haven't earned the right yet to get the homepage. We got to earn the right by getting the account structure down first."
> — Jeremy

### Why Account-First?

1. **Universal touchpoint** — Sales, PX, PS all interact with accounts
2. **We have the building blocks** — Buying Groups, Next Steps, orchestration agents
3. **Enables cascade** — Once we nail the account page pattern, it's easy to apply to Opportunities, Contacts, etc.
4. **Homepage comes after** — You can't build territory/portfolio views until you know what an account summary looks like

### The Stack

```
┌─────────────────────────────────────────────────────────┐
│  HOMEPAGE / TERRITORY VIEW                              │
│  (Role-specific: Rep, Manager, SDR, PS)                │
│  ───────────────────────────────────────────────────── │
│  ↑ Aggregates account summaries into portfolio view    │
└─────────────────────────────────────────────────────────┘
                          ↑
┌─────────────────────────────────────────────────────────┐
│  ACCOUNT PAGE  ← THIS IS THE NEXT PRIORITY             │
│  ─────────────────────────────────────────────────────  │
│  • Account context & summary                            │
│  • Buying Group visualization                           │
│  • Next Steps / Action items                            │
│  • Key moments & external signals                       │
│  • Orchestration launchpad (agents)                     │
└─────────────────────────────────────────────────────────┘
                          ↑
┌─────────────────────────────────────────────────────────┐
│  BUILDING BLOCKS (done/in progress)                     │
│  ─────────────────────────────────────────────────────  │
│  • Buying Groups                                        │
│  • Next Step Hygiene                                    │
│  • Orchestration agents (ROI, Email, Exec Summary...)   │
│  • Data foundation (Gong transcripts, SFDC data)        │
└─────────────────────────────────────────────────────────┘
```

---

## Part 3: Roadmap

### Phase 1: Account Experience (Now → CKO)

| Deliverable | Description | Status |
|-------------|-------------|--------|
| Account Page mockup | New account homepage structure showing buying group, next steps, key moments, orchestration buttons | To build |
| Communication Preferences | PX quick win — easier way to manage status page/comm contacts | To scope |
| Product reveal polish | Final animations + any new slides | In progress |

**Account Page should include:**
- Quick summary ("Twitter version" of what's happened)
- Buying Group card with engagement levels
- Next Steps / Open action items
- Recent activity / Key moments
- Orchestration launchpad: "I want to..." → Email, ROI model, Exec summary, Sales handoff, etc.

### Phase 2: Record Page Pattern (Post-CKO)

Once account page is proven, cascade the pattern:
- Opportunity page
- Contact page
- Implementation/Pilot page (for PX)

### Phase 3: Homepage / Territory Views (Q2+)

Roll up account-level data into role-specific homepages:
- **Rep**: My territory, deals needing attention, today's priorities
- **Manager**: Team performance, coaching opportunities, forecast
- **SDR**: Call priorities, account research, sequences
- **PS**: Renewals, implementations, account health

### What We're NOT Doing Yet

| Item | Why not now |
|------|-------------|
| Deal risk scoring | "No one's solved this" — need more data inputs first |
| Forecasting UI | Haven't earned the right; need account foundation first |
| Planhat overlap | Wait to understand what Planhat will actually do |

---

## Part 4: Open Questions

### For Planhat Discovery
- Where does Planhat solve vs. where do we build?
- Is Implementation using Planhat or staying in SFDC?
- What customization is possible in Planhat?

### For PX Scoping
- Who knows the communication preferences pain best?
- What would an amazing experience look like for them?
- Can we prototype quickly and get feedback?

### For Account Page
- What are the "key moments" we want to track? (Last roadmap seen, etc.)
- How do we surface external signals (news, market events)?
- What's the right balance of information vs. action?

---

## Part 5: Mockup Priorities

Given what exists and what's needed for CKO, here's the gap:

| Mockup | Exists? | Priority |
|--------|---------|----------|
| Deal Intelligence | ✅ Yes | — |
| Deal Risk Signals | ✅ Yes | — |
| Meeting Prep Brief | ✅ Yes | — |
| Next Steps Hygiene | ✅ Yes | — |
| Buying Group | ✅ Yes | — |
| Manager views (4) | ✅ Yes | — |
| SDR views (3) | ✅ Yes | — |
| PS views (3) | ✅ Yes | — |
| Home pages (4) | ✅ Yes | — |
| **Account Page** | ❌ No | **HIGH — needed for CKO vision** |
| **Comm Preferences** | ❌ No | **MEDIUM — quick win for PX** |

### Account Page Mockup Spec

Based on meeting discussion, the account page should feel like:
- A "launchpad" for everything account-related
- Information + Context + Actions + External Resources
- Reduces clicks — see everything important without drilling down

**Sections:**
1. **Header**: Account name, health score, key stats
2. **Summary**: AI-generated "what's happened recently"
3. **Buying Group**: Visual with engagement levels
4. **Open Actions**: Next steps, tasks due
5. **Key Moments**: Timeline of important events
6. **Orchestration Panel**: "What do you want to do?"
   - Send email
   - Generate ROI model
   - Create exec summary
   - Prep meeting
   - Sales handoff
   - etc.
7. **Resources**: Links to Sigma dashboard, Google Drive docs, etc.

---

## Next Actions

1. **Build Account Page mockup** — This is the centerpiece of the CKO vision
2. **Scope Communication Preferences** — Talk to PX about the pain, mock something fast
3. **Polish product reveal** — Ensure timing and flow is tight
4. **Prep for main stage possibility** — Have a live demo ready (Claude Code walkthrough)
5. **Planhat discovery** — Understand the division of labor with Zach's help
