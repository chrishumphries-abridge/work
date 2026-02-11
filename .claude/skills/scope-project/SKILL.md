---
name: scope-project
description: Turn vague requests into structured, actionable work. Use when user says "scope this out", "break this down", "let me think through this project", "how should I approach X", or describes new work without clear structure.
---

# Scope Project

Transform ambiguous initiatives into well-structured Asana tasks with clear phases, dependencies, and deliverables.

## When to Use

**Explicit triggers:**
- `/scope-project`, `/break-down`
- "scope this out", "break this down"
- "let me think through this project"
- "how should I approach X"

**Proactive triggers:**
- User describes new work without clear structure
- Request sounds like it needs multiple steps
- User seems overwhelmed by scope

## Workflow

### 1. Clarify the Request
Ask these questions (skip any that are already clear):
- **Goal**: What does success look like?
- **Requester**: Who's asking? What do they care about?
- **Done**: What's the actual deliverable?
- **Constraints**: Timeline, resources, dependencies?
- **Context**: Why now? What triggered this?

### 2. Identify the Real Problem
Dig beneath the surface request:
- What problem is this solving?
- Is there a simpler way to achieve the goal?
- Are there hidden assumptions to validate?

### 3. Map Dependencies
- What needs to happen first?
- External blockers (waiting on others)?
- Tools or access needed?
- Related work in progress?

### 4. Break into Phases
Structure work into logical chunks:
- Each phase has a clear deliverable
- Phases can be completed independently where possible
- Identify the minimum viable first step

### 5. Create in Asana
Using `mcp__asana__asana_create_task`:

**Parent Task:**
- Clear title describing the initiative
- Notes field includes:
  - Goal/success criteria
  - Context and background
  - Link to project CLAUDE.md if applicable
- Assign to "me"
- Due date for overall completion (if known)

**Subtasks:**
- One per phase/deliverable
- Clear acceptance criteria
- Set dependencies using `mcp__asana__asana_set_task_dependencies`
- Due dates staggered appropriately

### 6. Document in Project
If this is a significant initiative:
- Create or update `projects/[project-name]/CLAUDE.md`
- Include scope, phases, decisions made
- Link back to Asana parent task

## Asana Integration

### Create Parent Task
```
mcp__asana__asana_create_task
- workspace: 1135694209242791
- assignee: me
- name: [Initiative title]
- notes: [Full context, goal, success criteria]
- due_on: [Target completion if known]
```

### Add Subtasks
```
mcp__asana__asana_create_task
- parent: [parent_task_gid]
- name: [Phase/deliverable name]
- notes: [Acceptance criteria]
- due_on: [Phase deadline]
```

### Set Dependencies
```
mcp__asana__asana_set_task_dependencies
- task_gid: [task that must wait]
- dependencies: [task(s) that must complete first]
```

## Output Format

Present the scoped work like this:

```markdown
## Initiative: [Title]

**Goal:** [What success looks like]
**Requester:** [Who and why]
**Target:** [Completion date if known]

### Phases

#### Phase 1: [Name]
- **Deliverable:** [What's produced]
- **Dependencies:** None / [List]
- **Effort:** [Low/Medium/High]

#### Phase 2: [Name]
- **Deliverable:** [What's produced]
- **Dependencies:** Phase 1
- **Effort:** [Low/Medium/High]

[Continue for all phases]

### Open Questions
- [Any unresolved items]

### Next Step
[What to do right now to start]
```

## Example

**User says:** "I need to set up HockeyStack integration"

**Scoped output:**

```markdown
## Initiative: HockeyStack SFDC Integration

**Goal:** HockeyStack can read Salesforce data for attribution
**Requester:** Marketing (campaign attribution)
**Target:** End of week

### Phases

#### Phase 1: Create Integration User
- **Deliverable:** Salesforce integration user with correct permissions
- **Dependencies:** None
- **Effort:** Low

#### Phase 2: Configure Permissions
- **Deliverable:** Permission set with read access to required objects
- **Dependencies:** Phase 1
- **Effort:** Medium

#### Phase 3: Provide Credentials
- **Deliverable:** Credentials shared securely with HockeyStack
- **Dependencies:** Phase 2
- **Effort:** Low

#### Phase 4: Validate Integration
- **Deliverable:** Confirmed data flowing correctly
- **Dependencies:** Phase 3
- **Effort:** Low

### Open Questions
- Which Salesforce objects does HockeyStack need?

### Next Step
Create the integration user in Salesforce
```

## Key Principles

- **Under-scope initially** - Can always add more later
- **Clear deliverables** - Each phase produces something tangible
- **Dependencies explicit** - What blocks what is visible
- **Document decisions** - Future you needs context
