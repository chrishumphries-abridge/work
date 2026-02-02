---
title: Configuration
description: Environment variables, settings, and configuration options
---

# Configuration

## Overview

This application uses environment variables for configuration. Copy `.env.example` to `.env` for local development.

## Environment Variables

### Required

These must be set for the application to start:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `SECRET_KEY` | Application secret for signing | 32+ character random string |
| `API_KEY` | External service API key | `sk_live_...` |

### Optional

These have sensible defaults:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP server port | `3000` |
| `LOG_LEVEL` | Logging verbosity | `info` |
| `NODE_ENV` | Environment mode | `development` |
| `CACHE_TTL` | Cache time-to-live (seconds) | `3600` |
| `MAX_CONNECTIONS` | Database pool size | `10` |

### Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_FEATURE_X` | Enable experimental feature X | `false` |
| `ENABLE_ANALYTICS` | Send analytics events | `true` |
| `ENABLE_RATE_LIMITING` | Enable API rate limiting | `true` |

---

## Configuration Files

### `config/default.json`

Base configuration for all environments:

```json
{
  "server": {
    "port": 3000,
    "host": "0.0.0.0"
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "cache": {
    "ttl": 3600,
    "checkPeriod": 600
  }
}
```

### `config/production.json`

Production overrides:

```json
{
  "logging": {
    "level": "warn"
  },
  "cache": {
    "ttl": 7200
  }
}
```

### `config/test.json`

Test environment overrides:

```json
{
  "logging": {
    "level": "error"
  },
  "cache": {
    "ttl": 0
  }
}
```

---

## Configuration Priority

Configuration is loaded in this order (later overrides earlier):

1. `config/default.json`
2. `config/{NODE_ENV}.json`
3. Environment variables
4. Command-line arguments

---

## Secrets Management

### Local Development

Use `.env` file (never commit to git):

```bash
# .env
DATABASE_URL=postgresql://localhost:5432/myapp_dev
SECRET_KEY=local-dev-secret-not-for-production
```

### Production

Use your platform's secrets management:

- **AWS**: Secrets Manager or Parameter Store
- **GCP**: Secret Manager
- **Kubernetes**: Secrets
- **Heroku**: Config Vars

---

## Database Configuration

### Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]?[options]
```

### Connection Pool Options

| Option | Description | Default |
|--------|-------------|---------|
| `max` | Maximum connections | `10` |
| `min` | Minimum connections | `2` |
| `idleTimeoutMillis` | Close idle connections after | `30000` |
| `connectionTimeoutMillis` | Timeout for new connections | `5000` |

### SSL Configuration

For production databases requiring SSL:

```
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

---

## Logging Configuration

### Log Levels

| Level | Description |
|-------|-------------|
| `error` | Errors only |
| `warn` | Warnings and errors |
| `info` | General information (default) |
| `debug` | Detailed debugging |
| `trace` | Very verbose tracing |

### Log Format

- **Development**: Pretty-printed, colorized
- **Production**: JSON (for log aggregation)

---

## CORS Configuration

```typescript
{
  cors: {
    origin: ['https://app.example.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
}
```

| Option | Description | Default |
|--------|-------------|---------|
| `origin` | Allowed origins | `*` in dev |
| `methods` | Allowed HTTP methods | All |
| `credentials` | Allow cookies | `false` |

---

## Rate Limiting

| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_WINDOW_MS` | Time window in ms | `60000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

---

## Example `.env.example`

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp_dev

# Security
SECRET_KEY=change-this-to-a-random-string

# External Services
API_KEY=your-api-key-here

# Feature Flags
ENABLE_FEATURE_X=false
ENABLE_ANALYTICS=false

# Logging
LOG_LEVEL=debug
```

---

## Validation

Configuration is validated at startup. The application will fail to start if:

- Required variables are missing
- Values are invalid (wrong type, out of range)
- Database connection fails

Check logs for specific validation errors.
