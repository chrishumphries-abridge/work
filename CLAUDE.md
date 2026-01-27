# Claude Code Context

## MCP Servers

### Asana
- **Workspace**: abridge.com (ID: `1135694209242791`)
- **User**: Chris Humphries (ID: `1210002869511639`)
- **Main Project**: RevOps & Systems/Analytics Request & Backlog Board (ID: `1209756254866607`)

### Zapier (Notion + Google Calendar) — FUTURE SETUP
- **Notion Database**: AI Meeting Notes (ID: `2a9c967bdf0980dd9fe2ff3e33203734`)
  - Properties: Name (title with date), Action Items (rich_text)
  - Note: Transcription blocks inside pages are not accessible via API
- **Google Calendar**: chris.humphries@abridge.com
- *Currently not configured — user will set up later*

### GitHub (Backup)
- **Repo**: `chrishumphries-abridge/obsidian` (private)
- Push regularly to keep work backed up

---

## Daily Planning Workflow

When user says "plan my day" or similar:

### 1. Gather Data
- **Calendar**: Get today's events from Google Calendar
- **Asana**: Get tasks due in next 2-3 days assigned to "me"
- **Notion**: Get recent meeting notes (last 1-2 days) with action items
- **Capture inbox**: Check `_capture/` for yesterday's quick captures

### 2. Write Daily Plan
- Save to `/Users/chris/work/Daily Plans/YYYY-MM-DD-daily-plan.md`
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
- The daily plan file (`/Users/chris/work/Daily Plans/YYYY-MM-DD-daily-plan.md`) is the source of truth
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

### 5. Git Backup
- Commit any new/changed files
- Push to GitHub (private repo: `chrishumphries-abridge/obsidian`)
- Ensures all work is safely backed up

### 6. Closure
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

## How to Use This

**Just talk naturally.** I'll figure out what to do.

| You say something like... | I do... |
|---------------------------|---------|
| "plan my day" | Run daily planning workflow |
| "close up shop" | End of day close-out |
| "Reba mentioned budget concerns" | Capture it |
| "what do I know about HockeyStack?" | Search everything |
| "start a project for the CRM cleanup" | Scaffold new project |
| "va-intel is done" | Archive it |
| "it's Friday" / "close out week" | Weekly close-out |
| "monthly review" | System maintenance |

**No special syntax needed.** If you dump a thought, I capture it. If you ask a question, I search. If you mention finishing something, I archive.

---

## Weekly Close-Out Workflow (Fridays)

When user says "close out week" or similar on Friday:

### 1. Analyze the Week
- Pull tasks modified this week from Asana (`modified_on_after`)
- Check task stories to find **deferred tasks** (due_date_changed events)
- Check task dependencies to find **blocked tasks** and their owners
- Count completions for wins section

### 2. Update Daily Plan with Close-Out Section
Add to Friday's daily plan:
- **Wins this week** — what actually shipped (grouped by theme, not raw task list)
- **Not completed** — what's carrying forward
- **Deferred this week** — table: task, from date, to date
- **Blocked tasks** — table: task, blocker, owner

### 3. Create Weekly Report
- Save to `/Users/chris/work/Weekly Reports/YYYY-WXX-weekly-report.md`
- Include: summary, shipped items, completed count, deferred table, blocked table, next week focus

### 4. Create Next Week Plan
- Save to `/Users/chris/work/Daily Plans/YYYY-WXX-weekly-plan.md`
- **Priority order: unfinished → deferred → new**
- Day-by-day breakdown (Mon-Fri only — user doesn't work weekends)
- Sunday due dates = Monday in practice
- Flag blocked tasks with owner and suggested action
- Monday Analog Card ready to go

### 5. Cleanup
- Move loose project docs to appropriate `projects/` subfolder
- Delete stray screenshots
- Check for duplicate folder structures
- Git commit and push

---

## Monthly Review Workflow

When user says "monthly review" (or first Friday of month):

### 1. Review Capture Inbox
- Check `_capture/` for unprocessed items
- For each: move to project, create task, or delete
- Goal: empty inbox

### 2. Review Projects
- List all projects in `projects/`
- For each, ask: Active? Stalled? Done?
- **Active**: Keep, update CLAUDE.md if needed
- **Stalled**: Discuss blockers, decide to push or archive
- **Done**: Run archive workflow

### 3. Prune Reference
- List files in `reference/` older than 60 days
- For each: still useful? Delete or keep?
- Move any project-specific docs to their project folders

### 4. Review Active Projects Section
- Update the Active Projects section in this file
- Remove archived projects
- Add any new projects

### 5. System Health Check
- Any skills not working well? Adjust.
- Any new patterns emerging? Document.
- Git commit and push

---

## File Structure

```
work/
├── CLAUDE.md              # This file - main context
├── _capture/              # Quick capture inbox (daily files)
├── Daily Plans/           # Daily plans + weekly plans
├── Weekly Reports/        # Friday close-out reports
├── meeting_notes/         # Meeting transcript processing (has own CLAUDE.md)
├── projects/              # Active projects (each has own CLAUDE.md)
├── archive/               # Completed projects (preserved with context)
├── resource_requests/     # Slack block templates
├── reference/             # One-off docs, guides, templates
│   └── templates/         # Project templates
├── Reviews/               # Performance reviews
└── .claude/skills/        # Custom skills
```

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

---

## External Dependencies & Gotchas

### OpenAI API Keys
- Dev team periodically rotates/deletes OpenAI API keys
- This breaks Tray workflows that use OpenAI (e.g., VA Intel LLM vetting)
- No alerting currently in place — discovered when workflow fails
- Task to address: `1212722772937719` (due Jan 24)

### Tray.io Workflows
- VA Intel pipeline has 6 workflows across 3 layers (capture → process → output)
- Layer 2 (LLM vetting) depends on OpenAI API
- If digest stops working, check OpenAI key first

---

## Session Startup

**At the start of each session**, proactively:
1. Read today's daily plan (`Daily Plans/YYYY-MM-DD-daily-plan.md`) if it exists
2. Check active project docs for any in-progress work (see Active Projects below)
3. Review recent git commits to understand what changed recently

This prevents the user from having to re-explain context. Come prepared.

---

## Active Projects Context

Check each project's CLAUDE.md for current status and context.

### VA Intel Slack Digest
- **Docs**: `projects/va-intel/VA-Intel-Slack-Digest-Options.md` ← **check Build Status section**
- **Sources**: Orange Slices, Reddit (3 subs), veterans.house.gov, LinkedIn (Shulkin, Paul)
- **Architecture**: Layer 1 (capture) → Layer 2 (LLM vetting) → Layer 3 (daily digest via Slack Canvas)
- **Dependency**: OpenAI API key for LLM vetting

### Commercial Segment Approval Workflows
- **Docs**: `projects/commercial_segment_updates/CLAUDE.md` ← **full project context**
- **Summary**: SFDC approval workflows for small deals (<10 physicians) and Standard PS Model
- **Components**: SFDC flows + Tray.io webhooks + Slack Block Kit

### AI Charter Roadmap
- **Docs**: `projects/ai_charter_roadmap/`
- **Summary**: AI capability roadmap presentation for leadership

### Buying Group Scoring
- **Docs**: `projects/buying-group-scoring/`
- **Summary**: Scoring model for buying group engagement

### Meeting Notes Processing
- **Docs**: `meeting_notes/CLAUDE.md`
- **Summary**: Workflow for processing meeting transcripts into action items
