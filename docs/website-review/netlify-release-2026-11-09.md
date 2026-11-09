# Full website production release — 9 November 2026

The owner explicitly approved publishing the live website at `https://nursingcouncilbahamas.com`.

## Published version

- Netlify project: `nursingcouncilbahamas` (`0eb229a2-0ce8-40e9-81f7-ac049cef1864`).
- Production deploy: `6af1dcde969e7c1ac76310eb`, ready and published at `2026-11-09T14:47:26.541Z`.
- Source: `design/current-site-nurse360`, commit `a34a65c` (reviewed application plus dependency lockfile repair).
- Deploy log: https://app.netlify.com/projects/nursingcouncilbahamas/deploys/6af1dcde969e7c1ac76310eb
- Production URLs: website `https://nursingcouncilbahamas.com`; Nurse 360 `https://portal.nursingcouncilbahamas.com`.
- Netlify production configuration now explicitly sets `PUBLIC_SITE_LIVE=true`, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_PORTAL_URL` to those live destinations.
- Complaint v2 and secure follow-up capabilities remain disabled. No Supabase migrations, real form submissions or notification deliveries were performed.

The production portal was not replaced. The matching portal header is hosted separately for review at `https://website-review--nursing-council-portal.netlify.app`, deploy `6af1db2904d177690fca33fd`, source commit `67e8ccc`. Demo sign-in is disabled there. Its Council links return to the website release-candidate alias.

## Build and verification

The local worktree and its shared dependency symlink caused incorrect Netlify packaging paths. The final release was built in a clean standalone clone at `/private/tmp/ncb-website-live-20261109`, with a real local `node_modules` directory, using Netlify CLI `27.16.3` and the configured Next.js adapter.

The tracked lockfile lacked 56 optional platform packages. It was repaired without changing any previously locked package versions, and a clean `npm ci` then passed. The repaired lockfile is committed so subsequent clean builds can reproduce the installation.

The complete adapter build passed TypeScript, Next.js lint/build, static page generation, function bundling and edge bundling. A release candidate was verified at `https://website-review--nursingcouncilbahamas.netlify.app` before the same built output was uploaded as a new production deploy. When deploying an already-built Next.js adapter output, use `.netlify/static`, not the restored raw `.next` build directory. With `netlify deploy` performing its own build, the adapter temporarily swaps its static output into the configured publish path during deployment.

Netlify confirms the production deploy contains the Next.js server handler, `registry-changed`, `sync-registry` and the middleware edge function. The initial failed/incomplete worktree candidates were never promoted to production.

Browser checks:

- The live custom domain renders the complete homepage and updated navigation, with no localhost or review URLs in its links.
- Live Nurse 360 links use the production portal domain.
- The live registry loads 25 first-page rows and reports 6,508 records at the time of verification.
- Education institutions and clinical-site logos load successfully after scrolling.
- Release-candidate checks covered Education, Forms & Applications, Contact, Complaints intake and About, without submitting any data.
- The introduction dialog opens and its 27-second video reaches ready state 4 without a media error; the poster is the selected 10-second frame.

These are deployment smoke checks, not completed Council UAT or an end-to-end test of submitting complaints, emails or applications. The operational acceptance work in `release-and-verification.md` still applies to backend capability activation.

## Source and future deployments

This was a manual production deployment. The Git-connected `main` branch has not been merged or pushed by this release. A later `main` deployment can replace this build; merge the reviewed source before the next routine production deployment, or use Netlify's publishing lock if this exact release must remain pinned. Publishing was not locked automatically.

The existing `.netlify` ignore rules remain in place. No credentials or Netlify local state were committed. A broad environment-variable listing was rejected by automatic approval review; only specific non-secret launch and URL settings were read or changed afterward.
