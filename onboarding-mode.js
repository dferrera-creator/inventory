// ══════════════════════════════════════════
// INSPECCIÓN DE ONBOARDING
// Fuente: CHECK MTTO, INV COCINA, INV HABITACIONES, INV BAÑOS
// ══════════════════════════════════════════

// ── Datos: Checklist General (CHECK MTTO) ──

const ONBOARDING_CHECKLIST = [
  {
    category: 'BAÑOS',
    items: [
      { name: 'Azulejos / Pisos',        hint: 'Buscar grietas, manchas, piezas sueltas o desprendidas' },
      { name: 'Regadera / Tina',         hint: 'Verificar presión, temperatura y desagüe sin obstrucciones' },
      { name: 'WC / Sanitario',          hint: 'Comprobar funcionamiento, flapper, cadena y sello de base' },
      { name: 'Lavabo',                  hint: 'Revisar desagüe, sello y ausencia de manchas o fisuras' },
      { name: 'Llave / Mezcladora',      hint: 'Sin goteo, flujo correcto de agua fría y caliente' },
      { name: 'Espejo',                  hint: 'Sin manchas, rayaduras ni desprendimiento del azogue' },
      { name: 'Cortina de baño',         hint: 'Presencia, limpieza y funcionamiento de argollas/barra' },
      { name: 'Extractor / Ventilación', hint: 'Encender y verificar que extrae aire correctamente' },
      { name: 'Puerta / Privacidad',     hint: 'Chapa, bisagras y cierre correcto de la puerta' },
      { name: 'Iluminación',             hint: 'Focos funcionando, interruptor y conexión sin daños' },
    ],
  },
  {
    category: 'COCINA / COMEDOR',
    items: [
      { name: 'Azulejos / Pisos',        hint: 'Revisar grietas, manchas o piezas sueltas en muros y piso' },
      { name: 'Tarja / Lavaplatos',      hint: 'Desagüe libre, sin fugas bajo el mueble y sin rayaduras' },
      { name: 'Llave de agua',           hint: 'Sin goteo, buena presión en ambas temperaturas' },
      { name: 'Muebles de cocina',       hint: 'Puertas, cajones, bisagras y acabados en buen estado' },
      { name: 'Parrilla / Cubierta',     hint: 'Superficie limpia, sin quemaduras ni raspaduras graves' },
      { name: 'Iluminación',             hint: 'Todos los focos encendidos y plafón sin daños' },
      { name: 'Mesa comedor',            hint: 'Sin golpes ni rayaduras visibles en la superficie' },
      { name: 'Sillas comedor',          hint: 'Todas presentes, sin tambaleo, tapizado limpio y sin rasgones' },
      { name: 'Ventilación',             hint: 'Ventana o rejilla funcional; revisar campana extractora si aplica' },
    ],
  },
  {
    category: 'DORMITORIOS',
    items: [
      { name: 'Pisos',                   hint: 'Sin grietas, manchas de humedad o piezas sueltas' },
      { name: 'Paredes / Plafón',        hint: 'Sin humedad, despostillados ni manchas visibles' },
      { name: 'Ventana / Cortinas',      hint: 'Vidrio íntegro, cortinas limpias y mecanismo funcional' },
      { name: 'Closet / Armario',        hint: 'Puertas, pistas y bisagras en buen estado, sin malos olores' },
      { name: 'Puerta',                  hint: 'Chapa, seguro y bisagras funcionando correctamente' },
      { name: 'Iluminación',             hint: 'Focos y dimmer/interruptor funcionando' },
      { name: 'Enchufes / Tomacorrientes', hint: 'Sin daños visibles; probar con cargador de ser posible' },
    ],
  },
  {
    category: 'SALA',
    items: [
      { name: 'Pisos',                   hint: 'Sin grietas, manchas de humedad ni irregularidades' },
      { name: 'Paredes / Plafón',        hint: 'Sin humedad, manchas, despostillados ni grietas' },
      { name: 'Ventana / Cortinas',      hint: 'Vidrio íntegro y cortinas/persianas sin daños' },
      { name: 'Puerta de entrada',       hint: 'Chapa, cerrojo, bisagras y marco en perfecto estado' },
      { name: 'Iluminación',             hint: 'Lámparas, focos e interruptores funcionando' },
      { name: 'Enchufes / Tomacorrientes', hint: 'Tomacorrientes sin daños; verificar funcionen' },
    ],
  },
  {
    category: 'SERVICIOS PÚBLICOS',
    items: [
      { name: 'Agua caliente',           hint: 'Abrir llave caliente en baño y cocina; esperar menos de 2 min' },
      { name: 'Agua fría',               hint: 'Buena presión y sin coloración ni mal olor' },
      { name: 'Gas (si aplica)',         hint: 'Sin olor a fuga; llave de paso accesible y etiquetada' },
      { name: 'Luz / Electricidad',      hint: 'Tablero de breakers completo y sin fallos al encender todo' },
      { name: 'Internet / WiFi',         hint: 'Router presente, señal activa y credenciales disponibles' },
      { name: 'Aire acondicionado',      hint: 'Encender y verificar frío/calor, filtros y control remoto' },
    ],
  },
];

