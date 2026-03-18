// ══════════════════════════════════════════
// INSPECCIÓN DE ONBOARDING
// Fuente: CHECK MTTO, INV COCINA, INV HABITACIONES, INV BAÑOS
// ══════════════════════════════════════════

// ── Datos: Checklist General (CHECK MTTO) ──

const ONBOARDING_CHECKLIST = [
  {
    category: 'BAÑOS',
    items: [
      { name: 'Azulejos / Pisos' },
      { name: 'Regadera / Tina' },
      { name: 'WC / Sanitario' },
      { name: 'Lavabo' },
      { name: 'Llave / Mezcladora' },
      { name: 'Espejo' },
      { name: 'Cortina de baño' },
      { name: 'Extractor / Ventilación' },
      { name: 'Puerta / Privacidad' },
      { name: 'Iluminación' },
    ],
  },
  {
    category: 'COCINA / COMEDOR',
    items: [
      { name: 'Azulejos / Pisos' },
      { name: 'Tarja / Lavaplatos' },
      { name: 'Llave de agua' },
      { name: 'Muebles de cocina' },
      { name: 'Parrilla / Cubierta' },
      { name: 'Iluminación' },
      { name: 'Mesa comedor' },
      { name: 'Sillas comedor' },
      { name: 'Ventilación' },
    ],
  },
  {
    category: 'DORMITORIOS',
    items: [
      { name: 'Pisos' },
      { name: 'Paredes / Plafón' },
      { name: 'Ventana / Cortinas' },
      { name: 'Closet / Armario' },
      { name: 'Puerta' },
      { name: 'Iluminación' },
      { name: 'Enchufes / Tomacorrientes' },
    ],
  },
  {
    category: 'SALA',
    items: [
      { name: 'Pisos' },
      { name: 'Paredes / Plafón' },
      { name: 'Ventana / Cortinas' },
      { name: 'Puerta de entrada' },
      { name: 'Iluminación' },
      { name: 'Enchufes / Tomacorrientes' },
    ],
  },
  {
    category: 'SERVICIOS PÚBLICOS',
    items: [
      { name: 'Agua caliente' },
      { name: 'Agua fría' },
      { name: 'Gas (si aplica)' },
      { name: 'Luz / Electricidad' },
      { name: 'Internet / WiFi' },
      { name: 'Aire acondicionado' },
    ],
  },
];

// ── Datos: Cocina (INV COCINA) ──

const ONBOARDING_COCINA = [
  {
    group: 'Electrodomésticos',
    items: [
      { name: 'Estufa / Parrilla', qty: 1 },
      { name: 'Refrigerador', qty: 1 },
      { name: 'Microondas', qty: 1 },
      { name: 'Cafetera', qty: 1 },
      { name: 'Licuadora', qty: 1 },
      { name: 'Tostadora', qty: 1 },
      { name: 'Horno eléctrico', qty: 0 },
      { name: 'Lavavajillas', qty: 0 },
    ],
  },
  {
    group: 'Accesorios',
    items: [
      { name: 'Olla grande', qty: 1 },
      { name: 'Olla mediana', qty: 2 },
      { name: 'Sartén grande', qty: 1 },
      { name: 'Sartén mediana', qty: 1 },
      { name: 'Coladera / Colador', qty: 1 },
      { name: 'Tabla para picar', qty: 1 },
      { name: 'Abrebotellas', qty: 1 },
      { name: 'Abrelatas', qty: 1 },
      { name: 'Pelador de verduras', qty: 1 },
    ],
  },
  {
    group: 'Utensilios',
    items: [
      { name: 'Cuchillo chef', qty: 1 },
      { name: 'Cuchillo mediano', qty: 1 },
      { name: 'Set de cubiertos', qty: 1 },
      { name: 'Cuchara de madera', qty: 2 },
      { name: 'Espátula', qty: 1 },
      { name: 'Cucharón', qty: 1 },
      { name: 'Pinzas', qty: 1 },
    ],
  },
  {
    group: 'Loza',
    items: [
      { name: 'Plato extendido', qty: 6 },
      { name: 'Plato hondo', qty: 6 },
      { name: 'Plato de postre', qty: 4 },
      { name: 'Tazón / Bowl', qty: 4 },
    ],
  },
  {
    group: 'Vajilla',
    items: [
      { name: 'Vaso de vidrio', qty: 6 },
      { name: 'Copa de vino', qty: 4 },
      { name: 'Taza de café', qty: 4 },
      { name: 'Jarra', qty: 1 },
    ],
  },
  {
    group: 'Muebles / Varios',
    items: [
      { name: 'Mesa de comedor', qty: 1 },
      { name: 'Sillas de comedor', qty: 4 },
      { name: 'Barra / Desayunador', qty: 0 },
      { name: 'Taburetes / Bancos', qty: 0 },
      { name: 'Puertas de muebles de cocina', qty: 1 },
      { name: 'Cajones de cocina', qty: 1 },
    ],
  },
];

