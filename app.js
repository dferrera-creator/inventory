// ══════════════════════════════════════════
// INSPECCIÓN — APP REDISEÑADA
// Iconos Material Symbols, interfaz en español,
// cronómetro, Web Share API
// ══════════════════════════════════════════

// ── Mapeo de iconos Material Symbols por artículo ──

const ITEM_ICONS = {
  'Estufa': 'local_fire_department',
  'Stove': 'local_fire_department',
  'Refrigerador': 'kitchen',
  'Refrigerator': 'kitchen',
  'Microondas': 'microwave',
  'Microwave': 'microwave',
  'Horno': 'oven_gen',
  'Oven': 'oven_gen',
  'Campana extractora': 'air',
  'Range hood': 'air',
  'Lavavajillas': 'dishwasher_gen',
  'Dishwasher': 'dishwasher_gen',
  'Fregadero': 'water_drop',
  'Sink': 'water_drop',
  'Tarja': 'countertops',
  'Counter sink': 'countertops',
  'Barra': 'countertops',
  'Counter bar': 'countertops',
  'Sillas de barra': 'chair',
  'Bar stools': 'chair',
  'Cafetera': 'coffee',
  'Coffee maker': 'coffee',
  'Tostador': 'breakfast_dining',
  'Toaster': 'breakfast_dining',
  'Licuadora': 'blender',
  'Blender': 'blender',
  'Utensilios': 'flatware',
  'Utensils set': 'flatware',
  'Vajilla': 'dining',
  'Dinnerware set': 'dining',
  'Vasos': 'local_bar',
  'Glasses set': 'local_bar',
  'Ollas y sartenes': 'skillet',
  'Pots & pans': 'skillet',
  'Bote de basura': 'delete',
  'Trash can': 'delete',
  'Sofá': 'weekend',
  'Sofa': 'weekend',
  'Mesa de centro': 'table',
  'Coffee table': 'table',
  'Televisión': 'tv',
  'TV': 'tv',
  'Mueble de TV': 'living',
  'TV stand': 'living',
  'Lámpara de piso': 'floor_lamp',
  'Floor lamp': 'floor_lamp',
  'Cojines decorativos': 'pillows',
  'Throw pillows': 'pillows',
  'Cortinas': 'curtains',
  'Curtains': 'curtains',
  'Mesa de comedor': 'table_restaurant',
  'Dining table': 'table_restaurant',
  'Sillas de comedor': 'chair',
  'Dining chairs': 'chair',
  'Centro de mesa': 'local_florist',
  'Centerpiece': 'local_florist',
  'Mesa exterior': 'deck',
  'Outdoor table': 'deck',
  'Sillas exteriores': 'chair',
  'Outdoor chairs': 'chair',
  'Sombrilla': 'beach_access',
  'Umbrella': 'beach_access',
  'Macetas': 'potted_plant',
  'Planters': 'potted_plant',
  'Cama king': 'king_bed',
  'King bed': 'king_bed',
  'Cama queen': 'queen_bed',
  'Queen bed': 'queen_bed',
  'Colchón': 'bed',
  'Mattress': 'bed',
  'Ropa de cama': 'bedroom_parent',
  'Bedding set': 'bedroom_parent',
  'Almohadas': 'pillows',
  'Pillows': 'pillows',
  'Buró izquierdo': 'nightstand',
  'Left nightstand': 'nightstand',
  'Buró derecho': 'nightstand',
  'Right nightstand': 'nightstand',
  'Buró': 'nightstand',
  'Nightstand': 'nightstand',
  'Lámpara de buró': 'table_lamp',
  'Nightstand lamp': 'table_lamp',
  'Clóset': 'door_sliding',
  'Closet': 'door_sliding',
  'Ganchos': 'checkroom',
  'Hangers': 'checkroom',
  'Espejo': 'window',
  'Mirror': 'window',
  'Inodoro': 'bathroom',
  'Toilet': 'bathroom',
  'Lavabo': 'wash',
  'Regadera': 'shower',
  'Shower': 'shower',
  'Toallero': 'dry',
  'Towel rack': 'dry',
  'Toallas': 'dry_cleaning',
  'Towels': 'dry_cleaning',
  'Cortina de baño': 'curtains',
  'Shower curtain': 'curtains',
  'Tapete de baño': 'grid_on',
  'Bath mat': 'grid_on',
  'Portarrollos': 'paper_roll',
  'Toilet paper holder': 'paper_roll',
};

