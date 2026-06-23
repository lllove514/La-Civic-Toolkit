# 01 - Data Script

Pulls LA 311 homeless encampment requests, cleans them, and writes two small
files that project 02 (the dashboard) reads.

## Run it

```bash
cd 01-data-script
pip install -r requirements.txt
python clean_data.py
```

Output lands in `output/`:

- `by_district.json` - `[{ "cd": 1, "count": 42 }, ...]`
- `by_month.csv` - `month,count`

To refresh the dashboard, copy those two files into `../02-dashboard/`.

## What it does

Fetches up to 5000 records of `type = "Homeless Encampment"` from the MyLA311
Cases dataset, drops rows with missing case numbers or dates, dedupes by case
number, parses the council district to an int, then counts requests by district
and by month.

If the API is down or returns nothing, it falls back to 200 generated rows so
the pipeline still produces output.

## Data source

[MyLA311 Cases 2026](https://data.lacity.org/resource/2cy6-i7zn.json) - LA City
open data, no API key needed, public domain.
