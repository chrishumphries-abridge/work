# Salesforce Agent — Session Summary (2026-02-23)

## What We Built
**A direct Salesforce SOQL pipeline from Claude Code to the Abridge production org**, replacing a slow Tray.io LLM agent middleware.

## Key Milestones

1. **Diagnosed the Tray agent's SOQL field name hallucination problem** — the LLM inferred field names from template placeholders instead of using describe results
2. **Built hardcoded field reference tables** for 9 Salesforce objects (Account, Opportunity, Buying Group, Buying Group Member, Conversation, Account Plan, Task, Event) by running `FIELDS(ALL)` queries
3. **Discovered and corrected field gotchas** through live testing:
   - `Customer_Health__c` uses emoji values (`🔴`/`🟡`/`🟢`), not text
   - `Finished_At__c` is the date field on Conversation__c (not `Date__c`)
   - `Customer_Health_Trend__c` values are `Trending Up`/`No Change`/`Trending Down`
4. **Replaced the Tray agent with a direct SOQL MCP tool** — massive speed improvement, Claude constructs SOQL directly using the reference tables
5. **Built an at-risk customer dashboard** — 4 queries across Account, Opportunity, Buying Group, and Conversation for 20 red/yellow accounts ($43.2M combined CARR)
6. **Restructured everything for Claude Code** — moved the "system prompt" content into `reference/salesforce-soql-reference.md` with a router in the main CLAUDE.md

## Architecture: Before & After

### Before
```
Claude Code → MCP → Tray Agent (LLM constructs SOQL) → Salesforce API → Tray Agent (LLM synthesizes) → Response
```
- Two LLM inference calls per query
- Frequent timeouts (120s+)
- Field name hallucination despite describe calls

### After
```
Claude Code → MCP → Salesforce API (direct SOQL) → Raw JSON → Claude synthesizes
```
- One direct API call per query
- Sub-second responses
- Field names from hardcoded reference tables — no guessing

## File Structure

| File | Purpose |
|---|---|
| `reference/salesforce-soql-reference.md` | Authoritative SOQL reference — field tables, query patterns, gotchas (~600 lines) |
| `reference/abridge-sales-context.md` | Sales ROI, competitor snapshot, talking points (~60 lines) |
| `CLAUDE.md` (main) | Router — tells Claude to read SOQL reference before any query, top 5 gotchas inline |
| `projects/salesforce-agent/CLAUDE.md` | Project history and pointer to reference files |
| `projects/salesforce-agent/system-prompt.md` | Original Tray agent system prompt (deprecated, kept for history) |

## Next Steps

1. **CLAUDE.md collaboration workflow** — how to work on this file as a team (version control, review process, who updates what)
2. **Build skills combining MCP servers** — e.g., a skill that queries both Salesforce (chris-mcp) and Attention MCP for unified account health assessments
3. **Salesforce Tooling API integration** — add as another connector within chris-mcp for metadata operations (describe, deploy, etc.)
4. **Additional chris-mcp connectors** — expand the Tray MCP server with more tools beyond Calendar and SOQL
