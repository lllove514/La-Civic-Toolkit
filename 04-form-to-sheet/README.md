# 04 - Form to Google Sheet

A form that posts submissions (resource suggestions, volunteer signups, etc.)
straight into a Google Sheet using Apps Script. No backend to host.

## How it works

The form in `index.html` validates the fields, then `app.js` POSTs the data as
JSON to an Apps Script web app. The script (`apps-script.gs`) appends a row to
your Sheet. Because the request uses `no-cors`, the page can't read the
response, so it assumes success if the request didn't error.

## Setup

1. **New Sheet.** Go to [sheets.new](https://sheets.new) and add a header row:
   `Timestamp | Name | Email | Type | Notes`

2. **Add the script.** In the Sheet, **Extensions -> Apps Script**, delete the
   default code, and paste `apps-script.gs`.

3. **Deploy.** **Deploy -> New deployment -> Web app**. Set "Execute as" to
   **Me** and "Who has access" to **Anyone**. Copy the URL it gives you
   (`https://script.google.com/macros/s/.../exec`).

4. **Wire it up.** In `app.js`, replace `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`
   with that URL.

5. **Test.** Open `index.html`, submit the form, and check the Sheet for a new
   row.

Until step 4 is done the form will just tell you the URL isn't configured.
