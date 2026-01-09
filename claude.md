# Claude Code Context

## MCP Servers

### Asana
- **Workspace**: abridge.com (ID: `1135694209242791`)
- **User**: Chris Humphries (ID: `1210002869511639`)
- **Main Project**: RevOps & Systems/Analytics Request & Backlog Board (ID: `1209756254866607`)

### Zapier (Notion + Google Calendar)
- **Notion Database**: AI Meeting Notes (ID: `2a9c967bdf0980dd9fe2ff3e33203734`)
  - Properties: Name (title with date), Action Items (rich_text)
  - Note: Transcription blocks inside pages are not accessible via API
- **Google Calendar**: chris.humphries@abridge.com

---

## Daily Planning Workflow

When user says "plan my day" or similar:

### 1. Gather Data
- **Calendar**: Get today's events from Google Calendar
- **Asana**: Get tasks due in next 2-3 days assigned to "me"
- **Notion**: Get recent meeting notes (last 1-2 days) with action items

### 2. Write Daily Plan
- Save to `/Users/chris/obsidian/Daily Plans/YYYY-MM-DD-daily-plan.md`
- Include:
  - Today's schedule with meeting prep notes
  - Asana tasks (next 2-3 days)
  - Recent meeting action items from Notion
  - **Analog Card section** (see below)

### 3. Generate Analog Card
- Start with **3 focused tasks** for Ugmonk Analog Today card (under-promise, over-deliver)
- User can say "give me more" or "what's next" to get additional tasks
- Pull from: Asana tasks due today/tomorrow, meeting prep, high-priority Notion items
- Prioritization order:
  1. Hard deadlines / due today
  2. Meeting prep needs
  3. "Highest priority" items from meetings
  4. Quick wins that unblock others

### Important: Keep Daily Plan File Updated
- The daily plan file (`/Users/chris/obsidian/Daily Plans/YYYY-MM-DD-daily-plan.md`) is the source of truth
- **Always update the file** when:
  - Analog card changes (new priorities, completed items, replanning)
  - Tasks are added/completed
  - Schedule changes
  - Mid-day replanning based on time remaining
- User refers to this file throughout the day

### 4. Reconcile Notion → Asana
- Compare Notion action items against Asana tasks
- Present untracked items to user for review
- For each item, user decides:
  - **Yes** - Add to Asana
  - **No** - Don't track formally
  - **Already covered** - Part of existing task
  - **Combine** - Group with another item
- With approval, create Asana tasks:
  - Assign to "me"
  - User handles project organization
  - Can add as subtasks to existing tasks when appropriate
  - **Always include Notion page link** in task notes for traceability

---

## Close Up Shop Workflow

When user says "close up shop" or similar at end of day:

### 1. Read Current Daily Plan
- Load today's daily plan file as the baseline
- This shows what was planned and last known state

### 2. Check the Delta (Gap Since Last Update)
- **Notion**: Only check for NEW meeting notes since the daily plan was last updated
- **Asana**: Check for any task updates or new items since morning
- Skip anything already captured in the daily plan

### 3. Quick Reconcile (New Items Only)
- If new Notion action items exist, present for Asana tracking (same Yes/No/Already covered flow)
- Only reconcile the gap, not the full day

### 4. Update Daily Plan with End of Day Section
Add to the daily plan file:
- **Completed**: What got done today
- **Carried Forward**: Incomplete items moving to tomorrow
- **Tomorrow's Head Start**: 1-2 priority items for first thing
- **Notes**: Any context for tomorrow-me

### 5. Closure
- Daily plan file is now "closed" for the day
- Incomplete Analog items mentally move to Next card
- Clean break from work

---

## Key Asana Tasks (Reference)

These tasks often have subtasks added from meeting action items:
- `1212678343509925` - Planhat SFDC Integration User
- `1212678343509927` - HockeyStack Integration User
- `1212660736378965` - LaunchDarkly <> Slack (due Jan 30)
- `1212638428440720` - Launch Next Steps Hygiene In CW

---

## Commands

| Command | Action |
|---------|--------|
| **plan my day** | Full workflow: calendar, Asana, Notion, Analog card, reconciliation |
| **reconcile** | Just compare Notion → Asana and add tasks with approval |
| **what's next** | Get additional tasks after completing Analog card items |
| **close up shop** | End of day: check delta since last update, reconcile new items, close out daily plan |

---

## Time Context

- I know today's date from system context
- I do NOT have real-time clock access
- User will tell me current time when replanning mid-day
- User typically works until ~4:30 PM CT

---

## Ugmonk Analog System

- Physical card-based task management (3"x5" cards)
- **Today cards**: Max 10 tasks, but we start with **3** (under-promise, over-deliver)
- **Next cards**: On-deck tasks for later
- **Someday cards**: Ideas/aspirations
- The Analog Card section in the daily plan is what user writes on physical card

---

## Notes

- Notion action items are captured automatically from meetings via AI
- They may not exist in Asana yet - reconciliation ensures nothing falls through
- User reviews and approves before any Asana tasks are created
- Tasks assigned to user only; user manages project placement
- Always link Asana tasks back to source Notion page
