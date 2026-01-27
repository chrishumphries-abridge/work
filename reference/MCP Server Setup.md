# MCP Server Setup for Claude Code

## What is MCP?
Model Context Protocol - an open standard that lets Claude Code connect to external tools, databases, and APIs.

## Configuration Scopes

| Scope | Use Case | Stored In |
|-------|----------|-----------|
| `--scope user` | Personal tools across all projects | `~/.claude.json` |
| `--scope project` | Team-shared, project-specific | `.mcp.json` (in repo) |

## Adding an MCP Server

### Remote HTTP Server
```bash
claude mcp add --scope user --transport http <name> <url> --header "Authorization: Bearer <token>"
```

### Remote SSE Server
```bash
claude mcp add --scope user --transport sse <name> <url> --header "Authorization: Bearer <token>"
```

### Local Stdio Server
```bash
claude mcp add --scope user --transport stdio <name> --env KEY=value -- <command>
```

## Managing Servers

```bash
# List all servers
claude mcp list

# View details of a server
claude mcp get <name>

# Remove a server
claude mcp remove <name>

# Check status in Claude Code
/mcp
```

## Troubleshooting

If connection fails:
1. Test the URL with curl: `curl -I <url>`
2. If server returns `Allow: GET`, use SSE transport instead of HTTP
3. Check if authentication headers are correct
4. Verify the service has MCP enabled for your organization
