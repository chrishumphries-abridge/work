---
name: flow-docs
description: Generate documentation from Salesforce Flow XML. Use when user asks to "document this flow", "explain this flow", "what does this flow do", or wants Flow documentation.
---

# Flow Documentation Generator

Parse Salesforce Flow XML and generate human-readable documentation.

## When to Use

Recognize documentation intent when user:
- Asks "what does this flow do"
- Asks to "document" or "explain" a flow
- Wants to understand flow logic before modifying
- Needs to hand off a flow to someone else
- Asks for a "flow diagram" or "flow summary"

## Configuration

```
SFDX_ROOT: /Users/chris/sfdx
```

## Workflow

### 1. Find the Flow

If user provides a name, search for it:
```bash
find /Users/chris/sfdx -name "*FlowName*.flow-meta.xml"
```

If ambiguous, list matches and ask user to clarify.

### 2. Parse Flow Structure

Read the flow XML and extract:

**Metadata:**
- `label` — Display name
- `processType` — Flow, AutoLaunchedFlow, ScreenFlow, etc.
- `apiVersion`
- `status` — Active, Draft, Obsolete
- `triggerType` — RecordBeforeSave, RecordAfterSave, Scheduled, etc. (if record-triggered)
- `triggerOrder` — Execution order (if record-triggered)
- `object` — Trigger object (if record-triggered)

**Entry Conditions (Record-Triggered):**
- `triggerType` + `recordTriggerType` (Create, Update, CreateAndUpdate)
- `filterLogic` + `filters` — Entry criteria

**Variables:**
- `variables` — Name, dataType, isInput, isOutput
- `recordLookups` — SOQL-like queries
- `constants`

**Logic Elements:**
- `decisions` — Branch points with conditions
- `assignments` — Variable assignments
- `loops` — Collection iteration
- `collectionProcessors` — Filter, Sort, etc.

**Actions:**
- `recordCreates` — Insert records
- `recordUpdates` — Update records
- `recordDeletes` — Delete records
- `actionCalls` — Apex, External Service, Subflow calls
- `screens` — User interface screens

### 3. Generate Documentation

Output format:

```markdown
# Flow: [Label]

## Overview
| Property | Value |
|----------|-------|
| API Name | `Flow_API_Name` |
| Type | [Record-Triggered / Screen / Autolaunched] |
| Object | [Trigger object if applicable] |
| Trigger | [Before Save / After Save / Scheduled] |
| Status | [Active / Draft] |

## Purpose
[One sentence description based on flow name and logic]

## Entry Conditions
[For record-triggered flows]
Runs when: [Object] is [Created / Updated / Created or Updated]
Filter: [Describe the entry criteria in plain English]

Example:
- Field `Status__c` equals "Pending"
- AND `Amount__c` is greater than 1000

## Flow Diagram

```
[Start]
    │
    ▼
[Get Related Records] ─── Query Account by Opp.AccountId
    │
    ▼
[Decision: Is Commercial?]
    │
    ├─ Yes ──▶ [Update Opp Status]
    │               │
    │               ▼
    │          [Send Notification]
    │               │
    │               ▼
    │          [End]
    │
    └─ No ───▶ [End]
```

## Detailed Steps

### 1. [Element Label]
**Type:** [Decision / Assignment / Record Update / etc.]
**Purpose:** [What this step does]

[For Decisions:]
| Outcome | Condition | Next Step |
|---------|-----------|-----------|
| Yes | Field = Value | Step 2 |
| Default | — | End |

[For Record Operations:]
- Object: `Object__c`
- Fields: `Field1__c`, `Field2__c`
- Filter: [if applicable]

### 2. [Next Element]
...

## Fields Referenced
| Object | Field | Usage |
|--------|-------|-------|
| Opportunity | `Approval_Status__c` | Read in Decision, Write in Update |
| Account | `PS_Model__c` | Read in Decision |

## External Dependencies
- **Apex Classes:** [List any invoked Apex]
- **Subflows:** [List any called subflows]
- **External Services:** [List any external callouts]

## Notes
[Any observations: potential issues, hardcoded values, etc.]
```

### 4. Offer Additional Analysis

After generating docs, offer:
- "Want me to check what uses this flow?"
- "Should I analyze the fields for impact?"
- "Want me to compare this to another flow?"

## Parsing Tips

**Decision Logic:**
```xml
<decisions>
    <name>Check_Status</name>
    <rules>
        <name>Is_Approved</name>
        <conditionLogic>and</conditionLogic>
        <conditions>
            <leftValueReference>$Record.Status__c</leftValueReference>
            <operator>EqualTo</operator>
            <rightValue><stringValue>Approved</stringValue></rightValue>
        </conditions>
        <connector><targetReference>Next_Step</targetReference></connector>
    </rules>
    <defaultConnector><targetReference>End_Step</targetReference></defaultConnector>
</decisions>
```
→ "If Status equals 'Approved', go to Next_Step. Otherwise, go to End_Step."

**Record Lookups:**
```xml
<recordLookups>
    <name>Get_Account</name>
    <object>Account</object>
    <filters>
        <field>Id</field>
        <operator>EqualTo</operator>
        <value><elementReference>$Record.AccountId</elementReference></value>
    </filters>
    <outputReference>accountRecord</outputReference>
</recordLookups>
```
→ "Query Account where Id = trigger record's AccountId, store in `accountRecord`"

## Rules

- **Plain English** — Translate XML into readable descriptions
- **Show the path** — ASCII diagram of flow structure
- **List all fields** — Complete field reference for impact analysis
- **Note hardcoded values** — Flag magic strings/IDs that might break
- **Identify fault paths** — Note if error handling is missing
