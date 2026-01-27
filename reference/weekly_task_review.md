# Weekly Task Review - Jan 6-12, 2026

## Overview
- **Total Tasks:** 12
- **Due Today (Jan 6):** 1
- **Due Wed (Jan 7):** 2
- **Due Thu (Jan 9):** 9

---

## Tuesday, January 6 (Today)

### 1. Review: Opp View: "NEW" button flow
**Due:** Jan 6 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
The "New" button on the SD Opportunity View uses the standard Salesforce workflow instead of connecting to the parent account. Need to replace it with a custom screen flow (similar to the Account button) that includes a step to select the correct Account.

**Current Status:**
- Task is defined with clear requirements
- Reference screenflow example provided
- SFDC links available for the target view

**Execution Plan:**
1. Review the existing Account button screenflow for reference
2. Create new screen flow with Account selection step
3. Build custom button to launch the flow
4. Replace the standard "New" button on the Opportunity Pipeline view
5. Test the new flow end-to-end
6. Document changes

---

## Wednesday, January 7

### 2. Launch Next Steps Hygiene In CW
**Due:** Jan 7 | **Priority:** Not set | **Subtasks:** 0 | **Parent:** Revenue Intelligence App

**Summary:**
Launch the Next Steps Hygiene feature in Clari/CW (Revenue Intelligence App).

**Current Status:**
- Task has no description/notes - appears to be a known deliverable
- Part of the larger Revenue Intelligence App initiative

**Execution Plan:**
1. Confirm what "Next Steps Hygiene" entails (review parent task if needed)
2. Verify configuration is complete
3. Enable/launch the feature in CW
4. Validate functionality
5. Communicate launch to stakeholders

---

### 3. Move Manager Territory Team field from Formula to Flow/Static Value
**Due:** Jan 7 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Convert the Manager Territory Team field on Opportunities from a formula field to a flow-populated static value. Also need to backfill all Closed Won/Closed Lost opportunities from 1/1/2025 to 12/31/2025.

**Current Status:**
- SFDC field link provided
- Backfill scope defined (2025 closed opps)

**Execution Plan:**
1. Create new text/picklist field to replace the formula field
2. Build flow to populate the field on Opportunity create/update
3. Export list of 2025 Closed Won/Closed Lost opportunities
4. Run data backfill (Data Loader or flow)
5. Validate backfilled data
6. Deprecate/remove old formula field (after validation period)

---

## Thursday, January 9

### 4. Updates for New Commercial Segment Guidelines + SOPs
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 2

**Summary:**
Supporting new PX models with SFDC updates for commercial eligibility criteria. Several items completed (strikethrough), remaining work focuses on approval processes.

**Current Status:**
- ~~New Account Fields (PS Model, IM Model)~~ - DONE
- ~~Automation for Physician Count triggers~~ - DONE
- ~~Process for Commercial Opps to Solution Design~~ - DONE
- Fields & Flow are ready
- **REMAINING:** Approval processes (items 4 & 5) need trigger for Close/Closed Won

**What's Left:**
- **Approval Process #1:** <10 physicians requires JVH/Aamir + Reba approval (Slack interface, SFDC trigger)
- **Approval Process #2:** Standard PS model for Commercial accounts with reasons "H2H", "Connection" (Meghan/Madeleine approval)
- Both need free text approval fields
- Need trigger to block Close/Closed Won until approved

**Execution Plan:**
1. Build Approval Process #1 (<10 physicians)
   - Create approval fields
   - Set up SFDC-triggered Slack notification
   - Configure approval routing
2. Build Approval Process #2 (Standard PS model)
   - Add reason picklist (H2H, Connection)
   - Set up Slack notification for Meghan/Madeleine
3. Add validation rule blocking stage progression without approval
4. Test both approval workflows
5. Document SOPs

---

### 5. Statuspage Alignment Report
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
No description provided - appears to be a recurring/known report deliverable.

**Current Status:**
- Task exists but lacks detail

**Execution Plan:**
1. Clarify what this report entails (check previous versions or ask stakeholder)
2. Pull necessary data
3. Generate report
4. Distribute to stakeholders

---

### 6. Create ability to restrict Workflow Launch on Ironclad Workflow lightning page element
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 1

**Summary:**
Build functionality to prevent SOW/Order Form launching until required fields are completed. Approach: two launcher sections with custom buttons and visibility rules. This is a background build - won't launch until training is complete.

**Current Status:**
- Requirements defined
- Approach identified (two launcher sections + visibility rules)
- Build-only phase (no launch yet)

