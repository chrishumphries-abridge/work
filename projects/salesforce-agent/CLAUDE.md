# Salesforce Agent — Project Context

## Summary
Direct Salesforce SOQL access via MCP tool (`ct_salesforce_soql_query_896b9cdd` on `chris-mcp`). Claude Code queries Salesforce directly — no LLM middleman.

## History
Originally a Tray.io-hosted agent with LLM middleware (Feb 2026). The Tray agent wrapped SOQL queries inside its own agent tooling, adding two LLM inference calls per query. Replaced with a direct SOQL connector for speed and accuracy.

**Key issue solved:** The Tray agent hallucinated field API names despite running describe calls. Root cause: template placeholders and label-like hints in the system prompt overrode describe results. Fixed by hardcoding field reference tables.

## Current Reference Locations
- **SOQL reference** (field tables, query patterns, gotchas): `/Users/chris/work/reference/salesforce-soql-reference.md`
- **Sales context** (ROI, competitors): `/Users/chris/work/reference/abridge-sales-context.md`
- **Main CLAUDE.md router**: See "chris-mcp" section under MCP Servers

## Deprecated Files (kept for history)
- `system-prompt.md` — Original Tray agent system prompt. Content migrated to reference files.
- `tool-describe-sfdc-object.md` — Deprecated; use `FIELDS(ALL)` for undocumented objects.
- `tool-sfdc-soql-query.md` — Content migrated to SOQL reference file.
