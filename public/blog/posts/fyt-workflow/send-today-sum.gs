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
``
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