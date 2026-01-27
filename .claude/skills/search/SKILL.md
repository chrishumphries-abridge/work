---
name: search
description: Search across all notes, projects, and references in the second brain. Use when the user asks "what do I know about X", "find notes on", "search for", or wants to retrieve past information.
---

# Search

Find information across the entire second brain.

## When to Use

Recognize search intent when user:
- Asks what they know about something
- Asks where something is documented
- Asks about a person, project, or concept
- Seems to be looking for past information

Examples:
- "what do I know about HockeyStack?"
- "where did I put the API rate limits?"
- "Reba" (if context suggests looking for info)
- "that approval workflow thing"

**No command needed.** If they're asking about something that might be in their notes, search for it.

## Search Flow

### 1. Search All Locations

Search in priority order:
1. **Projects** - `projects/*/` (active work, most relevant)
2. **Meeting notes** - `meeting_notes/summaries/` and `meeting_notes/processed/`
3. **Daily/Weekly plans** - `Daily Plans/`, `Weekly Reports/`
4. **Reference** - `reference/`
5. **Capture inbox** - `_capture/`

### 2. Present Results

Group by location:
```
## Found in Projects

### commercial_segment_updates
- CLAUDE.md:45 - "Reba is Finance approver for Level 2"
- slack_blocks_small_deal_l2.json - mentions Reba

### va-intel
- (no matches)

## Found in Meeting Notes

### 2026-01-27-revops-q4-retro
- Line 23: "Reba flagged budget concerns"

## Found in Reference

- (no matches)
```

### 3. Offer Next Steps

- "Want me to read any of these in detail?"
- "Should I search for related terms?"

## Search Tips

- Use Grep tool with pattern matching
- Search both filenames and content
- For people's names, also check Asana tasks
- For projects, check the CLAUDE.md first for summary

## Rules

- **Show context** - include surrounding lines, not just matches
- **Rank by recency** - newer docs first within each section
- **Be thorough** - search all locations before responding
- **Offer synthesis** - if multiple hits, offer to summarize what's known
