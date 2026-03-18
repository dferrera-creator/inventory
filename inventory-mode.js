// ══════════════════════════════════════════
// MODO INVENTARIO
// Lógica para crear y guardar inventarios desde cero
// ══════════════════════════════════════════

// ── Estado del modo inventario ──

let inventoryInfo = {};
let inventoryRooms = [];        // [{ roomId, roomName, items: [...] }]
let currentInvRoomIdx = 0;
let currentAddItemPhotos = [];
let currentAddItemPhotoTimes = [];
let newItemQty = 1;
let newItemStatus = null;
let editingItemIdx = null;      // null = nuevo, número = editando existente

// ── Inicio del modo inventario ──

function startInventoryMode() {
  try {
    // Auto-fill date if empty
    const dateEl = document.getElementById('inv-date');
    if (!dateEl.value) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateEl.value = `${yyyy}-${mm}-${dd}`;
    }

    const unitName = document.getElementById('inv-unit-name').value.trim();
    const date = document.getElementById('inv-date').value;
    const auditor = document.getElementById('inv-auditor').value.trim();

    let valid = true;
    ['inv-unit-name', 'inv-auditor'].forEach(id => {
      const el = document.getElementById(id);
      const group = el.closest('.form-group');
      if (!el.value.trim()) {
        group.classList.add('error');
        setTimeout(() => group.classList.remove('error'), 800);
        valid = false;
      }
    });

    if (!valid) {
      showToast('⚠️ Llena todos los campos');
      return;
    }

    inventoryInfo = {
      unitId: unitName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now(),
      unitName,
      date,
      auditor,
    };
    inventoryRooms = [];

    startTimer();
    document.getElementById('inv-unit-label').textContent = unitName;
    showStep('step-inv-rooms');
    renderInventoryRooms();
    // Prompt user to add first room immediately
    showAddRoomModal();
  } catch (err) {
    console.error('Error en startInventoryMode:', err);
    showToast('❌ Error: ' + err.message);
  }
}

// ── Renderizar cuadrícula de cuartos ──

