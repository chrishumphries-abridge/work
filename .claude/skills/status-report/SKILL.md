---
name: status-report
description: Generate manager-ready status updates from Asana data. Use when user says "what did I ship", "status update", "I need to update my manager", "what have I been working on", or before 1:1 meetings.
---

# Status Report

Generate professional status updates from Asana task data, translated into business impact terms.

## When to Use

**Explicit triggers:**
- `/status-report`, `/update`, `/status`
- "status report"
- "what did I ship"

**Natural triggers:**
- "I need to update my manager"
- "what have I been working on"
- "prep for my 1:1"
- "weekly update"

**Proactive triggers:**
- End of week (Friday)
- Before 1:1 meetings (if mentioned)
- When asked to summarize recent work

## Workflow

### 1. Determine Time Period
Ask if not clear:
- This week (default)
- Last 2 weeks
- This month
- Custom range

### 2. Pull Asana Data

**Completed tasks:**
```
mcp__asana__asana_search_tasks
- workspace: 1135694209242791
- assignee_any: me
- completed: true
- completed_on.after: [start_date]
```

**In-progress tasks:**
```
mcp__asana__asana_search_tasks
- workspace: 1135694209242791
- assignee_any: me
- completed: false
```

**Get task details for context:**
```
mcp__asana__asana_get_task
- task_gid: [from search results]
```

### 3. Group by Theme
Don't list raw tasks - group by:
- Project/Initiative
- Business area
- Type of work (shipping, unblocking, planning)

### 4. Add Business Impact
Translate technical work to value:
- "Created SFDC integration user" → "Enabled marketing attribution tracking"
- "Fixed Tray workflow" → "Restored automated lead routing"
- "Built Slack approval flow" → "Reduced approval cycle time"

### 5. Note Blockers
For anything stuck:
- What's blocked
- Who/what is blocking it
- What action is needed

### 6. Generate Narrative
Write 2-3 sentences suitable for:
- Manager updates
- Team standups
- Stakeholder communication

## Output Format

```markdown
## Status Report: [Date Range]

### Summary
[2-3 sentence narrative covering the period's highlights and focus areas]

### Shipped
- **[Theme 1]:** [What was delivered] — [Business impact]
- **[Theme 2]:** [What was delivered] — [Business impact]
- **[Theme 3]:** [What was delivered] — [Business impact]

### In Progress
| Initiative | Status | Expected |
|------------|--------|----------|
| [Project] | [Current state] | [Target date] |
| [Project] | [Current state] | [Target date] |

### Blocked
| Item | Blocker | Owner | Action Needed |
|------|---------|-------|---------------|
| [Task] | [What's blocking] | [Who can unblock] | [Specific ask] |

### Metrics
- Tasks completed: [X]
- Projects advanced: [Y]
- Items unblocked: [Z]

### Next Week Focus
- [Priority 1]
- [Priority 2]
- [Priority 3]
```

## Example

```markdown
## Status Report: Jan 20-24, 2025

### Summary
Focused on integration infrastructure this week, enabling two key vendor integrations (HockeyStack, Planhat) that marketing and CS have been waiting on. Also unblocked the LaunchDarkly approval workflow that was stalled.

### Shipped
- **Vendor Integrations:** Created and configured Salesforce integration users for HockeyStack and Planhat — Marketing can now see campaign attribution; CS can see health scores in Salesforce
- **Approval Automation:** Built Slack-triggered LaunchDarkly approval flow — Team leads can now approve feature flag access without IT tickets
- **Data Quality:** Implemented Next Steps hygiene automation — Reduces manual CRM cleanup by ~2 hours/week

### In Progress
| Initiative | Status | Expected |
|------------|--------|----------|
| Commercial segment workflows | SFDC flows built, testing Tray webhooks | Jan 31 |
| VA Intel digest | Layer 2 (LLM vetting) needs API key fix | Blocked |

### Blocked
| Item | Blocker | Owner | Action Needed |
|------|---------|-------|---------------|
| VA Intel digest | OpenAI API key rotated | Dev team | Need new key added to Tray |

### Metrics
- Tasks completed: 8
- Projects advanced: 3
- Items unblocked: 2

### Next Week Focus
- Complete Commercial segment approval flows
- Resolve VA Intel API key blocker
- HockeyStack validation with Marketing
```

## Tone Guidelines

**Do:**
- Use active voice ("Shipped X" not "X was completed")
- Lead with impact, not task names
- Be specific about what was delivered
- Acknowledge blockers honestly

**Don't:**
- List every small task
- Use jargon without context
- Hide problems or delays
- Over-promise on timelines

## Variations

### Quick Update (Slack/standup)
Shorter format for casual updates:
```
This week: Shipped HockeyStack + Planhat integrations, built LD approval flow
In progress: Commercial segment workflows (testing)
Blocked: VA Intel needs API key from dev team
```

### Manager 1:1 Prep
Add discussion points:
```markdown
### Discussion Points
- Need decision on [X]
- Want to flag [risk/concern]
- Opportunity to [suggestion]
```

### Stakeholder Update
Focus on their area of interest:
```markdown
## Marketing Systems Update

### Completed
- HockeyStack integration live — you can now pull attribution data

### Coming Soon
- Campaign performance dashboard (next week)

### Need From You
- Confirmation of which SFDC fields to expose
```

## Key Principles

- **Impact over activity** - What changed for the business?
- **Group intelligently** - Themes, not task lists
- **Be honest about blockers** - Visibility enables help
- **Appropriate detail** - Match depth to audience
