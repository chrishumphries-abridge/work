---
name: new-project
description: Scaffold a new project with standard structure. Use when the user says "new project", "start a project", or "create project for".
---

# New Project

Create a new project with consistent structure.

## When to Use

Recognize new project intent when user:
- Mentions starting something new that needs tracking
- Describes a body of work that doesn't fit existing projects
- Says they need to organize something

Examples:
- "I need to start working on the CRM cleanup"
- "there's this Q2 planning thing I should track"
- "new initiative around Slack bot migration"

**No command needed.** If they're describing new work that needs a home, offer to scaffold it.

## Scaffold Flow

### 1. Get Project Name
- Extract from user input or ask
- Convert to kebab-case for folder name: `crm-data-cleanup`

### 2. Create Structure

```
projects/{project-name}/
├── CLAUDE.md          # Project context (from template)
└── notes.md           # Working notes, captures
```

### 3. Initialize CLAUDE.md

Use template with placeholders filled:
- Project name
- Today's date
- Empty sections ready to fill

### 4. Offer Next Steps

- "Want to add an Asana task for this project?"
- "Any initial notes to capture?"

## Project CLAUDE.md Template

```markdown
# {Project Name}

## Summary

{One-line description - user fills in}

## Status

- **Created**: {date}
- **Status**: Active

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file - project context |
| `notes.md` | Working notes |

## Context

{Background, goals, stakeholders - user fills in}

## Open Questions

- {Questions to resolve}

## Session Log

### {date}: Project created

Initial setup.
```

## Rules

- **Minimal scaffolding** - don't over-structure empty projects
- **CLAUDE.md is required** - every project needs context
- **notes.md is optional** - created on first capture to project
