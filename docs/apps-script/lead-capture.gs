/**
 * Lead capture endpoint for the EggPertise contact form.
 *
 * Deployed as a Google Apps Script Web App bound to the leads spreadsheet.
 * It replaces the former Sheet.Best integration.
 *
 * Setup:
 *   1. Open the spreadsheet > Extensions > Apps Script.
 *   2. Paste this file, then set SHARED_SECRET and SHEET_NAME below.
 *   3. Deploy > New deployment > Web app.
 *        Execute as:       Me
 *        Who has access:   Anyone
 *   4. Copy the /exec URL into LEADS_SHEET_ENDPOINT, and the secret below into
 *      LEADS_SHEET_TOKEN, in .env and in the Vercel project settings.
 *
 * Note: Apps Script Web Apps always answer HTTP 200, even on failure, so the
 * caller must inspect the `ok` field of the JSON body rather than the status.
 */

// Must match LEADS_SHEET_TOKEN in the app environment.
const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_STRING";

// Tab that holds the leads. Rename if the sheet uses a different tab.
const SHEET_NAME = "Hoja 1";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Empty request body" });
    }

    const payload = JSON.parse(e.postData.contents);

    if (payload.token !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    appendLead(payload);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Lead capture failed: " + error);
    return jsonResponse({ ok: false, error: String(error) });
  }
}

/**
 * Appends the lead using the header row as the column map, so reordering or
 * inserting columns in the spreadsheet does not misalign the data.
 */
function appendLead(payload) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found');
  }

  // Serialises concurrent submissions so two leads cannot claim the same row.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    const row = headers.map(function (header) {
      const key = String(header).trim();
      return Object.prototype.hasOwnProperty.call(payload, key)
        ? payload[key]
        : "";
    });

    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(body) {
  return ContentService.createTextOutput(
    JSON.stringify(body)
  ).setMimeType(ContentService.MimeType.JSON);
}