// ── Configuración visual de cuartos ──

const ROOM_CONFIG = {
  'kitchen-living-terrace': { icon: 'cooking', name: 'Cocina / Sala / Terraza', shortName: 'Cocina / Sala' },
  'bedrooms': { icon: 'bed', name: 'Recámaras', shortName: 'Recámaras' },
  'bathrooms': { icon: 'shower', name: 'Baños', shortName: 'Baños' },
};

// ── Colores por categoría de cuarto ──

const ROOM_COLORS = {
  'kitchen-living-terrace': '#f59e0b',
  'bedrooms': '#8b5cf6',
  'bathrooms': '#06b6d4',
};

// ── Plantilla de datos de inspección ──

const SECTIONS = [
  {
    id: 'kitchen-living-terrace',
    name: 'Cocina / Sala / Terraza',
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
    name: 'Recámaras',
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
    name: 'Baños',
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
  { value: '', label: 'Seleccionar...' },
  { value: 'good', label: 'Bueno / Good' },
  { value: 'damaged', label: 'Dañado / Damaged' },
  { value: 'missing', label: 'Faltante / Missing' },
  { value: 'new', label: 'Nuevo / New' },
];

// ── Estado ──

let inspectionInfo = {};
let inspectionData = {}; // clave: "sectionId-itemIndex"
let currentSectionIndex = 0;
let currentItemIndex = 0;

// ── Cronómetro ──

let timerInterval = null;
let timerStartTime = null;
let timerElapsed = 0; // milisegundos

function startTimer() {
  timerStartTime = Date.now();
  timerElapsed = 0;
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (timerStartTime) {
    timerElapsed = Date.now() - timerStartTime;
  }
}

function updateTimerDisplay() {
  if (!timerStartTime) return;
  const elapsed = Date.now() - timerStartTime;
  const formatted = formatTime(elapsed);

  const display = document.getElementById('timer-display');
  if (display) display.textContent = formatted;

  const topbar = document.getElementById('topbar-timer');
  if (topbar) topbar.textContent = formatted;
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getElapsedTime() {
  if (timerStartTime) {
    return Date.now() - timerStartTime;
  }
  return timerElapsed;
}

// ── Helpers ──

function getItemIcon(name) {
  const parts = name.split(' / ');
  for (const part of parts) {
    const trimmed = part.trim();
    if (ITEM_ICONS[trimmed]) return ITEM_ICONS[trimmed];
  }
  return 'inventory_2'; // fallback icon
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

// ── Navegación de pasos ──

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════
// PASO 1: BIENVENIDA / INICIAR
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
  // Detectar soporte de Web Share API
  checkShareSupport();
});

function checkShareSupport() {
  const shareBtn = document.getElementById('btn-share');
  if (shareBtn && navigator.share && navigator.canShare) {
    shareBtn.style.display = '';
  }
}

function startInspection() {
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value;
  const auditor = document.getElementById('auditor').value.trim();

  // Validación visual — resaltar campos vacíos
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
    showToast('⚠️ Llena todos los campos');
    return;
  }

  inspectionInfo = { location, date, auditor };
  startTimer();
  showStep('step-rooms');
  renderRooms();
}

// ══════════════════════════════════════════
// PASO 2: SELECCIÓN DE CUARTO
// ══════════════════════════════════════════

