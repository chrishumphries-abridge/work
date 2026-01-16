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

### Workflow Architecture (Implemented)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              LAYER 1: CAPTURE                                   │
│                         (8 workflows, various triggers)                         │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ RSS-Orange-     │  │ RSS-Reddit-VA   │  │ RSS-Reddit-     │                 │
│  │ Slices          │  │                 │  │ Cerner          │                 │
│  │ (Scheduled)     │  │ (Scheduled)     │  │ (Scheduled)     │                 │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘                 │
│           │                    │                    │                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ RSS-Reddit-     │  │ SerpAPI-        │  │ SerpAPI-        │                 │
│  │ GovCon          │  │ Veterans_Gov    │  │ Google News     │                 │
│  │ (Scheduled)     │  │ (Scheduled)     │  │ (Scheduled)     │                 │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘                 │
│           │                    │                    │                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │ SerpAPI-        │  │ SerpAPI-        │  │ Email - VA      │                 │
│  │ LinkedIn-       │  │ LinkedIn-       │  │ Newsletters     │                 │
│  │ Shulkin         │  │ Paul            │  │ (Email trigger) │                 │
│  │ (Scheduled)     │  │ (Scheduled)     │  │                 │                 │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘                 │
│           │                    │                    │                          │
│           └────────────────────┴────────────────────┘                          │
│                                │                                               │
│                    ┌───────────▼───────────┐                                   │
│                    │      Tray DB          │                                   │
│                    │   va_intel_items      │                                   │
│                    │   (vetted = null)     │                                   │
│                    └───────────┬───────────┘                                   │
└────────────────────────────────┼───────────────────────────────────────────────┘
                                 │
┌────────────────────────────────┼───────────────────────────────────────────────┐
│                    LAYER 2: PROCESS                                            │
│                                ▼                                               │
│                    ┌───────────────────────┐                                   │
│                    │     LLM Scoring       │                                   │
│                    │     (Scheduled)       │                                   │
│                    │                       │                                   │
│                    │  • Query unvetted     │                                   │
│                    │  • Veterans/LI check  │                                   │
│                    │  • Fetch URL (cond.)  │                                   │
│                    │  • Score relevance    │                                   │
│                    │  • Generate summary   │                                   │
│                    │  • Update DB          │                                   │
│                    └───────────┬───────────┘                                   │
│                                │                                               │
│                    ┌───────────▼───────────┐                                   │
│                    │      Tray DB          │                                   │
│                    │   vetted = true       │                                   │
│                    │   relevance_score     │                                   │
│                    │   llm_summary         │                                   │
│                    └───────────┬───────────┘                                   │
└────────────────────────────────┼───────────────────────────────────────────────┘
                                 │
┌────────────────────────────────┼───────────────────────────────────────────────┐
│                    LAYER 3: OUTPUT                                             │
│                                ▼                                               │
│                    ┌───────────────────────┐                                   │
│                    │     Slack Digest      │                                   │
│                    │  (Scheduled - 8am CT) │                                   │
│                    └───────────┬───────────┘                                   │
│                                │                                               │
│    ┌───────────────────────────┼───────────────────────────────────────────┐   │
│    │                           ▼                                           │   │
│    │  Get Intel ──► Filter Vetted ──► Date Filter ──► Relevance Filter    │   │
│    │                                                                       │   │
│    │       ▼                                                               │   │
│    │  OpenAI Generate Digest ──► Sanitize/Escape                          │   │
│    │                                                                       │   │
│    │       ▼                                                               │   │
│    │  Create Canvas ──► Set Canvas Access ──► Post Canvas to Slack        │   │
│    │                                                                       │   │
│    └───────────────────────────────────────────────────────────────────────┘   │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Tray Workflow Inventory

| Layer | Workflow Name | Trigger | Source | Purpose |
|-------|---------------|---------|--------|---------|
| **1** | RSS-Orange-Slices | Scheduled | Orange Slices RSS | Ingest VA intel articles |
| **1** | RSS-Reddit-VA | Scheduled | r/VeteransAffairs | Ingest Reddit posts |
| **1** | RSS-Reddit-Cerner | Scheduled | r/cernercorporation | Ingest Reddit posts |
| **1** | RSS-Reddit-GovCon | Scheduled | r/govcon | Ingest Reddit posts |
| **1** | SerpAPI-Veterans_Gov | Scheduled | veterans.house.gov | Scrape legislative updates |
| **1** | SerpAPI-Google News | Scheduled | Google News | Broad VA news coverage |
| **1** | SerpAPI-LinkedIn-Shulkin | Scheduled | LinkedIn (David Shulkin) | Monitor exec posts |
| **1** | SerpAPI-LinkedIn-Paul | Scheduled | LinkedIn (Kshemendra Paul) | Monitor exec posts |
| **1** | Email - VA Newsletters | Email trigger | Forwarded newsletters | Manual newsletter capture |
| **2** | LLM Scoring | Scheduled | Tray DB (unvetted) | Score relevance, summarize, tag |
| **3** | Slack Digest | Scheduled (8am CT) | Tray DB (vetted) | Generate + post Canvas digest |
| **—** | Loop | Manual | Utility | Date filtering helper |

