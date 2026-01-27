# Buying Group AI Scoring

## Origin
RevOps meeting (2026-01-27) — Zach proposed using AI to assess buying group strength instead of traditional scoring models.

## Core Idea
Instead of building a traditional scoring model with weighted fields, let AI assess buying groups based on criteria we define. Run nightly, surface results with color-coded scores and explanations.

## Three Dimensions

### 1. Breadth
Does the buying group have all the right people?
- Core personas present
- Coverage across clinical notes buying group

### 2. Frequency
Are we talking to them consistently?
- 30 days = green
- 60 days = yellow
- 90+ days = red

### 3. Depth
Is engagement holistic or one-dimensional?
- Not just email
- Marketing engagements
- Multiple touchpoints and channels

## Output
- Three sub-scores (one per dimension)
- One master/holistic score
- Color coding: red / yellow / green
- Hover explanation: "Why did it score this way?"

## Open Questions

### Segmentation by Account Status
Should scoring be weighted differently by account type?
- **Current customers**: Expect breadth to be complete
- **Prospects**: Different baseline expectations
- **Renewals**: Different priorities

> "Rate them on a curve within each of their respective customers" — Zach

### Technical Questions
- Where does the output live? (Needs to be reportable/stored)
- How does nightly run get triggered?
- What data sources feed in?
- LLM prompt structure for each dimension

## First Deliverable
**By end of week**: View of current customers where buying group strength is weak

## Related
- Account Plan Redesign (separate project)
- Planhat integration work
- Attention API/MCP exploration

## Status
- [ ] Deep dive on architecture
- [ ] Define data inputs
- [ ] Draft prompts for each dimension
- [ ] Prototype scoring logic
- [ ] Build "weak buying groups" view (EOW target)
