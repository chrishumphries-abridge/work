---
name: look-ahead
description: Surface upcoming work, prep needs, and early warnings. Use when user says "what's coming up", "what should I prepare for", "anything on my radar", "upcoming", or on Monday mornings / before planning sessions.
---

# Look Ahead

Proactively surface upcoming deadlines, dependencies, and early warnings.

## When to Use

**Explicit triggers:**
- `/look-ahead`, `/upcoming`, `/radar`
- "look ahead"
- "what's on my radar"

**Natural triggers:**
- "what's coming up"
- "what should I prepare for"
- "anything I'm missing"
- "what's due soon"

**Proactive triggers:**
- Monday mornings
- Before planning sessions
- Start of month
- When user seems focused on immediate tasks only

## Workflow

### 1. Scan Asana - Next 2 Weeks

**Upcoming tasks:**
```
mcp__asana__asana_search_tasks
- workspace: 1135694209242791
- assignee_any: me
- completed: false
- due_on.before: [2 weeks out]
- sort_by: due_date
```

**Get details for context:**
```
mcp__asana__asana_get_task
- task_gid: [from search]
- opt_fields: dependencies,notes,due_on
```

### 2. Check Daily Plan
Read today's daily plan for:
- Meetings needing prep
- Commitments made
- In-progress work

### 3. Review Active Projects
Check project CLAUDE.md files for:
- Upcoming milestones
- Open questions
- Risks flagged

### 4. Identify Dependencies
For each upcoming item:
- Waiting on others?
- Blocked by something?
- Needs prep work?

### 5. Generate Radar
Categorize by urgency:
- **This week** - Needs attention now
- **Next week** - On radar, start prepping
- **Watching** - Potential issues ahead

## Output Format

```markdown
## Look Ahead: [Date]

### This Week (Urgent)
- [ ] **[Task]** - due [date]
  - [Any prep needed or context]
- [ ] **[Meeting]** - [date]
  - Prep: [what to prepare]
- [ ] **[Deadline]** - [date]
  - Status: [current state]

### Next Week (On Radar)
- [ ] **[Task]** - due [date]
- [ ] **[Milestone]** - [project] reaches [phase]
- [ ] **[Deliverable]** - [context]

### Dependencies / Waiting On

| Item | Waiting On | Owner | Follow-up Date |
|------|------------|-------|----------------|
| [Task] | [What's needed] | [Who] | [When to ping] |

### Early Warnings

- **[Project X]** - [Risk description]
  - Why: [Reasoning]
  - Mitigation: [What to do]

- **[Task Y]** - [Risk description]
  - Why: [Reasoning]
  - Mitigation: [What to do]

### Suggested Actions

1. **Start now:** [Task to begin early]
   - Reason: [Why not wait]

2. **Schedule:** [Meeting or time block needed]
   - Reason: [What it enables]

3. **Follow up:** [Person to ping]
   - Reason: [What's at risk if delayed]

### Calendar Gaps
[Any notable availability in the next 2 weeks good for deep work or scheduling]
```

## Example

```markdown
## Look Ahead: Monday, Jan 27

### This Week (Urgent)
- [ ] **LaunchDarkly Slack integration** - due Thu Jan 30
  - Status: Approval flow built, need to test with team lead
  - Prep: Schedule 15min test session with Sarah
- [ ] **Ramon 1:1** - Wed Jan 29 @ 2pm
  - Prep: Have Commercial segment demo ready
- [ ] **HockeyStack validation call** - Fri Jan 31 @ 3pm
  - Prep: Confirm integration user is working, pull test data

### Next Week (On Radar)
- [ ] **Commercial segment workflows** - target Feb 3
  - Tray webhook testing in progress
- [ ] **Monthly review** - first Friday of Feb
  - Start thinking about project cleanups
- [ ] **Q1 planning inputs due** - Feb 7
  - Need to draft priorities

### Dependencies / Waiting On

| Item | Waiting On | Owner | Follow-up Date |
|------|------------|-------|----------------|
| VA Intel digest | OpenAI API key | Dev team | Wed if no response |
| HockeyStack fields | Confirmation of required fields | Marketing | Today |

### Early Warnings

- **Commercial segment workflows** - Tight timeline if Tray testing reveals issues
  - Why: Only 3 working days before target
  - Mitigation: Do Tray testing today/tomorrow to leave buffer

- **Q1 planning** - Haven't started draft yet
  - Why: Due Feb 7, only 2 weeks away
  - Mitigation: Block 1 hour this week to outline

### Suggested Actions

1. **Start now:** Q1 planning draft
   - Reason: Needs thinking time, shouldn't be rushed

2. **Schedule:** LaunchDarkly test session
   - Reason: Blocker for Thursday deadline

3. **Follow up:** Marketing on HockeyStack fields
   - Reason: Validation call is Friday, need data before then

### Calendar Gaps
- Thursday PM looks open - good for deep work on Q1 planning
- Friday morning before HockeyStack call is free
```

## Risk Patterns to Flag

| Pattern | Warning |
|---------|---------|
| Multiple items due same day | Crunch risk - can anything move? |
| Dependencies on others near deadline | Follow up early |
| No progress on item for 3+ days | Stalled - what's blocking? |
| Meeting with no prep time before | Block prep time |
| End of month/quarter approaching | Check for reporting deadlines |
| Back-to-back meetings all week | When will work get done? |

## Quick Radar Format

For faster check-ins:

```markdown
## Quick Radar

**This week:** LaunchDarkly (Thu), Ramon 1:1 (Wed), HockeyStack (Fri)
**Waiting on:** API key (dev), field list (marketing)
**Watch out:** Commercial workflows timeline is tight
**Do today:** Follow up on HockeyStack fields
```

## Key Principles

- **Proactive, not reactive** - Surface issues before they're urgent
- **Dependencies are risks** - Anything waiting on others needs attention
- **Prep time is real time** - Block it or it won't happen
- **Early warnings enable action** - Flag risks while there's time to mitigate
- **Calendar gaps are valuable** - Protect time for deep work
