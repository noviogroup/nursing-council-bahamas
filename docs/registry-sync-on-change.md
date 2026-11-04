# Register sync on change

The public register search reads a copy of the Council register (Airtable base
"Nursing Council RN") held in Supabase. This copy is refreshed when Airtable
changes, not by reading Airtable on a fixed clock.

## How it works

1. **Airtable automations** on "Scanned RN files" and "RN 24-26" fire when a row
   is created or when its name, category, number or year changes. Each run POSTs
   to `/.netlify/functions/registry-changed` with the header
   `x-registry-change-token` (Netlify secret `REGISTRY_CHANGE_TOKEN`).
2. **registry-changed** checks the token and flags the register in
   `airtable_registry_sync_state.change_pending_at`. It does not read Airtable.
3. **sync-registry** runs every five minutes and asks the database
   (`claim_airtable_registry_sync`) whether a full read is due:
   - `change`: a reported change has been quiet for two minutes, so a pasted
     batch of 100 nurses is read once;
   - `daily`: the last full read is a day old. This also picks up deleted rows,
     which Airtable automations do not report;
   - otherwise it stops without contacting Airtable.
4. A due run reads both tables, and the existing fingerprint check skips the
   rebuild when nothing in the published rows changed. If a change-triggered
   run fails, the flag is set again and the next run retries.

Before the database has `claim_airtable_registry_sync`, the job falls back to a
full read once an hour.

## Cost

| Situation | Airtable requests |
|---|---|
| No changes | 0 per five-minute check, about 60 once a day |
| Changes made | about 60 per settled batch of edits |

## What it does not do

It refreshes the register copy only. Creating portal nurse records for new
register entries and applying name fixes to existing portal records remain
staff decisions on the portal's Registry gaps screen.