// ── Plantilla: Habitación (INV HABITACIONES) ──

const ONBOARDING_HABITACION_TEMPLATE = [
  {
    group: 'Activos Fijos',
    items: [
      { name: 'Cama individual', qty: 0 },
      { name: 'Cama matrimonial / Queen', qty: 0 },
      { name: 'Cama King', qty: 0 },
      { name: 'Buró / Mesita de noche', qty: 2 },
      { name: 'Cómoda / Tocador', qty: 1 },
      { name: 'Closet / Armario', qty: 1 },
      { name: 'Silla / Sillón', qty: 1 },
      { name: 'Lámpara de buró', qty: 2 },
      { name: 'TV / Pantalla', qty: 1 },
      { name: 'Soporte TV', qty: 1 },
      { name: 'Cortinas', qty: 2 },
      { name: 'Barandal de cortinas', qty: 1 },
    ],
  },
  {
    group: 'Activos Variables',
    items: [
      { name: 'Colchón', qty: 1 },
      { name: 'Cubrecolchón / Protector', qty: 1 },
      { name: 'Sábana bajera', qty: 2 },
      { name: 'Sábana encimera', qty: 2 },
      { name: 'Funda nórdica / Cobertor', qty: 1 },
      { name: 'Almohada', qty: 2 },
      { name: 'Funda de almohada', qty: 2 },
      { name: 'Cobija extra', qty: 1 },
      { name: 'Percha / Gancho', qty: 5 },
    ],
  },
];

// ── Plantilla: Baño (INV BAÑOS) ──

const ONBOARDING_BANO_TEMPLATE = [
  {
    group: 'Activos Fijos',
    items: [
      { name: 'WC / Sanitario', qty: 1 },
      { name: 'Asiento WC', qty: 1 },
      { name: 'Regadera / Cabezal de ducha', qty: 1 },
      { name: 'Tina de baño', qty: 0 },
      { name: 'Lavabo', qty: 1 },
      { name: 'Mueble de baño', qty: 1 },
      { name: 'Espejo', qty: 1 },
      { name: 'Repisa / Estante', qty: 1 },
      { name: 'Cortina de baño', qty: 1 },
      { name: 'Barra cortina', qty: 1 },
      { name: 'Porta toallas', qty: 1 },
      { name: 'Gancho de puerta', qty: 1 },
      { name: 'Tapete de baño', qty: 1 },
    ],
  },
  {
    group: 'Activos Variables',
    items: [
      { name: 'Toalla de baño grande', qty: 2 },
      { name: 'Toalla de manos', qty: 2 },
      { name: 'Toalla de piso', qty: 1 },
      { name: 'Dispensador de jabón', qty: 1 },
      { name: 'Porta papel higiénico', qty: 1 },
      { name: 'Cesto de basura', qty: 1 },
      { name: 'Secador de cabello', qty: 1 },
    ],
  },
];

// ── Estado ──

let onboardingInfo = {};
let onboardingData = {};   // key: "sectionId__groupIdx__itemIdx" → { status, qty, notes }
let onboardingSections = [];
let isEditingOnboarding = false;
let _onboardingTimerInterval = null;
let _onboardingTimerStart = null;
let _onboardingTimerElapsed = 0;

// ── Helpers ──

function changeOnbCount(elId, delta) {
  const el = document.getElementById(elId);
  const val = Math.max(0, Math.min(10, parseInt(el.textContent) + delta));
  el.textContent = val;
}

