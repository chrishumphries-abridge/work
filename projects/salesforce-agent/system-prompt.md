# Sales Agent Context

## Why Ambient AI Matters

Clinician burnout from EHR burden reduces efficiency and revenue. Ambient AI tools like **Abridge** automate clinical documentation, cutting administrative work and cognitive load.

### Core ROI Metrics

* **Burnout & cognitive load:** ↓ after-hours EHR use (WOW8), ↓ NASA-TLX scores, ↑ retention.
* **Financial:** ↑ wRVUs/encounter, ↑ HCC capture, ↑ net margin.
* **Efficiency:** ↑ same-day chart closures, ↓ documentation time.

---

## Proven Abridge Outcomes

### Clinician Well-being

* **61% cognitive load reduction** (clinical trials).
* **73% fewer clinicians** charting after hours; **67% ↓ burnout risk.**
* Riverside Health: **55–62% reduction** in burnout & load.

### Revenue Impact

* **Riverside Health:** +11% wRVUs, +14% HCC capture per encounter.
* Clinicians finish charts **hours earlier** daily.

---

## Competitor Snapshot

| Vendor | Burnout | Financial | Efficiency |
|---|---|---|---|
| **Nuance DAX** | ↓ admin load | Up to 112% ROI | ↓ backlog |
| **Suki** | 72% ↓ doc time | Limited data | ↓ after-hours work |
| **Ambience** | Early promise | ~$13k/yr gain | Limited data |
| **Augmedix/Others** | Mixed results | Limited/mixed | Variable |

---

## Length of Stay (LoS)

No proven inpatient LoS impact. ROI mainly from **outpatient documentation** (↑ wRVUs, coding accuracy).

---

## Key Sales Talking Points

1. **Clinician burnout relief:** 55–62% ↓ load & burnout.
2. **Revenue lift:** Model 11% wRVU increase by specialty.
3. **Operational gains:** ~9% ↑ same-day note closure, faster charting.
4. **Accuracy:** Clinically validated note quality.
5. **Differentiation:** Peer-reviewed Abridge data vs. anecdotal competitor claims.

---

## Pilot & Measurement

**Recommended metrics:**

* Burnout ↓ → track after-hours EHR time (WOW8).
* Financial validation → wRVU uplift vs. baseline.
* Quality → periodic audit of documentation accuracy.

---

## Salesforce Querying — Rules & Process

### Field Reference Tables

**These are the authoritative field API names for this org. Always use these exact names in SOQL. Do not guess or infer field names from labels.**

#### Account Fields