### Layer 1: Capture Workflow Pattern

Each capture workflow follows the same pattern:

```
Trigger (Scheduled/Email)
    │
    ▼
Fetch Source (RSS GET / SerpAPI HTTP / Email parse)
    │
    ▼
Check Results Exist? ──── No ──► Terminate
    │
   Yes
    │
    ▼
Loop through items
    │
    ├──► Lookup row in Tray DB (by URL/ID)
    │
    ├──► Row exists? ──── Yes ──► Skip (dedupe)
    │         │
    │        No
    │         │
    │         ▼
    │    Create row in Tray DB
    │    - id, source, title, url, content
    │    - author, published_at, ingested_at
    │    - vetted = null
    │
    ▼
Terminate
```

### Layer 2: LLM Scoring Workflow

```
Scheduled Trigger
    │
    ▼
List rows WHERE vetted = null
    │
    ▼
Loop through unvetted items
    │
    ├──► Is source = veterans_house OR linkedin?
    │         │
    │        Yes ──► HTTP GET URL content
    │         │
    │         ▼
    │    LLM: Check date validity (exclude if stale)
    │
    ├──► LLM Scoring API call
    │    - Input: title, content, url, (fetched page if applicable)
    │    - Output: relevance_score (0-1), llm_summary, tags
    │
    ├──► Update row in Tray DB
    │    - vetted = true
    │    - relevance_score = {score}
    │    - llm_summary = {summary}
    │
    ▼
Terminate
```

### Layer 3: Slack Digest Workflow

```
Scheduled Trigger (8am CT)
    │
    ▼
Get Intel: Query Tray DB
    - WHERE vetted = true
    - AND included_in_digest IS NULL
    │
    ▼
Filter Vetted ──► Date Filter ──► Relevance Filter (≥0.5)
    │
    ▼
Filter out items with no LLM summary
    │
    ▼
OpenAI Generate Digest
    - Input: filtered items as JSON
    - Output: formatted markdown digest
    │
    ▼
Sanitize/Escape markdown for JSON
    - Replace newlines with \n
    - Escape quotes, backslashes
    │
    ▼
Create Canvas (Slack API)
    - POST canvases.create
    - title: "VA Intel Digest — {date}"
    - document_content: {sanitized markdown}
    │
    ▼
Set Canvas Access (Slack API)
    - POST canvases.access.set
    - channel_ids: ["C08QT1QV9JM"]
    │
    ▼
Post Canvas to Slack
    - POST chat.postMessage
    - Button block linking to Canvas
    │
    ▼
Update Tray DB
    - SET included_in_digest = NOW()
    │
    ▼
Terminate
```

---

## LLM Prompts

### Digest Generation Prompt (Layer 3)

