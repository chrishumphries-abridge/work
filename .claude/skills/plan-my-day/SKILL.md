---
name: plan-my-day
description: Creates a daily plan by pulling tasks from Asana, calendar events from Google Calendar, and action items from Notion meeting notes. Use when the user says "plan my day", "what's on my plate", or wants to organize their work for the day.
---

# Plan My Day

A daily planning workflow that aggregates work across Asana, Google Calendar, and Notion into one unified plan with a physical Analog card output.

## Data Sources

### Asana
- **Workspace**: abridge.com (ID: `1135694209242791`)
- **User**: Chris Humphries
- Fetch tasks due in next 2-3 days assigned to "me"
- Use `mcp__asana__asana_search_tasks` with `assignee_any: "me"`, `completed: false`

### Google Calendar (via Zapier)
- **Calendar**: chris.humphries@abridge.com
- Fetch today's events
- Use `mcp__zapier__google_calendar_find_events`

### Notion (via Zapier)
- **Database**: AI Meeting Notes (ID: `2a9c967bdf0980dd9fe2ff3e33203734`)
- Fetch recent meeting notes (last 1-2 days) with action items
- Use `mcp__zapier__notion_query_data_source_advanced`
- Note: Transcription blocks inside pages are not accessible via API

## Workflow Steps

### 1. Gather Data
Pull from all three sources in parallel.

### 2. Write Daily Plan File
Save to `/Users/chris/obsidian/Daily Plans/YYYY-MM-DD-daily-plan.md`

Include:
- **Today's Schedule**: Calendar events with Zoom links and meeting prep notes
- **Asana Tasks (Next 3 Days)**: Grouped by due date
- **Recent Meeting Action Items**: From Notion, last 1-2 days
- **Analog Card**: Top 3 tasks (see below)

### 3. Generate Analog Card
For the Ugmonk Analog physical card system:
- Start with **3 focused tasks only** (under-promise, over-deliver)
- User can say "what's next" to get additional tasks
- Prioritization order:
  1. Hard deadlines / due today
  2. Meeting prep needs
  3. "Highest priority" items from meetings
  4. Quick wins that unblock others

### 4. Reconcile Notion → Asana
Compare Notion action items against Asana tasks and present untracked items:

1. Show items that don't appear to have Asana coverage
2. For each, user decides: Yes / No / Already covered / Combine
3. With approval, create Asana tasks:
   - Assign to "me"
   - Can add as subtasks to existing tasks
   - **Always include Notion page link** in notes for traceability

## Important Rules

### Keep Daily Plan File Updated
The daily plan file is the source of truth. Always update it when:
- Analog card changes
- Tasks are added/completed
- Schedule changes
- Mid-day replanning

### Time Context
- I know today's date from system context
- I do NOT have real-time clock access
- User will tell me current time when replanning mid-day
- User typically works until ~4:30 PM CT

### Task Creation
- Always get user approval before creating Asana tasks
- Always link back to source Notion page
- User handles project organization in Asana

## Commands

| Trigger | Action |
|---------|--------|
| **plan my day** | Full workflow: gather data, write plan, generate Analog card, reconcile |
| **reconcile** | Just compare Notion → Asana and add tasks with approval |
| **what's next** | Get additional tasks after completing Analog card items |

## Key Asana Tasks (Reference)

These tasks often have subtasks added from meeting action items:
- `1212678343509925` - Planhat SFDC Integration User
- `1212678343509927` - HockeyStack Integration User
- `1212660736378965` - LaunchDarkly <> Slack
- `1212638428440720` - Launch Next Steps Hygiene In CW

## Example Output

### Analog Card
```
1. Ramon meeting @ 2pm - push Salesforce changes
2. Create HockeyStack Salesforce integration user
3. HockeyStack meeting @ 3pm
```

*If time after 3:30: Next Steps feature*
