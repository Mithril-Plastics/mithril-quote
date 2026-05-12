// ── CONFIG ───────────────────────────────────────────────────────────────────
var _cfg = window.MQ || {};
const API_BASE      = _cfg.API_BASE      || 'https://YOUR-BACKEND.railway.app';

const MOCK_MODE     = _cfg.MOCK_MODE     !== undefined ? _cfg.MOCK_MODE : true;
const FORMSPREE_URL = _cfg.FORMSPREE_URL || 'https://formspree.io/f/mojrlbvn';

const EMAILJS_PUBLIC_KEY  = _cfg.EMAILJS_PUBLIC_KEY  || 'Vrpr3_PL5K3WW5y_i';
const EMAILJS_SERVICE_ID  = _cfg.EMAILJS_SERVICE_ID  || 'service_4hxocin';
const EMAILJS_TEMPLATE_ID = _cfg.EMAILJS_TEMPLATE_ID || 'template_9oyivqc';
// Initialise EmailJS — load SDK dynamically if not already present
(function initEmailJS() {
  function doInit() {
    if (window.emailjs && EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }
  }
  if (window.emailjs) {
    doInit();
  } else if (EMAILJS_PUBLIC_KEY) {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = doInit;
    document.head.appendChild(s);
  }
})();

const BUILD_VOL = {
  FDM: { x: 254, y: 254, z: 254 },
  SLA: { x: 298, y: 164, z: 300 },
};

