---
title: Troubleshooting
description: Solutions to common issues with [Product Name]
---

# Troubleshooting

Having issues? This guide covers the most common problems and their solutions.

## Quick Diagnostics

Before diving into specific issues, try these diagnostic steps:

```bash
# Check version
product-name --version

# Verify installation
product-name doctor

# Check configuration
product-name config --validate
```

---

## Installation Issues

### "Command not found" after installation

**Symptoms:** Terminal says `product-name: command not found`

**Causes:**
- Installation directory not in PATH
- Installation failed silently

**Solutions:**

1. Verify installation location:
   ```bash
   npm list -g product-name
   ```

2. Add to PATH if installed but not found:
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export PATH="$PATH:$(npm bin -g)"
   ```

3. Reinstall if needed:
   ```bash
   npm uninstall -g product-name
   npm install -g product-name
   ```

---

### "Permission denied" during installation

**Symptoms:** `EACCES: permission denied` errors

**Solutions:**

Option 1: Fix npm permissions (recommended)
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Option 2: Use a version manager like nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
npm install -g product-name
```

---

## Connection Issues

### "Connection refused" or timeout errors

**Symptoms:**
- `ECONNREFUSED`
- `ETIMEDOUT`
- "Unable to reach server"

**Causes:**
- Network/firewall blocking connection
- Server is down
- Incorrect endpoint configuration

**Solutions:**

1. Check server status:
   ```bash
   curl -I https://api.product.com/health
   ```

2. Verify your endpoint configuration:
   ```bash
   product-name config get endpoint
   ```

3. Check if behind a proxy:
   ```bash
   # Set proxy if needed
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   ```

4. Check firewall rules allow outbound HTTPS (port 443)

---

### "SSL certificate" errors

**Symptoms:** `UNABLE_TO_VERIFY_LEAF_SIGNATURE` or certificate errors

**Solutions:**

1. Update your CA certificates:
   ```bash
   # macOS
   brew install ca-certificates

   # Ubuntu/Debian
   sudo apt update && sudo apt install ca-certificates
   ```

2. If behind corporate proxy with certificate inspection, configure the CA:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/corporate-ca.crt
   ```

---

## Authentication Issues

### "Invalid API key" or "Unauthorized"

**Symptoms:** 401 or 403 errors

**Solutions:**

1. Verify your API key is set:
   ```bash
   product-name config get api_key
   ```

2. Check the key is valid in your dashboard

3. Regenerate if compromised or expired

4. Ensure no extra whitespace:
   ```bash
   # Wrong (has trailing space)
   API_KEY="sk_live_abc123 "

   # Correct
   API_KEY="sk_live_abc123"
   ```

---

### "Token expired"

**Symptoms:** Previously working auth now fails

**Solutions:**

1. Re-authenticate:
   ```bash
   product-name auth login
   ```

2. Check token expiry:
   ```bash
   product-name auth status
   ```

---

## Performance Issues

### Slow performance

**Symptoms:** Commands take longer than expected

**Solutions:**

1. Check your network speed to our servers:
   ```bash
   curl -o /dev/null -w "Time: %{time_total}s\n" https://api.product.com/health
   ```

2. Enable caching if available:
   ```bash
   product-name config set cache.enabled true
   ```

3. Reduce verbosity:
   ```bash
   product-name config set log_level warn
   ```

---

### High memory usage

**Symptoms:** Process using excessive RAM, system slowing down

**Solutions:**

1. Increase Node.js memory limit if processing large files:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" product-name command
   ```

2. Process files in batches instead of all at once

3. Check for memory leaks in plugins/extensions

---

## Data Issues

### "File not found" errors

**Symptoms:** `ENOENT: no such file or directory`

**Solutions:**

1. Verify the path exists:
   ```bash
   ls -la /path/to/file
   ```

2. Check for typos in file paths

3. Use absolute paths instead of relative:
   ```bash
   # Relative (may fail depending on working directory)
   product-name process ./data/file.json

   # Absolute (more reliable)
   product-name process /home/user/project/data/file.json
   ```

---

### "Invalid format" or parsing errors

**Symptoms:** `SyntaxError`, `Unexpected token`, validation failures

**Solutions:**

1. Validate your input file:
   ```bash
   # For JSON
   cat file.json | jq .

   # For YAML
   yamllint file.yaml
   ```

2. Check encoding (should be UTF-8):
   ```bash
   file -i yourfile.json
   ```

3. Look for invisible characters:
   ```bash
   cat -A file.json | head
   ```

---

## Configuration Issues

### Changes not taking effect

**Symptoms:** Updated config but behavior unchanged

**Solutions:**

1. Check which config file is being used:
   ```bash
   product-name config --show-path
   ```

2. Validate configuration:
   ```bash
   product-name config --validate
   ```

3. Check for overrides (env vars override files):
   ```bash
   env | grep PRODUCT
   ```

4. Restart after config changes if running as daemon

---

## Getting More Help

### Enable Debug Mode

Get detailed logs for debugging:

```bash
DEBUG=product-name* product-name command
# or
product-name command --verbose
```

### Generate a Diagnostic Report

Create a report to share with support:

```bash
product-name diagnose > diagnostic-report.txt
```

This includes (with sensitive data redacted):
- Version info
- Configuration
- System info
- Recent logs

### Contact Support

If you can't resolve the issue:

1. **Search existing issues**: [GitHub Issues](https://github.com/org/repo/issues)
2. **Community help**: [Discord/Slack](https://link)
3. **Email support**: support@example.com (include diagnostic report)

When reporting issues, include:
- What you were trying to do
- What happened (exact error message)
- What you expected to happen
- Your environment (OS, version, etc.)
- Steps to reproduce