// ── Datos: Cocina (INV COCINA) ──

const ONBOARDING_COCINA = [
  {
    group: 'Electrodomésticos',
    items: [
      { name: 'Estufa / Parrilla',        qty: 1, hint: 'Encender todos los quemadores; revisar parrillas y perillas' },
      { name: 'Refrigerador',             qty: 1, hint: 'Temperatura fría, empaque de puerta íntegro, sin malos olores' },
      { name: 'Microondas',               qty: 1, hint: 'Encender, girar plato interior y verificar puerta' },
      { name: 'Cafetera',                 qty: 1, hint: 'Probar encendido; jarra y filtro presentes' },
      { name: 'Licuadora',                qty: 1, hint: 'Vaso, tapa y cuchillas en buen estado; probar motor' },
      { name: 'Tostadora',                qty: 1, hint: 'Probar funcionamiento y estado de las resistencias' },
      { name: 'Horno eléctrico',          qty: 0, hint: 'Revisar resistencias, puerta y termostato' },
      { name: 'Lavavajillas',             qty: 0, hint: 'Verificar filtro, aspersor y cierre de puerta' },
    ],
  },
  {
    group: 'Accesorios',
    items: [
      { name: 'Olla grande',              qty: 1, hint: 'Sin abolladuras internas, tapa y maneral firme' },
      { name: 'Olla mediana',             qty: 2, hint: 'Sin abolladuras internas, tapa y maneral firme' },
      { name: 'Sartén grande',            qty: 1, hint: 'Antiadherente sin rayaduras profundas, maneral firme' },
      { name: 'Sartén mediana',           qty: 1, hint: 'Antiadherente sin rayaduras profundas, maneral firme' },
      { name: 'Coladera / Colador',       qty: 1, hint: 'Sin deformaciones y malla completa' },
      { name: 'Tabla para picar',         qty: 1, hint: 'Limpia, sin grietas profundas ni malos olores' },
      { name: 'Abrebotellas',             qty: 1, hint: 'Funcional y sin oxido' },
      { name: 'Abrelatas',                qty: 1, hint: 'Funcional, sin óxido ni filos peligrosos' },
      { name: 'Pelador de verduras',      qty: 1, hint: 'Filo correcto y sin deformaciones' },
    ],
  },
  {
    group: 'Utensilios',
    items: [
      { name: 'Cuchillo chef',            qty: 1, hint: 'Filo adecuado, mango firme y sin fisuras' },
      { name: 'Cuchillo mediano',         qty: 1, hint: 'Filo adecuado y mango sin daños' },
      { name: 'Set de cubiertos',         qty: 1, hint: 'Juego completo (cuchillo, tenedor, cuchara) sin oxidación' },
      { name: 'Cuchara de madera',        qty: 2, hint: 'Sin astillas ni residuos de comida impregnados' },
      { name: 'Espátula',                 qty: 1, hint: 'Sin deformaciones ni quemaduras' },
      { name: 'Cucharón',                 qty: 1, hint: 'Sin deformaciones, mango firme' },
      { name: 'Pinzas',                   qty: 1, hint: 'Resorte funcional y puntas sin daños' },
    ],
  },
  {
    group: 'Loza',
    items: [
      { name: 'Plato extendido',          qty: 6, hint: 'Sin grietas, despostilladuras ni manchas permanentes' },
      { name: 'Plato hondo',              qty: 6, hint: 'Sin grietas ni despostilladuras' },
      { name: 'Plato de postre',          qty: 4, hint: 'Sin grietas ni despostilladuras' },
      { name: 'Tazón / Bowl',             qty: 4, hint: 'Sin grietas, limpio y sin manchas permanentes' },
    ],
  },
  {
    group: 'Vajilla',
    items: [
      { name: 'Vaso de vidrio',           qty: 6, hint: 'Sin astillas ni grietas; cristal transparente' },
      { name: 'Copa de vino',             qty: 4, hint: 'Sin astillas; pie y tallo íntegros' },
      { name: 'Taza de café',             qty: 4, hint: 'Sin despostilladuras ni manchas de café incrustadas' },
      { name: 'Jarra',                    qty: 1, hint: 'Sin grietas ni mal olor; tapa funcional si aplica' },
    ],
  },
  {
    group: 'Muebles / Varios',
    items: [
      { name: 'Mesa de comedor',          qty: 1, hint: 'Superficie nivelada, sin rayaduras profundas ni manchas' },
      { name: 'Sillas de comedor',        qty: 4, hint: 'Sin tambaleo, tapizado limpio y sin rasgones' },
      { name: 'Barra / Desayunador',      qty: 0, hint: 'Nivelada, sin astillas y con acabado en buen estado' },
      { name: 'Taburetes / Bancos',       qty: 0, hint: 'Sin tambaleo y tapizado limpio' },
      { name: 'Puertas de muebles',       qty: 1, hint: 'Bisagras, imanes y acabado en buen estado' },
      { name: 'Cajones de cocina',        qty: 1, hint: 'Corren suavemente, fondo íntegro y sin residuos' },
    ],
  },
];

