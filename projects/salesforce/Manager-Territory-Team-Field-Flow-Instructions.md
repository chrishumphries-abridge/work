# Manager Territory Team: Static Field & Flow Instructions

> Instructions for an LLM to build the Salesforce field and flow

## Background

The current `Manager_Territory_Team__c` field is a formula that dynamically calculates based on `Opportunity_Owner_Role__c` (which itself pulls from `Owner.UserRole.Name`). This means the value changes whenever the opportunity owner changes.

**Goal**: Create a static field that captures the manager territory team **at the moment the opportunity closes** - a point-in-time snapshot for accurate historical reporting.

---

## 1. Create New Field

**Object**: Opportunity

**Field Details**:
- **Label**: `Manager Territory Team`
- **API Name**: `Manager_Territory_Team_Static__c` (or your preferred name)
- **Type**: Text (50 characters) OR Picklist with values: `STRAT West`, `STRAT East`, `ENT West`, `ENT East`, `Commercial`, `National Accounts`
- **Description**: Captures the manager territory team at the moment the opportunity closes. Set automatically by Flow on close.

---

## 2. Build Record-Triggered Flow

**Flow Details**:
- **Type**: Record-Triggered Flow
- **Object**: Opportunity
- **Trigger**: A record is updated
- **Optimize for**: Actions and Related Records

### Entry Conditions

All conditions must be met (AND logic):

1. `IsClosed` EQUALS `TRUE`
2. `IsClosed` (Prior Value) EQUALS `FALSE`
3. `Manager_Territory_Team_Static__c` IS NULL

This ensures:
- Flow only fires when opportunity closes (not on every edit)
- Won't overwrite if manually set before close
- Won't re-trigger on future edits after close
- Allows manual correction/override if needed

---

### Decision Element: "Map Role to Territory Team"

Evaluate `{!$Record.Opportunity_Owner_Role__c}` and route to assignment branches:

| Outcome Name | Condition: Opportunity_Owner_Role__c EQUALS |
|--------------|---------------------------------------------|
| STRAT_West | `DED - Strategic West` OR `Strategic West - Manager` |
| STRAT_East | `DED - Strategic East` OR `Strategic East - Manager` |
| ENT_West | `DED - Enterprise West` OR `Enterprise West - Manager` |
| ENT_East | `DED - Enterprise East` OR `Enterprise East - Manager` |
| Commercial | `DED - Commercial` OR `Commercial - Manager` |
| National_Accounts | `National - Manager` |
| Default | (no match - do nothing or set null) |

---

### Assignment Elements

Each decision branch gets an **Update Records** element:

- **Record**: `{!$Record}` (the triggering Opportunity)
- **Field**: `Manager_Territory_Team_Static__c`
- **Value**: The corresponding territory team string (see table below)

| Branch | Set Field Value To |
|--------|--------------------|
| STRAT_West | `STRAT West` |
| STRAT_East | `STRAT East` |
| ENT_West | `ENT West` |
| ENT_East | `ENT East` |
| Commercial | `Commercial` |
| National_Accounts | `National Accounts` |

---

## 3. Backfill Historical Data (2025)

Use Data Loader to copy the current formula value to the new static field for all 2025 closed opportunities.

### Query

```sql
SELECT Id, Manager_Territory_Team__c
FROM Opportunity
WHERE (StageName = 'Closed Won' OR StageName = 'Closed Lost')
AND CloseDate >= 2025-01-01
AND CloseDate <= 2025-12-31
```

### Process

1. Export using the query above
2. Map `Manager_Territory_Team__c` (current formula value) → `Manager_Territory_Team_Static__c` (new field)
3. Update via Data Loader

**Note**: This uses current owner's role. If ownership changed post-close, the historical data may not perfectly reflect who actually closed the deal, but it's close enough for reporting purposes.

---

## Reference: Current Formula Logic

The existing `Manager_Territory_Team__c` formula field uses this CASE statement:

```
CASE(
  Opportunity_Owner_Role__c,
  "DED - Strategic West", "STRAT West",
  "DED - Enterprise East", "ENT East",
  "DED - Enterprise West", "ENT West",
  "DED - Strategic East", "STRAT East",
  "DED - Commercial", "Commercial",
  "National - Manager", "National Accounts",
  "Commercial - Manager", "Commercial",
  "Enterprise East - Manager", "ENT East",
  "Enterprise West - Manager", "ENT West",
  "Strategic West - Manager", "STRAT West",
  "Strategic East - Manager", "STRAT East",
  NULL
)
```

Where `Opportunity_Owner_Role__c` is a formula that pulls from `Owner.UserRole.Name`.

---

## Summary

| Aspect | Detail |
|--------|--------|
| **Trigger** | On Opportunity close (IsClosed flips to TRUE) |
| **Condition** | Only if new static field is blank |
| **Action** | Map owner role → territory team and stamp value |
| **Result** | Moment-in-time capture, allows manual override |
| **Backfill** | Copy formula value for 2025 Closed Won/Lost via Data Loader |
