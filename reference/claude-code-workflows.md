# Claude Code Workflow Reference

## Daily Routines

### Morning Startup
```
"What's my day look like?"
"Generate today's daily brief"
"What's due this week?"
```

### Task Management
```
"Show me my Asana tasks due today"
"Get details on [task name]"
"Search for tasks about [topic]"
"Mark [task name] complete"
"Add a comment to [task]: [comment]"
"Create a task: [name] due [date] in [project]"
```

### Project Work
```
"Let's work on [project name]"
"Create a new Salesforce project for [description]"
"Open my notes for [project]"
```

### Weekly Planning
```
"Generate my weekly review"
"What tasks are overdue?"
"What's coming up next week?"
```

---

## Project Commands

### Starting a New Project
```
"Create a new project workspace for [name]"
```
This will:
- Create folder in projects/salesforce/ or projects/tray/
- Generate README from template
- Link to Asana if applicable

### Working on Salesforce
```
"Let's work on [project] - I need to [describe work]"
```

---

## File Locations

| Type | Location |
|------|----------|
| Today's notes | `daily/YYYY-MM-DD.md` |
| This week | `weekly/YYYY-WXX.md` |
| Task reviews | `tasks/` |
| Project work | `projects/[type]/[name]/` |
| Meeting notes | `meetings/` |
| Quick capture | `_inbox/` |

---

## Tips

1. **Start each day** with "What's my day look like?" to generate/update your daily brief

2. **Before meetings**, ask Claude to pull context from Asana on related tasks

3. **After meetings**, drop notes in `_inbox/` and ask Claude to extract action items

4. **End of day**, update the "End of Day" section in your daily brief

5. **Weekly**, generate a fresh weekly review on Monday mornings
