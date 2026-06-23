# 05 - API App

Looks up recent homeless encampment 311 requests near an LA ZIP code by calling
LA City's Socrata API directly from the browser. No key, no backend.

## Run it

Open `index.html` and type a 5-digit LA County ZIP (try 90013, 90017, or
90028), then hit Search.

## Deploy on GitHub Pages

In **Settings -> Pages**, pick "Deploy from a branch", choose `main`, and set
the folder to `/05-api-app`.

## The API call

`GET https://data.lacity.org/resource/2cy6-i7zn.json` with these params:

- `zipcode__c` - the ZIP
- `type` - `Homeless Encampment`
- `$order` - `createddate DESC`
- `$limit` - 50

Each result card shows the case number, the created date, the status, and the
returned address (`casenumber`, `createddate`, `status`,
`locator_gis_returned_address`).
