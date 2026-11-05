import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../.build/worker.mjs';
const request = (path, options) => worker.fetch(new Request('https://as218429.net' + path, options));
test('serves one production site and real assets, never design archives', async () => {
  const response = await request('/');
  assert.equal(response.status, 200);
  assert.match(await response.text(), /AS218429/);
  assert.match(response.headers.get('Content-Security-Policy'), /script-src 'self'/);
  assert.match((await request('/assets/site.css')).headers.get('Content-Type'), /text\/css/);
  assert.equal((await request('/concepts/27-network-overview/index.html')).status, 404);
});
test('CDN discovery, canonical host and conditional requests', async () => {
  assert.equal((await request('/geofeed.csv')).headers.get('Location'), 'https://cdn.as218429.net/geofeed.csv');
  assert.equal((await worker.fetch(new Request('https://www.as218429.net/?palette=autumn'))).headers.get('Location'), 'https://as218429.net/?palette=autumn');
  const response = await request('/');
  assert.equal((await request('/', {headers: {'If-None-Match': response.headers.get('ETag')}})).status, 304);
  assert.equal(await (await request('/', {method: 'HEAD'})).text(), '');
  assert.equal((await request('/', {method: 'POST'})).status, 405);
});
test('stylesheet assets load under the production content security policy', async () => {
  const response = await request('/assets/site.css');
  assert.match(response.headers.get('Content-Security-Policy'), /img-src 'self';/);
  const css = await response.text();
  const references = [...css.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/g)];
  assert.ok(references.length > 0, 'the stylesheet includes font or image assets');
  for (const [, , reference] of references) {
    const url = new URL(reference, 'https://as218429.net/assets/site.css');
    assert.equal(url.origin, 'https://as218429.net', `${reference} must satisfy the self-only policy`);
    const asset = await request(url.pathname + url.search);
    assert.equal(asset.status, 200, `${reference} must be served by the Worker`);
    assert.match(asset.headers.get('Content-Type'), /^(image\/|font\/)/, reference);
  }
});