const MATERIALS = {
  FDM: [
    // ── Standard ──────────────────────────────────────────────────────────────
    { key: 'PLA',      label: 'PLA',               group: 'Standard',    cost: 1, desc: 'Rigid, low warping, easy to print. Best for prototypes and display models.' },
    { key: 'PETG',     label: 'PETG',              group: 'Standard',    cost: 1, desc: 'Strong with good chemical resistance. Ideal for durable functional parts.' },
    { key: 'ABS',      label: 'ABS',               group: 'Standard',    cost: 1, desc: 'Tough and heat-resistant. Great for enclosures and functional parts.' },
    { key: 'ASA',      label: 'ASA',               group: 'Standard',    cost: 1, desc: 'UV and weather resistant. Ideal for outdoor and automotive parts.' },
    { key: 'PET',      label: 'PET',               group: 'Standard',    cost: 1, desc: 'Stiff with low moisture absorption. Good for housings and containers.' },
    { key: 'TPU',      label: 'TPU',               group: 'Standard',    cost: 2, desc: 'Flexible and rubber-like. Perfect for gaskets, grips, and wearables.' },
    // ── Engineering ───────────────────────────────────────────────────────────
    { key: 'Nylon',    label: 'Nylon (PA12)',      group: 'Engineering', cost: 2, desc: 'Impact-resistant with low friction. Best for gears and load-bearing parts.' },
    { key: 'PC',       label: 'Polycarbonate',     group: 'Engineering', cost: 2, desc: 'Extremely tough and heat-resistant. For demanding mechanical and electrical parts.' },
    // ── Composite ─────────────────────────────────────────────────────────────
    { key: 'PLA-CF',   label: 'PLA Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Lightweight and rigid. Best for stiff structural prototypes and cosmetic parts.' },
    { key: 'PETG-CF',  label: 'PETG Carbon Fiber', group: 'Composite',   cost: 3, desc: 'Rigid and dimensionally stable. For load-bearing assemblies and brackets.' },
    { key: 'ABS-CF',   label: 'ABS Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'High stiffness with excellent surface quality. For high-performance functional parts.' },
    { key: 'ASA-CF',   label: 'ASA Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Weather resistant with added stiffness. For outdoor structural applications.' },
    { key: 'TPU-CF',   label: 'TPU Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Semi-flexible with added stiffness. For wear-resistant flexible components.' },
    { key: 'Nylon-CF', label: 'Nylon Carbon Fiber',group: 'Composite',   cost: 4, desc: 'Exceptional strength-to-weight ratio. For aerospace, robotics, and structural brackets.' },
    { key: 'Nylon-GF', label: 'Nylon Glass Fiber', group: 'Composite',   cost: 4, desc: 'High stiffness and dimensional stability. For precision housings and mechanical parts.' },
    { key: 'PC-GF',    label: 'PC Glass Fiber',    group: 'Composite',   cost: 4, desc: 'High strength and heat resistance. For structural enclosures and electrical components.' },
  ],
  SLA: [
    // ── Standard ──────────────────────────────────────────────────────────────
    { key: 'Standard',  label: 'Standard Resin',  group: 'Standard', cost: 2, desc: 'Smooth finish and fine detail. Great for visual prototypes and display models.' },
    { key: 'ABS-Like',  label: 'ABS-Like Resin',  group: 'Standard', cost: 2, desc: 'Tough and impact-resistant. Great for functional prototypes and snap-fit housings.' },
    // ── Specialty ─────────────────────────────────────────────────────────────
    { key: 'Clear',     label: 'Clear Resin',     group: 'Specialty', cost: 3, desc: 'Optically transparent when finished. Best for lenses, fluid channels, and displays.' },
    { key: 'Flexible',  label: 'Flexible Resin',  group: 'Specialty', cost: 3, desc: 'Rubber-like flexibility and durability. For seals, grips, and soft prototypes.' },
    { key: 'High Temp', label: 'High Temp Resin', group: 'Specialty', cost: 4, desc: 'Withstands up to ~289°C. For molds, jigs, and heat-exposed functional parts.' },
  ],
};

const QTY_BREAKS = [
  { min: 1,  max: 5,    pct: 0  },
  { min: 6,  max: 20,   pct: 8  },
  { min: 21, max: 50,   pct: 15 },
  { min: 51, max: null, pct: 22 },
];

const MOCK_RATES = {
  FDM: { machineRatePerHr: 2.50, cm3PerHr: 8,
    mats: { 'PLA':0.15,'ABS':0.18,'PETG':0.17,'TPU':0.25,'Nylon':0.28,'ASA':0.20,'PET':0.16,'PC':0.32,
            'PLA-CF':0.36,'ABS-CF':0.42,'PETG-CF':0.38,'TPU-CF':0.46,'Nylon-CF':0.58,'ASA-CF':0.44,'Nylon-GF':0.50,'PC-GF':0.54 } },
  SLA: { machineRatePerHr: 5.00, cm3PerHr: 18,
    mats: { 'Standard':0.30,'Clear':0.36,'High Temp':0.65,'ABS-Like':0.33,'Flexible':0.48 } },
};

// Material densities (g/cm³) and FDM infill factor for weight estimation
const DENSITIES = {
  FDM: { fillFactor: 0.20,
    mats: { 'PLA':1.24,'ABS':1.04,'PETG':1.27,'TPU':1.21,'Nylon':1.01,'ASA':1.07,'PET':1.38,'PC':1.20,
            'PLA-CF':1.18,'ABS-CF':1.12,'PETG-CF':1.20,'TPU-CF':1.18,'Nylon-CF':1.10,'ASA-CF':1.12,'Nylon-GF':1.15,'PC-GF':1.32 } },
  SLA: { fillFactor: 1.0,
    mats: { 'Standard':1.10,'Clear':1.12,'High Temp':1.14,'ABS-Like':1.08,'Flexible':1.15 } },
};

// Origin: Brea, CA 92821
// Carrier zone by first 2 digits of destination ZIP (UPS/FedEx zone map from 928xx origin)
const ZIP2_ZONE = {
  '00':8,'01':8,'02':8,'03':8,'04':8,'05':8,'06':8,'07':8,'08':8,'09':8,
  '10':8,'11':8,'12':8,'13':8,'14':8,'15':8,'16':8,'17':8,'18':8,'19':8,
  '20':8,'21':8,'22':8,'23':8,'24':8,'25':8,'26':8,'27':8,'28':8,'29':8,
  '30':8,'31':8,'32':8,'33':8,'34':8,'35':7,'36':7,'37':7,'38':7,'39':7,
  '40':7,'41':7,'42':7,'43':7,'44':7,'45':7,'46':7,'47':7,'48':7,'49':7,
  '50':7,'51':7,'52':7,'53':7,'54':7,'55':7,'56':7,'57':7,'58':7,'59':6,
  '60':7,'61':7,'62':7,'63':7,'64':7,'65':7,'66':6,'67':6,'68':6,'69':6,
  '70':6,'71':6,'72':6,'73':6,'74':6,'75':7,'76':7,'77':7,'78':6,'79':5,
  '80':6,'81':6,'82':5,'83':5,'84':5,'85':4,'86':4,'87':5,'88':5,'89':3,
  '90':2,'91':2,'92':2,'93':3,'94':4,'95':4,'96':4,'97':5,'98':6,'99':6,
};

// Sales tax rate applied to parts (CA — shipping separately stated is not taxable)
const TAX_RATE = 0.0775; // 7.75%

// Per-zone rate tables — base charge + per-lb rate (calibrated to UPS/FedEx 2024 from Brea, CA)
const SHIP_RATES = {
  Ground: {
    days: '5–7',
    zones: {
      2:{base:9.50,perLb:0.30}, 3:{base:10.50,perLb:0.42},
      4:{base:12.00,perLb:0.55}, 5:{base:13.50,perLb:0.68},
      6:{base:15.00,perLb:0.82}, 7:{base:16.50,perLb:0.95},
      8:{base:18.00,perLb:1.10},
    }
  },
  Express: {
    days: '2–3',
    zones: {
      2:{base:24.00,perLb:0.75}, 3:{base:27.00,perLb:1.00},
      4:{base:31.00,perLb:1.30}, 5:{base:35.00,perLb:1.60},
      6:{base:39.00,perLb:1.95}, 7:{base:44.00,perLb:2.30},
      8:{base:49.00,perLb:2.70},
    }
  },
  Overnight: {
    days: '1',
    zones: {
      2:{base:48.00,perLb:1.50}, 3:{base:54.00,perLb:2.00},
      4:{base:62.00,perLb:2.60}, 5:{base:70.00,perLb:3.20},
      6:{base:78.00,perLb:3.90}, 7:{base:88.00,perLb:4.60},
      8:{base:98.00,perLb:5.40},
    }
  },
};

// ── STATE ────────────────────────────────────────────────────────────────────
const S = {
  files: [],     // { fileName, bbox, volume, fdmFits, slaFits, qty, selected, thumbnail, geometry, originalFile }
  process: null,
  material: null,
  materialLabel: '',
  quote: null,
  globalQty: 1,
  quoteItems: null, // live reference to renderQuote's items array for order total updates
};

// ── SESSION PERSISTENCE ───────────────────────────────────────────────────────
function saveSession() {
  try {
    sessionStorage.setItem('mq_process',       S.process       || '');
    sessionStorage.setItem('mq_material',      S.material      || '');
    sessionStorage.setItem('mq_materialLabel', S.materialLabel || '');
  } catch(e) {}
}
function clearSession() {
  try { sessionStorage.removeItem('mq_process'); sessionStorage.removeItem('mq_material'); sessionStorage.removeItem('mq_materialLabel'); } catch(e) {}
}
// Restore process + material from a previous session
(function restoreSession() {
  try {
    var p  = sessionStorage.getItem('mq_process');
    var m  = sessionStorage.getItem('mq_material');
    var ml = sessionStorage.getItem('mq_materialLabel');
    if (p)      S.process       = p;
    if (m)      S.material      = m;
    if (ml)     S.materialLabel = ml;
  } catch(e) {}
})();

// ── SCREENS ──────────────────────────────────────────────────────────────────
const STEP_MAP = { upload: 1, process: 2, material: 3, quote: 4, loading: null };
function show(id) {
  document.querySelectorAll('.mq-screen').forEach(function(el) { el.classList.remove('on'); });
  document.getElementById('mq-' + id).classList.add('on');
  var n = STEP_MAP[id];
  [1,2,3,4].forEach(function(i) {
    var el = document.getElementById('mq-s' + i);
    el.classList.remove('active', 'done');
    if (n) { if (i === n) el.classList.add('active'); else if (i < n) el.classList.add('done'); }
  });
}
function setLoad(msg) { document.getElementById('mq-load-txt').textContent = msg; show('loading'); }

// ── THUMBNAIL GENERATOR ──────────────────────────────────────────────────────
function generateThumbnail(geometry) {
  try {
    var SIZE = 120;
    var offCanvas = document.createElement('canvas');
    offCanvas.width = offCanvas.height = SIZE;
    var rend = new THREE.WebGLRenderer({ canvas: offCanvas, antialias: true, preserveDrawingBuffer: true });
    rend.setSize(SIZE, SIZE);
    rend.setClearColor(0x06000f, 1);

    var sc = new THREE.Scene();
    sc.add(new THREE.AmbientLight(0x9060c0, 0.6));
    var sun = new THREE.DirectionalLight(0xd0b0ff, 0.9);
    sun.position.set(1, 2, 3);
    sc.add(sun);
    var fill = new THREE.DirectionalLight(0x54f2e5, 0.4);
    fill.position.set(-2, -1, -2);
    sc.add(fill);

    var geo = geometry.clone();
    geo.computeBoundingBox();
    geo.computeVertexNormals();

    var box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
    var center = new THREE.Vector3();
    box.getCenter(center);
    var size = new THREE.Vector3();
    box.getSize(size);
    geo.translate(-center.x, -center.y, -center.z);

    var mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x7c10e0, specular: 0x54f2e5, shininess: 90, side: THREE.DoubleSide,
    }));
    sc.add(mesh);

    var cam = new THREE.PerspectiveCamera(45, 1, 0.001, 1e6);
    var maxDim = Math.max(size.x, size.y, size.z) || 100;
    var minDim = Math.min(size.x, size.y, size.z);
    // Flatness: 0 = pancake, 1 = cube. Raise camera elevation for flat models
    // so the top face fills the canvas instead of a thin edge-on ellipse.
    var flatness   = maxDim > 0 ? minDim / maxDim : 1;
    var elevFactor = 0.4 + (1 - flatness) * 0.55; // 0.4 (cube) → 0.95 (very flat)
    var dist = (maxDim / Math.tan((45 * Math.PI / 180) / 2)) * 0.68;
    cam.position.set(dist * 0.65, dist * elevFactor, dist);
    cam.lookAt(0, 0, 0);

    rend.render(sc, cam);
    var url = offCanvas.toDataURL('image/png');
    rend.dispose();
    geo.dispose();
    return url;
  } catch(e) {
    return null;
  }
}

