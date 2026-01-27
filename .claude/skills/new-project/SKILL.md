---
name: new-project
description: Scaffold a new project with standard structure. Use when the user says "new project", "start a project", or "create project for".
---

# New Project

Create a new project with consistent structure.

## Usage

User says something like:
- "new project: CRM data cleanup"
- "start a project for the Q2 planning initiative"
- "create project for Slack bot migration"

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
