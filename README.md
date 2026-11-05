# AS218429 website

One production operator website at https://as218429.net, hosted by the `as218429-website` Cloudflare Worker.

The public directory contains only the production page, its styles/scripts, two required font files, and three restrained org icon options. The selected icon is `public/assets/brand/org-icon.png`. The earlier design concepts are outside this repository. Copy consolidation and frontend checks are described in CONTENT.md.

## Build and test

Python 3.10+ and Node 24+; no npm dependencies.

```sh
python3 scripts/bundle.py
node --test tests/worker.test.mjs
```

`scripts/bundle.py` builds `.build/worker.mjs` from public assets and the reviewed request handler. No source maps, experiments, secrets, build files, or private files are served. A small dependency-free Worker bundle is used instead of a separate origin server.

## Deploy

The initial deployment and custom domain are provisioned. Main-branch pushes run the GitHub Actions workflow, validate the code/data and deploy using the repository secret `CLOUDFLARE_API_TOKEN`. It must have Workers Scripts Edit on account `6c9df7c384eac81d15322ab7a02e753e`. No DNS edit permission is needed for normal updates. Until that secret is configured, the initial deployment stays live but automated deployments cannot succeed.

```sh
# After building and testing, with token supplied through environment:
python3 scripts/deploy.py
```

`worker.json` records the Worker name, compatibility date, account, custom hostname and observability settings. Deployment uses the documented Cloudflare multipart Workers API; logs and traces are enabled. No Wrangler configuration or credential files are committed. Domain binding is an initial provisioning step, not something CI changes on every push.

## Rollback

Revert the unwanted Git commit and push main, or redeploy a reviewed earlier commit with the same build/deploy steps. Preserve current data mappings when rolling back unrelated code. Never reset a dirty operator checkout.
