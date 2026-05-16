// ── CONFIG ───────────────────────────────────────────────────────────────────
var _cfg = window.MQ || {};
const API_BASE      = _cfg.API_BASE      || 'https://YOUR-BACKEND.railway.app';

const MOCK_MODE     = _cfg.MOCK_MODE     !== undefined ? _cfg.MOCK_MODE : true;
const FORMSPREE_URL = _cfg.FORMSPREE_URL || 'https://formspree.io/f/mojrlbvn';

// Customer confirmation emails are handled by Formspree's auto-reply feature.

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
    { key: 'PP',       label: 'Polypropylene (PP)', group: 'Standard',   cost: 2, desc: 'Chemically inert with outstanding fatigue resistance. Ideal for living hinges, snap-fits, and fluid-contact or food-safe parts.' },
    // ── Engineering ───────────────────────────────────────────────────────────
    { key: 'Nylon',    label: 'Nylon (PA12)',      group: 'Engineering', cost: 2, desc: 'Impact-resistant with low friction. Best for gears and load-bearing parts.' },
    { key: 'PA6',      label: 'Nylon 6 (PA6)',     group: 'Engineering', cost: 2, desc: 'Higher tensile strength ceiling than PA12. Great for structural brackets, gears, and high-load mechanical parts.' },
    { key: 'PC',       label: 'Polycarbonate',     group: 'Engineering', cost: 2, desc: 'Extremely tough and heat-resistant. For demanding mechanical and electrical parts.' },
    { key: 'PC-ABS',   label: 'PC/ABS Blend',      group: 'Engineering', cost: 2, desc: 'Combines PC impact strength with ABS ease of printing. Ideal for enclosures, brackets, and functional parts needing toughness.' },
    // ── Composite ─────────────────────────────────────────────────────────────
    { key: 'PLA-CF',   label: 'PLA Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Lightweight and rigid. Best for stiff structural prototypes and cosmetic parts.' },
    { key: 'PETG-CF',  label: 'PETG Carbon Fiber', group: 'Composite',   cost: 3, desc: 'Rigid and dimensionally stable. For load-bearing assemblies and brackets.' },
    { key: 'PET-CF',   label: 'PET Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Stiff with low moisture absorption and excellent dimensional stability. Ideal for precision structural brackets and load-bearing components.' },
    { key: 'ABS-CF',   label: 'ABS Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'High stiffness with excellent surface quality. For high-performance functional parts.' },
    { key: 'ASA-CF',   label: 'ASA Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Weather resistant with added stiffness. For outdoor structural applications.' },
    { key: 'TPU-CF',   label: 'TPU Carbon Fiber',  group: 'Composite',   cost: 3, desc: 'Semi-flexible with added stiffness. For wear-resistant flexible components.' },
    { key: 'Nylon-CF', label: 'Nylon Carbon Fiber',group: 'Composite',   cost: 4, desc: 'Exceptional strength-to-weight ratio. For aerospace, robotics, and structural brackets.' },
    { key: 'Nylon-GF', label: 'Nylon Glass Fiber', group: 'Composite',   cost: 4, desc: 'High stiffness and dimensional stability. For precision housings and mechanical parts.' },
    { key: 'PC-CF',    label: 'PC Carbon Fiber',   group: 'Composite',   cost: 4, desc: 'Maximum stiffness and heat resistance in a printed part. For demanding structural and electrical applications where both properties are critical.' },
    { key: 'PC-GF',    label: 'PC Glass Fiber',    group: 'Composite',   cost: 4, desc: 'High strength and heat resistance. For structural enclosures and electrical components.' },
    // ── Lightweight ───────────────────────────────────────────────────────────
    { key: 'PLA-Aero', label: 'PLA Aero',          group: 'Lightweight', cost: 1, desc: 'Foaming PLA that produces a lightweight cellular structure. Significantly reduced part weight — ideal for drone frames, RC components, and any mass-sensitive prototype.' },
    { key: 'ASA-Aero', label: 'ASA Aero',          group: 'Lightweight', cost: 2, desc: 'Foaming ASA combining weather and UV resistance with major weight savings. Great for outdoor UAV components, antenna mounts, and lightweight enclosures.' },
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
  { min: 1,  max: 4,    pct: 0  },
  { min: 5,  max: 14,   pct: 8  },
  { min: 15, max: 24,   pct: 15 },
  { min: 25, max: 49,   pct: 22 },
  { min: 50, max: null, pct: 28 },
];