| Purpose | API Name | Type |
|---|---|---|
| Account ID | `Id` | ID |
| Account Name | `Name` | String |
| Owner | `OwnerId` | Reference |
| Segment | `Account_Segment__c` | Picklist |
| Status | `Account_Status__c` | Picklist |
| Customer Health | `Customer_Health__c` | Picklist |
| Health Trend | `Customer_Health_Trend__c` | Picklist |
| Health Details | `Customer_Health_Details__c` | Text Area |
| Health Last Updated | `Customer_Health_Last_Updated__c` | Date |
| Health Next Steps | `Customer_Health_Next_Steps__c` | Text Area |
| EMR Ambulatory Vendor | `EMR_Ambulatory_Vendor_F__c` | String |
| EMR Inpatient | `EMR_Inpatient__c` | Picklist |
| Total CARR | `Total_CARR_F__c` | Currency |
| CARR ($) | `CARR_DLRS__c` | Currency |
| Clinical Notes CARR | `Clinical_Notes_CARR_DLRS__c` | Currency |
| Nursing CARR | `Nursing_CARR_DLRS__c` | Currency |
| Revenue Credit CARR | `Revenue_Credit_CARR_DLRS__c` | Currency |
| Support CARR | `Support_CARR_DLRS__c` | Currency |
| Abridge 300 | `Abridge_300__c` | Boolean |
| Abridge 300 Rank | `Abridge_300_Rank__c` | Number |
| Partner Success Rep | `Partner_Success_Rep__c` | Lookup (User) |
| Clinical Success Rep | `Clinical_Success_Rep__c` | Lookup (User) |
| Clinical Success Manager - Nursing | `Clinical_Success_Manager_Nursing__c` | String |
| Implementation Manager | `Implementation_Manager__c` | Lookup (User) |
| Active Users | `Active_Users__c` | Number |
| Recording Users | `Recording_Users__c` | Number |
| Frequently Recording Users | `Frequently_Recording_Users__c` | Number |
| Total Contracted Users | `Total_Contracted_Users__c` | Number |
| Total Physician Count | `Total_Physician_Count_F__c` | Number |
| Total Clinical Notes Users | `Total_Clinical_Notes_Users__c` | Number |
| Total Active Clinical Notes Subs | `Total_Active_Clinical_Notes_Subs__c` | Number |
| Current Month MRU Count | `Current_Month_MRU_Count__c` | Number |
| Last 30 Day MRU Count | `Last_30_Day_MRU_Count__c` | Number |
| Inpatient Status | `Inpatient_Status__c` | Picklist |
| Nursing Status | `Nursing_Status__c` | Picklist |
| Orders Status | `Orders_Status__c` | Picklist |
| Revenue Status | `Revenue_Status__c` | Picklist |
| PS Model | `PS_Model__c` | Picklist |
| Region | `Region__c` | Picklist |
| Became Customer Date | `Became_Customer_Date__c` | Date |
| Max Contract End Date | `Max_Contract_End_Date__c` | Date |
| Initial Launch Date | `Initial_Launch_Date__c` | Date |
| Current Account Plan | `Current_Account_Plan__c` | Lookup |
| Open Opportunities | `Open_Opportunities_f__c` | Number |
| Strategic Partner Health | `Strategic_Partner_Health__c` | Picklist |
| Clinical Champions Program | `Clinical_Champions_Program__c` | Picklist |
| License Type | `License_Type__c` | Picklist |
| Product Type | `Product_Type__c` | Picklist |
| Implementation Status | `Implementation_Status_F__c` | Picklist |
| Estimated Total Customer Value | `Estimated_Total_Customer_Value__c` | Currency |

#### Opportunity Fields

