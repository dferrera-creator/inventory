console.log('inventory-mode.js loaded');

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
let importPhotoMap = {};        // { lowercaseFilename: base64DataUrl }
let newItemQty = 1;
let newItemStatus = null;
let editingItemIdx = null;      // null = nuevo, número = editando existente
let isEditingInventory = false; // true when loading an existing saved inventory

// ── Sugerencias de cuartos ──
const ROOM_SUGGESTIONS = [
  'Cocina', 'Sala', 'Comedor', 'Sala-Comedor',
  'Dormitorio 1', 'Dormitorio 2', 'Dormitorio 3',
  'Baño', 'Baño 2', 'Medio Baño',
  'Lavandería', 'Terraza', 'Garage',
  'Estudio', 'Cuarto de Servicio', 'Pasillo', 'Bodega'
];

// ── Sugerencias de artículos por tipo de cuarto ──
const ITEM_SUGGESTIONS_BY_ROOM = {
  cocina:     ['Refrigerador', 'Estufa', 'Horno', 'Microondas', 'Licuadora', 'Cafetera',
               'Tostadora', 'Extractor / Campana', 'Mesa de cocina', 'Sillas', 'Alacena', 'Fregadero'],
  sala:       ['Sofá', 'Sillón', 'Mesa de centro', 'Televisión', 'Mueble de TV',
               'Lámpara', 'Alfombra', 'Estantería', 'Mesa auxiliar', 'Cortinas'],
  comedor:    ['Mesa de comedor', 'Sillas', 'Aparador', 'Vitrina', 'Lámpara de techo', 'Alfombra'],
  dormitorio: ['Cama matrimonial', 'Cama individual', 'Ropero', 'Cómoda', 'Velador',
               'Espejo', 'Lámpara de noche', 'Escritorio', 'Silla', 'Cortinas', 'Perchero'],
  baño:       ['WC / Inodoro', 'Lavamanos', 'Regadera / Ducha', 'Espejo', 'Toallero',
               'Jabonera', 'Botiquín', 'Canasta de ropa', 'Cortina de baño'],
  lavandería: ['Lavadora', 'Secadora', 'Tabla de planchar', 'Plancha', 'Tendedero', 'Alacena'],
  terraza:    ['Mesa exterior', 'Sillas exteriores', 'Sombrilla', 'Macetas', 'Asador / Parrilla', 'Manguera'],
  garage:     ['Estantería', 'Herramientas', 'Bicicleta', 'Mueble de herramientas', 'Escalera'],
  estudio:    ['Escritorio', 'Silla de oficina', 'Estantería', 'Lámpara', 'Computadora', 'Impresora'],
};

function getRoomItemSuggestions(roomName) {
  const lower = roomName.toLowerCase();
  if (lower.includes('cocina'))                          return ITEM_SUGGESTIONS_BY_ROOM.cocina;
  if (lower.includes('sala') && lower.includes('com'))  return [...ITEM_SUGGESTIONS_BY_ROOM.sala, ...ITEM_SUGGESTIONS_BY_ROOM.comedor];
  if (lower.includes('sala'))                            return ITEM_SUGGESTIONS_BY_ROOM.sala;
  if (lower.includes('comedor'))                         return ITEM_SUGGESTIONS_BY_ROOM.comedor;
  if (lower.includes('dormitorio') || lower.includes('recámara') || lower.includes('recamara') || lower.includes('habitación') || lower.includes('cuarto'))
                                                         return ITEM_SUGGESTIONS_BY_ROOM.dormitorio;
  if (lower.includes('baño') || lower.includes('bano')) return ITEM_SUGGESTIONS_BY_ROOM.baño;
  if (lower.includes('lavandería') || lower.includes('lavanderia') || lower.includes('lavado'))
                                                         return ITEM_SUGGESTIONS_BY_ROOM.lavandería;
  if (lower.includes('terraza') || lower.includes('patio') || lower.includes('jardín') || lower.includes('jardin'))
                                                         return ITEM_SUGGESTIONS_BY_ROOM.terraza;
  if (lower.includes('garage') || lower.includes('garaje'))
                                                         return ITEM_SUGGESTIONS_BY_ROOM.garage;
  if (lower.includes('estudio') || lower.includes('oficina'))
                                                         return ITEM_SUGGESTIONS_BY_ROOM.estudio;
  return [];
}