// Material rates are in $/cm³ of SOLID material.
// Pricing formula applies fillFactor so actual charge scales with infill density:
//   base = volume × fillFactor × material_rate  +  (volume / cm3PerHr) × machineRatePerHr
const MOCK_RATES = {
  FDM: { machineRatePerHr: 3.00, cm3PerHr: 8,
    mats: { 'PLA':0.78,'ABS':0.86,'PETG':0.95,'TPU':1.31,'Nylon':1.64,'ASA':0.99,'PET':0.86,'PC':1.96,
            'PP':0.99,'PA6':1.64,'PC-ABS':1.16,
            'PLA-CF':2.28,'ABS-CF':2.71,'PETG-CF':2.60,'PET-CF':3.50,'TPU-CF':3.14,'Nylon-CF':3.89,'ASA-CF':2.92,'Nylon-GF':3.46,'PC-CF':4.36,'PC-GF':3.78,
            'PLA-Aero':1.56,'ASA-Aero':1.98 } },
  SLA: { machineRatePerHr: 6.50, cm3PerHr: 18,
    mats: { 'Standard':0.40,'Clear':0.62,'High Temp':1.34,'ABS-Like':0.51,'Flexible':0.81 } },
};

// Material densities (g/cm³) and FDM infill factor for weight estimation
const DENSITIES = {
  FDM: { fillFactor: 0.35,
    mats: { 'PLA':1.24,'ABS':1.04,'PETG':1.27,'TPU':1.21,'Nylon':1.01,'ASA':1.07,'PET':1.38,'PC':1.20,
            'PP':0.91,'PA6':1.13,'PC-ABS':1.10,
            'PLA-CF':1.18,'ABS-CF':1.12,'PETG-CF':1.20,'PET-CF':1.30,'TPU-CF':1.18,'Nylon-CF':1.10,'ASA-CF':1.12,'Nylon-GF':1.15,'PC-CF':1.25,'PC-GF':1.32,
            'PLA-Aero':0.65,'ASA-Aero':0.65 } },
  SLA: { fillFactor: 1.0,
    mats: { 'Standard':1.10,'Clear':1.12,'High Temp':1.14,'ABS-Like':1.08,'Flexible':1.15 } },
};


// ── HTML ESCAPING ─────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
// Process and material are intentionally not restored from session —
// customers must always select both explicitly.

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
      ? '<img src="' + f.thumbnail + '" alt="' + esc(f.fileName) + '">'
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
          '<div class="mq-card-name" title="' + esc(f.fileName) + '">' + esc(f.fileName) + '</div>' +
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
        thumb.innerHTML = '<img src="' + f.thumbnail + '" alt="' + esc(f.fileName) + '">';
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
    if (failed.length)      msgs.push('Could not load: ' + failed.map(esc).join(', '));
    if (unsupported.length) msgs.push('Unsupported: ' + unsupported.map(function(f) { return esc(f.name); }).join(', '));
    if (errEl2) errEl2.innerHTML = msgs.length ? '<div class="mq-err">' + msgs.join('<br>') + '</div>' : '';
  });
}

// ── DROP ZONES ────────────────────────────────────────────────────────────────
var input = document.getElementById('mq-input');
var zone  = document.getElementById('mq-zone');

// Empty-state drop zone — clicking anywhere in the zone opens picker.
// Skip if the click came from the #mq-browse label — label-for already
// triggers the input natively; a second input.click() would cancel it.
zone.addEventListener('click', function(e) {
  if (e.target.closest('#mq-browse')) return;
  input.click();
});
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
  // Reset decline state each time the compliance screen is opened
  document.getElementById('mq-itar-contact').style.display = 'none';
  document.getElementById('mq-itar-decline').style.display = '';
  show('itar');
});

