---
name: weekly-closeout
description: Friday close-out workflow. Use when user says "close out week", "weekly closeout", "it's Friday", or wants to wrap up the week.
---

# Weekly Close-Out

Friday workflow to analyze the week, identify patterns, and set up next week.

## When to Use

Recognize weekly close-out intent when user:
- Says "close out week" or "weekly closeout"
- Says "it's Friday" in context of wrapping up
- Asks for a "weekly report" or "week in review"
- It's Friday and they mention finishing for the week

## Workflow

### 1. Analyze the Week

**Asana - Tasks Modified This Week:**
```
Use mcp__asana__asana_search_tasks with:
- workspace: 1135694209242791
- assignee: 1210002869511639 (me)
- modified_on.after: [Monday of this week]
```

**Find Deferred Tasks:**
For tasks with due date changes, check task stories:
```
Use mcp__asana__asana_get_stories_for_task
Look for due_date_changed events
```

**Find Blocked Tasks:**
Check task dependencies to find blocked items and who's blocking.

**Count Completions:**
Tasks marked complete this week = wins.

### 2. Update Friday's Daily Plan

Add a Weekly Close-Out section:

```markdown
---

## Weekly Close-Out

### Wins This Week
Group by theme, not raw task list:
- **Approvals Project**: Deployed SFDC flows, created Tray specs
- **RevIntel**: Shipped buying group coverage gaps feature
- **Operations**: Cleaned up 12 stale Asana tasks

### Not Completed
- [ ] LaunchDarkly Slack integration (blocked by API access)
- [ ] Monthly review (deferred to next week)

### Deferred This Week
| Task | From | To | Reason |
|------|------|-----|--------|
| Task name | Jan 22 | Jan 29 | Waiting on X |

### Blocked Tasks
| Task | Blocker | Owner | Suggested Action |
|------|---------|-------|------------------|
| Task name | Dependency | Person | Ping them Monday |

### Patterns Noticed
- Meetings ate Tuesday entirely
- Deploy blockers are slowing RevIntel work
```

### 3. Create Weekly Report

Save to `/Users/chris/work/Weekly Reports/YYYY-WXX-weekly-report.md`:

```markdown
# Week XX Report

## Summary
One paragraph: what the week was about, major accomplishments, challenges.

## Shipped
- Item 1
- Item 2

## Metrics
- Tasks completed: N
- Tasks deferred: N
- Tasks blocked: N

## Deferred
| Task | Original Due | New Due |
|------|--------------|---------|

## Blocked
| Task | Blocker | Owner |
|------|---------|-------|

## Next Week Focus
1. Priority 1
2. Priority 2
3. Priority 3
```

### 4. Create Next Week Plan

Save to `/Users/chris/work/Daily Plans/YYYY-WXX-weekly-plan.md`:

```markdown
# Week XX Plan

## Priority Order
1. **Unfinished** — Carried from this week
2. **Deferred** — Intentionally pushed
3. **New** — Fresh work

## Monday
- [ ] First thing: [high priority carryover]
- [ ] [Meeting prep if needed]
- [ ] [Blocked task follow-ups]

### Monday Analog Card
1. [Top priority]
2. [Second priority]
3. [Third priority]

## Tuesday
- [ ] ...

## Wednesday
- [ ] ...

## Thursday
- [ ] ...

## Friday
- [ ] ...
- [ ] Weekly close-out

## Blocked Items to Unblock
| Task | Owner | Action |
|------|-------|--------|
| Task | Person | Ping Monday AM |

## Notes
- Sunday due dates = Monday in practice
- User doesn't work weekends
```

### 5. Cleanup

```bash
# Check for loose files that should be in projects
ls /Users/chris/work/*.md  # Anything that's not CLAUDE.md or README.md?

# Check for stray screenshots
find /Users/chris/work -name "*.png" -o -name "Screenshot*"

# Git backup
cd /Users/chris/work
git add -A
git commit -m "Week XX close-out and Week XX+1 plan"
git push origin main
```

### 6. Confirm

Tell user:
- Week summary (shipped count, deferred count)
- Top 3 priorities for next week
- Any blocked items that need Monday action
- "Week closed. Enjoy your weekend."

## Rules

- **Group wins by theme** — "Shipped 3 approval workflow components" not "Deployed flow X, flow Y, flow Z"
- **Be honest about deferrals** — They're data, not failures
- **Monday Analog Card ready** — User should be able to start Monday without planning
- **No weekends** — Don't schedule anything for Saturday/Sunday
- **Sunday due = Monday** — Treat Sunday deadlines as Monday in practice