// ── Descargar plantilla XLSX ──

function _makePlaceholderPhotoBase64() {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 120;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#e5e7eb';
  ctx.fillRect(0, 0, 160, 120);

  // Camera body
  ctx.fillStyle = '#9ca3af';
  ctx.beginPath();
  ctx.roundRect(30, 40, 100, 65, 8);
  ctx.fill();

  // Viewfinder bump
  ctx.fillStyle = '#9ca3af';
  ctx.fillRect(55, 30, 50, 18);
  ctx.beginPath();
  ctx.roundRect(55, 28, 50, 18, 4);
  ctx.fill();

  // Lens ring
  ctx.beginPath();
  ctx.arc(80, 72, 22, 0, Math.PI * 2);
  ctx.fillStyle = '#6b7280';
  ctx.fill();

  // Lens inner
  ctx.beginPath();
  ctx.arc(80, 72, 15, 0, Math.PI * 2);
  ctx.fillStyle = '#374151';
  ctx.fill();

  // Lens highlight
  ctx.beginPath();
  ctx.arc(74, 66, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fill();

  // Flash
  ctx.fillStyle = '#d1d5db';
  ctx.beginPath();
  ctx.roundRect(108, 47, 12, 8, 3);
  ctx.fill();

  // Label
  ctx.fillStyle = '#6b7280';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('FOTO EJEMPLO', 80, 115);

  return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
}

async function downloadXLSXTemplate() {
  if (typeof ExcelJS === 'undefined') {
    showToast('⏳ Cargando librería, intenta de nuevo...');
    return;
  }

  showToast('⏳ Generando plantilla...');
  const placeholderB64 = _makePlaceholderPhotoBase64();

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Del Mar';

  const PHOTO_COL = 8; // column H = Fotos (1-based)
  const PHOTO_COL_IDX = PHOTO_COL - 1; // 0-based for addImage

  function styleHeader(row) {
    row.eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FF1E3A5F' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F0FE' } };
      cell.border = { bottom: { style: 'thin', color: { argb: 'FF2563EB' } } };
    });
  }

  function addPhotoExample(ws, dataRowNumber) {
    const imgId = workbook.addImage({ base64: placeholderB64, extension: 'jpeg' });
    ws.addImage(imgId, {
      tl: { col: PHOTO_COL_IDX, row: dataRowNumber - 1 },
      br: { col: PHOTO_COL_IDX + 1, row: dataRowNumber },
      editAs: 'oneCell',
    });
    ws.getRow(dataRowNumber).height = 70;
  }

  // === Sheet 1: Formato Plano (Recomendado) ===
  const ws1 = workbook.addWorksheet('Formato Plano (Recomendado)');
  ws1.columns = [
    { header: 'Cuarto',    key: 'cuarto',    width: 18 },
    { header: 'Nombre',    key: 'nombre',    width: 26 },
    { header: 'SKU',       key: 'sku',       width: 14 },
    { header: 'Precio',    key: 'precio',    width: 12 },
    { header: 'Cantidad',  key: 'cantidad',  width: 12 },
    { header: 'Estado',    key: 'estado',    width: 14 },
    { header: 'Notas',     key: 'notas',     width: 32 },
    { header: 'Fotos',     key: 'fotos',     width: 42 },
  ];
  styleHeader(ws1.getRow(1));

  const flatRows = [
    ['Cocina', 'Refrigerador Samsung', 'SKU-001', 8500, 1, 'Bueno', 'Samsung 15 pies con hielo', null],
    ['Cocina', 'Estufa Whirlpool',     'SKU-002', 5200, 1, 'Bueno', '4 quemadores, horno eléctrico', null],
    ['Cocina', 'Microondas LG',        'SKU-003', 1800, 1, 'Bueno', '1.2 kW, 20 litros', null],
    ['Cocina', 'Mesa de cocina',       'SKU-004', 2500, 1, 'Dañado', 'Arañazo en superficie', null],
    ['Sala',   'Sofá 3 plazas',        'SKU-010', 12000, 1, 'Bueno', 'Color gris, tela resistente', null],
    ['Sala',   'Mesa de centro',       'SKU-011', 3500, 1, 'Dañado', 'Rayada en esquina derecha', null],
    ['Sala',   'Televisión 55"',       'SKU-012', 8000, 1, 'Bueno', 'Samsung Smart TV 4K', null],
    ['Dormitorio 1', 'Cama matrimonial', 'SKU-020', 9000, 1, 'Bueno', 'Con colchón orthopédico', null],
    ['Dormitorio 1', 'Buró',           'SKU-021', 1500, 2, 'Bueno', 'Color caoba, 2 gavetas', null],
    ['Dormitorio 1', 'Ropero',         'SKU-022', 6500, 1, 'Nuevo', 'Recién instalado', null],
    ['Baño', 'Lavamanos',              'SKU-030', 1200, 1, 'Bueno', 'Porcelana blanca', null],
    ['Baño', 'Espejo',                 'SKU-031', 800,  1, 'Nuevo', 'Marco cromado, 60x80 cm', null],
    ['Baño', 'Toallero',               'SKU-032', 450,  1, 'Bueno', 'Acero inoxidable', null],
    ['Baño', 'Tapete de baño',         'SKU-033', 280,  1, 'Nuevo', 'Color azul, recién colocado', null],
  ];
  flatRows.forEach(r => ws1.addRow(r));

  // Embed placeholder photo in row 2 (first data row = Refrigerador) and row 6 (Sofá)
  addPhotoExample(ws1, 2);
  addPhotoExample(ws1, 6);

  // === Sheets 2–5: Multi-sheet format ===
  const roomData = [
    { name: 'Cocina', rows: [
      ['Refrigerador Samsung', 'SKU-001', 8500, 1, 'Bueno', 'Samsung 15 pies con hielo'],
      ['Estufa Whirlpool',     'SKU-002', 5200, 1, 'Bueno', '4 quemadores, horno eléctrico'],
      ['Microondas LG',        'SKU-003', 1800, 1, 'Bueno', '1.2 kW, 20 litros'],
      ['Mesa de cocina',       'SKU-004', 2500, 1, 'Dañado', 'Arañazo en superficie'],
    ]},
    { name: 'Sala', rows: [
      ['Sofá 3 plazas',  'SKU-010', 12000, 1, 'Bueno', 'Color gris, tela resistente'],
      ['Mesa de centro', 'SKU-011', 3500,  1, 'Dañado', 'Rayada en esquina derecha'],
      ['Televisión 55"', 'SKU-012', 8000,  1, 'Bueno', 'Samsung Smart TV 4K'],
    ]},
    { name: 'Dormitorio 1', rows: [
      ['Cama matrimonial', 'SKU-020', 9000, 1, 'Bueno', 'Con colchón orthopédico'],
      ['Buró',             'SKU-021', 1500, 2, 'Bueno', 'Color caoba, 2 gavetas'],
      ['Ropero',           'SKU-022', 6500, 1, 'Nuevo', 'Recién instalado'],
    ]},
    { name: 'Baño', rows: [
      ['Lavamanos',      'SKU-030', 1200, 1, 'Bueno', 'Porcelana blanca'],
      ['Espejo',         'SKU-031', 800,  1, 'Nuevo', 'Marco cromado, 60x80 cm'],
      ['Toallero',       'SKU-032', 450,  1, 'Bueno', 'Acero inoxidable'],
      ['Tapete de baño', 'SKU-033', 280,  1, 'Nuevo', 'Color azul, recién colocado'],
    ]},
  ];

  roomData.forEach(({ name, rows }) => {
    const ws = workbook.addWorksheet(name);
    ws.columns = [
      { header: 'Nombre',   key: 'nombre',   width: 26 },
      { header: 'SKU',      key: 'sku',       width: 14 },
      { header: 'Precio',   key: 'precio',    width: 12 },
      { header: 'Cantidad', key: 'cantidad',  width: 12 },
      { header: 'Estado',   key: 'estado',    width: 14 },
      { header: 'Notas',    key: 'notas',     width: 32 },
      { header: 'Fotos',    key: 'fotos',     width: 42 },
    ];
    styleHeader(ws.getRow(1));
    rows.forEach(r => ws.addRow([...r, null]));
    // Embed placeholder in first data row of each room sheet
    addPhotoExample(ws, 2);
  });

  // === Guide sheet ===
  const wsGuide = workbook.addWorksheet('Cómo Agregar Fotos');
  const guideLines = [
    ['GUÍA: Cómo AGREGAR FOTOS a tu Inventario'],
    [''],
    ['OPCIÓN A — Insertar imagen directamente en la celda (más fácil):'],
    ['  1. En Excel: selecciona la celda en la columna "Fotos"'],
    ['  2. Menú Insertar → Imagen → Insertar imagen en celda'],
    ['  3. Elige la foto del artículo'],
    ['  4. Guarda el archivo e impórtalo en la app'],
    ['  → La app extrae las fotos automáticamente'],
    [''],
    ['OPCIÓN B — Referenciar fotos por nombre de archivo:'],
    ['  1. Toma fotos y guárdalas con nombres descriptivos'],
    ['     Ejemplo: "refrigerador.jpg", "sofa-frente.jpg"'],
    ['  2. En la columna "Fotos" escribe el nombre del archivo'],
    ['     Para varias fotos: "foto1.jpg, foto2.jpg"'],
    ['  3. En la app toca "Agregar Fotos" y selecciona los archivos'],
    ['  4. Luego importa el Excel → las fotos se asignan automáticamente'],
    [''],
    ['NOTA: Ambas opciones se pueden combinar en el mismo archivo.'],
  ];
  guideLines.forEach(([text]) => {
    const row = wsGuide.addRow([text || '']);
    if (text && text.startsWith('GUÍA')) {
      row.getCell(1).font = { bold: true, size: 13, color: { argb: 'FF1E3A5F' } };
    } else if (text && (text.startsWith('OPCIÓN') || text.startsWith('NOTA'))) {
      row.getCell(1).font = { bold: true };
    }
  });
  wsGuide.getColumn(1).width = 65;

  // === Estado reference sheet ===
  const wsEstado = workbook.addWorksheet('Valores de Estado');
  wsEstado.columns = [
    { header: 'Estado (valor en Excel)', width: 28 },
    { header: 'Significado',             width: 44 },
  ];
  styleHeader(wsEstado.getRow(1));
  [
    ['Bueno',         'El artículo está en buenas condiciones'],
    ['Dañado',        'El artículo tiene daños visibles'],
    ['Faltante',      'El artículo no está presente'],
    ['Nuevo',         'Artículo nuevo o recién adquirido'],
    ['(dejar vacío)', 'Sin estado registrado'],
  ].forEach(r => wsEstado.addRow(r));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Plantilla_Inventario_DelMar.xlsx';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 Plantilla descargada');
}

