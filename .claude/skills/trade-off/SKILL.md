---
name: trade-off
description: Compare options and make recommendations for decisions. Use when user says "should I do A or B", "which approach", "I'm torn between", "help me decide", or presents alternatives without clear preference.
---

# Trade-off Analysis

Systematically compare options and make clear recommendations.

## When to Use

**Explicit triggers:**
- `/trade-off`, `/decide`, `/compare`
- "trade-off analysis"
- "compare these options"

**Natural triggers:**
- "should I do A or B"
- "which approach should I take"
- "I'm torn between..."
- "help me decide"
- "what would you recommend"

**Proactive triggers:**
- User presents alternatives without clear preference
- Decision seems stuck or circular
- Multiple valid paths forward

## Workflow

### 1. Enumerate Options
Make sure all options are on the table:
- What are the choices?
- Is "do nothing" a valid option?
- Are there options they haven't considered?

### 2. Define Criteria
Standard criteria to consider:
- **Effort** - Time/resources required
- **Impact** - Value delivered
- **Risk** - What could go wrong
- **Dependencies** - What must happen first
- **Reversibility** - Can we change course later?
- **Alignment** - Fits goals/strategy?

Add domain-specific criteria as needed.

### 3. Score Each Option
Use consistent scale:
- Low / Medium / High
- Or 1-5 if more granularity needed

Be explicit about scoring rationale.

### 4. Identify Constraints
What limits the decision:
- Hard deadlines
- Budget constraints
- Resource availability
- Technical limitations
- Political considerations

### 5. Make Recommendation
Provide a clear answer:
- "Go with Option A because..."
- Or "It depends on X" with clear guidance for each case

### 6. Document Decision
If significant, capture in relevant project CLAUDE.md:
- What was decided
- Why (reasoning)
- What was rejected and why
- Conditions that would change the decision

## Output Format

```markdown
## Trade-off Analysis: [Decision Title]

### Context
[Brief background on why this decision is needed]

### Options

**Option A: [Name]**
[1-2 sentence description]

**Option B: [Name]**
[1-2 sentence description]

**Option C: [Name]** (if applicable)
[1-2 sentence description]

### Comparison

| Criteria | Option A | Option B | Option C | Notes |
|----------|----------|----------|----------|-------|
| Effort | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |
| Impact | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |
| Risk | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |
| Dependencies | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |
| Reversibility | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |
| Alignment | [L/M/H] | [L/M/H] | [L/M/H] | [Context] |

### Constraints
- [Constraint 1]
- [Constraint 2]

### Recommendation

**Go with Option [X]** because:
1. [Primary reason]
2. [Secondary reason]
3. [Third reason if applicable]

### Conditions to Reconsider
- If [condition], reconsider Option [Y]
- If [constraint changes], Option [Z] becomes viable

### Next Step
[Specific action to implement the decision]
```

## Example

```markdown
## Trade-off Analysis: How to Handle HockeyStack Integration

### Context
Marketing needs attribution data from HockeyStack. Need to decide how to provide Salesforce access.

### Options

**Option A: Dedicated Integration User**
Create a new Salesforce user specifically for HockeyStack with minimal permissions.

**Option B: Use Existing Service Account**
Reuse the general integration service account that other tools use.

**Option C: Marketing User's Credentials**
Have marketing provide their own credentials (not recommended but sometimes requested).

### Comparison

| Criteria | Option A | Option B | Option C | Notes |
|----------|----------|----------|----------|-------|
| Effort | Medium | Low | Low | A needs user creation |
| Impact | High | Medium | Medium | A has right permissions |
| Risk | Low | Medium | High | C is audit nightmare |
| Dependencies | None | None | Marketing | |
| Reversibility | High | Medium | Low | C creates bad precedent |
| Alignment | High | Medium | Low | A follows security best practices |

### Constraints
- Must comply with security policy (no shared personal credentials)
- Need to track API usage by integration

### Recommendation

**Go with Option A (Dedicated Integration User)** because:
1. Clean audit trail - know exactly what HockeyStack is accessing
2. Principle of least privilege - only permissions they need
3. Easy to revoke - disable one user if issues arise

### Conditions to Reconsider
- If urgent (<24 hours), Option B is acceptable short-term
- If HockeyStack only needs read access temporarily, Option B is fine

### Next Step
Create the integration user in Salesforce with read access to Accounts, Contacts, Opportunities, and Campaigns.
```

## Decision Patterns

### When effort is similar
Choose based on risk and reversibility.

### When impact is unclear
Start with lowest effort to learn more.

### When all options have trade-offs
Make the trade-offs explicit and let user's priorities guide.

### When options are truly equivalent
Pick one and move on - decision debt is real.

### When "it depends"
Clearly articulate what it depends on and provide guidance for each scenario.

## Quick Decision Format

For simpler decisions, use abbreviated format:

```markdown
## Quick Decision: [Title]

**Options:** A (do X) vs B (do Y)

**Recommendation:** Option A

**Why:** [1-2 sentences]

**Caveat:** If [condition], go with B instead.
```

## Key Principles

- **All options on the table** - Including "do nothing"
- **Explicit criteria** - No hidden factors
- **Clear recommendation** - Don't waffle
- **Capture reasoning** - Future you needs context
- **Conditions to change** - Decisions aren't permanent
