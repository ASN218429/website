# as218429.net — production content map

One static page, `public/index.html`, built from concept 27 (network overview). Production includes nothing from
`concepts/` or `research/`. Every path is root-absolute (`/assets/...`), so `public/` must be served as the site root.

## Copy map: one claim per section

| Section | The one claim | Merged in / removed |
| --- | --- | --- |
| Hero | AS218429 is the hosting and backbone network behind Ruxora and GaleniusNodes. Lead says who the site is for. Summary panel: ASN, AS name, RIPE NCC, upstreams, PletX-powered protection, locations (Frankfurt · Athens, links to `#locations`), geofeed, PeeringDB. | Removed 27's second lead paragraph that repeated the H1, the provider → PletX → AS218429 → brands strip (it read as verified topology), the dated "snapshot 3 November" caption and the prefix count. |
| Networks | Which brand gets what: Ruxora gets hosting infrastructure and backbone connectivity; GaleniusNodes gets backbone connectivity. Customers go to the brand sites. | The separate **Services** section is folded into these two cards, which removes three repeats of the backbone and protection sentences. The customer note shows once here, not also in contact and footer. |
| DDoS protection | Presented as AS218429's own service: "Our PletX-powered protection filters attack traffic before it reaches your services." 8+ Tbps is labelled **DDoS mitigation capacity**. | Six features: symmetric filtering, XDP/eBPF fast path, game-aware filters, automatic port learning, query proxies, protocol validation. The provider attribution, specifications link and "not a per-service guarantee" caveat were removed on 2026-11-05 at the user's request. No SLA, latency, detection-time, null-route, attack-record, dedicated/in-house hardware or WAF claims. Layout (2026-11-05): one panel, a compact capacity band (8+ Tbps + label) over a 3/2/1-column feature grid, so the figure no longer stretches into an empty slab beside the list. |
| Network locations | "Locations published in our geofeed": eight prefixes across two cities, from operator-confirmed `geofeed/data/locations.json`. Frankfurt am Main, Germany (DE-HE): 2 IPv4 + 3 IPv6 prefixes. Athens, Greece (GR-I): 3 IPv6, no IPv4. Each card has a collapsed "Prefix list" (`<details>`). Links the canonical geofeed. | Added 2026-11-05 at the user's request (supersedes the earlier "no locations" rule). No postal codes, facility/datacenter names or addresses, PoP, latency, map or per-location DDoS capacity claims. Nav gains "Locations". |
| Upstreams | AS209874 Tech Tide (its registered entity) and AS49581 Tube-Hosting, each linking to its ASN.net site. The Tube-Hosting looking glass is labelled as the upstream's. | Dropped the "In the registry" column and the dated RIPEstat neighbour note. A single line says this is registered policy, not live session status, and links RIPEstat. |
| Records and data | RIPE Database, RIPEstat, PeeringDB, bgp.he.net, plus the canonical `https://cdn.as218429.net/geofeed.csv` and `https://cdn.as218429.net/network.json`. | The inline prefix list and the address lookup are gone: they were a dated snapshot. The CDN files are now the source of truth. The "we have no looking glass" disclaimer is gone too. |
| Contact | One mailbox with three subject-line templates: network operations, infrastructure, abuse. There is also a copy-address button. | The compose form and the "Customers" card are gone because they duplicated the three routes. The header email button is gone because the nav and hero already link to Contact. |
| Footer | AS name, the two brand links, back to top. | The repeated tagline and registry-date sentence are gone. |

Mail templates (all to `gvol@nexusystems.org`):
- `AS218429 network operations: ` asks for your network/ASN, the prefix or IP, what you see (UTC), and traceroute/MTR.
- `AS218429 infrastructure question: ` asks for your organisation and the question.
- `AS218429 abuse report: ` asks for the affected IPs, date/time (UTC), type of abuse, and logs with time zone.

Not claimed anywhere: other addresses, 24/7 support, SLA, uptime, dedicated or in-house filtering hardware, WAF, open peering, own looking glass, facilities/PoPs/datacenters, latency, per-location capacity.

## Files

