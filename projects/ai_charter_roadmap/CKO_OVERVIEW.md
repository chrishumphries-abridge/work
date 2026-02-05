# CKO 2026 — Chris's Presentation Overview

Read this to get back up to speed on what you're presenting at CKO.

---

## TL;DR

You have **three sessions** at CKO:

| Session | Format | Audience | What You're Doing |
|---------|--------|----------|-------------------|
| **1. Main Stage** | Demo/talk (5 min) | All CKO | "How I'm AI-pilling" — with Brad, personal AI journey |
| **2. RevOps Showcase** | Demo (Wednesday) | Commercial team | What GTM Systems AI shipped + Account Page reveal |
| **3. AI Foundations** | Slides + interactive | Opt-in breakout | Teaching AI basics to non-technical folks |

Sessions 1 & 2 are **demo-based** (light on slides, heavy on showing real things).
Session 3 is **slide-based** (educational content with polls/exercises).

**Common thread:** All three sessions should feel connected, not disparate.

---

## Session 1: Main Stage — "How I'm AI-Pilling"

**Presenters:** Chris + Brad (5 min each)
**Theme:** "How we got here"

**The story:** Your personal journey using AI to change how you work.

**Demo flow (from Jeremy):** Show the buying group arc as the proof point:
1. Started with a concept (old slides) — the idea
2. First version — not vibe coded, but AI-assisted iterations
3. New version — fully vibe coded
4. Buying group scoring — "easy to add things on top" proof point

**Key beats:**
1. "I used to be limited by what tools would let me do"
2. "AI changed how I build, not just what I build"
3. "I can go from conversation to prototype in hours"
4. Show the arc: brainstorm → prototype → production

**Talk track (from Jeremy):**
- Salesforce is super hierarchical — seeing everything in one place is nearly impossible
- UX has only improved twice in 20 years (Classic → Lightning, that's it)
- Unless you can do custom dev, you're up against a wall
- AI coding agents (Claude Code, Tray, JASPT) unlocked the ability to do custom dev
- "This looks scarier than it actually is" — show it's accessible

**What to prep:**
- Find old buying group slides to show evolution
- Talking points for "how I actually work"
- **Record video of Next Steps AI generation** — show it "doing it," not just the result
- **Add Tray.io** to tools mentioned alongside Claude Code
- Keep it authentic — this is your story, not a pitch
- Everything pre-recorded (no live demos)

**Tone:** Personal, approachable, "let me show you something cool"

---

## Session 2: RevOps Showcase — "Where We're Going" (Wednesday)

**The story:** Account Page is the centerpiece. This session = "where we're going."
**Format:** Pre-recorded video walkthrough of account page mockup (everything must be pre-recorded)

**Major pivot (Jeremy meeting, Feb 2026):**
- Account Page is the star — not a tease, the main event
- Don't rehash Next Steps — show engagement criteria as the evolution
- Status Page → reimagine as project teams management widget
- Jeremy was blown away by the mockup. Focus time here.

**Demo strategy:** Pre-recorded walkthrough of account page mockup
- Click through components, show modals, explain what each does
- Show how to kick off orchestration actions (even if output not built yet)
- Can also do a video if screen sharing isn't available (it isn't — pre-recorded)

**What to show:**
1. **Account Page walkthrough** — the centerpiece
   - Header, AI summary, buying groups with engagement criteria
   - Orchestration panel (right side) — show modal click-throughs
   - Sigma dashboard link, Google Drive folder link
   - Account plan: simplified, just "active account plan" + click-through
   - Days to renewal, open pipeline
2. **Buying Groups** — engagement criteria being added (the evolution, not rehash)
3. **Status Page reimagined** — project teams management widget (like buying group modal)
4. **Shout out Ramon** — help requests reimagination

**New mockup items needed (from Jeremy):**
- [ ] Make account page wider / full-page layout
- [ ] Add mutual action plan to right-hand orchestration panel
- [ ] Add "chat with this account" concept
- [ ] Build project teams modal for status page management
- [ ] Add engagement criteria under buying groups
- [ ] Simplify account plan display
- [ ] Add click-through modals to orchestration actions