// ── Plantilla: Habitación (INV HABITACIONES) ──

const ONBOARDING_HABITACION_TEMPLATE = [
  {
    group: 'Activos Fijos',
    items: [
      { name: 'Cama individual',             qty: 0, hint: 'Marco, cabecera y patas sin daños; tornillos firmes' },
      { name: 'Cama matrimonial / Queen',    qty: 0, hint: 'Marco, cabecera y patas sin daños; tornillos firmes' },
      { name: 'Cama King',                   qty: 0, hint: 'Marco, cabecera y patas sin daños; tornillos firmes' },
      { name: 'Buró / Mesita de noche',      qty: 2, hint: 'Sin rayaduras, cajón funcional y sin tambaleo' },
      { name: 'Cómoda / Tocador',            qty: 1, hint: 'Cajones sin atasco, espejo limpio y acabado en buen estado' },
      { name: 'Closet / Armario',            qty: 1, hint: 'Puertas, pistas, barras y cajones en buen estado; sin malos olores' },
      { name: 'Silla / Sillón',              qty: 1, hint: 'Tapizado limpio, sin rasgones ni tambaleo' },
      { name: 'Lámpara de buró',             qty: 2, hint: 'Foco presente, cable sin daños y encendido correcto' },
      { name: 'TV / Pantalla',               qty: 1, hint: 'Encender, imagen nítida, control remoto con baterías' },
      { name: 'Soporte TV',                  hint: 'Anclaje firme a la pared o mueble; sin inclinación' },
      { name: 'Cortinas',                    qty: 2, hint: 'Limpias, sin rasgones ni roturas; oscurecimiento adecuado' },
      { name: 'Barandal de cortinas',        qty: 1, hint: 'Anclaje firme, sin pandeo y argollas completas' },
    ],
  },
  {
    group: 'Activos Variables',
    items: [
      { name: 'Colchón',                     qty: 1, hint: 'Sin manchas ni hundimientos; revisar que no huela a humedad' },
      { name: 'Cubrecolchón / Protector',    qty: 1, hint: 'Limpio, sin rasgones y ajuste correcto al colchón' },
      { name: 'Sábana bajera',               qty: 2, hint: 'Limpia, elástico en buen estado y talla correcta' },
      { name: 'Sábana encimera',             qty: 2, hint: 'Limpia, sin rasgones ni decoloraciones' },
      { name: 'Funda nórdica / Cobertor',    qty: 1, hint: 'Limpio, sin manchas ni pelusa excesiva' },
      { name: 'Almohada',                    qty: 2, hint: 'Relleno firme, sin manchas ni malos olores' },
      { name: 'Funda de almohada',           qty: 2, hint: 'Limpia, sin rasgones y talla correcta' },
      { name: 'Cobija extra',                qty: 1, hint: 'Limpia, sin pelusa excesiva y bien doblada' },
      { name: 'Percha / Gancho',             qty: 5, hint: 'Presentes y sin deformaciones' },
    ],
  },
];

// ── Plantilla: Baño (INV BAÑOS) ──

