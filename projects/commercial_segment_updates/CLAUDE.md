# Project Context: Commercial Segment Approval Workflows

## Business Context

**When:** Pre-opportunity close — approvals must happen before opp can close
**Why:** Gatekeeping decisions about deal structure

| Process | Business Question |
|---------|-------------------|
| Process 1 | "Are we going to do a small deal?" (<10 physicians) |
| Process 2 | "Can they move to commercial Partner Success?" (Standard PS Model) |

**Flow:** Rep requests approval → SFDC creates approval record → Tray sends Slack → Approver responds → Tray updates SFDC → Record-Triggered Flow handles sequencing → Validation rule passes → Opp can close

---

## Architecture

```
Dynamic Action Button (on Opportunity)
├── Visibility: Physician Count < 10 OR PS Model = "Standard"
└── Launches Screen Flow
        ↓
Screen Flow
├── Process 2: Captures reason (H2H/Connection)
├── Creates Opportunity_Approval__c record (Level 1)
├── Updates Opp status to Pending
└── Calls Tray.io webhook
        ↓
Tray.io
├── Queries SFDC for Opp + Account details
├── Determines approvers based on Process Type + Level
└── Sends Slack message with @mentions
        ↓
Slack → Approver clicks Approve/Reject → Modal for notes
        ↓
Tray.io → Updates Opportunity_Approval__c
        ↓
Record-Triggered Flow (on Opportunity_Approval__c)
├── If Small Deal L1 Approved → Create L2 record, call Tray for Reba
├── If Small Deal L2 Approved → Update Opp status to Approved
├── If Standard PS Approved → Update Opp status to Approved
├── If Any Rejected → Update Opp status to Rejected
        ↓
Validation rule passes → Opp can close
```

---

## Two Approval Processes

### Process 1: <10 Physician Count Approval (Tiered)

| Level | Approver Role | Approvers | Logic |
|-------|---------------|-----------|-------|
| 1 | Sales Leadership | JVH OR Aamir | Either can approve |
| 2 | Finance | Reba | Required after Level 1 |

### Process 2: Standard PS Model (Single Level)

| Level | Approver Role | Approvers | Logic |
|-------|---------------|-----------|-------|
| 1 | PS Leadership | Meghan OR Madeleine | Either can approve |

---

## Files in This Project

### Planning & Documentation
| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file - project context |
| `custom_approval_architecture.md` | Full architecture with flows, diagrams |
| `flow_approval_orchestration_research.md` | Research on native Flow Approval (decided against) |
| `approval_workflow_planning.md` | Original planning doc |
| `salesforce_build_instructions.md` | Standalone SFDC build instructions |

### Tray Workflow Specs
| File | Purpose |
|------|---------|
| `tray_workflow_approval_request.json` | **NEW** - Request handler workflow spec |
| `tray_workflow_interaction_handler.json` | **NEW** - Button click handler workflow spec |
| `tray_approval_workflow.json` | Original workflow (outdated) |

### Slack Block Kit Templates
| File | Purpose |
|------|---------|
| `slack_blocks_small_deal_l1.json` | **NEW** - Small Deal Level 1 message |
| `slack_blocks_small_deal_l2.json` | **NEW** - Small Deal Level 2 message (for Reba) |
| `slack_blocks_standard_ps.json` | **NEW** - Standard PS Model message |
| `slack_blocks_decision_approved.json` | **NEW** - Updated message after approval |
| `slack_blocks_decision_rejected.json` | **NEW** - Updated message after rejection |
| `slack_blocks_readable.json` | Original template (outdated) |

### Other
| File | Purpose |
|------|---------|
| `workflow_Endpoint_-PX-Model-Approvals.json` | Sample Tray export for format reference |

---

## Salesforce Components (DEPLOYED)

### Custom Object: Opportunity_Approval__c ✅
| Field | Type | Purpose |
|-------|------|---------|
| `Opportunity__c` | Master-Detail | Parent relationship |
| `Process_Type__c` | Picklist | Small Deal / Standard PS Model |
| `Approver_Role__c` | Picklist | Sales Leadership / Finance / PS Leadership |
| `Level__c` | Number | 1 or 2 (for tiered approvals) |
| `Status__c` | Picklist | Pending / Approved / Rejected |
| `Approver__c` | Text | Who approved (from Slack) |
| `Notes__c` | Long Text | Approver comments |
| `Decision_Date__c` | DateTime | When decision was made |
| `Request_Reason__c` | Picklist | H2H / Connection (Process 2 only) |
| `Slack_Message_Id__c` | Text | For updating Slack messages |

### Fields on Opportunity (pre-existing)
- `Approval_Status__c` - Pending/Approved/Rejected
- `Approval_Request_Reason__c` - H2H/Connection

