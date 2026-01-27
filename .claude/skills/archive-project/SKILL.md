---
name: archive-project
description: Archive a completed project while preserving context. Use when user says "archive project", "project is done", "close out project", or wants to move a finished project out of active view.
---

# Archive Project

Move completed projects out of active view while preserving learnings.

## When to Use

Recognize archive intent when user:
- Says a project is done/finished/shipped
- Mentions wrapping something up
- Asks to clean up a completed initiative

Examples:
- "va-intel is done"
- "we shipped the approval workflows"
- "that charter thing is wrapped up"
- "clean up the old projects"

**No command needed.** If they indicate something is finished, offer to archive it.

## Archive Flow

### 1. Confirm Project
- Verify project exists in `projects/`
- Show current status from CLAUDE.md

### 2. Capture Final State

Update project's CLAUDE.md with:
```markdown
## Archive Info

- **Archived**: {date}
- **Outcome**: {Shipped / Cancelled / Handed off / Merged}
- **Final notes**: {Any context for future reference}
```

### 3. Check for Loose Ends

- Any open Asana tasks linked to this project?
- Any unprocessed notes in project folder?
- Present findings and ask what to do

### 4. Move to Archive

```bash
mv projects/{project-name} archive/{project-name}
```

### 5. Update References

- Check if main CLAUDE.md references this project in Active Projects
- Remove from Active Projects section

### 6. Confirm

"Archived {project-name}. Context preserved in archive/{project-name}/CLAUDE.md"

## Archive Folder

`archive/` holds completed projects:
- Full folder structure preserved
- CLAUDE.md has archive metadata
- Searchable for future reference

## Rules

- **Always preserve CLAUDE.md** - it's the institutional memory
- **Check for loose ends** - don't archive with open tasks
- **Record the outcome** - was it shipped, cancelled, or what?
- **Keep it findable** - archive is searchable, not deleted
