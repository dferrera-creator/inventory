// ══════════════════════════════════════════
// INSPECTION APP — REDESIGNED FOR SIMPLICITY
// One item at a time, visual-first, guided flow
// ══════════════════════════════════════════

// ── Emoji mapping for visual item recognition ──

const ITEM_EMOJIS = {
  'Estufa': '🔥', 'Stove': '🔥',
  'Refrigerador': '🧊', 'Refrigerator': '🧊',
  'Microondas': '📡', 'Microwave': '📡',
  'Horno': '🔥', 'Oven': '🔥',
  'Campana extractora': '💨', 'Range hood': '💨',
  'Lavavajillas': '🫧', 'Dishwasher': '🫧',
  'Fregadero': '🚰', 'Sink': '🚰',
  'Tarja': '🚰', 'Counter sink': '🚰',
  'Barra': '🍽️', 'Counter bar': '🍽️',
  'Sillas de barra': '🪑', 'Bar stools': '🪑',
  'Cafetera': '☕', 'Coffee maker': '☕',
  'Tostador': '🍞', 'Toaster': '🍞',
  'Licuadora': '🥤', 'Blender': '🥤',
  'Utensilios': '🍴', 'Utensils set': '🍴',
  'Vajilla': '🍽️', 'Dinnerware set': '🍽️',
  'Vasos': '🥃', 'Glasses set': '🥃',
  'Ollas y sartenes': '🍳', 'Pots & pans': '🍳',
  'Bote de basura': '🗑️', 'Trash can': '🗑️',
  'Sofá': '🛋️', 'Sofa': '🛋️',
  'Mesa de centro': '🪵', 'Coffee table': '🪵',
  'Televisión': '📺', 'TV': '📺',
  'Mueble de TV': '🗄️', 'TV stand': '🗄️',
  'Lámpara de piso': '💡', 'Floor lamp': '💡',
  'Cojines decorativos': '🛋️', 'Throw pillows': '🛋️',
  'Cortinas': '🪟', 'Curtains': '🪟',
  'Mesa de comedor': '🪵', 'Dining table': '🪵',
  'Sillas de comedor': '🪑', 'Dining chairs': '🪑',
  'Centro de mesa': '🌸', 'Centerpiece': '🌸',
  'Mesa exterior': '🏖️', 'Outdoor table': '🏖️',
  'Sillas exteriores': '🪑', 'Outdoor chairs': '🪑',
  'Sombrilla': '⛱️', 'Umbrella': '⛱️',
  'Macetas': '🪴', 'Planters': '🪴',
  'Cama king': '🛏️', 'King bed': '🛏️',
  'Cama queen': '🛏️', 'Queen bed': '🛏️',
  'Colchón': '🛏️', 'Mattress': '🛏️',
  'Ropa de cama': '🛌', 'Bedding set': '🛌',
  'Almohadas': '🛌', 'Pillows': '🛌',
  'Buró izquierdo': '🗄️', 'Left nightstand': '🗄️',
  'Buró derecho': '🗄️', 'Right nightstand': '🗄️',
  'Buró': '🗄️', 'Nightstand': '🗄️',
  'Lámpara de buró': '💡', 'Nightstand lamp': '💡',
  'Clóset': '🚪', 'Closet': '🚪',
  'Ganchos': '🪝', 'Hangers': '🪝',
  'Espejo': '🪞', 'Mirror': '🪞',
  'Inodoro': '🚽', 'Toilet': '🚽',
  'Lavabo': '🚰', 'Sink': '🚰',
  'Regadera': '🚿', 'Shower': '🚿',
  'Toallero': '🧺', 'Towel rack': '🧺',
  'Toallas': '🧺', 'Towels': '🧺',
  'Cortina de baño': '🪟', 'Shower curtain': '🪟',
  'Tapete de baño': '🟫', 'Bath mat': '🟫',
  'Portarrollos': '🧻', 'Toilet paper holder': '🧻',
};

// ── Room visual config ──

