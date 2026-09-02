---
title: 'Customising an iOS Widget for my Workplace'
pubDate: 2026-08-18
description: ''
author: 'msa'
license: 'CC BY-NC-SA 4.0'
image:
    url: '/blog/posts/fyt-workflow/widget.png'
    alt: 'Custom Widget'
tags: ["iOS", "Tech-Journal"]
---

# Customising an iOS Widget for my Workplace

## Preface

I like data. Data data data.

I want to see how business is going, and I don't need a complete Power BI report to see a daily dashboard yet. 

Hence, I thought up this workflow:

```plaintext
Google sheets → Apps Script → iOS Widget
```

### What we presently have

1. A Google Sheet updated in real time, with a new row created whenever there is income;
2. A developer with foundational Apps Script knowledge (yours truly); and
3. An iPhone or two.

**Let's try to make this work.**


## Part I: Google Sheet

Since there was no specific cell to lookup to get the income for `TODAY()`, I wanted to make one cell output the daily sum. 

1. In the sheet, find the latest row with a date value in column C.
2. Return the value of column Q in that row.

But during execution, I realised it is much easier to just look for `TODAY()` among the dates. Hence:

1. In column C, find today.
2. Return the value of column Q in that row.

So this is what I came up with:

```xlsx
=XLOOKUP(TODAY(),C3:C, Q3:Q, , 0, -1)
```

## Part II: Apps Script

Here's the big idea:

1. Open the sheet for the current month.
2. Get values.
3. Create payload and send it out.

Notably, I also added the data of the day before, in case I wanted to do any analyses and comparisons to the previous day. **~~我说战个未来有没有懂的~~**

```gs
function getDataToday() {
  // DEALING WITH DATE FORMATTING
  var date = new Date();
  var currentMonth = date.getMonth()+1;
  var currentYear = date.getFullYear();
  var currentSheetName = currentMonth < 10 ? `[ACC] 0${currentMonth}-${currentYear}` : `[ACC] ${currentMonth}-${currentYear}`;
  // console.log(currentSheetName);

  // NAME FORMATTING
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName(currentSheetName);
  var dailySum = inputSheet.getRange('W2').getValue();
  var yestSum = inputSheet.getRange('X2').getValue();

  // RETURNING
  var payload = {
    dailySum: dailySum,
    yestSum: yestSum,
    updated: new Date().toISOString()
  };

  console.log(payload)

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Let's deploy it! We are deploying it as a web app so that we can fetch these values every time our phone refreshes. 

**Side note**: I changed the access to allow anyone to run this script. This is such that the Clanker (that is my widget) can retrieve the payload without human intervention. 

![Deployment Config](/blog/posts/fyt-workflow/deployment-config.png)

## Part III: iOS Widget

I installed the iOS app [Scriptable](https://scriptable.app/). This app allows for custom (JS) scripts and programmable widgets.

![Scriptable in Apple Store](/blog/posts/fyt-workflow/scriptable.png)

Here's the big idea for the iOS side:

1. Fetch the payload from the deployed web app
2. Show each piece of information in the widget

That's all, really. And thank you Claude Code for help with the syntax below.

```js
const URL = "WEB_APP_URL";

async function getData() {
  try {
    const req = new Request(URL);
    req.timeoutInterval = 10;
    const json = await req.loadJSON();
    return json;
  } catch (e) {
    return { dailySum: "—", yestSum: "—", updated: null, error: true };
  }
}

async function createWidget() {
  const data = await getData();
  const w = new ListWidget();
  w.backgroundColor = new Color("#111111");

  const title = w.addText("FYT TODAY");
  title.font = Font.mediumSystemFont(12);
  title.textColor = new Color("#888888");

  w.addSpacer(4);

  const dailySum = w.addText(String(data.dailySum));
  dailySum.font = Font.boldSystemFont(28);
  dailySum.textColor = Color.white();

  w.addSpacer(4);
  
  const yestSum = w.addText("Yesterday: " + String(data.yestSum)); 
  yestSum.font = Font.mediumSystemFont(12);
  yestSum.textColor = Color.gray();
  
  w.addSpacer(4);
  

  if (data.updated) {
    const time = new Date(data.updated);
    const stamp = w.addText("Updated " + time.toLocaleTimeString());
    stamp.font = Font.systemFont(9);
    stamp.textColor = new Color("#555555");
  }

  return w;
}


const widget = await createWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  // preview when running inside the app
  widget.presentSmall(); 
}


Script.complete();
```

## Product

![Widget](/blog/posts/fyt-workflow/widget.png)

* **Note**: The `Updated` time is not reflected because this is a preview. It works in the implemented widget.

## Closing Thoughts

Scriptable looks really powerful. When I have time, I will definitely explore other modifications / additions to my phone powered by Scriptable.

I hope the Apps Script is more future-proof with the auto-naming system, but I will still need to check once a month to see if anything has broken. 

The styling of the widget probably has much room for improvement, but for now this will do.

## Files

* [scriptable.js](/blog/posts/fyt-workflow/scriptable.js)
* [send-today-sum.gs](/blog/posts/fyt-workflow/send-today-sum.gs)

---

☆———

---

© 2026 msa - CC BY-NC-SA 4.0

---