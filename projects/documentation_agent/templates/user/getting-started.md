---
title: Getting Started
description: Installation and first steps with [Product Name]
---

# Getting Started with [Product Name]

Welcome! This guide will help you get up and running with [Product Name] in just a few minutes.

## What is [Product Name]?

[One paragraph explaining what the product does and who it's for.]

## Prerequisites

Before you begin, make sure you have:

- [ ] Prerequisite 1 (e.g., "A GitHub account")
- [ ] Prerequisite 2 (e.g., "Node.js 18 or later installed")
- [ ] Prerequisite 3 (e.g., "An API key from our dashboard")

## Installation

### Option 1: [Primary method, e.g., npm]

```bash
npm install product-name
```

### Option 2: [Alternative method]

```bash
# Alternative installation command
```

## Quick Start

Let's create your first [thing] in 3 steps.

### Step 1: [First action]

[Clear instruction with expected outcome]

```bash
# Command or code example
product-name init
```

You should see:
```
✓ Initialized successfully
  Created: config.json
  Created: .product-name/
```

### Step 2: [Second action]

[Clear instruction]

```bash
# Next command
product-name create my-first-thing
```

### Step 3: [Third action]

[Final instruction to complete the hello-world experience]

```bash
product-name run
```

**Congratulations!** You've just [accomplished the basic goal].

## Verify It's Working

To confirm everything is set up correctly:

```bash
product-name status
```

You should see:
```
Status: Active
Version: 1.2.3
Config: Valid
```

## What's Next?

Now that you're set up, here are some suggested next steps:

- **[Core feature 1]**: Learn how to [do primary thing] → [User Guide](user-guide.md#feature-1)
- **[Core feature 2]**: Set up [secondary thing] → [How-to Guide](how-to/feature-2.md)
- **[Configuration]**: Customize settings → [Configuration Guide](../technical/configuration.md)

## Need Help?

- **Documentation**: You're here! Browse the sidebar for more guides.
- **Community**: Join our [Discord/Slack/Forum](https://link)
- **Issues**: Report bugs on [GitHub Issues](https://github.com/org/repo/issues)
- **Support**: Email support@example.com

---

## Common Setup Issues

### "Command not found" after installation

Make sure the installation directory is in your PATH:

```bash
# Check where it was installed
which product-name

# If not found, add to PATH (bash/zsh)
export PATH="$PATH:$(npm bin -g)"
```

### "Permission denied" errors

On macOS/Linux, you may need to fix permissions:

```bash
sudo chown -R $(whoami) ~/.product-name
```

### "Connection refused" or network errors

Check your firewall settings and ensure you can reach our servers:

```bash
curl -I https://api.product.com/health
```

---

[Next: User Guide →](user-guide.md)
