# VA Intel Slack Digest: Options & Approaches

## Goal
Automated Slack digest pulling VA-specific news from curated sources, powered by Tray.io with centralized storage in Tray DB.

---

## Sources to Monitor

| Source | Type | Feed Method | Difficulty |
|--------|------|-------------|------------|
| Orange Slices AI | VA intel service | RSS (`/feed/`) | ✅ Easy |
| r/govcon | Reddit | RSS | ✅ Easy |
| r/VeteransAffairs | Reddit | RSS | ✅ Easy |
| r/cernercorporation | Reddit | RSS | ✅ Easy |
| LinkedIn (Shulkin, Kshmendra Paul) | Social | Sales Navigator Lead Alerts → Email | ✅ Easy |
| veterans.house.gov | Government | SerpAPI `site:` search | ✅ Easy |
| VA News (broad) | Google News | SerpAPI Google News API | ✅ Easy |

---

## Source-by-Source Breakdown

### 1. Reddit (r/govcon, r/VeteransAffairs, r/cernercorporation)

**RSS feeds:**
- `https://www.reddit.com/r/govcon/.rss`
- `https://www.reddit.com/r/VeteransAffairs/.rss`
- `https://www.reddit.com/r/cernercorporation/.rss`

**Tray approach:**
- RSS connector → Normalize → Check duplicate → Write to Tray DB
- Optional: Keyword filter (VA, Veterans Affairs, Oracle Health, EHR, Cerner)
- r/govcon is high-volume; filtering recommended

---

### 2. Orange Slices AI

**RSS Feed:** `https://orangeslices.ai/feed/`

**Tray approach:**
- RSS connector → Normalize → Write to Tray DB
- Test feed in browser while logged in (may require auth)
- If gated, check for authenticated feed URL (`/feed/?token=xxx`)

---

### 3. veterans.house.gov

**SerpAPI approach:**
```
Query: site:veterans.house.gov
Date filter: past 24 hours
```

**Tray approach:**
- Scheduled HTTP call to SerpAPI (every 1-2 hours)
- Parse results → Check against Tray DB for duplicates → Write new items
- Keywords to watch: "hearing", "oversight", "Oracle", "EHR", "testimony"

---

### 4. LinkedIn (Shulkin, Kshmendra Paul)

**Primary: Sales Navigator Lead Alerts**

Setup:
1. Save each person as a Lead in Sales Navigator
2. Enable notifications: Settings → Alerts → "Lead updates" + "News mentions"
3. Sales Nav sends email alerts when they post or are mentioned

**Tray approach:**
- Email trigger (watch for Sales Nav alert emails)
- Parse email content → Normalize → Write to Tray DB

**Backup: SerpAPI public post search**
```
Query: site:linkedin.com/posts "David Shulkin"
Query: site:linkedin.com/posts "Kshmendra Paul"
```
- Catches public posts indexed by Google
- Delayed (depends on Google indexing) but compliant

---

### 5. Broader VA News (Optional)

**SerpAPI Google News API:**
```
Query: "Veterans Affairs" OR "VA healthcare" OR "Oracle Health VA"
```

**Tray approach:**
- Scheduled HTTP call (every 2-4 hours)
- Supplements curated sources with mainstream coverage
- Higher noise; LLM filtering recommended

---

## Architecture: Tray.io + Tray DB

### Why Tray DB?
- **Deduplication** - Don't post the same item twice
- **History** - Track what you've seen, search past intel
- **Batch processing** - LLM can summarize a day's worth, not item-by-item
- **Flexibility** - Real-time alerts AND daily digests from same data

---

### Data Model (Tray DB)

**Table: `va_intel_items`**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique ID (URL hash or GUID from feed) |
| `source` | string | `reddit_govcon`, `reddit_va`, `reddit_cerner`, `orange_slices`, `veterans_house`, `sales_nav`, `serpapi_news` |
| `title` | string | Item title/headline |
| `url` | string | Link to original |
| `content` | text | Body text, summary, or snippet |
| `author` | string | Who posted (if applicable) |
| `published_at` | datetime | When it was published |
| `ingested_at` | datetime | When we captured it |
| `vetted` | boolean | `null` = unprocessed, `true` = relevant, `false` = not relevant |
| `relevance_score` | number | LLM-assigned score (0-1) |
| `llm_summary` | text | LLM-generated summary of the item |
| `tags` | array | LLM-extracted tags: `["EHR", "Oracle", "contract", "hearing"]` |
| `included_in_digest` | datetime | Timestamp of digest that included this item (null = not yet sent) |

---

