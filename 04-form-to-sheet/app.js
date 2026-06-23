// Paste your deployed Apps Script web app URL here (see README).
const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

const form = document.getElementById("submitForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("formStatus");

function validateField(id) {
    const el = document.getElementById(id);
    const errorEl = document.getElementById(id + "Error");
    if (!el.checkValidity()) {
        errorEl.textContent = el.validationMessage;
        return false;
    }
    errorEl.textContent = "";
    return true;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameValid = validateField("name");
    const emailValid = validateField("email");
    const notesValid = validateField("notes");
    if (!nameValid || !emailValid || !notesValid) return;

    if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE") {
        statusEl.textContent = "Apps Script URL not configured yet. See the README.";
        statusEl.className = "form-status error";
        return;
    }

    const payload = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        type: document.getElementById("type").value,
        notes: document.getElementById("notes").value.trim(),
        timestamp: new Date().toISOString(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    try {
        // no-cors because Apps Script doesn't send CORS headers - which also
        // means we can't read the response. If fetch doesn't throw, assume it
        // went through and check the Sheet to be sure.
        await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        statusEl.textContent = "Thanks, your submission was received.";
        statusEl.className = "form-status success";
        form.reset();
    } catch (err) {
        statusEl.textContent = `Submission failed: ${err.message}. Check the URL and try again.`;
        statusEl.className = "form-status error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
    }
});

// validate as the user leaves each field
["name", "email", "notes"].forEach((id) => {
    document.getElementById(id).addEventListener("blur", () => validateField(id));
});
