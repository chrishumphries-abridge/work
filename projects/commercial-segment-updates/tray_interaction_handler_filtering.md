# Tray Interaction Handler Filtering

The Slack interaction trigger receives ALL interactions from your Slack app. You need to filter to only process commercial approval events.

---

## Two Interaction Types

| Type | When | Filter Field |
|------|------|--------------|
| `block_actions` | User clicks Approve/Reject button | `$.result.actions[0].action_id` |
| `view_submission` | User submits the notes modal | `$.result.view.callback_id` |

---

## Filter Logic

### Step 1: Branch by Interaction Type

```
$.result.type == "block_actions"  →  Handle button click
$.result.type == "view_submission"  →  Handle modal submit
DEFAULT  →  Ignore (not our interaction)
```

### Step 2a: Filter Button Clicks

Only process if `action_id` matches our buttons:

```
$.result.actions[0].action_id == "approve_commercial"
OR
$.result.actions[0].action_id == "reject_commercial"
```

**Extract from button click:**
| Data | Path |
|------|------|
| Action (approve/reject) | `$.result.actions[0].action_id` |
| Approval Record ID | `$.result.actions[0].value` |
| User who clicked | `$.result.user.name` |
| Channel ID | `$.result.channel.id` |
| Message timestamp | `$.result.container.message_ts` |
| Trigger ID (for modal) | `$.result.trigger_id` |

### Step 2b: Filter Modal Submissions

Only process if `callback_id` matches our modal:

```
$.result.view.callback_id == "commercial_approval_notes"
```

**Extract from modal submit:**
| Data | Path |
|------|------|
| Notes text | `$.result.view.state.values.notes_block.notes_input.value` |
| Private metadata (JSON) | `$.result.view.private_metadata` |
| User who submitted | `$.result.user.name` |

**Private metadata contains** (set when opening modal):
```json
{
  "approval_record_id": "a0BXXXXXXXXXX",
  "action": "approve_commercial",
  "channel_id": "C0A855GEZ7F",
  "message_ts": "1769188576.254469"
}
```

---

## Workflow Structure

```
Trigger: Slack Interaction
    │
    ├─► Branch: $.result.type
    │
    ├─► "block_actions"
    │       │
    │       ├─► Filter: action_id in [approve_commercial, reject_commercial]
    │       │       │
    │       │       └─► Open Modal (views.open)
    │       │           - trigger_id: $.result.trigger_id
    │       │           - callback_id: "commercial_approval_notes"
    │       │           - private_metadata: JSON with approval_record_id, action, channel_id, message_ts
    │       │
    │       └─► ELSE: Stop (not our button)
    │
    ├─► "view_submission"
    │       │
    │       ├─► Filter: callback_id == "commercial_approval_notes"
    │       │       │
    │       │       ├─► Parse private_metadata (JSON)
    │       │       ├─► Update Salesforce Opportunity_Approval__c
    │       │       │   - Status__c: Approved/Rejected (based on action)
    │       │       │   - Approver__c: $.result.user.name
    │       │       │   - Notes__c: from modal input
    │       │       │   - Decision_Date__c: NOW()
    │       │       └─► Update Slack message (show decision)
    │       │
    │       └─► ELSE: Stop (not our modal)
    │
    └─► DEFAULT: Stop (unknown type)
```

---

## Modal Definition (for views.open)

When user clicks Approve/Reject, open this modal:

```json
{
  "type": "modal",
  "callback_id": "commercial_approval_notes",
  "private_metadata": "{\"approval_record_id\":\"{RECORD_ID}\",\"action\":\"{ACTION_ID}\",\"channel_id\":\"{CHANNEL}\",\"message_ts\":\"{TS}\"}",
  "title": {
    "type": "plain_text",
    "text": "Approval Notes"
  },
  "submit": {
    "type": "plain_text",
    "text": "Submit"
  },
  "close": {
    "type": "plain_text",
    "text": "Cancel"
  },
  "blocks": [
    {
      "type": "input",
      "block_id": "notes_block",
      "optional": true,
      "label": {
        "type": "plain_text",
        "text": "Add any notes (optional)"
      },
      "element": {
        "type": "plain_text_input",
        "action_id": "notes_input",
        "multiline": true,
        "placeholder": {
          "type": "plain_text",
          "text": "Enter any comments about this decision..."
        }
      }
    }
  ]
}
```

---

## Salesforce Update Mapping

| Salesforce Field | Source |
|------------------|--------|
| `Status__c` | `"Approved"` if action contains "approve", else `"Rejected"` |
| `Approver__c` | `$.result.user.name` |
| `Notes__c` | `$.result.view.state.values.notes_block.notes_input.value` |
| `Decision_Date__c` | Current timestamp |

---

## Example: Filtering in Tray Boolean Condition

**For button clicks:**
```
{$.result.type} == "block_actions"
AND
({$.result.actions[0].action_id} == "approve_commercial" OR {$.result.actions[0].action_id} == "reject_commercial")
```

**For modal submits:**
```
{$.result.type} == "view_submission"
AND
{$.result.view.callback_id} == "commercial_approval_notes"
```
