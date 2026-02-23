# [AT] Salesforce SOQL Query

## Tool Description

Executes a SOQL query against Salesforce and returns matching records.

### Before Writing Any Query

1. **Check the field reference tables** in your instructions. They cover: Account, Opportunity, Buying Group, Buying Group Member, Conversation, Account Plan, Task, and Event. Use the exact API names listed.
2. **For objects not in the reference tables**, use `SELECT FIELDS(ALL) FROM {object} LIMIT 1` to discover available fields before writing a filtered query.
3. **Never guess or infer** field API names from labels.

### Common Gotchas

| Gotcha | Correct | Wrong |
|---|---|---|
| Next Step is a **standard field** | `NextStep` | `Next_Step__c`, `NextStep__c` |
| Next Activity Date | `Future_Task_Date_RU__c` | `NextActivityDate`, `Next_Activity_Date__c` |
| Filter renewals by count | `Renewal_Count__c = 0` | `Is_Renewal__c = false` (doesn't exist) |
| Hygiene scores are pre-calculated | `Hygiene_Percent_F__c` | Computing hygiene manually |
| Email activities on Task | `TaskSubtype = 'Email'` | Filtering by `Subject LIKE '%Email%'` |
| Account Plan (standard) | `AccountPlan` | `Account_Plan__c` (that's the legacy custom object) |
| Attention call links | `Attention_Link__c` on `Conversation__c` | Constructing URLs manually |

### Partial Name Matching

If a user provides a partial or informal name (e.g., "Riverside" instead of "Riverside Health System"), use a LIKE query:

```sql
SELECT Id, Name FROM Account WHERE Name LIKE '%Riverside%' LIMIT 5
```

Present matches to the user before proceeding with deeper queries.
