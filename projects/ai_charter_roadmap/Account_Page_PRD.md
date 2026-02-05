# Account Page PRD

**Product Requirement Document for Salesforce Development**

**Version:** 1.0
**Date:** February 3, 2026
**Owner:** Chris Humphries
**Reference Mockup:** `mockups/account_page.html`

---

## Executive Summary

Build a new Account record page in Salesforce that serves as the central "launchpad" for all account-related work. The page aggregates data from multiple sources, surfaces AI-generated insights, and provides quick actions for common workflows.

**Goal:** Reduce the number of clicks and tab-switches required to understand an account and take action.

**Strategic Context:** This is the foundational building block. Once this pattern is proven, it will be cascaded to Opportunity, Contact, and Implementation pages. Homepages/territory views come after.

---

## Layout

**Full-page width** (Jeremy feedback: make it wider, full page)

The page has 4 main sections:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACCOUNT HEADER                                                              │
│  Name, meta, health score, key stats                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  AI SUMMARY BANNER                                                           │
│  LLM-generated account narrative                                             │
├───────────────────────┬───────────────────────┬─────────────────────────────┤
│  BUYING GROUP         │  OPPORTUNITIES        │  ORCHESTRATION PANEL        │
│  (contacts + roles)   │  (with health)        │  "What do you want          │
│  + engagement criteria│                       │   to do?"                   │
├───────────────────────┼───────────────────────┤                             │
│  NEXT STEPS           │  KEY MOMENTS          │  - Draft Email              │
│  (tasks due)          │  (timeline)           │  - Meeting Prep             │
│                       │                       │  - ROI Analysis             │
│                       │                       │  - Exec Summary             │
│                       │                       │  - Chat with Account        │
│                       │                       │  - Mutual Action Plan       │
│                       │                       │                             │
│                       │                       │  RESOURCES                  │
│                       │                       │  - Sigma Dashboard          │
│                       │                       │  - Google Drive Folder      │
│                       │                       │  - Active Account Plan      │
│                       │                       │  - Support Tickets          │
└───────────────────────┴───────────────────────┴─────────────────────────────┘
```

---

## Component Specifications

### 1. Account Header

**Purpose:** At-a-glance account identity and health status.

#### 1.1 Account Identity (Left Side)
| Element | Source | Notes |
|---------|--------|-------|
| Logo/Initials | Derived from Account Name | First letters of first 2 words |
| Account Name | `Account.Name` | |
| Industry | `Account.Industry` | |
| Physician Count | `Account.Number_of_Physicians__c` | Custom field |
| Location | `Account.BillingCity`, `Account.BillingState` | |
| Customer Since | `Account.Customer_Start_Date__c` or first Closed Won Opp date | |

#### 1.2 Health Score (Right Side)
| Element | Source | Notes |
|---------|--------|-------|
| Health Score | **TBD - Integration required** | Options: Planhat, calculated field, or custom object |
| Health Trend | Calculated | Compare current vs 30 days ago |
| Trend Note | AI-generated or rule-based | e.g., "Usage declined after key user left" |

**Health Score Colors:**
- 0-40: Critical (Red `#c23934`)
- 41-65: Warning (Orange `#fe9339`)
- 66-100: Healthy (Green `#2e844a`)

#### 1.3 Stats Row
| Metric | Source | Calculation |
|--------|--------|-------------|
| ARR | `Account.ARR__c` | Custom field or SOQL sum of active subscriptions |
| Open Pipeline | SOQL | `SUM(Amount) WHERE AccountId = :this AND IsClosed = false` |
| Days to Renewal | Calculated | `Account.Contract_End_Date__c - TODAY()` |
| Open Opps | SOQL | `COUNT() WHERE AccountId = :this AND IsClosed = false` |
| Active Contacts | SOQL | `COUNT() WHERE AccountId = :this AND Active_Contact__c = true` |

---

### 2. AI Summary Banner

**Purpose:** LLM-generated narrative summarizing account status, risks, and opportunities.

#### Display
- Background: Light teal gradient (`rgba(0, 180, 216, 0.08)`)
- Left border: 4px solid teal (`#00b4d8`)
- Icon: Sparkle/AI indicator
- Label: "AI Account Summary"

#### Content Generation

**Input Data for LLM:**
```
- Account Name, Industry, ARR
- Health Score + trend
- Recent activity (last 30 days from Activity object)
- Open opportunities (stage, amount, close date)
- Key contacts and engagement levels
- Renewal date
- Recent support tickets
- Usage metrics (if available from Planhat/product data)
```

**Prompt Template:**
```
You are summarizing this account for a sales/CS rep. Be concise (2-3 sentences max). Highlight:
1. The most important risk or opportunity
2. Any time-sensitive items
3. Recommended next action

Account data:
{data}

Format: Start with a bold risk/opportunity statement. End with a clear next step.
```

