---
name: close-up-shop
description: End of day close-out workflow. Use when user says "close up shop", "end of day", "wrap up", "done for today", or similar.
---

# Close Up Shop

End of day workflow to capture progress, reconcile new items, and prepare for tomorrow.

## When to Use

Recognize close-out intent when user:
- Says "close up shop" or "wrap up"
- Says "done for today" or "end of day"
- Asks to "close out" without specifying week
- It's late afternoon and they mention finishing

## Workflow

### 1. Read Today's Daily Plan

Load `/Users/chris/work/Daily Plans/YYYY-MM-DD-daily-plan.md` as baseline.

This shows:
- What was planned
- Analog card items
- Last known state

### 2. Check the Delta

Only look for NEW items since the daily plan was last updated:

**Notion Meeting Notes:**
```
Use mcp__chris-mcp__co_notion_5_0_query_data_source with:
- data_source_id: 2a9c967b-df09-804a-a924-000b5e1a2d5d
- Filter for today's date
```

Compare against meetings already captured in daily plan. Only surface NEW meeting notes.

**Asana:**
Check for task updates or new items assigned to user since morning.
- Use mcp__asana__asana_search_tasks
- Filter: assigned to me, modified today

### 3. Quick Reconcile (New Items Only)

If new Notion action items exist from meetings NOT in the daily plan:
- Present for Asana tracking
- Same Yes/No/Already covered/Combine flow as daily planning
- Only reconcile the gap, not the full day

### 4. Update Daily Plan

Add an "End of Day" section to today's daily plan file:

```markdown
---

## End of Day

### Completed
- [x] Item that got done
- [x] Another completed item

### Carried Forward
- [ ] Incomplete item → tomorrow
- [ ] Another item that didn't happen

### Tomorrow's Head Start
1. First priority for tomorrow morning
2. Second priority if time

### Notes
Any context for tomorrow-me. Blockers discovered, decisions made, things to remember.
```

### 5. Git Backup

```bash
cd /Users/chris/work
git add -A
git commit -m "Close out [date] daily plan"
git push origin main
```

### 6. Confirm Closure

Tell user:
- What's being carried forward
- Tomorrow's suggested priorities
- "Daily plan closed. Have a good evening."

## Rules

- **Don't re-reconcile** — Skip meetings/items already in the daily plan
- **Keep it quick** — This is end of day, user wants to leave
- **Update the file** — Daily plan file is the source of truth
- **Always backup** — Git commit and push before finishing
- **No new planning** — Save that for tomorrow morning

## Edge Cases

**No daily plan exists:**
Create a minimal one with just the End of Day section, capturing what happened today.

**Nothing new since morning:**
Skip to step 4, just add the End of Day section.

**User mentions specific completed items:**
Incorporate what they tell you, don't make them repeat it.
