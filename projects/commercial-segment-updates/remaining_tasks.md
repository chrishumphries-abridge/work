# Commercial Approval Workflow — Remaining Tasks

**Last Updated:** 2026-01-23

---

## Completed ✅

### Salesforce
- [x] `Opportunity_Approval__c` custom object with all fields
- [x] `Request_Commercial_Approval` Screen Flow (creates approval record, calls Tray)
- [x] `Opportunity_Approval_AfterSave_Handle_Decision` Record-Triggered Flow (tiered logic)
- [x] `Subflow_Send_Approval_Slack_Notification` (placeholder)
- [x] `Tray_ai_Commercial_Approvals` Named Credential
- [x] Validation rules (pre-existing, confirmed working)
- [x] Test data (Small Deal + Standard PS Model opportunities)

### Tray
- [x] Request handler endpoint (receiving webhooks from SFDC)
- [x] SFDC queries for Opp, Account, Approval details
- [x] Slack message with Block Kit (Small Deal L1)

### Documentation
- [x] Block Kit templates for all message types
- [x] Interaction handler filtering guide
- [x] Architecture documentation

---

## In Progress 🔄

### Tray: Interaction Handler
- [ ] Filter for `approve_commercial` / `reject_commercial` button clicks
- [ ] Open modal on button click (with `private_metadata`)
- [ ] Filter for `commercial_approval_notes` modal submission
- [ ] Parse `private_metadata` from modal
- [ ] Map action to Status (approve → Approved, reject → Rejected)
- [ ] Update `Opportunity_Approval__c` in Salesforce:
  - `Status__c`
  - `Approver__c`
  - `Notes__c`
  - `Decision_Date__c`
- [ ] Update original Slack message to show decision

---

## Remaining Tasks 📋

### Tray: Request Handler Enhancements
- [ ] Add branching for Standard PS Model (different Slack message)
- [ ] Add branching for Small Deal Level 2 (message to Reba, shows L1 info)
- [ ] Store `Slack_Message_Id__c` after posting message
- [ ] Replace placeholder Slack user IDs with real ones:
  - `SLACK_ID_JVH`
  - `SLACK_ID_AAMIR`
  - `SLACK_ID_REBA`
  - `SLACK_ID_MEGHAN`
  - `SLACK_ID_MADELEINE`

### Tray: Post-Decision Flow
- [ ] Create "Approved" message Block Kit (replaces buttons with decision)
- [ ] Create "Rejected" message Block Kit
- [ ] Update original Slack message via `chat.update`

### Salesforce: Wiring
- [ ] Update Named Credential with actual Tray webhook URL
- [ ] Set up External Service (import Tray OpenAPI spec) OR use HTTP callout
- [ ] Wire `Subflow_Send_Approval_Slack_Notification` to call Tray
- [ ] Activate flows (currently Draft)

### Salesforce: UI/Access
- [ ] Add "Approval Requests" related list to Opportunity Lightning page
- [ ] Set Field Level Security for `Opportunity_Approval__c`
- [ ] Add Dynamic Action button visibility (if not already configured)

### Testing
- [ ] Test Small Deal L1 → Approve → L2 created → Reba notified
- [ ] Test Small Deal L1 → Reject → Opp status = Rejected
- [ ] Test Small Deal L2 → Approve → Opp status = Approved
- [ ] Test Standard PS Model → Approve → Opp status = Approved
- [ ] Test validation rule blocks close without approval
- [ ] Test validation rule allows close with approval

---

## Quick Reference: Current State

```
User clicks "Request Approval"
        ↓
Screen Flow creates Opportunity_Approval__c (Level 1, Pending)
        ↓
Screen Flow calls Tray webhook ✅ WORKING
        ↓
Tray queries SFDC, sends Slack message ✅ WORKING
        ↓
Approver clicks Approve/Reject
        ↓
Tray interaction handler ← YOU ARE HERE
        ↓
Tray updates Opportunity_Approval__c
        ↓
Record-Triggered Flow fires (creates L2 or updates Opp)
        ↓
Tray updates Slack message (shows decision)
```

---

## Open Questions

- [ ] Slack channel — same for both processes or different?
- [ ] Can rep re-submit after rejection?
- [ ] Notification to rep when approved/rejected?
