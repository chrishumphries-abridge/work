---
title: User Guide
description: Complete guide to using the Commercial Approval system
---

# User Guide

This guide covers everything you need to know about the Commercial Approval system.

## Understanding Approval Types

### Small Deal Approval

**When it applies:** Account has fewer than 10 physicians

**Why it exists:** Small deals require additional scrutiny to ensure they're strategically valuable and financially viable.

**Approval chain:**
1. Sales Leadership reviews first
2. If approved, Finance reviews second
3. Both must approve for final approval

**Timeline:** Expect 1-2 business days for full approval

### Standard PS Model Approval

**When it applies:**
- Account Segment = "Commercial"
- PS Model = "Standard"

**Why it exists:** Standard PS engagements for commercial accounts need PS Leadership sign-off to ensure proper resource allocation.

**Approval chain:**
1. PS Leadership reviews
2. Single approval needed

**You must provide a reason:**
- **H2H** - Head-to-head competitive situation
- **Connection** - Strategic connection or relationship

---

## For Sales Reps: Requesting Approval

### Step 1: Open the Opportunity

Navigate to the Opportunity record in Salesforce that needs approval.

### Step 2: Click "Request Commercial Approval"

Find the button in the action bar at the top of the record. If you don't see it, your admin may need to add it to the page layout.

### Step 3: Review the Confirmation Screen

**For Small Deals:**
You'll see:
- Account name
- Physician count
- Confirmation that this requires Sales Leadership and Finance approval

**For Standard PS Model:**
You'll see:
- A dropdown to select your reason (H2H or Connection)
- Confirmation that this requires PS Leadership approval

### Step 4: Submit the Request

Click **Submit Request**. You'll see a confirmation message.

### Step 5: Monitor Status

Your opportunity now shows:
- **Approval Status** = Pending

You can check the Opportunity Approvals related list to see individual approval records.

### What to Expect

- Approvers receive an immediate Slack notification
- Most approvals are completed within 24 hours
- You'll be notified (via Salesforce notification) when decided

---

## For Approvers: Reviewing Requests

### Receiving Approval Requests

When someone submits an approval request, you'll receive a Slack message in your team's approval channel.

The message includes:
- **Process type** (Small Deal or Standard PS Model)
- **Account name**
- **Physician count** (for small deals)
- **Requested by** (sales rep's name)
- **Link to Opportunity**

### Making a Decision

Click one of the buttons in the Slack message:
- **Approve** - Approves this level
- **Reject** - Rejects the entire request
- **View in Salesforce** - Opens the opportunity for more details

### What Happens After Your Decision

**If you Approve a Small Deal Level 1:**
- Finance receives their approval request
- Sales rep sees the opportunity still pending

**If you Approve a Small Deal Level 2 (or Standard PS):**
- Opportunity status changes to "Approved"
- Sales rep is notified

**If you Reject at any level:**
- Opportunity status changes to "Rejected"
- Sales rep is notified

---

## Checking Approval Status

### On the Opportunity

Look at the **Approval Status** field:
| Status | Meaning |
|--------|---------|
| (blank) | No approval requested |
| Pending | Awaiting approver decision |
| Approved | All approvals received |
| Rejected | Request was rejected |

### In the Related List

The **Opportunity Approvals** related list shows all approval records:
- Approval Number (OA-0001, etc.)
- Process Type
- Level
- Status
- Approver Role

---

## Approval Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        SMALL DEAL                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Request      Level 1         Level 2         Final            │
│   Submitted → Sales Lead → Finance → Approved                  │
│       │           │            │                               │
│       │           ↓            ↓                               │
│       │       Rejected     Rejected → Rejected                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    STANDARD PS MODEL                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Request      Level 1         Final                            │
│   Submitted → PS Leadership → Approved                         │
│       │           │                                            │
│       │           ↓                                            │
│       │       Rejected → Rejected                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### For Sales Reps

✅ **Do:**
- Request approval early in your sales process
- Ensure opportunity details are accurate before requesting
- Follow up with approvers if urgent

❌ **Don't:**
- Wait until the last minute to request approval
- Submit multiple requests for the same opportunity
- Proceed with a deal before approval is complete

### For Approvers

✅ **Do:**
- Review requests promptly (within 24 hours)
- Open the Salesforce link if you need more context
- Add notes when rejecting to help the rep understand why

❌ **Don't:**
- Ignore Slack notifications (they're time-sensitive)
- Approve without reviewing deal details
- Let requests sit in your queue over the weekend

---

## Frequently Asked Questions

**Q: Can I cancel an approval request?**
A: Not currently. Contact your admin if you submitted in error.

**Q: What if both my approvers are out of office?**
A: Contact your manager or the RevOps team for manual handling.

**Q: Can I resubmit after rejection?**
A: Currently you would need to work with your admin. Address the rejection reason first.

**Q: Who can see my approval requests?**
A: The opportunity owner, approvers, and admins can see approval records.

---

## Related Documentation

- [Getting Started](getting-started.md) - Quick start guide
- [Approving Requests](how-to/approving-requests.md) - Detailed approver guide
- [Troubleshooting](troubleshooting.md) - Common issues
