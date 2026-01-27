# Buying Group AI Scoring - Implementation Spec

## Overview

AI-powered scoring for buying groups across three dimensions, with Tray.io as the orchestration layer.

| Dimension | Question | Thresholds |
|-----------|----------|------------|
| **Breadth** | Does the buying group have all the right people? | Green: all key personas / Yellow: minor gaps / Red: critical gaps |
| **Frequency** | Are we talking to them consistently? | Green: 30 days / Yellow: 60 days / Red: 90+ days |
| **Depth** | Is engagement multi-channel or one-dimensional? | Green: 3+ channels / Yellow: 2 channels / Red: 1 channel |
| **Master** | Holistic buying group health | Synthesized from above |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Tray.io (Nightly)                       │
│                                                             │
│  1. Query Salesforce for buying groups + engagement data    │
│  2. Build prompts for each dimension                        │
│  3. Call Claude API                                         │
│  4. Parse scores + explanations                             │
│  5. Write scores back to Salesforce                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Salesforce                            │
│                                                             │
│  • Fields on Buying_Group__c (reportable)                   │
│  • buyingGroupMembers LWC (display with color + hover)      │
└─────────────────────────────────────────────────────────────┘
```

---

## Salesforce Fields

### New Fields on `Buying_Group__c`

#### Breadth Dimension
| Field Label | API Name | Type | Length/Values | Description |
|-------------|----------|------|---------------|-------------|
| Breadth AI Score | `Breadth_AI_Score__c` | Number | (3, 0) | 0-100 score |
| Breadth AI Color | `Breadth_AI_Color__c` | Picklist | Red, Yellow, Green | Color coding |
| Breadth AI Explanation | `Breadth_AI_Explanation__c` | Long Text Area | 5000 | LLM-generated explanation |

#### Frequency Dimension
| Field Label | API Name | Type | Length/Values | Description |
|-------------|----------|------|---------------|-------------|
| Frequency AI Score | `Frequency_AI_Score__c` | Number | (3, 0) | 0-100 score |
| Frequency AI Color | `Frequency_AI_Color__c` | Picklist | Red, Yellow, Green | Color coding |
| Frequency AI Explanation | `Frequency_AI_Explanation__c` | Long Text Area | 5000 | LLM-generated explanation |

#### Depth Dimension
| Field Label | API Name | Type | Length/Values | Description |
|-------------|----------|------|---------------|-------------|
| Depth AI Score | `Depth_AI_Score__c` | Number | (3, 0) | 0-100 score |
| Depth AI Color | `Depth_AI_Color__c` | Picklist | Red, Yellow, Green | Color coding |
| Depth AI Explanation | `Depth_AI_Explanation__c` | Long Text Area | 5000 | LLM-generated explanation |

#### Master Score
| Field Label | API Name | Type | Length/Values | Description |
|-------------|----------|------|---------------|-------------|
| Master AI Score | `Master_AI_Score__c` | Number | (3, 0) | 0-100 overall score |
| Master AI Color | `Master_AI_Color__c` | Picklist | Red, Yellow, Green | Overall color coding |
| Master AI Explanation | `Master_AI_Explanation__c` | Long Text Area | 5000 | LLM-generated explanation |

#### Metadata
| Field Label | API Name | Type | Description |
|-------------|----------|------|-------------|
| Last AI Scored Date | `Last_AI_Scored_Date__c` | DateTime | When scoring last ran |

**Total: 13 new fields**

---

## Data Sources for Scoring

### Breadth - "Right people in the buying group?"

| Data Point | Object | Field(s) | Notes |
|------------|--------|----------|-------|
| Expected personas by type | `Buying_Group_Configuration__mdt` | `Buying_Group_Type__c`, `Buying_Group_Persona__c`, `Is_Key_Persona__c` | Defines what personas should be present per buying group type |
| Actual personas present | `Buying_Group_Member__c` | `Persona__c` | What's actually in the buying group |
| Coverage percentage | `Buying_Group__c` | `Coverage_Percent__c` | Already calculated by existing triggers |
| Key persona coverage | `Buying_Group__c` | `Key_Coverage_Percent__c` | Coverage of critical personas only |
| Unique persona count | `Buying_Group__c` | `Unique_Persona_Count__c` | Distinct personas in the group |
| Present personas list | `Buying_Group__c` | `Present_Personas__c` | Multi-select of which personas exist |

**Tray Query for Breadth:**
```sql
-- Buying groups with members
SELECT Id, Name, Account__c, Account__r.Name,
       Buying_Group_Type__c, Coverage_Percent__c, Key_Coverage_Percent__c,
       Unique_Persona_Count__c, Present_Personas__c,
       (SELECT Id, Contact__r.Name, Persona__c
        FROM Buying_Group_Members__r)