// ── Importar inventario desde XLSX ──
// Soporta imágenes insertadas directamente en celdas (ExcelJS extrae automáticamente)
// Formato: Hoja única con columna "Cuarto", o múltiples hojas (una por cuarto)
// Columnas: Cuarto | Nombre | SKU | Precio | Cantidad | Estado | Notas | Fotos(opcional)

async function importInventoryFromXLSX(input) {
  const file = input.files[0];
  if (!file) return;

  if (typeof ExcelJS === 'undefined') {
    showToast('⏳ Cargando librería, intenta de nuevo...');
    input.value = '';
    return;
  }

  showToast('⏳ Leyendo archivo...');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const rooms = [];
    const sheetNames = workbook.worksheets.map(ws => ws.name);

    // Filter out guide/reference sheets (non-data sheets)
    const dataSheets = workbook.worksheets.filter(ws => {
      const n = ws.name.toLowerCase();
      return !n.includes('estado') && !n.includes('guía') && !n.includes('guia') &&
             !n.includes('fotos') && !n.includes('valores') && !n.includes('referencia');
    });

    // Build a per-sheet map of rowNumber -> [base64 images] from embedded images
    function buildImageMapForSheet(ws) {
      const map = {}; // rowNumber (1-based) -> [base64DataUrl, ...]
      const images = ws.getImages ? ws.getImages() : [];
      images.forEach(img => {
        const imageData = workbook.getImage(img.imageId);
        if (!imageData || !imageData.buffer) return;
        const ext = (imageData.extension || 'jpeg').replace('jpg', 'jpeg');
        const b64 = _arrayBufferToBase64(imageData.buffer);
        const dataUrl = `data:image/${ext};base64,${b64}`;
        // nativeRowFrom is 0-based; +1 to match ExcelJS row numbers (1-based)
        const row = (img.range.tl.nativeRowFrom || img.range.tl.row || 0) + 1;
        if (!map[row]) map[row] = [];
        map[row].push(dataUrl);
      });
      return map;
    }

    if (dataSheets.length === 1 && _sheetHasCuartoColumn(dataSheets[0])) {
      // Single-sheet flat format
      const ws = dataSheets[0];
      const imgMap = buildImageMapForSheet(ws);
      const headerRow = ws.getRow(1);
      const headers = _extractHeaders(headerRow);
      const roomMap = {};
      ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // skip header
        const rowData = _rowToObject(row, headers);
        const roomName = (rowData['Cuarto'] || rowData['Room'] || '').toString().trim();
        const itemName = (rowData['Nombre'] || rowData['Name'] || rowData['Artículo'] || '').toString().trim();
        if (!roomName || !itemName) return;
        if (!roomMap[roomName]) roomMap[roomName] = [];
        const item = parseRowToItem(rowData);
        // Merge embedded images (prepend before any filename-matched photos)
        const embeddedPhotos = (imgMap[rowNumber] || []);
        item.photos = [...embeddedPhotos, ...item.photos];
        item.photoTimes = [
          ...embeddedPhotos.map(() => new Date().toISOString()),
          ...item.photoTimes,
        ];
        roomMap[roomName].push(item);
      });
      Object.entries(roomMap).forEach(([roomName, items]) => {
        rooms.push(makeImportRoom(roomName, items));
      });
    } else {
      // Multi-sheet format: each sheet = a room
      dataSheets.forEach(ws => {
        const imgMap = buildImageMapForSheet(ws);
        const headerRow = ws.getRow(1);
        const headers = _extractHeaders(headerRow);
        const items = [];
        ws.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          const rowData = _rowToObject(row, headers);
          const itemName = (rowData['Nombre'] || rowData['Name'] || rowData['Artículo'] || '').toString().trim();
          if (!itemName) return;
          const item = parseRowToItem(rowData);
          const embeddedPhotos = (imgMap[rowNumber] || []);
          item.photos = [...embeddedPhotos, ...item.photos];
          item.photoTimes = [
            ...embeddedPhotos.map(() => new Date().toISOString()),
            ...item.photoTimes,
          ];
          items.push(item);
        });
        if (items.length > 0) rooms.push(makeImportRoom(ws.name, items));
      });
    }

    if (rooms.length === 0) {
      showToast('⚠️ No se encontraron datos en el archivo');
      input.value = '';
      return;
    }

    const unitName = file.name.replace(/\.(xlsx|xls)$/i, '').replace(/[_-]/g, ' ');
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    inventoryInfo = {
      unitId: unitName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now(),
      unitName,
      date: dateStr,
      auditor: document.getElementById('inv-auditor').value.trim() || '',
    };
    inventoryRooms = rooms;
    isEditingInventory = false;

    document.getElementById('inv-unit-name').value = unitName;
    document.getElementById('inv-date').value = dateStr;
    startTimer();
    document.getElementById('inv-unit-label').textContent = unitName;
    showStep('step-inv-rooms');
    renderInventoryRooms();

    const totalItems = rooms.reduce((s, r) => s + r.items.length, 0);
    const totalPhotos = rooms.reduce((s, r) => s + r.items.reduce((ss, i) => ss + i.photos.length, 0), 0);
    const photoMsg = totalPhotos > 0 ? `, ${totalPhotos} fotos` : '';
    showToast(`✅ Importado: ${rooms.length} cuartos, ${totalItems} artículos${photoMsg}`);

    _autosaveInvDraft();

    if (isAPIReady()) {
      try {
        await saveInventory(inventoryInfo);
      } catch (err) {
        console.error('Error saving imported inventory to cloud:', err);
      }
    }

    importPhotoMap = {};
    document.getElementById('import-photos-label').textContent = 'Agregar Fotos';
  } catch (err) {
    console.error('Error importando XLSX:', err);
    showToast('❌ Error al leer el archivo Excel');
  }
  input.value = '';
}