// ── ITAR COMPLIANCE SCREEN ────────────────────────────────────────────────────
document.getElementById('mq-back-itar').addEventListener('click', function() { show('upload'); });

document.getElementById('mq-itar-decline').addEventListener('click', function() {
  document.getElementById('mq-itar-contact').style.display = '';
  document.getElementById('mq-itar-decline').style.display = 'none';
});

document.getElementById('mq-itar-confirm').addEventListener('click', function() {
  S.process = null; S.material = null; S.materialLabel = '';
  var anyFDM = S.files.some(function(f) { return f.fdmFits; });
  var anySLA = S.files.some(function(f) { return f.slaFits; });

  // Auto-select process only when just one fits
  if (anyFDM && !anySLA) { S.process = 'FDM'; saveSession(); }
  else if (anySLA && !anyFDM) { S.process = 'SLA'; saveSession(); }

  if (S.process) {
    renderMaterials(); show('material');
  } else {
    renderProcess(); show('process');
  }
});

// ── PROCESS ──────────────────────────────────────────────────────────────────
document.getElementById('mq-back-proc').addEventListener('click', function() { show('itar'); });

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
  var fdmSkip = S.files.filter(function(f) { return !f.fdmFits; }).map(function(f) { return esc(f.fileName); });
  var slaSkip = S.files.filter(function(f) { return !f.slaFits; }).map(function(f) { return esc(f.fileName); });
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

  // ── "Help me decide" shortcut ───────────────────────────────────────────────
  var helpBtn = document.createElement('button');
  helpBtn.className = 'mq-help-decide-btn';
  helpBtn.innerHTML =
    '<span class="mq-help-decide-title">Help me decide</span>' +
    '<span class="mq-help-decide-sub">Not sure which material is right? Tell us about your application and our team will recommend the best option for your needs and budget.</span>';
  helpBtn.onclick = function() {
    S.material      = 'help-me-decide';
    S.materialLabel = 'Team recommendation';
    saveSession();
    buildQuote();
  };
  container.appendChild(helpBtn);

  // Build ordered group list preserving declaration order
  var groups = [], groupMap = {};
  MATERIALS[S.process].forEach(function(mat) {
    var g = mat.group || 'Other';
    if (!groupMap[g]) { groupMap[g] = []; groups.push(g); }
    groupMap[g].push(mat);
  });

  var chevron = '<svg class="mq-mat-chevron-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.5l5 5 5-5" stroke="#54f2e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  groups.forEach(function(groupName, gi) {
    var section = document.createElement('div');
    section.className = 'mq-mat-section' + (gi === 0 ? ' open' : '');

    var hdr = document.createElement('button');
    hdr.className = 'mq-mat-section-hdr';
    hdr.innerHTML =
      '<span class="mq-mat-section-name">' + groupName + '</span>' +
      '<span class="mq-mat-section-count">' + groupMap[groupName].length + ' material' + (groupMap[groupName].length !== 1 ? 's' : '') + '</span>' +
      '<span class="mq-mat-section-chevron">' + chevron + '</span>';

    hdr.addEventListener('click', function() { section.classList.toggle('open'); });

    var body = document.createElement('div');
    body.className = 'mq-mat-section-body';

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

    body.appendChild(grid);
    section.appendChild(hdr);
    section.appendChild(body);
    container.appendChild(section);
  });
}

// ── QUOTE ────────────────────────────────────────────────────────────────────
document.getElementById('mq-back-quote').addEventListener('click', function() { show('material'); });

function discountPct(qty) {
  var t = QTY_BREAKS.find(function(t) { return qty >= t.min && (t.max === null || qty <= t.max); });
  return t ? t.pct : 0;
}

var MIN_PART_PRICE = 5.00; // minimum base price per part