FROM Buying_Group__c
WHERE Account__r.Type = 'Customer'

-- Expected personas (query once, cache)
SELECT Buying_Group_Type__c, Buying_Group_Persona__c, Is_Key_Persona__c
FROM Buying_Group_Configuration__mdt
WHERE Scoring_Include__c = true
```

---

### Frequency - "Talking to them consistently?"

| Data Point | Object | Field(s) | Notes |
|------------|--------|----------|-------|
| Last contact date per member | `Buying_Group_Member__c` | `Last_Connected_Date_F__c` | Formula field from Contact |
| Last email response | `Buying_Group_Member__c` | `Last_Email_Response_F__c` | Formula field from Contact |
| Last email response (Contact) | `Contact` | `Last_Email_Response_Date__c` | Direct field |
| Last marketing engagement | `Contact` | `Last_Marketing_Engagement_Date__c` | |
| Last event attended | `Contact` | `Last_Event_Attended_Date__c` | |
| Recent activities | `Task` | `ActivityDate` where `WhoId` = Contact | Emails, calls, tasks |

**Tray Query for Frequency:**
```sql
SELECT Id, Name,
       (SELECT Id, Contact__c, Contact__r.Name, Persona__c,
               Last_Connected_Date_F__c, Last_Email_Response_F__c,
               Contact__r.Last_Email_Response_Date__c,
               Contact__r.Last_Marketing_Engagement_Date__c,
               Contact__r.Last_Event_Attended_Date__c
        FROM Buying_Group_Members__r)
FROM Buying_Group__c
WHERE Account__r.Type = 'Customer'
```

**Scoring Logic:**
- For each member, calculate days since last meaningful contact
- Average across all members, weight by persona importance
- Thresholds: ≤30 days = Green, 31-60 = Yellow, 61+ = Red

---

### Depth - "Multi-channel or one-dimensional engagement?"

| Data Point | Object | Field(s) | Notes |
|------------|--------|----------|-------|
| Email activity | `Task` | Where `TaskSubtype = 'Email'` and `WhoId` = Contact | Count of email interactions |
| Call activity | `Conversation_Participant__c` | Where `Contact__c` = member's contact | Calls/meetings recorded |
| Marketing engagement | `CampaignMember` | Where `ContactId` = member's contact | Campaign responses |
| Engagement score | `Buying_Group_Member__c` | `Engagement_Score__c` | Existing calculated field |

**Tray Queries for Depth:**
```sql
-- Get contact IDs from buying group members first, then:

-- Emails (last 90 days)
SELECT WhoId, COUNT(Id) emailCount
FROM Task
WHERE WhoId IN :contactIds
AND TaskSubtype = 'Email'
AND ActivityDate >= LAST_N_DAYS:90
GROUP BY WhoId

-- Calls (last 90 days)
SELECT Contact__c, COUNT(Id) callCount
FROM Conversation_Participant__c
WHERE Contact__c IN :contactIds
AND Conversation__r.CreatedDate >= LAST_N_DAYS:90
GROUP BY Contact__c