function renderRooms() {
  const grid = document.getElementById('room-grid');
  const totalItems = getTotalItems();
  const totalCompleted = getTotalCompleted();

  // Progreso general
  const pct = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
  document.getElementById('overall-bar').style.width = pct + '%';
  document.getElementById('overall-label').textContent = `${totalCompleted} / ${totalItems} artículos`;

  grid.innerHTML = '';

  SECTIONS.forEach((section, idx) => {
    const config = ROOM_CONFIG[section.id];
    const color = ROOM_COLORS[section.id];
    const completed = getSectionCompleted(idx);
    const total = section.items.length;
    const isDone = completed === total;
    const isStarted = completed > 0 && !isDone;

    const card = document.createElement('div');
    card.className = 'room-card' + (isDone ? ' completed' : '') + (isStarted ? ' in-progress' : '');
    card.onclick = () => openRoom(idx);

    card.innerHTML = `
      ${isDone ? '<div class="room-card-check"><span class="material-symbols-rounded">check</span></div>' : ''}
      <div class="room-card-icon" style="background: ${color}20; color: ${color}">
        <span class="material-symbols-rounded">${config.icon}</span>
      </div>
      <div class="room-card-name">${config.shortName}</div>
      <div class="room-card-count">${completed} / ${total}</div>
      <div class="room-card-progress">
        <div class="room-card-progress-bar" style="width: ${(completed / total) * 100}%; background: ${color}"></div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Botón "Terminar" si todas las secciones están completas
  const allDone = SECTIONS.every((_, i) => isSectionCompleted(i));
  let finishBtn = document.getElementById('btn-finish-all');
  if (!finishBtn) {
    finishBtn = document.createElement('button');
    finishBtn.id = 'btn-finish-all';
    finishBtn.className = 'btn-finish-all' + (allDone ? '' : ' hidden');
    finishBtn.innerHTML = '<span class="material-symbols-rounded">emoji_events</span> Terminar Inspección';
    finishBtn.onclick = showExport;
    grid.parentElement.appendChild(finishBtn);
  } else {
    finishBtn.className = 'btn-finish-all' + (allDone ? '' : ' hidden');
  }
}

function openRoom(sectionIdx) {
  currentSectionIndex = sectionIdx;
  // Encontrar primer artículo incompleto
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
// PASO 3: INSPECCIÓN DE ARTÍCULO (UNO A LA VEZ)
// ══════════════════════════════════════════

function renderItem() {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const key = `${section.id}-${currentItemIndex}`;
  const data = inspectionData[key] || {};
  const names = getItemNames(item.name);
  const color = ROOM_COLORS[section.id];

  // Barra de progreso
  const pct = ((currentItemIndex + 1) / section.items.length) * 100;
  document.getElementById('item-progress-bar').style.width = pct + '%';
  document.getElementById('item-count').textContent = `${currentItemIndex + 1}/${section.items.length}`;

  // Área
  document.getElementById('item-area').textContent = item.area;

  // Icono y nombre del artículo
  const iconName = getItemIcon(item.name);
  document.getElementById('item-icon').textContent = iconName;
  document.getElementById('item-icon-wrap').style.background = color + '18';
  document.getElementById('item-icon-wrap').style.color = color;
  document.getElementById('item-name').textContent = names.es;
  document.getElementById('item-name-en').textContent = names.en;

  // Botones de estado — resaltar seleccionado
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  if (data.status) {
    const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing', 'new': '.new-item' };
    const sel = document.querySelector(`.status-btn${statusMap[data.status]}`);
    if (sel) sel.classList.add('selected');
  }

  // Cantidad
  const qty = data.qty !== undefined ? data.qty : item.qty;
  document.getElementById('qty-value').textContent = qty;

  // Fotos
  renderPhotos(key);

  // Notas
  const notesArea = document.getElementById('notes-area');
  const notesInput = document.getElementById('notes-input');
  notesInput.value = data.observations || '';
  notesArea.style.display = data.observations ? 'block' : 'none';

  // Estilo del botón de notas
  const notesBtn = document.querySelector('.notes-btn');
  if (data.observations) {
    notesBtn.classList.add('has-content');
  } else {
    notesBtn.classList.remove('has-content');
  }

  // Estilo del botón de cámara
  const cameraBtn = document.querySelector('.camera-btn');
  if (data.photos && data.photos.length > 0) {
    cameraBtn.classList.add('has-content');
  } else {
    cameraBtn.classList.remove('has-content');
  }

  // Navegación
  document.getElementById('nav-prev').className =
    'nav-prev' + (currentItemIndex === 0 ? ' hidden' : '');

  const navNext = document.getElementById('nav-next');
  if (currentItemIndex === section.items.length - 1) {
    navNext.innerHTML = '<span class="material-symbols-rounded">check</span> Listo';
    navNext.className = 'nav-next finish';
  } else {
    navNext.innerHTML = 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';
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

  // Retroalimentación visual
  const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing', 'new': '.new-item' };
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  const sel = document.querySelector(`.status-btn${statusMap[status]}`);
  if (sel) {
    sel.classList.add('selected', 'just-selected');
  }

  // Mensaje toast
  const labels = { 'good': '✅ Bueno', 'damaged': '🔨 Dañado', 'missing': '❌ Faltante', 'new': '🆕 Nuevo' };
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
      document.querySelector('.camera-btn').classList.add('has-content');
      showToast('📷 Foto agregada');
    });
  };
  reader.readAsDataURL(file);
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
      <img src="${p}" alt="foto">
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
    showRoomComplete();
  }
}

function backToRooms() {
  if (document.getElementById('step-item').classList.contains('active')) {
    saveCurrentNotes();
  }
  showStep('step-rooms');
  renderRooms();
}

// ══════════════════════════════════════════
// PASO 4: CUARTO COMPLETADO
// ══════════════════════════════════════════

function showRoomComplete() {
  const section = SECTIONS[currentSectionIndex];
  const config = ROOM_CONFIG[section.id];

  document.getElementById('room-done-title').textContent = '¡Cuarto Listo!';
  document.getElementById('room-done-sub').textContent = `${config.name} completado`;

  // Estadísticas
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
  if (stats.good) statsHtml += `<span class="stat-pill good">✅ ${stats.good} Bueno</span>`;
  if (stats.damaged) statsHtml += `<span class="stat-pill damaged">🔨 ${stats.damaged} Dañado</span>`;
  if (stats.missing) statsHtml += `<span class="stat-pill missing">❌ ${stats.missing} Faltante</span>`;
  if (stats.new) statsHtml += `<span class="stat-pill new-item">🆕 ${stats.new} Nuevo</span>`;
  if (stats.none) statsHtml += `<span class="stat-pill" style="background:#f3f4f6;color:#888">⏭️ ${stats.none} Sin revisar</span>`;
  statsEl.innerHTML = statsHtml;

  showStep('step-room-done');
}

// ══════════════════════════════════════════
// PASO 5: EXPORTAR
// ══════════════════════════════════════════

function showExport() {
  stopTimer();
  showStep('step-export');

  const total = getTotalItems();
  const completed = getTotalCompleted();
  document.getElementById('export-summary').textContent =
    `${inspectionInfo.location} — ${completed}/${total} artículos`;

  // Mostrar tiempo total
  const timerFinal = document.getElementById('timer-final');
  const elapsed = getElapsedTime();
  if (elapsed > 0) {
    timerFinal.innerHTML = `<span class="material-symbols-rounded">timer</span> Tiempo total: ${formatTime(elapsed)}`;
    inspectionInfo.duration = formatTime(elapsed);
    inspectionInfo.durationMs = elapsed;
  }

  // Revisión
  const container = document.getElementById('review-container');
  container.innerHTML = '';

  SECTIONS.forEach((section) => {
    const div = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3><span class="material-symbols-rounded">${ROOM_CONFIG[section.id].icon}</span> ${section.name}</h3>`;

    section.items.forEach((item, idx) => {
      const key = `${section.id}-${idx}`;
      const data = inspectionData[key] || {};
      const iconName = getItemIcon(item.name);
      const names = getItemNames(item.name);
      const statusClass = data.status || 'none';

      const photos = (data.photos || []).map(p =>
        `<img src="${p}" alt="foto">`
      ).join('');

      div.innerHTML += `
        <div class="review-item">
          <span class="material-symbols-rounded review-item-icon">${iconName}</span>
          <div class="review-item-info">
            <div class="review-item-name">${names.es}</div>
            <div class="review-item-detail">${item.area} · Cant: ${data.qty !== undefined ? data.qty : item.qty}${data.observations ? ' · ' + data.observations : ''}</div>
          </div>
          <div class="review-photos">${photos}</div>
          <div class="review-status-dot ${statusClass === 'new' ? 'new-item' : statusClass}"></div>
        </div>
      `;
    });

    container.appendChild(div);
  });

  // Verificar soporte de compartir
  checkShareSupport();
}

