---
asana: https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1211987690458447?focus=true
status: in-progress
last_updated: 2026-01-05
---

# Commercial Segment Approval Workflow Planning

## Business Context

**When:** Pre-opportunity close — approvals must happen before opp can close
**Why:** Gatekeeping decisions about deal structure

| Process | Business Question |
|---------|-------------------|
| Process 1 | "Are we going to do a small deal?" (<10 physicians) |
| Process 2 | "Can they move to commercial Partner Success?" (Standard PS Model) |

**Requirements:**
- Validation rules to prevent opp close without approval
- Way to request approval (user-initiated)
- Store approval decision in SFDC

---

## Architecture (Revised)

```
Dynamic Action Button (on Opportunity)
    │
    ├── Visibility Rules:
    │   - Physician Count < 10, OR
    │   - PS Model = "Standard" (on Account)
    │
    └── Action: Launch Screen Flow
            ↓
Screen Flow
    │
    ├── Process 2 only: Capture reason (H2H/Connection)
    └── Calls Tray.io webhook with Opportunity ID
            ↓
Tray.io
    │
    ├── Queries SFDC for Opp + Account details
    ├── Determines which process (based on criteria)
    └── Sends Slack message with context
            ↓
Slack (Approval Interface)
    │
    ├── Approver sees request details
    ├── Clicks Approve/Reject → Modal for notes
    └── Submits
            ↓
Tray.io (Interaction Handler)
    │
    ├── Receives: Opp ID, Approver, Notes
    └── Writes back to SFDC
            ↓
Opportunity updated → Validation rule passes → Can close
```

| Component | Role |
|-----------|------|
| Dynamic Action | Button visibility based on criteria |
| Screen Flow | Capture reason (P2 only), call webhook |
| Tray.io | Orchestration, SFDC lookup, Slack messaging, writeback |
| Slack | Approval interface with modal for notes |

---

## Approval Processes

### Process 1: <10 Physician Count Approval

| Attribute | Value |
|-----------|-------|
| Visibility Criteria | Total Physician Count < 10 |
| Approvers | JVH/Aamir AND Reba |
| Approval Logic | Both required |
| Slack Context | "< 10 physicians" |
| Input from Approver | Free text notes (Slack modal) |

### Process 2: Standard PS Model (Commercial)

| Attribute | Value |
|-----------|-------|
| Visibility Criteria | `PS Model` = "Standard" AND `Account Segment` = "Commercial" |
| Approvers | Meghan OR Madeleine |
| Approval Logic | Either can approve |
| Screen Flow Input | Reason for request: H2H or Connection |
| Slack Context | Reason for requesting Standard PS Model |
| Input from Approver | Free text notes (Slack modal) |

---

## Data Flow

### Salesforce → Tray (Minimal Payload)

```json
{
  "opportunity_id": "006XXXXXXXXXXXX",
  "reason": "H2H"  // Process 2 only, from Screen Flow — why they're requesting Standard PS Model
}
```

### Tray SFDC Lookup → Gets

| Field | Object | Purpose |
|-------|--------|---------|
| Account Name | Account | Display in Slack |
| Physician Count | Account | Determine Process 1 |
| PS Model | Account | Determine Process 2 |
| Account Segment | Account | Determine Process 2 |
| Opp Owner | Opportunity | "Requested by" |
| Opp Link | Opportunity | Salesforce URL |

### Tray Routing Logic

```
IF Physician Count < 10 → Process 1 path
ELSE IF PS Model = "Standard" AND Account Segment = "Commercial" → Process 2 path
```

### Slack → Tray (On Approval)

| Data | Source |
|------|--------|
| Opportunity ID | Button value |
| Approver | Slack user who clicked |
| Approval Status | Which button clicked |
| Approval Notes | Modal free text input |

### Tray → Salesforce (Writeback)

| Field | Value |
|-------|-------|
| Approval Status | Approved / Rejected |
| Approved By | Slack user name |
| Approval Notes | Free text from modal |
| Approval Date | Timestamp |

---

## Open Questions