-- Marketing (last 90 days)
SELECT ContactId, COUNT(Id) marketingCount
FROM CampaignMember
WHERE ContactId IN :contactIds
AND algnatt__Engagement_Date__c >= LAST_N_DAYS:90
GROUP BY ContactId
```

**Scoring Logic:**
- Count distinct channels with activity per member (Email, Call, Marketing)
- 3 channels = Green, 2 = Yellow, 1 or 0 = Red
- Consider volume within channels as secondary factor

---

## LWC Changes

### File: `buyingGroupMembers.js`

**Current state:** Component loads buying groups via `getBuyingGroupsForAccount` and displays members in tabs.

**Changes needed:**

1. The Apex method already queries `Buying_Group__c` - just need to add new fields to the SOQL
2. Add score data to the transformed buying group objects
3. Display scores in the template

**Data transformation addition:**
```javascript
// In transformDataWithBuyingGroups(), add to the group object:
{
  // ... existing fields ...
  breadthScore: bg.Breadth_AI_Score__c,
  breadthColor: bg.Breadth_AI_Color__c,
  breadthExplanation: bg.Breadth_AI_Explanation__c,
  frequencyScore: bg.Frequency_AI_Score__c,
  frequencyColor: bg.Frequency_AI_Color__c,
  frequencyExplanation: bg.Frequency_AI_Explanation__c,
  depthScore: bg.Depth_AI_Score__c,
  depthColor: bg.Depth_AI_Color__c,
  depthExplanation: bg.Depth_AI_Explanation__c,
  masterScore: bg.Master_AI_Score__c,
  masterColor: bg.Master_AI_Color__c,
  masterExplanation: bg.Master_AI_Explanation__c,
  lastScoredDate: bg.Last_AI_Scored_Date__c,
  hasAIScores: bg.Master_AI_Score__c != null
}
```

### File: `buyingGroupMembers.html`

**Add score display in tab header or card:**

```html
<!-- Score badges (inside each tab or card header) -->
<template if:true={group.hasAIScores}>
  <div class="slds-grid slds-grid_vertical-align-center slds-m-left_small">
    <!-- Master score badge -->
    <span class={masterBadgeClass} title={group.masterExplanation}>
      {group.masterScore}
    </span>

    <!-- Dimension breakdown on hover/click -->
    <lightning-button-icon
      icon-name="utility:info"
      variant="bare"
      size="small"
      onclick={handleScoreInfoClick}
      data-group-id={group.id}>
    </lightning-button-icon>
  </div>
</template>

<!-- Score detail popover (shown on click) -->
<template if:true={showScorePopover}>
  <section class="slds-popover slds-popover_medium">
    <div class="slds-popover__body">
      <dl class="slds-list_horizontal slds-wrap">
        <dt class="slds-item_label">Breadth:</dt>
        <dd class="slds-item_detail">
          <span class={breadthBadgeClass}>{selectedGroup.breadthScore}</span>
          <p class="slds-text-body_small">{selectedGroup.breadthExplanation}</p>
        </dd>
        <!-- Repeat for Frequency, Depth -->
      </dl>
    </div>
  </section>
</template>
```

### File: `buyingGroupMembers.css`

```css
/* Score badge colors */
.score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.75rem;
  padding: 0 0.5rem;
}

.score-green {
  background-color: #2e844a;
  color: white;
}

.score-yellow {
  background-color: #fe9339;
  color: white;
}

.score-red {
  background-color: #c23934;
  color: white;
}

/* Score popover */
.score-popover {
  min-width: 300px;
}

.score-explanation {
  color: #706e6b;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
}
```

---

## Apex Changes

### File: `BuyingGroupMemberController.cls`

**Method:** `getBuyingGroupsForAccount`

Add new fields to the SOQL query:

```apex
@AuraEnabled(cacheable=true)
public static List<Buying_Group__c> getBuyingGroupsForAccount(Id accountId, String type) {
    String query = 'SELECT Id, Name, Buying_Group_Type__c, Buying_Group_Health__c, ' +
                   'Completeness_Score__c, Engagement_Score__c, Coverage_Percent__c, ' +
                   // Add AI score fields
                   'Breadth_AI_Score__c, Breadth_AI_Color__c, Breadth_AI_Explanation__c, ' +
                   'Frequency_AI_Score__c, Frequency_AI_Color__c, Frequency_AI_Explanation__c, ' +
                   'Depth_AI_Score__c, Depth_AI_Color__c, Depth_AI_Explanation__c, ' +
                   'Master_AI_Score__c, Master_AI_Color__c, Master_AI_Explanation__c, ' +
                   'Last_AI_Scored_Date__c ' +
                   'FROM Buying_Group__c ' +
                   'WHERE Account__c = :accountId';

    if (String.isNotBlank(type)) {
        query += ' AND Buying_Group_Type__c = :type';
    }

    return Database.query(query);
}
```

---

## Tray.io Workflow Guidance

### Workflow Structure

```
[Scheduled Trigger: Daily 2am]
        │
        ▼