const ONBOARDING_BANO_TEMPLATE = [
  {
    group: 'Activos Fijos',
    items: [
      { name: 'WC / Sanitario',             qty: 1, hint: 'Sin fisuras, flapper funcional, cisterna llena en menos de 2 min' },
      { name: 'Asiento WC',                 qty: 1, hint: 'Firme, sin grietas y bisagras funcionales' },
      { name: 'Regadera / Cabezal de ducha', qty: 1, hint: 'Buena presión, sin gotas por el vástago y sin depósitos' },
      { name: 'Tina de baño',               qty: 0, hint: 'Sin grietas, esmalte íntegro y desagüe sin obstrucción' },
      { name: 'Lavabo',                     qty: 1, hint: 'Sin fisuras, desagüe libre y sello perimetral limpio' },
      { name: 'Mueble de baño',             qty: 1, hint: 'Puertas y cajones funcionales; sin humedad en la base' },
      { name: 'Espejo',                     qty: 1, hint: 'Sin manchas ni puntos de oxidación en el azogue' },
      { name: 'Repisa / Estante',           qty: 1, hint: 'Anclaje firme y superficie sin óxido' },
      { name: 'Cortina de baño',            qty: 1, hint: 'Limpia, sin rasgones y argollas completas' },
      { name: 'Barra cortina',              qty: 1, hint: 'Anclaje firme a la pared y sin corrosión' },
      { name: 'Porta toallas',              qty: 1, hint: 'Anclaje firme y sin óxido' },
      { name: 'Gancho de puerta',           qty: 1, hint: 'Bien anclado y sin deformaciones' },
      { name: 'Tapete de baño',             qty: 1, hint: 'Limpio, antideslizante y sin deterioro' },
    ],
  },
  {
    group: 'Activos Variables',
    items: [
      { name: 'Toalla de baño grande',      qty: 2, hint: 'Limpias, esponjosas y sin manchas ni mal olor' },
      { name: 'Toalla de manos',            qty: 2, hint: 'Limpias y sin manchas' },
      { name: 'Toalla de piso',             qty: 1, hint: 'Limpia, antideslizante y en buen estado' },
      { name: 'Dispensador de jabón',       qty: 1, hint: 'Bomba funcional, limpio y lleno' },
      { name: 'Porta papel higiénico',      qty: 1, hint: 'Firme en la pared y con rollo de papel' },
      { name: 'Cesto de basura',            qty: 1, hint: 'Limpio, con tapa si aplica y bolsa plástica interior' },
      { name: 'Secador de cabello',         qty: 1, hint: 'Cable en buen estado, enchufe seguro y flujo de aire correcto' },
    ],
  },
];


// ── Estado ──

let onboardingInfo = {};
let onboardingData = {};   // key: "sectionId__groupIdx__itemIdx" → { status, qty, notes, photos, photoTimes }
let onboardingSections = [];
let isEditingOnboarding = false;
let _onboardingTimerInterval = null;
let _onboardingTimerStart = null;
let _onboardingTimerElapsed = 0;

// One-at-a-time navigation state
let _onbCurrentSectionId = null;
let _onbFlatItems = [];          // [{ gIdx, iIdx, item, groupLabel }, ...]
let _onbCurrentItemIdx = 0;

// ── Helpers ──

function changeOnbCount(elId, delta) {
  const el = document.getElementById(elId);
  el.textContent = Math.max(0, Math.min(10, parseInt(el.textContent) + delta));
}

function buildOnboardingSections(numBedrooms, numBathrooms) {
  const sections = [];
  sections.push({ id: 'checklist-general', name: 'Checklist General', type: 'checklist', icon: 'checklist', data: ONBOARDING_CHECKLIST });
  sections.push({ id: 'cocina',            name: 'Cocina',            type: 'inventory', icon: 'kitchen',   data: ONBOARDING_COCINA });
  for (let i = 1; i <= numBedrooms;  i++) sections.push({ id: `habitacion-${i}`, name: `Habitación ${i}`, type: 'bedroom',  icon: 'bed',     data: ONBOARDING_HABITACION_TEMPLATE });
  for (let i = 1; i <= numBathrooms; i++) sections.push({ id: `bano-${i}`,       name: `Baño ${i}`,        type: 'bathroom', icon: 'bathtub', data: ONBOARDING_BANO_TEMPLATE });
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
  document.querySelectorAll('#onb-timer-display, #onb-item-timer').forEach(el => { if (el) el.textContent = display; });
}

function getOnbElapsed() { return _onboardingTimerStart ? Date.now() - _onboardingTimerStart : _onboardingTimerElapsed; }

function formatOnbTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return (h > 0 ? `${h}:` : '') + String(m).padStart(2,'0') + ':' + String(s % 60).padStart(2,'0');
}

// ── Paso 1: Inicio ──

