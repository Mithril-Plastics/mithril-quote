/*!
 * mithril-track.js — site-wide event tracking for mithrilplastics.com
 *
 * STATUS: NOT DEPLOYED. Nothing loads this file yet. To enable later, add one
 * line to Webflow → Site settings → Custom code → Footer (after the GTM tag):
 *   <script defer src="https://cdn.jsdelivr.net/gh/Mithril-Plastics/mithril-quote@<COMMIT>/frontend/mithril-track.js"></script>
 *
 * HOW IT WORKS
 *   Pushes events to window.dataLayer. Google Tag Manager (GTM-MKFM4T9T, already
 *   on every page) reads them and routes to GA4 / Bing UET / Google Ads. This
 *   file never contacts an analytics vendor directly, so Consent Mode and the
 *   cookie banner keep working exactly as they do now.
 *
 * EVENTS (all prefixed mith_)
 *   mith_phone_click        click on any tel: link
 *   mith_email_click        click on any mailto: link
 *   mith_quote_cta_click    click on any link to /instant-quote  (+ which part of the page)
 *   mith_outbound_click     click on a link to another domain    (+ domain only)
 *   mith_scroll             25 / 50 / 75 / 90 % scroll depth, once each per page
 *   mith_form_success       a Webflow form showed its success message (+ form name,
 *                           + values of dropdowns such as "How did you hear about us")
 *   mith_<anything>         any element with data-track="<anything>"
 *
 * ADDING TRACKING TO A NEW BUTTON (no code): in the Webflow Designer add custom
 * attributes to the element:  data-track = service_card_click
 *                             data-track-service = fdm      (optional extras)
 *
 * PRIVACY RULES (do not break these)
 *   - Never send names, emails, phone numbers, company names, or free text.
 *   - Form events include dropdown values only (fixed choices), never text inputs.
 *   - Outbound events send the domain only, not the full URL.
 *   - Campaign parameters (utm_*, gclid, msclkid) are kept in sessionStorage only,
 *     and only when the visitor has not declined analytics cookies.
 */
(function () {
  'use strict';
  if (window.__mithrilTrackLoaded) return;
  window.__mithrilTrackLoaded = true;

  // ── core ────────────────────────────────────────────────────────────────────
  function push(name, params) {
    try {
      var e = { event: 'mith_' + name, mith_page: location.pathname };
      for (var k in (params || {})) if (Object.prototype.hasOwnProperty.call(params, k)) e[k] = params[k];
      (window.dataLayer = window.dataLayer || []).push(e);
    } catch (err) { /* tracking must never break the page */ }
  }
  window.mithrilTrack = push;   // usable from any custom code: mithrilTrack('thing', {a: 1})

  // ── campaign attribution (first touch in this tab) ──────────────────────────
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'msclkid', 'li_fat_id'];
  function analyticsAllowed() {
    try {
      var m = document.cookie.match(/(^|;\s*)cc_cookie=([^;]*)/);
      if (!m) return true;                                   // no choice recorded yet → site default (analytics on)
      var v = JSON.parse(decodeURIComponent(m[2]));
      return !!(v && v.categories && v.categories.indexOf('analytics') !== -1);
    } catch (e) { return true; }
  }
  (function captureAttribution() {
    try {
      if (!analyticsAllowed()) return;
      var q = new URLSearchParams(location.search), found = {}, any = false;
      ATTR_KEYS.forEach(function (k) { var v = q.get(k); if (v) { found[k] = v.slice(0, 120); any = true; } });
      if (any && !sessionStorage.getItem('mith_attr')) {
        found.landing = location.pathname;
        sessionStorage.setItem('mith_attr', JSON.stringify(found));   // first touch wins
      }
    } catch (e) {}
  })();

  // ── clicks ──────────────────────────────────────────────────────────────────
  function sectionOf(el) {
    var n = el.closest('[data-track-location]');
    if (n) return n.getAttribute('data-track-location');
    n = el.parentElement && el.parentElement.closest('nav, header, footer, section, [id]');   // parent up: skip the element's own id
    if (!n) return 'unknown';
    return (n.tagName === 'NAV' || n.tagName === 'HEADER') ? 'header'
         : n.tagName === 'FOOTER' ? 'footer'
         : (n.id || n.className.toString().split(' ')[0] || n.tagName.toLowerCase()).slice(0, 40);
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target : null;
    if (!t) return;

    var tagged = t.closest('[data-track]');
    if (tagged) {
      var p = {};
      Array.prototype.forEach.call(tagged.attributes, function (a) {
        if (a.name.indexOf('data-track-') === 0 && a.name !== 'data-track-location') p['mith_' + a.name.slice(11).replace(/-/g, '_')] = a.value.slice(0, 80);
      });
      p.mith_location = sectionOf(tagged);
      push(tagged.getAttribute('data-track').replace(/[^a-z0-9_]/gi, '_').toLowerCase(), p);
    }

    var a = t.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0)    return push('phone_click', { mith_location: sectionOf(a) });
    if (href.indexOf('mailto:') === 0) return push('email_click', { mith_location: sectionOf(a) });
    try {
      var u = new URL(a.href, location.href);
      if (u.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '')) {
        if (u.pathname.replace(/\/$/, '') === '/instant-quote' && !tagged) push('quote_cta_click', { mith_location: sectionOf(a) });
      } else if (/^https?:$/.test(u.protocol)) {
        push('outbound_click', { mith_domain: u.hostname.replace(/^www\./, '') });
      }
    } catch (e) {}
  }, true);

  // ── scroll depth ────────────────────────────────────────────────────────────
  var fired = {}, ticking = false;
  function checkScroll() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (max < 200) return;                                   // page too short to be meaningful
    var pct = Math.round((window.pageYOffset / max) * 100);
    [25, 50, 75, 90].forEach(function (m) { if (pct >= m && !fired[m]) { fired[m] = true; push('scroll', { mith_percent: m }); } });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(checkScroll); }
  }, { passive: true });

  // ── Webflow form success ────────────────────────────────────────────────────
  // Webflow submits forms with AJAX and reveals a .w-form-done block on success.
  function watchForms() {
    var done = document.querySelectorAll('.w-form-done');
    Array.prototype.forEach.call(done, function (el) {
      if (el.__mithWatched) return;
      el.__mithWatched = true;
      var reported = false;
      new MutationObserver(function () {
        if (reported || getComputedStyle(el).display === 'none') return;
        reported = true;
        var wrap = el.closest('.w-form'), form = wrap && wrap.querySelector('form');
        var p = { mith_form: (form && (form.getAttribute('data-name') || form.id || form.getAttribute('name'))) || 'unknown' };
        if (form) Array.prototype.forEach.call(form.querySelectorAll('select'), function (s) {
          var key = (s.name || s.id || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
          if (key && s.value) p['mith_field_' + key] = s.value.slice(0, 50);      // fixed dropdown choices only
        });
        push('form_success', p);
      }).observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchForms); else watchForms();
})();