function calcLine(file) {
  var cfg        = MOCK_RATES[S.process];
  var fillFactor = DENSITIES[S.process].fillFactor;
  var rate       = cfg.mats[S.material] || 0.20;
  var hrs        = file.volume / cfg.cm3PerHr;
  var calculated = file.volume * fillFactor * rate + hrs * cfg.machineRatePerHr;
  var base       = +(Math.max(MIN_PART_PRICE, calculated)).toFixed(2);
  var pct        = discountPct(file.qty);
  var unit       = +(base * (1 - pct / 100)).toFixed(2);
  return { base: base, unit: unit, pct: pct, lineTotal: +(unit * file.qty).toFixed(2) };
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

function renderHelpDecideQuote(eligible) {
  var fileList = eligible.map(function(f) {
    return '<div class="mq-fl">' +
      '<div><div class="mq-fl-name">' + esc(f.fileName) + '</div>' +
      '<div class="mq-fl-sub">' + f.volume + ' cm³ · qty ' + f.qty + '</div></div>' +
      '<div style="grid-column:2/-1"></div>' +
    '</div>';
  }).join('');

  var fileSummary = eligible.map(function(f) {
    return f.fileName + ' | ' + f.volume + ' cm³ | qty ' + f.qty;
  }).join('\n');

  document.getElementById('mq-quote-body').innerHTML =
    '<div class="mq-quote-meta"><strong>' + S.process + ' · Material: Team recommendation</strong></div>' +
    '<div class="mq-help-notice">' +
      '<strong>Our team will pick the right material</strong>' +
      'Share a bit about your application below and we\'ll recommend the best material for your needs, print settings, and budget — then follow up with a full quote within 1 business day.' +
    '</div>' +
    '<div class="mq-fl-header"><span>File</span><span></span><span></span><span></span></div>' +
    '<div id="mq-lines">' + fileList + '</div>' +
    '<div id="mq-form-body">' +
      '<div class="mq-contact-section">' +
        '<p class="mq-contact-heading">Where should we send your quote?</p>' +
        '<input class="mq-inp" id="mq-c-name"    type="text"  placeholder="Full name *"        autocomplete="name">' +
        '<input class="mq-inp" id="mq-c-email"   type="email" placeholder="Email address *"    autocomplete="email">' +
        '<input class="mq-inp" id="mq-c-company" type="text"  placeholder="Company (optional)" autocomplete="organization">' +
        '<textarea class="mq-inp mq-note" id="mq-c-note" placeholder="Tell us about your application — intended use, environment, finish requirements, budget constraints…"></textarea>' +
      '</div>' +
    '</div>' +
    '<div class="mq-success" id="mq-success" style="display:none">' +
      '<div class="mq-success-icon">✅</div>' +
      '<h3>Request received!</h3>' +
      '<p>We\'ll review your files and follow up with a material recommendation and quote within 1 business day.</p>' +
    '</div>' +
    '<div class="mq-next-steps">' +
      '<p class="mq-next-steps-label">What happens next</p>' +
      '<div class="mq-next-step"><span class="mq-next-step-num">1</span><span class="mq-next-step-text">We review your files and application notes</span></div>' +
      '<div class="mq-next-step"><span class="mq-next-step-num">2</span><span class="mq-next-step-text">Our team recommends the best material for your needs and budget</span></div>' +
      '<div class="mq-next-step"><span class="mq-next-step-num">3</span><span class="mq-next-step-text">You receive a full quote within 1 business day</span></div>' +
    '</div>' +
    '<div id="mq-submit-err"></div>' +
    '<div class="mq-cta-wrap"><button class="mq-cta" id="mq-req-btn">Request Material Recommendation →</button></div>' +
    '<p class="mq-trust-line">🔒 Files are never shared · Response within 1 business day</p>';

  document.getElementById('mq-req-btn').addEventListener('click', function() {
    var nameEl  = document.getElementById('mq-c-name');
    var emailEl = document.getElementById('mq-c-email');
    var errEl   = document.getElementById('mq-submit-err');
    var name    = nameEl.value.trim();
    var email   = emailEl.value.trim();
    var company = document.getElementById('mq-c-company').value.trim();
    var note    = document.getElementById('mq-c-note').value.trim();

    nameEl.classList.remove('error'); emailEl.classList.remove('error');
    errEl.innerHTML = '';
    if (!name)  { nameEl.classList.add('error'); }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailEl.classList.add('error'); }
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errEl.innerHTML = '<p class="mq-submit-err">Please fill in the required fields.</p>'; return;
    }

    var btn = document.getElementById('mq-req-btn');
    btn.disabled = true; btn.textContent = 'Submitting…';

    var fd = new FormData();
    fd.append('name',     name);
    fd.append('email',    email);
    if (company) fd.append('company', company);
    fd.append('process',  S.process);
    fd.append('material', 'Team recommendation (to be determined)');
    fd.append('quote',    fileSummary);
    fd.append('parts_total', 'To be quoted');
    fd.append('lead_time',   'To be confirmed after material selection');
    if (note) fd.append('note', note);
    eligible.forEach(function(f) { if (f.originalFile) fd.append('attachment', f.originalFile, f.fileName); });

    fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
      .then(function(res) { return res.json().catch(function() { return {}; }).then(function(d) { return { ok: res.ok, data: d }; }); })
      .then(function(r) {
        if (r.ok) {
          document.getElementById('mq-form-body').style.display = 'none';
          document.getElementById('mq-req-btn').style.display   = 'none';
          document.getElementById('mq-success').style.display   = '';
        } else {
          btn.disabled = false; btn.textContent = 'Request Material Recommendation →';
          errEl.innerHTML = '<p class="mq-submit-err">Something went wrong. Please try again.</p>';
        }
      })
      .catch(function() {
        btn.disabled = false; btn.textContent = 'Request Material Recommendation →';
        errEl.innerHTML = '<p class="mq-submit-err">Network error. Please try again.</p>';
      });
  });
}