// ── CARD RENDERING ────────────────────────────────────────────────────────────
function selectedCount() {
  return S.files.filter(function(f) { return f.selected; }).length;
}

function updateHeader() {
  var n = S.files.length;
  document.getElementById('mq-model-count').textContent = n + ' model' + (n !== 1 ? 's' : '') + ' uploaded';
  var sel = selectedCount();
  document.getElementById('mq-sel-count').textContent = sel + ' model' + (sel !== 1 ? 's' : '') + ' selected';

  // Toggle upload states
  document.getElementById('mq-empty-state').style.display  = n === 0 ? '' : 'none';
  document.getElementById('mq-files-state').style.display  = n === 0 ? 'none' : '';
}

function renderCards() {
  var grid = document.getElementById('mq-cards-grid');
  grid.innerHTML = S.files.map(function(f, i) {
    var thumbHtml = f.thumbnail
      ? '<img src="' + f.thumbnail + '" alt="' + f.fileName + '">'
      : '<span class="mq-card-thumb-placeholder">📐</span>';
    var volMm3 = Math.round(f.volume * 1000).toLocaleString();
    return (
      '<div class="mq-card' + (f.selected ? ' selected' : '') + '" data-idx="' + i + '">' +

        /* ── Row 1: toggle | filename | delete ── */
        '<div class="mq-card-header">' +
          '<label class="mq-toggle" title="Select">' +
            '<input type="checkbox"' + (f.selected ? ' checked' : '') + ' data-toggle="' + i + '">' +
            '<span class="mq-toggle-slider"></span>' +
          '</label>' +
          '<div class="mq-card-name" title="' + f.fileName + '">' + f.fileName + '</div>' +
          '<button class="mq-card-del" data-del="' + i + '" title="Remove">🗑</button>' +
        '</div>' +

        /* ── Row 2: thumbnail (left) | dims + vol (right) ── */
        '<div class="mq-card-body">' +
          '<div class="mq-card-thumb">' + thumbHtml + '</div>' +
          '<div class="mq-card-info">' +
            '<div class="mq-card-dims">' + f.bbox.x + ' × ' + f.bbox.y + ' × ' + f.bbox.z + ' mm</div>' +
            '<div class="mq-card-vol">' + volMm3 + ' mm³</div>' +
          '</div>' +
        '</div>' +

        /* ── Row 3: qty stepper ── */
        '<div class="mq-card-footer">' +
          '<div class="mq-stepper">' +
            '<button data-card-dec="' + i + '">−</button>' +
            '<input type="number" min="1" value="' + f.qty + '" data-card-qty="' + i + '">' +
            '<button data-card-inc="' + i + '">+</button>' +
          '</div>' +
        '</div>' +

      '</div>'
    );
  }).join('');

  // Attach events
  grid.querySelectorAll('[data-toggle]').forEach(function(cb) {
    cb.addEventListener('change', function() {
      var idx = +cb.dataset.toggle;
      S.files[idx].selected = cb.checked;
      var card = cb.closest('.mq-card');
      card.classList.toggle('selected', cb.checked);
      updateHeader();
    });
  });

  grid.querySelectorAll('[data-del]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      removeFile(+btn.dataset.del);
    });
  });

  grid.querySelectorAll('[data-card-dec]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = +btn.dataset.cardDec;
      applyCardQty(idx, S.files[idx].qty - 1);
    });
  });
  grid.querySelectorAll('[data-card-inc]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = +btn.dataset.cardInc;
      applyCardQty(idx, S.files[idx].qty + 1);
    });
  });
  grid.querySelectorAll('[data-card-qty]').forEach(function(inp) {
    inp.addEventListener('change', function() {
      applyCardQty(+inp.dataset.cardQty, +inp.value);
    });
  });

  updateHeader();
}

function applyCardQty(idx, val) {
  val = Math.max(1, parseInt(val) || 1);
  S.files[idx].qty = val;
  var inp = document.querySelector('[data-card-qty="' + idx + '"]');
  if (inp) inp.value = val;
}

function removeFile(idx) {
  S.files.splice(idx, 1);
  renderCards();
  if (!S.files.length) updateHeader();
}

// ── THUMBNAIL QUEUE ──────────────────────────────────────────────────────────
// Generate thumbnails sequentially to avoid hitting WebGL context limits
var thumbQueue = [];
var thumbRunning = false;

function enqueueThumbnail(fileObj) {
  thumbQueue.push(fileObj);
  if (!thumbRunning) drainThumbQueue();
}

function drainThumbQueue() {
  if (!thumbQueue.length) { thumbRunning = false; return; }
  thumbRunning = true;
  var f = thumbQueue.shift();
  // Use setTimeout to yield to the browser between renders
  setTimeout(function() {
    f.thumbnail = generateThumbnail(f.geometry);
    // Patch the img in the existing card without full re-render
    var cards = document.querySelectorAll('#mq-cards-grid .mq-card');
    var idx = S.files.indexOf(f);
    if (idx !== -1 && cards[idx]) {
      var thumb = cards[idx].querySelector('.mq-card-thumb');
      if (thumb && f.thumbnail) {
        thumb.innerHTML = '<img src="' + f.thumbnail + '" alt="' + f.fileName + '">';
      }
    }
    drainThumbQueue();
  }, 20);
}