[Query Salesforce: Get Buying Groups]
        │
        ▼
[Loop: For each Buying Group]
        │
        ├──▶ [Query: Get member details + activity data]
        │
        ├──▶ [Build Breadth Prompt] ──▶ [Call Claude] ──▶ [Parse Response]
        │
        ├──▶ [Build Frequency Prompt] ──▶ [Call Claude] ──▶ [Parse Response]
        │
        ├──▶ [Build Depth Prompt] ──▶ [Call Claude] ──▶ [Parse Response]
        │
        ├──▶ [Build Master Prompt] ──▶ [Call Claude] ──▶ [Parse Response]
        │
        └──▶ [Update Salesforce: Write scores to Buying_Group__c]
        │
        ▼
[End Loop]
```

### Prompt Templates

#### Breadth Prompt
```
You are evaluating buying group composition. Score how well this buying group covers the required personas.

**Buying Group Type:** {{buying_group_type}}

**Expected Personas for this type:**
{{expected_personas_list}}

**Personas present in this buying group:**
{{present_personas_list}}

**Current coverage:** {{coverage_percent}}%
**Key persona coverage:** {{key_coverage_percent}}%

**Members:**
{{#each members}}
- {{name}} ({{persona}})
{{/each}}

**Scoring criteria:**
- 90-100 (Green): All key personas present, strong overall coverage
- 60-89 (Yellow): Most key personas present, some gaps
- 0-59 (Red): Critical personas missing

Respond with JSON only:
{"score": <0-100>, "color": "<Green|Yellow|Red>", "explanation": "<2-3 sentences explaining the score>"}
```

#### Frequency Prompt
```
You are evaluating engagement recency for a buying group. Score how consistently the team is engaging with these contacts.

**Engagement thresholds:**
- Green: Contact within last 30 days
- Yellow: Contact within 31-60 days
- Red: No contact in 60+ days

**Members and their last engagement:**
{{#each members}}
- {{name}} ({{persona}}): Last contact {{days_since_contact}} days ago
  - Last email response: {{last_email_date}}
  - Last call: {{last_call_date}}
  - Last marketing engagement: {{last_marketing_date}}
{{/each}}

**Scoring criteria:**
- 90-100 (Green): All members contacted within 30 days
- 60-89 (Yellow): Most members contacted within 60 days
- 0-59 (Red): Multiple members with 60+ day gaps

Respond with JSON only:
{"score": <0-100>, "color": "<Green|Yellow|Red>", "explanation": "<2-3 sentences explaining the score>"}
```

#### Depth Prompt
```
You are evaluating engagement depth for a buying group. Score whether engagement is multi-channel or one-dimensional.

**Channels tracked:**
- Email (sales emails, responses)
- Calls (recorded conversations, meetings)
- Marketing (campaign responses, events, webinars)

**Members and their channel engagement (last 90 days):**
{{#each members}}
- {{name}} ({{persona}}):
  - Emails: {{email_count}}
  - Calls: {{call_count}}
  - Marketing: {{marketing_count}}
  - Channels active: {{channel_count}}/3
{{/each}}

**Scoring criteria:**
- 90-100 (Green): Most members engaged via 3 channels
- 60-89 (Yellow): Members engaged via 2 channels on average
- 0-59 (Red): Single-channel or minimal engagement

Respond with JSON only:
{"score": <0-100>, "color": "<Green|Yellow|Red>", "explanation": "<2-3 sentences explaining the score>"}
```

#### Master Prompt
```
You are providing an overall buying group health assessment based on three dimensions.

**Buying Group:** {{buying_group_name}}
**Account:** {{account_name}}

**Dimension Scores:**
- Breadth: {{breadth_score}} ({{breadth_color}}) - {{breadth_explanation}}
- Frequency: {{frequency_score}} ({{frequency_color}}) - {{frequency_explanation}}
- Depth: {{depth_score}} ({{depth_color}}) - {{depth_explanation}}

Synthesize these into an overall score. Consider:
- A Red in any dimension is concerning
- Breadth issues are harder to fix than Frequency/Depth
- Consistent Yellows across dimensions = Yellow overall

Respond with JSON only:
{"score": <0-100>, "color": "<Green|Yellow|Red>", "explanation": "<2-3 sentences with actionable insight>"}
```

### Salesforce Update Payload

```json
{
  "Breadth_AI_Score__c": 75,
  "Breadth_AI_Color__c": "Yellow",
  "Breadth_AI_Explanation__c": "Missing the CFO persona which is key for this buying group type. Clinical champion and IT lead are present.",
  "Frequency_AI_Score__c": 85,
  "Frequency_AI_Color__c": "Green",
  "Frequency_AI_Explanation__c": "All members contacted within the last 30 days. Strong recent engagement.",
  "Depth_AI_Score__c": 60,
  "Depth_AI_Color__c": "Yellow",
  "Depth_AI_Explanation__c": "Engagement is primarily via email. No recorded calls or marketing engagement in the last 90 days.",
  "Master_AI_Score__c": 70,
  "Master_AI_Color__c": "Yellow",
  "Master_AI_Explanation__c": "Good engagement frequency but missing key persona (CFO) and engagement is one-dimensional. Consider scheduling a call and adding CFO to the buying group.",
  "Last_AI_Scored_Date__c": "2026-01-28T02:00:00.000Z"
}
```

---

## Implementation Checklist

### Phase 1: Salesforce Fields
- [ ] Create `Breadth_AI_Score__c` field
- [ ] Create `Breadth_AI_Color__c` picklist (Red, Yellow, Green)
- [ ] Create `Breadth_AI_Explanation__c` long text area
- [ ] Create `Frequency_AI_Score__c` field
- [ ] Create `Frequency_AI_Color__c` picklist
- [ ] Create `Frequency_AI_Explanation__c` long text area
- [ ] Create `Depth_AI_Score__c` field
- [ ] Create `Depth_AI_Color__c` picklist
- [ ] Create `Depth_AI_Explanation__c` long text area
- [ ] Create `Master_AI_Score__c` field
- [ ] Create `Master_AI_Color__c` picklist
- [ ] Create `Master_AI_Explanation__c` long text area
- [ ] Create `Last_AI_Scored_Date__c` datetime field
- [ ] Deploy to sandbox
- [ ] Test field accessibility

### Phase 2: Tray.io Workflow
- [ ] Create workflow with scheduled trigger
- [ ] Add Salesforce connector for queries
- [ ] Build Breadth scoring step
- [ ] Build Frequency scoring step
- [ ] Build Depth scoring step
- [ ] Build Master scoring step
- [ ] Add Salesforce update step
- [ ] Test with single buying group
- [ ] Test with batch

### Phase 3: LWC Display
- [ ] Update `BuyingGroupMemberController.cls` SOQL
- [ ] Update `buyingGroupMembers.js` data transformation
- [ ] Add score badges to `buyingGroupMembers.html`
- [ ] Add score popover for explanations
- [ ] Add CSS for color coding
- [ ] Test in sandbox

---

## Questions to Resolve

1. **Color thresholds** - Are 60/90 the right breakpoints, or should these be configurable?
2. **Segment weighting** - Should customers vs prospects have different scoring baselines?
3. **Batch size** - Score all buying groups nightly, or chunk by account segment?
4. **Error handling** - What happens if Claude returns malformed JSON or times out?
