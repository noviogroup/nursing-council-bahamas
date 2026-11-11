# Canonical domain redirects — 11 November 2026

- Public website: nursingcouncilbahamas.netlify.app → https://nursingcouncilbahamas.com
- Portal: nursing-council-portal.netlify.app → https://portal.nursingcouncilbahamas.com
- Forced 301 rules precede application rewrites and preserve paths/query strings. HTTP is upgraded to HTTPS by hosting before the canonical redirect. Browser checks also confirmed fragment preservation.
- Website source: 7f1f052; production deploy: 6af4b3583a9bfcb69b2c02a7. Portal source: 400876f; production deploy: 6af4b361f3de7b99c17749f5.
- Official Netlify config schema validation passed. Live alias checks passed for pages and static assets. Chrome rendered portal login and website home, education-training, indexing and registry with no uncaught page errors; checked website scripts/styles returned 200 and visible loaded images were intact.
- Existing authentication and custom domains unchanged. No real applications, accounts or notifications were mutated.
- Historical deployment/preview aliases are separate immutable deployments and are not disabled by these rules. The exact user-reported nursingcouncil.ttlify.io address is still unconfirmed; it is not a registered alias on either verified Netlify site.
