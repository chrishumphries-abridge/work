# Salesforce SOQL Reference

> **This is the authoritative reference for querying the Abridge Salesforce org via the `ct_salesforce_soql_query_896b9cdd` MCP tool.** Read this file before writing any SOQL query.
>
> **Error handling:** The SOQL tool returns Salesforce error messages directly (e.g., `No such column 'Foo__c'`). If a query fails, read the error message and self-correct — don't fall back to `FIELDS(ALL)` unless the error is ambiguous.

---

## Object API Name Reference

| Object | API Name |
|---|---|
| Accounts | `Account` |
| Opportunities | `Opportunity` |
| Contacts | `Contact` |
| Tasks / Activity | `Task` |
| Events | `Event` |
| Buying Groups | `Buying_Group__c` |
| Buying Group Members | `Buying_Group_Member__c` |
| Conversations (Attention) | `Conversation__c` |
| Account Plans (standard) | `AccountPlan` |
| Account Plans (custom/legacy) | `Account_Plan__c` |

---

## Common Gotchas

| Gotcha | Correct | Wrong |
|---|---|---|
| Next Step is a **standard field** | `NextStep` | `Next_Step__c`, `NextStep__c` |
| Next Activity Date | `Future_Task_Date_RU__c` | `NextActivityDate`, `Next_Activity_Date__c` |
| Filter renewals by count | `Renewal_Count__c = 0` | `Is_Renewal__c = false` (doesn't exist) |
| Hygiene scores are pre-calculated | `Hygiene_Percent_F__c` | Computing hygiene manually |
| Email activities on Task | `TaskSubtype = 'Email'` | Filtering by `Subject LIKE '%Email%'` |
| Account Plan (standard) | `AccountPlan` | `Account_Plan__c` (that's the legacy custom object) |
| Attention call links | `Attention_Link__c` on `Conversation__c` | Constructing URLs manually |
| Customer Health uses **emojis** | `Customer_Health__c IN ('🟡', '🔴')` | `Customer_Health__c IN ('Yellow', 'Red')` |
| Conversation date field | `Finished_At__c` | `Date__c` (doesn't exist) |
| Health trend values | `'Trending Up'`, `'No Change'`, `'Trending Down'` | `'Improving'`, `'Stable'`, `'Declining'` |

---

## Field Reference Tables

**Use these exact API names in SOQL. Do not guess or infer field names from labels.**

### Account Fields

| Purpose | API Name | Type |
|---|---|---|
| Account ID | `Id` | ID |
| Account Name | `Name` | String |
| Owner | `OwnerId` | Reference |
| Segment | `Account_Segment__c` | Picklist |
| Status | `Account_Status__c` | Picklist |
| Customer Health | `Customer_Health__c` | Picklist (`🟢`, `🟡`, `🔴` — emoji values) |
| Health Trend | `Customer_Health_Trend__c` | Picklist (`Trending Up`, `No Change`, `Trending Down`) |
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

### Opportunity Fields

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

### Buying Group Fields (`Buying_Group__c`)

Represents a buying group linked to an Account, Opportunity, and/or Account Plan.

| Purpose | API Name | Type |
|---|---|---|
| Record ID | `Id` | ID |
| Name | `Name` | String |
| Owner | `OwnerId` | Reference |
| Account | `Account__c` | Reference (Account) |
| Account Plan | `Account_Plan__c` | Reference (Account_Plan__c) |
| Opportunity | `Opportunity__c` | Reference (Opportunity) |
| Contact | `Contact__c` | Reference (Contact) |
| Buying Group Type | `Buying_Group_Type__c` | Picklist |
| Buying Group Summary | `Buying_Group_Summary__c` | Text Area |
| Buying Group Health | `Buying_Group_Health__c` | Picklist |
| Members Count | `Buying_Group_Members_Count__c` | Number |
| Member Research (JSON) | `Buying_Group_Member_Research__c` | Long Text Area |
| Engagement Score | `Engagement_Score__c` | Number |
| Completeness Score | `Completeness_Score__c` | Number |
| Coverage Percent | `Coverage_Percent__c` | Percent |
| Key Coverage Percent | `Key_Coverage_Percent__c` | Percent |
| Unique Persona Count | `Unique_Persona_Count__c` | Number |
| Present Personas | `Present_Personas__c` | Multi-Select Picklist |
| Prospecting Plan | `Prospecting_Plan__c` | Text Area |

### Buying Group Member Fields (`Buying_Group_Member__c`)

Represents an individual member within a Buying Group, linked to a Contact.

| Purpose | API Name | Type |
|---|---|---|
| Record ID | `Id` | ID |
| Name | `Name` | String |
| Buying Group | `Buying_Group__c` | Reference (Buying_Group__c) |
| Buying Group Type | `Buying_Group_Type__c` | String |
| Contact | `Contact__c` | Reference (Contact) |
| Contact ID (18) | `Contact_ID_18__c` | String |
| Contact Title | `Contact_Title__c` | String |
| Account | `Account__c` | Reference (Account) |
| Opportunity Buying Group | `Opportunity_Buying_Group__c` | Reference |
| Buying Role | `Buying_Role__c` | Picklist |
| Persona | `Persona__c` | Picklist |
| First Name | `First_Name__c` | String |
| Last Name | `Last_Name__c` | String |
| Email (Formula) | `Email_F__c` | String |
| Buying Group Member Email | `Buying_Group_Member_Email__c` | Email |
| Engagement Score | `Engagement_Score__c` | Number |
| Weighted Engagement Score | `Weighted_Engagement_Score__c` | Number |
| Completeness Score | `Completeness_Score__c` | Number |
| Hook | `Hook__c` | String |
| Quote | `Quote__c` | String |
| Type | `Type__c` | Picklist |
| Existing Contact | `Existing_Contact__c` | Boolean |
| New Contact | `New_Contact__c` | Boolean |
| Last Email Response | `Last_Email_Response_F__c` | Date (Formula) |
| Last Connected Date | `Last_Connected_Date_F__c` | Date (Formula) |

### Conversation Fields (`Conversation__c`)

Stores Attention.tech call recordings linked to Salesforce records. Use to find call history and engagement for an Account or Opportunity.

| Purpose | API Name | Type |
|---|---|---|
| Record ID | `Id` | ID |
| Name | `Name` | String |
| Account | `Account__c` | Reference (Account) |
| Opportunity | `Opportunity__c` | Reference (Opportunity) |
| Contact | `Contact__c` | Reference (Contact) |
| Title | `Title__c` | String |
| Attention Link | `Attention_Link__c` | URL |
| External Conversation ID | `External_Conversation_ID__c` | String |
| Call Type | `Call_Type__c` | Picklist |
| Organizer Email | `Organizer_Email__c` | String |
| Organizer Name | `Organizer_Name__c` | String |
| Finished At | `Finished_At__c` | DateTime |
| Created At | `Created_At__c` | DateTime |
| Transcript (call summary) | `Transcript__c` | Text Area |
| Transcript URL | `Transcript_URL__c` | URL |
| Media Duration | `Media_Duration__c` | Number |
| CRM Export Status | `CRM_Export_Status__c` | String |
| Labels JSON | `Labels_JSON__c` | String (JSON) |
| Linked CRM Records JSON | `Linked_CRM_Records_JSON__c` | String (JSON) |
| Referenceable | `Referenceable__c` | Boolean |

### Account Plan Fields

**Two Account Plan objects exist in this org:**
- **`AccountPlan`** — Standard Salesforce object (e.g., "Yakima Valley Farm Workers Clinic - 2026"). This is the primary account planning object.
- **`Account_Plan__c`** — Legacy custom object (e.g., "Account Plan - Abridge"). Referenced from Account via `Current_Account_Plan__c`.

**When querying account plans, use `AccountPlan` (standard object) unless specifically asked about the custom object.**

Fields below are from `Account_Plan__c` (which has richer strategic content). The standard `AccountPlan` object fields should be discovered via a FIELDS(ALL) query.

| Purpose | API Name | Type |
|---|---|---|
| Record ID | `Id` | ID |
| Name | `Name` | String |
| Account | `Account__c` | Reference (Account) |
| Account Plan Owner | `Account_Plan_Owner__c` | Reference |
| Status | `Status__c` | Picklist |
| Record Type | `RecordTypeId` | Reference |
| Customer Health | `Customer_Health__c` | Picklist |
| Client Satisfaction | `Client_Satisfaction__c` | Text Area |
| Client Highlights | `Client_Highlights__c` | Text Area |
| Wins / Successes | `Wins_Successes__c` | Text Area |
| Account Overview | `Account_Overview__c` | Text Area |
| Historical Context | `Historical_Context__c` | Text Area |
| History of Last 12–18 Months | `History_of_last_12_18_months__c` | Text Area |
| Recent History / Hooks | `Recent_History_Hooks__c` | Text Area |
| Account Prioritization | `Account_Prioritization__c` | Picklist |
| Why Change | `Why_Change__c` | Text Area |
| Why Now | `Why_Now__c` | Text Area |
| Why Buy / Why Change | `Why_Buy_Why_Change__c` | Text Area |
| Competitive AI Landscape | `Competitive_AI_Landscape__c` | Text Area |
| Current/Prior GenAI or Ambient Use | `Current_or_prior_use_of_GenAI_or_Ambient__c` | Text Area |
| One Sentence Positioning | `One_Sentence_Positioning__c` | Text Area |
| Abridge Point of View | `Abridge_Point_Of_View__c` | Text Area |
| Alignment to Major Initiatives | `Abridge_Alignment_to_major_initiatives__c` | Text Area |
| Opportunity for Impact | `Opportunity_for_Impact__c` | Text Area |
| Return on Investment | `Return_on_Investment__c` | Text Area |
| Revenue Impact Potential | `Revenue_Impact_Potential__c` | Picklist |
| Engagement / Growth | `Engagement_Growth__c` | Text Area |
| Retention / Growth Risks | `Retention_Growth_Risks__c` | Text Area |
| User Engagement Potential | `User_Engagement_Potential__c` | Picklist |
| Physician Demand | `Physician_demand__c` | Text Area |
| Executive Buying Group | `Executive_Buying_Group__c` | Text Area |
| Executive Brief | `Executive_Brief__c` | Text Area |
| Quarterly Goal 1 | `Quarterly_Goal_1__c` | Text Area |
| Quarterly Goal 1 Type | `Quarterly_Goal_1_Type__c` | Picklist |
| Quarterly Goal 1 Complete | `Quarterly_Goal_1_Complete__c` | Boolean |
| Quarterly Goal 2 | `Quarterly_Goal_2__c` | Text Area |
| Quarterly Goal 2 Type | `Quarterly_Goal_2_Type__c` | Picklist |
| Quarterly Goal 2 Complete | `Quarterly_Goal_2_Complete__c` | Boolean |
| Quarterly Goal 3 | `Quarterly_Goal_3__c` | Text Area |
| Quarterly Goal 3 Type | `Quarterly_Goal_3_Type__c` | Picklist |
| Quarterly Goal 3 Complete | `Quarterly_Goal_3_Completed__c` | Boolean |
| 3 Months Ahead | `X3_Months_Ahead__c` | Text Area |
| 6 Months Ahead | `X6_Months_Ahead__c` | Text Area |
| 1 Year Ahead | `X1_Year_Ahead__c` | Text Area |
| Open Questions | `Open_Questions__c` | Text Area |
| Last Generated At | `Last_Generated_At__c` | DateTime |

### Task Fields (Standard Object)

Tracks activities including emails, calls, and to-dos. Use `TaskSubtype` to filter by activity type.

| Purpose | API Name | Type |
|---|---|---|
| Activity ID | `Id` | ID |
| Subject | `Subject` | String |
| Who (Contact/Lead) | `WhoId` | Reference (polymorphic) |
| Related To (Account/Opp) | `WhatId` | Reference (polymorphic) |
| Account | `AccountId` | Reference (read-only) |
| Due Date | `ActivityDate` | Date |
| Status | `Status` | Picklist |
| Priority | `Priority` | Picklist |
| Assigned To | `OwnerId` | Reference |
| Description | `Description` | Text Area (**not filterable**) |
| Is Closed | `IsClosed` | Boolean |
| Task Subtype | `TaskSubtype` | Picklist |
| Completed Date/Time | `CompletedDateTime` | DateTime |
| Created Date | `CreatedDate` | DateTime |

**`TaskSubtype` values — use to filter activity type:**
- `'Task'` — Standard to-do
- `'Email'` — Email activity (sent/received)
- `'Call'` — Logged call
- `'ListEmail'` — Mass/list email

### Event Fields (Standard Object)

Tracks meetings and calendar events.

| Purpose | API Name | Type |
|---|---|---|
| Activity ID | `Id` | ID |
| Subject | `Subject` | Picklist |
| Who (Contact/Lead) | `WhoId` | Reference (polymorphic) |
| Related To (Account/Opp) | `WhatId` | Reference (polymorphic) |
| Account | `AccountId` | Reference |
| Start Date/Time | `StartDateTime` | DateTime |
| End Date/Time | `EndDateTime` | DateTime |
| Duration (minutes) | `DurationInMinutes` | Integer |
| Location | `Location` | String |
| Description | `Description` | Text Area (**not filterable**) |
| All-Day Event | `IsAllDayEvent` | Boolean |
| Assigned To | `OwnerId` | Reference |
| Type | `Type` | Picklist |
| Event Subtype | `EventSubtype` | Picklist |
| Created Date | `CreatedDate` | DateTime |

---

## Query Workflow

**Run Steps 1–5 in parallel where possible (all queries are independent once you have the Account Id). Then synthesize in Step 6.**

### Step 1: Find the Account

Query by name using a case-insensitive partial match:

```sql
SELECT Id, Name, OwnerId, Customer_Health__c, Account_Segment__c,
       Account_Status__c, EMR_Ambulatory_Vendor_F__c, Total_CARR_F__c,
       Active_Users__c, Recording_Users__c, Total_Contracted_Users__c
FROM Account
WHERE Name LIKE '%{search_term}%'
LIMIT 5
```

If multiple results are returned, surface them to the user and ask which account they meant. Always confirm the Account `Id` before querying related objects.

### Step 2: Query Active Opportunities

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

### Step 3: Evaluate Pipeline Hygiene

For each open Opportunity, check the built-in hygiene fields:

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

---

## Common Query Patterns

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

**Account health overview (at-risk accounts):**
```sql
SELECT Id, Name, Customer_Health__c, Customer_Health_Trend__c,
       Customer_Health_Details__c, Total_CARR_F__c,
       Active_Users__c, Total_Contracted_Users__c
FROM Account
WHERE Account_Status__c = 'Customer'
AND Customer_Health__c IN ('🟡', '🔴')
```

**Buying group coverage for an account (ALL buying groups):**
```sql
SELECT Id, Name, Buying_Group_Type__c, Coverage_Percent__c,
       Key_Coverage_Percent__c, Buying_Group_Members_Count__c,
       Engagement_Score__c, Buying_Group_Health__c
FROM Buying_Group__c
WHERE Account__c = '{account_id}'
```

> **IMPORTANT:** Accounts have multiple buying groups (e.g., Clinical Notes, Nursing, Revenue Cycle). When reporting buying group coverage for an account, **always query and present ALL buying groups**, not just one.

**Buying group members for a specific buying group:**
```sql
SELECT Id, Name__c, Buying_Role__c, Persona__c, Contact_Title__c,
       Email_F__c, Engagement_Score__c, Weighted_Engagement_Score__c,
       Completeness_Score__c, Last_Email_Response_F__c, Last_Connected_Date_F__c
FROM Buying_Group_Member__c
WHERE Buying_Group__c = '{buying_group_id}'
```

**Recent Attention conversations for an account:**
```sql
SELECT Id, Title__c, Attention_Link__c, Organizer_Name__c,
       Organizer_Email__c, Finished_At__c, Call_Type__c,
       Media_Duration__c, Labels_JSON__c, Transcript__c
FROM Conversation__c
WHERE Account__c = '{account_id}'
ORDER BY Finished_At__c DESC
LIMIT 10
```

> **Maximizing value from Conversation__c:**
> - **Always include `Transcript__c`** — contains a call summary. This is your richest intelligence source. Don't just summarize it — **mine it** for:
>   - **People & roles**: Extract every named person and their title/role. Map them to buying group personas even if no buying group exists in SFDC yet.
>   - **Competitors mentioned**: Any vendor names (DAX, Suki, DeepScribe, Freed, Heidi, Ambience, etc.) — note whether they're currently in use, being evaluated, or were tried and failed.
>   - **Current tech stack**: EHR vendor, other tools in use, planned migrations.
>   - **Pain points & quotes**: Specific problems stated by stakeholders. Pull direct quotes when they convey urgency or priorities (e.g., "80-90% reduction in charting burden").
>   - **Concerns & objections**: Template fit, integration requirements, timeline dependencies, budget constraints.
>   - **Decision process**: Who makes the final call? What's the evaluation process? What needs to happen before a decision?
>   - **Next steps from the call**: What was agreed to at the end? Compare this to the actual `NextStep` field — are they aligned?
> - **Always include `Labels_JSON__c`** — structured metadata (products discussed, call type, topics). Parse and surface relevant labels.
> - **Always include `Attention_Link__c`** — direct link to full transcript and recording.
> - **Flag engagement gaps.** If most recent conversation is >30 days old for an active customer, flag it. If there are no conversations for a prospect with an open opportunity, flag that too.

**Email activity for an account (last 30 days):**
```sql
SELECT Id, Subject, ActivityDate, Status, OwnerId, WhoId
FROM Task
WHERE AccountId = '{account_id}'
AND TaskSubtype = 'Email'
AND ActivityDate = LAST_N_DAYS:30
ORDER BY ActivityDate DESC
LIMIT 20
```

**Recent meetings/events for an account:**
```sql
SELECT Id, Subject, StartDateTime, EndDateTime, OwnerId, WhoId, Type
FROM Event
WHERE AccountId = '{account_id}'
AND StartDateTime = LAST_N_DAYS:30
ORDER BY StartDateTime DESC
LIMIT 20
```

---

## Forecasting Guide

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

## Opportunity Object Summary

**Stages:** Potential → Discover → Align → Design → Authorize → Close → Closed Won

**Forecast Category Map:**
* Potential → Omitted
* Discover/Align → Early
* Design/Authorize → Upside
* Close → Commit

**Key reminders:**
- `NextStep` (standard field, no __c) — Date + initials + action
- `Future_Task_Date_RU__c` — Next activity date
- "Close" ≠ "Closed Won" — Close means signed but awaiting processing
- **Pilot Pricing Defaults:** Total $41K | Implementation $25K | Subscription 20 licenses × $400 × 2 mo = $16K
- **Qualification:** MEDDPICC
- **Closed Lost Reasons:** chose another vendor, no budget, unresponsive

---

## Global Rules

* **CARR = primary revenue metric** (NRR for pilots).
* **Epic = primary EMR target.**
* **Account Plans = best context source** — query via `Current_Account_Plan__c` on Account.
* **Pipeline hygiene:** update `NextStep` weekly (Fri EOD), keep `Future_Task_Date_RU__c` current.
* **Use these field reference tables** — for unlisted objects, use `SELECT FIELDS(ALL) FROM {object} LIMIT 1`.
* **Stalled Deal Checklist:** What changed since last week → current blocker + mitigation → internal asks to get back on track.

---

## Account Summary Guidelines

When asked to summarize or assess an account, produce an **actionable brief**, not a data dump. Follow these principles:

### Think Like a Rep
- **Synthesize a health assessment** even when `Customer_Health__c` is blank. Use opportunity stage, engagement recency, transcript signals, and hygiene scores to make a judgment call (🟢/🟡/🔴 with a one-line rationale).
- **Infer buying groups from transcripts** when none exist in SFDC. Map people mentioned in calls to buying roles (Champion, Economic Buyer, Detractor, etc.) and flag who's missing (e.g., "CMO not yet engaged").
- **Track competitors from every source** — `Competitor__c` on the opp, but also names mentioned in call transcripts. Note whether competitors are currently in use, being evaluated, or were tried and failed.

### Extract, Don't Summarize
- Pull **specific names, titles, and roles** from `Transcript__c` — not just "stakeholders were engaged."
- Pull **direct quotes** that convey urgency, priorities, or concerns.
- Identify the **current tech stack** (EHR, other AI tools) and any planned migrations that gate the deal.
- Note **decision process and timeline** — who decides, what's the trigger, what are the dependencies.

### Surface What's Missing
- Compare call next steps to the `NextStep` field — are they aligned or has follow-through dropped?
- Flag **engagement gaps**: days since last email, days since last call, stale next activity dates.
- Flag **SFDC hygiene gaps**: missing competitors, empty buying groups, no contact roles — but frame them as action items, not just complaints.

### Output Format
Keep it scannable. Use this structure:

1. **Account Overview** — key facts table (owner, segment, CARR, health, EMR)
2. **Health Summary** — synthesized assessment with emoji + one-line rationale
3. **Buying Group Summary** — who's engaged (from SFDC + transcripts), who's missing, C-level status
4. **Active Opportunities** — stage, CARR, close date, next step, hygiene flags
5. **Recent Activity** — call intelligence (mined from transcripts), email cadence, upcoming events
6. **Assessment & Recommended Actions** — what's working, what's at risk, specific next moves