- `public/index.html`: the page, fixed to the Autumn palette (`<html data-palette="autumn">`, `theme-color` `#17110e`). It works without JS; the copy button ships `hidden` and appears only when JS runs.
- `public/assets/site.css` (linked as `?v=autumn-3`): the Autumn tokens on `:root` (so they apply without JS), plus the font faces. There is no other palette.
- `public/assets/site.js`: current-section nav marker, copy address, and a one-time removal of the retired `as218429-palette` localStorage key. Nothing reads `?palette=` or storage, so neither can change the colours. The Galenius palette, the palette switch and `palette.js` were removed on 2026-11-05.
- `public/assets/fonts/`: Schibsted Grotesk variable (latin) and IBM Plex Mono 400 (latin). Only these two files.
- `public/assets/brand/`: org/favicon mark. **Chosen: `org-icon.svg` / `org-icon.png`** (512×512, the "route" mark: two nodes joined by one bent path, in Autumn colours: amber `#eda75b` path, copper `#d87b44` start node, cream `#f4e9dc` end node, on umber `#241a14`). The PNG is exported from the SVG with ImageMagick. Alternatives are `org-icon-route` (identical to the chosen one, recoloured the same way), `org-icon-peak` (an A-chevron with a node) and `org-icon-stack` (bars; rejected because it reads as a menu icon). Peak and stack still use the old Galenius colours because they are not used. The page links the SVG as its favicon and the PNG as the apple-touch and og image.
- `public/robots.txt` and `public/sitemap.xml` use the canonical `https://as218429.net/`.

External brand and resource links use `target="_blank" rel="noopener noreferrer"`. The two CDN data links open in the same tab.

## Checks run

Protection layout + locations pass (2026-11-05, Helium via CDP, local server, 1440/1280/1024/768 at DPR 1 and 390/320 at DPR 2): no horizontal overflow (also with both prefix lists open at 390), no page exceptions, desktop nav fits with six links. `.fig` height 95/92/85/79/103/103 px (1440→320); the protection panel is 359 px tall at 1440. Six features render; location cards show Frankfurt 2 IPv4 + 3 IPv6 and Athens 0 + 3, matching their prefix lists. All `#` anchors resolve, four mailto links to `gvol@nexusystems.org`, both brand links (header cards + footer), three geofeed links, no "nova" in the HTML, stylesheet `?v=autumn-3`.

Protection copy pass (2026-11-05, Helium via CDP, local server, 1440×900 / 390×844 / 320×640): no horizontal overflow, empty console, no "nova" or provider source URL anywhere in the served HTML, 8+ Tbps "DDoS mitigation capacity" and all six features visible, all `#` anchors resolve, four mailto links to `gvol@nexusystems.org` intact, AS209874 row reads Tech Tide with its as209874.net link.

### Earlier (2026-11-05, Autumn-only pass, Helium/Chromium via CDP, local `python3 -m http.server`)

- 1440×900, 390×844 and 320×640 (DPR 2 on mobile), each loaded with a stale localStorage `as218429-palette=galenius` and with `?palette=galenius`: `data-palette` stays `autumn`, `theme-color` is `#17110e`, the body is `rgb(23,17,14)` and the primary button is `rgb(216,123,68)`. There is no picker element and no horizontal overflow. The console and log are empty, both fonts load, and the stale key is cleared.
- The favicon SVG returns 200 `image/svg+xml` and the header mark renders. Clicking Copy puts `gvol@nexusystems.org` on the clipboard, the button reads "Copied" and the live status is announced.
- With JS disabled, at all three sizes: Autumn colours, no overflow, and the copy button is hidden. The mailto routes remain.
- The copy, layout and links are unchanged from the previous pass; only the palette code and the icon colours changed.

## Limits

- The CDN URLs were not fetched; they depend on the parent's deployment. Outbound external sites were not re-fetched this pass.
- The copy button needs the Clipboard API (secure context). It reports "Copy failed" otherwise; the mailto link still works.
- Only latin font subsets are shipped. Characters outside that range fall back to the system font.

## Internal sourcing (not shown on the site)

The 8+ Tbps figure and the six protection features come from the upstream's public protection page, recorded in
`research/protection-specs.md`. The site presents them as the AS218429 protection service; the figure is available
service capacity, not equipment AS218429 owns. No provider name or source URL appears in `public/`.
