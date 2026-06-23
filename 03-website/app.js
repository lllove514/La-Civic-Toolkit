// Resource list lives here inline - small enough that a data file isn't worth it.
// Phone numbers and addresses were accurate when added, but orgs move and change
// hours, so double-check anything before relying on it.

const resources = [
    // shelters & housing
    {
        name: "LA Mission",
        category: "shelter",
        phone: "(213) 629-1227",
        address: "303 E 5th St, Los Angeles, CA 90013",
        url: "https://www.lamission.org",
        notes: "Men's shelter, meals, recovery programs. Intake daily at 5:30 AM.",
    },
    {
        name: "Union Rescue Mission",
        category: "shelter",
        phone: "(213) 628-6103",
        address: "545 S San Pedro St, Los Angeles, CA 90013",
        url: "https://www.urm.org",
        notes: "Shelter, meals, medical clinic, and case management for men, women, and children.",
    },
    {
        name: "Midnight Mission",
        category: "shelter",
        phone: "(213) 624-9258",
        address: "601 S San Pedro St, Los Angeles, CA 90014",
        url: "https://www.midnightmission.org",
        notes: "Comprehensive services: shelter, education, job training, recovery.",
    },
    {
        name: "Downtown Women's Center",
        category: "shelter",
        phone: "(213) 680-0600",
        address: "442 S San Pedro St, Los Angeles, CA 90013",
        url: "https://www.downtownwomenscenter.org",
        notes: "Day center and housing for women experiencing homelessness.",
    },
    {
        name: "PATH (People Assisting The Homeless)",
        category: "shelter",
        phone: "(213) 683-3330",
        address: "340 N Madison Ave, Los Angeles, CA 90004",
        url: "https://www.epath.org",
        notes: "Interim housing, street outreach, rental assistance, and case management.",
    },
    {
        name: "L.A. Family Housing",
        category: "shelter",
        phone: "(818) 982-4091",
        address: "7841 Lankershim Blvd, North Hollywood, CA 91605",
        url: "https://www.lafh.org",
        notes: "Emergency shelter and affordable housing for families in the San Fernando Valley.",
    },

    // food & meals
    {
        name: "St. Francis Center",
        category: "food",
        phone: "(213) 747-5347",
        address: "1835 S Hope St, Los Angeles, CA 90015",
        url: "https://www.stfranciscenterla.org",
        notes: "Daily meals, food pantry, showers, and mail services.",
    },
    {
        name: "LA Food Bank",
        category: "food",
        phone: "(323) 234-3030",
        address: "1734 E 41st St, Los Angeles, CA 90058",
        url: "https://www.lafoodbank.org",
        notes: "Distributes food through a network of 600+ partner agencies countywide.",
    },
    {
        name: "Hollywood Food Coalition",
        category: "food",
        phone: "(323) 462-2032",
        address: "5939 Hollywood Blvd, Los Angeles, CA 90028",
        url: "https://www.hofoco.org",
        notes: "Daily hot dinner program. No ID required, no questions asked.",
    },
    {
        name: "Samoshel (St. Joseph Center)",
        category: "food",
        phone: "(310) 396-6468",
        address: "204 Hampton Ave, Venice, CA 90291",
        url: "https://www.stjosephctr.org",
        notes: "Food pantry, meals, and supportive services on the Westside.",
    },

    // medical & health
    {
        name: "LA Christian Health Centers - Skid Row",
        category: "medical",
        phone: "(213) 689-1150",
        address: "241 S San Pedro St, Los Angeles, CA 90012",
        url: "https://www.lachristianhealth.org",
        notes: "Primary care, dental, mental health. Sliding scale, uninsured welcome.",
    },
    {
        name: "JWCH Institute - Center for Community Health",
        category: "medical",
        phone: "(562) 945-7776",
        address: "6060 E Firestone Blvd, Downey, CA 90241",
        url: "https://www.jwch.org",
        notes: "Medical, dental, mental health, and HIV services for homeless and underserved.",
    },
    {
        name: "Exodus Recovery - Crisis Residential",
        category: "medical",
        phone: "(323) 373-4242",
        address: "1000 W 7th St, Los Angeles, CA 90017",
        url: "https://www.exodusrecovery.com",
        notes: "Mental health crisis residential treatment for adults experiencing homelessness.",
    },

    // hotlines & crisis
    {
        name: "LA County 211 - Homeless Services Line",
        category: "hotline",
        phone: "2-1-1",
        address: "Countywide",
        url: "https://www.211la.org",
        notes: "Call 211 for shelter referrals, food, rental assistance, and crisis counseling. Available 24/7.",
    },
    {
        name: "National Suicide Prevention Lifeline",
        category: "hotline",
        phone: "988",
        address: "Nationwide",
        url: "https://988lifeline.org",
        notes: "Call or text 988 for 24/7 crisis support: mental health, substance use, suicidal thoughts.",
    },
    {
        name: "LA Homeless Services Authority (LAHSA)",
        category: "hotline",
        phone: "1-844-955-1964",
        address: "Countywide",
        url: "https://www.lahsa.org",
        notes: "Coordinated entry system for homeless services. Call for intake and shelter placement.",
    },
    {
        name: "Trevor Project (LGBTQ+ Crisis)",
        category: "hotline",
        phone: "1-866-488-7386",
        address: "Nationwide",
        url: "https://www.thetrevorproject.org",
        notes: "24/7 crisis support for LGBTQ+ young people. Also available via text (678-678) and chat.",
    },

    // other services
    {
        name: "Social Security Administration - Homeless Services",
        category: "services",
        phone: "1-800-772-1213",
        address: "Multiple locations",
        url: "https://www.ssa.gov/homelessness/",
        notes: "Helps people experiencing homelessness apply for SSI/SSDI benefits.",
    },
    {
        name: "VA Greater LA - Homeless Programs",
        category: "services",
        phone: "(877) 424-3838",
        address: "11301 Wilshire Blvd, Los Angeles, CA 90073",
        url: "https://www.va.gov/greater-los-angeles-health-care/programs/homeless-veteran-services/",
        notes: "Housing, health care, and benefits assistance for homeless veterans.",
    },
    {
        name: "Legal Aid Foundation of LA",
        category: "services",
        phone: "(800) 399-4529",
        address: "1550 W 8th St, Los Angeles, CA 90017",
        url: "https://www.lafla.org",
        notes: "Free legal help with housing, public benefits, and ID restoration.",
    },
];

