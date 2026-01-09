# Project Context: Commercial Segment Approval Workflows

## Business Context

**When:** Pre-opportunity close — approvals must happen before opp can close
**Why:** Gatekeeping decisions about deal structure

| Process | Business Question |
|---------|-------------------|
| Process 1 | "Are we going to do a small deal?" (<10 physicians) |
| Process 2 | "Can they move to commercial Partner Success?" (Standard PS Model) |

**Flow:** Rep requests approval → Tray queries SFDC → Slack message → Approver responds → Writeback to SFDC → Validation rule passes → Opp can close

---

## Architecture

```
Dynamic Action Button (on Opportunity)
├── Visibility: Physician Count < 10 OR PS Model = "Standard"
└── Launches Screen Flow
        ↓
Screen Flow
├── Process 2: Captures reason (H2H/Connection)
└── Calls Tray.io webhook with Opp ID
        ↓
Tray.io
├── Queries SFDC for Opp + Account details
├── Determines process type from data
└── Sends Slack message
        ↓
Slack → Approver clicks Approve/Reject → Modal for notes
        ↓
Tray.io → Writes back to SFDC
        ↓
Validation rule passes → Opp can close
```

| Component | Role |
|-----------|------|
| Dynamic Action | Button visibility based on criteria |
| Screen Flow | Capture reason (P2), call webhook |
| Tray.io | Orchestration, SFDC lookup, Slack, writeback |
| Slack | Approval interface with modal for notes |

---

## Two Approval Processes

### Process 1: <10 Physician Count Approval
- **Visibility:** Total Physician Count < 10
- **Approvers:** JVH/Aamir AND Reba (both required)
- **Slack context:** "< 10 physicians"
- **Input:** Free text approval notes from Slack modal

### Process 2: Standard PS Model (Commercial)
- **Visibility:** `PS Model` = "Standard" AND `Account Segment` = "Commercial"
- **Approvers:** Meghan OR Madeleine (either can approve)
- **Screen Flow input:** Reason for request (H2H / Connection)
- **Slack context:** Reason for requesting Standard PS Model
- **Input:** Free text approval notes from Slack modal

---

## Files in This Project

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project context for Claude Code |
| `custom_approval_architecture.md` | **CURRENT** — Full architecture with custom object, flows, diagrams |
| `flow_approval_orchestration_research.md` | Research on native Flow Approval Orchestration (decided against) |
| `approval_workflow_planning.md` | Original planning doc (partially outdated) |
| `salesforce_build_instructions.md` | Standalone instructions for Salesforce build |
| `tray_approval_workflow.json` | Tray.io workflow — needs update for new architecture |
| `slack_blocks_readable.json` | Human-readable Slack Block Kit |
| `workflow_Endpoint_-PX-Model-Approvals.json` | Sample Tray export for format reference |

---

## Open Questions

- [x] **Store reason?** — Yes, stored on `Opportunity_Approval__c.Request_Reason__c`
- [ ] **Slack channel** — Same channel for both processes or different?
- [ ] **Field API names** — Physician Count, PS Model, Account Segment (need to confirm)
- [ ] **Approver routing** — @mention users or post to different channels?
- [ ] **Rejection flow** — Can rep re-submit? Does it create new approval records or reset existing?

---

## New SFDC Components Needed

### On Opportunity
- [ ] `Approval_Status__c` (Picklist: Pending/Approved/Rejected) — for validation rule

### Custom Object: Opportunity_Approval__c
See `custom_approval_architecture.md` for full field list. Key fields:
- `Opportunity__c` (Master-Detail)
- `Process_Type__c` (Small Deal / Standard PS Model)
- `Approver_Role__c` (Sales Leadership / Finance / PS Leadership)
- `Level__c` (1 or 2)
- `Status__c` (Pending / Approved / Rejected)
- `Approver__c`, `Notes__c`, `Decision_Date__c`
- `Request_Reason__c` (H2H / Connection — Process 2 only)

---

## Salesforce Payload to Tray.io (Simplified)

```json
{
  "opportunity_id": "006XXXXXXXXXXXX",
  "reason": "H2H"  // Process 2 only — captured in Screen Flow
}
```

Tray does SFDC lookup to get Account Name, Physician Count, PS Model, etc.

---

## Tray.io Notes

- Export format: `tray_export_version: 4`
- Auth group ID: `f18da84d-119c-4cc2-bde0-a7dc119443fc` (Tray.AI Bot Agent Trigger)
- Slack channel: `C08QT1QV9JM` (update for production)

### Slack Block Kit in Tray

**Working format for `raw_blocks`:**
```json
"blocks": {
  "type": "object",
  "value": {
    "raw_blocks": {
      "type": "string",
      "value": "{\"blocks\":[...your blocks array...]}"
    }
  }
}
```

**Key learnings:**
1. `raw_blocks` must be a **string** with `{"blocks": [...]}` wrapper
2. Interpolation uses single curly brackets: `{$.steps.trigger.body.fieldname}`

---

## Asana Link

https://app.asana.com/1/1135694209242791/project/1210002796502308/task/1211987690458447?focus=true

---

## Where We Left Off (2026-01-06)

### Decision Made: Custom Object Approach

After researching native Flow Approval Orchestration (Spring '25+), decided to go **custom** instead:
- Native approval orchestration is complex and external API integration is poorly documented
- Custom approach gives full control over Slack UX and sequencing logic
- Simpler to build and debug

### Current Architecture

See `custom_approval_architecture.md` for full details.

```
Screen Flow (user submits)
    → Creates Opportunity_Approval__c record
    → Calls Tray webhook
        ↓
Tray sends custom Slack message
        ↓
Approver clicks Approve/Reject in Slack
        ↓
Tray updates Opportunity_Approval__c
        ↓
Record-Triggered Flow handles sequencing:
    - Process 1 Level 1 approved → Create Level 2 record → Call Tray for Reba
    - Process 1 Level 2 approved → Update Opp status
    - Process 2 approved → Update Opp status
        ↓
Validation rule passes → Opp can close
```

### Process 1 Sequencing (Clarified)
1. **Level 1:** JVH OR Aamir (either can approve)
2. **Level 2:** Reba (required, after Level 1 completes)

Sequencing managed by Record-Triggered Flow on `Opportunity_Approval__c`.

### Components to Build

| # | Component | Status |
|---|-----------|--------|
| 1 | `Opportunity_Approval__c` custom object | Not started |
| 2 | `Approval_Status__c` field on Opportunity | Not started |
| 3 | Screen Flow: "Request Approval" | Not started |
| 4 | Record-Triggered Flow: "Handle Approval Decision" | Not started |
| 5 | Validation Rule on Opportunity | Not started |
| 6 | Dynamic Action button | Not started |
| 7 | Tray workflow: Send Slack | Not started |
| 8 | Tray workflow: Handle Slack button click | Not started |

### Next Session
1. Review `custom_approval_architecture.md` to confirm approach
2. Start building — likely begin with custom object and fields
3. Build Screen Flow
4. Build Record-Triggered Flow
5. Update Tray workflows