// ── Helpers for ExcelJS import ──

function _arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function _extractHeaders(headerRow) {
  const headers = {};
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value) headers[colNumber] = cell.value.toString().trim();
  });
  return headers;
}

function _rowToObject(row, headers) {
  const obj = {};
  Object.entries(headers).forEach(([colNumber, headerName]) => {
    const cell = row.getCell(parseInt(colNumber));
    obj[headerName] = cell.value !== null && cell.value !== undefined ? cell.value : '';
  });
  return obj;
}

function _sheetHasCuartoColumn(ws) {
  const headerRow = ws.getRow(1);
  let found = false;
  headerRow.eachCell(cell => {
    const v = (cell.value || '').toString().toLowerCase();
    if (v === 'cuarto' || v === 'room') found = true;
  });
  return found;
}

function parseRowToItem(row) {
  const name = (row['Nombre'] || row['Name'] || row['nombre'] || row['name'] || row['Artículo'] || row['articulo'] || '').toString().trim();
  const statusRaw = (row['Estado'] || row['Status'] || row['estado'] || row['status'] || '').toString().trim().toLowerCase();
  const statusMap = { bueno: 'good', good: 'good', dañado: 'damaged', damaged: 'damaged', faltante: 'missing', missing: 'missing', nuevo: 'new', 'new': 'new' };

  const photos = [];
  const photoTimes = [];
  const photosRaw = (row['Fotos'] || row['Photos'] || row['fotos'] || row['photos'] || '').toString().trim();
  if (photosRaw) {
    photosRaw.split(',').forEach(filename => {
      const fn = filename.trim().toLowerCase();
      if (fn && importPhotoMap[fn]) {
        photos.push(importPhotoMap[fn]);
        photoTimes.push(new Date().toISOString());
      }
    });
  }

  return {
    itemId: 'imp-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
    name,
    sku: (row['SKU'] || row['sku'] || row['Código'] || row['codigo'] || '').toString().trim(),
    price: parseFloat(row['Precio'] || row['Price'] || row['precio'] || row['price'] || 0) || 0,
    qty: parseInt(row['Cantidad'] || row['Qty'] || row['cantidad'] || row['qty'] || 1) || 1,
    status: statusMap[statusRaw] || null,
    notes: (row['Notas'] || row['Notes'] || row['notas'] || row['notes'] || '').toString().trim(),
    photos,
    photoTimes,
  };
}