function renderInventoryRooms() {
  const grid = document.getElementById('inv-room-grid');
  grid.innerHTML = '';

  inventoryRooms.forEach((room, idx) => {
    const color = DYNAMIC_ROOM_COLORS[idx % DYNAMIC_ROOM_COLORS.length];
    const count = room.items.length;

    const card = document.createElement('div');
    card.className = 'room-card';
    card.onclick = () => openInventoryRoom(idx);

    card.innerHTML = `
      <div class="room-card-icon" style="background: ${color}20; color: ${color}">
        <span class="material-symbols-rounded">inventory_2</span>
      </div>
      <div class="room-card-name">${room.roomName}</div>
      <div class="room-card-count">${count} artículo${count !== 1 ? 's' : ''}</div>
      <div class="room-card-progress">
        <div class="room-card-progress-bar" style="width: ${count > 0 ? 100 : 0}%; background: ${color}"></div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Botón de finalizar
  let finishBtn = document.getElementById('btn-finish-inventory');
  if (!finishBtn) {
    finishBtn = document.createElement('button');
    finishBtn.id = 'btn-finish-inventory';
    finishBtn.className = 'btn-finish-all';
    finishBtn.innerHTML = '<span class="material-symbols-rounded">cloud_upload</span> Guardar Inventario';
    finishBtn.onclick = finishInventory;
    const container = document.getElementById('inv-room-grid').parentElement;
    container.appendChild(finishBtn);
  }

  const hasItems = inventoryRooms.some(r => r.items.length > 0);
  finishBtn.className = 'btn-finish-all' + (hasItems ? '' : ' hidden');
}

// ── Modal para agregar cuarto ──

function showAddRoomModal() {
  document.getElementById('new-room-name').value = '';
  document.getElementById('add-room-modal').classList.add('visible');
  setTimeout(() => document.getElementById('new-room-name').focus(), 100);
}

function closeAddRoomModal() {
  document.getElementById('add-room-modal').classList.remove('visible');
}

function confirmAddRoom() {
  const name = document.getElementById('new-room-name').value.trim();
  if (!name) {
    document.getElementById('new-room-name').classList.add('error');
    setTimeout(() => document.getElementById('new-room-name').classList.remove('error'), 800);
    return;
  }

  const roomId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now();
  inventoryRooms.push({ roomId, roomName: name, items: [] });

  closeAddRoomModal();
  renderInventoryRooms();
  showToast(`✅ Cuarto "${name}" agregado`);
}

// ── Abrir cuarto para agregar artículos ──

function openInventoryRoom(idx) {
  currentInvRoomIdx = idx;
  const room = inventoryRooms[idx];
  document.getElementById('inv-room-title').textContent = room.roomName;
  showStep('step-inv-item');
  renderInventoryItemList();
  hideAddItemPanel();
}

function backToInventoryRooms() {
  showStep('step-inv-rooms');
  renderInventoryRooms();
}

// ── Renderizar lista de artículos del cuarto ──

function renderInventoryItemList() {
  const room = inventoryRooms[currentInvRoomIdx];
  const list = document.getElementById('inv-item-list');

  if (room.items.length === 0) {
    list.innerHTML = `
      <div class="inv-empty-state">
        <span class="material-symbols-rounded">inventory_2</span>
        <p>Sin artículos. Agrega el primero.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = room.items.map((item, idx) => {
    const color = DYNAMIC_ROOM_COLORS[currentInvRoomIdx % DYNAMIC_ROOM_COLORS.length];
    const statusDot = item.status
      ? `<div class="review-status-dot ${item.status === 'new' ? 'new-item' : item.status}"></div>`
      : '<div class="review-status-dot none"></div>';

    return `
      <div class="inv-item-card">
        <div class="inv-item-icon" style="color:${color}">
          <span class="material-symbols-rounded">inventory_2</span>
        </div>
        <div class="inv-item-info">
          <div class="inv-item-name">${item.name}</div>
          <div class="inv-item-meta">
            ${item.sku ? `<span class="sku-badge">${item.sku}</span>` : ''}
            ${item.price ? `<span class="price-tag">$${Number(item.price).toFixed(2)}</span>` : ''}
            <span class="inv-item-qty">Cant: ${item.qty}</span>
            ${item.photos && item.photos.length > 0 ? `<span class="photo-count"><span class="material-symbols-rounded">photo_camera</span>${item.photos.length}</span>` : ''}
          </div>
          ${item.notes ? `<div class="inv-item-notes">${item.notes}</div>` : ''}
        </div>
        <div class="inv-item-actions">
          ${statusDot}
          <button class="inv-item-edit" onclick="editInventoryItem(${idx})" title="Editar">
            <span class="material-symbols-rounded">edit</span>
          </button>
          <button class="inv-item-delete" onclick="deleteInventoryItem(${idx})" title="Eliminar">
            <span class="material-symbols-rounded">delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ── Panel de agregar/editar artículo ──

function showAddItemPanel() {
  resetAddItemForm();
  editingItemIdx = null;
  document.querySelector('.add-item-title').textContent = 'Nuevo Artículo';
  document.getElementById('add-item-panel').style.display = 'block';
  document.getElementById('btn-show-add-item').style.display = 'none';
  document.getElementById('new-item-name').focus();
}

function hideAddItemPanel() {
  document.getElementById('add-item-panel').style.display = 'none';
  document.getElementById('btn-show-add-item').style.display = 'flex';
  resetAddItemForm();
}

function resetAddItemForm() {
  document.getElementById('new-item-name').value = '';
  document.getElementById('new-item-sku').value = '';
  document.getElementById('new-item-price').value = '';
  document.getElementById('new-item-notes').value = '';
  newItemQty = 1;
  document.getElementById('new-item-qty').textContent = '1';
  newItemStatus = null;
  currentAddItemPhotos = [];
  currentAddItemPhotoTimes = [];
  editingItemIdx = null;
  document.querySelectorAll('#new-item-status-grid .status-btn').forEach(b => b.classList.remove('selected', 'just-selected'));
  document.getElementById('inv-photo-strip').innerHTML = '';
  document.getElementById('inv-camera-btn').classList.remove('has-content');
}

function changeNewItemQty(delta) {
  newItemQty = Math.max(0, newItemQty + delta);
  document.getElementById('new-item-qty').textContent = newItemQty;
}

function setNewItemStatus(status) {
  newItemStatus = status;
  document.querySelectorAll('#new-item-status-grid .status-btn').forEach(b => b.classList.remove('selected', 'just-selected'));
  const statusMap = { good: '.good', damaged: '.damaged', missing: '.missing', new: '.new-item' };
  const btn = document.querySelector(`#new-item-status-grid .status-btn${statusMap[status]}`);
  if (btn) btn.classList.add('selected', 'just-selected');
}

function triggerInvPhoto() {
  document.getElementById('inv-photo-input').click();
}

function handleInvPhoto(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    compressImage(e.target.result, 800, 0.7, (compressed) => {
      currentAddItemPhotos.push(compressed);
      currentAddItemPhotoTimes.push(new Date().toISOString());
      renderInvPhotoStrip();
      document.getElementById('inv-camera-btn').classList.add('has-content');
      showToast('📷 Foto agregada');
    });
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function renderInvPhotoStrip() {
  const strip = document.getElementById('inv-photo-strip');
  strip.innerHTML = currentAddItemPhotos.map((p, i) => {
    const timeStr = currentAddItemPhotoTimes[i]
      ? new Date(currentAddItemPhotoTimes[i]).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      : '';
    return `<div class="photo-thumb">
      <img src="${p}" alt="foto">
      ${timeStr ? `<span class="photo-time">${timeStr}</span>` : ''}
      <button class="remove-photo" onclick="removeInvPhoto(${i})">×</button>
    </div>`;
  }).join('');
}

function removeInvPhoto(idx) {
  currentAddItemPhotos.splice(idx, 1);
  currentAddItemPhotoTimes.splice(idx, 1);
  renderInvPhotoStrip();
  if (!currentAddItemPhotos.length) {
    document.getElementById('inv-camera-btn').classList.remove('has-content');
  }
}

function saveInventoryItem() {
  const name = document.getElementById('new-item-name').value.trim();
  if (!name) {
    document.getElementById('new-item-name').classList.add('error');
    setTimeout(() => document.getElementById('new-item-name').classList.remove('error'), 800);
    showToast('⚠️ El nombre es obligatorio');
    return;
  }

  const item = {
    itemId: editingItemIdx !== null
      ? inventoryRooms[currentInvRoomIdx].items[editingItemIdx].itemId
      : 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    name,
    sku: document.getElementById('new-item-sku').value.trim(),
    price: parseFloat(document.getElementById('new-item-price').value) || 0,
    qty: newItemQty,
    status: newItemStatus,
    notes: document.getElementById('new-item-notes').value.trim(),
    photos: [...currentAddItemPhotos],
    photoTimes: [...currentAddItemPhotoTimes],
  };

  if (editingItemIdx !== null) {
    inventoryRooms[currentInvRoomIdx].items[editingItemIdx] = item;
    showToast('✅ Artículo actualizado');
  } else {
    inventoryRooms[currentInvRoomIdx].items.push(item);
    showToast('✅ Artículo guardado');
  }

  hideAddItemPanel();
  renderInventoryItemList();
}

function editInventoryItem(idx) {
  const item = inventoryRooms[currentInvRoomIdx].items[idx];
  editingItemIdx = idx;

  document.getElementById('new-item-name').value = item.name;
  document.getElementById('new-item-sku').value = item.sku || '';
  document.getElementById('new-item-price').value = item.price || '';
  document.getElementById('new-item-notes').value = item.notes || '';
  newItemQty = item.qty;
  document.getElementById('new-item-qty').textContent = item.qty;
  newItemStatus = item.status;
  currentAddItemPhotos = [...(item.photos || [])];
  currentAddItemPhotoTimes = [...(item.photoTimes || [])];

  if (item.status) {
    const statusMap = { good: '.good', damaged: '.damaged', missing: '.missing', new: '.new-item' };
    document.querySelectorAll('#new-item-status-grid .status-btn').forEach(b => b.classList.remove('selected'));
    const btn = document.querySelector(`#new-item-status-grid .status-btn${statusMap[item.status]}`);
    if (btn) btn.classList.add('selected');
  }

  renderInvPhotoStrip();
  if (currentAddItemPhotos.length > 0) {
    document.getElementById('inv-camera-btn').classList.add('has-content');
  }

  document.querySelector('.add-item-title').textContent = 'Editar Artículo';
  document.getElementById('add-item-panel').style.display = 'block';
  document.getElementById('btn-show-add-item').style.display = 'none';
  document.getElementById('new-item-name').focus();
}

function deleteInventoryItem(idx) {
  inventoryRooms[currentInvRoomIdx].items.splice(idx, 1);
  renderInventoryItemList();
  showToast('🗑️ Artículo eliminado');
}

// ── Finalizar inventario y guardar en Supabase ──

async function finishInventory() {
  const totalItems = inventoryRooms.reduce((sum, r) => sum + r.items.length, 0);
  if (totalItems === 0) {
    showToast('⚠️ Agrega al menos un artículo');
    return;
  }

  stopTimer();

  const elapsed = getElapsedTime();
  inventoryInfo.duration = formatTime(elapsed);
  inventoryInfo.durationMs = elapsed;
  inventoryInfo.rooms = inventoryRooms;

  // Mostrar pantalla de exportación primero (modo inventario)
  showInventoryExport();

  // Intentar guardar en Supabase en paralelo
  if (isSupabaseReady()) {
    try {
      await saveInventory(inventoryInfo);
      showToast('☁️ Inventario guardado en la nube');
    } catch (err) {
      console.error('Error guardando en Supabase:', err);
      showToast('⚠️ No se pudo guardar en la nube');
    }
  } else {
    showToast('ℹ️ Configura Supabase para guardar en la nube');
  }
}

function showInventoryExport() {
  showStep('step-export');

  document.getElementById('export-icon').textContent = 'inventory';
  document.getElementById('export-title').textContent = '¡Inventario Listo!';

  const totalItems = inventoryRooms.reduce((sum, r) => sum + r.items.length, 0);
  document.getElementById('export-summary').textContent =
    `${inventoryInfo.unitName} — ${totalItems} artículo${totalItems !== 1 ? 's' : ''}`;

  const timerFinal = document.getElementById('timer-final');
  if (inventoryInfo.duration) {
    timerFinal.innerHTML = `<span class="material-symbols-rounded">timer</span> Tiempo total: ${inventoryInfo.duration}`;
  }

  // Revisión del inventario
  const container = document.getElementById('review-container');
  container.innerHTML = '';

  inventoryRooms.forEach((room, rIdx) => {
    const color = DYNAMIC_ROOM_COLORS[rIdx % DYNAMIC_ROOM_COLORS.length];
    const div = document.createElement('div');
    div.className = 'review-section';
    div.innerHTML = `<h3><span class="material-symbols-rounded" style="color:${color}">inventory_2</span> ${room.roomName}</h3>`;

    room.items.forEach((item) => {
      const statusClass = item.status || 'none';
      const photos = (item.photos || []).map((p, pi) => {
        const timeStr = item.photoTimes && item.photoTimes[pi]
          ? new Date(item.photoTimes[pi]).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          : '';
        let diffStr = '';
        if (pi > 0 && item.photoTimes && item.photoTimes[pi] && item.photoTimes[pi - 1]) {
          const diffMs = new Date(item.photoTimes[pi]) - new Date(item.photoTimes[pi - 1]);
          const diffSec = Math.floor(diffMs / 1000);
          const dm = Math.floor(diffSec / 60);
          const ds = diffSec % 60;
          diffStr = dm > 0 ? ` (+${dm}m${ds}s)` : ` (+${ds}s)`;
        }
        return `<div class="review-photo-wrap"><img src="${p}" alt="foto">${timeStr ? `<span class="review-photo-time">${timeStr}${diffStr}</span>` : ''}</div>`;
      }).join('');

      div.innerHTML += `
        <div class="review-item">
          <span class="material-symbols-rounded review-item-icon">inventory_2</span>
          <div class="review-item-info">
            <div class="review-item-name">${item.name}</div>
            <div class="review-item-detail">
              ${room.roomName} · Cant: ${item.qty}
              ${item.sku ? ` · SKU: ${item.sku}` : ''}
              ${item.price ? ` · $${Number(item.price).toFixed(2)}` : ''}
              ${item.notes ? ' · ' + item.notes : ''}
            </div>
          </div>
          <div class="review-photos">${photos}</div>
          <div class="review-status-dot ${statusClass === 'new' ? 'new-item' : statusClass}"></div>
        </div>
      `;
    });

    container.appendChild(div);
  });

  checkShareSupport();
}

// ── Exportar XLSX (modo inventario) ──

function exportInventoryXLSX() {
  const wb = XLSX.utils.book_new();

  inventoryRooms.forEach(room => {
    const rows = [];
    const merges = [];

    // Título
    rows.push(['DEL MAR — Inventario de Unidad', '', '', '', '', '', '']);
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } });

    // Metadata
    rows.push([`Unidad: ${inventoryInfo.unitName}`, '', `Fecha: ${inventoryInfo.date}`, '', `Responsable: ${inventoryInfo.auditor}`, '', '']);
    rows.push([inventoryInfo.duration ? `Duración: ${inventoryInfo.duration}` : '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', '', '', '']);

    // Encabezados
    rows.push(['Artículo', 'SKU', 'Estado', 'Tipo', 'Cantidad', 'Precio ($)', 'Notas']);

    room.items.forEach(item => {
      const statusLabel = STATUS_OPTIONS.find(o => o.value === item.status);
      rows.push([
        item.name,
        item.sku || '',
        statusLabel ? statusLabel.label : '',
        'Variable',
        item.qty,
        item.price ? Number(item.price) : 0,
        item.notes || '',
      ]);
    });

    // Pie
    rows.push(['', '', '', '', '', '', '']);
    rows.push(['ISO 9001 | Marriott International | Safe Travels | Airbnb Prohost | APAR | AirDNA', '', '', '', '', '', '']);
    merges.push({ s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 6 } });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!merges'] = merges;
    ws['!cols'] = [
      { wch: 30 }, // Artículo
      { wch: 14 }, // SKU
      { wch: 12 }, // Estado
      { wch: 10 }, // Tipo
      { wch: 10 }, // Cantidad
      { wch: 12 }, // Precio
      { wch: 40 }, // Notas
    ];

    const sheetName = room.roomName.substring(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, `Inventario_${inventoryInfo.unitName}_${inventoryInfo.date}.xlsx`);
  showToast('📊 Excel descargado');
}

// ── Exportar PDF (modo inventario) ──

function exportInventoryPDF() {
  const { jsPDF } = window.jspdf;
  const doc = buildInventoryPDF(jsPDF);
  doc.save(`Inventario_${inventoryInfo.unitName}_${inventoryInfo.date}.pdf`);
  showToast('📄 PDF descargado');
}

function generateInventoryPDFBlob() {
  const { jsPDF } = window.jspdf;
  const doc = buildInventoryPDF(jsPDF);
  return doc.output('blob');
}

function buildInventoryPDF(jsPDF) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const margin = 12;
  const contentW = pageW - margin * 2;
  let y = margin;

  function checkPage(needed) {
    if (y + needed > 280) {
      doc.addPage();
      y = margin;
    }
  }

  // Logo
  try {
    const logoData = createLogoDataURL();
    doc.addImage(logoData, 'PNG', margin, y, 40, 13);
    y += 16;
  } catch (e) { /* skip */ }

  // Título en ámbar
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(180, 120, 0);
  doc.text('Reporte de Inventario de Unidad', margin, y);
  y += 8;

  doc.setDrawColor(180, 120, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentW, y);
  y += 6;

  // Metadata
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Unidad: ${inventoryInfo.unitName}`, margin, y);
  doc.text(`Fecha: ${inventoryInfo.date}`, margin + 90, y);
  y += 5;
  doc.text(`Responsable: ${inventoryInfo.auditor}`, margin, y);
  if (inventoryInfo.duration) {
    doc.text(`Duración: ${inventoryInfo.duration}`, margin + 90, y);
  }
  y += 10;

  // Un cuarto por página (excepto el primero)
  inventoryRooms.forEach((room, rIdx) => {
    if (rIdx > 0) {
      doc.addPage();
      y = margin;
    }

    checkPage(20);
    doc.setFillColor(180, 120, 0);
    doc.rect(margin, y - 1, contentW, 8, 'F');
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(room.roomName.toUpperCase(), margin + 3, y + 5);
    y += 12;

    // Encabezados de columna
    const colX = [margin + 2, margin + 50, margin + 85, margin + 110, margin + 130, margin + 155];
    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Artículo', colX[0], y);
    doc.text('SKU', colX[1], y);
    doc.text('Estado', colX[2], y);
    doc.text('Cant', colX[3], y);
    doc.text('Precio', colX[4], y);
    doc.text('Notas', colX[5], y);
    y += 1.5;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, y, margin + contentW, y);
    y += 3;

    room.items.forEach(item => {
      const statusLabel = STATUS_OPTIONS.find(o => o.value === item.status);
      const hasPhotos = item.photos && item.photos.length > 0;
      const rowHeight = hasPhotos ? 22 : 5;
      checkPage(rowHeight + 4);

      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(50, 50, 50);
      doc.text(item.name, colX[0], y);
      doc.text(item.sku || '', colX[1], y);

      if (item.status) {
        const statusColors = { good: [16, 185, 129], damaged: [239, 68, 68], missing: [245, 158, 11], new: [37, 99, 235] };
        const c = statusColors[item.status] || [100, 100, 100];
        doc.setTextColor(c[0], c[1], c[2]);
        doc.setFont(undefined, 'bold');
      }
      doc.text(statusLabel ? statusLabel.label : '-', colX[2], y);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(50, 50, 50);

      doc.text(String(item.qty), colX[3], y);
      doc.text(item.price ? `$${Number(item.price).toFixed(2)}` : '-', colX[4], y);

      if (item.notes) {
        const lines = doc.splitTextToSize(item.notes, 30);
        doc.text(lines, colX[5], y);
      }

      if (hasPhotos) {
        y += 3;
        item.photos.forEach((photo, pi) => {
          if (pi < 3) {
            try {
              doc.addImage(photo, 'JPEG', colX[1] + (pi * 22), y, 16, 16);
            } catch (e) { /* skip */ }
            if (item.photoTimes && item.photoTimes[pi]) {
              const t = new Date(item.photoTimes[pi]);
              const timeLabel = t.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              let diffLabel = '';
              if (pi > 0 && item.photoTimes[pi - 1]) {
                const diffMs = t - new Date(item.photoTimes[pi - 1]);
                const diffSec = Math.floor(diffMs / 1000);
                const dm = Math.floor(diffSec / 60);
                const ds = diffSec % 60;
                diffLabel = dm > 0 ? ` (+${dm}m${ds}s)` : ` (+${ds}s)`;
              }
              doc.setFontSize(5);
              doc.setTextColor(120, 120, 120);
              doc.text(timeLabel + diffLabel, colX[1] + (pi * 22), y + 18);
              doc.setFontSize(7);
              doc.setTextColor(50, 50, 50);
            }
          }
        });
        y += 22;
      }

      y += 5;
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.1);
      doc.line(colX[0], y - 2, margin + contentW, y - 2);
    });

    y += 3;
  });

  // Pie de página
  checkPage(30);
  y += 5;
  doc.setDrawColor(180, 120, 0);
  doc.setLineWidth(0.3);
  doc.line(margin, y, margin + contentW, y);
  y += 5;

  try {
    const certData = createCertificationsDataURL();
    doc.addImage(certData, 'PNG', margin + 10, y, 120, 12);
    y += 15;
  } catch (e) { /* skip */ }

  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Del Mar — Gestión de Propiedades | ISO 9001 | Marriott | Safe Travels | Airbnb Prohost | APAR | AirDNA', pageW / 2, y, { align: 'center' });

  return doc;
}

// ── Compartir inventario ──

async function shareInventoryFiles() {
  try {
    showToast('⏳ Preparando archivos...');
    const pdfBlob = generateInventoryPDFBlob();
    const fileName = `Inventario_${inventoryInfo.unitName}_${inventoryInfo.date}.pdf`;
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

    const shareData = {
      title: `Inventario - ${inventoryInfo.unitName}`,
      text: `Reporte de inventario: ${inventoryInfo.unitName} (${inventoryInfo.date})`,
      files: [pdfFile],
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      showToast('✅ Compartido');
    } else {
      exportInventoryPDF();
      showToast('📄 Descargado (compartir no disponible)');
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      exportInventoryPDF();
      showToast('📄 PDF descargado');
    }
  }
}
