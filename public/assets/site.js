(function () {
  'use strict';
  /* Autumn is the only palette. Clear the key left by the retired palette switch. */
  try { localStorage.removeItem('as218429-palette'); } catch (e) {}

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
    b.hidden = false;
    var label = b.textContent, status = document.querySelector(b.getAttribute('data-status'));
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done(msg) { b.textContent = msg; if (status) status.textContent = msg === 'Copied' ? text + ' copied to clipboard.' : ''; setTimeout(function () { b.textContent = label; }, 2000); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('Copied'); }, function () { done('Copy failed'); });
      else done('Copy failed');
    });
  });
})();
