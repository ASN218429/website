(function () {
  'use strict';
  var root = document.documentElement, P = window.__palette;

  /* Palette switch */
  var btns = [].slice.call(document.querySelectorAll('[data-palette-switch] [data-set]'));
  function sync() { var c = root.getAttribute('data-palette'); btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === c)); }); }
  function set(v, persist) {
    if (!P || !P.ok(v)) return;
    root.setAttribute('data-palette', v);
    if (persist) try { localStorage.setItem(P.key, v); } catch (e) {}
    try { var u = new URL(location.href); if (u.searchParams.has('palette')) { u.searchParams.set('palette', v); history.replaceState(history.state, '', u); } } catch (e) {}
    sync();
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-set'), true); }); });
  addEventListener('storage', function (e) { if (P && e.key === P.key && P.ok(e.newValue)) set(e.newValue, false); });
  sync();

  /* Mark the section in view in the header nav */
  var links = [].slice.call(document.querySelectorAll('.bar nav a'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)); }); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
  }

  /* Copy mailbox */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    var label = b.textContent, status = document.querySelector(b.getAttribute('data-status'));
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done(msg) { b.textContent = msg; if (status) status.textContent = msg === 'Copied' ? text + ' copied to clipboard.' : ''; setTimeout(function () { b.textContent = label; }, 2000); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Copied'); }, function () { done('Copy failed'); });
      else done('Copy failed');
    });
  });
})();