```
You are a VA Intel analyst preparing a daily Slack digest for the Abridge policy team.

INPUT: A list of articles/posts with metadata including source, title, URL, and summary.

OUTPUT: A single markdown document. Output ONLY the markdown, no preamble.

FORMATTING RULES:
- Group items by source type (infer logical groupings from the source field)
- Use an appropriate emoji for each section header
- Use horizontal rules (---) between sections
- Each item gets an H3 with linked title, followed by summary
- Add "**Why it matters:**" for substantive articles (news, legislative, executive posts)
- For community posts (Reddit, forums), use bullet format: **[Title](url)** — Key takeaway
- Omit empty sections
- End with: *Generated automatically from VA Intel pipeline*

STRUCTURE:
- Lead with curated intel sources (newsletters, specialized feeds)
- Then community/social signals
- Then official sources (legislative, government)
- Then executive/influencer content

Let the data shape the output. Adapt section names and groupings based on what's actually present in the input.
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

## Google News Source Tags

Source tags for Google News topics ingested via SerpAPI.

### Federal Acquisition & Procurement
| Topic | Source Tag |
|-------|------------|
| federal acquisition regulation (FAR) | `google_news_far` |
| government procurement reform | `google_news_procurement_reform` |

### Federal IT & Technology Policy
| Topic | Source Tag |
|-------|------------|
| federal IT modernization | `google_news_fed_it_mod` |
| OMB memorandum | `google_news_omb` |
| executive order technology | `google_news_eo_tech` |
| federal AI policy | `google_news_fed_ai` |
| NIST standards update | `google_news_nist` |
| FedRAMP authorization | `google_news_fedramp` |
| FedRAMP High | `google_news_fedramp_high` |
| federal cloud security | `google_news_fed_cloud` |
| public sector cybersecurity | `google_news_pubsec_cyber` |
| government data sharing | `google_news_gov_data` |
| digital transformation government | `google_news_gov_dx` |

### VA Leadership
| Topic | Source Tag |
|-------|------------|
| VA Secretary | `google_news_va_secretary` |
| Douglas A. Collins | `google_news_collins` |
| Under Secretary for Health | `google_news_va_ush` |
| John Bartrum | `google_news_bartrum` |
| Veterans Health Administration | `google_news_vha` |
| EHR Modernization Integration Office | `google_news_ehrm` |

### Congressional Oversight
| Topic | Source Tag |
|-------|------------|
| Senate Veterans Affairs Committee | `google_news_svac` |
| House Veterans Affairs Committee | `google_news_hvac` |

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
- [ ] **LinkedIn date filtering** — need better approach (see notes below)
- [ ] **RFP tracking** — monitor VA contract opportunities/solicitations (no solution yet, needs scoping)

### LinkedIn Date Filtering Challenge

SerpAPI returns Google-indexed results, not native LinkedIn timestamps. Options:

1. **SerpAPI `tbs` param** — `tbs=qdr:d` (past 24h), `tbs=qdr:w` (past week). Filters by Google index date, not post date. Rough but simple.

2. **Dedupe-only approach** — Don't filter by date at all. Store URLs, only process new ones. Relies on deduplication rather than date filtering.

3. **Parse snippet for date clues** — LinkedIn snippets sometimes include "2d ago", "1w ago". Could regex parse and convert to approximate date. Fragile.

4. **Accept lag** — LinkedIn monitoring is inherently delayed (depends on Google indexing). Treat it as "catch eventually" rather than real-time.

**Recommendation:** Start with option 1 (`tbs=qdr:d`) + deduplication. If too noisy or missing posts, revisit.

### URL Date Validation (Legislative + LinkedIn)

SerpAPI results for veterans.house.gov and LinkedIn can return stale content that Google recently re-indexed. Before including in digest:

**Option A: LLM pre-check**
- In Layer 2 vetting, have LLM check if the URL content appears recent
- Prompt: "Based on the title and snippet, does this appear to be from the last 7 days? Look for date indicators in the text."
- Flag or exclude items that look dated

**Option B: Fetch and parse**
- HTTP GET the URL in Layer 1
- Parse for publish date in meta tags (`article:published_time`, `og:updated_time`) or page content
- Store actual publish date, filter in Layer 3

**Option C: Manual title scan**
- Legislative URLs often have dates in the title or DocumentID pattern
- LinkedIn posts sometimes show "2d", "1w" in snippets
- Regex check before DB insert

**Recommendation:** Start with Option A (LLM pre-check during vetting). Lower lift than parsing, catches most stale content. Add Option B later if false positives persist.

### RFP Tracking (Future)

**Goal:** Monitor VA contract opportunities and solicitations relevant to clinical documentation, health IT, AI.

**Potential sources:**
- SAM.gov (official federal procurement site) — has API
- GovWin / Deltek (paid intel)
- FedBizOpps successor feeds
- SEWP, T4NG, and other GWAC award notices

**Approaches to explore:**
- SAM.gov API with keyword filters (VA + health IT + documentation + AI)
- SerpAPI monitoring `site:sam.gov "Veterans Affairs"`
- Paid service with alerting (GovWin)

**Status:** Not started. Needs scoping call with Julia to understand priority and detail level needed.

---

## Build Status (Jan 12, 2026)

### Current Status: Final Formatting Issues

**What's working:**
- All 6 Tray workflows (Layer 1-3) are built and functional
- Data ingestion and LLM vetting operational
- Canvas API calls succeeding

**Blockers to resolve (pick up Wednesday Jan 15):**

1. **Canvas Create JSON formatting issue**
   - `canvases.create` request throwing JSON errors
   - Likely escaping issue with markdown content containing special characters
   - May need to sanitize/escape the LLM output before embedding in JSON payload

2. **Canvas access/sharing**
   - Using `canvases.access.set` after create to grant channel access
   - Need `include_raw_body: true` in Tray HTTP connector
   - Flow: create → access.set → chat.postMessage

3. **Slack message formatting**
   - Canvas links don't auto-unfurl
   - Solution: Use button block for "Open Digest" CTA instead of relying on unfurl
   - Button approach tested and working

4. **Google News Alerts workflow**
   - Skeleton workflow exists, needs fine-tuning
   - New sources added today need to be configured
   - Review query structure and polling schedule

**API Reference (for Wednesday):**

Canvas Create:
```
POST https://slack.com/api/canvases.create
{
  "title": "VA Intel Digest — {date}",
  "document_content": {
    "type": "markdown",
    "markdown": "{LLM output}"
  }
}
```

Access Set:
```
POST https://slack.com/api/canvases.access.set
{
  "canvas_id": "{from create response}",
  "access_level": "read",
  "channel_ids": ["C08QT1QV9JM"]
}
```

Post with Button:
```json
{
  "channel": "C08QT1QV9JM",
  "text": "VA Intel Digest ready",
  "blocks": [{
    "type": "section",
    "text": {"type": "mrkdwn", "text": "📋 *VA Intel Digest — {date}*"},
    "accessory": {
      "type": "button",
      "text": {"type": "plain_text", "text": "Open Digest"},
      "url": "https://abridge.slack.com/docs/{team_id}/{canvas_id}"
    }
  }]
}
```

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


  - Group items by relevance: "Top Stories" (0.7+) vs "Also Noted" (0.5-0.7)