function renderResources(list) {
    const container = document.getElementById("resourceList");

    if (list.length === 0) {
        container.innerHTML = `<p class="empty-state">No resources match your search. Try a different term.</p>`;
        return;
    }

    container.innerHTML = list
        .map(
            (r) => `
        <article class="resource-card">
            <h2>${r.name}</h2>
            <span class="category-badge">${categoryLabel(r.category)}</span>
            <p><strong>Phone:</strong> <a href="tel:${r.phone.replace(/[^0-9]/g, "")}">${r.phone}</a></p>
            ${r.address ? `<p><strong>Address:</strong> ${r.address}</p>` : ""}
            ${r.url ? `<p><strong>Website:</strong> <a href="${r.url}" target="_blank" rel="noopener">${new URL(r.url).hostname}</a></p>` : ""}
            ${r.notes ? `<p class="notes">${r.notes}</p>` : ""}
        </article>
    `
        )
        .join("");
}

function categoryLabel(cat) {
    const labels = {
        shelter: "Shelters & Housing",
        food: "Food & Meals",
        medical: "Medical & Health",
        hotline: "Hotlines & Crisis",
        services: "Other Services",
    };
    return labels[cat] || cat;
}

function filterResources() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;

    const filtered = resources.filter((r) => {
        const matchesCategory = category === "all" || r.category === category;
        const matchesSearch =
            r.name.toLowerCase().includes(searchTerm) ||
            r.category.toLowerCase().includes(searchTerm) ||
            r.notes.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderResources(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterResources);
document.getElementById("categoryFilter").addEventListener("change", filterResources);

renderResources(resources);