function renderQuote() {
  var eligible = S.quote.eligible;

  // ── "Help me decide" path — no pricing, just file list + contact form ───────
  if (S.material === 'help-me-decide') {
    renderHelpDecideQuote(eligible);
    return;
  }

  var items = eligible.map(function(f) { return Object.assign({ file: f }, calcLine(f)); });
  S.quoteItems = items;

  function grandTotal() { return +items.reduce(function(s, it) { return s + it.lineTotal; }, 0).toFixed(2); }
  function filesSummary() {
    return items.map(function(it) {
      return it.file.fileName + ' | ' + it.file.volume + ' cm³ | qty ' + it.file.qty + ' | $' + it.lineTotal.toFixed(2);
    }).join('\n');
  }

  document.getElementById('mq-quote-body').innerHTML =
    '<div class="mq-quote-meta"><strong>' + S.process + ' · ' + S.materialLabel + '</strong></div>' +
    '<div class="mq-fl-header"><span>File</span><span>Unit price</span><span>Qty</span><span>Total</span></div>' +
    '<div id="mq-lines">' + items.map(function(it, i) {
      var fileSave = it.pct > 0 ? +((it.base - it.unit) * it.file.qty).toFixed(2) : 0;
      return '<div class="mq-fl" data-idx="' + i + '">' +
        '<div><div class="mq-fl-name">' + esc(it.file.fileName) + '</div>' +
        '<div class="mq-fl-sub">' + it.file.volume + ' cm³</div>' +
        (it.pct > 0 ? '<div class="mq-fl-filesave">−' + it.pct + '% · saving $' + fileSave.toFixed(2) + '</div>' : '<div class="mq-fl-filesave"></div>') +
        '</div>' +
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
          var range  = t.max ? t.min + '–' + t.max : t.min + '+';
          var active = items.some(function(it) { return it.file.qty >= t.min && (t.max === null || it.file.qty <= t.max); });
          var tierSave = active ? items.reduce(function(s, it) { return s + (it.base - it.unit) * it.qty; }, 0) : 0;
          return '<span class="mq-discount-tier' + (active ? ' active' : '') + '"' +
            ' data-min="' + t.min + '" data-max="' + (t.max || '') + '" data-pct="' + t.pct + '">' +
            range + ' units · ' + t.pct + '% off' +
            '</span>';
        }).join('') +
      '</div>';
    })() +

    '<div class="mq-grand-row"><span>Parts Total</span><span id="mq-grand">$' + grandTotal().toFixed(2) + '</span></div>' +

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
    if (company) fd.append('company', company);
    fd.append('process',     S.process);
    fd.append('material',    S.materialLabel);
    fd.append('quote',       filesSummary());
    fd.append('parts_total', '$' + grandTotal().toFixed(2));
    if (note) fd.append('note', note);
    eligible.forEach(function(f) { if (f.originalFile) fd.append('attachment', f.originalFile, f.fileName); });

    fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
      .then(function(res) {
        return res.json()
          .catch(function() { return {}; })           // handle non-JSON responses gracefully
          .then(function(data) { return { ok: res.ok, data: data }; });
      })
      .then(function(r) {
        if (r.ok) {
          clearSession();
          var succEl = document.getElementById('mq-success');
          document.getElementById('mq-form-body').style.display = 'none';
          document.getElementById('mq-req-btn').style.display   = 'none';

          // Generate a quote reference
          var quoteRef = 'MQ-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + (Date.now() % 10000).toString().padStart(4,'0');

          // Snapshot all data for PDF generation
          window.mqPDFData = {
            ref:      quoteRef,
            name:     name,
            email:    email,
            company:  company,
            process:  S.process,
            material: S.materialLabel,
            total:    grandTotal().toFixed(2),
            note:     note,
            items:    items.map(function(it) {
              return { fileName: it.file.fileName, volume: it.file.volume,
                       qty: it.file.qty, unit: it.unit.toFixed(2),
                       pct: it.pct, lineTotal: it.lineTotal.toFixed(2) };
            })
          };

          succEl.innerHTML =
            '<div class="mq-success-header">' +
              '<div class="mq-success-check">✅</div>' +
              '<div>' +
                '<h3 class="mq-success-title">Quote request received!</h3>' +
                '<p class="mq-success-ref">Ref: <strong>' + quoteRef + '</strong></p>' +
              '</div>' +
            '</div>' +
            '<p class="mq-success-sent">A confirmation has been sent to <strong>' + email + '</strong>. We\'ll follow up within one business day.</p>' +
            '<p class="mq-success-email-note">Please allow 1–5 minutes for the confirmation email to appear in your inbox.</p>' +

            '<div class="mq-success-summary">' +
              '<div class="mq-success-meta-row">' +
                '<span><label>Process</label>' + S.process + '</span>' +
                '<span><label>Material</label>' + S.materialLabel + '</span>' +
              '</div>' +
              '<div class="mq-success-fl-head"><span>File</span><span>Qty</span><span>Unit</span><span>Total</span></div>' +
              items.map(function(it) {
                return '<div class="mq-success-fl-row">' +
                  '<span class="mq-success-fname">' + esc(it.file.fileName) + '</span>' +
                  '<span>' + it.file.qty + '</span>' +
                  '<span>$' + it.unit.toFixed(2) + '</span>' +
                  '<span>$' + it.lineTotal.toFixed(2) + (it.pct > 0 ? '<em> −' + it.pct + '%</em>' : '') + '</span>' +
                '</div>';
              }).join('') +
              '<div class="mq-success-total-row"><span>Parts Total</span><span>$' + grandTotal().toFixed(2) + '</span></div>' +
              (note ? '<div class="mq-success-note"><strong>Notes:</strong> ' + note + '</div>' : '') +
            '</div>' +

            '<button class="mq-dl-btn" id="mq-dl-btn">⬇ Download PDF Summary</button>';

          succEl.style.display = 'block';
          document.getElementById('mq-dl-btn').addEventListener('click', window.mqDownloadPDF);

          // Formspree auto-reply handles the customer confirmation email.
        } else {
          btn.disabled = false; btn.textContent = 'Request My Quote →';
          errEl.innerHTML = '<p class="mq-submit-err">' + esc(r.data.error || 'Submission failed — please try again.') + '</p>';
        }
      })
      .catch(function() {
        btn.disabled = false; btn.textContent = 'Request My Quote →';
        errEl.innerHTML = '<p class="mq-submit-err">Something went wrong — please try again or email us directly.</p>';
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
    row.querySelector('.mq-line-total').textContent = '$' + it.lineTotal.toFixed(2);
    var badge = row.querySelector('.mq-badge');
    if (pct > 0) {
      if (!badge) { badge = document.createElement('span'); badge.className = 'mq-badge'; row.querySelector('.mq-fl-qty').appendChild(badge); }
      badge.textContent = '−' + pct + '%';
    } else if (badge) { badge.remove(); }
    var saveEl = row.querySelector('.mq-fl-filesave');
    if (saveEl) {
      if (pct > 0) {
        var fs = +((it.base - unit) * val).toFixed(2);
        saveEl.textContent = '−' + pct + '% · saving $' + fs.toFixed(2);
      } else {
        saveEl.textContent = '';
      }
    }
    document.getElementById('mq-grand').textContent = '$' + grandTotal().toFixed(2);
    renderDiscountBar(items);
  }
}

