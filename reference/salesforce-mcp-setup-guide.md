# Salesforce Hosted MCP Server — Setup Guide

How to connect Claude Code (CLI) to Salesforce's hosted MCP servers. Based on the [official wiki](https://github.com/forcedotcom/mcp-hosted/wiki).

> **Why Claude Code?** The Claude Desktop "Add custom connector" option requires a paid Claude plan with admin access. Claude Code CLI has no such restriction — it supports any MCP server via `mcp-remote`.

---

## Overview

Five steps:

1. Enable the MCP beta in your Salesforce org
2. Create an External Client App (OAuth credentials)
3. Log into your target org
4. Add the MCP server to Claude Code
5. Test it

---

## Step 1: Enable the MCP Beta

**Requires**: Admin user with "Customize Application" permission.

1. Go to **Setup** > Quick Find > search **"User Interface"**
2. Check **"Enable MCP Service (Beta)"**
3. Accept the Beta Services Terms

> **Heads up**: MCP server operations consume API calls against your org's quota.

### Scratch Orgs

If using a scratch org, enable the `SalesforceHostedMCP` feature in your scratch org definition. Note: you **cannot** create External Client Apps in scratch orgs — use a Developer Edition or sandbox instead.

---

## Step 2: Create an External Client App

> External Client Apps can take **up to 30 minutes** to become globally operational after creation. Connected Apps are **not** supported for this.

1. **Setup** > Quick Find > search **"External Client App Manager"**
2. Click **New External Client App**, fill in Basic Information
3. Expand the **API** section, check **"Enable OAuth"**
4. Set the **Callback URL**:
   ```
   http://localhost:8080/oauth/callback
   ```
   (This is for local MCP clients like Claude Code / Cursor)
5. Add these **OAuth Scopes**:
   - `api` — Manage user data via APIs
   - `sfap_api` — Access the Salesforce API Platform
   - `refresh_token` / `offline_access` — Perform requests at any time
   - `einstein_gpt_api` — Access Einstein GPT services
6. Under security settings:
   - **Enable** "Issue JSON Web Token (JWT)-based access tokens for named users"
   - **Enable** "Require Proof Key for Code Exchange (PKCE) extension"
   - **Disable** all other security options
7. Click **Create**
8. Go to **Settings > OAuth Settings > Consumer Key and Secret**
9. Copy your **Consumer Key** (you'll need this next)

---

## Step 3: Log Into Your Target Org

Before configuring the MCP client:

1. **Log out** of all other Salesforce orgs in your browser
2. **Log into** the specific org where you created the External Client App
3. **Keep the browser open** — the OAuth flow will open a new tab in the same browser

This matters because MCP doesn't natively support multi-tenant systems. You need to be logged into the right org when the OAuth redirect happens.

---

## Step 4: Add the MCP Server to Claude Code

### Pick a Server

Choose a server based on what you need:

| Server Name | What It Does |
|-------------|-------------|
| `platform/sobject-all` | Full CRUD on sObjects — read, create, update, delete, relationships |
| `sobject-reads` | Read-only sObject access |
| `sobject-mutations` | Create and update sObjects |
| `sobject-deletes` | Delete sObjects |
| `platform/salesforce-api-context` | Metadata, field definitions, picklist values |
| `invocable_actions` | Discover and execute Invocable Actions (flows, etc.) |
| `data-cloud-queries` | Data Cloud SQL queries |
| `analytics/tableau-next` | Tableau analytics — dashboards, semantic models, NL queries |
| `revenue-cloud` | CPQ, orders, asset lifecycle (amend/cancel/renew) |
| `insurance-cloud` | Policy, claims, underwriting, quotes |
| `pricing-ngp` | Pricing engine |

### URL Format

| Org Type | URL Pattern |
|----------|------------|
| Production / Developer Edition | `https://api.salesforce.com/platform/mcp/v1-beta.2/<SERVER-NAME>` |
| Sandbox / Scratch | `https://api.salesforce.com/platform/mcp/v1-beta.2/sandbox/<SERVER-NAME>` |

**Example** (sandbox, full sObject access):
```
https://api.salesforce.com/platform/mcp/v1-beta.2/sandbox/platform/sobject-all
```

### Add to Claude Code

Use `mcp-remote` to bridge the HTTP server to Claude Code's stdio transport:

```bash
claude mcp add salesforce \
  -s user \
  -- npx -y mcp-remote@0.1.18 \
  "https://api.salesforce.com/platform/mcp/v1-beta.2/<SERVER-NAME>" \
  8080 \
  --static-oauth-client-info \
  '{"client_id":"YOUR_CONSUMER_KEY","client_secret":""}'
```

Replace:
- `<SERVER-NAME>` with your chosen server (e.g., `platform/sobject-all`)
- `YOUR_CONSUMER_KEY` with the Consumer Key from Step 2
- Use the `/sandbox/` URL variant for sandbox orgs

### Adding Multiple Servers

You can add more than one server with different names:

```bash
# Read-only access for safe querying
claude mcp add sf-read \
  -s user \
  -- npx -y mcp-remote@0.1.18 \
  "https://api.salesforce.com/platform/mcp/v1-beta.2/platform/sobject-reads" \
  8081 \
  --static-oauth-client-info \
  '{"client_id":"YOUR_CONSUMER_KEY","client_secret":""}'

# Metadata and field definitions
claude mcp add sf-metadata \
  -s user \
  -- npx -y mcp-remote@0.1.18 \
  "https://api.salesforce.com/platform/mcp/v1-beta.2/platform/salesforce-api-context" \
  8082 \
  --static-oauth-client-info \
  '{"client_id":"YOUR_CONSUMER_KEY","client_secret":""}'
```

> **Note**: Each server needs a unique port (8080, 8081, 8082, etc.).

### Verify

```bash
claude mcp list
```

Inside a Claude Code session, run `/mcp` to check server status.

---

## Step 5: Test It

Once connected, try a prompt like:

> "Tell me some basic information about the [Account Name] account"

If using `platform/sobject-all`, you should get back account details (name, industry, type, etc.) and follow-up suggestions.

### What You Can Do

With `platform/sobject-all` alone, Claude can:
- Query any sObject (Accounts, Contacts, Opportunities, etc.)
- Create, update, and delete records
- Traverse relationships between objects
- Look up the current user's info

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Auth flow not completing | Make sure you're logged into the right org in your default browser and all other orgs are logged out |
| Token/auth errors | Clear cached tokens: `rm -rf ~/.mcp-auth` and reconnect |
| "External Client App not found" | Wait up to 30 minutes after creation for global propagation |
| Server not showing in Claude Code | Run `claude mcp list` to verify; check the server name matches exactly |
| Port conflict | Change the port number (8080 → 8081, etc.) if another server is using it |

---

## References

- [forcedotcom/mcp-hosted Wiki](https://github.com/forcedotcom/mcp-hosted/wiki)
- [Configure Your MCP Client](https://github.com/forcedotcom/mcp-hosted/wiki/Configure-Your-MCP-Client)
- [Create an External Client App](https://github.com/forcedotcom/mcp-hosted/wiki/Create-an-External-Client-App)
- [Available Tools and Servers](https://github.com/forcedotcom/mcp-hosted/wiki/Available-Tools-and-Servers)
- [mcp-remote npm package](https://www.npmjs.com/package/mcp-remote)