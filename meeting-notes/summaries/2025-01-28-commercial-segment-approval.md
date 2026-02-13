---
date: 2025-01-28
participants: [Chris Humphries, Taylor, Madeline, Zach]
type: review/demo
tags: [salesforce, approval-workflows, commercial-segment, nebula, status-page]
---

# Commercial Segment Approval Review - Jan 28, 2025

## Summary

Demo and review of the new commercial segment approval workflows in Salesforce. The PS Model and IAM Model fields are now automated based on physician count and account status. Two approval flows are built: small deals (<10 physicians) and Standard PS model requests. Also discussed Nebula status page bulk upload as a priority item.

## Decisions Made

> [!info] Timeline: Post-CKO
> All approval workflows will go live after CKO. Enablement and Loom videos to be done before launch.

> [!info] Approval Channel Structure
> All approvals go to a single shared Slack channel for visibility (not DMs). Taylor will define channel membership.

> [!info] Approval Routing
> - Small deal (<10 physicians): Amir + Jeremy (level 1) → Reba (level 2)
> - PS Model Standard: Megan Sims + Madeline
> - IAM Model: Taylor + Evan (NEW - to be built)

> [!info] Rejection Flow
> If rejected, the request stays closed. User must submit a NEW approval request (no reviving old ones). This preserves audit trail.

> [!info] Segment Field Defaults
> Default for PS Model and IAM Model is "Grouped". Users request exception to change to "Standard".

## Action Items

> [!todo] Build IAM model approval flow
> Owner: Chris
> Asana: Subtask of Commercial Segment task
> Same flow as PS model, approvers are Taylor and Evan

> [!todo] Add requester notification
> Owner: Chris
> Notify the requester when their approval is approved/rejected

> [!todo] Auto-set field on approval
> Owner: Chris
> When approved, automatically set the field to "Standard" so user doesn't have to

> [!todo] Create Slack channel for approvals
> Owner: Chris (channel creation), Taylor (membership list)
> Blocked by: Taylor providing channel membership

> [!todo] Backfill existing open opportunities
> Owner: Chris
> Run segment logic against existing open opps that predate the automation

> [!todo] Review edge cases with Taylor
> Owner: Chris + Taylor
> Discuss integration value defaults for 10-100 physician slot

> [!todo] Create Loom video for approvers
> Owner: Chris
> Recipients: Reba, Amir, Jeremy, Megan Sims, Madeline

> [!warning] PRIORITY: Nebula bulk upload
> Owner: Chris
> Target: End of week
> Process Taylor's spreadsheet + set up ongoing automation
> Asana: [[1213004289285827]]

## Open Questions

> [!warning] Integration value default
> What should happen when integration value is blank for 10-100 physician slot? Currently we don't set the field at all. Need to discuss with Taylor.

> [!warning] Channel membership
> Taylor will define who should be in the approval Slack channel and come back with the list.

## Notes

**Automation Logic (now live):**
- Triggers on account status change to: Customer, Pilot, or Open Opportunity
- Checks physician count ranges: 0-10 (nothing), 10-100, 100-350
- Checks for active integrations
- Sets PS Model and IAM Model fields based on logic

**Approval Flow Mechanics:**
- "Request Approval" button on opportunity
- Validation blocks deal progression past Align stage if criteria met
- Approval request object created for audit trail
- Slack notification to approvers with approve/reject buttons
- Notes field for approval context
- Multi-level approval for small deals (2 levels)

**Nebula Context:**
- Saturday incident where contacts weren't notified
- Nebula is org-level setting, not contact-by-contact
- Checkbox approach is working but needs automation for org-wide settings
- QA: Verify status page matches Salesforce (status page has been the breakdown point)

---
*Processed from: [[processed/2025-01-28-commercial-segment-approval]]*
