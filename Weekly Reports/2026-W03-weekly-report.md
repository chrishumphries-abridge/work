# Weekly Report - W03 (Jan 13-17, 2026)

---

## Summary

Shipped the VA Intel Slack Digest for Julia — first automated digest sent Wednesday. Also delivered a major Buying Group LWC update (in feedback mode), cleared Finance requests (Contract End Date, Planhat Products), and wrapped up support items. 9 tasks completed. Ironclad remains blocked on Zack.

---

## Shipped

**VA Intel Slack Digest — LIVE**
- Full end-to-end pipeline operational
- 7 sources: Orange Slices, Reddit (3 subs), veterans.house.gov, LinkedIn (Shulkin + Paul)
- AI-powered relevance scoring (OpenAI) and summarization
- Daily digest to Slack via Canvas (8am CT)
- First digest sent Wednesday — gathering Julia's feedback
- Remaining subtasks scoped: RFP tracking, sam.gov, newsletters, Damika forwards

**Buying Group LWC Major Update**
- Significant component behavior changes deployed
- Currently in feedback mode with team

**Finance & Integration Requests**
- Contract End Date field on Opportunity (for Sam/Finance)
- Planhat Products (Recurring & Non-Recurring)

**Support & Docs**
- Attention Sync Issue resolved (vendor follow-up closed)
- Next Steps Agent slides delivered
- VA Intel workflow documentation complete

---

## Completed (9 tasks)

| Task | Category |
|------|----------|
| VA Intel Digest - First digest sent | Feature |
| Buying Group LWC Updates | Feature |
| Pull Contract End Date from SFDC | Data |
| Planhat Products (Recurring & Non-Recurring) | Integration |
| Review Attention Sync Issue | Support |
| Slides for Next Steps Agent | Documentation |
| VA Intel workflow documentation | Documentation |
| Google News source tags defined | Config |
| Clinical Notes Solution Value (solution design) | Feature |

---

## Deferred

| Task | Original Due | New Due | Reason |
|------|--------------|---------|--------|
| Solution Design Bypass Changes | Jan 15 | Jan 20 | Lower priority, pushed for VA Intel |
| Automation Alerts Review & Cleanup | Jan 16 | TBD | Backlog — not started |
| Tray <> Zendesk Webhook | Jan 16 | TBD | Backlog — not started |
| Offboarding | Jan 16 | TBD | Backlog — not started |
| Competitor/Ambient Agent scoping | Jan 16 | TBD | Backlog — not started |
| Explore LaunchDarkly API | Jan 17 | TBD | Lower priority |

---

## Blocked

| Task | Blocker | Owner |
|------|---------|-------|
| Ironclad Workflow Restriction | Identify Required Fields | Zack Blois |

*Note: Blocked since W02. Needs follow-up.*

---

## Not Completed (Carrying Forward)

| Task | Status | Priority |
|------|--------|----------|
| Clinical Notes Solution Value | Needs finish/deploy | High — Mon |
| Statuspage Alignment Report | Started, needs wrap-up | High — Mon |
| Buying Group LWC feedback | In feedback mode | As needed |
| Narrow down Leads Slack channel | Overdue (Dec 10) | Revisit scope |

---

## Next Week Focus (W04: Jan 20-24)

**Priority: Finish unfinished > Deferred > New**

- **Monday:** Clinical Notes Solution Value, Statuspage Alignment Report, Solution Design Bypass
- **Tue-Wed:** VA Intel iteration based on Julia feedback
- **Thursday:** LaunchDarkly <> Slack prep (due Jan 30)
- **Friday:** Weekly close-out

**Blocked:** Ironclad — ping Zack Monday

---

## Notes

- VA Intel first week live — expect iteration based on feedback
- Several backlog items (Automation Alerts, Zendesk Webhook, Offboarding) punted — consider reprioritizing or closing
- Leads Slack channel task overdue since Dec 10 — needs decision: defer, descope, or close
- OpenAI API key dependency for VA Intel LLM vetting — task `1212722772937719` due Jan 24 to address alerting