**Implementation Options:**
1. **Real-time:** Call LLM API on page load (slower, always fresh)
2. **Cached:** Generate daily via batch job, store in `Account.AI_Summary__c` (faster, may be stale)
3. **Hybrid:** Show cached, offer "Refresh" button for real-time regeneration

**Recommendation:** Start with cached (Option 2). Regenerate nightly + on-demand via refresh button.

---

### 3. Buying Group Card

**Purpose:** Show key stakeholders and their engagement levels for this account.

#### Data Model

**Option A: Use existing Contact fields**
```
Contact.Buying_Role__c (Picklist)
  - Champion
  - Technical Buyer
  - Economic Buyer
  - User Buyer
  - Influencer

Contact.Engagement_Level__c (Picklist or Score)
  - High (green dot)
  - Medium (yellow dot)
  - Low (red dot)
```

**Option B: Junction object (more flexible)**
```
Buying_Group_Member__c
  - Contact__c (lookup)
  - Account__c (lookup)
  - Opportunity__c (optional - for opp-specific buying groups)
  - Role__c (picklist)
  - Engagement_Score__c (number 0-100)
  - Last_Engagement_Date__c (date)
```

**Recommendation:** Start with Option A (simpler). Migrate to Option B if we need opp-specific buying groups.

#### Display Logic
1. Query contacts where `AccountId = :this AND Buying_Role__c != null`
2. Sort by role priority: Champion > Economic > Technical > User
3. Show engagement dot based on `Engagement_Level__c`
4. If a standard role has no contact, show "Need to identify" placeholder with red styling

#### Engagement Criteria (New — Jeremy feedback)

Display engagement scoring under the buying group contacts. Shows activity-level indicators per contact based on engagement data.

- Integrate engagement criteria module under buying group card
- Can use existing engagement module or streamlined version
- Shows who is actively engaged vs going cold

#### Card Badge
- Count gaps: Number of standard roles without a contact
- Badge text: "1 gap" / "2 gaps" / "Complete" (green)

---

### 3.5 Project Teams Modal (New — Jeremy feedback)

**Purpose:** Manage status page assignments, communication topics, and project team roles from a single modal. Similar UX to buying group modal but for operational team management.

**Context:** Currently, status page management is handled via checkboxes on individual Contact records. This is painful for accounts with many contacts. Jeremy wants a buying-group-style modal where you can see the full account's team and manage assignments in one place.

**What it replaces/improves:**
- Contact-level checkboxes for status page alignment
- Communication topics management (Braze downstream)
- Project team role assignments

**Display:**
- Modal triggered from account page
- Shows all contacts on the account
- Checkboxes/toggles for: status page components, communication topics, project roles
- Bulk actions for adding/removing people

**Data:**
- Reads from existing project team / communication topic fields
- Syncs downstream to Status Page and Braze
- Backend automation already exists for some (e.g., Nebula integration type auto-aligns)

**Note:** Talk to someone on PX side about current status page workflow before building (Jeremy to connect).

---

### 4. Next Steps Card

**Purpose:** Show upcoming tasks/actions for this account.

#### Data Source
```sql
SELECT Id, Subject, ActivityDate, Owner.Name, Status
FROM Task
WHERE WhatId = :accountId
  AND Status != 'Completed'
  AND ActivityDate != null
ORDER BY ActivityDate ASC
LIMIT 5
```

Also include Tasks related to Account's Opportunities:
```sql
SELECT Id, Subject, ActivityDate, Owner.Name, Status, What.Name
FROM Task
WHERE What.Type = 'Opportunity'
  AND What.AccountId = :accountId
  AND Status != 'Completed'
ORDER BY ActivityDate ASC
```

#### Display Elements
| Element | Logic |
|---------|-------|
| Step Indicator | Overdue: Red `!` / Due within 3 days: Yellow `→` / On track: Gray `○` |
| Title | `Task.Subject` |
| Meta | "Due [relative date] • [Owner Name]" |

#### Card Badge
- Count overdue: `WHERE ActivityDate < TODAY()`
- Badge text: "1 overdue" (red) / "2 due soon" (yellow) / "On track" (green)

---

### 5. Open Opportunities Card

**Purpose:** Show pipeline associated with this account.

#### Data Source
```sql
SELECT Id, Name, StageName, Amount, CloseDate, Deal_Health_Score__c
FROM Opportunity
WHERE AccountId = :accountId
  AND IsClosed = false
ORDER BY Amount DESC
LIMIT 5
```