function makeImportRoom(name, items) {
  return {
    roomId: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now() + Math.random().toString(36).slice(2, 6),
    roomName: name,
    items,
  };
}

function loadImportPhotos(input) {
  const files = Array.from(input.files || []);
  if (!files.length) {
    showToast('⚠️ No se seleccionaron fotos');
    input.value = '';
    return;
  }

  let loadedCount = 0;
  let remainingFiles = files.length;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      compressImage(e.target.result, 800, 0.7, (compressed) => {
        importPhotoMap[file.name.toLowerCase()] = compressed;
        loadedCount++;
        if (loadedCount === remainingFiles) {
          document.getElementById('import-photos-label').textContent = `Fotos (${loadedCount})`;
          showToast(`📷 ${loadedCount} foto${loadedCount === 1 ? '' : 's'} cargada${loadedCount === 1 ? '' : 's'}`);
        }
      });
    };
    reader.readAsDataURL(file);
  });

  input.value = '';
}

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
    // Pre-populate with default rooms
    const makeRoom = name => ({
      roomId: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now() + Math.random().toString(36).slice(2,6),
      roomName: name,
      items: []
    });
    inventoryRooms = [makeRoom('Cocina'), makeRoom('Dormitorio 1'), makeRoom('Baño')];
    isEditingInventory = false;

    startTimer();
    document.getElementById('inv-unit-label').textContent = unitName;
    showStep('step-inv-rooms');
    renderInventoryRooms();
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
    finishBtn.innerHTML = isEditingInventory
      ? '<span class="material-symbols-rounded">save</span> Guardar Cambios'
      : '<span class="material-symbols-rounded">cloud_upload</span> Guardar Inventario';
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
  renderRoomSuggestions();
  document.getElementById('add-room-modal').classList.add('visible');
  setTimeout(() => document.getElementById('new-room-name').focus(), 100);
}

