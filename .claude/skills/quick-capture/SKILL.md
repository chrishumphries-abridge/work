---
name: quick-capture
description: Quickly capture an idea, note, or task without friction. Use when the user says "capture", "jot down", "quick note", "remember this", or wants to dump a thought.
---

# Quick Capture

Frictionless capture of ideas, notes, and tasks into the second brain.

## Usage

User says something like:
- "capture: idea for improving the forecast module"
- "quick note: Ramon mentioned Q2 budget review"
- "jot down: check if HockeyStack supports custom events"
- "remember this: API rate limit is 100/min"

## Capture Flow

### 1. Parse the Input
Extract:
- **Content**: The actual note/idea
- **Context**: Any project or topic it relates to (if obvious)
- **Type**: idea, task, note, question, or reference

### 2. Determine Destination

| If... | Then save to... |
|-------|-----------------|
| Clearly relates to active project | `projects/{project}/notes.md` |
| Is a task/action item | Ask if user wants Asana task |
| General idea or unclear | `_capture/YYYY-MM-DD.md` |

### 3. Write the Capture

Format:
```markdown
## HH:MM - {type}

{content}

{context if any}
```

### 4. Confirm
Brief confirmation: "Captured to {location}"

## Capture Inbox

`_capture/` folder holds daily capture files:
- `_capture/2026-01-27.md` - today's captures
- Reviewed during daily planning or weekly close-out
- Items get processed into proper homes or deleted

## Rules

- **Never ask clarifying questions** - just capture it
- **Bias toward speed** - refinement happens later
- **Include timestamp** - helps with context when reviewing
- **Don't create Asana tasks** without explicit ask