// ── FILE LOADING ─────────────────────────────────────────────────────────────
var SUPPORTED = ['stl', 'obj', 'ply', 'glb', 'gltf'];

function readBuffer(file) {
  return new Promise(function(res, rej) {
    var r = new FileReader();
    r.onload = function(e) { res(e.target.result); };
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}

function parseSTLToVerts(buffer) {
  var view = new DataView(buffer);
  var triCount = view.getUint32(80, true);
  var looksLikeBinary = Math.abs(buffer.byteLength - (84 + triCount * 50)) < 4;
  var headerText = new TextDecoder().decode(new Uint8Array(buffer, 0, 80));
  if (headerText.trimStart().startsWith('solid') && !looksLikeBinary) {
    var text = new TextDecoder().decode(buffer);
    var re = /vertex\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)/g;
    var c = [], m;
    while ((m = re.exec(text)) !== null) c.push(+m[1], +m[2], +m[3]);
    return new Float32Array(c);
  }
  var verts = new Float32Array(triCount * 9);
  var src = 84, dst = 0;
  for (var i = 0; i < triCount; i++) {
    src += 12;
    for (var j = 0; j < 9; j++) { verts[dst++] = view.getFloat32(src, true); src += 4; }
    src += 2;
  }
  return verts;
}

function computeVolumeFromGeo(geo) {
  var pos = geo.attributes.position;
  var idx = geo.index;
  var vol = 0;
  var minX=1e9, minY=1e9, minZ=1e9, maxX=-1e9, maxY=-1e9, maxZ=-1e9;

  function tri(i0, i1, i2) {
    var x1=pos.getX(i0), y1=pos.getY(i0), z1=pos.getZ(i0);
    var x2=pos.getX(i1), y2=pos.getY(i1), z2=pos.getZ(i1);
    var x3=pos.getX(i2), y3=pos.getY(i2), z3=pos.getZ(i2);
    vol += x1*(y2*z3-y3*z2) + y1*(z2*x3-z3*x2) + z1*(x2*y3-x3*y2);
    minX=Math.min(minX,x1,x2,x3); maxX=Math.max(maxX,x1,x2,x3);
    minY=Math.min(minY,y1,y2,y3); maxY=Math.max(maxY,y1,y2,y3);
    minZ=Math.min(minZ,z1,z2,z3); maxZ=Math.max(maxZ,z1,z2,z3);
  }

  if (idx) {
    for (var i = 0; i < idx.count; i += 3) tri(idx.getX(i), idx.getX(i+1), idx.getX(i+2));
  } else {
    for (var i = 0; i < pos.count; i += 3) tri(i, i+1, i+2);
  }

  return {
    volume: +(Math.abs(vol) / 6000).toFixed(4),
    bbox: { x:+(maxX-minX).toFixed(2), y:+(maxY-minY).toFixed(2), z:+(maxZ-minZ).toFixed(2) },
  };
}

function extractFirstGeometry(object) {
  var geo = null;
  object.traverse(function(child) { if (!geo && child.isMesh && child.geometry) geo = child.geometry; });
  if (!geo) throw new Error('No geometry found');
  return geo;
}

function fitsIn(bbox, process) {
  var part  = [bbox.x, bbox.y, bbox.z].sort(function(a,b) { return a-b; });
  var build = Object.values(BUILD_VOL[process]).sort(function(a,b) { return a-b; });
  return part.every(function(d,i) { return d <= build[i]; });
}

function loadGeometry(buffer, ext) {
  switch (ext) {
    case 'stl': {
      var verts = parseSTLToVerts(buffer);
      if (!verts.length) throw new Error('empty');
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      return Promise.resolve(geo);
    }
    case 'ply':
      return Promise.resolve(new THREE.PLYLoader().parse(buffer));
    case 'obj': {
      var text = new TextDecoder().decode(buffer);
      return Promise.resolve(extractFirstGeometry(new THREE.OBJLoader().parse(text)));
    }
    case 'glb':
    case 'gltf': {
      var blob = new Blob([buffer]);
      var url  = URL.createObjectURL(blob);
      return new Promise(function(res, rej) {
        new THREE.GLTFLoader().load(url, function(gltf) {
          URL.revokeObjectURL(url);
          res(extractFirstGeometry(gltf.scene));
        }, undefined, rej);
      });
    }
    default:
      return Promise.reject(new Error('Unsupported format: .' + ext));
  }
}

function parseOneFile(file) {
  var ext = file.name.split('.').pop().toLowerCase();
  if (!SUPPORTED.includes(ext)) return Promise.reject(Object.assign(new Error(), { name: file.name }));
  return readBuffer(file).then(function(buffer) {
    return loadGeometry(buffer, ext);
  }).then(function(geometry) {
    var result = computeVolumeFromGeo(geometry);
    return {
      fileName: file.name,
      bbox: result.bbox,
      volume: result.volume,
      fdmFits: fitsIn(result.bbox, 'FDM'),
      slaFits: fitsIn(result.bbox, 'SLA'),
      qty: S.globalQty,
      selected: true,
      thumbnail: null,
      geometry: geometry,
      originalFile: file,
    };
  });
}

function handleFiles(fileList) {
  var all = Array.from(fileList);
  var supported   = all.filter(function(f) { return SUPPORTED.includes(f.name.split('.').pop().toLowerCase()); });
  var unsupported = all.filter(function(f) { return !SUPPORTED.includes(f.name.split('.').pop().toLowerCase()); });

  var errEl = document.getElementById('mq-upload-err');
  var errEl2 = document.getElementById('mq-upload-err2');

  if (!supported.length) {
    errEl.innerHTML = '<div class="mq-err">Supported formats: STL, OBJ, PLY, GLB, GLTF</div>';
    return;
  }
  errEl.innerHTML = '';
  setLoad(supported.length === 1 ? 'Loading ' + supported[0].name + '…' : 'Loading ' + supported.length + ' files…');

  Promise.allSettled(supported.map(parseOneFile)).then(function(results) {
    var ok     = results.filter(function(r) { return r.status === 'fulfilled'; }).map(function(r) { return r.value; });
    var failed = results.filter(function(r) { return r.status === 'rejected'; }).map(function(_, i) { return supported[i].name; });

    S.files.push.apply(S.files, ok);
    show('upload');
    renderCards();

    // Queue thumbnail generation
    ok.forEach(function(f) { enqueueThumbnail(f); });

    var msgs = [];
    if (failed.length)      msgs.push('Could not load: ' + failed.join(', '));
    if (unsupported.length) msgs.push('Unsupported: ' + unsupported.map(function(f) { return f.name; }).join(', '));
    if (errEl2) errEl2.innerHTML = msgs.length ? '<div class="mq-err">' + msgs.join('<br>') + '</div>' : '';
  });
}

// ── DROP ZONES ────────────────────────────────────────────────────────────────
var input = document.getElementById('mq-input');
var zone  = document.getElementById('mq-zone');

// Empty-state drop zone — clicking anywhere in the zone (or the button) opens picker
zone.addEventListener('click', function() { input.click(); });
zone.addEventListener('dragover',  function(e) { e.preventDefault(); zone.classList.add('over'); });
zone.addEventListener('dragleave', function() { zone.classList.remove('over'); });
zone.addEventListener('drop', function(e) { e.preventDefault(); zone.classList.remove('over'); handleFiles(e.dataTransfer.files); });

// Files-state "Upload more" zone
var dropMore = document.getElementById('mq-drop-more');
dropMore.addEventListener('click', function() { input.click(); });
dropMore.addEventListener('dragover',  function(e) { e.preventDefault(); dropMore.classList.add('over'); });
dropMore.addEventListener('dragleave', function() { dropMore.classList.remove('over'); });
dropMore.addEventListener('drop', function(e) { e.preventDefault(); dropMore.classList.remove('over'); handleFiles(e.dataTransfer.files); });

input.addEventListener('change', function(e) { handleFiles(e.target.files); input.value = ''; });

// ── GLOBAL QTY STEPPER ────────────────────────────────────────────────────────
var gQtyInp = document.getElementById('mq-g-qty');

function applyGlobalQty(val) {
  val = Math.max(1, parseInt(val) || 1);
  S.globalQty = val;
  gQtyInp.value = val;
  S.files.forEach(function(f) { f.qty = val; });
  // Update all card qty inputs in place
  document.querySelectorAll('[data-card-qty]').forEach(function(inp) { inp.value = val; });
}

document.getElementById('mq-g-dec').addEventListener('click', function() { applyGlobalQty(S.globalQty - 1); });
document.getElementById('mq-g-inc').addEventListener('click', function() { applyGlobalQty(S.globalQty + 1); });
gQtyInp.addEventListener('change', function() { applyGlobalQty(+gQtyInp.value); });

// ── TOOLBAR BUTTONS ───────────────────────────────────────────────────────────
document.getElementById('mq-select-all').addEventListener('click', function() {
  var allSelected = S.files.every(function(f) { return f.selected; });
  S.files.forEach(function(f) { f.selected = !allSelected; });
  renderCards();
});

document.getElementById('mq-delete-sel').addEventListener('click', function() {
  S.files = S.files.filter(function(f) { return !f.selected; });
  renderCards();
  if (!S.files.length) updateHeader();
});

// ── CONTINUE BUTTON ───────────────────────────────────────────────────────────
document.getElementById('mq-continue').addEventListener('click', function() {
  if (!S.files.length) return;
  var anyFDM = S.files.some(function(f) { return f.fdmFits; });
  var anySLA = S.files.some(function(f) { return f.slaFits; });

  // Auto-select process if only one option fits all uploaded files
  if (anyFDM && !anySLA) { S.process = 'FDM'; saveSession(); }
  else if (anySLA && !anyFDM) { S.process = 'SLA'; saveSession(); }

  if (S.process) {
    // Validate saved process still fits the current files
    var fits = S.files.some(function(f) { return S.process === 'FDM' ? f.fdmFits : f.slaFits; });
    if (!fits) { S.process = null; S.material = null; S.materialLabel = ''; clearSession(); }
  }

  if (S.process && S.material) {
    // Both saved — jump straight to quote
    buildQuote();
  } else if (S.process) {
    // Process known — skip to material
    renderMaterials(); show('material');
  } else {
    // Let user pick process
    renderProcess(); show('process');
  }
});

// ── PROCESS ──────────────────────────────────────────────────────────────────
document.getElementById('mq-back-proc').addEventListener('click', function() { show('upload'); });

// ── STEP TAB CLICK NAVIGATION (back to any completed step) ───────────────────
document.querySelectorAll('#mq .mq-step').forEach(function(el) {
  el.addEventListener('click', function() {
    if (!el.classList.contains('done')) return;
    var step = parseInt(el.id.replace('mq-s', ''), 10);
    if      (step === 1)              { show('upload'); }
    else if (step === 2 && S.files.length) { renderProcess(); show('process'); }
    else if (step === 3 && S.process) { renderMaterials(); show('material'); }
  });
});

function renderProcess() {
  var anyFDM = S.files.some(function(f) { return f.fdmFits; });
  var anySLA = S.files.some(function(f) { return f.slaFits; });
  document.getElementById('mq-fdm').disabled = !anyFDM;
  document.getElementById('mq-sla').disabled = !anySLA;

  var warns = [];
  var fdmSkip = S.files.filter(function(f) { return !f.fdmFits; }).map(function(f) { return f.fileName; });
  var slaSkip = S.files.filter(function(f) { return !f.slaFits; }).map(function(f) { return f.fileName; });
  if (fdmSkip.length && anyFDM) warns.push('FDM: ' + fdmSkip.join(', ') + ' exceed build volume and will be skipped.');
  if (slaSkip.length && anySLA) warns.push('SLA: ' + slaSkip.join(', ') + ' exceed build volume and will be skipped.');
  if (!anyFDM) warns.push('No files fit the FDM build volume (254 × 254 × 254 mm).');
  if (!anySLA) warns.push('No files fit the SLA build volume (298 × 164 × 300 mm).');

  document.getElementById('mq-proc-warn').innerHTML =
    warns.length ? '<div class="mq-warn">' + warns.join('<br>') + '</div>' : '';

  ['mq-fdm', 'mq-sla'].forEach(function(id) {
    var btn = document.getElementById(id);
    btn.onclick = function() { S.process = btn.dataset.p; saveSession(); renderMaterials(); show('material'); };
  });
}

// ── MATERIAL ─────────────────────────────────────────────────────────────────
document.getElementById('mq-back-mat').addEventListener('click', function() { show('process'); });

function costBadge(n) {
  return '<span class="mq-mat-cost">' +
    '<span class="mq-cost-filled">' + '$'.repeat(n) + '</span>' +
    '<span class="mq-cost-empty">'  + '$'.repeat(4 - n) + '</span>' +
  '</span>';
}

function renderMaterials() {
  var container = document.getElementById('mq-mat-grid');
  container.innerHTML = '';
  document.getElementById('mq-mat-err').innerHTML = '';

  // Build ordered group list preserving declaration order
  var groups = [], groupMap = {};
  MATERIALS[S.process].forEach(function(mat) {
    var g = mat.group || 'Other';
    if (!groupMap[g]) { groupMap[g] = []; groups.push(g); }
    groupMap[g].push(mat);
  });

  groups.forEach(function(groupName) {
    var label = document.createElement('p');
    label.className = 'mq-mat-group-label';
    label.textContent = groupName;
    container.appendChild(label);

    var grid = document.createElement('div');
    grid.className = 'mq-grid-4';

    groupMap[groupName].forEach(function(mat) {
      var btn = document.createElement('button');
      btn.className = 'mq-opt';
      btn.innerHTML =
        '<span class="mq-mat-top">' +
          '<span class="mq-mat-name">' + mat.label + '</span>' +
          costBadge(mat.cost) +
        '</span>' +
        (mat.desc ? '<small>' + mat.desc + '</small>' : '');
      btn.onclick = function() { S.material = mat.key; S.materialLabel = mat.label; saveSession(); buildQuote(); };
      grid.appendChild(btn);
    });

    container.appendChild(grid);
  });
}

// ── QUOTE ────────────────────────────────────────────────────────────────────
document.getElementById('mq-back-quote').addEventListener('click', function() { show('material'); });

function discountPct(qty) {
  var t = QTY_BREAKS.find(function(t) { return qty >= t.min && (t.max === null || qty <= t.max); });
  return t ? t.pct : 0;
}

function calcLine(file) {
  var cfg  = MOCK_RATES[S.process];
  var rate = cfg.mats[S.material] || 0.20;
  var hrs  = file.volume / cfg.cm3PerHr;
  var base = +(file.volume * rate + hrs * cfg.machineRatePerHr).toFixed(2);
  var pct  = discountPct(file.qty);
  var unit = +(base * (1 - pct / 100)).toFixed(2);
  return { base: base, unit: unit, pct: pct, lineTotal: +(unit * file.qty).toFixed(2), leadDays: Math.max(3, Math.ceil((file.qty * hrs) / 16) + 2) };
}

function buildQuote() {
  setLoad('Calculating your quote…');
  document.getElementById('mq-mat-err').innerHTML = '';
  var eligible = S.files.filter(function(f) { return f[S.process === 'FDM' ? 'fdmFits' : 'slaFits']; });
  if (!eligible.length) {
    show('material');
    document.getElementById('mq-mat-err').innerHTML = '<div class="mq-err">No uploaded files fit the selected process.</div>';
    return;
  }
  if (MOCK_MODE) {
    setTimeout(function() { S.quote = { eligible: eligible }; renderQuote(); show('quote'); }, 500);
  } else {
    S.quote = { eligible: eligible }; renderQuote(); show('quote');
  }
}

function renderQuote() {
  var eligible = S.quote.eligible;
  var items = eligible.map(function(f) { return Object.assign({ file: f }, calcLine(f)); });
  S.quoteItems = items;
  S.shipping = null; // reset shipping on each quote render

  function grandTotal() { return +items.reduce(function(s, it) { return s + it.lineTotal; }, 0).toFixed(2); }
  function maxLead()    { return Math.max.apply(null, items.map(function(it) { return it.leadDays; })); }
  function filesSummary() {
    return items.map(function(it) {
      return it.file.fileName + ' | ' + it.file.volume + ' cm³ | qty ' + it.file.qty + ' | $' + it.lineTotal.toFixed(2);
    }).join('\n');
  }

  document.getElementById('mq-quote-body').innerHTML =
    '<div class="mq-quote-meta"><strong>' + S.process + ' · ' + S.materialLabel + '</strong>' +
    '<span id="mq-lead">Est. ' + maxLead() + ' business days</span></div>' +
    '<div class="mq-fl-header"><span>File</span><span>Unit price</span><span>Qty</span><span>Total</span></div>' +
    '<div id="mq-lines">' + items.map(function(it, i) {
      return '<div class="mq-fl" data-idx="' + i + '">' +
        '<div><div class="mq-fl-name">' + it.file.fileName + '</div><div class="mq-fl-sub">' + it.file.volume + ' cm³</div></div>' +
        '<div class="mq-fl-vol">$' + it.unit.toFixed(2) + ' / ea</div>' +
        '<div class="mq-fl-qty"><div class="mq-stepper"><button class="mq-dec">−</button>' +
        '<input type="number" min="1" value="' + it.file.qty + '" class="mq-qty-inp">' +
        '<button class="mq-inc">+</button></div>' +
        (it.pct > 0 ? '<span class="mq-badge">−' + it.pct + '%</span>' : '') + '</div>' +
        '<div class="mq-fl-price mq-line-total">$' + it.lineTotal.toFixed(2) + '</div>' +
      '</div>';
    }).join('') + '</div>' +

    /* ── Volume discount tier bar ── */
    (function() {
      return '<div class="mq-discount-bar" id="mq-discount-bar">' +
        '<span class="mq-discount-bar-label">Volume discounts</span>' +
        QTY_BREAKS.filter(function(t) { return t.pct > 0; }).map(function(t) {
          var label  = (t.max ? t.min + '–' + t.max : t.min + '+') + ' units · ' + t.pct + '% off';
          var active = items.some(function(it) { return it.file.qty >= t.min && (t.max === null || it.file.qty <= t.max); });
          return '<span class="mq-discount-tier' + (active ? ' active' : '') + '" data-min="' + t.min + '" data-max="' + (t.max || '') + '">' + label + '</span>';
        }).join('') +
      '</div>';
    })() +

    '<div class="mq-grand-row"><span>Parts Total</span><span id="mq-grand">$' + grandTotal().toFixed(2) + '</span></div>' +
    '<div class="mq-savings-row" id="mq-savings-row" style="display:none">🎉 You\'re saving <strong id="mq-savings"></strong> with volume pricing</div>' +

    /* ── Form body — hidden as a unit on success ── */
    '<div id="mq-form-body">' +

      /* ── Contact details ── */
      '<div class="mq-contact-section">' +
        '<p class="mq-contact-heading">Where should we send your quote?</p>' +
        '<input class="mq-inp" id="mq-c-name"    type="text"  placeholder="Full name *"        autocomplete="name">' +
        '<input class="mq-inp" id="mq-c-email"   type="email" placeholder="Email address *"    autocomplete="email">' +
        '<input class="mq-inp" id="mq-c-company" type="text"  placeholder="Company (optional)" autocomplete="organization">' +
        '<textarea class="mq-inp mq-note" id="mq-c-note" placeholder="Any details we should know? (print orientation, intended use, finish requirements…)"></textarea>' +
      '</div>' +

    '</div>' + /* /mq-form-body */

    '<div class="mq-success" id="mq-success" style="display:none">' +
      '<div class="mq-success-icon">✅</div>' +
      '<h3>Quote request received!</h3>' +
      '<p>We\'ll review your files and follow up within one business day.</p>' +
    '</div>' +
    '<div id="mq-submit-err"></div>' +
    '<p class="mq-trust-line">🔒 Your files are never shared · Prices confirmed within 1 business day</p>' +
    '<button class="mq-cta" id="mq-req-btn">Request My Quote →</button>' +
    '<p class="mq-footnote">Prices based on current material rates · Estimates typically valid for 30 days</p>';

  // ── Qty changes in quote line items ──────────────────────────────────────────
  document.getElementById('mq-lines').addEventListener('click', function(e) {
    var row = e.target.closest('.mq-fl');
    if (!row) return;
    var idx = +row.dataset.idx, inp = row.querySelector('.mq-qty-inp');
    if (e.target.classList.contains('mq-dec')) applyQuoteQty(idx, +inp.value - 1, items);
    if (e.target.classList.contains('mq-inc')) applyQuoteQty(idx, +inp.value + 1, items);
  });
  document.getElementById('mq-lines').addEventListener('change', function(e) {
    if (e.target.classList.contains('mq-qty-inp')) {
      var row = e.target.closest('.mq-fl');
      if (row) applyQuoteQty(+row.dataset.idx, +e.target.value, items);
    }
  });


  // ── Quote form submission ─────────────────────────────────────────────────────
  document.getElementById('mq-req-btn').addEventListener('click', function() {
    var nameEl    = document.getElementById('mq-c-name');
    var emailEl   = document.getElementById('mq-c-email');
    var companyEl = document.getElementById('mq-c-company');
    var errEl     = document.getElementById('mq-submit-err');
    var name    = nameEl.value.trim();
    var email   = emailEl.value.trim();
    var company = companyEl.value.trim();
    var note    = document.getElementById('mq-c-note').value.trim();

    nameEl.classList.remove('error'); emailEl.classList.remove('error');
    errEl.innerHTML = '';
    var valid = true;
    if (!name)  { nameEl.classList.add('error');  valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailEl.classList.add('error'); valid = false; }
    if (!valid) { errEl.innerHTML = '<p class="mq-submit-err">Please fill in the required fields.</p>'; return; }

    var btn = document.getElementById('mq-req-btn');
    btn.disabled = true; btn.textContent = 'Submitting…';

    var fd = new FormData();
    fd.append('name',        name);
    fd.append('email',       email);
    fd.append('_replyto',    email);
    if (company) fd.append('company', company);
    fd.append('process',     S.process);
    fd.append('material',    S.materialLabel);
    fd.append('quote',       filesSummary());
    fd.append('parts_total', '$' + grandTotal().toFixed(2));
    fd.append('lead_time',   'Est. ' + maxLead() + ' business days');
    if (note) fd.append('note', note);
    eligible.forEach(function(f) { if (f.originalFile) fd.append('attachment', f.originalFile, f.fileName); });

    fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
      .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
      .then(function(r) {
        if (r.ok) {
          clearSession();
          var succEl = document.getElementById('mq-success');
          document.getElementById('mq-form-body').style.display = 'none';
          document.getElementById('mq-req-btn').style.display   = 'none';
          succEl.innerHTML =
            '<div class="mq-success-icon">✅</div>' +
            '<h3>Quote request received!</h3>' +
            '<p>We\'ll review your files and follow up within one business day.</p>' +
            '<p class="mq-success-email">A confirmation has been sent to <strong>' + email + '</strong></p>';
          succEl.style.display = 'block';

          // Send customer confirmation email via EmailJS
          if (window.emailjs && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
              to_name:     name,
              name:        name,
              to_email:    email,
              company:     company || '',
              phone:       phone   || '',
              process:     S.process,
              material:    S.materialLabel,
              quote_lines: filesSummary(),
              parts_total: '$' + grandTotal().toFixed(2),
              lead_time:   'Est. ' + maxLead() + ' business days',
              note:        note   || '',
            }).catch(function() {});
          }
        } else {
          btn.disabled = false; btn.textContent = 'Request My Quote →';
          errEl.innerHTML = '<p class="mq-submit-err">' + (r.data.error || 'Submission failed — please try again.') + '</p>';
        }
      })
      .catch(function() {
        btn.disabled = false; btn.textContent = 'Submit Quote Request →';
        errEl.innerHTML = '<p class="mq-submit-err">Network error — please check your connection and try again.</p>';
      });
  });

  function applyQuoteQty(idx, val, items) {
    val = Math.max(1, parseInt(val) || 1);
    items[idx].file.qty = val;
    var row = document.querySelector('#mq-lines .mq-fl[data-idx="' + idx + '"]');
    row.querySelector('.mq-qty-inp').value = val;
    var it  = items[idx];
    var pct = discountPct(val);
    var unit = +(it.base * (1 - pct / 100)).toFixed(2);
    it.lineTotal = +(unit * val).toFixed(2);
    it.pct = pct;
    it.leadDays = Math.max(3, Math.ceil((val * (it.file.volume / MOCK_RATES[S.process].cm3PerHr)) / 16) + 2);
    row.querySelector('.mq-line-total').textContent = '$' + it.lineTotal.toFixed(2);
    var badge = row.querySelector('.mq-badge');
    if (pct > 0) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'mq-badge'; row.querySelector('.mq-fl-qty').appendChild(badge); }
      badge.textContent = '−' + pct + '%';
    } else if (badge) { badge.remove(); }
    document.getElementById('mq-grand').textContent = '$' + grandTotal().toFixed(2);
    document.getElementById('mq-lead').textContent  = 'Est. ' + maxLead() + ' business days';
    renderDiscountBar(items);  // also updates savings row
    // Re-render shipping tier prices — weight changes with qty
    if (S.address.zip && S.address.zip.length >= 5) {
      renderShipOpts(eligible, S.address.zip);
      // Sync the stored cost for the already-selected tier to the new weight
      if (S.shipping) {
        S.shipping.cost = shipCost(S.shipping.method, eligible, S.address.zip);
      }
    }
    updateOrderTotal();
  }
}

