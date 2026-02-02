---
name: process-meeting
description: Process meeting transcripts into actionable items. Use when user says "process meeting", "process transcript", or has a meeting transcript to work through.
---

# Process Meeting

Transform meeting transcripts into actionable work: Asana tasks, project docs, and captured decisions.

## When to Use

Recognize processing intent when user:
- Says "process meeting" or "process transcript"
- Drops a meeting transcript
- Asks to extract action items from a meeting
- Mentions a meeting that needs processing

## Configuration

```
MEETING_NOTES_DIR: /Users/chris/work/meeting_notes
INBOX: /Users/chris/work/meeting_notes/inbox
PROCESSED: /Users/chris/work/meeting_notes/processed
SUMMARIES: /Users/chris/work/meeting_notes/summaries
```

## Workflow

### 1. Find Transcript

If user says "process meeting" without specifics:
```bash
ls /Users/chris/work/meeting_notes/inbox/
```
Process the most recent file.

If user specifies a file or pastes content, use that.

### 2. Rename File (If Needed)

If file doesn't follow naming convention:
- Extract date from transcript content
- Extract meeting name/topic
- Rename to `YYYY-MM-DD-meeting-name.md`

### 3. Extract Items

Read transcript and categorize into:

**Action Items** — Explicit commitments, to-dos
- Look for: "I'll", "we need to", "action item", "TODO", "follow up"
- Note WHO owns each item

**Decisions** — Things that got resolved
- Look for: "we decided", "agreed", "let's go with", "the plan is"

**Open Questions** — Needs follow-up or clarification
- Look for: "need to figure out", "unclear", "question", "TBD"

**Projects/Initiatives** — Bigger themes needing planning
- Multi-meeting efforts, strategic initiatives

**FYIs** — Important context, no action needed
- Updates, status reports, background info

### 4. Interactive Triage

Present each extracted item to user:

```
## Action Items Found

1. "Set up meeting with Reba about finance approvals"
   → [Task] [Project] [Note] [Skip]

2. "Update the Tray workflow to handle rejection case"
   → [Task] [Project] [Note] [Skip]
```

For each item, user decides:
- **Task** → Create in Asana
- **Project** → Start planning doc in `/Users/chris/work/projects/`
- **Note** → Capture in summary only
- **Skip** → Not worth tracking

### 5. Create Asana Tasks

For items marked as Task:

```
Use mcp__asana__asana_create_task with:
- workspace: 1135694209242791
- assignee: 1210002869511639 (me)
- name: [Task title]
- notes: |
    From meeting: [Meeting name]
    Date: [Meeting date]

    [Original context from transcript]

    ---
    Source: [Link to transcript file]
```

User handles project placement after creation.

### 6. Check for Existing Tasks

Before creating, search Asana for similar tasks:
```
Use mcp__asana__asana_search_tasks
```

If match found, offer to:
- **Append** context to existing task (add as comment)
- **Create anyway** as new task
- **Skip** if already covered

### 7. Create Summary

Save to `/Users/chris/work/meeting_notes/summaries/YYYY-MM-DD-meeting-name.md`:

```markdown
---
date: YYYY-MM-DD
participants: [Names mentioned]
type: [sync/planning/review/etc]
tags: [relevant tags]
---

# [Meeting Name] - [Date]

## Summary
[2-3 sentence overview of the meeting]

## Decisions Made
> [!info] Decision 1
> [Description of what was decided]

> [!info] Decision 2
> [Description]

## Action Items
> [!todo] Task Title
> Owner: [Person]
> Asana: [Link if created]

## Open Questions
> [!warning] Question
> [What needs to be figured out]

## Notes
[Any other important context]

---
*Processed from: [[processed/YYYY-MM-DD-meeting-name]]*
```

### 8. Move Transcript

```bash
mv /Users/chris/work/meeting_notes/inbox/[filename] \
   /Users/chris/work/meeting_notes/processed/
```

### 9. Confirm Completion

Tell user:
- Tasks created (with links)
- Summary location
- Any open questions flagged

## Learned Patterns

From CLAUDE.md:
- First half of team syncs may be context-only (not Chris-relevant) — user will indicate where to start
- Some items map to existing Asana tasks — search before creating, append context
- "Key moments" and similar foundational work may be separate builds
- Projects (deep dives) vs Tasks (multi-faceted work) — user will clarify

## Rules

- **Ask before creating** — User approves each task
- **Search before creating** — Check for existing Asana tasks
- **Link back to source** — Always include transcript link in task notes
- **Use Obsidian features** — Callouts, wiki links, YAML frontmatter
- **Don't over-extract** — Not everything is an action item
- **Respect ownership** — Only create tasks assigned to user; note other people's items in summary

## Permissions

Claude has permission to:
- Rename files based on transcript content
- Move files between inbox/ and processed/
- Create Asana tasks with subtasks, dependencies, and notes
- Update existing Asana tasks (append context from meetings)
- Create project folders in `/Users/chris/work/projects/`
- Git commit after processing