function buildOnboardingSections(numBedrooms, numBathrooms) {
  const sections = [];

  // 1) Checklist General
  sections.push({
    id: 'checklist-general',
    name: 'Checklist General',
    type: 'checklist',
    icon: 'checklist',
    data: ONBOARDING_CHECKLIST,
  });

  // 2) Cocina
  sections.push({
    id: 'cocina',
    name: 'Cocina',
    type: 'inventory',
    icon: 'kitchen',
    data: ONBOARDING_COCINA,
  });

  // 3) Habitaciones (dynamic)
  for (let i = 1; i <= numBedrooms; i++) {
    sections.push({
      id: `habitacion-${i}`,
      name: `Habitación ${i}`,
      type: 'bedroom',
      icon: 'bed',
      data: ONBOARDING_HABITACION_TEMPLATE,
    });
  }

  // 4) Baños (dynamic)
  for (let i = 1; i <= numBathrooms; i++) {
    sections.push({
      id: `bano-${i}`,
      name: `Baño ${i}`,
      type: 'bathroom',
      icon: 'bathtub',
      data: ONBOARDING_BANO_TEMPLATE,
    });
  }

  return sections;
}

// ── Timer ──

function startOnbTimer() {
  _onboardingTimerStart = Date.now() - _onboardingTimerElapsed;
  _onboardingTimerInterval = setInterval(updateOnbTimer, 1000);
}

function stopOnbTimer() {
  clearInterval(_onboardingTimerInterval);
  _onboardingTimerInterval = null;
}

function updateOnbTimer() {
  _onboardingTimerElapsed = Date.now() - _onboardingTimerStart;
  const display = formatOnbTime(_onboardingTimerElapsed);
  const els = document.querySelectorAll('#onb-timer-display, #onb-topbar-timer');
  els.forEach(el => { if (el) el.textContent = display; });
}

function getOnbElapsed() {
  if (_onboardingTimerStart) {
    return Date.now() - _onboardingTimerStart;
  }
  return _onboardingTimerElapsed;
}

function formatOnbTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

// ── Paso 1: Inicio / Bienvenida ──

function startOnboarding() {
  const unitName = document.getElementById('onb-unit-name').value.trim();
  const date = document.getElementById('onb-date').value;
  const auditor = document.getElementById('onb-auditor').value.trim();
  const numBedrooms = parseInt(document.getElementById('onb-bedrooms-count').textContent) || 0;
  const numBathrooms = parseInt(document.getElementById('onb-bathrooms-count').textContent) || 0;

  let valid = true;
  [
    { id: 'onb-unit-name', val: unitName },
    { id: 'onb-date', val: date },
    { id: 'onb-auditor', val: auditor },
  ].forEach(({ id, val }) => {
    const el = document.getElementById(id);
    const group = el.closest('.form-group');
    if (!val) {
      group.classList.add('error');
      setTimeout(() => group.classList.remove('error'), 800);
      valid = false;
    }
  });

  if (!valid) {
    showToast('⚠️ Llena todos los campos');
    return;
  }

  if (!isEditingOnboarding) {
    onboardingData = {};
  }

  onboardingInfo = {
    unitId: onboardingInfo.unitId || ('onb-' + Date.now()),
    unitName,
    date,
    auditor,
    numBedrooms,
    numBathrooms,
  };

  onboardingSections = buildOnboardingSections(numBedrooms, numBathrooms);

  _onboardingTimerElapsed = 0;
  startOnbTimer();

  document.getElementById('onb-unit-label').textContent = unitName;
  renderOnboardingSections();
  showStep('step-onboarding-sections');
}

// ── Paso 2: Vista de secciones ──

function renderOnboardingSections() {
  const grid = document.getElementById('onb-section-grid');
  const COLORS = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const totalItems = countOnbTotalItems();
  const completedItems = countOnbCompletedItems();
  const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const overallBar = document.getElementById('onb-overall-bar');
  if (overallBar) overallBar.style.width = pct + '%';

  const overallLabel = document.getElementById('onb-overall-label');
  if (overallLabel) overallLabel.textContent = `${completedItems} / ${totalItems} ítems completados`;

  grid.innerHTML = onboardingSections.map((section, idx) => {
    const color = COLORS[idx % COLORS.length];
    const sectionTotal = countOnbSectionItems(section);
    const sectionDone = countOnbSectionCompleted(section);
    const sectionPct = sectionTotal > 0 ? Math.round((sectionDone / sectionTotal) * 100) : 0;
    const isComplete = sectionTotal > 0 && sectionDone === sectionTotal;

    return `
      <div class="room-card${isComplete ? ' completed' : ''}" onclick="openOnboardingSection('${section.id}')">
        <div class="room-card-icon" style="background:${color}22">
          <span class="material-symbols-rounded" style="color:${color}">${section.icon}</span>
        </div>
        ${isComplete ? '<span class="room-card-check material-symbols-rounded">check_circle</span>' : ''}
        <div class="room-card-name">${section.name}</div>
        <div class="room-card-count">${sectionDone}/${sectionTotal}</div>
        <div class="room-card-progress">
          <div class="room-card-progress-bar" style="width:${sectionPct}%;background:${color}"></div>
        </div>
      </div>
    `;
  }).join('');
}

