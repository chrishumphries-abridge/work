---
title: "How to Approve Commercial Requests"
description: Step-by-step guide for approvers
---

# How to Approve Commercial Requests

> **Time required:** 2-5 minutes per request
> **Prerequisites:** Access to approval Slack channel, Salesforce access

## Overview

As an approver, you review commercial approval requests and decide whether to approve or reject them. This guide walks through the process.

## Steps

### Step 1: Receive the Slack Notification

When someone submits an approval request, you'll receive a message in your team's Slack channel:

```
🔔 Approval Request: Small Deal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Account:        Example Health System
Physician Count: 8
Opportunity:    Example Opp - Q1 2025
Requested By:   Jane Smith
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✅ Approve] [❌ Reject] [View in Salesforce]
```

### Step 2: Review the Request

Look at the key details:
- **Account name** - Do you recognize this account?
- **Physician count** - Is this truly a small deal?
- **Opportunity name** - Does the deal make sense?
- **Requested by** - Who is asking?

**Need more information?** Click **View in Salesforce** to open the full opportunity record.

### Step 3: Make Your Decision

#### To Approve:
Click the **✅ Approve** button.

The system will:
- Record your approval with timestamp
- Notify the next approver (if multi-level) OR update the opportunity as approved
- Update the Slack message to show your decision

#### To Reject:
Click the **❌ Reject** button.

The system will:
- Record your rejection with timestamp
- Update the opportunity as rejected
- Notify the requestor
- Update the Slack message to show your decision

### Step 4: Verify (Optional)

After clicking, the Slack message updates to show your decision:

```
✅ Approved by @yourname at 2:30 PM
[View in Salesforce]
```

## Examples

### Example 1: Approving a Small Deal (Level 1)

**Scenario:** You're Sales Leadership and received a Small Deal request.

1. Review the Slack message - Account has 8 physicians
2. Click **View in Salesforce** to review opportunity details
3. Confirm the deal is strategic despite small size
4. Click **✅ Approve**
5. Finance will now receive their approval request

### Example 2: Rejecting a Standard PS Model Request

**Scenario:** You're PS Leadership and the reason doesn't justify Standard PS.

1. Review the Slack message - Reason is "H2H"
2. Click **View in Salesforce** to review account details
3. Determine that H2H isn't applicable here
4. Click **❌ Reject**
5. Requestor is notified of rejection

## What Happens After Your Decision

| Your Role | Your Decision | Next Step |
|-----------|---------------|-----------|
| Sales Leadership (Level 1) | Approve | Finance receives Level 2 request |
| Sales Leadership (Level 1) | Reject | Opportunity marked Rejected |
| Finance (Level 2) | Approve | Opportunity marked Approved |
| Finance (Level 2) | Reject | Opportunity marked Rejected |
| PS Leadership | Approve | Opportunity marked Approved |
| PS Leadership | Reject | Opportunity marked Rejected |

## Tips for Approvers

### Do
- ✅ Review requests within 24 hours
- ✅ Use "View in Salesforce" when you need more context
- ✅ Consider the strategic value, not just the numbers
- ✅ Communicate with the rep if you have questions

### Don't
- ❌ Let requests sit over the weekend
- ❌ Approve without reviewing the opportunity
- ❌ Reject without reason (contact the rep)

## Troubleshooting

### Slack buttons not working

1. Make sure you're clicking (not just viewing) the button
2. Try refreshing Slack
3. Check if someone else already approved/rejected

### Accidentally clicked wrong button

Contact RevOps - they can manually adjust the approval record in Salesforce.

### Can't find the opportunity in Salesforce

The link in Slack should work. If not:
1. Search for the opportunity name in Salesforce
2. Check if you have access to that record
3. Contact the requestor

## Related Documentation

- [User Guide](../user-guide.md) - Full system overview
- [Troubleshooting](../troubleshooting.md) - Common issues
