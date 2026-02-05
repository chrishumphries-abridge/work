# Territory Home Page - Frontend Dev Summary

## What We're Building

A dashboard LWC that shows a sales rep everything about their territory in one place - their accounts, opportunities, buying groups, and account plans. Think of it as a "home base" component.

---

## Component Architecture

```
territoryHomePage (main)
├── Header (greeting, stats bar, View As picker, refresh)
├── Accounts Section (card grid)
├── Opportunities Section (card grid)
├── Buying Groups Section (table/cards)
├── Account Plans Section (table/cards)
└── Modals (detail views when you click things)
    ├── accountDetailModal
    ├── opportunityDetailModal
    ├── accountPlanDetailModal
    └── coverageGapsModal (already exists, reuse it)
```

---

## Data Flow

1. **`connectedCallback`** loads settings first (feature flags, limits)
2. **`loadData()`** fetches everything in one Apex call → returns `TerritoryHomePageData` DTO
3. **Process data** into reactive properties (`this.accounts`, `this.opportunities`, etc.)
4. **Async load AI insights** after render (don't block initial paint)

```javascript
async connectedCallback() {
    this.setGreeting();
    await this.loadSettings();    // Phase 1: feature flags, limits
    this.loadData();              // Phase 2: main data
}

async loadData() {
    this.isLoading = true;
    try {
        const data = this.viewAsUserId
            ? await getTerritoryDataForUser({ targetUserId: this.viewAsUserId })
            : await getTerritoryData();

        if (data.success) {
            this.accounts = data.accounts;
            this.opportunities = data.opportunities;
            this.buyingGroups = data.buyingGroups;
            this.accountPlans = data.accountPlans;
            this.territorySummary = data.territorySummary;

            // Don't block render - load AI stuff after
            this.loadInsightsAsync();
        }
    } finally {
        this.isLoading = false;
    }
}
```

---

## Key Patterns to Copy

Look at **`revIntelMyPipeline`** - it's the template. Specifically:

| Pattern | File to Reference |
|---------|-------------------|
| Two-phase loading | `revIntelMyPipeline.js` lines 50-80 |
| Modal system | `revIntelMyPipeline.html` + `.js` modal handlers |
| View As dropdown | `revIntelMyPipeline.js` user picker section |
| Format utils | `revIntelFormatUtils/revIntelFormatUtils.js` |
| CSS patterns | `revIntelMyPipeline.css` |

---

## DTOs You'll Consume

The Apex returns **pre-formatted display values** (so you don't format in JS):

### Account Card
```javascript
{
    id: '001xxx',
    accountName: 'Acme Corp',
    healthStatus: 'warning',           // 'healthy' | 'warning' | 'at_risk'
    healthClass: 'slds-text-color_warning',
    healthScore: 55,                   // 0-100
    totalARRFormatted: '$125,000',     // pre-formatted
    openOpportunityCount: 3,
    openPipelineFormatted: '$50,000',
    daysSinceActivity: 12,
    lastActivityFormatted: 'Jan 15, 2026',
    hasActivePlan: true,
    buyingGroupCoverage: 67,           // percentage
    aiInsight: null,                   // loaded async
    insightLoaded: false
}
```

### Opportunity Card
```javascript
{
    id: '006xxx',
    dealName: 'Acme Expansion',
    accountName: 'Acme Corp',
    amountFormatted: '$75,000',
    stage: 'Negotiation',
    closeDateFormatted: 'Feb 28, 2026',
    riskLevel: 'medium',               // 'low' | 'medium' | 'high' | 'critical'
    riskClass: 'slds-text-color_warning',
    nextStep: 'Send proposal',
    hasStaleNextStep: false,
    buyingGroupCoverage: 80
}
```

### Buying Group Card
```javascript
{
    id: 'a0Xxxx',
    buyingGroupName: 'IT Committee',
    accountName: 'Acme Corp',
    buyingGroupType: 'Technical',
    coveragePercent: 67,
    coverageClass: 'fair',             // 'good' | 'fair' | 'poor'
    memberCount: 4,
    missingPersonas: ['Economic Buyer', 'Legal'],
    hasActiveOpportunity: true
}
```

### Account Plan Card
```javascript
{
    id: 'a1Xxxx',
    planName: 'Acme 2026 Plan',
    accountName: 'Acme Corp',
    status: 'active',
    statusClass: 'slds-badge_success',
    lastUpdatedFormatted: 'Jan 10, 2026',
    isStale: false,
    goalProgress: 45,                  // 0-100 percentage
    nextAction: 'Schedule QBR'         // AI-suggested or from plan
}
```

### Territory Summary (header stats)
```javascript
{
    totalAccounts: 12,
    healthyAccounts: 8,
    atRiskAccounts: 2,
    totalPipelineFormatted: '$1.2M',
    openOpportunities: 15,
    buyingGroupsWithGaps: 4,
    activePlans: 10
}
```

---

## Section Visibility

Settings-driven - each section can be toggled via Custom Metadata:

```javascript
get showAccountsSection() {
    return this.settings?.enableAccountsSection !== false;
}

get showOpportunitiesSection() {
    return this.settings?.enableOpportunitiesSection !== false;
}

get showBuyingGroupsSection() {
    return this.settings?.enableBuyingGroupsSection !== false;
}

get showAccountPlansSection() {
    return this.settings?.enableAccountPlansSection !== false;
}
```

---

## The Health Score Visual

0-100 composite score displayed as a badge or progress ring:

| Score | Status | Color | CSS Class |
|-------|--------|-------|-----------|
| 70-100 | Healthy | Green | `slds-theme_success` |
| 40-69 | Warning | Yellow | `slds-theme_warning` |
| 0-39 | At Risk | Red | `slds-theme_error` |

```html
<span class={account.healthClass}>
    {account.healthStatus}
</span>
```

---

## Modal System

Standard pattern - boolean flag + selected object:

```javascript
// State
showAccountModal = false;
selectedAccount = null;

// Open
handleAccountClick(event) {
    const accountId = event.currentTarget.dataset.id;
    this.selectedAccount = this.accounts.find(a => a.id === accountId);
    this.showAccountModal = true;
}

// Close
handleCloseAccountModal() {
    this.showAccountModal = false;
    this.selectedAccount = null;
}
```

```html
<template if:true={showAccountModal}>
    <c-account-detail-modal
        account={selectedAccount}
        onclose={handleCloseAccountModal}>
    </c-account-detail-modal>
</template>
```

---

## View As Feature

Allows managers to see other reps' territories:

```javascript
// State
viewAsUserId = null;
viewAsUserName = null;
showUserPicker = false;

// When user selected
handleSelectUser(event) {
    this.viewAsUserId = event.detail.userId;
    this.viewAsUserName = event.detail.userName;
    this.showUserPicker = false;
    this.loadData();  // Reload with new user
}

// Clear and go back to own view
handleClearViewAs() {
    this.viewAsUserId = null;
    this.viewAsUserName = null;
    this.loadData();
}
```

Show a banner when viewing as someone else:

```html
<template if:true={viewAsUserId}>
    <div class="slds-notify slds-notify_alert slds-theme_info">
        Viewing as {viewAsUserName}
        <button onclick={handleClearViewAs}>Back to My Territory</button>
    </div>
</template>
```

---

## Existing Components to Reuse

| Component | Location | Purpose |
|-----------|----------|---------|
| `coverageGapsModal` | `lwc/coverageGapsModal` | Shows missing personas in buying groups |
| `revIntelFormatUtils` | `lwc/revIntelFormatUtils` | `formatCurrency()`, date formatting |
| `fsc_lwcModal` | `lwc/fsc_lwcModal` | Generic modal wrapper |
| `memberActivityModal` | `lwc/memberActivityModal` | Activity summary for contacts |

---

## Styling Reference

Use SLDS classes:

```html
<!-- Card grid -->
<div class="slds-grid slds-wrap slds-gutters">
    <template for:each={accounts} for:item="account">
        <div key={account.id} class="slds-col slds-size_1-of-2 slds-medium-size_1-of-3">
            <article class="slds-card">
                <!-- card content -->
            </article>
        </div>
    </template>
</div>

<!-- Status badge -->
<span class="slds-badge slds-badge_success">Healthy</span>
<span class="slds-badge slds-badge_warning">Warning</span>
<span class="slds-badge slds-badge_error">At Risk</span>

<!-- Progress bar for coverage -->
<div class="slds-progress-bar">
    <span class="slds-progress-bar__value" style={coverageStyle}></span>
</div>
```

---

## Apex Methods to Wire/Call

```javascript
import getTerritoryData from '@salesforce/apex/TerritoryHomePageController.getTerritoryData';
import getTerritoryDataForUser from '@salesforce/apex/TerritoryHomePageController.getTerritoryDataForUser';
import getSettings from '@salesforce/apex/TerritoryHomePageController.getSettings';
import getAccountDetail from '@salesforce/apex/TerritoryHomePageController.getAccountDetail';
import getActiveUsers from '@salesforce/apex/TerritoryHomePageController.getActiveUsers';
```

---

## File Structure

```
force-app/main/default/lwc/
├── territoryHomePage/
│   ├── territoryHomePage.html
│   ├── territoryHomePage.js
│   ├── territoryHomePage.css
│   └── territoryHomePage.js-meta.xml
├── accountDetailModal/
│   ├── accountDetailModal.html
│   ├── accountDetailModal.js
│   ├── accountDetailModal.css
│   └── accountDetailModal.js-meta.xml
├── opportunityDetailModal/
│   └── ...
└── accountPlanDetailModal/
    └── ...
```

---

## meta.xml Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>65.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__HomePage</target>
        <target>lightning__AppPage</target>
    </targets>
</LightningComponentBundle>
```