### Flows (DEPLOYED)
| Flow | Type | Status |
|------|------|--------|
| `Request_Commercial_Approval` | Screen Flow | ✅ Deployed (Draft) |
| `Opportunity_Approval_AfterSave_Handle_Decision` | Record-Triggered | ✅ Deployed (Draft) |
| `Subflow_Send_Approval_Slack_Notification` | Autolaunched Subflow | ✅ Deployed (Draft) |

### Validation Rules (pre-existing)
- `Closed_Won_Under_10_Physicians` ✅ Active
- `Closed_Won_Standard_PS_Model` ✅ Active

### Named Credentials (DEPLOYED)
- `Tray_ai_Commercial_Approvals` ✅ (needs real URL)

---

## What's Left to Build

### In Salesforce
- [ ] Add "Approval Requests" related list to Opportunity Lightning page
- [ ] Set Field Level Security for `Opportunity_Approval__c`
- [ ] Update Named Credential with actual Tray webhook URL
- [ ] Set up External Service (import Tray OpenAPI spec)
- [ ] Wire up `Subflow_Send_Approval_Slack_Notification` with External Service action
- [ ] Activate all flows after testing

### In Tray.io
- [ ] Create "Endpoint: Commercial Approval Request" workflow (use `tray_workflow_approval_request.json` as spec)
- [ ] Create "Interaction: Commercial Approval Button Handler" workflow (use `tray_workflow_interaction_handler.json` as spec)
- [ ] Configure Slack authentication
- [ ] Set up Salesforce authentication
- [ ] Test end-to-end

### Slack User IDs to Replace
| Person | Role | Placeholder |
|--------|------|-------------|
| JVH | Sales Leadership | `SLACK_USER_ID_JVH` |
| Aamir | Sales Leadership | `SLACK_USER_ID_AAMIR` |
| Reba | Finance | `SLACK_USER_ID_REBA` |
| Meghan | PS Leadership | `SLACK_USER_ID_MEGHAN` |
| Madeleine | PS Leadership | `SLACK_USER_ID_MADELEINE` |

---

## Tray.io Workflow Details

### Workflow 1: Approval Request Handler

**Trigger:** Webhook from Salesforce
**Payload:**
```json
{
  "approval_record_id": "a0BXXXXXXXXXX",
  "opportunity_id": "006XXXXXXXXXX",
  "process_type": "Small Deal | Standard PS Model",
  "level": 1
}
```

**Steps:**
1. Receive webhook
2. Query Opportunity_Approval__c for details
3. Query Opportunity for Name, Owner, Amount
4. Query Account for Name, Physician Count, PS Model
5. Branch by process_type + level
6. Send appropriate Slack message with @mentions
7. Store Slack message ts on approval record
8. Return success to Salesforce

### Workflow 2: Interaction Handler

**Trigger:** Slack interaction (button click or modal submit)

**Button Click Flow:**
1. Receive block_actions payload
2. Extract approval_record_id from button value
3. Open modal for notes (store context in private_metadata)

**Modal Submit Flow:**
1. Receive view_submission payload
2. Parse private_metadata for approval_record_id, action, channel_id, message_ts
3. Map action_id to status (approve_commercial → Approved)
4. Update Opportunity_Approval__c: Status, Approver, Notes, Decision_Date
5. Update original Slack message to show decision

---

## Open Questions

- [ ] **Slack channel** — Same channel for both processes or different?
- [ ] **Rejection flow** — Can rep re-submit? Does it create new approval records?
- [ ] **Slack user IDs** — Need actual IDs for JVH, Aamir, Reba, Meghan, Madeleine

---

## Asana Link

https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1211987690458447?focus=true

---

## Session Log

### 2026-01-23: Built Salesforce Components + Tray Specs

**Deployed to Salesforce:**
- `Opportunity_Approval__c` custom object with 11 fields
- `Request_Commercial_Approval` Screen Flow (reworked for custom object)
- `Opportunity_Approval_AfterSave_Handle_Decision` Record-Triggered Flow
- `Subflow_Send_Approval_Slack_Notification` (placeholder for External Service)
- `Tray_ai_Commercial_Approvals` Named Credential

**Created Tray Workflow Specs:**
- `tray_workflow_approval_request.json` - Full spec for request handler
- `tray_workflow_interaction_handler.json` - Full spec for button/modal handler

**Created Slack Block Kit Templates:**
- Small Deal Level 1, Level 2, Standard PS Model
- Approved/Rejected message updates

### 2026-01-06: Architecture Decision

Decided on custom object approach over native Flow Approval Orchestration due to poorly documented external API integration.

### 2026-01-05: Initial Planning

Created architecture docs, identified two processes, mapped data flow.
