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

- `public/index.html`: the page. It works without JS; the palette switch and copy button only appear when JS runs.
- `public/assets/site.css`: tokens for both palettes, plus the font faces.
- `public/assets/palette.js`: loaded synchronously in `<head>`. Galenius is the default; `?palette=autumn` applies for one load; the choice is stored in localStorage `as218429-palette`.
- `public/assets/site.js`: palette switch, current-section nav marker, copy address.
- `public/assets/fonts/`: Schibsted Grotesk variable (latin) and IBM Plex Mono 400 (latin). Only these two files.
- `public/assets/brand/`: org/favicon mark. **Chosen: `org-icon.svg` / `org-icon.png`** (512×512, the "route" mark: two nodes joined by one bent path, magenta on plum `#1a1226`). Alternatives are `org-icon-route` (identical to the chosen one), `org-icon-peak` (an A-chevron with a node) and `org-icon-stack` (bars; rejected because it reads as a menu icon). The page links the SVG as its favicon and the PNG as the apple-touch and og image.
- `public/robots.txt` and `public/sitemap.xml` use the canonical `https://as218429.net/`.

External brand and resource links use `target="_blank" rel="noopener noreferrer"`. The two CDN data links open in the same tab.

## Checks run (2026-11-05, Helium/Chromium via CDP, local `python3 -m http.server`)

- 1440×900 and 390×844 (DPR 2), in both palettes: no horizontal overflow, no console or log entries, fonts loaded, body background correct for each palette, switch `aria-pressed` in sync.
- Widths 320, 360, 768 and 1024: no overflow. At 320 the palette switch first overflowed by 9px; fixed by hiding the swatch dots below 360px. The header wordmark and switch do not overlap.
- Interactions: clicking Autumn sets `data-palette` and localStorage, and the choice survives a reload. Every `#anchor` resolves. All `target=_blank` links carry `noopener noreferrer`. Link list checked: CDN geofeed/network.json, RIPE DB aut-num, RIPEstat, PeeringDB net 43956, bgp.he.net, as209874.net, as49581.net, lg.as49581.net, NovaCloud protection page, ruxora.org, galeniusnodes.com, and the three mailto templates.
- With JS disabled: the page renders on the dark ground with all content and mailto routes; the switch and copy button are hidden.
- Impeccable detector: two warnings. "Tbps 5.44px" is a false positive (the computed size is 22.8px or more at every width checked). "Palette switch flush padding" is an intentional 2px segmented-control track.
- Screenshots: `/tmp/asn-production-{desktop,mobile}-{galenius,autumn}.png`, `/tmp/asn-production-mobile-360-header.png`.

## Limits

- The CDN URLs were not fetched; they depend on the parent's deployment. Outbound external sites were not re-fetched this pass.
- The copy button needs the Clipboard API (secure context). It reports "Copy failed" otherwise; the mailto link still works.
- Only latin font subsets are shipped. Characters outside that range fall back to the system font.
