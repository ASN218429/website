export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname === 'www.as218429.net' || url.protocol === 'http:') {
      url.protocol = 'https:';
      url.hostname = 'as218429.net';
      return Response.redirect(url.toString(), 308);
    }
    const dataRoutes = {'/geofeed.csv': '/geofeed.csv', '/.well-known/geofeed': '/geofeed.csv', '/network.json': '/network.json', '/.well-known/security.txt': '/.well-known/security.txt'};
    if (dataRoutes[url.pathname]) return Response.redirect('https://cdn.as218429.net' + dataRoutes[url.pathname], 308);
    const headers = new Headers({
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'self'; form-action 'none'",
      'Strict-Transport-Security': 'max-age=15552000',
    });
    if (!['GET', 'HEAD'].includes(request.method)) {
      headers.set('Allow', 'GET, HEAD');
      return new Response('Method not allowed\n', {status: 405, headers});
    }
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const asset = ASSETS[path];
    if (!asset) {
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Cache-Control', 'no-store');
      return new Response(request.method === 'HEAD' ? null : 'Not found\n', {status: 404, headers});
    }
    headers.set('Content-Type', asset.type);
    headers.set('Cache-Control', path.endsWith('.html') ? 'public, max-age=0, must-revalidate' : path.endsWith('.woff2') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600');
    headers.set('ETag', asset.etag);
    if (request.headers.get('If-None-Match')?.split(',').map(x => x.trim().replace(/^W\//, '')).some(x => x === '*' || x === asset.etag)) return new Response(null, {status: 304, headers});
    return new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.body), c => c.charCodeAt(0)), {headers});
  }
};
