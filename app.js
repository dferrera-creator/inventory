// ── Inspection Data Template ──

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

// ── Init ──

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').valueAsDate = new Date();
});

// ── Step Navigation ──

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  window.scrollTo(0, 0);
}

// ── Step 1: Start Inspection ──

function startInspection() {
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value;
  const auditor = document.getElementById('auditor').value.trim();

  if (!location || !date || !auditor) {
    alert('Please fill in all fields.');
    return;
  }

  inspectionInfo = { location, date, auditor };
  currentSectionIndex = 0;
  showStep('step-inspect');
  renderSection();
}

// ── Step 2: Inspection ──

function renderSection() {
  const section = SECTIONS[currentSectionIndex];

  // Title & progress
  document.getElementById('section-title').textContent = section.name;
  document.getElementById('section-progress').textContent =
    `Section ${currentSectionIndex + 1} of ${SECTIONS.length}`;

  // Tabs
  const tabsEl = document.getElementById('section-tabs');
  tabsEl.innerHTML = SECTIONS.map((s, i) => {
    const isActive = i === currentSectionIndex;
    const isCompleted = isSectionCompleted(i);
    let cls = 'tab';
    if (isActive) cls += ' active';
    else if (isCompleted) cls += ' completed';
    return `<button class="${cls}" onclick="goToSection(${i})">${s.name}</button>`;
  }).join('');

  // Items
  const container = document.getElementById('items-container');
  container.innerHTML = '';

  // Group by area
  let currentArea = '';
  section.items.forEach((item, idx) => {
    const key = `${section.id}-${idx}`;
    const data = inspectionData[key] || {};

    if (item.area !== currentArea) {
      currentArea = item.area;
      const areaHeader = document.createElement('h3');
      areaHeader.style.cssText = 'margin: 20px 0 8px; font-size: 1.1rem; color: #2563eb;';
      areaHeader.textContent = currentArea;
      container.appendChild(areaHeader);
    }

    const card = document.createElement('div');
    card.className = `item-card${data.status ? ' done' : ''}`;
    card.innerHTML = buildItemCard(item, key, data);
    container.appendChild(card);
  });

  // Nav buttons
  document.getElementById('btn-prev').style.display =
    currentSectionIndex === 0 ? 'none' : '';
  document.getElementById('btn-next').textContent =
    currentSectionIndex === SECTIONS.length - 1 ? 'Finish' : 'Next';
}

function buildItemCard(item, key, data) {
  const typeBadge = item.type === 'fixed'
    ? '<span class="badge fixed">Fixed Asset</span>'
    : '<span class="badge variable">Variable Asset</span>';

  const statusOptions = STATUS_OPTIONS.map(o =>
    `<option value="${o.value}" ${data.status === o.value ? 'selected' : ''}>${o.label}</option>`
  ).join('');

  const photos = (data.photos || []).map((p, i) =>
    `<div class="photo-thumb">
      <img src="${p}" alt="photo">
      <button class="remove-photo" onclick="removePhoto('${key}', ${i})">x</button>
    </div>`
  ).join('');

  return `
    <div class="item-card-header">
      <h3>${item.name}</h3>
      ${typeBadge}
    </div>
    <div class="item-fields">
      <div class="form-group">
        <label>Status</label>
        <select onchange="updateItem('${key}', 'status', this.value)">
          ${statusOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" min="0" value="${data.qty !== undefined ? data.qty : item.qty}"
               onchange="updateItem('${key}', 'qty', this.value)">
      </div>
      <div class="form-group full-width">
        <label>Observations</label>
        <textarea placeholder="Any comments..."
                  onchange="updateItem('${key}', 'observations', this.value)">${data.observations || ''}</textarea>
      </div>
    </div>
    <div class="photo-area">
      <label class="photo-btn" for="photo-${key}">
        📷 Add Photo
      </label>
      <input type="file" id="photo-${key}" accept="image/*" capture="environment"
             style="display:none" onchange="addPhoto('${key}', this)">
      <div class="photo-preview">${photos}</div>
    </div>
  `;
}