// ── DISCOUNT BAR + SAVINGS ────────────────────────────────────────────────────
function renderDiscountBar(items) {
  var bar = document.getElementById('mq-discount-bar');
  if (!bar || !items) return;
  bar.querySelectorAll('.mq-discount-tier').forEach(function(el) {
    var min = +el.dataset.min;
    var max = el.dataset.max ? +el.dataset.max : Infinity;
    var active = items.some(function(it) { return it.file.qty >= min && it.file.qty <= max; });
    el.classList.toggle('active', active);
  });
  // Show "You're saving $X" when any discount applies
  var savings = +(items.reduce(function(s, it) { return s + (it.base - it.unit) * it.qty; }, 0)).toFixed(2);
  var row = document.getElementById('mq-savings-row');
  var el  = document.getElementById('mq-savings');
  if (row && el) {
    if (savings > 0) { el.textContent = '$' + savings.toFixed(2); row.style.display = ''; }
    else             { row.style.display = 'none'; }
  }
}

// ── STATE SELECT ─────────────────────────────────────────────────────────────
function stateSelectHTML(id) {
  var st = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
    'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
    'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
    'VT','VA','WA','WV','WI','WY',
  ];
  return '<select class="mq-inp mq-select" id="' + id + '" autocomplete="address-level1">' +
    '<option value="">State</option>' +
    st.map(function(s) { return '<option value="' + s + '">' + s + '</option>'; }).join('') +
    '</select>';
}