function startOnboarding() {
  const unitName    = document.getElementById('onb-unit-name').value.trim();
  const date        = document.getElementById('onb-date').value;
  const auditor     = document.getElementById('onb-auditor').value.trim();
  const numBedrooms  = parseInt(document.getElementById('onb-bedrooms-count').textContent)  || 0;
  const numBathrooms = parseInt(document.getElementById('onb-bathrooms-count').textContent) || 0;

  let valid = true;
  [{ id: 'onb-unit-name', val: unitName }, { id: 'onb-date', val: date }, { id: 'onb-auditor', val: auditor }].forEach(({ id, val }) => {
    if (!val) {
      const group = document.getElementById(id).closest('.form-group');
      group.classList.add('error');
      setTimeout(() => group.classList.remove('error'), 800);
      valid = false;
    }
  });
  if (!valid) { showToast('⚠️ Llena todos los campos'); return; }

  if (!isEditingOnboarding) onboardingData = {};

  onboardingInfo = {
    unitId: onboardingInfo.unitId || ('onb-' + Date.now()),
    unitName, date, auditor, numBedrooms, numBathrooms,
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
  const grid   = document.getElementById('onb-section-grid');
  const COLORS = ['#10b981','#2563eb','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16'];
  const total  = countOnbTotalItems();
  const done   = countOnbCompletedItems();
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;

  const bar = document.getElementById('onb-overall-bar');
  if (bar) bar.style.width = pct + '%';
  const lbl = document.getElementById('onb-overall-label');
  if (lbl) lbl.textContent = `${done} / ${total} ítems completados`;

  grid.innerHTML = onboardingSections.map((section, idx) => {
    const color      = COLORS[idx % COLORS.length];
    const secTotal   = countOnbSectionItems(section);
    const secDone    = countOnbSectionCompleted(section);
    const secPct     = secTotal > 0 ? Math.round((secDone / secTotal) * 100) : 0;
    const isComplete = secTotal > 0 && secDone === secTotal;
    return `
      <div class="room-card${isComplete ? ' completed' : ''}" onclick="openOnboardingSection('${section.id}')">
        <div class="room-card-icon" style="background:${color}22">
          <span class="material-symbols-rounded" style="color:${color}">${section.icon}</span>
        </div>
        ${isComplete ? '<span class="room-card-check material-symbols-rounded">check_circle</span>' : ''}
        <div class="room-card-name">${section.name}</div>
        <div class="room-card-count">${secDone}/${secTotal}</div>
        <div class="room-card-progress">
          <div class="room-card-progress-bar" style="width:${secPct}%;background:${color}"></div>
        </div>
      </div>`;
  }).join('');
}

function countOnbTotalItems()     { return onboardingSections.reduce((s, sec) => s + countOnbSectionItems(sec), 0); }
function countOnbCompletedItems() { return onboardingSections.reduce((s, sec) => s + countOnbSectionCompleted(sec), 0); }
function countOnbSectionItems(section) { return section.data.reduce((s, g) => s + g.items.length, 0); }
function countOnbSectionCompleted(section) {
  return section.data.reduce((sum, group, gIdx) =>
    sum + group.items.filter((_, iIdx) => (onboardingData[`${section.id}__${gIdx}__${iIdx}`] || {}).status).length, 0);
}

// ── Paso 3: Ítem uno a la vez ──

const SECTION_ICON_MAP = {
  checklist: 'checklist', inventory: 'kitchen', bedroom: 'bed', bathroom: 'bathtub',
};

function openOnboardingSection(sectionId) {
  const section = onboardingSections.find(s => s.id === sectionId);
  if (!section) return;

  _onbCurrentSectionId = sectionId;
  _onbFlatItems = [];
  section.data.forEach((group, gIdx) => {
    const groupLabel = section.type === 'checklist' ? group.category : group.group;
    group.items.forEach((item, iIdx) => {
      _onbFlatItems.push({ gIdx, iIdx, item, groupLabel, isChecklist: section.type === 'checklist' });
    });
  });

  _onbCurrentItemIdx = 0;
  renderOnbCurrentItem();
  showStep('step-onboarding-item');
}

function renderOnbCurrentItem() {
  const { gIdx, iIdx, item, groupLabel, isChecklist } = _onbFlatItems[_onbCurrentItemIdx];
  const key  = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  const d    = onboardingData[key] || {};
  const total = _onbFlatItems.length;
  const pct  = (((_onbCurrentItemIdx + 1) / total) * 100);

  // Progress bar
  document.getElementById('onb-item-progress-bar').style.width = pct + '%';
  document.getElementById('onb-item-count').textContent = `${_onbCurrentItemIdx + 1}/${total}`;

  // Area / group
  document.getElementById('onb-item-area').textContent = groupLabel;

  // Icon — reuse ITEM_ICONS map if available, else section default
  const section = onboardingSections.find(s => s.id === _onbCurrentSectionId);
  const iconName = (typeof ITEM_ICONS !== 'undefined' && ITEM_ICONS[item.name]) || SECTION_ICON_MAP[section.type] || 'inventory_2';
  document.getElementById('onb-item-icon').textContent = iconName;
  document.getElementById('onb-item-icon-wrap').style.background = '';

  // Names
  document.getElementById('onb-item-name').textContent  = item.name;
  document.getElementById('onb-item-group').textContent = groupLabel;

  // Hint
  const hintEl = document.getElementById('onb-item-hint');
  hintEl.textContent    = item.hint || '';
  hintEl.style.display  = item.hint ? 'block' : 'none';

  // Status buttons
  document.querySelectorAll('#onb-status-grid .status-btn').forEach(btn => btn.classList.remove('selected'));
  if (d.status) {
    const map = { good: '.good', damaged: '.damaged', missing: '.missing', new: '.new-item' };
    const sel = document.querySelector(`#onb-status-grid .status-btn${map[d.status]}`);
    if (sel) sel.classList.add('selected');
  }

  // Qty row (hidden for checklist items)
  const qtyRow = document.getElementById('onb-qty-row');
  qtyRow.style.display = isChecklist ? 'none' : '';
  const qty = d.qty !== undefined ? d.qty : (item.qty !== undefined ? item.qty : 1);
  document.getElementById('onb-item-qty').textContent = qty;

  // Camera button state
  document.getElementById('onb-item-camera-btn').classList.toggle('has-content', (d.photos || []).length > 0);

  // Photo strip
  _renderOnbPhotoStrip(d.photos || []);

  // Notes
  document.getElementById('onb-item-notes-area').style.display = 'none';
  document.getElementById('onb-item-notes-input').value = d.notes || '';

  // Navigation buttons
  document.getElementById('onb-nav-prev').style.visibility = _onbCurrentItemIdx === 0 ? 'hidden' : 'visible';
  const isLast = _onbCurrentItemIdx === total - 1;
  document.getElementById('onb-nav-next').innerHTML = isLast
    ? 'Finalizar <span class="material-symbols-rounded">check_circle</span>'
    : 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';

  window.scrollTo(0, 0);
}

function setOnbCurrentStatus(status) {
  const { gIdx, iIdx } = _onbFlatItems[_onbCurrentItemIdx];
  const key = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};

  onboardingData[key].status = onboardingData[key].status === status ? null : status;

  document.querySelectorAll('#onb-status-grid .status-btn').forEach(btn => btn.classList.remove('selected'));
  if (onboardingData[key].status) {
    const map = { good: '.good', damaged: '.damaged', missing: '.missing', new: '.new-item' };
    const sel = document.querySelector(`#onb-status-grid .status-btn${map[onboardingData[key].status]}`);
    if (sel) sel.classList.add('selected');
  }

  const labels = { good: '✅ BIEN', damaged: '🔧 DAÑADO', missing: '❌ FALTA' };
  if (onboardingData[key].status) {
    showToast(labels[onboardingData[key].status] || '✅ Listo');
    const navNext = document.getElementById('onb-nav-next');
    if (navNext) navNext.classList.add('nav-ready');
  }
}

