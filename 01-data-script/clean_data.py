import sys
import random
from pathlib import Path

import pandas as pd
import requests

# pandas writes the box-drawing chars as utf-8; the windows console defaults
# to cp1252 and throws UnicodeEncodeError without this.
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

DATA_URL = "https://data.lacity.org/resource/2cy6-i7zn.json"
OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(exist_ok=True)


def sample_data():
    # fallback so the dashboard still has something to draw when the API is down
    random.seed(7)
    rows = []
    for i in range(200):
        rows.append({
            "casenumber": f"SAMPLE-{i:04d}",
            "createddate": f"2026-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}T08:00:00.000",
            "locator_council_district": str(random.randint(1, 15)),
            "type": "Homeless Encampment",
            "status": "Closed",
        })
    return rows


def fetch():
    params = {
        "type": "Homeless Encampment",
        "$order": "createddate DESC",
        "$limit": 5000,
    }
    print(f"Fetching from {DATA_URL} ...")
    try:
        r = requests.get(DATA_URL, params=params, timeout=60)
        r.raise_for_status()
        rows = r.json()
    except Exception as e:
        print(f"API request failed ({e}), using sample data instead.")
        return sample_data()
    if not rows:
        print("API returned no rows, using sample data instead.")
        return sample_data()
    return rows


records = fetch()
print(f"  got {len(records)} raw records")

df = pd.DataFrame(records)
rows_in = len(df)

df = df.dropna(subset=["casenumber", "createddate"])
df["createddate"] = pd.to_datetime(df["createddate"], errors="coerce")
df = df.dropna(subset=["createddate"])
df = df.drop_duplicates(subset=["casenumber"])

# council district comes back as a string, and sometimes blank
if "locator_council_district" not in df.columns:
    df["locator_council_district"] = None
df["cd"] = pd.to_numeric(df["locator_council_district"], errors="coerce")
df = df.dropna(subset=["cd"])
df["cd"] = df["cd"].astype(int)

rows_out = len(df)
print(f"  kept {rows_out} rows after cleaning ({rows_in - rows_out} dropped)")
print(f"  dates {df['createddate'].min().date()} to {df['createddate'].max().date()}")

by_district = df.groupby("cd").size().reset_index(name="count").sort_values("cd")

df["month"] = df["createddate"].dt.to_period("M").astype(str)
by_month = df.groupby("month").size().reset_index(name="count").sort_values("month")

by_district.to_json(OUTPUT_DIR / "by_district.json", orient="records", indent=2)
by_month.to_csv(OUTPUT_DIR / "by_month.csv", index=False)

print(f"\nWrote {len(by_district)} districts and {len(by_month)} months to {OUTPUT_DIR}/")
