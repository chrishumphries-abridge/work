# Salesforce Forecasting: Handling Team Member Changes

## The Problem

When a team member changes teams in Salesforce, the native forecasting module reassigns all of their historical attainment to their new team. This occurs because forecasts are dynamically calculated based on the current role hierarchy or territory assignment.

**Impact:**
- Historical team performance becomes inaccurate
- Prior manager's attainment drops retroactively
- New manager's attainment inflates with deals they didn't manage
- Year-over-year and quarter-over-quarter comparisons become unreliable

---

## Best Practices

### 1. Capture Team/Manager at Time of Close (Recommended)

Create custom fields on the Opportunity object that stamp the team and manager information when a deal closes.

**Fields to add:**
- `Closing_Manager__c` (Lookup to User)
- `Closing_Team__c` (Text or Lookup)
- `Closing_Role__c` (Text)
- `Closing_Division__c` (Text)

**Implementation:**
- Use a Process Builder, Flow, or Apex trigger to populate these fields when `Stage = Closed Won`
- These fields become immutable historical records
- Build reports and dashboards from these stamped fields rather than live hierarchy

### 2. Use Reporting Snapshots

Create scheduled Reporting Snapshots to capture forecast and attainment data at regular intervals.

**Approach:**
- Create a custom object (e.g., `Forecast_Snapshot__c`) to store historical data
- Schedule snapshots at end of each month/quarter
- Include: User, Manager, Team, Quota, Attainment, Period
- Use snapshots for historical analysis instead of live forecast data

### 3. Implement a Custom Forecast History Object

Create a dedicated object to track forecast assignments over time.

**Object: `Forecast_Assignment_History__c`**
| Field | Type | Purpose |
|-------|------|---------|
| User | Lookup | The rep |
| Manager | Lookup | Manager at this time |
| Team | Text/Lookup | Team assignment |
| Start_Date | Date | When assignment began |
| End_Date | Date | When assignment ended |
| Quota | Currency | Quota for this period |

Query this object to calculate accurate historical attainment per manager/team.

### 4. Territory Management Considerations

If using Enterprise Territory Management:

- Territories provide more flexibility than role hierarchy
- Consider using territory snapshots
- Territory assignment rules can be date-bounded
- Historical territories can be preserved separately from current assignments

### 5. Collaborative Forecasting Settings

Review your Collaborative Forecasting configuration:

- **Forecast Hierarchy:** Understand if you're using Role Hierarchy or Territory Hierarchy
- **Quotas:** Quotas are assigned per period—these don't move with the user
- **Adjustments:** Manager adjustments stay with the forecast period, not the rep

### 6. Data Architecture for Mid-Period Transfers

For reps who change teams mid-quarter:

**Option A: Clean Break**
- Close out quota/attainment with old team at transfer date
- Start fresh quota with new team
- Prorate quotas based on days in period

**Option B: Finish the Period**
- Keep rep in forecast under old manager until period ends
- Transfer at natural boundary (quarter/year start)

**Option C: Split Attribution**
- Create mechanism to split credit between teams
- More complex but most accurate

---

## Implementation Recommendations

### Quick Win (Immediate)
1. Add `Closing_Manager__c` and `Closing_Team__c` fields to Opportunity
2. Create automation to stamp these on close
3. Backfill historical data using current values (accept some inaccuracy)
4. Update dashboards to use stamped fields

### Medium Term
1. Implement monthly forecast snapshots
2. Create historical attainment reports from snapshots
3. Document team change procedures

### Long Term
1. Build custom Forecast Assignment History tracking
2. Create comprehensive analytics on snapshot data
3. Consider CPQ or Revenue Cloud if forecasting needs are complex

---

## Reporting Queries

### Accurate Historical Attainment by Manager

```sql
SELECT Closing_Manager__c, SUM(Amount)
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate >= THIS_QUARTER
GROUP BY Closing_Manager__c
```

### Compare Live vs. Stamped Attribution

```sql
SELECT
  Owner.Manager.Name AS Current_Manager,
  Closing_Manager__r.Name AS Manager_At_Close,
  SUM(Amount)
FROM Opportunity
WHERE StageName = 'Closed Won'
GROUP BY Owner.Manager.Name, Closing_Manager__r.Name
```

---

## Key Takeaways

1. **Never rely solely on live hierarchy for historical reporting**—it will always reflect current state
2. **Stamp critical data at close**—this is the single most important fix
3. **Snapshot regularly**—point-in-time data is invaluable
4. **Plan team changes**—transfer at period boundaries when possible
5. **Document your methodology**—ensure finance and sales ops align on how attainment is calculated

---

## Related Salesforce Documentation

- [Collaborative Forecasting](https://help.salesforce.com/s/articleView?id=sf.forecasts3_overview.htm)
- [Reporting Snapshots](https://help.salesforce.com/s/articleView?id=sf.data_about_analytic_snap.htm)
- [Enterprise Territory Management](https://help.salesforce.com/s/articleView?id=sf.tm2_intro.htm)
