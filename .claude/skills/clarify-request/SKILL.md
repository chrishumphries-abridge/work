---
name: clarify-request
description: Decode what stakeholders actually need vs. what they asked for. Use when user says "Marketing wants X", "Sales is asking about", "someone asked me to", "translate this request", or presents a request that seems ambiguous.
---

# Clarify Request

Translate stakeholder requests into clear requirements with multiple implementation options.

## When to Use

**Explicit triggers:**
- `/clarify-request`, `/translate`
- "translate this request"
- "what do they actually need"

**Natural triggers:**
- "Marketing wants X"
- "Sales is asking about..."
- "someone asked me to..."
- "[Person] mentioned they need..."

**Proactive triggers:**
- User mentions a request that seems ambiguous
- Request uses vague terms ("better", "improved", "fixed")
- Gap between stated request and likely underlying need

## Workflow

### 1. Capture the Literal Request
- What exactly did they say?
- Direct quote if available
- Channel it came through (Slack, meeting, email)

### 2. Identify the Stakeholder
- Who specifically is asking?
- What's their role?
- What do they typically care about?
- What's their technical sophistication?

### 3. Probe Underlying Need
Ask/investigate:
- What problem are they trying to solve?
- What will they do with this once they have it?
- What triggered this request now?
- What have they tried already?

### 4. Assess Feasibility
For each potential interpretation:
- Quick (< 1 day)
- Medium (1-3 days)
- Hard (1+ week)

Consider:
- Do we have access to needed data/tools?
- Dependencies on others?
- Technical complexity?

### 5. Propose Options
Generate 2-3 approaches at different effort levels:
- **Light:** Minimum viable solution
- **Medium:** Balanced approach
- **Full:** Complete solution (if warranted)

### 6. Recommend
Based on:
- Effort vs. impact
- Time constraints
- User's capacity
- Strategic importance

## Output Format

```markdown
## Request Translation

**Literal request:** "[Exact quote or close paraphrase]"
**Stakeholder:** [Name] ([Role]) - cares about [primary concern]
**Underlying need:** [Real problem they're trying to solve]

### Context
[Any additional background that helps understand the request]

### Options

| Option | Effort | Impact | Notes |
|--------|--------|--------|-------|
| A: [Light solution] | Low | [L/M/H] | [Trade-offs] |
| B: [Medium solution] | Medium | [L/M/H] | [Trade-offs] |
| C: [Full solution] | High | [L/M/H] | [Trade-offs] |

### Option Details

**Option A: [Name]**
- What it does: [Description]
- Pros: [Benefits]
- Cons: [Limitations]
- Effort: [Specifics]

**Option B: [Name]**
- What it does: [Description]
- Pros: [Benefits]
- Cons: [Limitations]
- Effort: [Specifics]

**Option C: [Name]**
- What it does: [Description]
- Pros: [Benefits]
- Cons: [Limitations]
- Effort: [Specifics]

### Recommendation

**Go with Option [X]** because [reasoning].

[If conditional] Consider Option [Y] if [condition].

### Clarifying Questions
[Questions to ask stakeholder if needed]

### Next Step
[Specific action to move forward]
```

## Example

**User says:** "Marketing wants better reporting"

**Response:**

```markdown
## Request Translation

**Literal request:** "Marketing wants better reporting"
**Stakeholder:** Marketing team - cares about proving campaign ROI
**Underlying need:** Can't demonstrate campaign impact to leadership

### Context
Marketing likely needs to justify budget. "Better" probably means they can't answer questions they're being asked.

### Options

| Option | Effort | Impact | Notes |
|--------|--------|--------|-------|
| A: Add fields to existing SFDC report | Low | Medium | Quick win, limited scope |
| B: Build dashboard in existing BI tool | Medium | Medium | More flexible, takes longer |
| C: Full attribution model build-out | High | High | Solves root cause, major project |

### Option Details

**Option A: Enhance Existing Report**
- What: Add campaign source fields to their current opportunity report
- Pros: Done today, uses familiar tool
- Cons: Won't answer complex attribution questions
- Effort: 2-3 hours

**Option B: Marketing Dashboard**
- What: Build dedicated marketing dashboard with campaign metrics
- Pros: Self-service, looks professional
- Cons: Requires dashboard tool access, maintenance
- Effort: 2-3 days

**Option C: Attribution Model**
- What: Multi-touch attribution with proper tracking
- Pros: Answers all ROI questions, defensible data
- Cons: Major project, needs buy-in, ongoing maintenance
- Effort: 2-4 weeks

### Recommendation

**Start with Option A** to get them something useful immediately.

If that doesn't fully solve the problem, scope Option B as a follow-up.

### Clarifying Questions
- What specific questions can't you answer today?
- Who's asking for this data?
- What tool do you currently use for reporting?

### Next Step
Ask Marketing for an example question they can't answer today
```

## Patterns to Watch For

| They say... | They probably mean... |
|-------------|----------------------|
| "better" | Current solution doesn't answer their questions |
| "faster" | Current process has too much friction |
| "automated" | They're doing manual work they hate |
| "integrated" | They're copy-pasting between systems |
| "real-time" | Current data is stale when they need it |
| "self-service" | They're waiting on someone else |
| "visibility" | They can't see something they need to see |

## Key Principles

- **Assume positive intent** - They're trying to do their job
- **Dig for the why** - Surface request often isn't the real need
- **Options over solutions** - Let user/stakeholder choose
- **Start small** - Light option often reveals true requirements
- **Document the translation** - Prevents scope creep later
