# Flow Approval Orchestration Research

## Overview

Salesforce introduced **Flow Approval Orchestration** in Spring '25 as the successor to Classic Approval Processes. This is fundamentally different from the legacy system and has implications for Slack integration.

---

## Classic vs Flow Approval Architecture

| Aspect | Classic Approval Process | Flow Approval Orchestration |
|--------|-------------------------|----------------------------|
| Objects | `ProcessInstance`, `ProcessInstanceWorkitem`, `ProcessInstanceStep` | `ApprovalSubmission`, `ApprovalSubmissionDetail`, `ApprovalRequest`, `ApprovalWorkItem` |
| History Display | Approval History related list on record | Dedicated "Approvals" Lightning App |
| API | `Approval.ProcessWorkitemRequest` Apex class, REST `/process/approvals/` | **Unknown** - may not support classic APIs |
| Trigger | Submit for Approval action | Record-triggered or Autolaunched Orchestration |
| Flexibility | Limited branching | Full Flow logic (decisions, loops, etc.) |

---

## Flow Approval Orchestration Data Model

**Four new objects:**

1. **Approval Submissions** — The overall submission record
2. **Approval Submission Details** — Metadata about the submission
3. **Approval Requests** — Individual requests within a submission (one per approver)
4. **Approval Work Items** — Tasks assigned to specific approvers

**Important:** The classic "Approval History" related list **remains empty** when using Flow Approval Orchestration. All history lives in the new objects/Approvals app.

---

## Flow Types

| Type | Trigger | Use Case |
|------|---------|----------|
| **Record-triggered Approval Orchestration** | Record create/update | Auto-submit when criteria met |
| **Autolaunched Approval Orchestration** | Button, Flow, Apex | User-initiated submission |

---

## Building Blocks

- **Stages** — Container for steps (sequential or parallel)
- **Approval Steps** — Interactive; approver makes decision via Screen Flow
- **Background Steps** — Automated actions (field updates, callouts, etc.)

---

## Key Limitations

| Limitation | Impact |
|------------|--------|
| **Approve/Reject only** | Cannot pass custom decision values back to orchestration |
| **No manual next-approver selection** | Approvers must be predetermined in flow logic |
| **User assignment by username** | Cannot use User IDs directly |
| **Record locking** | Record locked during approval process |
| **History visibility** | Classic related list empty; must use Approvals app |

---

## External Integration Capability

Flow Approval Orchestration supports:
> "pause, wait for external input, and then resume automatically"

This is the **key mechanism for Slack integration** — the orchestration can pause at a step, wait for an external system to provide input, then continue.

---

## The Slack Integration Question

### What we want:
1. Screen Flow submits approval → Creates ApprovalWorkItem
2. Tray sends Slack message with context + buttons
3. Approver clicks Approve/Reject in Slack
4. Tray updates the ApprovalWorkItem → Orchestration continues
5. Full history preserved in native objects

### The unknown:
**Can ApprovalWorkItem records be updated programmatically to approve/reject?**

Options to investigate:

| Approach | How | Status |
|----------|-----|--------|
| **Classic REST API** | `POST /process/approvals/` with `actionType: Approve` | May not work with new objects |
| **Direct DML on ApprovalWorkItem** | Update status field directly | Unknown if supported |
| **Resume Orchestration API** | Provide input to paused orchestration | Most likely path — need to research |
| **Apex Invocable** | Custom Apex that orchestration calls | Would work but adds complexity |

### Most promising path:
The "pause and wait for external input" pattern suggests there's a mechanism to **resume an orchestration with a decision value**. This would be the clean integration point for Slack.

**Research needed:**
- How does an orchestration "wait for external input"?
- What API/mechanism resumes it?
- Can Tray call this API?

---

## Hybrid Architecture (Revised)

If external resume is possible:

```
Screen Flow (on Opp)
└── Launches Autolaunched Approval Orchestration
        ↓
Orchestration Stage 1
├── Background Step: Call Tray webhook (sends Slack message)
├── Approval Step: Pauses, waits for external input
        ↓
Slack → Approver clicks Approve/Reject
        ↓
Tray → Calls SFDC API to resume orchestration with decision
        ↓
Orchestration continues
├── If multi-level: Routes to Stage 2
├── Background Step: Update Opp fields
└── Complete
        ↓
Validation rule passes → Opp can close
```

---

## Next Steps

1. **Test ApprovalWorkItem API access** — Can we query/update these objects via REST?
2. **Research orchestration resume mechanism** — How do external systems provide input to a paused orchestration?
3. **Prototype** — Build minimal orchestration that pauses and test external resume
4. **Evaluate fallback** — If external resume isn't viable, consider:
   - Classic Approval Process (legacy but known API)
   - Full custom (Opportunity_Approval__c object as originally planned)

---

## Sources

- [Salesforce Ben: Flow Approval Process Capabilities](https://www.salesforceben.com/salesforce-spring-25-release-new-flow-approval-process-capabilities/)
- [SalesforceBreak: Flow Approval Process](https://salesforcebreak.com/2025/02/12/approval-salesforce-flow-approval-process/)
- [UnofficialSF: Flow Approval Processes](https://unofficialsf.com/efficient-approval-management-with-salesforce-flow-approval-processes-and-enhanced-approval-requests-pro/)
- [SalesforceFox: Flow Approval Process](https://salesforcefox.com/how-to-use-flow-approval-process-in-salesforce/)
- [Salesforce Developers: Process Approvals REST API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_process_approvals.htm)
- [Salesforce Developers: ApprovalWorkItem Object Reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_approvalworkitem.htm)

---

## Bottom Line

Flow Approval Orchestration is more powerful but less documented for external integrations. The critical question is **how to programmatically provide a decision to a paused orchestration**. If that's straightforward, Slack integration is viable. If not, you may need to fall back to Classic Approval Process (which has known APIs) or go fully custom.
