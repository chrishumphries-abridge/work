# [AT] Salesforce SOQL Query

## Tool Description

Executes a SOQL query against Salesforce and returns matching records.

### Before Writing Any Query

1. **Check the field reference tables** in your instructions for Account and Opportunity API names. Use those exact names.
2. **For other objects**, call [AT] Describe Salesforce Object first to get valid field names.
3. **Never guess or infer** field API names from labels.

### Common Gotchas

| Gotcha | Correct | Wrong |
|---|---|---|
| Next Step is a **standard field** | `NextStep` | `Next_Step__c`, `NextStep__c` |
| Next Activity Date | `Future_Task_Date_RU__c` | `NextActivityDate`, `Next_Activity_Date__c` |
| Filter renewals by count | `Renewal_Count__c = 0` | `Is_Renewal__c = false` (doesn't exist) |
| Hygiene scores are pre-calculated | `Hygiene_Percent_F__c` | Computing hygiene manually |

### Partial Name Matching

If a user provides a partial or informal name (e.g., "Riverside" instead of "Riverside Health System"), use a LIKE query:

```sql
SELECT Id, Name FROM Account WHERE Name LIKE '%Riverside%' LIMIT 5
```

Present matches to the user before proceeding with deeper queries.
