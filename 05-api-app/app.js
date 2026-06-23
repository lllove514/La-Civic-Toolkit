const API_BASE = "https://data.lacity.org/resource/2cy6-i7zn.json";

const form = document.getElementById("searchForm");
const zipInput = document.getElementById("zipInput");
const searchBtn = document.getElementById("searchBtn");
const resultsEl = document.getElementById("results");

async function fetchRequests(zip) {
    const params = new URLSearchParams({
        zipcode__c: zip,
        type: "Homeless Encampment",
        $order: "createddate DESC",
        $limit: 50,
    });

    const resp = await fetch(`${API_BASE}?${params}`);
    if (!resp.ok) {
        throw new Error(`API returned ${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
}

function renderResults(data, zip) {
    if (data.length === 0) {
        resultsEl.innerHTML =
            `<p class="empty-state">No homeless encampment requests found for ZIP code <strong>${zip}</strong>.</p>`;
        return;
    }

    const cards = data.map((r) => {
        const date = r.createddate
            ? new Date(r.createddate).toLocaleDateString("en-US", {
                  year: "numeric", month: "short", day: "numeric",
              })
            : "Unknown date";
        const address = r.locator_gis_returned_address || "No address available";
        const status = r.status || "Unknown";

        return `
            <div class="result-card">
                <div class="card-title">Case #${r.casenumber}</div>
                <div class="card-meta">
                    <span>${date}</span>
                    <span>Status: ${status}</span>
                </div>
                <div class="card-address">${address}</div>
            </div>`;
    }).join("");

    const plural = data.length === 1 ? "" : "s";
    resultsEl.innerHTML =
        `<p class="result-count">Found ${data.length} request${plural} near ZIP ${zip}</p>${cards}`;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const zip = zipInput.value.trim();
    if (!/^\d{5}$/.test(zip)) {
        resultsEl.innerHTML = `<p class="error-state">Please enter a valid 5-digit ZIP code.</p>`;
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";
    resultsEl.innerHTML = `<p class="loading">Looking up requests for ${zip}...</p>`;

    try {
        const data = await fetchRequests(zip);
        renderResults(data, zip);
    } catch (err) {
        resultsEl.innerHTML =
            `<p class="error-state">${err.message}.<br>Make sure you entered a valid LA ZIP code and try again.</p>`;
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
});
