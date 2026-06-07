/**
 * A Bridge Within — form handler (Google Apps Script)
 * ---------------------------------------------------------------------------
 * Receives submissions from the website forms, logs each one to a tab in this
 * spreadsheet (one tab per form type), and emails the owner.
 *
 * SETUP (see apps-script/SETUP.md for the full walk-through):
 *   1. Create a Google Sheet, then Extensions → Apps Script.
 *   2. Paste this file in, set OWNER_EMAIL below, and Save.
 *   3. Deploy → New deployment → type "Web app":
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL into FORM_ENDPOINT in script.js.
 * ---------------------------------------------------------------------------
 */

// ▼▼▼ SET THIS ▼▼▼
var OWNER_EMAIL = "REPLACE_WITH_OWNER_EMAIL"; // e.g. "rachael@example.com"
// ▲▲▲ SET THIS ▲▲▲

var SITE_NAME = "A Bridge Within";

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // avoid two submissions writing at once

    var params = (e && e.parameter) ? e.parameter : {};

    // Honeypot: bots fill hidden fields. Pretend success, but drop it.
    if (params._honey) {
      return jsonOut({ ok: true });
    }
    delete params._honey;

    var formType = (params._form || "general").toString();
    delete params._form;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(formType) || ss.insertSheet(formType);

    var keys = Object.keys(params);
    var headers;

    if (sheet.getLastRow() === 0) {
      headers = ["Timestamp"].concat(keys);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      keys.forEach(function (k) {
        if (headers.indexOf(k) === -1) {
          headers.push(k);
          sheet.getRange(1, headers.length).setValue(k).setFontWeight("bold");
        }
      });
    }

    var row = headers.map(function (h) {
      if (h === "Timestamp") return new Date();
      return params[h] !== undefined ? params[h] : "";
    });
    sheet.appendRow(row);

    notifyOwner(formType, params);

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

// Lets you open the Web app URL in a browser to confirm it's live.
function doGet() {
  return jsonOut({ ok: true, message: SITE_NAME + " form endpoint is live." });
}

function notifyOwner(formType, params) {
  if (!OWNER_EMAIL || OWNER_EMAIL.indexOf("@") === -1) return;

  var lines = Object.keys(params).map(function (k) {
    return prettyLabel(k) + ": " + params[k];
  });

  var subject = "New " + prettyLabel(formType) + " submission — " + SITE_NAME;
  var body = "You received a new " + formType + " submission from the website:\n\n" +
             lines.join("\n") +
             "\n\nA copy has been saved to the responses spreadsheet.";

  var options = {};
  if (params.email && String(params.email).indexOf("@") > -1) {
    options.replyTo = params.email; // reply goes straight to the sender
  }
  MailApp.sendEmail(OWNER_EMAIL, subject, body, options);
}

function prettyLabel(s) {
  return String(s)
    .replace(/_/g, " ")
    .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
