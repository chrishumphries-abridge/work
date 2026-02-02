---
title: FAQ
description: Frequently asked questions about Commercial Approvals
---

# Frequently Asked Questions

## General

### What is Commercial Approval?

Commercial Approval is a review process for certain opportunities that need leadership sign-off before proceeding. It ensures proper review of:
- Small deals (under 10 physicians)
- Standard PS Model engagements for commercial accounts

### Why do we need this approval process?

- **Small deals** require additional scrutiny to ensure strategic value
- **Standard PS Model** requests need PS Leadership visibility for resource planning
- Creates audit trail for compliance

### Who built this system?

The Commercial Approval system was built by RevOps using Salesforce Flows and integrated with Slack via Tray.io.

---

## Requesting Approval

### How do I know if I need approval?

The system checks automatically when you click "Request Commercial Approval":
- **Small Deal:** Account has <10 physicians
- **Standard PS Model:** Account Segment = Commercial AND PS Model = Standard

If neither applies, you'll see "No Approval Required."

### Can I request approval on any opportunity?

Yes, you can click the button on any opportunity. The system will tell you if approval isn't required based on the account criteria.

### What information do approvers see?

Approvers see:
- Account name
- Physician count (for small deals)
- Opportunity name
- Your name (as requestor)
- Link to the full opportunity in Salesforce

### How long does approval take?

- Most requests are reviewed within 24 hours
- Small deals require two approvals, so allow 1-2 business days
- Urgent requests: contact the approver directly

---

## Approval Process

### Who approves Small Deals?

1. **Level 1:** Sales Leadership
2. **Level 2:** Finance

Both must approve. If either rejects, the request is rejected.

### Who approves Standard PS Model requests?

**PS Leadership** (single approval needed)

### What's the difference between H2H and Connection?

When requesting Standard PS Model approval, you must select a reason:
- **H2H (Head-to-Head):** Competitive situation where we're directly competing
- **Connection:** Strategic relationship or connection driving the request

### Can approval be skipped?

No. If the criteria are met, approval is required. This ensures consistent review of all qualifying deals.

---

## After Submission

### How do I check my approval status?

Look at the **Approval Status** field on the Opportunity:
- **Pending** - Waiting for decision
- **Approved** - All approvals received
- **Rejected** - Request was rejected

### Will I be notified when approved/rejected?

Yes, you'll receive a Salesforce notification when the final decision is made.

### Can I cancel a pending approval?

Not directly. Contact RevOps if you submitted in error.

### What happens if my request is rejected?

- The Opportunity Approval Status changes to "Rejected"
- You can contact the approver to understand why
- Address their concerns and work with RevOps if you need to resubmit

---

## For Approvers

### How do I receive approval requests?

Via Slack message in your team's approval channel. You'll see a notification with approve/reject buttons.

### What if I need more information?

Click "View in Salesforce" in the Slack message to see the full opportunity record.

### Can I delegate approvals?

Not automatically. If you'll be out, coordinate with your team to monitor the approval channel.

### What if I accidentally approve/reject?

Contact RevOps immediately. They can manually correct the records.

---

## Technical

### Where is approval data stored?

In Salesforce on the **Opportunity_Approval__c** custom object. You can see all approvals in the "Opportunity Approvals" related list on any opportunity.

### Is there an audit trail?

Yes. Every approval record captures:
- Who requested
- Who approved/rejected
- When decisions were made
- Any notes

### Can I run reports on approvals?

Yes. The Opportunity_Approval__c object is report-enabled. Create reports in Salesforce to analyze approval patterns.

### Does this work on mobile?

- **Requesting:** Yes, if using Salesforce mobile app
- **Approving:** Yes, via Slack mobile app

---

## Troubleshooting

### The approval button is missing

Ask your Salesforce admin to add "Request Commercial Approval" to your Opportunity page layout.

### Slack notifications aren't coming through

Contact RevOps or IT. The integration between Salesforce, Tray.io, and Slack may need attention.

### My approval has been pending forever

1. Check who the approver is (view Opportunity Approval record)
2. Send them a direct message
3. Escalate to your manager if urgent

---

## Still Have Questions?

Contact the **RevOps team** for:
- Process questions
- Approval issues
- Reporting needs

Contact your **Salesforce admin** for:
- Access issues
- Button/layout problems
- Technical errors
