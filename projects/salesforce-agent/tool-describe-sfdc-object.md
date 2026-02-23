# [AT] Describe Salesforce Object

## Status: Deprecated

This tool has been replaced by hardcoded field reference tables in the system prompt. All commonly queried objects (Account, Opportunity, Buying Group, Buying Group Member, Conversation, Account Plan, Task, Event) are covered.

For objects not in the reference tables, the SOQL tool can use `SELECT FIELDS(ALL) FROM {object} LIMIT 1` to discover fields dynamically.

## If Re-enabling

If the describe tool is needed again in the future, use this description:

> Retrieves the metadata schema for a Salesforce object via the REST API describe endpoint. Returns field API names, labels, data types, and whether each field is filterable.
>
> Only use this tool for objects NOT covered in the field reference tables in your instructions. Call it once per object per session, then reuse the results.