**Key messages to land:**
1. "We're reimagining what Salesforce can look like" — inventing new UI
2. Everything in one place — no more tab-switching
3. AI-powered actions right from the account page
4. Account-first strategy — nail the foundation before territory views
5. "Ship what helps" — if it doesn't make your job easier, we don't build it

**Small wins to mention:**
- PSD updater component (for PS team)

**What NOT to promise:**
- No specific roadmap beyond Account Page
- No time estimates
- Don't claim we've "solved" anything — we're learning

---

## Session 3: AI Foundations Breakout

**The goal:** Help commercial team members understand AI enough to use it.
"This stuff is pretty accessible" — leveling the playing field.
**Format:** Slides (15 min) + pre-recorded vibe coding demo (~30 min)

**Connection to other sessions:** This should tie back to what you showed in Sessions 1 & 2. The tools and concepts here are how that work got built. Ties into Shiv's main stage talk about AI tools at Abridge. Common thread, not disparate info.

**Time split (from Jeremy):**
- ~15 min: Foundational content
- ~30 min: Vibe coding demo / team activity

**Part 1: Foundations (~15 min)**
1. **Opening** — Why we're here, poll on current AI usage
2. **Foundations** — What's an LLM, generative vs agentic, glossary
3. **Prompting 101** — Role/Context/Task/Format framework, good vs bad examples
4. **Our Tech Stack** — Claude vs ChatGPT vs Perplexity, what Abridge offers

**Part 2: Vibe Coding Demo (~30 min)**
- Poll audience for ideas — "What would make your life easier?"
- People can present ideas and sketches
- Pick one feasible idea (pre-select options that are doable in the time)
- Pre-recorded demo of building a first pass on the selected idea
- Show that this stuff is accessible and fast

**Interactive elements:**
- Mentimeter/Kahoot poll: "How often do you use AI tools?"
- AI Mad Libs: fill-in-the-blank prompt builder
- Audience idea poll for vibe coding demo

**Key message:** "You don't need to be technical to benefit from AI. Start with one tool, one task."

**Open items still needed:**
- [ ] Revenue team AI adoption stats
- [ ] Stakeholder/partner AI adoption stats
- [ ] Confirm tool licensing with IT
- [ ] Set up poll tool (Mentimeter/Kahoot)
- [ ] Pre-record vibe coding demo (pick feasible idea, build first pass)
- [ ] Coordinate with Shiv's main stage talk about AI tools at Abridge

---

## Your Demo Assets

All in `mockups/` folder — open in browser to demo.

| Demo | What it shows |
|------|---------------|
| `product_reveal.html` | Opening animation (use for Session 2 opener) |
| `account_page.html` | **THE BIG REVEAL** — new account experience vision |
| `next_steps_hygiene.html` | What's shipped — AI-suggested next steps |
| `deal_intelligence_card.html` | Building block example |
| `*_home.html` | Role-specific homepage visions (rep, manager, SDR, PS) |

---

## Design Principles You're Emphasizing

| Principle | What it means |
|-----------|---------------|
| **Foundation First** | AI is only as good as its data |
| **Earn the Right** | Build blocks before complex views |
| **Ship What Helps** | If it doesn't make your job easier, we don't build it |
| **Easier Than Default** | Has to beat ChatGPT and existing tools |

---

## If Asked About Roadmap

> "We're focused on the Account Page right now. Once we nail that, it cascades — Opportunities, Contacts, then territory views. But we're earning the right to each step. We'll share more as we learn."

---

## Quick Reference

- **Prep files:** `cko_5min_talk.md` (Sessions 1 & 2), `cko_ai_foundations_slides.md` (Session 3)
- **Strategy context:** `cko_strategy_and_roadmap.md`
- **Source transcript:** `meeting_transcript.md` (Jeremy/Zach planning session)
- **Design help:** Jyotsna (Marketing), Sarah has Abridge template
