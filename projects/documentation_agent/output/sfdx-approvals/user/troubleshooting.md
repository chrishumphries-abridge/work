---
title: Troubleshooting
description: Solutions to common issues with the Commercial Approval system
---

# Troubleshooting

Having issues? This guide covers the most common problems and their solutions.

---

## For Sales Reps

### I can't find the "Request Commercial Approval" button

**Cause:** The button may not be on your page layout.

**Solution:**
1. Check if the button exists in the "Actions" dropdown (three dots)
2. If not found, contact your Salesforce admin to add it to the Opportunity page layout

---

### I see "No Approval Required" but I think I need approval

**Cause:** The account doesn't meet the criteria.

**Check these conditions:**

For Small Deal approval:
- Account's `Total Physician Count` must be less than 10

For Standard PS Model approval:
- Account Segment must be "Commercial" AND
- PS Model must be "Standard"

**Solution:** Verify the account record has the correct values. If the values are wrong, update them first, then try again.

---

### My request has been pending for days

**Cause:** Approver may not have seen the Slack message.

**Solution:**
1. Check who the approver is (view the Opportunity Approval record)
2. Send them a direct message asking about the status
3. If urgent, escalate to your manager

---

### I submitted to the wrong opportunity

**Cause:** Human error - happens to everyone!

**Solution:** Contact RevOps or your Salesforce admin. They can:
1. Delete the incorrect approval record
2. Update the opportunity status back to blank
3. You can then submit on the correct opportunity

---

### Approval was rejected but I don't know why

**Cause:** The approver may not have provided notes.

**Solution:**
1. Check the Opportunity Approval record for any notes
2. Contact the approver directly to understand the reason
3. Address their concerns before considering a re-submission

---

## For Approvers

### I clicked Approve/Reject but nothing happened

**Cause:** Could be a connection issue or the request was already handled.

**Solution:**
1. Check if the Slack message updated (shows approved/rejected)
2. Open Salesforce and check the Opportunity Approval record
3. If truly stuck, contact RevOps

---

### I approved but the opportunity still shows Pending

**For Small Deals (Level 1):** This is expected! Finance still needs to approve.

**For other scenarios:**
1. Check the Opportunity Approval record - is your status showing as Approved?
2. There may be a flow error - contact your Salesforce admin

---

### I can't see the opportunity in Salesforce

**Cause:** You may not have access to that record.

**Solution:**
1. Contact the opportunity owner
2. Ask your Salesforce admin to check sharing settings
3. Review based on the information in Slack

---

### I accidentally approved/rejected

**Cause:** Misclick or wrong request.

**Solution:** Contact RevOps immediately. They can:
1. Manually update the Opportunity Approval record
2. Update the Opportunity status
3. Re-trigger the notification if needed

---

## For Admins

### Slack notifications not sending

**Check these in order:**

1. **Flow is active:** Setup → Flows → `Subflow_Send_Approval_Slack_Notification` should show Active

2. **Named Credential configured:** Setup → Named Credentials → `Tray_ai_Commercial_Approvals` should have correct URL

3. **Tray.io workflow running:** Log into Tray.io and verify the workflow is published

4. **Check flow errors:** Setup → Flows → Paused and Failed Flow Interviews

---

### Opportunity status not updating after approval

**Check these:**

1. **Trigger flow is active:** `Opportunity_Approval_AfterSave_Handle_Decision` must be active

2. **Status field updated:** Check that `Opportunity_Approval__c.Status__c` was changed

3. **Flow debug:** Enable debug logs and trace the flow execution

---

### Named Credential returning 401/403

**Cause:** Authentication issue with Tray.io.

**Solution:**
1. Verify External Credential authentication settings
2. Check if Tray.io webhook authentication changed
3. Regenerate credentials if needed

---

## Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Insufficient access" | User can't access the record | Check sharing settings |
| "Required field missing" | Flow missing data | Check flow debug logs |
| "Invalid cross-reference" | Looking up deleted record | Verify opportunity still exists |

---

## Getting Help

### Self-Service

1. Check this troubleshooting guide
2. Review the [User Guide](user-guide.md)
3. Check the Opportunity Approval related list for status

### Contact Support

- **RevOps Team:** For approval-related issues
- **Salesforce Admin:** For access or configuration issues
- **IT:** For Slack connectivity issues

### Information to Include

When reporting issues, please provide:
- Opportunity ID or name
- Approval record number (OA-XXXX)
- What you expected to happen
- What actually happened
- Screenshot if possible
