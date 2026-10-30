const SPREADSHEET_NAME = '2026_company_trip';
const SHEET_NAME = '報名資料';
const HEADERS = ['姓名', 'Email', '單位', '電話', '職稱', '報名時間'];

function doGet() {
  const spreadsheet = getOrCreateSpreadsheet_();
  const link = '<a href="' + spreadsheet.getUrl() + '" target="_blank" rel="noopener">開啟報名試算表</a>';
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="zh-Hant"><meta charset="utf-8">' +
    '<title>員工旅遊報名服務</title><p>報名服務已就緒。</p><p>' + link + '</p></html>'
  );
}

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};
  const requestId = parameters.requestId || '';
  let result;

  try {
    const name = String(parameters.name || '').trim();
    const phone = String(parameters.phone || '').trim();
    const email = String(parameters.email || '').trim();

    if (!name || !phone) {
      throw new Error('姓名與電話為必填欄位。');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSpreadsheet_().getSheetByName(SHEET_NAME);
      const row = sheet.getLastRow() + 1;
      sheet.getRange(row, 1, 1, 5).setNumberFormat('@');
      sheet.getRange(row, 6).setNumberFormat('yyyy-mm-dd hh:mm:ss');
      sheet.getRange(row, 1, 1, HEADERS.length).setValues([[
        name,
        email,
        String(parameters.unit || '').trim(),
        phone,
        String(parameters.jobTitle || '').trim(),
        new Date()
      ]]);
    } finally {
      lock.releaseLock();
    }
    result = { ok: true, message: '' };
  } catch (error) {
    result = { ok: false, message: error.message || '資料儲存失敗，請稍後再試。' };
  }

  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><script>' +
    'window.top.postMessage(' + JSON.stringify({
      type: 'employee-trip-registration',
      requestId: requestId,
      ok: result.ok,
      message: result.message
    }).replace(/</g, '\\u003c') + ', "*");' +
    '</script><body>' + (result.ok ? '報名成功' : '報名失敗') + '</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getOrCreateSpreadsheet_() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    if (spreadsheet.getName() !== SPREADSHEET_NAME) {
      spreadsheet.rename(SPREADSHEET_NAME);
    }
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const defaultSheet =
      spreadsheet.getSheetByName('工作表1') || spreadsheet.getSheetByName('Sheet1');
    if (defaultSheet && defaultSheet.getLastRow() === 0) {
      defaultSheet.setName(SHEET_NAME);
      sheet = defaultSheet;
    } else {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
  }

  const unusedDefaultSheet =
    spreadsheet.getSheetByName('工作表1') || spreadsheet.getSheetByName('Sheet1');
  if (unusedDefaultSheet &&
      unusedDefaultSheet.getSheetId() !== sheet.getSheetId() &&
      unusedDefaultSheet.getLastRow() === 0) {
    spreadsheet.deleteSheet(unusedDefaultSheet);
  }

  sheet.getRange('A:E').setNumberFormat('@');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return spreadsheet;
}
