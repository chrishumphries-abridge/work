# Documentation Agent

Generate technical and end-user documentation from code and technical metadata.

---

## Quick Start

**User says:** "Document `path/to/project`" or "Generate docs for `path/to/code`"

**Claude does:**
1. Analyze the codebase
2. Generate documentation based on what's found
3. Output to `output/<project-name>/`

---

## Analysis Phase

When given a directory to document, analyze in this order:

### 1. Project Discovery
- Check for existing docs: `README.md`, `docs/`, `CLAUDE.md`
- Check for package files: `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`
- Check for config: `.env.example`, `config/`, `settings`
- Identify language/framework from file extensions and imports

### 2. Architecture Analysis
- Entry points: `main.*`, `index.*`, `app.*`, `server.*`
- Directory structure and organization patterns
- Key modules and their responsibilities
- Data flow between components

### 3. API Surface (if applicable)
- REST endpoints (routes, controllers)
- GraphQL schemas
- CLI commands
- Public functions/classes meant for external use

### 4. Data Models
- Database schemas, migrations
- Type definitions, interfaces
- Data validation rules

### 5. Configuration & Environment
- Required environment variables
- Configuration options
- Feature flags

### 6. Dependencies
- External services (databases, APIs, queues)
- Third-party libraries and their purpose

---

## Documentation Outputs

Generate two types of documentation:

### Technical Documentation (`output/<project>/technical/`)

**For developers who will maintain or extend the code.**

| File | Purpose |
|------|---------|
| `architecture.md` | System overview, component diagram, data flow |
| `api-reference.md` | All endpoints/functions with parameters, returns, examples |
| `data-models.md` | Schemas, types, relationships |
| `configuration.md` | All config options, env vars, defaults |
| `development.md` | Local setup, testing, debugging, contributing |

### End-User Documentation (`output/<project>/user/`)

**For people who will use the software, not modify it.**

| File | Purpose |
|------|---------|
| `getting-started.md` | Installation, first run, "hello world" |
| `user-guide.md` | Core features and how to use them |
| `how-to/` | Task-based guides (folder of specific workflows) |
| `troubleshooting.md` | Common issues and solutions |
| `faq.md` | Frequently asked questions |

---

## Writing Guidelines

### Technical Docs
- Assume reader knows the language/framework basics
- Include code examples from the actual codebase
- Document the "why" not just the "what"
- Link between related sections
- Include diagrams where helpful (use Mermaid)

### End-User Docs
- Assume no technical knowledge unless specified otherwise
- Step-by-step instructions with expected outcomes
- Screenshots or terminal output examples where helpful
- Use consistent terminology (define terms on first use)
- Task-oriented: "How to X" not "The X feature"

### Formatting Standards
- Use GitHub-flavored Markdown
- Code blocks with language specifiers
- Tables for structured data
- Consistent header hierarchy (h1 for title, h2 for sections, h3 for subsections)
- Front matter with title and description

---

## Workflow

### Step 1: Gather Context
```
Read: README, CLAUDE.md, package files
Explore: Directory structure, key source files
Identify: Language, framework, architecture pattern
```

### Step 2: Analyze Code
```
Map: Entry points → modules → data layer
Extract: APIs, types, configuration
Note: Patterns, conventions, dependencies
```

### Step 3: Generate Technical Docs
```
Start with architecture.md (sets context for everything else)
Then api-reference.md (concrete details)
Then data-models.md, configuration.md, development.md
```

### Step 4: Generate User Docs
```
Start with getting-started.md (first experience)
Then user-guide.md (core features)
Then how-to guides (specific tasks)
Finally troubleshooting.md and faq.md
```

### Step 5: Review & Refine
```
Check for broken links
Verify code examples work
Ensure consistency in terminology
Fill gaps identified during writing
```

---

## Special Cases

### CLI Tools
- Document all commands and flags
- Include example invocations with output
- User docs focus on common workflows

### APIs/Libraries
- Emphasize API reference completeness
- Include integration examples
- User docs show real-world usage patterns

### Web Applications
- Document routes and authentication
- Include UI workflows in user docs
- Screenshots for user-facing features

### Infrastructure/DevOps
- Document deployment processes
- Include runbooks for operations
- Configuration management emphasis

---

## Templates

Reference templates in `templates/` for consistent structure:
- `templates/technical/` - Technical doc templates
- `templates/user/` - End-user doc templates

---

## Output Structure

```
output/
└── <project-name>/
    ├── technical/
    │   ├── architecture.md
    │   ├── api-reference.md
    │   ├── data-models.md
    │   ├── configuration.md
    │   └── development.md
    └── user/
        ├── getting-started.md
        ├── user-guide.md
        ├── how-to/
        │   └── *.md
        ├── troubleshooting.md
        └── faq.md
```

---

## Customization

Users can specify:
- **Audience**: "This is for internal devs only" → skip user docs
- **Focus**: "Focus on the API" → emphasize api-reference.md
- **Format**: "Single file" → concatenate into one doc
- **Depth**: "Quick overview" vs "comprehensive"

---

## Tips

- When in doubt, document it (can always trim later)
- Copy actual code snippets rather than paraphrasing
- If something is confusing in the code, note it as a documentation gap
- Check for existing docs first to avoid duplicating effort
- Preserve any existing good documentation, enhance rather than replace