### Workflow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LAYER 1: CAPTURE                                    │
│                    (Multiple workflows, dumb ingestion)                     │
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐ │
│  │  RSS x4   │ │  SerpAPI  │ │ Sales Nav │ │  SerpAPI  │ │    SerpAPI    │ │
│  │ Reddit +  │ │  site:    │ │   Email   │ │  Google   │ │ site:linkedin │ │
│  │ OSlices   │ │ veterans  │ │  Alerts   │ │   News    │ │   /posts      │ │
│  │           │ │ .house.gov│ │           │ │  (VA)     │ │   (backup)    │ │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └───────┬───────┘ │
│        │             │             │             │               │         │
│        └─────────────┴─────────────┴──────┬──────┴───────────────┘         │
│                                           ▼                                 │
│                              ┌─────────────────────┐                        │
│                              │   Normalize Item    │                        │
│                              │   Check Duplicate   │                        │
│                              │   Write to DB       │                        │
│                              │   (vetted = null)   │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │      Tray DB        │                        │
│                              │   va_intel_items    │                        │
│                              └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         LAYER 2: PROCESS                                    │
│                      (One workflow, LLM vetting)                            │
│                                                                             │
│                              ┌─────────────────────┐                        │
│                              │  Scheduled trigger  │                        │
│                              │  (every 30 min?)    │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Query Tray DB     │                        │
│                              │  WHERE vetted=null  │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Loop: For each    │                        │
│                              │   unvetted item     │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   LLM API Call      │                        │
│                              │   - Relevance score │                        │
│                              │   - Summary         │                        │
│                              │   - Tags            │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Update Tray DB    │                        │
│                              │   vetted = true/    │                        │
│                              │   false + metadata  │                        │
│                              └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         LAYER 3: OUTPUT                                     │
│                    (One workflow, digest generation)                        │
│                                                                             │
│                              ┌─────────────────────┐                        │
│                              │  Scheduled trigger  │                        │
│                              │     (8am CT)        │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Query Tray DB     │                        │
│                              │  WHERE vetted=true  │                        │
│                              │  AND included_in_   │                        │
│                              │  digest IS NULL     │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   LLM API Call      │                        │
│                              │   Generate digest   │                        │
│                              │   from vetted items │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Post to Slack     │                        │
│                              │   #va-intel         │                        │
│                              └──────────┬──────────┘                        │
│                                         ▼                                   │
│                              ┌─────────────────────┐                        │
│                              │   Update Tray DB    │                        │
│                              │   included_in_      │                        │
│                              │   digest = NOW()    │                        │
│                              └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Tray Workflows to Build

**Layer 1: Capture** (5 workflows)

| # | Workflow | Trigger | Schedule | Purpose |
|---|----------|---------|----------|---------|
| 1 | RSS Ingestion | RSS poll | Every 15-30 min | Reddit (x3) + Orange Slices |
| 2 | veterans.house.gov | Scheduled | Every 1-2 hours | SerpAPI site search |
| 3 | Sales Nav Alerts | Email trigger | Real-time | LinkedIn lead updates |
| 4 | Google News Sweep | Scheduled | Every 2-4 hours | Broader VA coverage |
| 5 | LinkedIn Posts (backup) | Scheduled | Every 4-6 hours | SerpAPI public posts |

**Layer 2: Process** (1 workflow)

| # | Workflow | Trigger | Schedule | Purpose |
|---|----------|---------|----------|---------|
| 6 | LLM Vetting | Scheduled | Every 30 min | Score relevance, summarize, tag unvetted items |

**Relevance Threshold Strategy:**
- Layer 2 always sets `vetted = true` and stores the `relevance_score` (0-1)
- Layer 3 decides the threshold at digest time (e.g., `WHERE relevance_score > 0.6`)
- This lets you tune the threshold without reprocessing historical items
- If signal-to-noise is off, just adjust the Layer 3 query—no backfill needed

**Layer 3: Output** (1 workflow)

| # | Workflow | Trigger | Schedule | Purpose |
|---|----------|---------|----------|---------|
| 7 | Daily Digest | Scheduled | 8am CT | Generate digest from vetted items, post to Slack |

---

## SerpAPI Details

**Endpoints you'll use:**

| Endpoint | Use Case | Query Example |
|----------|----------|---------------|
| Google Search | Site-specific monitoring | `site:veterans.house.gov` |
| Google News | Broad VA news | `"Veterans Affairs" healthcare` |
| Google Search | LinkedIn public posts | `site:linkedin.com/posts "David Shulkin"` |

**Tray integration:**
- HTTP connector → SerpAPI endpoint
- Parse JSON response
- Loop through results → check Tray DB for duplicates → insert new items

**Cost estimate:** ~$50-100/mo depending on query frequency

**Rate limiting:** SerpAPI handles Google rate limits; you just pay per search

---

## Where LLMs Add Value

| Use Case | When | Prompt Idea |
|----------|------|-------------|
| **Relevance scoring** | On ingestion | "Rate 0-1: Is this relevant to VA healthcare, Oracle Health, or federal health IT contracting?" |
| **Tagging** | On ingestion | "Extract tags: companies, contract types, people, topics" |
| **Daily digest** | 8am workflow | "Here are today's 20 items. Create a 5-bullet executive briefing, grouped by theme. Prioritize contract awards, hearings, and executive statements." |
| **On-demand query** | Slack command | "Summarize everything from the past week about Oracle Health VA contract" |

