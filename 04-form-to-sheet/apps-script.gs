// Paste this into the Apps Script editor of your Google Sheet
// (Extensions -> Apps Script), then deploy it as a web app.
// Sheet header row, in this order: Timestamp | Name | Email | Type | Notes

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        sheet.appendRow([
            data.timestamp || new Date().toISOString(),
            data.name || "",
            data.email || "",
            data.type || "",
            data.notes || "",
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ result: "success" }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// lets you confirm the deployment works by opening the URL in a browser
function doGet() {
    return ContentService.createTextOutput("Deployed. POST form data to this URL.");
}
