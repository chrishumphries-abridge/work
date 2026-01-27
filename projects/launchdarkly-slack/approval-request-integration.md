# LaunchDarkly <> Slack Integration

## Goal

Enable Slack users to submit approval requests to add a single user to a LaunchDarkly feature flag. An approver can then review and approve the request.

## Use Case Flow

```
1. User in Slack submits request (slash command or form)
   - Specifies: target user ID, feature flag, environment

2. Backend creates LaunchDarkly approval request via API
   - Adds user to flag targets (draft state, pending approval)

3. Approver reviews and approves in LaunchDarkly UI
   - LD handles notifications, approval workflow, and applying changes
```

**Scope**: Slack is input only. All approval workflow happens natively in LaunchDarkly.

## LaunchDarkly API

### Create Approval Request

```
POST /api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests

Headers:
  Authorization: <API_KEY>
  Content-Type: application/json

Body:
{
  "description": "Add user abc123 to feature-x",
  "instructions": [
    {
      "kind": "addTargets",
      "variationId": "<variation-id-for-true>",
      "values": ["abc123"]
    }
  ],
  "notifyMemberIds": ["approver-member-id"],
  "comment": "Requested via Slack by @requester"
}
```

### Response (201)
```json
{
  "_id": "approval-request-id",
  "reviewStatus": "pending",
  "status": "pending",
  ...
}
```

## Key API Details

| Field | Purpose |
|-------|---------|
| `instructions[].kind` | `addTargets` to add user to variation |
| `instructions[].variationId` | Which variation (true/false) to add user to |
| `instructions[].values` | Array of user IDs to add |
| `notifyMemberIds` | LaunchDarkly member IDs to request approval from |

## Open Questions

- [ ] What triggers the Slack request? Slash command? Workflow Builder form?
- [ ] Which flags/environments are in scope?
- [ ] Who are the LD approvers? (need their LaunchDarkly member IDs for `notifyMemberIds`)
- [ ] What user identifier format? (email, internal ID, etc.)
- [ ] Does Tray have a native LaunchDarkly connector, or use HTTP connector?

## Implementation

### Tray.io Workflow
1. Slack input (slash command or Workflow Builder form)
2. Tray webhook receives: user ID, flag key, environment
3. Tray calls LaunchDarkly "Create Approval Request" API
4. Approver handles approval in LaunchDarkly UI

### Tray Requirements
- LaunchDarkly connector (or HTTP connector with API key)
- Slack trigger (webhook or Slack connector)
- Likely need: lookup step to get variation ID from flag key

## Related

- Asana task: `1212660736378965` (LaunchDarkly <> Slack)
- Subtask: `1212682625239577` (Explore LaunchDarkly API capabilities)

## Sources

- [Requesting approvals](https://launchdarkly.com/docs/home/releases/approval-requests)
- [Create approval request API](https://launchdarkly.com/docs/api/approvals/post-approval-request-for-flag)
- [Semantic patch instructions](https://launchdarkly.com/docs/api/feature-flags/patch-feature-flag)
- [Approval configuration](https://launchdarkly.com/docs/home/releases/approval-config)
