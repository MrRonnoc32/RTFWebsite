# Wiring up the forms (Google Sheet + email)

The website forms (newsletter signup, Speaking inquiry, Contact) post to a free
**Google Apps Script** web app. Each submission is saved to a Google Sheet you
own and emailed to the owner. No third-party service, no monthly limits.

You only do this once. Budget ~15–20 minutes.

## 1. Create the responses spreadsheet
1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **"A Bridge Within — Form Responses"**.
   (Tabs named `newsletter`, `speaking`, and `contact` are created automatically
   the first time each form is used.)

## 2. Add the script
1. In that sheet: **Extensions → Apps Script**.
2. Delete the sample `function myFunction() {}`.
3. Open `apps-script/Code.gs` from this repo, copy everything, and paste it in.
4. Near the top, set your email:
   ```js
   var OWNER_EMAIL = "rachael@example.com";  // where inquiries should go
   ```
5. Click **Save** (💾).

## 3. Deploy as a web app
1. Click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → **Web app**.
3. Set:
   - **Description:** anything (e.g. "Form handler v1")
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Click **Authorize access** and approve the permissions (it needs to write to
   your sheet and send email from your account). You may see a "Google hasn't
   verified this app" screen — click **Advanced → Go to (project name)** since
   it's your own script.
6. Copy the **Web app URL** (ends in `/exec`).

## 4. Connect the site to it
1. Open `script.js` in this repo.
2. Paste the URL into `FORM_ENDPOINT`:
   ```js
   var FORM_ENDPOINT = "https://script.google.com/macros/s/AKfyc.../exec";
   ```
3. Commit and push. That's it — submissions now hit your sheet and inbox.

> Until `FORM_ENDPOINT` is set, the forms stay in "demo mode": they show a
> thank-you message but don't send anything.

## Testing
- Open the site, submit a form. A new row should appear in the matching tab and
  an email should arrive at `OWNER_EMAIL`.
- You can also open the Web app URL directly in a browser — it should return
  `{"ok":true,"message":"A Bridge Within form endpoint is live."}`.

## Updating the script later
If you edit `Code.gs`, you must **re-deploy** for changes to take effect:
**Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy.**
The URL stays the same.

## Notes
- A hidden "honeypot" field filters out basic spam bots automatically.
- Replies to the notification email go straight to the person who submitted.
- The free Gmail/Apps Script quota is ~100 emails/day — far more than enough.
