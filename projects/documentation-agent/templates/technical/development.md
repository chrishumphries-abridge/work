---
title: Development Guide
description: Local setup, testing, debugging, and contribution guidelines
---

# Development Guide

## Prerequisites

- Node.js >= 18.x (or relevant runtime)
- PostgreSQL >= 14 (or relevant database)
- Git

## Quick Start

```bash
# Clone the repository
git clone https://github.com/org/repo.git
cd repo

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your local settings

# Set up database
npm run db:create
npm run db:migrate
npm run db:seed  # Optional: load sample data

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Project Structure

```
.
├── src/
│   ├── api/           # Route handlers
│   ├── services/      # Business logic
│   ├── models/        # Data models
│   ├── middleware/    # Express middleware
│   ├── utils/         # Utility functions
│   └── index.ts       # Entry point
├── tests/
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── fixtures/      # Test data
├── config/            # Configuration files
├── db/
│   ├── migrations/    # Database migrations
│   └── seeds/         # Seed data
├── scripts/           # Utility scripts
└── docs/              # Documentation
```

---

## Development Workflow

### Running Locally

```bash
# Development mode with hot reload
npm run dev

# Production mode locally
npm run build
npm start
```

### Code Style

This project uses:
- ESLint for linting
- Prettier for formatting

```bash
# Check for issues
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

### Pre-commit Hooks

Husky runs these checks before each commit:
- Lint staged files
- Run type check
- Run affected tests

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific file
npm test -- path/to/test.spec.ts

# Run in watch mode
npm run test:watch
```

### Test Structure

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const input = { email: 'test@example.com', name: 'Test' };

      // Act
      const user = await userService.createUser(input);

      // Assert
      expect(user.email).toBe(input.email);
    });

    it('should throw if email already exists', async () => {
      // ...
    });
  });
});
```

### Test Database

Tests use a separate database:

```bash
# Create test database
npm run db:create:test

# Run migrations on test database
npm run db:migrate:test
```

---

## Database

### Migrations

```bash
# Create a new migration
npm run db:migration:create -- --name add_user_preferences

# Run pending migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback

# Reset database (drop, create, migrate, seed)
npm run db:reset
```

### Seeds

```bash
# Run all seeds
npm run db:seed

# Run specific seed
npm run db:seed -- --specific users
```

---

## Debugging

### VS Code

Launch configurations are provided in `.vscode/launch.json`:

- **Debug Server**: Start server with debugger attached
- **Debug Tests**: Run tests with debugger

### Logging

Set `LOG_LEVEL=debug` for verbose logging:

```typescript
import { logger } from './utils/logger';

logger.debug('Detailed info', { context: data });
logger.info('General info');
logger.error('Error occurred', { error });
```

### Common Issues

**Port already in use**
```bash
# Find process using port
lsof -i :3000
# Kill it
kill -9 <PID>
```

**Database connection refused**
```bash
# Check PostgreSQL is running
pg_isready
# Start if needed
brew services start postgresql  # macOS
```

**Module not found after pulling changes**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## API Development

### Adding a New Endpoint

1. Create route handler in `src/api/`:

```typescript
// src/api/widgets.ts
import { Router } from 'express';
import { widgetService } from '../services';

const router = Router();

router.get('/', async (req, res) => {
  const widgets = await widgetService.list();
  res.json({ data: widgets });
});

export default router;
```

2. Register in `src/api/index.ts`:

```typescript
import widgets from './widgets';
app.use('/api/widgets', widgets);
```

3. Add tests in `tests/integration/api/widgets.spec.ts`

---

## Contributing

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user preferences endpoint
fix: resolve race condition in order processing
docs: update API reference for v2 endpoints
refactor: extract validation logic to middleware
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with tests
3. Ensure all checks pass (`npm run check`)
4. Open PR with description of changes
5. Address review feedback
6. Squash and merge when approved

---

## Environment Setup

### macOS

```bash
# Install Homebrew packages
brew install node postgresql

# Start PostgreSQL
brew services start postgresql

# Create database user
createuser -s postgres
```

### Linux (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows (WSL2)

Use WSL2 with Ubuntu, then follow Linux instructions.

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run lint` | Check code style |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database |
| `npm run check` | Run all checks (lint, types, tests) |
