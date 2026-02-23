# Salesforce Agent — Project Context

## Summary
Tray.io MCP server (`chris-mcp`) that exposes a Salesforce agent for natural language queries against the Abridge Salesforce org. Used from Claude Code and Claude Desktop.

## Architecture
- **MCP Server**: `chris-mcp` (Tray.io hosted)
- **Tools**:
  - `ct_salesforce_agent` — Natural language Salesforce queries (SOQL generation + execution)
  - `ct_at_describe_salesforce_object` — Returns object metadata/schema from Salesforce REST API describe endpoint
- **Flow**: Claude Code/Desktop → MCP → Tray.io workflow → Salesforce REST API → Response

## Key Issue (Resolved)
The agent was using wrong field API names in SOQL despite running describe calls. Root cause: the LLM was inferring field names from label-like hints in the system prompt instead of using actual API names from the describe response. Fix: hardcoded field reference tables in the system prompt for Account and Opportunity objects.

## Files
- `system-prompt.md` — The full system prompt for the Salesforce agent (deployed in Tray.io)
- `CLAUDE.md` — This file

## Status
- System prompt v2 with field reference tables: in progress
- Tray workflow: operational
- Describe tool: operational (returns first field only — needs Tray-side fix to return full schema)

## Notes
- The describe tool currently only returns the first field from the schema. The Salesforce agent tool works around this by interpreting the describe internally.
- `NextStep` is a standard field (no `__c`) — top source of SOQL errors
- `Future_Task_Date_RU__c` is the actual "Next Activity Date" — not `NextActivityDate`
- No `Is_Renewal__c` boolean exists — use `Renewal_Count__c` to filter renewals