function changeOnbCurrentQty(delta) {
  const { gIdx, iIdx, item } = _onbFlatItems[_onbCurrentItemIdx];
  const key = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};
  const current = onboardingData[key].qty !== undefined ? onboardingData[key].qty : (item.qty || 0);
  onboardingData[key].qty = Math.max(0, current + delta);
  document.getElementById('onb-item-qty').textContent = onboardingData[key].qty;
}

function toggleOnbCurrentNotes() {
  const area = document.getElementById('onb-item-notes-area');
  area.style.display = area.style.display === 'none' || !area.style.display ? 'block' : 'none';
}

function _saveOnbCurrentNotes() {
  const { gIdx, iIdx } = _onbFlatItems[_onbCurrentItemIdx];
  const key = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};
  onboardingData[key].notes = document.getElementById('onb-item-notes-input').value;
}

function prevOnbItem() {
  _saveOnbCurrentNotes();
  if (_onbCurrentItemIdx > 0) {
    _onbCurrentItemIdx--;
    renderOnbCurrentItem();
  }
}

function nextOnbItem() {
  _saveOnbCurrentNotes();
  if (_onbCurrentItemIdx < _onbFlatItems.length - 1) {
    _onbCurrentItemIdx++;
    renderOnbCurrentItem();
  } else {
    backToOnboardingSections();
  }
}