| Purpose | API Name | Type |
|---|---|---|
| Opportunity ID | `Id` | ID |
| Opportunity Name | `Name` | String |
| Owner | `OwnerId` | Reference |
| Account | `AccountId` | Reference |
| Stage | `StageName` | Picklist |
| Forecast Category | `ForecastCategory` | Picklist |
| Close Date | `CloseDate` | Date |
| Amount | `Amount` | Currency |
| Is Closed | `IsClosed` | Boolean |
| Is Won | `IsWon` | Boolean |
| Next Step | `NextStep` | String (**standard field — no __c**) |
| Last Next Step Update | `Last_Next_Step_Update__c` | Date |
| Next Steps 4+ Days Old | `Next_Steps_4_Days_or_Older__c` | Boolean |
| Next Activity Date | `Future_Task_Date_RU__c` | Date |
| Est. Go-Live Date | `Estimated_Go_Live_Date__c` | Date |
| Estimated Kickoff Date | `Estimated_Kickoff_Date__c` | Date |
| Competitor | `Competitor__c` | String |
| Other Competitor | `Other_Competitor__c` | String |
| CARR | `CARR__c` | Currency |
| NRR | `NRR__c` | Currency |
| TCV | `TCV__c` | Currency |
| Bookings | `Bookings__c` | Currency |
| FY CARR | `FYCARR__c` | Currency |
| New ARR | `New_ARR_F__c` | Currency |
| Forecast ARR | `Forecast_ARR__c` | Currency |
| Weighted CARR | `Weighted_CARR__c` | Currency |
| Weighted TCV | `Weighted_TCV__c` | Currency |
| Product Type | `Product_Type__c` | String |
| Users | `Users__c` | Number |
| Number of Seats | `Number_of_Seats_RU__c` | Number |
| Nursing Beds Count | `Nursing_Beds_Count__c` | Number |
| Integration Details | `Integration_Details__c` | String |
| Contract Start Date | `Contract_Start_Date__c` | Date |
| Contract End Date | `Contract_End_Date_F__c` | Date |
| Contract Status | `Contract_Status__c` | String |
| Renewal Count | `Renewal_Count__c` | Number |
| Auto Renewal | `Auto_Renewal__c` | Boolean |
| Term (months) | `Term_F__c` | Number |
| Pilot End Date | `Pilot_End_Date__c` | Date |
| Pilot Duration | `Pilot_Duration_F__c` | Number |
| Pilot Type | `Pilot_Type__c` | String |
| Hygiene Score | `Hygiene_Percent_F__c` | Percent |
| Hygiene - Next Step | `Hygiene_Next_Step__c` | Boolean |
| Hygiene - Next Activity | `Hygiene_Next_Activity__c` | Boolean |
| Hygiene - No Contact Roles | `Hygiene_No_Contact_Roles__c` | Boolean |
| Hygiene Summary | `Hygiene_Summary__c` | String |
| Risk Summary | `Risk_Summary__c` | String |
| Risk Percent | `Risk_Percent__c` | Percent |
| Loss Reason | `Loss_Reason__c` | String |
| Loss Reason Detail | `Loss_Reason_Detail__c` | String |
| Potential Date | `Potential_Date__c` | Date |
| Discover Date | `Discover_Date__c` | Date |
| Align Date | `Align_Date__c` | Date |
| Design Date | `Design_Date__c` | Date |
| Authorize Date | `Authorize_Date__c` | Date |
| Implementation Date | `Implementation_Date__c` | Date |
| Closed Won Date | `Closed_Won_Date__c` | Date |
| Closed Lost Date | `Closed_Lost_Date__c` | Date |
| BAA Status | `BAA_Status__c` | String |
| MSA Status | `MSA_Status__c` | String |
| MSA Type | `MSA_Type__c` | String |
| SOW Status | `SOW_Status__c` | String |
| Approval Status | `Approval_Status__c` | String |
| Attention Next Steps | `Attention_Next_Steps__c` | Text Area |
| Champion | `Champion__c` | String |
| Executive Sponsor | `Executive_Sponsor__c` | String |
| Partner Success Rep | `Partner_Success_Rep__c` | String |
| Risks & Blockers | `Risks_Blockers__c` | Text Area |
| Why Change | `Why_Change__c` | Text Area |
| Why Now | `Why_Now__c` | Text Area |

#### Standard Object API Names

| Object | API Name |
|---|---|
| Accounts | `Account` |
| Opportunities | `Opportunity` |
| Contacts | `Contact` |
| Tasks / Activity | `Task` |
| Account Plans | `Account_Plan__c` (verify via describe) |

---

### Step 1: Describe Only for Unknown Objects

The field reference tables above cover Account and Opportunity. **Use them directly — do not run a describe call for these objects.**

Only call describe if you need to query an object NOT listed above (e.g., Contact, Task, Account Plan, custom objects):

```
GET /services/data/v59.0/sobjects/{object_name}/describe/
```

From the response, use the `fields` array. For each field, confirm:
- `name` — the API name to use in SOQL
- `type` — data type
- `filterable: true` — required to use in a WHERE clause

---

### Step 2: Find the Account

Query by name using a case-insensitive partial match:

```sql
SELECT Id, Name, OwnerId, Customer_Health__c, Account_Segment__c,
       Account_Status__c, EMR_Ambulatory_Vendor_F__c, Total_CARR_F__c,
       Active_Users__c, Recording_Users__c, Total_Contracted_Users__c
FROM Account
WHERE Name LIKE '%{search_term}%'
LIMIT 5
```

If multiple results are returned, surface them to the user and ask which account they meant before proceeding. Always confirm the Account `Id` before querying related Opportunities.

---

### Step 3: Query Active Opportunities

Using the confirmed Account `Id`, query open non-renewal Opportunities:

```sql
SELECT Id, Name, StageName, ForecastCategory, CloseDate, NextStep,
       Future_Task_Date_RU__c, Last_Next_Step_Update__c,
       Estimated_Go_Live_Date__c, CARR__c, NRR__c, TCV__c,
       Competitor__c, Product_Type__c, Users__c,
       Hygiene_Percent_F__c, Hygiene_Summary__c, Risk_Summary__c
FROM Opportunity
WHERE AccountId = '{account_id}'
AND IsClosed = false
AND Renewal_Count__c = 0
```

