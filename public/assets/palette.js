/* Runs in <head> before first paint. Galenius by default; ?palette=autumn|galenius overrides for one load
   without storing; otherwise the stored choice. Storage may be blocked: every access is wrapped. */
(function () {
  var KEY = 'as218429-palette', NAMES = ['galenius', 'autumn'], root = document.documentElement, q = null, s = null;
  function ok(v) { return NAMES.indexOf(v) > -1 ? v : null; }
  try { q = ok(new URLSearchParams(location.search).get('palette')); } catch (e) {}
  try { s = ok(localStorage.getItem(KEY)); } catch (e) {}
  root.setAttribute('data-palette', q || s || 'galenius');
  root.classList.add('js');
  window.__palette = { key: KEY, ok: ok };
})();
