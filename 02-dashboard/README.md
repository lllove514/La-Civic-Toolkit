# 02 - Dashboard

A static page that charts the output from project 01: a bar chart of requests
by council district and a line chart over time, both with Chart.js.

## Run it

Open `index.html` in a browser. No server, no build step.

It reads `by_district.json` and `by_month.csv` from this folder. Those are
copies of project 01's output - run `python clean_data.py` in `01-data-script`
and copy the two files over to refresh.

## Deploy on GitHub Pages

Push the repo, then in **Settings -> Pages** pick "Deploy from a branch",
choose `main`, and set the folder to `/02-dashboard`. It'll be live at
`https://<user>.github.io/<repo>/02-dashboard/`.
