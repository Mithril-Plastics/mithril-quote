/**
 * floating-widget.js — Self-injecting floating quote button for Mithril Plastics.
 * Paste one <script defer src="..."> tag into Webflow Site Settings > Footer Code.
 * Automatically skips the dedicated /instant-quote page to avoid widget ID conflicts.
 */
(function () {
  'use strict';

  // Skip on the dedicated quote page (widget already inline there)
  if (window.location.pathname === '/instant-quote') return;

  var CDN_WIDGET = 'https://cdn.jsdelivr.net/gh/Mithril-Plastics/mithril-quote@ebefaad/frontend';
  var CDN_THREE  = 'https://cdn.jsdelivr.net/npm/three@0.128.0';

  // ── Widget CSS ──────────────────────────────────────────────────────────────
  var cssLink = document.createElement('link');
  cssLink.rel  = 'stylesheet';
  cssLink.href = CDN_WIDGET + '/widget.css';
  document.head.appendChild(cssLink);

  // ── Float button + Modal styles ─────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#mq-float-btn{position:fixed;right:28px;bottom:36px;z-index:9990;display:flex;align-items:center;gap:9px;background:linear-gradient(135deg,#560591 0%,#7b2fbe 100%);color:#fff;border:none;border-radius:50px;padding:14px 24px;font-size:15px;font-weight:700;font-family:"Khula",sans-serif,system-ui;cursor:pointer;box-shadow:0 4px 28px rgba(86,5,145,.5);transition:transform .15s,box-shadow .15s;white-space:nowrap}',
    '#mq-float-btn:hover{transform:translateY(-3px);box-shadow:0 8px 36px rgba(86,5,145,.65)}',
    '#mq-float-btn .mq-float-icon{font-size:18px;line-height:1}',
    '#mq-modal-overlay{display:none;position:fixed;inset:0;z-index:9995;background:rgba(0,0,0,.78);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);align-items:center;justify-content:center;padding:16px}',
    '#mq-modal-overlay.mq-open{display:flex}',
    '#mq-modal-wrap{position:relative;width:100%;max-width:700px}',
    '#mq-modal-box{width:100%;max-height:92vh;overflow-y:auto;border-radius:18px;background:#111;box-shadow:0 24px 80px rgba(0,0,0,.6),0 0 0 1px rgba(86,5,145,.4);scrollbar-width:thin;scrollbar-color:rgba(86,5,145,.4) transparent}',
    '#mq-modal-box::-webkit-scrollbar{width:5px}',
    '#mq-modal-box::-webkit-scrollbar-thumb{background:rgba(86,5,145,.4);border-radius:4px}',
    '#mq-modal-close{position:absolute;top:-14px;right:-14px;z-index:10;width:36px;height:36px;border-radius:50%;border:none;background:#1e1e1e;box-shadow:0 2px 12px rgba(0,0,0,.5),0 0 0 1.5px rgba(255,255,255,.1);color:#888;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,box-shadow .15s,color .15s,transform .15s}',
    '#mq-modal-close:hover{background:#ea384c;box-shadow:0 4px 18px rgba(234,56,76,.45),0 0 0 1.5px rgba(234,56,76,.6);color:#fff;transform:scale(1.1)}',
    '#mq-modal-close svg{width:14px;height:14px;stroke:currentColor;stroke-width:2.5;stroke-linecap:round}'
  ].join('');
  document.head.appendChild(style);

  // ── Three.js (chained so loaders have THREE available) ──────────────────────
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    if (cb) s.onload = cb;
    document.head.appendChild(s);
  }

  loadScript(CDN_THREE + '/build/three.min.js', function () {
    loadScript(CDN_THREE + '/examples/js/loaders/OBJLoader.js');
    loadScript(CDN_THREE + '/examples/js/loaders/PLYLoader.js');
    loadScript(CDN_THREE + '/examples/js/loaders/GLTFLoader.js');
  });

  // ── MQ global config ────────────────────────────────────────────────────────
  window.MQ = {
    API_BASE:      'https://YOUR-BACKEND.railway.app',
    MOCK_MODE:     true,
    FORMSPREE_URL: 'https://formspree.io/f/mojrlbvn'
  };

  // ── Floating button + Modal HTML ────────────────────────────────────────────
  // IMPORTANT: HTML must be injected BEFORE widget.js is appended.
  // Dynamic script tags ignore `defer` and may execute synchronously from
  // cache, so the DOM elements must already exist when widget.js runs.
  var html = ''
    + '<button id="mq-float-btn" onclick="mqOpenModal()">'
    +   '<span class="mq-float-icon">⚡</span>Get Instant Quote'
    + '</button>'

    + '<div id="mq-modal-overlay" onclick="mqOverlayClick(event)">'
    +   '<div id="mq-modal-wrap">'
    +     '<button id="mq-modal-close" onclick="mqCloseModal()" title="Close">'
    +       '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">'
    +         '<line x1="1" y1="1" x2="13" y2="13"/>'
    +         '<line x1="13" y1="1" x2="1" y2="13"/>'
    +       '</svg>'
    +     '</button>'
    +     '<div id="mq-modal-box"><div id="mq-modal-inner">'

    +       '<div id="mq">'

    +         '<div class="mq-brand-header">'
    +           '<div class="mq-brand-logo">'
    +             '<a href="https://www.mithrilplastics.com" target="_blank" rel="noopener noreferrer">'
    +               '<img src="https://cdn.prod.website-files.com/68dc75f5161ad85e0cd30bd2/69fe4fbbd1c90020242cf636_logo.gif" alt="Mithril Plastics">'
    +             '</a>'
    +           '</div>'
    +           '<div class="mq-brand-tag">Instant Quote</div>'
    +         '</div>'

    +         '<div class="mq-steps">'
    +           '<div class="mq-step active" id="mq-s1">1 · Upload</div>'
    +           '<div class="mq-step" id="mq-s2">2 · Process</div>'
    +           '<div class="mq-step" id="mq-s3">3 · Material</div>'
    +           '<div class="mq-step" id="mq-s4">4 · Quote</div>'
    +         '</div>'

    +         '<div class="mq-body">'

    // Upload screen
    +           '<div class="mq-screen on" id="mq-upload">'
    +             '<input type="file" id="mq-input" accept=".stl,.obj,.ply,.glb,.gltf" multiple style="display:none">'
    +             '<div id="mq-empty-state">'
    +               '<p class="mq-heading">Upload your 3D files</p>'
    +               '<div class="mq-drop" id="mq-zone">'
    +                 '<span class="mq-drop-icon">📂</span>'
    +                 '<p class="mq-drop-headline">Drag &amp; drop your files here</p>'
    +                 '<p class="mq-drop-sub">or</p>'
    +                 '<label class="mq-drop-cta" id="mq-browse" for="mq-input">Browse files</label>'
    +                 '<p class="mq-formats">STL · OBJ · PLY · GLB · GLTF</p>'
    +               '</div>'
    +               '<div id="mq-upload-err"></div>'
    +             '</div>'
    +             '<div id="mq-files-state" style="display:none">'
    +               '<div class="mq-upload-header">'
    +                 '<div class="mq-upload-count" id="mq-model-count">0 models uploaded</div>'
    +                 '<div class="mq-upload-status">Ready to go!</div>'
    +                 '<div class="mq-upload-hint">Files are analysed locally — nothing leaves your device until you submit.</div>'
    +               '</div>'
    +               '<div class="mq-drop-more" id="mq-drop-more"><span>⬆</span><span>Upload more files or drag and drop here</span></div>'
    +               '<div class="mq-sel-row"><span class="mq-selected-count" id="mq-sel-count">0 models selected</span></div>'
    +               '<div class="mq-controls-bar">'
    +                 '<div class="mq-controls-left">'
    +                   '<span class="mq-unit-label">File unit: <strong>Millimeters (mm)</strong></span>'
    +                   '<div class="mq-global-qty">'
    +                     '<span class="mq-global-qty-label">Quantity:</span>'
    +                     '<div class="mq-stepper">'
    +                       '<button id="mq-g-dec">−</button>'
    +                       '<input type="number" id="mq-g-qty" value="1" min="1">'
    +                       '<button id="mq-g-inc">+</button>'
    +                     '</div>'
    +                   '</div>'
    +                 '</div>'
    +                 '<div class="mq-controls-right">'
    +                   '<button class="mq-toolbar-btn" id="mq-select-all">Select all files</button>'
    +                   '<button class="mq-toolbar-btn danger" id="mq-delete-sel">🗑 Delete</button>'
    +                 '</div>'
    +               '</div>'
    +               '<div class="mq-cards-grid" id="mq-cards-grid"></div>'
    +               '<div id="mq-upload-err2"></div>'
    +               '<div class="mq-cta-wrap"><button class="mq-cta" id="mq-continue">See Materials &amp; Prices →</button></div>'
    +             '</div>'
    +           '</div>'

    // ITAR screen
    +           '<div class="mq-screen" id="mq-itar">'
    +             '<button class="mq-back" id="mq-back-itar">← Back</button>'
    +             '<p class="mq-heading">Export &amp; Regulatory Compliance</p>'
    +             '<div class="mq-itar-body">'
    +               '<div class="mq-itar-icon">⚠️</div>'
    +               '<p class="mq-itar-text"><strong>Mithril Plastics is not registered</strong> under ITAR (International Traffic in Arms Regulations), the U.S. Department of Energy, or any other government export-control or defense-related program.</p>'
    +               '<p class="mq-itar-text">We are unable to manufacture parts from files or designs that are subject to export control, government regulation, or classified designation of any kind.</p>'
    +               '<p class="mq-itar-confirm-label">Please confirm to continue:</p>'
    +               '<button class="mq-cta" id="mq-itar-confirm">My files are not ITAR or government regulated →</button>'
    +               '<button class="mq-itar-decline" id="mq-itar-decline">My files may be subject to regulation</button>'
    +               '<div class="mq-itar-contact" id="mq-itar-contact" style="display:none">'
    +                 '<p>Thank you for letting us know. We are unable to process regulated files through this system. Please <a href="/contact" class="mq-itar-link">contact us directly</a> and we will do our best to refer you to an appropriately registered manufacturer.</p>'
    +               '</div>'
    +             '</div>'
    +           '</div>'

    // Process screen
    +           '<div class="mq-screen" id="mq-process">'
    +             '<button class="mq-back" id="mq-back-proc">← Back</button>'
    +             '<p class="mq-heading">Select manufacturing process</p>'
    +             '<div class="mq-grid-2">'
    +               '<button class="mq-opt" id="mq-fdm" data-p="FDM">FDM<small>Fused Deposition Modeling — filament-based printing. Fast, affordable, wide material selection.</small></button>'
    +               '<button class="mq-opt" id="mq-sla" data-p="SLA">SLA<small>Stereolithography — resin-based printing. Ultra-fine detail and smooth surface finish.</small></button>'
    +             '</div>'
    +             '<div id="mq-proc-warn"></div>'
    +           '</div>'

    // Material screen
    +           '<div class="mq-screen" id="mq-material">'
    +             '<button class="mq-back" id="mq-back-mat">← Back</button>'
    +             '<p class="mq-heading">Select material</p>'
    +             '<div id="mq-mat-grid"></div>'
    +             '<div id="mq-mat-err"></div>'
    +           '</div>'

    // Quote screen
    +           '<div class="mq-screen" id="mq-quote">'
    +             '<button class="mq-back" id="mq-back-quote">← Back</button>'
    +             '<p class="mq-heading">Your instant quote</p>'
    +             '<div id="mq-quote-body"></div>'
    +           '</div>'

    // Loading screen
    +           '<div class="mq-screen" id="mq-loading">'
    +             '<div class="mq-loader"><div class="mq-spinner"></div><p id="mq-load-txt">Analysing files…</p></div>'
    +           '</div>'

    +         '</div>' // .mq-body
    +       '</div>' // #mq

    +     '</div></div>' // #mq-modal-inner, #mq-modal-box
    +   '</div>'         // #mq-modal-wrap
    + '</div>';          // #mq-modal-overlay

  document.body.insertAdjacentHTML('beforeend', html);

  // ── Widget JS — loaded AFTER HTML so DOM elements exist when it runs ────────
  var ws = document.createElement('script');
  ws.src = 'https://cdn.jsdelivr.net/gh/Mithril-Plastics/mithril-quote@ebefaad/frontend/widget.js';
  document.head.appendChild(ws);

  // ── Open / close functions ──────────────────────────────────────────────────
  window.mqOpenModal = function () {
    document.getElementById('mq-modal-overlay').classList.add('mq-open');
    document.body.style.overflow = 'hidden';
  };
  window.mqCloseModal = function () {
    document.getElementById('mq-modal-overlay').classList.remove('mq-open');
    document.body.style.overflow = '';
  };
  window.mqOverlayClick = function (e) {
    if (e.target === document.getElementById('mq-modal-overlay')) mqCloseModal();
  };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') mqCloseModal();
  });

})();