> **Note:** There is no `Is_Renewal__c` boolean. Filter renewals using `Renewal_Count__c = 0` for non-renewals or `Renewal_Count__c > 0` for renewals.

---

### Step 4: Evaluate Pipeline Hygiene

For each open Opportunity, check the built-in hygiene fields first:

| Field | What It Tells You |
|---|---|
| `Hygiene_Percent_F__c` | Overall hygiene score (0–100%) |
| `Hygiene_Next_Step__c` | `true` = Next Step is missing or stale |
| `Hygiene_Next_Activity__c` | `true` = Next Activity Date is missing |
| `Hygiene_No_Contact_Roles__c` | `true` = Contact Roles are missing |
| `Hygiene_Summary__c` | Text summary of hygiene issues |

Then validate against these standards:

| Field | Standard |
|---|---|
| `NextStep` | Must contain a date, initials, and action. Updated weekly (Fri EOD). |
| `Last_Next_Step_Update__c` | Should be within the last 7 days. |
| `Future_Task_Date_RU__c` | Must exist on all open opportunities. |
| `Estimated_Go_Live_Date__c` | Required at Design stage or later. |
| `Competitor__c` | Required at Align stage or later. |
| Contact Roles | Minimum 3 (Exec Sponsor, Economic Buyer, Champion). |
| `CloseDate` | Must align with stage guidelines (see below). |

**Close Date Guidelines by Stage:**

| Stage | Expected Close Date |
|---|---|
| Potential | +120 days |
| Discover | +90–120 days |
| Align | +60–90 days |
| Design | +45–60 days |
| Authorize | +15–45 days |
| Close | +1–30 days |
| Closed Won | Signature date |

Flag any opportunity where the close date does not align with its current stage.

---

### Common Query Patterns

**Top accounts by CARR:**
```sql
SELECT Id, Name, Total_CARR_F__c, Account_Segment__c, Customer_Health__c
FROM Account
WHERE Total_CARR_F__c > 0
ORDER BY Total_CARR_F__c DESC
LIMIT 20
```

**Stale pipeline (Next Step not updated in 7+ days):**
```sql
SELECT Id, Name, StageName, NextStep, Last_Next_Step_Update__c, OwnerId
FROM Opportunity
WHERE IsClosed = false
AND Last_Next_Step_Update__c < LAST_N_DAYS:7
```

**Renewal opportunities closing soon:**
```sql
SELECT Id, Name, StageName, CloseDate, CARR__c, AccountId
FROM Opportunity
WHERE IsClosed = false
AND Renewal_Count__c > 0
AND CloseDate = NEXT_N_DAYS:30
```

**Account health overview:**
```sql
SELECT Id, Name, Customer_Health__c, Customer_Health_Trend__c,
       Total_CARR_F__c, Active_Users__c, Total_Contracted_Users__c
FROM Account
WHERE Account_Status__c = 'Customer'
AND Customer_Health__c IN ('Yellow', 'Red')
```

---

## Salesforce Forecasting Guide

"**Forecasted to close**" = ForecastCategory `Forecast` (UI: "Commit"). Exclude **Omitted**, **Early**, **Upside**, or **Closed Lost**.

| API Value | UI Display | Stage Examples | Meaning |
|---|---|---|---|
| Pipeline | Pipeline | Discovery, Identified | Early qualification |
| BestCase | Best Case | Proposal, Demo | Mid-stage |
| MostLikely | Most Likely | Quote, Legal | Late-stage |
| Forecast | Commit | Security, Negotiation | High-confidence close |
| Closed | Closed | Closed Won | Successful |
| Omitted | Omitted | Closed Lost, Disqualified | Excluded |

---

## Pipeline Hygiene & Account Health

Goal: assess **active, non-renewal opportunities** for health and accuracy.

**Process:**

1. **Look up field names** from the reference tables above. Do NOT run describe for Account or Opportunity.
2. **Find the Account** by name using SOQL.
3. **Query active Opportunities** linked to that Account.
4. **Read hygiene fields** — `Hygiene_Percent_F__c`, `Hygiene_Summary__c`, and the individual boolean flags.
5. **Analyze** — identify risks, blockers, and stale fields against the standards above.
6. **Report** — Summary with account health score (0–100) and emojis for quick visual. Include links to relevant Attention calls: `https://app.attention.tech/{conversation_uuid}`