function backToOnboardingSections() {
  if (_onbFlatItems.length > 0) _saveOnbCurrentNotes();
  renderOnboardingSections();
  showStep('step-onboarding-sections');
}

// ── Fotos ──

function triggerOnbCurrentPhoto() {
  const input = document.getElementById('onb-item-photo-input');
  input.value = '';
  input.click();
}

function handleOnbCurrentPhoto(input) {
  if (!input.files || !input.files[0]) return;
  const { gIdx, iIdx } = _onbFlatItems[_onbCurrentItemIdx];
  const key = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) onboardingData[key] = {};
  if (!onboardingData[key].photos)     onboardingData[key].photos     = [];
  if (!onboardingData[key].photoTimes) onboardingData[key].photoTimes = [];

  const reader = new FileReader();
  reader.onload = (e) => {
    onboardingData[key].photos.push(e.target.result);
    onboardingData[key].photoTimes.push(new Date().toISOString());
    _renderOnbPhotoStrip(onboardingData[key].photos);
    document.getElementById('onb-item-camera-btn').classList.add('has-content');
  };
  reader.readAsDataURL(input.files[0]);
}

function _renderOnbPhotoStrip(photos) {
  const strip = document.getElementById('onb-item-photo-strip');
  strip.innerHTML = photos.map((p, pi) =>
    `<div class="photo-thumb"><img src="${p}" alt="foto" onclick="removeOnbCurrentPhoto(${pi})" title="Toca para eliminar"></div>`
  ).join('');
}

function removeOnbCurrentPhoto(photoIdx) {
  const { gIdx, iIdx } = _onbFlatItems[_onbCurrentItemIdx];
  const key = `${_onbCurrentSectionId}__${gIdx}__${iIdx}`;
  if (!onboardingData[key]) return;
  onboardingData[key].photos.splice(photoIdx, 1);
  onboardingData[key].photoTimes.splice(photoIdx, 1);
  _renderOnbPhotoStrip(onboardingData[key].photos);
  if (!onboardingData[key].photos.length) document.getElementById('onb-item-camera-btn').classList.remove('has-content');
}

// ── Help modal (shows hint) ──

function showOnbHelpModal() {
  if (!_onbFlatItems.length) return;
  const { item, groupLabel } = _onbFlatItems[_onbCurrentItemIdx];
  document.getElementById('help-modal-icon').textContent = 'home_work';
  document.getElementById('help-modal-name').textContent = item.name;
  document.getElementById('help-modal-hint').textContent = item.hint || groupLabel;
  document.getElementById('help-modal-details').textContent = groupLabel;
  document.getElementById('help-modal').classList.add('visible');
}

// ── Finalizar / Guardar ──

async function finishOnboarding() {
  stopOnbTimer();
  const elapsed = getOnbElapsed();
  onboardingInfo.duration   = formatOnbTime(elapsed);
  onboardingInfo.durationMs = elapsed;
  onboardingInfo.type       = 'onboarding';

  onboardingInfo.sections = onboardingSections.map(section => ({
    sectionId:   section.id,
    sectionName: section.name,
    sectionType: section.type,
    groups: section.data.map((group, gIdx) => ({
      label: section.type === 'checklist' ? group.category : group.group,
      items: group.items.map((item, iIdx) => {
        const d = onboardingData[`${section.id}__${gIdx}__${iIdx}`] || {};
        return {
          name:       item.name,
          qty:        d.qty !== undefined ? d.qty : (item.qty !== undefined ? item.qty : 1),
          status:     d.status || null,
          notes:      d.notes || '',
          photos:     d.photos || [],
          photoTimes: d.photoTimes || [],
        };
      }),
    })),
  }));

  showOnboardingExport();

  if (isAPIReady()) {
    try {
      await saveOnboardingRecord(onboardingInfo);
      showToast(isEditingOnboarding ? '✅ Cambios guardados en la nube' : '☁️ Onboarding guardado en la nube');
      isEditingOnboarding = false;
    } catch (err) {
      console.error('Error guardando onboarding:', err);
      showToast('⚠️ No se pudo guardar en la nube');
    }
  } else {
    showToast('ℹ️ No se pudo conectar con la base de datos');
  }
}

