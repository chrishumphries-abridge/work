---
name: sfdc-impact
description: Salesforce impact analysis. Use when user asks "what uses X", "impact of changing X", "where is X referenced", or wants to understand dependencies before modifying a Salesforce component.
---

# Salesforce Impact Analysis

Analyze dependencies for Salesforce components across local source and the connected org.

## When to Use

Recognize impact analysis intent when user:
- Asks what uses a field, class, or flow
- Wants to know impact of changing/deleting something
- Asks "where is X referenced"
- Is planning a schema change
- Mentions "impact analysis" or "dependencies"

Examples:
- "what uses Approval_Status__c on Opportunity"
- "impact of deleting the BuyingGroupMemberController class"
- "where is the Request_Commercial_Approval flow triggered"
- "can I safely rename this field"

## Configuration

```
SFDX_ROOT: /Users/chris/sfdx
ORG_ALIAS: dvchumph
```

## Analysis Flow

### 1. Identify Component Type

Determine what type of component:
- **Custom Field** - format: `ObjectName.Field_Name__c` or just `Field_Name__c`
- **Apex Class** - format: `ClassName` or `ClassName.cls`
- **Flow** - format: `Flow_Name` or `Flow_Name.flow-meta.xml`
- **Custom Object** - format: `Object_Name__c`
- **LWC** - format: `componentName`

### 2. Search Local Source

Search across all SFDX projects at `/Users/chris/sfdx/`:

```bash
# For fields - search all metadata types
grep -r "Field_Name__c" /Users/chris/sfdx/*/force-app/ --include="*.cls" --include="*.flow-meta.xml" --include="*.validationRule-meta.xml" --include="*.js" --include="*.html"

# For classes - search for class references
grep -r "ClassName" /Users/chris/sfdx/*/force-app/ --include="*.cls" --include="*.flow-meta.xml"

# For flows - search for flow invocations
grep -r "Flow_Name" /Users/chris/sfdx/*/force-app/
```

### 3. Categorize Results

Group findings by dependency type:

| Category | File Patterns |
|----------|---------------|
| **Apex Classes** | `*.cls` |
| **Apex Tests** | `*Test.cls` |
| **Flows** | `*.flow-meta.xml` |
| **Validation Rules** | `*.validationRule-meta.xml` |
| **Formula Fields** | `*.field-meta.xml` (check for formula content) |
| **LWC JavaScript** | `*.js` in lwc folders |
| **LWC HTML** | `*.html` in lwc folders |
| **Triggers** | `*.trigger-meta.xml` |
| **Record Types** | `*.recordType-meta.xml` |
| **Page Layouts** | `*.layout-meta.xml` |
| **Permission Sets** | `*.permissionset-meta.xml` |

### 4. Read and Summarize

For each match:
1. Read the file to understand HOW the component is used
2. Categorize as: **reads**, **writes**, **conditions**, **displays**
3. Note the business logic context

### 5. Present Impact Report

Format output as:

```markdown
## Impact Analysis: [Component Name]

### Summary
- **Type**: [Field/Class/Flow/etc.]
- **Found in**: [N] projects
- **Total references**: [N]

### Dependencies by Type

#### Validation Rules ([N])
| Rule | Purpose | Usage |
|------|---------|-------|
| Rule_Name | Description | How it uses the component |

#### Flows ([N])
| Flow | Type | Usage |
|------|------|-------|
| Flow_Name | Screen/Record-Triggered | Reads/Writes/Conditions |

#### Apex Classes ([N])
| Class | Method | Usage |
|-------|--------|-------|
| ClassName | methodName:line | SOQL/DML/Logic |

#### LWC Components ([N])
| Component | Usage |
|-----------|-------|
| componentName | Displays/Edits |

### Risk Assessment

**If deleted:**
- [List what breaks]

**If renamed:**
- [List what needs updating]

**If picklist values change:** (for picklist fields)
- [List formulas/flows checking specific values]

### Blind Spots

Things I cannot see from source:
- Reports/Dashboards (not in source control)
- List Views (unless retrieved)
- Page Layout field placement (unless retrieved)
- Installed package dependencies
```

## Org Queries (Optional)

If deeper analysis needed, try Tooling API:

```bash
# Note: This query format may vary by API version
sf data query -q "SELECT MetadataComponentName, MetadataComponentType FROM MetadataComponentDependency WHERE RefMetadataComponentName LIKE '%ComponentName%'" --use-tooling-api -o dvchumph
```

If Tooling API fails, note in Blind Spots section.

## Rules

- **Be thorough** - search ALL projects, not just the obvious one
- **Show context** - read files to explain HOW something is used, not just that it's referenced
- **Warn about duplicates** - if same component exists in multiple projects, flag potential drift
- **Quantify risk** - "4 validation rules, 2 flows" is more useful than "several things"
- **Note blind spots** - always mention what you CAN'T see

## Examples

### Field Analysis Request
User: "what uses Approval_Status__c"

1. Search for `Approval_Status__c` across all projects
2. Find validation rules, flows, apex
3. Read each to understand read vs write vs condition
4. Present structured report

### Class Analysis Request
User: "impact of changing BuyingGroupMemberController"

1. Search for class name in other classes (dependencies)
2. Search for `@AuraEnabled` methods in LWC
3. Search for invocable methods in Flows
4. Map the call hierarchy
5. Present structured report

### Pre-Change Analysis
User: "can I safely delete Custom_Field__c"

1. Run full impact analysis
2. If zero dependencies: "Safe to delete"
3. If dependencies exist: list them and suggest migration path
