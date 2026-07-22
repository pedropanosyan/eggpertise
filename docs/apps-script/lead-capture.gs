/**
 * Lead capture endpoint for the EggPertise contact form.
 *
 * Deployed as a standalone Google Apps Script Web App. It replaces the former
 * Sheet.Best integration.
 *
 * The script is deliberately standalone rather than bound to the spreadsheet:
 * the leads file lives in an eggpertise.com Shared Drive, so a bound script
 * would belong to that organisation and cannot be deployed from an external
 * account. A standalone project is owned by the deploying account instead, and
 * reaches the spreadsheet through openById.
 *
 * Setup:
 *   1. script.google.com > New project (do NOT create it from the spreadsheet).
 *   2. Paste this file, then set SHARED_SECRET below.
 *   3. Deploy > New deployment > Web app.
 *        Execute as:       Me
 *        Who has access:   Anyone
 *   4. Copy the /exec URL into LEADS_SHEET_ENDPOINT, and the secret below into
 *      LEADS_SHEET_TOKEN, in .env and in the Vercel project settings.
 *
 * The deploying account needs write access to the spreadsheet, since the Web
 * App runs as that account rather than as the visitor submitting the form.
 *
 * Note: Apps Script Web Apps always answer HTTP 200, even on failure, so the
 * caller must inspect the `ok` field of the JSON body rather than the status.
 */

// Must match LEADS_SHEET_TOKEN in the app environment.
const SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_STRING";

// Leads spreadsheet, taken from its URL: /spreadsheets/d/<ID>/edit
const SPREADSHEET_ID = "1w_ZjMuc7X2wUQxedim-ZWo7qYnTxSx6LhP2uNEmxczA";

// Tab that holds the leads. The Dashboard tab reads from it by formula.
const SHEET_NAME = "Leads";

// Columns the script derives itself rather than taking from the request.
const ID_COLUMN = "ID";
const DATE_COLUMN = "Fecha";
const RAW_DATE_COLUMN = "Fecha (API raw)";

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
  // openById rather than getActiveSpreadsheet: this project is standalone and
  // has no container document to read from.
  const sheet =
    SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found');
  }

  // Serialises concurrent submissions so two leads cannot claim the same ID.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];

    const now = new Date();

    const row = headers.map(function (header) {
      const key = String(header).trim();

      if (key === ID_COLUMN) {
        return nextId(sheet, headers);
      }

      // A real Date object, not an ISO string: the Dashboard groups leads by
      // month, and text timestamps are never matched by those formulas.
      if (key === DATE_COLUMN) {
        return now;
      }

      // Kept as text on purpose — this column preserves the exact instant the
      // API reported, independent of the spreadsheet timezone.
      if (key === RAW_DATE_COLUMN) {
        return now.toISOString();
      }

      return Object.prototype.hasOwnProperty.call(payload, key)
        ? payload[key]
        : "";
    });

    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Returns the next correlative ID, continuing from the highest one present.
 * Falls back to the row count when the column holds no usable numbers.
 */
function nextId(sheet, headers) {
  const idIndex = headers.indexOf(ID_COLUMN);
  const lastRow = sheet.getLastRow();

  if (idIndex === -1 || lastRow < 2) {
    return 1;
  }

  const values = sheet.getRange(2, idIndex + 1, lastRow - 1, 1).getValues();

  const highest = values.reduce(function (max, cell) {
    const value = Number(cell[0]);
    return isFinite(value) && value > max ? value : max;
  }, 0);

  return highest + 1;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(
    JSON.stringify(body)
  ).setMimeType(ContentService.MimeType.JSON);
}