function showOnboardingExport() {
  showStep('step-export');
  document.getElementById('export-icon').textContent  = 'home_work';
  document.getElementById('export-title').textContent = '¡Onboarding Listo!';

  const total     = countOnbTotalItems();
  const completed = countOnbCompletedItems();
  document.getElementById('export-summary').textContent = `${onboardingInfo.unitName} — ${completed}/${total} ítems`;

  const timerFinal = document.getElementById('timer-final');
  if (onboardingInfo.duration) {
    timerFinal.innerHTML = `<span class="material-symbols-rounded">timer</span> Tiempo total: ${onboardingInfo.duration}`;
  }

  const container = document.getElementById('review-container');
  container.innerHTML = '';
  const COLORS = ['#10b981','#2563eb','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4'];

  (onboardingInfo.sections || []).forEach((section, sIdx) => {
    const color   = COLORS[sIdx % COLORS.length];
    const secIcon = onboardingSections[sIdx] ? onboardingSections[sIdx].icon : 'inventory_2';
    const div     = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3><span class="material-symbols-rounded" style="color:${color}">${secIcon}</span> ${section.sectionName}</h3>`;

    section.groups.forEach(group => {
      div.innerHTML += `<div style="font-size:.75rem;font-weight:700;color:#059669;text-transform:uppercase;padding:6px 0 2px;letter-spacing:.04em">${group.label}</div>`;
      group.items.forEach(item => {
        if (!item.status && !item.notes && !(item.photos && item.photos.length)) return;
        const sMap = { good: 'good', damaged: 'damaged', missing: 'missing', new: 'new-item' };
        const photoHtml = (item.photos || []).slice(0,3).map(p => `<div class="review-photo-wrap"><img src="${p}" alt="foto"></div>`).join('');
        div.innerHTML += `
          <div class="review-item">
            <span class="material-symbols-rounded review-item-icon">inventory_2</span>
            <div class="review-item-info">
              <div class="review-item-name">${item.name}</div>
              <div class="review-item-detail">${section.sectionType !== 'checklist' ? `Cant: ${item.qty}` : ''}${item.notes ? ' · ' + item.notes : ''}</div>
            </div>
            <div class="review-photos">${photoHtml}</div>
            <div class="review-status-dot ${sMap[item.status] || ''}"></div>
          </div>`;
      });
    });

    if (div.querySelectorAll('.review-item').length > 0) container.appendChild(div);
  });

  checkShareSupport();
}

// ── Editar desde histórico ──

async function editOnboardingFromHistorico(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) { showToast('❌ No encontrado'); return; }

    onboardingInfo     = { unitId: doc.unitId, unitName: doc.unitName, date: doc.date, auditor: doc.auditor, numBedrooms: doc.numBedrooms || 1, numBathrooms: doc.numBathrooms || 1 };
    onboardingData     = {};
    onboardingSections = buildOnboardingSections(onboardingInfo.numBedrooms, onboardingInfo.numBathrooms);

    if (doc.sections) {
      doc.sections.forEach(savedSection => {
        const section = onboardingSections.find(s => s.id === savedSection.sectionId);
        if (!section) return;
        savedSection.groups.forEach((savedGroup, gIdx) => {
          if (!section.data[gIdx]) return;
          savedGroup.items.forEach((savedItem, iIdx) => {
            onboardingData[`${savedSection.sectionId}__${gIdx}__${iIdx}`] = {
              status: savedItem.status || null, qty: savedItem.qty, notes: savedItem.notes || '',
              photos: savedItem.photos || [], photoTimes: savedItem.photoTimes || [],
            };
          });
        });
      });
    }

    isEditingOnboarding = true;
    document.getElementById('onb-unit-name').value             = doc.unitName;
    document.getElementById('onb-date').value                  = doc.date || '';
    document.getElementById('onb-auditor').value               = doc.auditor || '';
    document.getElementById('onb-bedrooms-count').textContent  = onboardingInfo.numBedrooms;
    document.getElementById('onb-bathrooms-count').textContent = onboardingInfo.numBathrooms;

    showStep('step-onboarding-welcome');
    showToast(`✏️ Editando onboarding de ${doc.unitName}`);
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar onboarding');
  }
}

// ── Ver desde histórico ──

async function viewOnboardingRecord(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) { showToast('❌ No encontrado'); return; }

    onboardingInfo     = { unitId: doc.unitId, unitName: doc.unitName, date: doc.date, auditor: doc.auditor, duration: doc.duration, numBedrooms: doc.numBedrooms || 1, numBathrooms: doc.numBathrooms || 1, sections: doc.sections || [] };
    onboardingSections = buildOnboardingSections(onboardingInfo.numBedrooms, onboardingInfo.numBathrooms);

    showOnboardingExport();
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar onboarding');
  }
}
