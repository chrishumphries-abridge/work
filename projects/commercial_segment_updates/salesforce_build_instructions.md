# Salesforce Build Instructions: Commercial Segment Approval Workflow

## Context

You are building the Salesforce components for an approval workflow. Reps need to request approval before closing certain opportunities. The approval happens in Slack via Tray.io, but Salesforce needs to:
1. Store approval status
2. Provide a button to request approval (only visible when criteria met)
3. Block opportunity close until approved

---

## 1. Create Custom Fields on Opportunity

Create the following fields on the **Opportunity** object:

| Field Label | API Name | Type | Details |
|-------------|----------|------|---------|
| Approval Status | `Approval_Status__c` | Picklist | Values: `Pending`, `Approved`, `Rejected` |
| Approved By | `Approved_By__c` | Text(255) | Stores Slack username of approver |
| Approval Notes | `Approval_Notes__c` | Long Text Area(5000) | Free text from approver |
| Approval Date | `Approval_Date__c` | Date/Time | When approval was granted |
| Request Reason | `Request_Reason__c` | Picklist | Values: `H2H`, `Connection` (used for Process 2 only) |

---

## 2. Create Screen Flow: "Request Commercial Approval"

**Flow Type:** Screen Flow

**Input Variable:**
- `recordId` (Text) — receives Opportunity ID from record page

**Flow Logic:**

```
Start
  ↓
Get Records: Get the Opportunity
  - Object: Opportunity
  - Filter: Id = {!recordId}
  - Store in: {!currentOpp}
  ↓
Get Records: Get the Account
  - Object: Account
  - Filter: Id = {!currentOpp.AccountId}
  - Store in: {!currentAccount}
  ↓
Decision: Is this Process 2?
  - Condition: {!currentAccount.PS_Model__c} = "Standard" AND {!currentAccount.Account_Segment__c} = "Commercial"
  - If YES → Go to Reason Screen
  - If NO → Skip to HTTP Callout
  ↓
Screen: Reason for Request (Process 2 only)
  - Picklist component
  - Label: "Why are you requesting Standard PS Model approval?"
  - Choices: "H2H", "Connection"
  - Required: Yes
  - Store in: {!selectedReason}
  ↓
Action: HTTP Callout to Tray.io
  - Method: POST
  - URL: [TRAY_WEBHOOK_URL - to be provided]
  - Headers: Content-Type: application/json
  - Body:
    {
      "opportunity_id": "{!recordId}",
      "reason": "{!selectedReason}"
    }
  ↓
Update Records: Set Approval Status to Pending
  - Object: Opportunity
  - Filter: Id = {!recordId}
  - Set: Approval_Status__c = "Pending"
  ↓
Screen: Confirmation
  - Display Text: "Approval request submitted. You will be notified when a decision is made."
  ↓
End
```

**Notes:**
- For Process 1 (< 10 physicians), `reason` will be blank/null in the payload — that's expected
- The Tray webhook URL will be provided after the Tray workflow is built

---

## 3. Create Dynamic Action Button

**Location:** Opportunity Lightning Record Page

**Button Configuration:**
- Label: `Request Approval`
- Action Type: Flow
- Flow: `Request_Commercial_Approval` (the flow created above)

**Visibility Rules (show button when ANY of these are true):**

**Rule 1 — Process 1 (< 10 Physicians):**
- Field: `Account.Total_Physician_Count__c` (confirm actual API name)
- Operator: Less Than
- Value: `10`

**Rule 2 — Process 2 (Standard PS Model):**
- Field: `Account.PS_Model__c`
- Operator: Equals
- Value: `Standard`
- AND
- Field: `Account.Account_Segment__c`
- Operator: Equals
- Value: `Commercial`

**Additional visibility condition (hide if already approved):**
- Field: `Approval_Status__c`
- Operator: Does Not Equal
- Value: `Approved`

---

## 4. Create Validation Rules on Opportunity

### Rule 1: Require_Approval_Under_10_Physicians

```
AND(
  Account.Total_Physician_Count__c < 10,
  IsClosed,
  NOT(ISPICKVAL(Approval_Status__c, "Approved"))
)
```

**Error Message:** "This opportunity cannot be closed. Approval is required for accounts with fewer than 10 physicians."

**Error Location:** Top of Page

---

### Rule 2: Require_Approval_Standard_PS_Model

```
AND(
  ISPICKVAL(Account.PS_Model__c, "Standard"),
  ISPICKVAL(Account.Account_Segment__c, "Commercial"),
  IsClosed,
  NOT(ISPICKVAL(Approval_Status__c, "Approved"))
)
```

**Error Message:** "This opportunity cannot be closed. Approval is required for Standard PS Model commercial accounts."

**Error Location:** Top of Page

---

## Field API Names to Confirm

Before building, confirm the actual API names for these existing Account fields:
- Total Physician Count → `Total_Physician_Count__c` or ?
- PS Model → `PS_Model__c` or ?
- Account Segment → `Account_Segment__c` or ?

---

## Summary Checklist

- [ ] Create 5 custom fields on Opportunity
- [ ] Create Screen Flow "Request Commercial Approval"
- [ ] Create Dynamic Action button with visibility rules
- [ ] Add button to Opportunity page layout
- [ ] Create validation rule: Require_Approval_Under_10_Physicians
- [ ] Create validation rule: Require_Approval_Standard_PS_Model
- [ ] Test in sandbox