const ROOM_CONFIG = {
  'kitchen-living-terrace': { emoji: '🍳', name: 'Kitchen / Living / Terrace', shortName: 'Kitchen' },
  'bedrooms': { emoji: '🛏️', name: 'Bedrooms', shortName: 'Bedrooms' },
  'bathrooms': { emoji: '🚿', name: 'Bathrooms', shortName: 'Bathrooms' },
};

// ── Inspection Data Template (unchanged structure) ──

const SECTIONS = [
  {
    id: 'kitchen-living-terrace',
    name: 'Kitchen / Living Room / Terrace',
    items: [
      { area: 'Cocina', name: 'Estufa / Stove', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Refrigerador / Refrigerator', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Microondas / Microwave', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Horno / Oven', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Campana extractora / Range hood', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Lavavajillas / Dishwasher', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Fregadero / Sink', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Tarja / Counter sink', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Barra / Counter bar', type: 'fixed', qty: 1 },
      { area: 'Cocina', name: 'Sillas de barra / Bar stools', type: 'variable', qty: 3 },
      { area: 'Cocina', name: 'Cafetera / Coffee maker', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Tostador / Toaster', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Licuadora / Blender', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Utensilios / Utensils set', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Vajilla / Dinnerware set', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Vasos / Glasses set', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Ollas y sartenes / Pots & pans', type: 'variable', qty: 1 },
      { area: 'Cocina', name: 'Bote de basura / Trash can', type: 'variable', qty: 1 },
      { area: 'Sala', name: 'Sofá / Sofa', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Mesa de centro / Coffee table', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Televisión / TV', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Mueble de TV / TV stand', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Lámpara de piso / Floor lamp', type: 'variable', qty: 1 },
      { area: 'Sala', name: 'Cojines decorativos / Throw pillows', type: 'variable', qty: 4 },
      { area: 'Sala', name: 'Cortinas / Curtains', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Mesa de comedor / Dining table', type: 'fixed', qty: 1 },
      { area: 'Sala', name: 'Sillas de comedor / Dining chairs', type: 'fixed', qty: 4 },
      { area: 'Sala', name: 'Centro de mesa / Centerpiece', type: 'variable', qty: 1 },
      { area: 'Terraza', name: 'Mesa exterior / Outdoor table', type: 'fixed', qty: 1 },
      { area: 'Terraza', name: 'Sillas exteriores / Outdoor chairs', type: 'fixed', qty: 2 },
      { area: 'Terraza', name: 'Sombrilla / Umbrella', type: 'variable', qty: 1 },
      { area: 'Terraza', name: 'Macetas / Planters', type: 'variable', qty: 2 },
    ]
  },
  {
    id: 'bedrooms',
    name: 'Bedrooms',
    items: [
      { area: 'Recámara principal', name: 'Cama king / King bed', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Colchón / Mattress', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Ropa de cama / Bedding set', type: 'variable', qty: 1 },
      { area: 'Recámara principal', name: 'Almohadas / Pillows', type: 'variable', qty: 4 },
      { area: 'Recámara principal', name: 'Buró izquierdo / Left nightstand', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Buró derecho / Right nightstand', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Lámpara de buró / Nightstand lamp', type: 'variable', qty: 2 },
      { area: 'Recámara principal', name: 'Clóset / Closet', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Ganchos / Hangers', type: 'variable', qty: 10 },
      { area: 'Recámara principal', name: 'Televisión / TV', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Cortinas / Curtains', type: 'fixed', qty: 1 },
      { area: 'Recámara principal', name: 'Espejo / Mirror', type: 'fixed', qty: 1 },
      { area: 'Recámara 2', name: 'Cama queen / Queen bed', type: 'fixed', qty: 1 },
      { area: 'Recámara 2', name: 'Colchón / Mattress', type: 'fixed', qty: 1 },
      { area: 'Recámara 2', name: 'Ropa de cama / Bedding set', type: 'variable', qty: 1 },
      { area: 'Recámara 2', name: 'Almohadas / Pillows', type: 'variable', qty: 2 },
      { area: 'Recámara 2', name: 'Buró / Nightstand', type: 'fixed', qty: 1 },
      { area: 'Recámara 2', name: 'Lámpara de buró / Nightstand lamp', type: 'variable', qty: 1 },
      { area: 'Recámara 2', name: 'Clóset / Closet', type: 'fixed', qty: 1 },
      { area: 'Recámara 2', name: 'Ganchos / Hangers', type: 'variable', qty: 10 },
      { area: 'Recámara 2', name: 'Cortinas / Curtains', type: 'fixed', qty: 1 },
    ]
  },
  {
    id: 'bathrooms',
    name: 'Bathrooms',
    items: [
      { area: 'Baño principal', name: 'Inodoro / Toilet', type: 'fixed', qty: 1 },
      { area: 'Baño principal', name: 'Lavabo / Sink', type: 'fixed', qty: 1 },
      { area: 'Baño principal', name: 'Regadera / Shower', type: 'fixed', qty: 1 },
      { area: 'Baño principal', name: 'Espejo / Mirror', type: 'fixed', qty: 1 },
      { area: 'Baño principal', name: 'Toallero / Towel rack', type: 'fixed', qty: 1 },
      { area: 'Baño principal', name: 'Toallas / Towels', type: 'variable', qty: 2 },
      { area: 'Baño principal', name: 'Cortina de baño / Shower curtain', type: 'variable', qty: 1 },
      { area: 'Baño principal', name: 'Tapete de baño / Bath mat', type: 'variable', qty: 1 },
      { area: 'Baño principal', name: 'Bote de basura / Trash can', type: 'variable', qty: 1 },
      { area: 'Baño principal', name: 'Portarrollos / Toilet paper holder', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Inodoro / Toilet', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Lavabo / Sink', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Regadera / Shower', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Espejo / Mirror', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Toallero / Towel rack', type: 'fixed', qty: 1 },
      { area: 'Baño 2', name: 'Toallas / Towels', type: 'variable', qty: 2 },
      { area: 'Baño 2', name: 'Cortina de baño / Shower curtain', type: 'variable', qty: 1 },
      { area: 'Baño 2', name: 'Tapete de baño / Bath mat', type: 'variable', qty: 1 },
      { area: 'Baño 2', name: 'Bote de basura / Trash can', type: 'variable', qty: 1 },
      { area: 'Baño 2', name: 'Portarrollos / Toilet paper holder', type: 'fixed', qty: 1 },
    ]
  }
];

const STATUS_OPTIONS = [
  { value: '', label: 'Select status...' },
  { value: 'good', label: 'Good / Bueno' },
  { value: 'damaged', label: 'Damaged / Dañado' },
  { value: 'missing', label: 'Missing / Faltante' },
  { value: 'new', label: 'New / Nuevo' },
];

// ── State ──

let inspectionInfo = {};
let inspectionData = {}; // keyed by "sectionId-itemIndex"
let currentSectionIndex = 0;
let currentItemIndex = 0;

// ── Helpers ──

function getItemEmoji(name) {
  // Try matching Spanish name first, then English
  const parts = name.split(' / ');
  for (const part of parts) {
    const trimmed = part.trim();
    if (ITEM_EMOJIS[trimmed]) return ITEM_EMOJIS[trimmed];
  }
  return '📦'; // fallback
}

function getItemNames(name) {
  const parts = name.split(' / ');
  return {
    es: parts[0] ? parts[0].trim() : name,
    en: parts[1] ? parts[1].trim() : name
  };
}

function getTotalItems() {
  return SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
}

function getTotalCompleted() {
  return Object.values(inspectionData).filter(d => d.status).length;
}

function getSectionCompleted(sectionIdx) {
  const section = SECTIONS[sectionIdx];
  let count = 0;
  section.items.forEach((_, idx) => {
    const key = `${section.id}-${idx}`;
    if (inspectionData[key] && inspectionData[key].status) count++;
  });
  return count;
}

function isSectionCompleted(sectionIdx) {
  const section = SECTIONS[sectionIdx];
  return section.items.every((_, idx) => {
    const key = `${section.id}-${idx}`;
    return inspectionData[key] && inspectionData[key].status;
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Step Navigation ──

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════
// STEP 1: WELCOME / START
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
});

function startInspection() {
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value;
  const auditor = document.getElementById('auditor').value.trim();

  // Visual validation — highlight empty fields
  let valid = true;
  ['location', 'date', 'auditor'].forEach(id => {
    const group = document.getElementById(id).closest('.form-group');
    if (!document.getElementById(id).value.trim()) {
      group.classList.add('error');
      setTimeout(() => group.classList.remove('error'), 800);
      valid = false;
    }
  });

  if (!valid) {
    showToast('⚠️ Fill all fields');
    return;
  }

  inspectionInfo = { location, date, auditor };
  showStep('step-rooms');
  renderRooms();
}

// ══════════════════════════════════════════
// STEP 2: ROOM SELECT
// ══════════════════════════════════════════

function renderRooms() {
  const grid = document.getElementById('room-grid');
  const totalItems = getTotalItems();
  const totalCompleted = getTotalCompleted();

  // Update overall progress
  const pct = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
  document.getElementById('overall-bar').style.width = pct + '%';
  document.getElementById('overall-label').textContent = `${totalCompleted} / ${totalItems} items`;

  grid.innerHTML = '';

  SECTIONS.forEach((section, idx) => {
    const config = ROOM_CONFIG[section.id];
    const completed = getSectionCompleted(idx);
    const total = section.items.length;
    const isDone = completed === total;
    const isStarted = completed > 0 && !isDone;

    const card = document.createElement('div');
    card.className = 'room-card' + (isDone ? ' completed' : '') + (isStarted ? ' in-progress' : '');
    card.onclick = () => openRoom(idx);

    card.innerHTML = `
      ${isDone ? '<div class="room-card-check">✓</div>' : ''}
      <span class="room-card-emoji">${config.emoji}</span>
      <div class="room-card-name">${config.shortName}</div>
      <div class="room-card-count">${completed} / ${total}</div>
      <div class="room-card-progress">
        <div class="room-card-progress-bar" style="width: ${(completed / total) * 100}%"></div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Show "Finish All" button if all sections have at least some items done
  const allDone = SECTIONS.every((_, i) => isSectionCompleted(i));
  let finishBtn = document.getElementById('btn-finish-all');
  if (!finishBtn) {
    finishBtn = document.createElement('button');
    finishBtn.id = 'btn-finish-all';
    finishBtn.className = 'btn-finish-all' + (allDone ? '' : ' hidden');
    finishBtn.textContent = '🏆 Finish Inspection';
    finishBtn.onclick = showExport;
    grid.parentElement.appendChild(finishBtn);
  } else {
    finishBtn.className = 'btn-finish-all' + (allDone ? '' : ' hidden');
  }
}

function openRoom(sectionIdx) {
  currentSectionIndex = sectionIdx;
  // Find first incomplete item, or start from 0
  const section = SECTIONS[sectionIdx];
  let startIdx = 0;
  for (let i = 0; i < section.items.length; i++) {
    const key = `${section.id}-${i}`;
    if (!inspectionData[key] || !inspectionData[key].status) {
      startIdx = i;
      break;
    }
  }
  currentItemIndex = startIdx;
  showStep('step-item');
  renderItem();
}

// ══════════════════════════════════════════
// STEP 3: ITEM INSPECTION (ONE AT A TIME)
// ══════════════════════════════════════════

function renderItem() {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const key = `${section.id}-${currentItemIndex}`;
  const data = inspectionData[key] || {};
  const names = getItemNames(item.name);

  // Progress bar
  const pct = ((currentItemIndex + 1) / section.items.length) * 100;
  document.getElementById('item-progress-bar').style.width = pct + '%';
  document.getElementById('item-count').textContent = `${currentItemIndex + 1}/${section.items.length}`;

  // Area
  document.getElementById('item-area').textContent = item.area;

  // Item visual
  document.getElementById('item-emoji').textContent = getItemEmoji(item.name);
  document.getElementById('item-name').textContent = names.en;
  document.getElementById('item-name-es').textContent = names.es;

  // Status buttons — highlight selected
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  if (data.status) {
    const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing', 'new': '.new-item' };
    const sel = document.querySelector(`.status-btn${statusMap[data.status]}`);
    if (sel) sel.classList.add('selected');
  }

  // Quantity
  const qty = data.qty !== undefined ? data.qty : item.qty;
  document.getElementById('qty-value').textContent = qty;

  // Photos
  renderPhotos(key);

  // Notes
  const notesArea = document.getElementById('notes-area');
  const notesInput = document.getElementById('notes-input');
  notesInput.value = data.observations || '';
  notesArea.style.display = data.observations ? 'block' : 'none';

  // Update notes button style
  const notesBtn = document.querySelector('.notes-btn');
  if (data.observations) {
    notesBtn.classList.add('has-content');
  } else {
    notesBtn.classList.remove('has-content');
  }

  // Update camera button style
  const cameraBtn = document.querySelector('.camera-btn');
  if (data.photos && data.photos.length > 0) {
    cameraBtn.classList.add('has-content');
  } else {
    cameraBtn.classList.remove('has-content');
  }

  // Navigation
  document.getElementById('nav-prev').className =
    'nav-prev' + (currentItemIndex === 0 ? ' hidden' : '');

  const navNext = document.getElementById('nav-next');
  if (currentItemIndex === section.items.length - 1) {
    navNext.textContent = '✓ Done';
    navNext.className = 'nav-next finish';
  } else {
    navNext.textContent = 'Next →';
    navNext.className = 'nav-next';
  }
}

function setStatus(status) {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const key = `${section.id}-${currentItemIndex}`;

  if (!inspectionData[key]) {
    inspectionData[key] = { qty: item.qty };
  }
  inspectionData[key].status = status;

  // Visual feedback
  const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing', 'new': '.new-item' };
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  const sel = document.querySelector(`.status-btn${statusMap[status]}`);
  if (sel) {
    sel.classList.add('selected', 'just-selected');
  }

  // Brief toast feedback
  const labels = { 'good': '✅ Good', 'damaged': '🔨 Damaged', 'missing': '❌ Missing', 'new': '🆕 New' };
  showToast(labels[status]);
}

function changeQty(delta) {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const key = `${section.id}-${currentItemIndex}`;

  if (!inspectionData[key]) {
    inspectionData[key] = { qty: item.qty };
  }

  const newQty = Math.max(0, (inspectionData[key].qty !== undefined ? inspectionData[key].qty : item.qty) + delta);
  inspectionData[key].qty = newQty;
  document.getElementById('qty-value').textContent = newQty;
}

function triggerPhoto() {
  document.getElementById('photo-input').click();
}

function handlePhoto(input) {
  const file = input.files[0];
  if (!file) return;

  const section = SECTIONS[currentSectionIndex];
  const key = `${section.id}-${currentItemIndex}`;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (!inspectionData[key]) inspectionData[key] = {};
    if (!inspectionData[key].photos) inspectionData[key].photos = [];
    compressImage(e.target.result, 800, 0.7, (compressed) => {
      inspectionData[key].photos.push(compressed);
      renderPhotos(key);
      // Update camera button
      document.querySelector('.camera-btn').classList.add('has-content');
      showToast('📷 Photo added');
    });
  };
  reader.readAsDataURL(file);
  // Reset input so same file can be re-added
  input.value = '';
}

function compressImage(dataUrl, maxWidth, quality, callback) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    let w = img.width;
    let h = img.height;
    if (w > maxWidth) {
      h = (maxWidth / w) * h;
      w = maxWidth;
    }
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    callback(canvas.toDataURL('image/jpeg', quality));
  };
  img.src = dataUrl;
}

function renderPhotos(key) {
  const data = inspectionData[key] || {};
  const strip = document.getElementById('photo-strip');
  if (!data.photos || data.photos.length === 0) {
    strip.innerHTML = '';
    return;
  }
  strip.innerHTML = data.photos.map((p, i) =>
    `<div class="photo-thumb">
      <img src="${p}" alt="photo">
      <button class="remove-photo" onclick="removePhoto('${key}', ${i})">×</button>
    </div>`
  ).join('');
}

function removePhoto(key, photoIndex) {
  inspectionData[key].photos.splice(photoIndex, 1);
  renderPhotos(key);
  if (!inspectionData[key].photos.length) {
    document.querySelector('.camera-btn').classList.remove('has-content');
  }
}

function toggleNotes() {
  const notesArea = document.getElementById('notes-area');
  const isVisible = notesArea.style.display !== 'none';
  notesArea.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) {
    document.getElementById('notes-input').focus();
  }
}

function saveCurrentNotes() {
  const section = SECTIONS[currentSectionIndex];
  const key = `${section.id}-${currentItemIndex}`;
  const notes = document.getElementById('notes-input').value.trim();

  if (notes) {
    if (!inspectionData[key]) inspectionData[key] = {};
    inspectionData[key].observations = notes;
  } else if (inspectionData[key]) {
    delete inspectionData[key].observations;
  }
}

function prevItem() {
  saveCurrentNotes();
  if (currentItemIndex > 0) {
    currentItemIndex--;
    renderItem();
    window.scrollTo(0, 0);
  }
}

function nextItem() {
  saveCurrentNotes();
  const section = SECTIONS[currentSectionIndex];

  if (currentItemIndex < section.items.length - 1) {
    currentItemIndex++;
    renderItem();
    window.scrollTo(0, 0);
  } else {
    // Room complete — show celebration
    showRoomComplete();
  }
}

function backToRooms() {
  // Save notes if we're on item screen
  if (document.getElementById('step-item').classList.contains('active')) {
    saveCurrentNotes();
  }
  showStep('step-rooms');
  renderRooms();
}

// ══════════════════════════════════════════
// STEP 4: ROOM COMPLETE CELEBRATION
// ══════════════════════════════════════════

function showRoomComplete() {
  const section = SECTIONS[currentSectionIndex];
  const config = ROOM_CONFIG[section.id];

  document.getElementById('room-done-title').textContent = `${config.emoji} Room Done!`;
  document.getElementById('room-done-sub').textContent = `${config.name} completed`;

  // Stats
  const stats = { good: 0, damaged: 0, missing: 0, new: 0, none: 0 };
  section.items.forEach((_, idx) => {
    const key = `${section.id}-${idx}`;
    const data = inspectionData[key];
    if (data && data.status) {
      stats[data.status]++;
    } else {
      stats.none++;
    }
  });

  const statsEl = document.getElementById('room-done-stats');
  let statsHtml = '';
  if (stats.good) statsHtml += `<span class="stat-pill good">✅ ${stats.good} Good</span>`;
  if (stats.damaged) statsHtml += `<span class="stat-pill damaged">🔨 ${stats.damaged} Damaged</span>`;
  if (stats.missing) statsHtml += `<span class="stat-pill missing">❌ ${stats.missing} Missing</span>`;
  if (stats.new) statsHtml += `<span class="stat-pill new-item">🆕 ${stats.new} New</span>`;
  if (stats.none) statsHtml += `<span class="stat-pill" style="background:#f3f4f6;color:#888">⏭️ ${stats.none} Skipped</span>`;
  statsEl.innerHTML = statsHtml;

  showStep('step-room-done');
}

// ══════════════════════════════════════════
// STEP 5: EXPORT
// ══════════════════════════════════════════

function showExport() {
  showStep('step-export');

  const total = getTotalItems();
  const completed = getTotalCompleted();
  document.getElementById('export-summary').textContent =
    `${inspectionInfo.location} — ${completed}/${total} items`;

  // Review
  const container = document.getElementById('review-container');
  container.innerHTML = '';

  SECTIONS.forEach((section) => {
    const div = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3>${ROOM_CONFIG[section.id].emoji} ${section.name}</h3>`;

    section.items.forEach((item, idx) => {
      const key = `${section.id}-${idx}`;
      const data = inspectionData[key] || {};
      const emoji = getItemEmoji(item.name);
      const names = getItemNames(item.name);
      const statusClass = data.status || 'none';

      const photos = (data.photos || []).map(p =>
        `<img src="${p}" alt="photo">`
      ).join('');

      div.innerHTML += `
        <div class="review-item">
          <span class="review-item-emoji">${emoji}</span>
          <div class="review-item-info">
            <div class="review-item-name">${names.en}</div>
            <div class="review-item-detail">${item.area} · Qty: ${data.qty !== undefined ? data.qty : item.qty}${data.observations ? ' · ' + data.observations : ''}</div>
          </div>
          <div class="review-photos">${photos}</div>
          <div class="review-status-dot ${statusClass === 'new' ? 'new-item' : statusClass}"></div>
        </div>
      `;
    });

    container.appendChild(div);
  });
}

// ── XLSX Export ──

function exportXLSX() {
  const wb = XLSX.utils.book_new();

  SECTIONS.forEach(section => {
    const rows = [
      [`Location: ${inspectionInfo.location}`, '', `Date: ${inspectionInfo.date}`, '', `Auditor: ${inspectionInfo.auditor}`],
      [],
      ['Area', 'Item', 'Status', 'Asset Type', 'Quantity', 'Observations']
    ];

    section.items.forEach((item, idx) => {
      const key = `${section.id}-${idx}`;
      const data = inspectionData[key] || {};
      const statusLabel = STATUS_OPTIONS.find(o => o.value === data.status);

      rows.push([
        item.area,
        item.name,
        statusLabel ? statusLabel.label : '',
        item.type === 'fixed' ? 'Activo Fijo' : 'Activo Variable',
        data.qty !== undefined ? Number(data.qty) : item.qty,
        data.observations || ''
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(rows);

    ws['!cols'] = [
      { wch: 22 }, { wch: 32 }, { wch: 18 }, { wch: 16 }, { wch: 10 }, { wch: 40 }
    ];

    const sheetName = section.name.substring(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, `Inspection_${inspectionInfo.location}_${inspectionInfo.date}.xlsx`);
  showToast('📊 Excel downloaded');
}

// ── PDF Export ──

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const margin = 15;
  let y = margin;

  function checkPage(needed) {
    if (y + needed > 280) {
      doc.addPage();
      y = margin;
    }
  }

  // Title
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('Inspection & Inventory Report', margin, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Location: ${inspectionInfo.location}`, margin, y);
  doc.text(`Date: ${inspectionInfo.date}`, margin + 80, y);
  y += 6;
  doc.text(`Auditor: ${inspectionInfo.auditor}`, margin, y);
  y += 12;

  SECTIONS.forEach((section, sIdx) => {
    if (sIdx > 0) {
      doc.addPage();
      y = margin;
    }

    checkPage(14);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(section.name, margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    const colX = [margin, margin + 35, margin + 75, margin + 105, margin + 135, margin + 150];
    doc.text('Area', colX[0], y);
    doc.text('Item', colX[1], y);
    doc.text('Status', colX[2], y);
    doc.text('Type', colX[3], y);
    doc.text('Qty', colX[4], y);
    doc.text('Observations', colX[5], y);
    y += 2;
    doc.setDrawColor(100);
    doc.line(margin, y, pageW - margin, y);
    y += 4;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(7);

    section.items.forEach((item, idx) => {
      const key = `${section.id}-${idx}`;
      const data = inspectionData[key] || {};
      const statusLabel = STATUS_OPTIONS.find(o => o.value === data.status);
      const hasPhotos = data.photos && data.photos.length > 0;
      const rowHeight = hasPhotos ? 22 : 6;

      checkPage(rowHeight + 4);

      doc.text(item.area, colX[0], y);
      doc.text(item.name, colX[1], y);
      doc.text(statusLabel ? statusLabel.label : '-', colX[2], y);
      doc.text(item.type === 'fixed' ? 'Fixed' : 'Variable', colX[3], y);
      doc.text(String(data.qty !== undefined ? data.qty : item.qty), colX[4], y);

      const obs = data.observations || '';
      if (obs) {
        const lines = doc.splitTextToSize(obs, 30);
        doc.text(lines, colX[5], y);
      }

      if (hasPhotos) {
        y += 3;
        data.photos.forEach((photo, pi) => {
          if (pi < 3) {
            try {
              doc.addImage(photo, 'JPEG', colX[1] + (pi * 18), y, 16, 16);
            } catch (e) {
              // Skip if image can't be added
            }
          }
        });
        y += 18;
      }

      y += 5;
    });
  });

  doc.save(`Inspection_${inspectionInfo.location}_${inspectionInfo.date}.pdf`);
  showToast('📄 PDF downloaded');
}