#### Display Elements
| Element | Source |
|---------|--------|
| Health Score Circle | `Opportunity.Deal_Health_Score__c` (0-100) |
| Opp Name | `Opportunity.Name` |
| Stage | `Opportunity.StageName` |
| Close Date | `Opportunity.CloseDate` (formatted as "Close: MMM DD") |
| Amount | `Opportunity.Amount` (formatted as currency) |

#### Card Badge
- Total pipeline: `SUM(Amount)` formatted as "$XXK pipeline"

#### Health Score Field
If `Deal_Health_Score__c` doesn't exist, create it:
- Type: Number (0-100)
- Can be populated by: formula, flow, or external system
- Color thresholds same as Account health

---

### 6. Key Moments Timeline

**Purpose:** Show important events in the account's history.

#### Data Model

**New Custom Object: `Key_Moment__c`**
```
Key_Moment__c
  - Account__c (Master-Detail to Account)
  - Date__c (Date, required)
  - Title__c (Text 80, required)
  - Description__c (Text Area 255)
  - Type__c (Picklist: Event, Alert, Success, Milestone)
  - Source__c (Picklist: Manual, Gong, Support, Product, Auto-detected)
  - Related_Record_Id__c (Text - polymorphic reference)
```

#### Types and Display
| Type | Dot Style | Use Case |
|------|-----------|----------|
| Event | Blue outline | Calls, meetings, discussions |
| Alert | Yellow filled | Risks, concerns, red flags |
| Success | Green outline | Wins, milestones achieved |
| Milestone | Blue filled | Contract signed, go-live, QBR |

#### Population Methods
1. **Manual:** Users create Key Moments directly
2. **Auto-detect via Flow:**
   - Opportunity stage changes
   - Large support cases opened/closed
   - Contract renewals
3. **Gong Integration:** Surface key moments from call transcripts (future)
4. **AI Detection:** LLM identifies important moments from activity history (future)

**MVP:** Manual creation + Flow-based auto-creation for stage changes and support cases.

---

### 7. Orchestration Panel

**Purpose:** Quick-action launcher for common workflows.

#### Actions

| Action | Type | Behavior |
|--------|------|----------|
| **Draft Email** | AI Agent | Opens modal, user selects contact, AI generates draft |
| **Meeting Prep** | AI Agent | Generates briefing doc based on upcoming meetings + account context |
| **ROI Analysis** | AI Agent | Generates custom ROI model using account data |
| **Exec Summary** | AI Agent | One-pager suitable for exec sharing |
| **Chat with Account** | AI Agent | Conversational interface to ask questions about the account (Jeremy: "little thing where you can be like, hey, create...") |
| **Mutual Action Plan** | Document | View/create mutual action plan linked to the account |
| **Sales Handoff** | AI Agent | Transition doc when account owner changes |
| **Closed Lost Analysis** | AI Agent | Analyze why deals at this account didn't close |

#### Implementation