**Implementation:** HTTP call to OpenAI/Anthropic API from Tray workflow

---

## Slack Output Options

### Option A: Single Channel
- `#va-intel` - Everything goes here
- Use threading to group by source or topic
- Simpler to monitor

### Option B: Split Channels
- `#va-intel-alerts` - Real-time high-priority items
- `#va-intel-digest` - Daily summary only
- Reduces noise for those who just want highlights

### Option C: Hybrid
- Real-time alerts in `#va-intel`
- Daily digest as a Slack Canvas or threaded summary post

---

## Implementation Phases

### Phase 1: Foundation
1. Set up Tray DB table (`va_intel_items`)
2. Build RSS ingestion workflow (Reddit x3 + Orange Slices)
3. Build basic Slack posting (no LLM yet)
4. Test deduplication logic

### Phase 2: Expand Sources
5. Add SerpAPI workflow for veterans.house.gov
6. Set up Sales Navigator lead alerts → email trigger
7. Add Google News sweep (optional, may be noisy)

### Phase 3: Intelligence Layer
8. Add LLM relevance scoring on ingestion
9. Build daily digest workflow with LLM summarization
10. Add real-time alerts for high-priority keywords

### Phase 4: Polish
11. Tune keyword filters based on signal-to-noise
12. Add on-demand query capability (Slack slash command?)
13. Build simple dashboard or weekly report

---

## Open Questions

- [x] Does Orange Slices have RSS? → **Yes, `/feed/`**
- [x] LinkedIn approach? → **SerpAPI only (no inbox/email involvement)**
- [x] Which LLM provider for summarization? → **OpenAI (gpt-5.2 via Responses API)**
- [ ] Desired frequency: real-time vs. daily digest vs. both?
- [ ] Single Slack channel or split?
- [ ] High-priority keywords for real-time alerts?

---

## Build Status (Jan 9, 2026)

### Executive Summary

**What's built:** Automated VA intel pipeline that monitors 7 sources, scores relevance with AI, and generates a daily Slack digest.

**Sources monitored:**
- Orange Slices AI (RSS)
- Reddit: r/govcon, r/VeteransAffairs, r/cernercorporation (RSS)
- veterans.house.gov (SerpAPI)
- LinkedIn: David Shulkin, Kshemendra Paul (SerpAPI)

**How it works:**
1. **Capture** → Polls sources on schedule, dedupes, stores in DB
2. **Process** → AI scores each item for relevance (0-1), generates summary and tags
3. **Output** → Daily digest pulls high-relevance items, formats for Slack

**Status:** All workflows built and tested. Ready for Monday launch.

---

### To Launch (Monday)

1. **Enable all Layer 1 capture workflows:**
   - RSS Ingestion (Orange Slices + 3 Reddit subs)
   - veterans.house.gov SerpAPI
   - LinkedIn Shulkin SerpAPI
   - LinkedIn Paul SerpAPI

2. **Enable Layer 2 (LLM Vetting):**
   - Runs every 30 min, scores unvetted items

3. **Enable Layer 3 (Daily Digest):**
   - Schedule for 8am CT
   - Confirm Slack channel target

4. **Monitor first few days:**
   - Check digest quality
   - Adjust relevance threshold if needed (currently 0.5)
   - Tune polling schedules based on volume

### Workflows Built

| Layer | Workflow | Status |
|-------|----------|--------|
| 1 | RSS Ingestion (4 feeds) | ✅ Built |
| 1 | veterans.house.gov (SerpAPI) | ✅ Built |
| 1 | LinkedIn Shulkin (SerpAPI) | ✅ Built |
| 1 | LinkedIn Paul (SerpAPI) | ✅ Built |
| 2 | LLM Vetting | ✅ Built |
| 3 | Daily Digest to Slack | ✅ Built |

### Polling Schedules

| Source | Frequency |
|--------|-----------|
| Orange Slices | Every 30 min |
| r/govcon | Every 2 hours |
| r/VeteransAffairs | Every 4 hours |
| r/cernercorporation | Every 6 hours |
| veterans.house.gov | Every 4-6 hours |
| LinkedIn (both) | Every 12 hours |

---

## Resources

**RSS Feeds:**
- `https://www.reddit.com/r/govcon/.rss`
- `https://www.reddit.com/r/VeteransAffairs/.rss`
- `https://www.reddit.com/r/cernercorporation/.rss`
- `https://orangeslices.ai/feed/`

**SerpAPI:**
- Docs: https://serpapi.com/
- Google Search API: https://serpapi.com/google-search-api
- Google News API: https://serpapi.com/google-news-api

**Tray.io:**
- Tray DB docs: https://tray.io/documentation/connectors/service/tray-data-storage/
- RSS connector: Built-in
- HTTP connector: For SerpAPI calls