// ── SHIPPING HELPERS ──────────────────────────────────────────────────────────

// Total billable weight in lbs: volume × material density × infill factor × qty
function wLbs(eligible) {
  var cfg = DENSITIES[S.process];
  var den = cfg.mats[S.material] || 1.1;
  // f.volume is cm³; × g/cm³ = grams; / 453.592 = lbs
  return eligible.reduce(function(s, f) {
    return s + f.volume * cfg.fillFactor * den * f.qty;
  }, 0) / 453.592;
}

// Outer box dimensions in inches: max part bbox + 2-inch packing buffer per side
function boxIn(eligible) {
  var x = 0, y = 0, z = 0;
  eligible.forEach(function(f) {
    x = Math.max(x, f.bbox.x);
    y = Math.max(y, f.bbox.y);
    z = Math.max(z, f.bbox.z);
  });
  var BUF = 50.8; // 2 inches in mm
  return { l: (x + BUF) / 25.4, w: (y + BUF) / 25.4, h: (z + BUF) / 25.4 };
}

// Resolve UPS/FedEx carrier zone from destination ZIP (origin: Brea CA 92821)
function getZone(zip) {
  return ZIP2_ZONE[zip.substring(0, 2)] || 5;
}

// Carrier cost: uses higher of actual weight vs DIM weight (industry standard ÷ 139)
// Rates vary by zone (distance from Brea, CA 92821)
function shipCost(method, eligible, zip) {
  var w    = wLbs(eligible);
  var b    = boxIn(eligible);
  var dim  = (b.l * b.w * b.h) / 139;
  var bill = Math.max(w, dim, 1.0); // 1 lb minimum (carrier standard)
  var zone = getZone(zip);
  var r    = SHIP_RATES[method].zones[zone];
  return +(r.base + r.perLb * bill).toFixed(2);
}

