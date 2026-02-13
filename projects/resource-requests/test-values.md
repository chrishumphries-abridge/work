# Resource Request Test Values

Use these fake values for testing the Tray workflow.

## Salesforce Field Test Data

| Field | Test Value |
|-------|------------|
| `Id` | `a0B5f000001ABC123` |
| `Type__c` | `Solution Consulting` |
| `Account_Name__c` | `Mercy Health System` |
| `Opportunity_Name__c` | `Mercy Health - Clinical Notes Expansion` |
| `Preferred_Dates_Times__c` | `Feb 5-7, 2026 - Mornings preferred (EST)` |
| `Request_Context__c` | `Customer wants to see integration with Epic EHR. Key stakeholders: CMO, CMIO, and Director of Clinical Informatics. They currently have 150 providers and looking to expand to 300.` |
| `Solution_Consulting_Call_Type__c` | `Technical Deep Dive` |
| `Resource_Request_Product__c` | `Clinical Notes` |
| `Clinical_Setting__c` | `Ambulatory` |
| `Estimated_Annual_Encounters__c` | `450000` |
| `Implementation_Fee__c` | `75000` |
| `Total_Physician_Count__c` | `150` |
| `Number_of_Providers__c` | `175` |
| `Monthly_Cost_Per_Provider__c` | `299` |
| `Total_Number_of_RNs__c` | `85` |
| `Total_Number_of_RN_FTEs_for_Med_Surg__c` | `42` |
| `Total_Number_of_Staffed_Beds_in_Med_Surg__c` | `120` |
| `Monthly_Cost_Per_Staffed_Bed__c` | `150` |
| `Total_Patient_Days_for_Med_Surg__c` | `36500` |
| `ATP_Agreement__c` | `Yes` |

## JSON Format (for API testing)

```json
{
  "Id": "a0B5f000001ABC123",
  "Type__c": "Solution Consulting",
  "Account_Name__c": "Mercy Health System",
  "Opportunity_Name__c": "Mercy Health - Clinical Notes Expansion",
  "Preferred_Dates_Times__c": "Feb 5-7, 2026 - Mornings preferred (EST)",
  "Request_Context__c": "Customer wants to see integration with Epic EHR. Key stakeholders: CMO, CMIO, and Director of Clinical Informatics. They currently have 150 providers and looking to expand to 300.",
  "Solution_Consulting_Call_Type__c": "Technical Deep Dive",
  "Resource_Request_Product__c": "Clinical Notes",
  "Clinical_Setting__c": "Ambulatory",
  "Estimated_Annual_Encounters__c": 450000,
  "Implementation_Fee__c": 75000,
  "Total_Physician_Count__c": 150,
  "Number_of_Providers__c": 175,
  "Monthly_Cost_Per_Provider__c": 299,
  "Total_Number_of_RNs__c": 85,
  "Total_Number_of_RN_FTEs_for_Med_Surg__c": 42,
  "Total_Number_of_Staffed_Beds_in_Med_Surg__c": 120,
  "Monthly_Cost_Per_Staffed_Bed__c": 150,
  "Total_Patient_Days_for_Med_Surg__c": 36500,
  "ATP_Agreement__c": "Yes"
}
```

## Request Type Options

- `Demo/Road Map Request`
- `Solution Consulting`
- `ROI Call`
- `ATP Code Request`
- `Executive Request`
- `Partner Referral Request`
- `Deployment_Success`

## Product Options

- `Clinical Notes`
- `Nursing`

---

## Slack Block Kit Preview (ROI Call - Notes)

Copy this into [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) to preview.

```json
[
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*ROI Call Request - Notes*"
    }
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "<@U06JGBH18AG> <@U07ABC123XY>"
    }
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Account:* Mercy Health System"
      },
      {
        "type": "mrkdwn",
        "text": "*Opportunity:* Mercy Health - Clinical Notes Expansion"
      }
    ]
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Product:* Clinical Notes"
      },
      {
        "type": "mrkdwn",
        "text": "*Clinical Setting:* Ambulatory"
      }
    ]
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Preferred Date & Time:* Feb 5-7, 2026 - Mornings preferred (EST)"
      }
    ]
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Comments & Special Requests:*\nCustomer wants to see integration with Epic EHR. Key stakeholders: CMO, CMIO, and Director of Clinical Informatics."
    }
  },
  {
    "type": "divider"
  },
  {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Client Metrics*"
    }
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Est. Annual Encounters:*\n450,000"
      },
      {
        "type": "mrkdwn",
        "text": "*Implementation Fee:*\n$75,000"
      }
    ]
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Total Provider Count:*\n150"
      },
      {
        "type": "mrkdwn",
        "text": "*Number of Providers:*\n175"
      }
    ]
  },
  {
    "type": "section",
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Monthly Cost Per Provider:*\n$299"
      },
      {
        "type": "mrkdwn",
        "text": "*Total Number of RNs:*\n85"
      }
    ]
  }
]
```