// ── DISCOUNT BAR + SAVINGS ────────────────────────────────────────────────────
function renderDiscountBar(items) {
  var bar = document.getElementById('mq-discount-bar');
  if (!bar || !items) return;
  bar.querySelectorAll('.mq-discount-tier').forEach(function(el) {
    var min = +el.dataset.min;
    var max = el.dataset.max ? +el.dataset.max : Infinity;
    var pct = +el.dataset.pct;
    var active = items.some(function(it) { return it.file.qty >= min && it.file.qty <= max; });
    el.classList.toggle('active', active);
  });
}

// ── PDF DOWNLOAD ─────────────────────────────────────────────────────────────
window.mqDownloadPDF = function() {
  var btn = document.getElementById('mq-dl-btn');
  if (btn) { btn.textContent = 'Generating…'; btn.disabled = true; }

  // Step 1: ensure jsPDF is loaded, then fetch logo, then build PDF
  function start() {
    if (!window.jspdf || !window.jspdf.jsPDF) { setTimeout(start, 80); return; }
    // Step 2: load logo via canvas so jsPDF can embed it
    var logoImg = new Image();
    logoImg.crossOrigin = 'Anonymous';
    logoImg.onload = function() {
      try {
        var cv = document.createElement('canvas');
        cv.width  = logoImg.naturalWidth;
        cv.height = logoImg.naturalHeight;
        cv.getContext('2d').drawImage(logoImg, 0, 0);
        buildPDF(cv.toDataURL('image/png'), logoImg.naturalWidth, logoImg.naturalHeight);
      } catch(e) { buildPDF(null, 0, 0); }
    };
    logoImg.onerror = function() { buildPDF(null, 0, 0); };
    logoImg.src = 'https://cdn.prod.website-files.com/68dc75f5161ad85e0cd30bd2/69fe4fbbd1c90020242cf636_logo.gif';
  }

  function buildPDF(logoData, logoNatW, logoNatH) {
    var d = window.mqPDFData;
    if (!d) return;

    var doc    = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    var pageW  = 210;
    var margin = 18;
    var cW     = pageW - margin * 2;   // 174 mm usable width
    var y      = 0;

    // ── Header — logo only, no background ──────────────────────────────────
    var logoH = 0;
    if (logoData && logoNatW && logoNatH) {
      var maxLogoW = 60;
      var maxLogoH = 22;
      var aspect   = logoNatW / logoNatH;
      logoH        = Math.min(maxLogoH, maxLogoW / aspect);
      var logoW    = logoH * aspect;
      if (logoW > maxLogoW) { logoW = maxLogoW; logoH = logoW / aspect; }
      doc.addImage(logoData, 'PNG', margin, margin, logoW, logoH);
    }

    // Ref + date — right-aligned, vertically centred with logo
    var refY = margin + Math.max(logoH, 6) / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('Ref: ' + d.ref, pageW - margin, refY - 1.5, { align: 'right' });
    doc.text(new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }), pageW - margin, refY + 4.5, { align: 'right' });

    // Thin rule under header
    var ruleY = margin + Math.max(logoH, 6) + 6;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, ruleY, pageW - margin, ruleY);

    // ── Customer block ─────────────────────────────────────────────────────
    y = ruleY + 10;
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('PREPARED FOR', margin, y);
    y += 5;
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(d.name, margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(d.email, margin, y);
    if (d.company) { y += 4.5; doc.text(d.company, margin, y); }

    // ── Divider ────────────────────────────────────────────────────────────
    y += 9;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // ── Process / Material / Lead time ─────────────────────────────────────
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('QUOTE DETAILS', margin, y);
    y += 6;

    var col3 = [0, 87];
    [['Process', d.process], ['Material', d.material]].forEach(function(pair, i) {
      var x = margin + col3[i];
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(pair[0], x, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);
      doc.text(pair[1], x, y + 5);
    });
    y += 14;

    // ── File table ─────────────────────────────────────────────────────────
    var tc = [0, 88, 102, 124, 150];
    var th = 7;

    doc.setFillColor(86, 5, 145);
    doc.rect(margin, y, cW, th, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    ['File', 'Vol (cm³)', 'Qty', 'Unit Price', 'Total'].forEach(function(h, i) {
      doc.text(h, margin + tc[i] + 2, y + 4.8);
    });
    y += th;

    d.items.forEach(function(it, idx) {
      var rh = 7;
      var shade = idx % 2 === 0 ? 250 : 244;
      doc.setFillColor(shade, shade, shade);
      doc.rect(margin, y, cW, rh, 'F');
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      var fname = it.fileName.length > 42 ? it.fileName.slice(0, 39) + '…' : it.fileName;
      doc.text(fname,              margin + tc[0] + 2, y + 4.8);
      doc.text(it.volume + '',     margin + tc[1] + 2, y + 4.8);
      doc.text(it.qty + '',        margin + tc[2] + 2, y + 4.8);
      doc.text('$' + it.unit,      margin + tc[3] + 2, y + 4.8);
      doc.text('$' + it.lineTotal, margin + tc[4] + 2, y + 4.8);
      if (it.pct > 0) {
        doc.setTextColor(34, 160, 90);
        doc.setFontSize(7);
        doc.text('−' + it.pct + '%', margin + tc[4] + 2 + doc.getTextWidth('$' + it.lineTotal) + 1, y + 4.8);
      }
      y += rh;
    });

    // Total row
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageW - margin, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text('Parts Total', margin, y);
    doc.text('$' + d.total, pageW - margin, y, { align: 'right' });
    y += 10;

    // ── Notes ──────────────────────────────────────────────────────────────
    if (d.note) {
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y, pageW - margin, y);
      y += 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 120);
      doc.text('ADDITIONAL NOTES', margin, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      var lines = doc.splitTextToSize(d.note, cW);
      doc.text(lines, margin, y);
    }

    // ── Footer ─────────────────────────────────────────────────────────────
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, 278, pageW - margin, 278);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(160, 160, 160);
    doc.text('Prices based on current material rates. Estimates valid for 30 days and confirmed within 1 business day.', margin, 283);
    doc.text('mithrilplastics.com', pageW - margin, 283, { align: 'right' });

    doc.save('Mithril-Quote-' + d.ref + '.pdf');
    if (btn) { btn.textContent = '⬇ Download PDF Summary'; btn.disabled = false; }
  }

  // Lazy-load jsPDF on first click, then proceed
  if (!window.jspdf) {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js';
    s.onload = start;
    document.head.appendChild(s);
  } else {
    start();
  }
};

// ── THEME TOGGLE ──────────────────────────────────────────────────────────────
(function() {
  var mq  = document.getElementById('mq');
  var btn = document.getElementById('mq-theme-btn');
  if (!mq || !btn) return;
  // Restore saved preference — default is light (no class needed)
  if (localStorage.getItem('mq-theme') === 'dark') {
    mq.classList.add('mq-dark');
  }
  btn.addEventListener('click', function() {
    var dark = mq.classList.toggle('mq-dark');
    localStorage.setItem('mq-theme', dark ? 'dark' : 'light');
  });
}());