- [ ] **Store reason?** — For Process 2, should the reason (H2H/Connection) be stored on Opportunity for audit/reporting, or just passed through to Slack?

- [ ] **Slack channel** — Which channel should approval requests go to? Same for both processes or different?

- [ ] **Field API names** — Need to confirm API names for:
  - Total Physician Count (Account)
  - PS Model (Account)
  - Account Segment (Account)

- [ ] **Approver routing** — How to route to correct approvers per process in Slack? @mention specific users, or post to different channels?

---

## New SFDC Fields Needed (Opportunity)

- [ ] Approval Status (Picklist: Pending/Approved/Rejected)
- [ ] Approved By (Text)
- [ ] Approval Notes (Long Text)
- [ ] Approval Date (DateTime)
- [ ] _(TBD)_ Request Reason (Picklist: H2H/Connection) — if storing for Process 2

---

## Validation Rules Needed (Opportunity)

- [ ] **Process 1**: Block close if Physician Count < 10 AND Approval Status != "Approved"
- [ ] **Process 2**: Block close if PS Model = "Standard" AND Account Segment = "Commercial" AND Approval Status != "Approved"

---

## Sequential Build Checklist

### 1. Salesforce Fields (on Opportunity)

| Field | Type | Values/Notes | Status |
|-------|------|--------------|--------|
| Approval Status | Picklist | Pending, Approved, Rejected | [ ] |
| Approved By | Text | Slack user name | [ ] |
| Approval Notes | Long Text Area | Free text from Slack modal | [ ] |
| Approval Date | DateTime | Timestamp of approval | [ ] |
| Request Reason | Picklist | H2H, Connection _(TBD if storing for P2)_ | [ ] |

---

### 2. Salesforce Dynamic Action Button

**Location:** Opportunity record page

**Visibility rules:**
- Show if: `Account.Physician_Count__c < 10`
- OR: `Account.PS_Model__c = "Standard" AND Account.Account_Segment__c = "Commercial"`

**Action:** Launch Screen Flow

| Item | Status |
|------|--------|
| Create Dynamic Action | [ ] |
| Configure visibility rules | [ ] |
| Add to Opportunity page layout | [ ] |

---

### 3. Salesforce Screen Flow

**Name:** Request Commercial Approval

**Input:** `recordId` (Opportunity ID)

| Step | Type | Details | Status |
|------|------|---------|--------|
| 1 | Decision | Check if P2 criteria met (needs reason input) | [ ] |
| 2 | Screen _(P2 only)_ | Picklist: "Why are you requesting Standard PS Model?" (H2H / Connection) | [ ] |
| 3 | Action | HTTP Callout to Tray webhook | [ ] |
| 4 | Screen | Confirmation: "Approval request submitted" | [ ] |

**HTTP Callout payload:**
```json
{
  "opportunity_id": "{!recordId}",
  "reason": "{!reason}"  // P2 only, blank for P1
}
```

---

### 4. Tray Workflow: Request Handler

**Name:** Commercial Segment Approval Request

**Trigger:** Webhook (API Operation)

| Step | Connector | Details | Status |
|------|-----------|---------|--------|
| 1 | Trigger | Receive `opportunity_id` + `reason` | [x] Exists, needs update |
| 2 | Salesforce | Query Opp: Name, Owner, AccountId | [ ] |
| 3 | Salesforce | Query Account: Name, Physician Count, PS Model, Account Segment | [ ] |
| 4 | Branch | IF Physician Count < 10 → P1 / ELSE IF PS Model = Standard → P2 | [ ] |
| 5a | Slack (P1) | Send message: "< 10 physicians" context | [ ] |
| 5b | Slack (P2) | Send message: Reason (H2H/Connection) context | [ ] |
| 6 | Trigger Reply | Return success to Salesforce | [x] Exists |

**Slack message buttons:**
- Approve: `action_id: approve_commercial`, `value: {opportunity_id}`
- Reject: `action_id: reject_commercial`, `value: {opportunity_id}`

---

### 5. Slack Setup