**Phase 1 (MVP):** Buttons are visible and open modals showing what they would capture/do (Jeremy: show how to kick off actions even if output isn't built yet). No backend orchestration yet.

**Phase 2:** Integrate with orchestration backend (Tray.io, custom Apex, or external AI service).

**Technical Pattern:**
```apex
// Each button calls a Platform Event or invokes an @InvocableMethod
@InvocableMethod(label='Trigger AI Action')
public static void triggerAIAction(List<AIActionRequest> requests) {
    // Publish Platform Event to trigger Tray/external handler
    // OR call out to AI orchestration endpoint
}
```

#### Resources Section
| Resource | Link Source | Notes |
|----------|-------------|-------|
| Sigma Dashboard | Formula field or hardcoded URL pattern | Jeremy: "brilliant" |
| Google Drive Folder | `Account.GDrive_Folder_URL__c` | Jeremy: "freaking brilliant" |
| Active Account Plan | Link to account plan record | Simplified: just title + "last updated" + click-through. Don't show content inline. |
| Mutual Action Plan | Link to MAP record/doc | New from Jeremy feedback |
| Support Tickets | Link to filtered Case list view | |

---

## Data Requirements

### New Custom Fields

**On Account:**
| Field | Type | Purpose |
|-------|------|---------|
| `AI_Summary__c` | Long Text Area (1000) | Cached AI summary |
| `AI_Summary_Generated_Date__c` | DateTime | When summary was last generated |
| `Health_Score__c` | Number (0-100) | Overall account health |
| `Health_Score_30d_Ago__c` | Number | For trend calculation |
| `GDrive_Folder_URL__c` | URL | Link to Google Drive folder |

**On Contact:**
| Field | Type | Purpose |
|-------|------|---------|
| `Buying_Role__c` | Picklist | Champion, Technical, Economic, User, Influencer |
| `Engagement_Level__c` | Picklist | High, Medium, Low |

**On Opportunity:**
| Field | Type | Purpose |
|-------|------|---------|
| `Deal_Health_Score__c` | Number (0-100) | Individual deal health |

### New Custom Objects

**Key_Moment__c** (see Section 6)

---

## Technical Implementation

### Component Architecture

```
Account_Intelligence_Page (Lightning Record Page)
├── Account_Header_Component (LWC)
│   └── Apex: AccountHeaderController
├── AI_Summary_Component (LWC)
│   └── Apex: AISummaryController
├── Buying_Group_Component (LWC)
│   └── Apex: BuyingGroupController
├── Next_Steps_Component (LWC)
│   └── Apex: NextStepsController
├── Opportunities_Component (LWC)
│   └── Apex: OpportunitiesController
├── Key_Moments_Component (LWC)
│   └── Apex: KeyMomentsController
└── Orchestration_Panel_Component (LWC)
    └── Apex: OrchestrationController (or Platform Events)
```

### Styling

Use SLDS (Salesforce Lightning Design System) with custom CSS for:
- Card styling (12px border-radius, subtle shadows)
- Health score gradients
- AI summary gradient background
- Engagement dots
- Timeline styling

Reference: `mockups/account_page.html` has full CSS.

---

## Phasing

### Phase 1: MVP (2-3 weeks)
- [ ] Account Header with static fields (no health score integration yet)
- [ ] Buying Group card (using Contact fields) + engagement criteria
- [ ] Next Steps card (Tasks)
- [ ] Open Opportunities card (with placeholder health scores)
- [ ] Orchestration Panel (buttons visible, modals show what they capture — not "Coming Soon")
- [ ] Key Moments (manual creation only)
- [ ] Full-page layout (wider than standard)

### Phase 1.5: New Components (from Jeremy feedback)
- [ ] Project Teams modal (status page management — like buying group modal)
- [ ] "Chat with Account" action in orchestration panel
- [ ] Mutual Action Plan link in resources
- [ ] Account Plan simplified display (title + last updated + click-through)

### Phase 2: Intelligence Layer (2-3 weeks)
- [ ] AI Summary generation (batch + on-demand)
- [ ] Health score integration (Planhat or formula-based)
- [ ] Key Moments auto-creation via Flow
- [ ] Deal health score calculation

### Phase 3: Orchestration (3-4 weeks)
- [ ] Draft Email agent
- [ ] Meeting Prep agent
- [ ] ROI Analysis agent
- [ ] Exec Summary agent
- [ ] Chat with Account backend

### Phase 4: Enhancements
- [ ] Gong integration for Key Moments
- [ ] AI-detected Key Moments
- [ ] Engagement scoring automation
- [ ] Sales Handoff and Closed Lost agents
- [ ] Help Requests reimagination (Ramon)

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page adoption | 80% of reps use within 30 days | Page view analytics |
| Time on Account page | Increase vs current page | Analytics |
| Tasks created from page | Track via source field | SOQL |
| AI Summary refresh rate | >50% of users refresh at least 1x/week | Event tracking |

---

## Open Questions

1. **Health Score Source:** Planhat integration or build our own formula?
2. **AI Provider:** Which LLM service for summary generation? (Claude API, OpenAI, etc.)
3. **Buying Group Scope:** Account-level only or also Opportunity-level?
4. **Permissions:** Who can see AI summaries? Edit Buying Roles?
5. **Mobile:** What's the mobile experience?
6. **Status Page / Project Teams:** How does PX team currently manage status page assignments and communication topics? (Jeremy to connect with someone on PX side)
7. **Chat with Account:** What's the right interaction model? Sidebar chat vs modal vs inline?
8. **Mutual Action Plan:** Where does this live today? Existing doc or new object?

---

## Appendix

### A. Color Palette
```css
--brand-primary: #0176d3;    /* Salesforce blue */
--brand-teal: #00b4d8;       /* AI/intelligence accent */
--success: #2e844a;          /* Green */
--warning: #fe9339;          /* Orange */
--error: #c23934;            /* Red */
--gray-1: #f3f3f3;           /* Background */
--gray-2: #e5e5e5;           /* Borders */
--gray-3: #706e6b;           /* Secondary text */
```

### B. Health Score Thresholds
| Range | Label | Color |
|-------|-------|-------|
| 0-40 | Critical | Red |
| 41-65 | At Risk | Orange |
| 66-100 | Healthy | Green |

### C. Buying Role Definitions
| Role | Definition |
|------|------------|
| Champion | Internal advocate who actively promotes the solution |
| Economic Buyer | Has budget authority for the purchase |
| Technical Buyer | Evaluates technical fit and integration |
| User Buyer | End user who will use the product daily |
| Influencer | Shapes opinion but doesn't have final decision authority |