function renderRoomSuggestions() {
  const existing = new Set(inventoryRooms.map(r => r.roomName));
  const available = ROOM_SUGGESTIONS.filter(s => !existing.has(s));
  const container = document.getElementById('room-suggestions');
  if (!container) return;
  if (available.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = available.map(s =>
    `<button class="suggestion-chip" onclick="pickRoomSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`
  ).join('');
}

function pickRoomSuggestion(name) {
  document.getElementById('new-room-name').value = name;
  document.getElementById('new-room-name').focus();
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
        <span class="material-symbols-rounded">add_circle_outline</span>
        <p>Toca <strong>Agregar Artículo</strong> para comenzar</p>
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
  // Always start with optional fields collapsed
  document.getElementById('optional-fields').style.display = 'none';
  const toggleBtn = document.getElementById('toggle-optional-btn');
  if (toggleBtn) toggleBtn.classList.remove('open');
  renderItemSuggestions();
  document.getElementById('new-item-name').focus();
}

function renderItemSuggestions() {
  const container = document.getElementById('item-suggestions');
  if (!container) return;
  const room = inventoryRooms[currentInvRoomIdx];
  if (!room) { container.innerHTML = ''; return; }
  const suggestions = getRoomItemSuggestions(room.roomName);
  const existing = new Set(room.items.map(i => i.name));
  const available = suggestions.filter(s => !existing.has(s));
  if (available.length === 0) { container.innerHTML = ''; return; }
  container.innerHTML = `<div class="suggestion-label">Sugerencias:</div>` +
    available.map(s =>
      `<button class="suggestion-chip" onclick="pickItemSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>`
    ).join('');
}

function toggleOptionalFields() {
  const optFields = document.getElementById('optional-fields');
  const toggleBtn = document.getElementById('toggle-optional-btn');
  const isOpen = optFields.style.display !== 'none';
  optFields.style.display = isOpen ? 'none' : 'block';
  toggleBtn.classList.toggle('open', !isOpen);
}

function pickItemSuggestion(name) {
  document.getElementById('new-item-name').value = name;
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
  // Hide optional fields
  const optFields = document.getElementById('optional-fields');
  if (optFields) optFields.style.display = 'none';
  const toggleBtn = document.getElementById('toggle-optional-btn');
  if (toggleBtn) toggleBtn.classList.remove('open');
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
      : 'item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
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
  _autosaveInvDraft();
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

  // Show optional fields if item already has SKU or price
  const optFields = document.getElementById('optional-fields');
  const toggleBtn = document.getElementById('toggle-optional-btn');
  if (optFields) {
    const hasOptional = !!(item.sku || item.price);
    optFields.style.display = hasOptional ? 'block' : 'none';
    if (toggleBtn) toggleBtn.classList.toggle('open', hasOptional);
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

// ── Finalizar inventario y guardar en base de datos ──

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
  inventoryInfo.type = 'inventory';
  inventoryInfo.rooms = inventoryRooms;

  // Mostrar pantalla de exportación primero (modo inventario)
  showInventoryExport();

  // Intentar guardar en base de datos en paralelo
  if (isAPIReady()) {
    try {
      await saveInventory(inventoryInfo);
      showToast(isEditingInventory ? '✅ Cambios guardados en la nube' : '☁️ Inventario guardado en la nube');
    } catch (err) {
      console.error('Error guardando en base de datos:', err);
      showToast('⚠️ No se pudo guardar en la nube');
    }
  } else {
    showToast('ℹ️ No se pudo conectar con la base de datos');
  }
  localStorage.removeItem('delmar_draft_inventory');
}

// ── Auto-save borrador inventario ──

function _autosaveInvDraft() {
  try {
    const draft = {
      type: 'inventory',
      unitName: inventoryInfo.unitName || '',
      inventoryInfo: { ...inventoryInfo },
      inventoryRooms: JSON.parse(JSON.stringify(inventoryRooms)),
      savedAt: Date.now(),
    };
    localStorage.setItem('delmar_draft_inventory', JSON.stringify(draft));
  } catch (e) {}
}

function resumeInventoryDraft(draft) {
  inventoryInfo = draft.inventoryInfo || {};
  inventoryRooms = draft.inventoryRooms || [];
  currentMode = 'inventory';
  showToast('📋 Retomando inventario...');
  showStep('step-inv-rooms');
  renderInventoryRooms();
}

window.resumeInventoryDraft = resumeInventoryDraft;

// ── Editar inventario existente ──

async function editInventory(unitId) {
  showToast('⏳ Cargando inventario...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) {
      showToast('❌ Inventario no encontrado');
      return;
    }

    // Restore metadata (preserve original unitId so save overwrites same record)
    inventoryInfo = {
      unitId: doc.unitId,
      unitName: doc.unitName,
      date: doc.date,
      auditor: doc.auditor,
    };

    // Deep-copy rooms and items
    inventoryRooms = (doc.rooms || []).map(r => ({
      ...r,
      items: (r.items || []).map(i => ({ ...i, photos: [...(i.photos || [])], photoTimes: [...(i.photoTimes || [])] }))
    }));

    isEditingInventory = true;

    startTimer();
    document.getElementById('inv-unit-label').textContent = doc.unitName;
    showStep('step-inv-rooms');
    renderInventoryRooms();
    showToast(`✏️ Editando "${doc.unitName}"`);
  } catch (err) {
    console.error('Error cargando inventario para editar:', err);
    showToast('❌ Error al cargar inventario');
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

async function exportInventoryXLSX() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Del Mar';

  for (const room of inventoryRooms) {
    const ws = workbook.addWorksheet(room.roomName.substring(0, 31));
    ws.columns = [
      { width: 30 }, // Artículo
      { width: 14 }, // SKU
      { width: 12 }, // Estado
      { width: 10 }, // Tipo
      { width: 10 }, // Cantidad
      { width: 12 }, // Precio
      { width: 40 }, // Notas
      { width: 14 }, // Foto
    ];

    // Title
    ws.addRow(['DEL MAR — Inventario de Unidad', '', '', '', '', '', '', '']);
    ws.mergeCells(1, 1, 1, 8);
    ws.getRow(1).getCell(1).font = { bold: true, size: 13, color: { argb: 'FFFFFFFF' } };
    ws.getRow(1).getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A5F' } };

    ws.addRow([`Unidad: ${inventoryInfo.unitName}`, '', `Fecha: ${inventoryInfo.date}`, '', `Responsable: ${inventoryInfo.auditor}`, '', '', '']);
    ws.addRow([inventoryInfo.duration ? `Duración: ${inventoryInfo.duration}` : '', '', '', '', '', '', '', '']);
    ws.addRow([]);

    const hdrRow = ws.addRow(['Artículo', 'SKU', 'Estado', 'Tipo', 'Cantidad', 'Precio ($)', 'Notas', 'Foto']);
    hdrRow.eachCell(cell => {
      cell.font = { bold: true, color: { argb: 'FF1E3A5F' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F0FE' } };
    });

    let rowNum = 6;
    for (const item of room.items) {
      const statusLabel = (typeof STATUS_OPTIONS !== 'undefined' ? STATUS_OPTIONS : []).find(o => o.value === item.status);
      const hasPhoto = item.photos && item.photos.length > 0;
      ws.addRow([
        item.name,
        item.sku || '',
        statusLabel ? statusLabel.label : '',
        'Variable',
        item.qty,
        item.price ? Number(item.price) : 0,
        item.notes || '',
        '',
      ]);
      if (hasPhoto) {
        ws.getRow(rowNum).height = 65;
        try {
          const b64 = item.photos[0].split(',')[1];
          const imgId = workbook.addImage({ base64: b64, extension: 'jpeg' });
          ws.addImage(imgId, { tl: { col: 7, row: rowNum - 1 }, br: { col: 8, row: rowNum }, editAs: 'oneCell' });
        } catch (_) {}
      }
      rowNum++;
    }

    ws.addRow([]);
    ws.addRow(['ISO 9001 | Marriott International | Safe Travels | Airbnb Prohost | APAR | AirDNA']);
    ws.mergeCells(ws.rowCount, 1, ws.rowCount, 8);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Inventario_${inventoryInfo.unitName}_${inventoryInfo.date}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📊 Excel con fotos descargado');
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

window.startInventoryMode = startInventoryMode;
window.showAddRoomModal = showAddRoomModal;
window.closeAddRoomModal = closeAddRoomModal;
window.confirmAddRoom = confirmAddRoom;
window.openInventoryRoom = openInventoryRoom;
window.backToInventoryRooms = backToInventoryRooms;
window.showAddItemPanel = showAddItemPanel;
window.hideAddItemPanel = hideAddItemPanel;
window.changeNewItemQty = changeNewItemQty;
window.setNewItemStatus = setNewItemStatus;
window.triggerInvPhoto = triggerInvPhoto;
window.handleInvPhoto = handleInvPhoto;
window.removeInvPhoto = removeInvPhoto;
window.saveInventoryItem = saveInventoryItem;
window.editInventoryItem = editInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;
window.finishInventory = finishInventory;
window.exportInventoryXLSX = exportInventoryXLSX;
window.exportInventoryPDF = exportInventoryPDF;
window.shareInventoryFiles = shareInventoryFiles;
