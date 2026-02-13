# Meeting Notes Processing

#workflow #meeting-notes

## Purpose

Transform raw meeting transcripts into actionable work: tasks, projects, and documented decisions.

## Workflow

### 1. Add Transcript
- Copy transcript from Notion AI into a new markdown file
- Save in `inbox/` with any name
- Claude will rename to `YYYY-MM-DD-meeting-name.md` based on content

### 2. Process Meeting
User says: "process meeting" or "process [filename]"

Claude will:
1. Read the transcript
2. Extract items into categories:
   - **Action Items** — explicit commitments, to-dos
   - **Decisions** — things that got resolved
   - **Open Questions** — needs follow-up or clarification
   - **Projects/Initiatives** — bigger themes needing planning
   - **FYIs** — important context, no action needed

### 3. Interactive Triage
For each extracted item, user decides:
- **Task** → Create in Asana (assigned to me, linked to transcript)
- **Project** → Start planning doc in `/Users/chris/work/projects/`
- **Note** → Capture in summary only
- **Skip** → Not worth tracking

### 4. Complete Processing
- Summary saved to `summaries/YYYY-MM-DD-meeting-name.md`
- Transcript moved from `inbox/` to `processed/`
- All tasks created in Asana with source links

## File Structure

```
meeting_notes/
├── inbox/           # Raw transcripts to process
├── processed/       # Completed transcripts
├── summaries/       # Decisions and outcomes per meeting
└── CLAUDE.md        # This file
```

## Obsidian Features

Summaries use Obsidian-native features for better navigation:

- **YAML frontmatter**: date, participants, type, tags
- **Callouts**: `> [!info]`, `> [!warning]`, `> [!note]` for key items
- **Wiki links**: `[[filename|Display Text]]` for internal linking
- **Tags**: In frontmatter and inline where useful

### Callout Usage
- `[!info]` — Project docs, references
- `[!warning]` — Deadlines, time-sensitive items
- `[!note]` — Context, existing task updates
- `[!todo]` — Action items needing follow-up

## Asana Integration

- Workspace: abridge.com (`1135694209242791`)
- User: Chris Humphries (`1210002869511639`)
- Tasks created with:
  - Assignee: me
  - Notes: includes link back to transcript file
  - User handles project placement after creation

## Commands

| Command | Action |
|---------|--------|
| **process meeting** | Process most recent transcript in inbox |
| **process [filename]** | Process specific transcript |
| **what's in inbox** | List unprocessed transcripts |

## Permissions

Claude has permission to:
- **Rename files** based on transcript content (date, topic extraction)
- **Move files** between inbox/ and processed/
- **Create Asana tasks** with subtasks, dependencies, and notes
- **Update existing Asana tasks** (append context from meetings)
- **Delete duplicate Asana tasks** if created in error
- **Create project folders** in `/Users/chris/work/projects/`
- **Git operations**: add, commit (with Co-Authored-By)
- **Search Asana** to find existing tasks before creating duplicates

## Patterns (Evolving)

_This section will grow as we identify recurring patterns in meetings._

### Learned Patterns
- First half of team syncs may be context-only (not Chris-relevant) — user will indicate where to start
- Some items map to existing Asana tasks — search before creating, append context
- "Key moments" and similar foundational work may be separate builds that feed into larger initiatives
- Projects (deep dives) vs Tasks (multi-faceted work) — user will clarify

<!-- Add patterns here as we discover them -->
