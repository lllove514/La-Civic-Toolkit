async function loadData() {
    try {
        const [districtResp, monthResp] = await Promise.all([
            fetch("by_district.json"),
            fetch("by_month.csv"),
        ]);

        if (!districtResp.ok) throw new Error("couldn't load by_district.json");
        if (!monthResp.ok) throw new Error("couldn't load by_month.csv");

        const districtData = await districtResp.json();
        const csvText = await monthResp.text();

        // the CSV is two columns, not worth a parser
        const monthData = csvText.trim().split("\n").slice(1).map((line) => {
            const [month, count] = line.split(",");
            return { month, count: parseInt(count, 10) };
        });

        renderDistrictChart(districtData);
        renderMonthChart(monthData);
        renderStats(districtData, monthData);
    } catch (err) {
        document.querySelector(".dashboard-main").innerHTML =
            `<p class="error">Error loading data: ${err.message}. Make sure the JSON/CSV files are in this folder.</p>`;
    }
}

function renderDistrictChart(data) {
    const ctx = document.getElementById("districtChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map((d) => `CD ${d.cd}`),
            datasets: [{
                label: "Requests",
                data: data.map((d) => d.count),
                backgroundColor: "#0f3460",
                borderRadius: 4,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
        },
    });
}

function renderMonthChart(data) {
    const ctx = document.getElementById("monthChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.map((d) => d.month),
            datasets: [{
                label: "Requests",
                data: data.map((d) => d.count),
                borderColor: "#0f3460",
                backgroundColor: "rgba(15, 52, 96, 0.1)",
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: "#0f3460",
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
        },
    });
}

function renderStats(districtData, monthData) {
    const total = districtData.reduce((sum, d) => sum + d.count, 0);
    const maxDistrict = districtData.reduce((a, b) => (a.count > b.count ? a : b));

    document.getElementById("stats").innerHTML = `
        <div class="stat-item">
            <div class="stat-value">${total.toLocaleString()}</div>
            <div class="stat-label">Total Requests</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">CD ${maxDistrict.cd}</div>
            <div class="stat-label">Busiest District</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${maxDistrict.count.toLocaleString()}</div>
            <div class="stat-label">Requests in Busiest District</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${monthData.length}</div>
            <div class="stat-label">Months of Data</div>
        </div>
    `;
}

loadData();
