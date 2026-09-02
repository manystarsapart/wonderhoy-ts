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