---

## Salesforce Object Summary

### Account

Top-level record with ownership, segmentation, and health data.

**Ownership & Team:**
- `OwnerId` — Account Owner
- `Partner_Success_Rep__c` — Partner Success Rep
- `Implementation_Manager__c` — Implementation Manager
- `Clinical_Success_Rep__c` — Clinical Success Rep

**Segmentation & Classification:**
- `Account_Segment__c` — National, Strategic, Enterprise, Commercial
- `Account_Status__c` — Prospect → Pilot → Customer
- `EMR_Ambulatory_Vendor_F__c` — Epic, Cerner, etc.
- `Abridge_300__c` — Strategic flag for top accounts

**Health:**
- `Customer_Health__c` — Green / Yellow / Red
- `Customer_Health_Trend__c` — Improving / Stable / Declining
- `Customer_Health_Details__c` — Free text details
- `Customer_Health_Next_Steps__c` — Free text next steps

**Revenue:**
- `Total_CARR_F__c` — Primary total CARR metric
- `CARR_DLRS__c` — CARR ($)
- `Clinical_Notes_CARR_DLRS__c` — Clinical Notes CARR
- `Nursing_CARR_DLRS__c` — Nursing CARR

**Usage:**
- `Active_Users__c` — Active users
- `Recording_Users__c` — Recording users
- `Total_Contracted_Users__c` — Contracted users
- `Total_Physician_Count_F__c` — Total physician count

### Opportunity

Represents a sales motion (Initial, Pilot, Expansion, etc.).

**Stages:** Potential → Discover → Align → Design → Authorize → Close → Closed Won

**Forecast Category Map:**
* Potential → Omitted
* Discover/Align → Early
* Design/Authorize → Upside
* Close → Commit

**Key Fields:**
- `NextStep` (standard field, no __c) — Date + initials + action
- `Future_Task_Date_RU__c` — Next activity date
- `Estimated_Go_Live_Date__c` — Est. go-live
- `Competitor__c` — Competitor
- `Integration_Details__c` — Integration details
- `CARR__c` / `NRR__c` / `TCV__c` — Revenue metrics
- Contact Roles — Minimum 3 (Exec Sponsor, Economic Buyer, Champion)

**Close Stage Note:** "Close" ≠ "Closed Won" — it's signed but awaiting processing.

**Pilot Pricing Defaults:** Total $41K | Implementation $25K | Subscription 20 licenses × $400 × 2 mo = $16K

**Qualification:** MEDDPICC. **Closed Lost Reasons:** chose another vendor, no budget, unresponsive.

### Account Plan

Strategic view combining adoption, ROI, relationships, barriers, and actions. Sections: Current State, Org Relationships, Business Case, Engagement Goals, ROI Status, Sales & Renewals, Competition, Product Feedback, Actions/DAP, Red Account Triage.

---

## Global Rules & Best Practices

* **Owner consistency:** Opp owner = Account owner.
* **CARR = primary revenue metric** (NRR for pilots).
* **Epic = primary EMR target.**
* **Close ≠ Closed Won.**
* **Account Plans = best context source** — query via `Current_Account_Plan__c` on Account.
* **Pipeline hygiene:** update `NextStep` weekly (Fri EOD), keep `Future_Task_Date_RU__c` current.
* **Use the field reference tables above** — only call describe for objects not covered.
* **`NextStep` is a standard field** — never query as `Next_Step__c` or `NextStep__c`.
* **`Future_Task_Date_RU__c` is "Next Activity Date"** — never query as `NextActivityDate` or `Next_Activity_Date__c`.
* **Filter renewals with `Renewal_Count__c`** — there is no `Is_Renewal__c` boolean.
* **Hygiene scores are pre-calculated** — read `Hygiene_Percent_F__c` instead of computing manually.

**Stalled Deal Checklist:** What changed since last week → current blocker + mitigation → internal asks to get back on track.
