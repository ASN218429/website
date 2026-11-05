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