// ══════════════════════════════════════════
// WEB SHARE API
// ══════════════════════════════════════════

async function shareFiles() {
  try {
    showToast('⏳ Preparando archivos...');

    // Generar PDF como blob
    const pdfBlob = generatePDFBlob();
    const fileName = `Inspeccion_${inspectionInfo.location}_${inspectionInfo.date}.pdf`;
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

    const shareData = {
      title: `Inspección - ${inspectionInfo.location}`,
      text: `Reporte de inspección: ${inspectionInfo.location} (${inspectionInfo.date})`,
      files: [pdfFile],
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      showToast('✅ Compartido');
    } else {
      // Fallback: descargar
      exportPDF();
      showToast('📄 Descargado (compartir no disponible)');
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      // El usuario canceló — no es error
      exportPDF();
      showToast('📄 PDF descargado');
    }
  }
}

function generatePDFBlob() {
  const { jsPDF } = window.jspdf;
  const doc = buildPDF(jsPDF);
  return doc.output('blob');
}

// ── Construir PDF (reutilizado para descargar y compartir) ──

function buildPDF(jsPDF) {
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

  // Título
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('Reporte de Inspección e Inventario', margin, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Ubicación: ${inspectionInfo.location}`, margin, y);
  doc.text(`Fecha: ${inspectionInfo.date}`, margin + 80, y);
  y += 6;
  doc.text(`Inspector: ${inspectionInfo.auditor}`, margin, y);
  if (inspectionInfo.duration) {
    doc.text(`Duración: ${inspectionInfo.duration}`, margin + 80, y);
  }
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
    doc.text('Área', colX[0], y);
    doc.text('Artículo', colX[1], y);
    doc.text('Estado', colX[2], y);
    doc.text('Tipo', colX[3], y);
    doc.text('Cant', colX[4], y);
    doc.text('Observaciones', colX[5], y);
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
      doc.text(item.type === 'fixed' ? 'Activo Fijo' : 'Activo Variable', colX[3], y);
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
              // Omitir si la imagen no se puede agregar
            }
          }
        });
        y += 18;
      }

      y += 5;
    });
  });

  return doc;
}

// ── Exportar XLSX ──

function exportXLSX() {
  const wb = XLSX.utils.book_new();

  SECTIONS.forEach(section => {
    const rows = [
      [`Ubicación: ${inspectionInfo.location}`, '', `Fecha: ${inspectionInfo.date}`, '', `Inspector: ${inspectionInfo.auditor}`],
      inspectionInfo.duration ? [`Duración: ${inspectionInfo.duration}`] : [],
      [],
      ['Área', 'Artículo', 'Estado', 'Tipo de Activo', 'Cantidad', 'Observaciones']
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

  XLSX.writeFile(wb, `Inspeccion_${inspectionInfo.location}_${inspectionInfo.date}.xlsx`);
  showToast('📊 Excel descargado');
}

// ── Exportar PDF ──

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = buildPDF(jsPDF);
  doc.save(`Inspeccion_${inspectionInfo.location}_${inspectionInfo.date}.pdf`);
  showToast('📄 PDF descargado');
}
