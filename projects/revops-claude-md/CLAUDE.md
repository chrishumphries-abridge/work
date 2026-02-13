# RevOps Claude.md Project

## Purpose
Shared Claude.md for the RevOps team — a living doc that gives Claude Code (and any AI tool using project context) the right context about how RevOps works at Abridge.

## Notion Sync
- **Notion page**: https://www.notion.so/abridge/RevOps-Claude-md-306c967bdf0980abb0cae29406a00f25
- **Notion page ID**: `306c967b-df09-80ab-b0ca-e29406a00f25`
- The canonical shared version lives in Notion (team can edit there)
- Local copy at `revops-claude.md` is for drafting and editing via Claude Code

### IMPORTANT: Bidirectional sync rules

**Before editing `revops-claude.md`:**
1. Fetch the Notion page using `mcp__notion__notion-fetch` to get the latest version
2. Update the local file with any changes the team made in Notion

**After editing `revops-claude.md`:**
1. Push the full content to Notion using `mcp__notion__notion-update-page`

Both directions are automatic — do not wait for the user to ask.

## Status
- [x] Scaffold project and skeleton structure
- [x] Push skeleton to Notion
- [x] Set up bidirectional sync rules
- [ ] Draft initial content
- [ ] Review with team
