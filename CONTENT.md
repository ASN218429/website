# as218429.net — production content map

One static page, `public/index.html`, built from concept 27 (network overview). Production includes nothing from
`concepts/` or `research/`. Every path is root-absolute (`/assets/...`), so `public/` must be served as the site root.

## Copy map: one claim per section

| Section | The one claim | Merged in / removed |
| --- | --- | --- |
| Hero | AS218429 is the hosting and backbone network behind Ruxora and GaleniusNodes. Lead says who the site is for. Summary panel: ASN, AS name, RIPE NCC, upstreams, PletX via upstream, geofeed, PeeringDB. | Removed 27's second lead paragraph that repeated the H1, the provider → PletX → AS218429 → brands strip (it read as verified topology), the dated "snapshot 3 November" caption and the prefix count. |
| Networks | Which brand gets what: Ruxora gets hosting infrastructure and backbone connectivity; GaleniusNodes gets backbone connectivity. Customers go to the brand sites. | The separate **Services** section is folded into these two cards, which removes three repeats of the backbone and protection sentences. The customer note shows once here, not also in contact and footer. |
| DDoS protection | Traffic is filtered by PletX through our upstream. 8+ Tbps is labelled **upstream protection capacity**, with the NovaCloud (AS209874) attribution and a link right beside it. | Three published upstream capabilities, with one line saying they are not a per-service guarantee. No SLA, latency, own capacity or WAF claims. |
| Upstreams | AS209874 NovaCloud-Hosting (Tech Tide) and AS49581 Tube-Hosting, each linking to its ASN.net site. The Tube-Hosting looking glass is labelled as the upstream's. | Dropped the "In the registry" column and the dated RIPEstat neighbour note. A single line says this is registered policy, not live session status, and links RIPEstat. |
| Records and data | RIPE Database, RIPEstat, PeeringDB, bgp.he.net, plus the canonical `https://cdn.as218429.net/geofeed.csv` and `https://cdn.as218429.net/network.json`. | The inline prefix list and the address lookup are gone: they were a dated snapshot. The CDN files are now the source of truth. The "we have no looking glass" disclaimer is gone too. |
| Contact | One mailbox with three subject-line templates: network operations, infrastructure, abuse. There is also a copy-address button. | The compose form and the "Customers" card are gone because they duplicated the three routes. The header email button is gone because the nav and hero already link to Contact. |
| Footer | AS name, the two brand links, back to top. | The repeated tagline and registry-date sentence are gone. |

Mail templates (all to `gvol@nexusystems.org`):
- `AS218429 network operations: ` asks for your network/ASN, the prefix or IP, what you see (UTC), and traceroute/MTR.
- `AS218429 infrastructure question: ` asks for your organisation and the question.
- `AS218429 abuse report: ` asks for the affected IPs, date/time (UTC), type of abuse, and logs with time zone.

Not claimed anywhere: other addresses, 24/7 support, SLA, uptime, own filtering capacity, open peering, own looking glass, locations.

## Files

- `public/index.html`: the page, fixed to the Autumn palette (`<html data-palette="autumn">`, `theme-color` `#17110e`). It works without JS; the copy button ships `hidden` and appears only when JS runs.
- `public/assets/site.css`: the Autumn tokens on `:root` (so they apply without JS), plus the font faces. There is no other palette.
- `public/assets/site.js`: current-section nav marker, copy address, and a one-time removal of the retired `as218429-palette` localStorage key. Nothing reads `?palette=` or storage, so neither can change the colours. The Galenius palette, the palette switch and `palette.js` were removed on 2026-11-05.
- `public/assets/fonts/`: Schibsted Grotesk variable (latin) and IBM Plex Mono 400 (latin). Only these two files.
- `public/assets/brand/`: org/favicon mark. **Chosen: `org-icon.svg` / `org-icon.png`** (512×512, the "route" mark: two nodes joined by one bent path, in Autumn colours: amber `#eda75b` path, copper `#d87b44` start node, cream `#f4e9dc` end node, on umber `#241a14`). The PNG is exported from the SVG with ImageMagick. Alternatives are `org-icon-route` (identical to the chosen one, recoloured the same way), `org-icon-peak` (an A-chevron with a node) and `org-icon-stack` (bars; rejected because it reads as a menu icon). Peak and stack still use the old Galenius colours because they are not used. The page links the SVG as its favicon and the PNG as the apple-touch and og image.
- `public/robots.txt` and `public/sitemap.xml` use the canonical `https://as218429.net/`.

External brand and resource links use `target="_blank" rel="noopener noreferrer"`. The two CDN data links open in the same tab.

## Checks run (2026-11-05, Autumn-only pass, Helium/Chromium via CDP, local `python3 -m http.server`)

- 1440×900, 390×844 and 320×640 (DPR 2 on mobile), each loaded with a stale localStorage `as218429-palette=galenius` and with `?palette=galenius`: `data-palette` stays `autumn`, `theme-color` is `#17110e`, the body is `rgb(23,17,14)` and the primary button is `rgb(216,123,68)`. There is no picker element and no horizontal overflow. The console and log are empty, both fonts load, and the stale key is cleared.
- The favicon SVG returns 200 `image/svg+xml` and the header mark renders. Clicking Copy puts `gvol@nexusystems.org` on the clipboard, the button reads "Copied" and the live status is announced.
- With JS disabled, at all three sizes: Autumn colours, no overflow, and the copy button is hidden. The mailto routes remain.
- The copy, layout and links are unchanged from the previous pass; only the palette code and the icon colours changed.

## Limits

- The CDN URLs were not fetched; they depend on the parent's deployment. Outbound external sites were not re-fetched this pass.
- The copy button needs the Clipboard API (secure context). It reports "Copy failed" otherwise; the mailto link still works.
- Only latin font subsets are shipped. Characters outside that range fall back to the system font.
