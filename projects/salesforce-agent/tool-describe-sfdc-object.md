# [AT] Describe Salesforce Object

## Tool Description

Retrieves the metadata schema for a Salesforce object via the REST API describe endpoint. Returns field API names, labels, data types, and whether each field is filterable.

**IMPORTANT:** Do NOT use this tool for Account or Opportunity objects. Field reference tables for these objects are already provided in your instructions — use those directly.

Only use this tool for objects NOT covered in your instructions (e.g., Contact, Task, Account_Plan__c, or other custom objects). Call it once per object per session, then reuse the results.

### Object API Names

| Object | API Name |
|---|---|
| Contacts | `Contact` |
| Tasks / Activity | `Task` |
| Account Plans | `Account_Plan__c` (verify) |

### What to Extract

From the response, focus on the `fields` array. For each field, note:

- **`name`** — the API name to use in SOQL
- **`type`** — data type (string, picklist, boolean, reference, etc.)
- **`filterable`** — must be `true` to use in a WHERE clause