function updateItem(key, field, value) {
  if (!inspectionData[key]) inspectionData[key] = {};
  inspectionData[key][field] = value;

  // Update card styling
  if (field === 'status') {
    const sectionId = key.split('-').slice(0, -1).join('-');
    // Just re-render to update card borders
    renderSection();
  }
}

function addPhoto(key, input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (!inspectionData[key]) inspectionData[key] = {};
    if (!inspectionData[key].photos) inspectionData[key].photos = [];
    // Compress image before storing
    compressImage(e.target.result, 800, 0.7, (compressed) => {
      inspectionData[key].photos.push(compressed);
      renderSection();
    });
  };
  reader.readAsDataURL(file);
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

function removePhoto(key, photoIndex) {
  inspectionData[key].photos.splice(photoIndex, 1);
  renderSection();
}

function isSectionCompleted(sectionIdx) {
  const section = SECTIONS[sectionIdx];
  return section.items.every((_, idx) => {
    const key = `${section.id}-${idx}`;
    return inspectionData[key] && inspectionData[key].status;
  });
}

function goToSection(idx) {
  currentSectionIndex = idx;
  renderSection();
  window.scrollTo(0, 0);
}

function prevSection() {
  if (currentSectionIndex > 0) {
    currentSectionIndex--;
    renderSection();
    window.scrollTo(0, 0);
  }
}

function nextSection() {
  if (currentSectionIndex < SECTIONS.length - 1) {
    currentSectionIndex++;
    renderSection();
    window.scrollTo(0, 0);
  } else {
    showExport();
  }
}

// ── Step 3: Export ──

function showExport() {
  showStep('step-export');

  const total = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const completed = Object.values(inspectionData).filter(d => d.status).length;
  document.getElementById('export-summary').textContent =
    `${inspectionInfo.location} — ${inspectionInfo.date} — ${completed}/${total} items inspected`;

  const container = document.getElementById('review-container');
  container.innerHTML = '';

  SECTIONS.forEach((section) => {
    const div = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3>${section.name}</h3>`;

    section.items.forEach((item, idx) => {
      const key = `${section.id}-${idx}`;
      const data = inspectionData[key] || {};

      const statusLabel = STATUS_OPTIONS.find(o => o.value === data.status);
      const statusClass = data.status ? `status-${data.status}` : '';
      const photos = (data.photos || []).map(p =>
        `<img src="${p}" alt="photo">`
      ).join('');

      div.innerHTML += `
        <div class="review-item">
          <div class="review-info">
            <strong>${item.area} — ${item.name}</strong>
            <p>
              Status: <span class="${statusClass}">${statusLabel ? statusLabel.label : 'Not inspected'}</span>
              &nbsp;|&nbsp; Qty: ${data.qty !== undefined ? data.qty : item.qty}
              ${data.observations ? `<br>Notes: ${data.observations}` : ''}
            </p>
          </div>
          <div class="review-photos">${photos}</div>
        </div>
      `;
    });

    container.appendChild(div);
  });
}

function goBackToInspection() {
  showStep('step-inspect');
  renderSection();
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

    // Column widths
    ws['!cols'] = [
      { wch: 22 }, { wch: 32 }, { wch: 18 }, { wch: 16 }, { wch: 10 }, { wch: 40 }
    ];

    // Truncate sheet name to 31 chars (Excel limit)
    const sheetName = section.name.substring(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, `Inspection_${inspectionInfo.location}_${inspectionInfo.date}.xlsx`);
}

// ── PDF Export ──

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const margin = 15;
  const contentW = pageW - margin * 2;
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

    // Section header
    checkPage(14);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(section.name, margin, y);
    y += 8;

    // Table header
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

      // Photos
      if (hasPhotos) {
        y += 3;
        data.photos.forEach((photo, pi) => {
          if (pi < 3) { // max 3 photos per row in PDF
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
}
