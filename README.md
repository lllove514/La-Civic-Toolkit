# LA Civic Toolkit

Five small, self-contained projects about homelessness in Los Angeles. Each one
stands on its own, runs for free, and is small enough to read in a sitting.

| # | Project | What it is |
|---|---------|-----------|
| 01 | [data-script](./01-data-script) | Python script that pulls LA homeless 311 data, cleans it, and writes JSON + CSV |
| 02 | [dashboard](./02-dashboard) | Static Chart.js dashboard for 01's output |
| 03 | [website](./03-website) | Searchable directory of LA homeless services (shelters, food, medical, hotlines) |
| 04 | [form-to-sheet](./04-form-to-sheet) | Form that posts straight to a Google Sheet via Apps Script |
| 05 | [api-app](./05-api-app) | Look up encampment requests near a ZIP using LA's Socrata API |

Stack is deliberately boring: Python + pandas for 01, plain HTML/CSS/JS for the
rest, Chart.js from a CDN, and Google Apps Script for the form. No frameworks,
no build step.

Each folder has its own README. MIT licensed.