**Execution Plan:**
1. Identify all required fields that must be populated
2. Create visibility rule logic
3. Build duplicate Ironclad launcher component with restricted access
4. Configure button visibility based on field completion
5. Test in sandbox
6. Document for future training/rollout

---

### 7. Self Review
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Performance self-review task.

**Current Status:**
- No details - standard HR/performance review task

**Execution Plan:**
1. Review performance review template/questions
2. Gather accomplishments and metrics from 2025
3. Draft self-assessment
4. Review and refine
5. Submit by deadline

---

### 8. Automation Alerts Review & Cleanup
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 2

**Summary:**
Audit current alerting setup for Tray and Salesforce automations. Remove non-error alerts and ensure all automations have proper error alerting.

**Current Status:**
- Task defined with clear scope
- Has 2 subtasks (likely Tray and SFDC split)

**Execution Plan:**
1. Export/list all current Tray workflow alerts
2. Export/list all Salesforce automation alerts (Flow, Process Builder, Apex)
3. Categorize: error alerts vs. informational alerts
4. Remove/disable non-error alerts
5. Identify automations missing error alerting
6. Add error alerts to gaps
7. Document final alerting inventory

---

### 9. Pull Roadmap Transcripts for Notebook LLM Analysis
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Pull transcripts from 121 roadmap calls (Strategic & Key accounts) for analysis in Notebook LLM. Google Sheet provided with call list and conversation IDs.

**Current Status:**
- Spreadsheet with 121 calls available
- Conversation IDs in Column B
- May need to scale down if 121 is too many

**Execution Plan:**
1. Review the Google Sheet to understand data structure
2. Determine extraction method (API, manual, export)
3. Decide on sample size (all 121 or subset)
4. Pull transcripts using conversation IDs
5. Format for Notebook LLM ingestion
6. Deliver to requester

---

### 10. Review VA Statuspage Automation
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Review and potentially automate Statuspage communications for VA. Context: every communication to VA is sensitive/important. Created from Slack thread.

**Current Status:**
- Originated from Slack discussion
- Goal is to automate VA statuspage updates internally
- Needs careful review given sensitivity

**Execution Plan:**
1. Review Slack thread for full context
2. Understand current VA Statuspage communication process
3. Identify automation opportunities
4. Design automation with appropriate safeguards
5. Document proposal/recommendation
6. Get stakeholder approval before implementation

---

### 11. Attention Call Tracking Asks
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Set up call tracking for specific use cases:
- ROI Calls for Brad
- Nursing Calls for Emily

**Current Status:**
- Screenshot attached showing context
- Two specific tracking needs identified

**Execution Plan:**
1. Clarify tracking requirements with Brad (ROI calls)
2. Clarify tracking requirements with Emily (Nursing calls)
3. Determine if this is Attention.com configuration or SFDC reporting
4. Build tracking/filtering mechanism
5. Create reports or dashboards as needed
6. Deliver to stakeholders

---

### 12. SFDC/Ironclad Sync Updates
**Due:** Jan 9 | **Priority:** Not set | **Subtasks:** 0

**Summary:**
Implement bi-directional sync capabilities between Salesforce and Ironclad. Need to determine which fields should sync both ways.

**Current Status:**
- High-level requirement defined
- Field mapping not yet determined

**Execution Plan:**
1. Document current SFDC → Ironclad sync fields
2. Document current Ironclad → SFDC sync fields
3. Meet with stakeholders to identify bi-directional needs
4. Define field-level sync rules (which direction wins on conflict?)
5. Implement sync updates
6. Test bi-directional flow
7. Document final sync configuration

---

## Suggested Prioritization

### Must Do Today (Jan 6)
- [ ] **Task 1:** Opp View "NEW" button flow

### Must Do Tomorrow (Jan 7)
- [ ] **Task 2:** Launch Next Steps Hygiene In CW
- [ ] **Task 3:** Manager Territory Team field conversion + backfill

### Thursday Block (Jan 9) - Heavy Day
**High Priority (blocking or external dependencies):**
- [ ] **Task 7:** Self Review (HR deadline)
- [ ] **Task 4:** Commercial Segment Guidelines (approval processes)
- [ ] **Task 6:** Ironclad Workflow restriction (build in background)

**Medium Priority (deliverables):**
- [ ] **Task 5:** Statuspage Alignment Report
- [ ] **Task 9:** Pull Roadmap Transcripts
- [ ] **Task 11:** Attention Call Tracking Asks

**Can Potentially Extend:**
- [ ] **Task 8:** Automation Alerts Review
- [ ] **Task 10:** VA Statuspage Automation Review
- [ ] **Task 12:** SFDC/Ironclad Sync Updates

---

*Generated: January 6, 2026*