// Refresh the order breakdown row (called after tier selection or qty change)
function updateOrderTotal() {
  var row = document.getElementById('mq-order-total-row');
  if (!row || !S.quoteItems) return;
  if (S.shipping) {
    var parts = +S.quoteItems.reduce(function(s, it) { return s + it.lineTotal; }, 0).toFixed(2);
    var ship  = S.shipping.cost;
    var tax   = +(parts * TAX_RATE).toFixed(2);
    var total = +(parts + ship + tax).toFixed(2);
    document.getElementById('mq-breakdown-parts').textContent      = '$' + parts.toFixed(2);
    document.getElementById('mq-breakdown-ship-label').textContent = 'Shipping (' + S.shipping.method + ')';
    document.getElementById('mq-breakdown-ship').textContent       = '$' + ship.toFixed(2);
    document.getElementById('mq-breakdown-tax').textContent        = '$' + tax.toFixed(2);
    document.getElementById('mq-order-total-val').textContent      = '$' + total.toFixed(2);
    row.style.display = '';
  } else {
    row.style.display = 'none';
  }
}

// Render three shipping tier cards inside #mq-ship-opts
function renderShipOpts(eligible, zip) {
  var optsEl = document.getElementById('mq-ship-opts');
  if (!optsEl) return;
  optsEl.style.display = '';
  var w = wLbs(eligible);
  var b = boxIn(eligible);
  optsEl.innerHTML =
    '<div class="mq-ship-opts">' +
      ['Ground', 'Express', 'Overnight'].map(function(m) {
        var cost = shipCost(m, eligible, zip);
        var r    = SHIP_RATES[m];
        var sel  = S.shipping && S.shipping.method === m;
        return (
          '<div class="mq-ship-opt' + (sel ? ' selected' : '') + '" data-method="' + m + '" data-cost="' + cost + '">' +
            '<div class="mq-ship-opt-name">' + m + '</div>' +
            '<div class="mq-ship-opt-days">' + r.days + ' business day' + (r.days === '1' ? '' : 's') + '</div>' +
            '<div class="mq-ship-opt-price">$' + cost.toFixed(2) + '</div>' +
          '</div>'
        );
      }).join('') +
    '</div>' +
    '<p class="mq-ship-note">Shipping from Brea, CA · Zone ' + getZone(zip) + ' → ZIP ' + zip +
      ' · ~' + w.toFixed(2) + ' lbs' +
      ' · ' + b.l.toFixed(1) + '″ × ' + b.w.toFixed(1) + '″ × ' + b.h.toFixed(1) + '″ box' +
    '</p>';

  optsEl.querySelectorAll('.mq-ship-opt').forEach(function(card) {
    card.addEventListener('click', function() {
      optsEl.querySelectorAll('.mq-ship-opt').forEach(function(c) { c.classList.remove('selected'); });
      card.classList.add('selected');
      S.shipping = { method: card.dataset.method, cost: +card.dataset.cost };
      updateOrderTotal();
    });
  });
}