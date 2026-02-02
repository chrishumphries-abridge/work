---
title: Development Guide
description: Local setup, deployment, and development workflow
---

# Development Guide

## Prerequisites

- [Salesforce CLI (sf)](https://developer.salesforce.com/tools/salesforcecli) v2+
- [VS Code](https://code.visualstudio.com/) with Salesforce Extension Pack
- Node.js 18+ (for linting/formatting)
- Access to a Salesforce org (sandbox or scratch org)

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd approvals

# Install dependencies
npm install

# Authenticate to your Salesforce org
sf org login web --alias my-sandbox

# Deploy metadata to org
sf project deploy start --target-org my-sandbox

# Open the org
sf org open --target-org my-sandbox
```

## Project Structure

```
approvals/
├── force-app/main/default/    # Salesforce metadata
│   ├── flows/                 # Flow definitions
│   ├── objects/               # Custom objects and fields
│   ├── namedCredentials/      # External API credentials
│   └── externalCredentials/   # Authentication configs
├── config/                    # SFDX configuration
├── scripts/                   # Utility scripts
│   ├── apex/                  # Anonymous Apex scripts
│   └── soql/                  # SOQL query files
├── .husky/                    # Git hooks
├── sfdx-project.json          # Project configuration
├── package.json               # Node dependencies
└── eslint.config.js           # Linting rules
```

## Development Workflow

### Making Changes

1. **Pull latest metadata** (if working with existing org):
   ```bash
   sf project retrieve start --target-org my-sandbox --metadata Flow
   ```

2. **Edit in VS Code** - Use Salesforce Extension Pack for IntelliSense

3. **Validate syntax**:
   ```bash
   npm run lint
   ```

4. **Deploy changes**:
   ```bash
   sf project deploy start --target-org my-sandbox --source-dir force-app
   ```

### Code Style

The project uses ESLint for JavaScript (LWC) and Prettier for all file formatting.

```bash
# Check for issues
npm run lint

# Auto-format all files
npm run prettier

# Verify formatting
npm run prettier:verify
```

### Pre-commit Hooks

Husky runs these checks before each commit:
- Prettier formatting on staged files
- ESLint on LWC JavaScript files
- LWC Jest tests on changed components

## Working with Flows

### Editing Flows

Flows are best edited in the Salesforce Flow Builder UI:

1. Open Setup → Process Automation → Flows
2. Find the flow to edit
3. Make changes in Flow Builder
4. Save as new version (don't overwrite)
5. Retrieve changes:
   ```bash
   sf project retrieve start --metadata "Flow:Request_Commercial_Approval"
   ```

### Flow Naming Conventions

| Prefix | Type | Example |
|--------|------|---------|
| `Screen_` | Screen Flow | `Screen_Flow_Deal_Desk` |
| `Subflow_` | Reusable Subflow | `Subflow_Send_Approval_Slack_Notification` |
| `{Object}_AfterSave_` | Record-Triggered (After) | `Opportunity_Approval_AfterSave_Handle_Decision` |
| `{Object}_BeforeSave_` | Record-Triggered (Before) | `Opportunity_BeforeSave_Default_Fields` |
| `Scheduled_` | Scheduled Flow | `Scheduled_Implementation_NPS_Survey_Reminder` |

### Testing Flows

1. Use Flow Debug mode in Flow Builder
2. For record-triggered flows, create test records
3. Check Setup → Flows → Paused and Failed Flow Interviews for errors

## Deployment

### Deploy to Sandbox

```bash
# Full deployment
sf project deploy start --target-org sandbox-alias

# Deploy specific components
sf project deploy start --target-org sandbox-alias --metadata "Flow:Request_Commercial_Approval"

# Deploy with tests (required for production)
sf project deploy start --target-org sandbox-alias --test-level RunLocalTests
```

### Deploy to Production

```bash
# Validate first (dry run)
sf project deploy validate --target-org production-alias --test-level RunLocalTests

# Quick deploy after validation passes
sf project deploy quick --job-id <validation-job-id>
```

### Deployment Checklist

- [ ] All flows validated in sandbox
- [ ] Named Credentials configured in target org
- [ ] External Credentials configured in target org
- [ ] Tray.io webhook URL updated for environment
- [ ] Permission sets exist in target org
- [ ] No hard-coded sandbox URLs or IDs

## Scratch Org Development

If using scratch orgs:

```bash
# Create scratch org from config
sf org create scratch --definition-file config/project-scratch-def.json --alias scratch-approvals

# Push metadata
sf project deploy start --target-org scratch-approvals

# Assign permission set (if exists)
sf org assign permset --name Commercial_Approvals_Admin --target-org scratch-approvals
```

## Debugging

### Flow Debug Logs

1. Setup → Debug Logs → New
2. Set user to debug
3. Run the flow
4. View logs in Developer Console

### Check Flow Errors

```bash
# Query failed flow interviews
sf data query --query "SELECT Id, FlowLabel, Status, ErrorMessage FROM FlowInterview WHERE Status = 'Error'" --target-org my-sandbox
```

### Common Issues

**"Insufficient access rights on cross-reference id"**
- Check that the running user has access to related records
- Verify Master-Detail relationships and sharing settings

**"INVALID_CROSS_REFERENCE_KEY"**
- A lookup field references a record that doesn't exist
- Check that IDs are being passed correctly between flow elements

**"This flow can't be run yet because it hasn't been activated"**
- Open the flow in Setup → Flows and click Activate

## Testing

### Unit Tests

The project includes Jest configuration for LWC testing:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:unit:coverage

# Watch mode
npm run test:unit:watch
```

### Manual Testing Checklist

- [ ] Small Deal approval request (creates Level 1)
- [ ] Small Deal Level 1 approval (creates Level 2)
- [ ] Small Deal Level 2 approval (final approval)
- [ ] Small Deal rejection at Level 1
- [ ] Standard PS Model approval request
- [ ] Standard PS Model approval
- [ ] Standard PS Model rejection
- [ ] Slack notification received
- [ ] Slack button click updates Salesforce

## Contributing

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

### Commit Messages

Follow conventional commits:
```
feat: add finance approval level for small deals
fix: resolve null pointer in approval flow
refactor: extract slack notification to subflow
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes and test in sandbox
3. Run `npm run lint` and `npm run prettier`
4. Open PR with description of changes
5. Deploy to QA sandbox for review
6. Merge after approval

## Useful Commands

| Command | Description |
|---------|-------------|
| `sf org open` | Open org in browser |
| `sf project deploy start` | Deploy metadata |
| `sf project retrieve start` | Retrieve metadata |
| `sf data query` | Run SOQL query |
| `sf apex run` | Execute anonymous Apex |
| `npm run lint` | Check code style |
| `npm run prettier` | Format all files |