| Item | Details | Status |
|------|---------|--------|
| Channel | TBD — one channel or separate per process? | [ ] |
| Approver mentions | P1: @JVH @Aamir @Reba / P2: @Meghan @Madeleine | [ ] |
| App permissions | Already configured (Tray.AI Bot Agent) | [x] |

---

### 6. Tray Workflow: Interaction Handler (Button Clicks)

**Name:** Commercial Approval Interaction Handler

**Trigger:** Slack interaction webhook

| Step | Connector | Details | Status |
|------|-----------|---------|--------|
| 1 | Trigger | Receive Slack interaction payload | [ ] |
| 2 | Parse | Extract: `action_id`, `value` (Opp ID), `user` | [ ] |
| 3 | Slack | Open modal: free text input for approval notes | [ ] |
| 4 | _(on submit)_ | Parse modal response: notes from `view.state.values` | [ ] |
| 5 | Salesforce | Update Opportunity: Status, Approved By, Notes, Date | [ ] |
| 6 | Slack | Update original message: "Approved by X" / "Rejected by X" | [ ] |

**Existing pattern:** Look up existing button click handler for reference

---

### 7. Salesforce Validation Rules (on Opportunity)

| Rule Name | Criteria | Error Message | Status |
|-----------|----------|---------------|--------|
| Require_Approval_Under_10_Physicians | `Account.Physician_Count__c < 10 AND Approval_Status__c != "Approved" AND IsClosed = TRUE` | "Approval required for accounts with fewer than 10 physicians" | [ ] |
| Require_Approval_Standard_PS_Model | `Account.PS_Model__c = "Standard" AND Account.Account_Segment__c = "Commercial" AND Approval_Status__c != "Approved" AND IsClosed = TRUE` | "Approval required for Standard PS Model accounts" | [ ] |

---

### 8. Testing & Rollout

| Step | Status |
|------|--------|
| Test in sandbox — P1 flow | [ ] |
| Test in sandbox — P2 flow | [ ] |
| Test validation rules block close | [ ] |
| Test approval unblocks close | [ ] |
| UAT with approvers | [ ] |
| Deploy to production | [ ] |

---

## Technical Notes

### Tray.io

**Slack Block Kit format:**
- Must use `raw_blocks` property with stringified JSON
- JSON must include wrapper: `{"blocks": [...]}`
- Interpolation uses single curly brackets: `{$.steps.trigger.body.fieldname}`

**Connector versions:**
- Slack: v11.0
- API Operation Trigger: v1.0
- Trigger Reply: v1.1
- Salesforce: TBD

**Auth:**
- Slack auth group: `f18da84d-119c-4cc2-bde0-a7dc119443fc`
- Channel: `C08QT1QV9JM` (update for production)

### Button Action IDs

| Button | action_id | value |
|--------|-----------|-------|
| Approve | `approve_commercial` | `{opportunity_id}` |
| Reject | `reject_commercial` | `{opportunity_id}` |

---

## Asana Summary

> Copy this section when updating Asana

**Status:** In Progress — Architecture finalized, build checklist ready

**Completed:**
- Defined architecture (Dynamic Action → Screen Flow → Tray.io → Slack)
- Clarified trigger mechanism (user-initiated, not auto-triggered)
- Mapped both process criteria
- Simplified payload (Opp ID + reason, Tray does SFDC lookup)
- Created initial Tray.io workflow with Slack Block Kit
- Documented sequential build checklist (8 phases)

**Open Questions:**
- Store request reason on Opp or pass-through only?
- Slack channel — same for both processes or different?
- Field API names for lookup (Physician Count, PS Model, Account Segment)
- Approver routing — @mention users or separate channels?

**Build Order:**
1. Salesforce fields (Opportunity)
2. Dynamic Action button + visibility rules
3. Screen Flow (capture reason, call webhook)
4. Tray workflow: Request handler (SFDC lookup, branch, Slack message)
5. Slack channel setup
6. Tray workflow: Interaction handler (button clicks, modal, writeback)
7. Salesforce validation rules
8. Testing & rollout