function countOnbTotalItems() {
  return onboardingSections.reduce((sum, s) => sum + countOnbSectionItems(s), 0);
}

function countOnbCompletedItems() {
  return onboardingSections.reduce((sum, s) => sum + countOnbSectionCompleted(s), 0);
}

function countOnbSectionItems(section) {
  return section.data.reduce((sum, group) => sum + group.items.length, 0);
}

function countOnbSectionCompleted(section) {
  let count = 0;
  section.data.forEach((group, gIdx) => {
    group.items.forEach((item, iIdx) => {
      const key = `${section.id}__${gIdx}__${iIdx}`;
      if (onboardingData[key] && onboardingData[key].status) count++;
    });
  });
  return count;
}

// ── Paso 3: Detalle de sección ──

function openOnboardingSection(sectionId) {
  const section = onboardingSections.find(s => s.id === sectionId);
  if (!section) return;

  document.getElementById('onb-section-title').textContent = section.name;
  renderOnboardingSectionDetail(section);
  showStep('step-onboarding-section');
}

function renderOnboardingSectionDetail(section) {
  const container = document.getElementById('onb-section-items');
  const isChecklist = section.type === 'checklist';
  let html = '';

  section.data.forEach((group, gIdx) => {
    const groupLabel = isChecklist ? group.category : group.group;
    html += `<div class="onb-group-header">${groupLabel}</div>`;

    group.items.forEach((item, iIdx) => {
      const key = `${section.id}__${gIdx}__${iIdx}`;
      const d = onboardingData[key] || {};
      const status = d.status || null;
      const qty = d.qty !== undefined ? d.qty : item.qty;
      const notes = d.notes || '';
      const notesOpen = notes ? 'style="display:block"' : '';
      const statusClass = status ? `status-${status === 'new' ? 'new' : status} has-status` : '';

      const statusBtns = [
        { val: 'good', icon: 'check_circle', label: 'Bueno' },
        { val: 'damaged', icon: 'build', label: 'Dañado' },
        { val: 'missing', icon: 'cancel', label: 'Faltante' },
        { val: 'new', icon: 'new_releases', label: 'Nuevo' },
      ].map(s => {
        const cls = s.val === 'new' ? 'new-item' : s.val;
        const sel = status === s.val ? ' selected' : '';
        return `<button class="onb-status-btn ${cls}${sel}" onclick="setOnbItemStatus('${section.id}',${gIdx},${iIdx},'${s.val}')">
          <span class="material-symbols-rounded">${s.icon}</span>
          <span>${s.label}</span>
        </button>`;
      }).join('');

      const qtySection = !isChecklist ? `
        <div class="onb-qty-row">
          <button class="onb-qty-btn" onclick="changeOnbItemQty('${section.id}',${gIdx},${iIdx},-1)"><span class="material-symbols-rounded">remove</span></button>
          <span class="onb-qty-val" id="onb-qty-${section.id}__${gIdx}__${iIdx}">${qty}</span>
          <button class="onb-qty-btn" onclick="changeOnbItemQty('${section.id}',${gIdx},${iIdx},1)"><span class="material-symbols-rounded">add</span></button>
        </div>` : '';

      html += `
        <div class="onb-item-card ${statusClass}" id="onb-card-${section.id}__${gIdx}__${iIdx}">
          <div class="onb-item-name">${item.name}</div>
          <div class="onb-status-btns">${statusBtns}</div>
          <div class="onb-item-footer">
            ${qtySection}
            <button class="onb-notes-toggle" onclick="toggleOnbNotes('${section.id}__${gIdx}__${iIdx}')">
              <span class="material-symbols-rounded">edit_note</span> Notas
            </button>
          </div>
          <div class="onb-notes-area" id="onb-notes-${section.id}__${gIdx}__${iIdx}" ${notesOpen}>
            <textarea placeholder="Observaciones..." rows="2" oninput="saveOnbNotes('${section.id}',${gIdx},${iIdx},this.value)">${notes}</textarea>
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = html;
}

function setOnbItemStatus(sectionId, gIdx, iIdx, status) {
  const key = `${sectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};

  // Toggle off if already selected
  if (onboardingData[key].status === status) {
    onboardingData[key].status = null;
  } else {
    onboardingData[key].status = status;
  }

  const card = document.getElementById(`onb-card-${key}`);
  if (card) {
    card.className = 'onb-item-card';
    if (onboardingData[key].status) {
      const cls = onboardingData[key].status === 'new' ? 'status-new' : `status-${onboardingData[key].status}`;
      card.classList.add('has-status', cls);
    }

    // Update button selection state
    const btns = card.querySelectorAll('.onb-status-btn');
    btns.forEach(btn => {
      btn.classList.remove('selected');
      const btnCls = btn.classList;
      const btnVal = btnCls.contains('good') ? 'good' : btnCls.contains('damaged') ? 'damaged' : btnCls.contains('missing') ? 'missing' : 'new';
      if (btnVal === onboardingData[key].status) btn.classList.add('selected');
    });
  }
}

function changeOnbItemQty(sectionId, gIdx, iIdx, delta) {
  const key = `${sectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};
  const section = onboardingSections.find(s => s.id === sectionId);
  const templateQty = section.data[gIdx].items[iIdx].qty || 0;
  const current = onboardingData[key].qty !== undefined ? onboardingData[key].qty : templateQty;
  onboardingData[key].qty = Math.max(0, current + delta);
  const el = document.getElementById(`onb-qty-${key}`);
  if (el) el.textContent = onboardingData[key].qty;
}

function toggleOnbNotes(key) {
  const el = document.getElementById(`onb-notes-${key}`);
  if (el) el.style.display = el.style.display === 'none' || !el.style.display ? 'block' : 'none';
}

function saveOnbNotes(sectionId, gIdx, iIdx, value) {
  const key = `${sectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};
  onboardingData[key].notes = value;
}

function backToOnboardingSections() {
  renderOnboardingSections();
  showStep('step-onboarding-sections');
}

// ── Finalizar / Guardar ──

async function finishOnboarding() {
  stopOnbTimer();

  const elapsed = getOnbElapsed();
  onboardingInfo.duration = formatOnbTime(elapsed);
  onboardingInfo.durationMs = elapsed;
  onboardingInfo.type = 'onboarding';

  // Build serializable sections
  const sectionsData = onboardingSections.map(section => ({
    sectionId: section.id,
    sectionName: section.name,
    sectionType: section.type,
    groups: section.data.map((group, gIdx) => ({
      label: section.type === 'checklist' ? group.category : group.group,
      items: group.items.map((item, iIdx) => {
        const key = `${section.id}__${gIdx}__${iIdx}`;
        const d = onboardingData[key] || {};
        return {
          name: item.name,
          qty: d.qty !== undefined ? d.qty : item.qty,
          status: d.status || null,
          notes: d.notes || '',
        };
      }),
    })),
  }));

  onboardingInfo.sections = sectionsData;

  showOnboardingExport();

  if (isSupabaseReady()) {
    try {
      await saveOnboardingRecord(onboardingInfo);
      isEditingOnboarding = false;
      showToast(isEditingOnboarding ? '✅ Cambios guardados en la nube' : '☁️ Onboarding guardado en la nube');
    } catch (err) {
      console.error('Error guardando onboarding:', err);
      showToast('⚠️ No se pudo guardar en la nube');
    }
  } else {
    showToast('ℹ️ Configura Supabase para guardar en la nube');
  }
}

function showOnboardingExport() {
  showStep('step-export');

  document.getElementById('export-icon').textContent = 'home_work';
  document.getElementById('export-title').textContent = '¡Onboarding Listo!';

  const totalItems = countOnbTotalItems();
  const completedItems = countOnbCompletedItems();
  document.getElementById('export-summary').textContent =
    `${onboardingInfo.unitName} — ${completedItems}/${totalItems} ítems`;

  const timerFinal = document.getElementById('timer-final');
  if (onboardingInfo.duration) {
    timerFinal.innerHTML = `<span class="material-symbols-rounded">timer</span> Tiempo total: ${onboardingInfo.duration}`;
  }

  // Render review
  const container = document.getElementById('review-container');
  container.innerHTML = '';

  const COLORS = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  onboardingInfo.sections.forEach((section, sIdx) => {
    const color = COLORS[sIdx % COLORS.length];
    const div = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3><span class="material-symbols-rounded" style="color:${color}">${onboardingSections[sIdx] ? onboardingSections[sIdx].icon : 'inventory_2'}</span> ${section.sectionName}</h3>`;

    section.groups.forEach(group => {
      div.innerHTML += `<div style="font-size:0.75rem;font-weight:700;color:#059669;text-transform:uppercase;padding:6px 0 2px;letter-spacing:0.04em">${group.label}</div>`;
      group.items.forEach(item => {
        if (!item.status && !item.notes) return; // skip blank items
        const statusClass = item.status || 'none';
        const statusMap = { good: 'good', damaged: 'damaged', missing: 'missing', new: 'new-item', none: '' };
        div.innerHTML += `
          <div class="review-item">
            <span class="material-symbols-rounded review-item-icon">inventory_2</span>
            <div class="review-item-info">
              <div class="review-item-name">${item.name}</div>
              <div class="review-item-detail">${section.sectionType !== 'checklist' ? `Cant: ${item.qty}` : ''}${item.notes ? ' · ' + item.notes : ''}</div>
            </div>
            <div class="review-status-dot ${statusMap[statusClass] || ''}"></div>
          </div>
        `;
      });
    });

    if (div.querySelectorAll('.review-item').length > 0) {
      container.appendChild(div);
    }
  });

  checkShareSupport();
}

// ── Editar onboarding existente desde histórico ──

async function editOnboardingFromHistorico(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) { showToast('❌ No encontrado'); return; }

    onboardingInfo = {
      unitId: doc.unitId,
      unitName: doc.unitName,
      date: doc.date,
      auditor: doc.auditor,
      numBedrooms: doc.numBedrooms || 1,
      numBathrooms: doc.numBathrooms || 1,
    };

    // Restore saved data into onboardingData
    onboardingData = {};
    onboardingSections = buildOnboardingSections(onboardingInfo.numBedrooms, onboardingInfo.numBathrooms);

    if (doc.sections) {
      doc.sections.forEach(savedSection => {
        const section = onboardingSections.find(s => s.id === savedSection.sectionId);
        if (!section) return;
        savedSection.groups.forEach((savedGroup, gIdx) => {
          if (!section.data[gIdx]) return;
          savedGroup.items.forEach((savedItem, iIdx) => {
            const key = `${savedSection.sectionId}__${gIdx}__${iIdx}`;
            onboardingData[key] = {
              status: savedItem.status || null,
              qty: savedItem.qty,
              notes: savedItem.notes || '',
            };
          });
        });
      });
    }

    isEditingOnboarding = true;

    // Pre-fill form
    document.getElementById('onb-unit-name').value = doc.unitName;
    document.getElementById('onb-date').value = doc.date || '';
    document.getElementById('onb-auditor').value = doc.auditor || '';
    document.getElementById('onb-bedrooms-count').textContent = onboardingInfo.numBedrooms;
    document.getElementById('onb-bathrooms-count').textContent = onboardingInfo.numBathrooms;

    showStep('step-onboarding-welcome');
    showToast(`✏️ Editando onboarding de ${doc.unitName}`);
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar onboarding');
  }
}

// ── Ver onboarding desde histórico (solo lectura) ──

async function viewOnboardingRecord(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) { showToast('❌ No encontrado'); return; }

    onboardingInfo = {
      unitId: doc.unitId,
      unitName: doc.unitName,
      date: doc.date,
      auditor: doc.auditor,
      duration: doc.duration,
      numBedrooms: doc.numBedrooms || 1,
      numBathrooms: doc.numBathrooms || 1,
      sections: doc.sections || [],
    };

    onboardingSections = buildOnboardingSections(onboardingInfo.numBedrooms, onboardingInfo.numBathrooms);

    // Restore data for display
    onboardingData = {};
    if (doc.sections) {
      doc.sections.forEach(savedSection => {
        const section = onboardingSections.find(s => s.id === savedSection.sectionId);
        if (!section) return;
        savedSection.groups.forEach((savedGroup, gIdx) => {
          savedGroup.items.forEach((savedItem, iIdx) => {
            const key = `${savedSection.sectionId}__${gIdx}__${iIdx}`;
            onboardingData[key] = {
              status: savedItem.status || null,
              qty: savedItem.qty,
              notes: savedItem.notes || '',
            };
          });
        });
      });
    }

    showOnboardingExport();
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar onboarding');
  }
}
