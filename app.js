// ══════════════════════════════════════════
// INSPECCIÓN — APP REDISEÑADA v2
// Iconos Material Symbols, interfaz en español,
// cronómetro, Web Share API, cuartos dinámicos,
// descripciones de artículos, exportes mejorados
// ══════════════════════════════════════════

// ── Contraseña de eliminación (SHA-256) ──
const DELETE_PASSWORD_HASH = 'e901284b0c60f39416612ccd9ba16960d11c28b545d2b8f7f47362a171d8d84e';

async function hashString(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

let _pendingDeleteUnitId = null;

function showDeleteModal(unitId, description) {
  _pendingDeleteUnitId = unitId;
  document.getElementById('delete-modal-desc').textContent = description || 'Esta acción no se puede deshacer.';
  document.getElementById('delete-password-input').value = '';
  document.getElementById('delete-pw-error').style.display = 'none';
  document.getElementById('delete-modal').classList.add('visible');
  setTimeout(() => document.getElementById('delete-password-input').focus(), 100);
}

function closeDeleteModal() {
  _pendingDeleteUnitId = null;
  document.getElementById('delete-modal').classList.remove('visible');
}

function toggleDeletePwVisibility() {
  const input = document.getElementById('delete-password-input');
  const eye = document.getElementById('delete-pw-eye');
  if (input.type === 'password') {
    input.type = 'text';
    eye.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    eye.textContent = 'visibility';
  }
}

async function confirmDelete() {
  const pw = document.getElementById('delete-password-input').value;
  const errEl = document.getElementById('delete-pw-error');

  const hash = await hashString(pw);
  if (hash !== DELETE_PASSWORD_HASH) {
    errEl.style.display = 'block';
    document.getElementById('delete-password-input').value = '';
    document.getElementById('delete-password-input').focus();
    return;
  }

  const unitId = _pendingDeleteUnitId;
  closeDeleteModal();

  try {
    await deleteRecord(unitId);
    _allRecords = _allRecords.filter(r => r.unitId !== unitId);
    showToast('🗑️ Registro eliminado');

    // Refresh current view
    const unitTitle = document.getElementById('historico-unit-title').textContent;
    const remaining = _allRecords.filter(r => r.unitName === unitTitle);
    if (remaining.length === 0) {
      showStep('step-historico');
      renderHistoricoList();
    } else {
      openHistoricoUnit(unitTitle);
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Error al eliminar: ' + err.message);
  }
}

// ── Mapeo de iconos Material Symbols por artículo ──

const ITEM_ICONS = {
  'Estufa': 'local_fire_department',
  'Stove': 'local_fire_department',
  'Parrillas estufa': 'grid_on',
  'Stove grates': 'grid_on',
  'Refrigerador': 'kitchen',
  'Refrigerator': 'kitchen',
  'Frigobar': 'kitchen',
  'Mini fridge': 'kitchen',
  'Microondas': 'microwave',
  'Microwave': 'microwave',
  'Horno': 'oven_gen',
  'Oven': 'oven_gen',
  'Campana extractora': 'air',
  'Range hood': 'air',
  'Lavavajillas': 'dishwasher_gen',
  'Dishwasher': 'dishwasher_gen',
  'Licuadora': 'blender',
  'Blender': 'blender',
  'Cafetera': 'coffee',
  'Coffee maker': 'coffee',
  'Tostador': 'breakfast_dining',
  'Toaster': 'breakfast_dining',
  'Fregadero': 'water_drop',
  'Sink': 'water_drop',
  'Tarja': 'countertops',
  'Counter sink': 'countertops',
  'Barra': 'countertops',
  'Counter bar': 'countertops',
  'Sillas de barra': 'chair',
  'Bar stools': 'chair',
  'Bote de basura': 'delete',
  'Trash can': 'delete',
  'Comal': 'skillet',
  'Griddle': 'skillet',
  'Salero / pimentero': 'lunch_dining',
  'Salt & pepper': 'lunch_dining',
  'Escurridor': 'filter_alt',
  'Dish rack': 'filter_alt',
  'Manteles': 'table_restaurant',
  'Tablecloths': 'table_restaurant',
  'Servilletero': 'note',
  'Napkin holder': 'note',
  'Tapetes': 'grid_on',
  'Placemats': 'grid_on',
  'Tapa de microondas': 'microwave',
  'Microwave cover': 'microwave',
  'Destapa corcho': 'liquor',
  'Corkscrew': 'liquor',
  'Abrelatas': 'build',
  'Can opener': 'build',
  'Cuchara sopera': 'flatware',
  'Soup spoon': 'flatware',
  'Cuchara cafetera': 'coffee',
  'Coffee spoon': 'coffee',
  'Tenedor': 'flatware',
  'Fork': 'flatware',
  'Cuchillo comedor': 'flatware',
  'Dinner knife': 'flatware',
  'Cuchillo cocina': 'flatware',
  'Kitchen knife': 'flatware',
  'Cuchillo carne': 'flatware',
  'Steak knife': 'flatware',
  'Exprimidor limones': 'water_lux',
  'Lemon squeezer': 'water_lux',
  'Cucharones / palas': 'flatware',
  'Ladles / spatulas': 'flatware',
  'Organizador de cubiertos': 'flatware',
  'Cutlery organizer': 'flatware',
  'Ollas con tapa': 'skillet',
  'Pots with lids': 'skillet',
  'Sartenes': 'skillet',
  'Skillets': 'skillet',
  'Tabla para picar': 'carpenter',
  'Cutting board': 'carpenter',
  'Accesorio vaporera': 'cooking',
  'Steamer accessory': 'cooking',
  'Bowl ensaladera': 'ramen_dining',
  'Salad bowl': 'ramen_dining',
  'Jarras': 'local_bar',
  'Pitchers': 'local_bar',
  'Base cosas calientes': 'local_fire_department',
  'Trivet': 'local_fire_department',
  'Base servitoallas': 'dry',
  'Towel holder': 'dry',
  'Plato extendido chico': 'dining',
  'Small plate': 'dining',
  'Plato extendido mediano': 'dining',
  'Medium plate': 'dining',
  'Plato extendido grande': 'dining',
  'Large plate': 'dining',
  'Plato hondo': 'ramen_dining',
  'Deep plate': 'ramen_dining',
  'Vaso chico': 'local_bar',
  'Small glass': 'local_bar',
  'Vaso mediano': 'local_bar',
  'Medium glass': 'local_bar',
  'Taza': 'coffee',
  'Mug': 'coffee',
  'Copas': 'wine_bar',
  'Wine glasses': 'wine_bar',
  'Copas de vino': 'wine_bar',
  'Utensilios': 'flatware',
  'Utensils set': 'flatware',
  'Vajilla': 'dining',
  'Dinnerware set': 'dining',
  'Vasos': 'local_bar',
  'Glasses set': 'local_bar',
  'Ollas y sartenes': 'skillet',
  'Pots & pans': 'skillet',
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
  'Adornos': 'local_florist',
  'Decorations': 'local_florist',
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
  'Cama individual': 'single_bed',
  'Twin bed': 'single_bed',
  'Cama': 'bed',
  'Bed': 'bed',
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
  'Control de TV': 'settings_remote',
  'TV remote': 'settings_remote',
  'Módem Internet': 'router',
  'Internet modem': 'router',
  'Convertidor o repetidora (Roku)': 'cast',
  'Streaming device (Roku)': 'cast',
  'Lámpara colgante': 'light',
  'Pendant lamp': 'light',
  'Cuadros': 'image',
  'Wall art': 'image',
  'Espejos': 'window',
  'Mirrors': 'window',
  'Jarrones': 'vase',
  'Vases': 'vase',
  'Floreros': 'local_florist',
  'Flower vases': 'local_florist',
  'Portavela': 'candle',
  'Candle holder': 'candle',
  'Dispensador de jabón': 'soap',
  'Soap dispenser': 'soap',
  'Dispensador jabón': 'soap',
  'Vaso plástico': 'local_bar',
  'Plastic cup': 'local_bar',
  'Cuchillo pan': 'flatware',
  'Bread knife': 'flatware',
  'Tequilero': 'local_bar',
  'Shot glass': 'local_bar',
  'Tenedor ensalada (chico)': 'flatware',
  'Salad fork': 'flatware',
  'Pelapapas': 'build',
  'Peeler': 'build',
  'Rallador de queso': 'build',
  'Cheese grater': 'build',
  'Colador': 'filter_alt',
  'Strainer': 'filter_alt',
  'Microfibra cocina': 'dry_cleaning',
  'Kitchen microfiber': 'dry_cleaning',
  'Secador trastes': 'dry',
  'Dish drying towel': 'dry',
  'Tumbona': 'deck',
  'Lounge chair': 'deck',
  'Echadero': 'deck',
  'Daybed': 'deck',
  'Base de cama': 'bed',
  'Bed frame': 'bed',
  'Secadora de cabello': 'air',
  'Hair dryer': 'air',
  'Plancha': 'iron',
  'Iron': 'iron',
  'Accesorio colgar plancha': 'checkroom',
  'Iron hanger': 'checkroom',
  'Burro planchar': 'iron',
  'Ironing board': 'iron',
  'Caja fuerte': 'lock',
  'Safe box': 'lock',
  'Porta shampoo': 'shelves',
  'Shampoo holder': 'shelves',
  'Cepillo WC': 'cleaning_services',
  'Toilet brush': 'cleaning_services',
  'Puerta vidrio': 'door_front',
  'Glass door': 'door_front',
  'Puerta acrílico': 'door_front',
  'Acrylic door': 'door_front',
  'Lavadora': 'local_laundry_service',
  'Washing machine': 'local_laundry_service',
  'Secadora': 'local_laundry_service',
  'Dryer': 'local_laundry_service',
  'Centro de lavado': 'local_laundry_service',
  'Laundry center': 'local_laundry_service',
  'Escoba': 'cleaning_services',
  'Broom': 'cleaning_services',
  'Recogedor': 'cleaning_services',
  'Dustpan': 'cleaning_services',
  'Trapeador': 'cleaning_services',
  'Mop': 'cleaning_services',
  'Sponge mop': 'cleaning_services',
  'Cubeta': 'cleaning_bucket',
  'Bucket': 'cleaning_bucket',
  'Colgador escobas': 'checkroom',
  'Broom hanger': 'checkroom',
  'Bomba WC': 'plumbing',
  'Toilet plunger': 'plumbing',
};

// ── Configuración visual de cuartos ──

const ROOM_CONFIG = {
  'kitchen': { icon: 'cooking', name: 'Cocina', shortName: 'Cocina' },
  'living': { icon: 'weekend', name: 'Sala / Comedor', shortName: 'Sala' },
  'terrace': { icon: 'deck', name: 'Terraza', shortName: 'Terraza' },
  'bedrooms': { icon: 'bed', name: 'Recámaras', shortName: 'Recámaras' },
  'bathrooms': { icon: 'shower', name: 'Baños', shortName: 'Baños' },
  'laundry': { icon: 'local_laundry_service', name: 'Lavandería', shortName: 'Lavandería' },
};

// ── Colores por categoría de cuarto ──

const ROOM_COLORS = {
  'kitchen': '#f59e0b',
  'living': '#e67e22',
  'terrace': '#27ae60',
  'bedrooms': '#8b5cf6',
  'bathrooms': '#06b6d4',
  'laundry': '#e74c3c',
};

// ── Colores dinámicos para cuartos de usuario ──
const DYNAMIC_ROOM_COLORS = [
  '#f59e0b', '#e67e22', '#27ae60', '#8b5cf6',
  '#06b6d4', '#e74c3c', '#ec4899', '#0ea5e9'
];

// ── Plantillas de artículos con hints y subcategorías ──

const KITCHEN_ITEMS = [
  { sub: 'Electrodomésticos', name: 'Estufa / Stove', type: 'fixed', qty: 1, hint: 'Quemadores, perillas, limpieza' },
  { sub: 'Electrodomésticos', name: 'Parrillas estufa / Stove grates', type: 'fixed', qty: 1, hint: 'Completas, sin grasa acumulada' },
  { sub: 'Electrodomésticos', name: 'Campana extractora / Range hood', type: 'fixed', qty: 1, hint: 'Enciende, filtros, succión' },
  { sub: 'Electrodomésticos', name: 'Horno / Oven', type: 'fixed', qty: 1, hint: 'Calienta, puerta cierra bien' },
  { sub: 'Electrodomésticos', name: 'Microondas / Microwave', type: 'fixed', qty: 1, hint: 'Funciona, plato giratorio, limpio' },
  { sub: 'Electrodomésticos', name: 'Licuadora / Blender', type: 'variable', qty: 1, hint: 'Motor, vaso, tapa, cuchillas' },
  { sub: 'Electrodomésticos', name: 'Cafetera / Coffee maker', type: 'variable', qty: 1, hint: 'Funciona, limpia, completa' },
  { sub: 'Electrodomésticos', name: 'Lavavajillas / Dishwasher', type: 'fixed', qty: 1, hint: 'Ciclo completo, sin fugas' },
  { sub: 'Electrodomésticos', name: 'Refrigerador / Refrigerator', type: 'fixed', qty: 1, hint: 'Enfría, empaque puerta, interior' },
  { sub: 'Electrodomésticos', name: 'Frigobar / Mini fridge', type: 'fixed', qty: 0, hint: 'Enfría, limpio, empaque' },
  { sub: 'Accesorios', name: 'Comal / Griddle', type: 'variable', qty: 0, hint: 'Sin daño, antiadherente' },
  { sub: 'Accesorios', name: 'Salero / pimentero / Salt & pepper', type: 'variable', qty: 0, hint: 'Completos, funcionan' },
  { sub: 'Accesorios', name: 'Escurridor / Dish rack', type: 'variable', qty: 1, hint: 'Completo, limpio' },
  { sub: 'Accesorios', name: 'Manteles / Tablecloths', type: 'variable', qty: 0, hint: 'Limpios, sin manchas' },
  { sub: 'Accesorios', name: 'Servilletero / Napkin holder', type: 'variable', qty: 1, hint: 'Presente, buen estado' },
  { sub: 'Accesorios', name: 'Tapetes / Placemats', type: 'variable', qty: 0, hint: 'Limpios, cantidad correcta' },
  { sub: 'Accesorios', name: 'Tapa de microondas / Microwave cover', type: 'variable', qty: 0, hint: 'Presente, sin grietas' },
  { sub: 'Utensilios', name: 'Destapa corcho / Corkscrew', type: 'variable', qty: 0, hint: 'Funciona correctamente' },
  { sub: 'Utensilios', name: 'Abrelatas / Can opener', type: 'variable', qty: 0, hint: 'Funciona correctamente' },
  { sub: 'Utensilios', name: 'Cuchara sopera / Soup spoon', type: 'variable', qty: 8, hint: 'Cantidad y estado' },
  { sub: 'Utensilios', name: 'Cuchara cafetera / Coffee spoon', type: 'variable', qty: 8, hint: 'Cantidad y estado' },
  { sub: 'Utensilios', name: 'Tenedor / Fork', type: 'variable', qty: 16, hint: 'Postre + comedor, cantidad' },
  { sub: 'Utensilios', name: 'Cuchillo comedor / Dinner knife', type: 'variable', qty: 8, hint: 'Cantidad y filo' },
  { sub: 'Utensilios', name: 'Cuchillo cocina / Kitchen knife', type: 'variable', qty: 8, hint: 'Filo, mango firme' },
  { sub: 'Utensilios', name: 'Cuchillo carne / Steak knife', type: 'variable', qty: 8, hint: 'Cantidad y filo' },
  { sub: 'Utensilios', name: 'Exprimidor limones / Lemon squeezer', type: 'variable', qty: 0, hint: 'Funciona, limpio' },
  { sub: 'Utensilios', name: 'Cucharones / palas / Ladles / spatulas', type: 'variable', qty: 6, hint: 'Completos, buen estado' },
  { sub: 'Utensilios', name: 'Organizador de cubiertos / Cutlery organizer', type: 'variable', qty: 1, hint: 'Completo, limpio' },
  { sub: 'Utensilios', name: 'Bote de basura / Trash can', type: 'variable', qty: 1, hint: 'Con tapa, limpio' },
  { sub: 'Loza', name: 'Ollas con tapa / Pots with lids', type: 'variable', qty: 4, hint: 'Tapas completas, asas firmes' },
  { sub: 'Loza', name: 'Sartenes / Skillets', type: 'variable', qty: 3, hint: 'Antiadherente, mangos firmes' },
  { sub: 'Loza', name: 'Tabla para picar / Cutting board', type: 'variable', qty: 3, hint: 'Limpia, sin grietas profundas' },
  { sub: 'Utensilios', name: 'Cuchillo pan / Bread knife', type: 'variable', qty: 1, hint: 'Filo, mango firme' },
  { sub: 'Utensilios', name: 'Tequilero / Shot glass', type: 'variable', qty: 6, hint: 'Sin grietas, cantidad' },
  { sub: 'Utensilios', name: 'Tenedor ensalada (chico) / Salad fork', type: 'variable', qty: 8, hint: 'Cantidad y estado' },
  { sub: 'Utensilios', name: 'Pelapapas / Peeler', type: 'variable', qty: 1, hint: 'Funciona, filo' },
  { sub: 'Utensilios', name: 'Rallador de queso / Cheese grater', type: 'variable', qty: 1, hint: 'Limpio, buen estado' },
  { sub: 'Utensilios', name: 'Colador / Strainer', type: 'variable', qty: 1, hint: 'Limpio, sin daños' },
  { sub: 'Accesorios', name: 'Dispensador de jabón / Soap dispenser', type: 'variable', qty: 1, hint: 'Funciona, con jabón' },
  { sub: 'Accesorios', name: 'Vaso plástico / Plastic cup', type: 'variable', qty: 4, hint: 'Sin grietas, cantidad' },
  { sub: 'Accesorios', name: 'Microfibra cocina / Kitchen microfiber', type: 'variable', qty: 2, hint: 'Limpia, buen estado' },
  { sub: 'Accesorios', name: 'Secador trastes / Dish drying towel', type: 'variable', qty: 1, hint: 'Limpio, buen estado' },
  { sub: 'Loza', name: 'Bowl ensaladera / Salad bowl', type: 'variable', qty: 0, hint: 'Sin grietas, limpio' },
  { sub: 'Loza', name: 'Jarras / Pitchers', type: 'variable', qty: 0, hint: 'Sin grietas, tapa' },
  { sub: 'Loza', name: 'Base cosas calientes / Trivet', type: 'variable', qty: 0, hint: 'Presente, buen estado' },
  { sub: 'Loza', name: 'Base servitoallas / Towel holder', type: 'variable', qty: 0, hint: 'Firme, con toallas' },
  { sub: 'Vajilla', name: 'Plato extendido chico / Small plate', type: 'variable', qty: 7, hint: 'Cantidad, sin despostillados' },
  { sub: 'Vajilla', name: 'Plato extendido mediano / Medium plate', type: 'variable', qty: 0, hint: 'Cantidad, sin despostillados' },
  { sub: 'Vajilla', name: 'Plato extendido grande / Large plate', type: 'variable', qty: 8, hint: 'Cantidad, sin despostillados' },
  { sub: 'Vajilla', name: 'Plato hondo / Deep plate', type: 'variable', qty: 7, hint: 'Cantidad, sin despostillados' },
  { sub: 'Vajilla', name: 'Vaso chico / Small glass', type: 'variable', qty: 11, hint: 'Sin grietas, cantidad' },
  { sub: 'Vajilla', name: 'Vaso mediano / Medium glass', type: 'variable', qty: 8, hint: 'Sin grietas, cantidad' },
  { sub: 'Vajilla', name: 'Taza / Mug', type: 'variable', qty: 6, hint: 'Sin grietas, asas firmes' },
  { sub: 'Vajilla', name: 'Copas / Wine glasses', type: 'variable', qty: 8, hint: 'Sin grietas, cantidad' },
];

const LIVING_ITEMS = [
  { sub: 'Sala', name: 'Sofá / Sofa', type: 'fixed', qty: 1, hint: 'Cojines, tela, estructura firme' },
  { sub: 'Sala', name: 'Mesa de centro / Coffee table', type: 'fixed', qty: 1, hint: 'Superficie, patas, estable' },
  { sub: 'Sala', name: 'Televisión / TV', type: 'fixed', qty: 1, hint: 'Enciende, imagen, control remoto' },
  { sub: 'Sala', name: 'Control de TV / TV remote', type: 'variable', qty: 1, hint: 'Funciona, pilas' },
  { sub: 'Sala', name: 'Módem Internet / Internet modem', type: 'fixed', qty: 1, hint: 'Funciona, luces, cables' },
  { sub: 'Sala', name: 'Convertidor o repetidora (Roku) / Streaming device (Roku)', type: 'variable', qty: 1, hint: 'Funciona, control, cables' },
  { sub: 'Sala', name: 'Mueble de TV / TV stand', type: 'fixed', qty: 1, hint: 'Puertas, cajones, estable' },
  { sub: 'Sala', name: 'Lámpara de piso / Floor lamp', type: 'variable', qty: 1, hint: 'Enciende, foco, estable' },
  { sub: 'Sala', name: 'Lámpara colgante / Pendant lamp', type: 'variable', qty: 1, hint: 'Enciende, foco, fija' },
  { sub: 'Sala', name: 'Cortinas / Curtains', type: 'fixed', qty: 1, hint: 'Riel, tela, blackout' },
  { sub: 'Decoración', name: 'Cuadros / Wall art', type: 'variable', qty: 0, hint: 'Fijos, buen estado' },
  { sub: 'Decoración', name: 'Espejos / Mirrors', type: 'variable', qty: 0, hint: 'Sin grietas, fijos' },
  { sub: 'Decoración', name: 'Jarrones / Vases', type: 'variable', qty: 0, hint: 'Sin grietas, buen estado' },
  { sub: 'Decoración', name: 'Floreros / Flower vases', type: 'variable', qty: 0, hint: 'Sin grietas, buen estado' },
  { sub: 'Decoración', name: 'Portavela / Candle holder', type: 'variable', qty: 0, hint: 'Buen estado, estable' },
];

const DINING_ITEMS = [
  { sub: 'Comedor', name: 'Mesa de comedor / Dining table', type: 'fixed', qty: 1, hint: 'Superficie, patas, estable' },
  { sub: 'Comedor', name: 'Sillas de comedor / Dining chairs', type: 'fixed', qty: 4, hint: 'Estables, cantidad, sin daños' },
  { sub: 'Comedor', name: 'Centro de mesa / Centerpiece', type: 'variable', qty: 1, hint: 'Decoración presente' },
  { sub: 'Comedor', name: 'Adornos / Decorations', type: 'variable', qty: 0, hint: 'Presentes, buen estado' },
];

const TERRACE_ITEMS = [
  { sub: 'Mobiliario', name: 'Mesa exterior / Outdoor table', type: 'fixed', qty: 1, hint: 'Superficie, estable, limpia' },
  { sub: 'Mobiliario', name: 'Sillas exteriores / Outdoor chairs', type: 'fixed', qty: 2, hint: 'Estables, cantidad correcta' },
  { sub: 'Mobiliario', name: 'Sombrilla / Umbrella', type: 'variable', qty: 1, hint: 'Abre/cierra, tela, base firme' },
  { sub: 'Mobiliario', name: 'Tumbona / Lounge chair', type: 'variable', qty: 1, hint: 'Estructura firme, limpia' },
  { sub: 'Mobiliario', name: 'Echadero / Daybed', type: 'variable', qty: 0, hint: 'Estructura firme, cojines' },
  { sub: 'Accesorios', name: 'Cojines decorativos / Throw pillows', type: 'variable', qty: 4, hint: 'Cantidad, limpieza' },
  { sub: 'Accesorios', name: 'Macetas / Planters', type: 'variable', qty: 2, hint: 'Plantas vivas, sin grietas' },
];

const BEDROOM_TEMPLATE = [
  { sub: 'Dormitorio', name: 'Base de cama / Bed frame', type: 'fixed', qty: 1, hint: 'Estructura, cabecera, estado general' },
  { sub: 'Dormitorio', name: 'Colchón / Mattress', type: 'fixed', qty: 1, hint: 'Manchas, firmeza, limpieza' },
  { sub: 'Dormitorio', name: 'Ropa de cama / Bedding set', type: 'variable', qty: 1, hint: 'Sábanas, cobija, colcha completa' },
  { sub: 'Dormitorio', name: 'Almohadas / Pillows', type: 'variable', qty: 2, hint: 'Cantidad, limpias, firmes' },
  { sub: 'Mobiliario', name: 'Buró / Nightstand', type: 'fixed', qty: 1, hint: 'Cajones, superficie sin daños' },
  { sub: 'Mobiliario', name: 'Lámpara de buró / Nightstand lamp', type: 'variable', qty: 1, hint: 'Enciende, foco, pantalla' },
  { sub: 'Mobiliario', name: 'Clóset / Closet', type: 'fixed', qty: 1, hint: 'Puertas, rieles, interior limpio' },
  { sub: 'Mobiliario', name: 'Ganchos / Hangers', type: 'variable', qty: 10, hint: 'Cantidad suficiente' },
  { sub: 'Electrónica', name: 'Televisión / TV', type: 'fixed', qty: 1, hint: 'Enciende, imagen, pantalla' },
  { sub: 'Electrónica', name: 'Control de TV / TV remote', type: 'variable', qty: 1, hint: 'Funciona, pilas' },
  { sub: 'Electrónica', name: 'Módem Internet / Internet modem', type: 'fixed', qty: 0, hint: 'Funciona, luces, cables' },
  { sub: 'Electrónica', name: 'Convertidor o repetidora (Roku) / Streaming device (Roku)', type: 'variable', qty: 0, hint: 'Funciona, control, cables' },
  { sub: 'Otros', name: 'Secadora de cabello / Hair dryer', type: 'variable', qty: 1, hint: 'Funciona, cable, boquilla' },
  { sub: 'Otros', name: 'Plancha / Iron', type: 'variable', qty: 1, hint: 'Funciona, cable, suela limpia' },
  { sub: 'Otros', name: 'Accesorio colgar plancha / Iron hanger', type: 'variable', qty: 1, hint: 'Firme, buen estado' },
  { sub: 'Otros', name: 'Burro planchar / Ironing board', type: 'variable', qty: 1, hint: 'Estable, forro, buen estado' },
  { sub: 'Otros', name: 'Caja fuerte / Safe box', type: 'fixed', qty: 1, hint: 'Funciona, código, puerta' },
  { sub: 'Otros', name: 'Cortinas / Curtains', type: 'fixed', qty: 1, hint: 'Riel, tela, blackout funciona' },
  { sub: 'Otros', name: 'Espejo / Mirror', type: 'fixed', qty: 1, hint: 'Limpio, sin grietas, fijo' },
  { sub: 'Otros', name: 'Adornos / Decorations', type: 'variable', qty: 0, hint: 'Presentes, buen estado' },
];

const BATHROOM_TEMPLATE = [
  { sub: 'Sanitarios', name: 'Inodoro / Toilet', type: 'fixed', qty: 1, hint: 'Descarga bien, asiento, limpio' },
  { sub: 'Sanitarios', name: 'Lavabo / Sink', type: 'fixed', qty: 1, hint: 'Grifo, desagüe, sin goteo' },
  { sub: 'Sanitarios', name: 'Regadera / Shower', type: 'fixed', qty: 1, hint: 'Presión agua, temperatura, piso' },
  { sub: 'Sanitarios', name: 'Puerta vidrio / Glass door', type: 'fixed', qty: 0, hint: 'Sin grietas, cierra bien' },
  { sub: 'Sanitarios', name: 'Puerta acrílico / Acrylic door', type: 'fixed', qty: 0, hint: 'Sin grietas, cierra bien' },
  { sub: 'Accesorios', name: 'Espejo / Mirror', type: 'fixed', qty: 1, hint: 'Limpio, sin grietas' },
  { sub: 'Accesorios', name: 'Toallero / Towel rack', type: 'fixed', qty: 1, hint: 'Firme, bien montado' },
  { sub: 'Accesorios', name: 'Toallas / Towels', type: 'variable', qty: 2, hint: 'Cantidad, limpias, sin manchas' },
  { sub: 'Accesorios', name: 'Dispensador jabón / Soap dispenser', type: 'variable', qty: 1, hint: 'Funciona, con jabón' },
  { sub: 'Accesorios', name: 'Porta shampoo / Shampoo holder', type: 'variable', qty: 1, hint: 'Firme, buen estado' },
  { sub: 'Accesorios', name: 'Cepillo WC / Toilet brush', type: 'variable', qty: 1, hint: 'Limpio, con base' },
  { sub: 'Accesorios', name: 'Cortina de baño / Shower curtain', type: 'variable', qty: 1, hint: 'Limpia, sin moho, ganchos' },
  { sub: 'Accesorios', name: 'Tapete de baño / Bath mat', type: 'variable', qty: 1, hint: 'Limpio, antideslizante' },
  { sub: 'Accesorios', name: 'Bote de basura / Trash can', type: 'variable', qty: 1, hint: 'Con tapa, limpio' },
  { sub: 'Accesorios', name: 'Portarrollos / Toilet paper holder', type: 'fixed', qty: 1, hint: 'Firme, con papel' },
];

const LAUNDRY_ITEMS = [
  { sub: 'Electrodomésticos', name: 'Lavadora / Washing machine', type: 'fixed', qty: 1, hint: 'Funciona, sin fugas, ciclos' },
  { sub: 'Electrodomésticos', name: 'Secadora / Dryer', type: 'fixed', qty: 0, hint: 'Funciona, filtro, ventilación' },
  { sub: 'Electrodomésticos', name: 'Centro de lavado / Laundry center', type: 'fixed', qty: 0, hint: 'Funciona, sin fugas, completo' },
  { sub: 'Limpieza', name: 'Escoba / Broom', type: 'variable', qty: 1, hint: 'Buen estado, cerdas completas' },
  { sub: 'Limpieza', name: 'Recogedor / Dustpan', type: 'variable', qty: 1, hint: 'Buen estado, funcional' },
  { sub: 'Limpieza', name: 'Trapeador / Mop', type: 'variable', qty: 1, hint: 'Limpio, buen estado' },
  { sub: 'Limpieza', name: 'Cubeta / Bucket', type: 'variable', qty: 1, hint: 'Sin grietas, limpia' },
  { sub: 'Limpieza', name: 'Mop / Sponge mop', type: 'variable', qty: 1, hint: 'Buen estado, repuesto' },
  { sub: 'Limpieza', name: 'Colgador escobas / Broom hanger', type: 'fixed', qty: 1, hint: 'Firme, montado' },
  { sub: 'Limpieza', name: 'Bomba WC / Toilet plunger', type: 'variable', qty: 1, hint: 'Buen estado, funcional' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'Seleccionar...' },
  { value: 'good', label: 'Bueno / Good' },
  { value: 'damaged', label: 'Dañado / Damaged' },
  { value: 'missing', label: 'Faltante / Missing' },
  { value: 'new', label: 'Nuevo / New' },
];

// ── Estado ──

let currentMode = null; // 'inventory' | 'inspection'
let inspectionInfo = {};
let inspectionData = {}; // clave: "sectionId-itemIndex"
let currentSectionIndex = 0;
let currentItemIndex = 0;
let SECTIONS = []; // se construye dinámicamente
let _autoAdvanceTimer = null;

function cancelAutoAdvance() {
  if (_autoAdvanceTimer) {
    clearTimeout(_autoAdvanceTimer);
    _autoAdvanceTimer = null;
  }
}

// ── Cronómetro ──

let timerInterval = null;
let timerStartTime = null;
let timerElapsed = 0;

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

  // Inspection timers
  const display = document.getElementById('timer-display');
  if (display) display.textContent = formatted;

  const topbar = document.getElementById('topbar-timer');
  if (topbar) topbar.textContent = formatted;

  // Inventory timers
  const invDisplay = document.getElementById('inv-timer-display');
  if (invDisplay) invDisplay.textContent = formatted;

  const invTopbar = document.getElementById('inv-topbar-timer');
  if (invTopbar) invTopbar.textContent = formatted;
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

// ── Construir secciones dinámicamente ──

function buildSections(numBedrooms, numBathrooms) {
  const sections = [];

  // 1. Cocina
  sections.push({
    id: 'kitchen',
    name: 'Cocina',
    items: KITCHEN_ITEMS.map(i => ({ ...i, area: 'Cocina' }))
  });

  // 2. Sala / Comedor
  const livingItems = [
    ...LIVING_ITEMS.map(i => ({ ...i, area: 'Sala' })),
    ...DINING_ITEMS.map(i => ({ ...i, area: 'Comedor' })),
  ];
  sections.push({
    id: 'living',
    name: 'Sala / Comedor',
    items: livingItems
  });

  // 3. Terraza
  sections.push({
    id: 'terrace',
    name: 'Terraza',
    items: TERRACE_ITEMS.map(i => ({ ...i, area: 'Terraza' }))
  });

  // 4. Recámaras
  const bedroomItems = [];
  for (let i = 1; i <= numBedrooms; i++) {
    const areaName = numBedrooms === 1 ? 'Recámara' : `Recámara ${i}`;
    BEDROOM_TEMPLATE.forEach(item => {
      bedroomItems.push({ ...item, area: areaName });
    });
  }
  sections.push({
    id: 'bedrooms',
    name: 'Recámaras',
    items: bedroomItems
  });

  // 5. Baños
  const bathroomItems = [];
  for (let i = 1; i <= numBathrooms; i++) {
    const areaName = numBathrooms === 1 ? 'Baño' : `Baño ${i}`;
    BATHROOM_TEMPLATE.forEach(item => {
      bathroomItems.push({ ...item, area: areaName });
    });
  }
  sections.push({
    id: 'bathrooms',
    name: 'Baños',
    items: bathroomItems
  });

  // 6. Lavandería
  sections.push({
    id: 'laundry',
    name: 'Lavandería',
    items: LAUNDRY_ITEMS.map(i => ({ ...i, area: 'Lavandería' }))
  });

  return sections;
}

// ── Helpers ──

function getItemIcon(name) {
  const parts = name.split(' / ');
  for (const part of parts) {
    const trimmed = part.trim();
    if (ITEM_ICONS[trimmed]) return ITEM_ICONS[trimmed];
  }
  return 'inventory_2';
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

// ══════════════════════════════════════════
// TOUR GUIADO
// ══════════════════════════════════════════

const TOUR_STEPS = {
  inspection: [
    {
      screen: 'step-home',
      emoji: '👆',
      msg: 'Toca el botón azul <strong>Revisar Departamento</strong>',
      tip: 'Es el primero de la lista, con el ícono de palomita ✔️',
      target: '.inspection-mode',
    },
    {
      screen: 'step-welcome',
      emoji: '🏢',
      msg: 'Toca el campo y escribe el nombre del departamento',
      tip: 'Por ejemplo: "Depto 101" o "Casa Playa". Empieza a escribir y aparecerán sugerencias.',
      target: '#location',
    },
    {
      screen: 'step-welcome',
      emoji: '▶️',
      msg: 'Cuando hayas elegido el departamento, toca <strong>EMPEZAR →</strong>',
      tip: 'El botón verde grande en la parte de abajo.',
      target: '#btn-start-inspection',
    },
    {
      screen: 'step-rooms',
      emoji: '🏠',
      msg: 'Aparece la lista de cuartos. Toca el que quieras revisar primero.',
      tip: 'Puedes empezar por cualquier cuarto. Los que ya terminaste se muestran en verde ✅.',
      target: '#room-grid',
    },
    {
      screen: 'step-item',
      emoji: '📋',
      msg: 'Aquí ves el nombre del objeto que vas a revisar.',
      tip: 'Lee el nombre arriba. Si hay una nota amarilla, te dice qué revisar exactamente.',
      target: '#item-name',
    },
    {
      screen: 'step-item',
      emoji: '👆',
      msg: 'Toca uno de los tres botones según el estado del objeto.',
      tip: '<strong>BIEN</strong> = funciona bien · <strong>DAÑADO</strong> = está roto o sucio · <strong>FALTA</strong> = no está en el cuarto',
      target: '#status-grid',
    },
    {
      screen: 'step-item',
      emoji: '📸',
      msg: '¿Quieres agregar una foto o una nota? Toca <strong>Foto</strong> o <strong>Notas</strong>',
      tip: 'Esto es opcional. Solo úsalo si hay algo importante que mostrar o explicar.',
      target: '#step-item .extras-row',
    },
    {
      screen: 'step-item',
      emoji: '➡️',
      msg: 'Cuando termines con ese objeto, toca <strong>Siguiente →</strong>',
      tip: 'El botón se pone verde cuando ya elegiste el estado. Repite esto con cada objeto.',
      target: '#nav-next',
    },
    {
      screen: 'step-rooms',
      emoji: '🔄',
      msg: '¡Cuarto terminado! Ahora toca otro cuarto para continuar.',
      tip: 'Sigue hasta que todos los cuartos estén en verde ✅.',
      target: '#room-grid',
    },
    {
      screen: 'step-export',
      emoji: '🎉',
      msg: '¡Terminaste la revisión! Descarga el reporte.',
      tip: 'Toca <strong>Excel</strong> para abrir en computadora o <strong>PDF</strong> para ver en el teléfono.',
      target: '.btn-export',
    },
  ],
  inventory: [
    {
      screen: 'step-home',
      emoji: '👆',
      msg: 'Toca <strong>Inventario</strong> para empezar.',
      tip: 'Es el segundo botón de la lista.',
      target: '.inventory-mode',
    },
    {
      screen: 'step-inv-welcome',
      emoji: '✏️',
      msg: 'Escribe el nombre del departamento.',
      tip: 'Por ejemplo: "Depto 201". Toca el campo y escribe con el teclado.',
      target: '#inv-unit-name',
    },
    {
      screen: 'step-inv-welcome',
      emoji: '▶️',
      msg: 'Toca <strong>COMENZAR</strong> para continuar.',
      tip: 'El botón azul grande.',
      target: '.btn-start',
    },
    {
      screen: 'step-inv-rooms',
      emoji: '🏠',
      msg: 'Toca un cuarto para agregarle objetos.',
      tip: 'Empieza por cualquier cuarto.',
      target: '#inv-room-grid',
    },
    {
      screen: 'step-inv-item',
      emoji: '➕',
      msg: 'Toca <strong>Agregar Artículo</strong> para añadir un objeto al cuarto.',
      tip: 'Por ejemplo: "Cama", "Silla", "Televisión".',
      target: '#btn-show-add-item',
    },
    {
      screen: 'step-inv-item',
      emoji: '✏️',
      msg: 'Escribe el nombre del objeto y una descripción opcional.',
      tip: 'Sé específico: en vez de "silla", escribe "silla de madera negra".',
      target: '.inv-add-panel',
    },
    {
      screen: 'step-inv-item',
      emoji: '✅',
      msg: 'Toca <strong>Guardar</strong> para agregar el objeto a la lista.',
      tip: 'Repite esto con cada objeto del cuarto.',
      target: '.inv-add-panel',
    },
  ],
  onboarding: [
    {
      screen: 'step-home',
      emoji: '👆',
      msg: 'Toca <strong>Departamento Nuevo</strong> para empezar.',
      tip: 'Es el tercer botón de la lista.',
      target: '.onboarding-mode',
    },
    {
      screen: 'step-onboarding-welcome',
      emoji: '✏️',
      msg: 'Escribe el nombre del departamento.',
      tip: 'Por ejemplo: "Depto 301" o "Casa Centro".',
      target: '#onb-unit-name',
    },
    {
      screen: 'step-onboarding-welcome',
      emoji: '🛏️',
      msg: 'Elige cuántas recámaras y baños tiene.',
      tip: 'Toca los botones + y − para cambiar el número.',
      target: '#onb-unit-name',
    },
    {
      screen: 'step-onboarding-welcome',
      emoji: '▶️',
      msg: 'Toca <strong>COMENZAR</strong> para continuar.',
      tip: 'El botón azul grande de abajo.',
      target: '.btn-start',
    },
    {
      screen: 'step-onboarding-sections',
      emoji: '🏠',
      msg: 'Aparece la lista de áreas. Toca la que quieras revisar primero.',
      tip: 'La app ya tiene preparada la lista de objetos para cada área.',
      target: '#onb-section-grid',
    },
    {
      screen: 'step-onboarding-item',
      emoji: '📋',
      msg: 'Lee el nombre del objeto arriba de la pantalla.',
      tip: 'La nota amarilla te dice qué revisar exactamente.',
      target: '#onb-item-name',
    },
    {
      screen: 'step-onboarding-item',
      emoji: '👆',
      msg: 'Toca uno de los tres botones según el estado.',
      tip: '<strong>BIEN</strong> = funciona · <strong>DAÑADO</strong> = roto o sucio · <strong>FALTA</strong> = no está',
      target: '#onb-status-grid',
    },
    {
      screen: 'step-onboarding-item',
      emoji: '📸',
      msg: 'Si quieres, agrega una foto o nota tocando <strong>Foto</strong> o <strong>Notas</strong>.',
      tip: 'Opcional. Solo si hay algo importante que registrar.',
      target: '#step-onboarding-item .extras-row',
    },
    {
      screen: 'step-onboarding-item',
      emoji: '➡️',
      msg: 'Toca <strong>Siguiente →</strong> para pasar al siguiente objeto.',
      tip: 'Repite esto con cada objeto hasta terminar todas las áreas.',
      target: '#onb-nav-next',
    },
  ],
};

let _tourMode = null;
let _tourStep = 0;
let _tourActive = false;
let _tourCurrentScreen = 'step-home';

function showTrainingModal() {
  document.getElementById('what-today-modal').style.display = 'flex';
}

function closeWhatTodayModal() {
  document.getElementById('what-today-modal').style.display = 'none';
}

function startTour(mode) {
  closeWhatTodayModal();
  _tourMode = mode;
  _tourActive = true;
  // Find first step matching the current visible screen
  const steps = TOUR_STEPS[mode];
  _tourStep = 0;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].screen === _tourCurrentScreen) { _tourStep = i; break; }
  }
  showTourBanner();
}

function showTourBanner() {
  document.getElementById('tour-banner').style.display = 'block';
  document.getElementById('tour-fab').style.display = 'none';
  _renderTourStep();
}

function _renderTourStep() {
  if (!_tourMode) return;
  const steps = TOUR_STEPS[_tourMode];
  if (_tourStep >= steps.length) { exitTour(); return; }
  const step = steps[_tourStep];

  // Text
  const tipHtml = step.tip ? `<div class="tour-step-tip">${step.tip}</div>` : '';
  document.getElementById('tour-step-text').innerHTML =
    `<div class="tour-step-main">${step.emoji} ${step.msg}</div>${tipHtml}`;
  document.getElementById('tour-step-count').textContent = `Paso ${_tourStep + 1} de ${steps.length}`;

  // Next button label
  const nextBtn = document.getElementById('tour-btn-next');
  if (_tourStep === steps.length - 1) {
    nextBtn.innerHTML = '¡Listo! <span class="material-symbols-rounded">check_circle</span>';
    nextBtn.className = 'tour-btn-next finish';
  } else {
    nextBtn.innerHTML = 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';
    nextBtn.className = 'tour-btn-next';
  }

  // Dots
  const dotsEl = document.getElementById('tour-step-dots');
  dotsEl.innerHTML = steps.map((_, i) =>
    `<span class="tour-dot ${i < _tourStep ? 'done' : i === _tourStep ? 'active' : ''}"></span>`
  ).join('');

  // Highlight target
  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  if (step.target) {
    const target = document.querySelector(step.target);
    if (target) {
      target.classList.add('tour-highlight');
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    }
  }
}

function advanceTour() {
  const steps = TOUR_STEPS[_tourMode];
  if (_tourStep >= steps.length - 1) { exitTour(); return; }
  _tourStep++;
  _renderTourStep();
}

function exitTour() {
  _tourActive = false;
  _tourMode = null;
  document.getElementById('tour-banner').style.display = 'none';
  document.getElementById('tour-fab').style.display = 'none';
  document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
}

function _hideTourBanner() {
  document.getElementById('tour-banner').style.display = 'none';
  if (_tourActive) {
    document.getElementById('tour-fab').style.display = 'flex';
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  }
}

// ══════════════════════════════════════════
// AUTO-SAVE / BORRADOR (draft)
// ══════════════════════════════════════════

const DRAFT_KEY_INSPECTION  = 'delmar_draft_inspection';
const DRAFT_KEY_ONBOARDING  = 'delmar_draft_onboarding';
const DRAFT_KEY_INVENTORY   = 'delmar_draft_inventory';

let _autosaveTimer = null;

function _scheduleSave() {
  clearTimeout(_autosaveTimer);
  _autosaveTimer = setTimeout(_autosaveDraft, 800);
}

function _autosaveDraft() {
  if (currentMode === 'inspection') {
    try {
      const draft = {
        type: 'inspection',
        unitName: inspectionInfo.location,
        inspectionInfo,
        inspectionData,
        currentSectionIndex,
        currentItemIndex,
        loadedInventory: window._loadedInventory,
        selectedUnitId: window._selectedUnitId,
        savedAt: Date.now(),
      };
      localStorage.setItem(DRAFT_KEY_INSPECTION, JSON.stringify(draft));
    } catch (e) { /* QuotaExceeded — skip silently */ }
  }
}

function _clearInspectionDraft() {
  localStorage.removeItem(DRAFT_KEY_INSPECTION);
}

function _checkForDraft() {
  const raw = localStorage.getItem(DRAFT_KEY_INSPECTION)
    || localStorage.getItem(DRAFT_KEY_ONBOARDING)
    || localStorage.getItem(DRAFT_KEY_INVENTORY);
  if (!raw) return;
  try {
    const draft = JSON.parse(raw);
    const ageMin = (Date.now() - (draft.savedAt || 0)) / 60000;
    if (ageMin > 60 * 24 * 7) { // discard drafts older than 7 days
      _discardAllDrafts();
      return;
    }
    const banner = document.getElementById('resume-banner');
    document.getElementById('resume-banner-unit').textContent = draft.unitName || '(sin nombre)';
    banner.style.display = 'block';
    banner._draft = draft;
  } catch (e) { _discardAllDrafts(); }
}

function resumeDraft() {
  const banner = document.getElementById('resume-banner');
  const draft = banner._draft;
  if (!draft) return;
  banner.style.display = 'none';

  if (draft.type === 'inspection') {
    currentMode = 'inspection';
    inspectionInfo = draft.inspectionInfo || {};
    inspectionData = draft.inspectionData || {};
    currentSectionIndex = draft.currentSectionIndex || 0;
    currentItemIndex = draft.currentItemIndex || 0;
    window._loadedInventory = draft.loadedInventory;
    window._selectedUnitId = draft.selectedUnitId;
    if (window._loadedInventory) {
      const inv = window._loadedInventory;
      inv.rooms.forEach((room, i) => {
        ROOM_CONFIG[room.roomId] = { icon: 'inventory_2', name: room.roomName, shortName: room.roomName };
        ROOM_COLORS[room.roomId] = DYNAMIC_ROOM_COLORS[i % DYNAMIC_ROOM_COLORS.length];
      });
      SECTIONS = buildSectionsFromInventory(inv);
    }
    showToast('📋 Retomando inspección...');
    showStep('step-rooms');
    renderRooms();
  } else if (draft.type === 'onboarding') {
    // handled by onboarding-mode.js
    if (typeof resumeOnboardingDraft === 'function') resumeOnboardingDraft(draft);
  } else if (draft.type === 'inventory') {
    // handled by inventory-mode.js
    if (typeof resumeInventoryDraft === 'function') resumeInventoryDraft(draft);
  }
}

function discardDraft() {
  document.getElementById('resume-banner').style.display = 'none';
  _discardAllDrafts();
}

function _discardAllDrafts() {
  localStorage.removeItem(DRAFT_KEY_INSPECTION);
  localStorage.removeItem(DRAFT_KEY_ONBOARDING);
  localStorage.removeItem(DRAFT_KEY_INVENTORY);
}

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  window.scrollTo(0, 0);
  _tourCurrentScreen = stepId;

  // Auto-advance tour to next step matching this screen
  if (_tourActive && _tourMode) {
    const steps = TOUR_STEPS[_tourMode];
    for (let i = _tourStep; i < steps.length; i++) {
      if (steps[i].screen === stepId) {
        _tourStep = i;
        if (document.getElementById('tour-banner').style.display !== 'none') {
          setTimeout(_renderTourStep, 350); // wait for screen transition
        }
        break;
      }
    }
  }
}

// ══════════════════════════════════════════
// PASO 1: BIENVENIDA / INICIAR
// ══════════════════════════════════════════

let _fvSlide = 0;

function fvNext() {
  const slides = document.querySelectorAll('.fv-slide');
  const dots = document.querySelectorAll('.fv-dot');
  const btn = document.getElementById('fv-next-btn');

  if (_fvSlide < slides.length - 1) {
    slides[_fvSlide].classList.remove('active');
    dots[_fvSlide].classList.remove('active');
    _fvSlide++;
    slides[_fvSlide].classList.add('active');
    dots[_fvSlide].classList.add('active');
    if (_fvSlide === slides.length - 1) {
      btn.innerHTML = '¡Entendido! <span class="material-symbols-rounded">check_circle</span>';
    }
  } else {
    document.getElementById('first-visit-modal').style.display = 'none';
    localStorage.setItem('delmar_onboarded', '1');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAPIHealth();
  checkShareSupport();

  // Show first-visit intro if not seen before
  if (!localStorage.getItem('delmar_onboarded')) {
    _fvSlide = 0;
    document.querySelectorAll('.fv-slide').forEach((s, i) => s.classList.toggle('active', i === 0));
    document.querySelectorAll('.fv-dot').forEach((d, i) => d.classList.toggle('active', i === 0));
    const btn = document.getElementById('fv-next-btn');
    if (btn) btn.innerHTML = 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';
    document.getElementById('first-visit-modal').style.display = 'flex';
  }

  // Check for a saved draft and show resume banner
  _checkForDraft();

  // Close unit search dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('unit-search-dropdown');
    const group = document.querySelector('.unit-search-group');
    if (dropdown && group && !group.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// Re-initialize API after deferred scripts load
window.addEventListener('load', () => {
  if (!isAPIReady()) checkAPIHealth();
});


// ── Selección de modo desde la pantalla de inicio ──

function selectMode(mode) {
  currentMode = mode;
  if (mode === 'inventory') {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('inv-date').value = `${yyyy}-${mm}-${dd}`;
    showStep('step-inv-welcome');
  } else if (mode === 'onboarding') {
    // Onboarding mode
    isEditingOnboarding = false;
    onboardingInfo = {};
    onboardingData = {};
    const today = new Date();
    document.getElementById('onb-date').value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    document.getElementById('onb-unit-name').value = '';
    document.getElementById('onb-auditor').value = '';
    document.getElementById('onb-bedrooms-count').textContent = '1';
    document.getElementById('onb-bathrooms-count').textContent = '1';
    showStep('step-onboarding-welcome');
  } else if (mode === 'historico') {
    showStep('step-historico');
    showHistoricoLogin();
  } else {
    // Inspection mode — show redesigned welcome with unit search
    window._loadedInventory = null;
    window._selectedUnitId = null;
    window._editingInspectionId = null;
    document.getElementById('location').value = '';
    document.getElementById('location').readOnly = false;
    document.getElementById('unit-search-clear').style.display = 'none';
    document.getElementById('btn-start-inspection').disabled = true;
    const today = new Date();
    document.getElementById('date').value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    loadUnitSearchData();
    showStep('step-welcome');
  }
}

// ══════════════════════════════════════════
// HISTÓRICO: AUTHENTICATION
// ══════════════════════════════════════════

function showHistoricoLogin() {
  if (isHistoricoAuthenticated()) {
    // Already logged in, show analytics
    showHistoricoAnalytics();
  } else {
    // Show login form
    document.getElementById('historico-login-form').style.display = 'flex';
    document.getElementById('historico-analytics-section').style.display = 'none';
    document.getElementById('historico-logout-btn').style.display = 'none';
    document.getElementById('historico-controls').style.display = 'none';
    document.getElementById('historico-list').style.display = 'none';
    document.getElementById('historico-username').value = '';
    document.getElementById('historico-password').value = '';
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('historico-username').focus();
  }
}

function submitHistoricoLogin() {
  const username = document.getElementById('historico-username').value;
  const password = document.getElementById('historico-password').value;
  const errorEl = document.getElementById('login-error');

  if (!username || !password) {
    errorEl.textContent = 'Por favor completa usuario y contraseña';
    errorEl.style.display = 'block';
    return;
  }

  if (loginHistorico(username, password)) {
    // Login successful
    errorEl.style.display = 'none';
    showHistoricoAnalytics();
  } else {
    // Login failed
    errorEl.textContent = 'Usuario o contraseña incorrectos';
    errorEl.style.display = 'block';
    document.getElementById('historico-password').value = '';
    document.getElementById('historico-password').focus();
  }
}

function showHistoricoAnalytics() {
  document.getElementById('historico-login-form').style.display = 'none';
  document.getElementById('historico-analytics-section').style.display = 'block';
  document.getElementById('historico-controls').style.display = 'block';
  document.getElementById('historico-list').style.display = 'block';
  document.getElementById('historico-logout-btn').style.display = 'block';

  // Initialize default dates
  initializeAnalyticsDates();

  // Load and render histórico with analytics
  loadAndRenderHistorico();
}

function logoutAndShowHistoricoLogin() {
  logoutHistorico();
  showHistoricoLogin();
}

function initializeAnalyticsDates() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixtyDaysAgo = new Date(today);
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  const thirtySixtyDaysAgo = new Date(today);
  thirtySixtyDaysAgo.setDate(thirtySixtyDaysAgo.getDate() - 30);

  const formatDate = (date) => date.toISOString().split('T')[0];

  document.getElementById('kpi-current-from').value = formatDate(thirtyDaysAgo);
  document.getElementById('kpi-current-to').value = formatDate(today);
  document.getElementById('kpi-prev-from').value = formatDate(sixtyDaysAgo);
  document.getElementById('kpi-prev-to').value = formatDate(thirtySixtyDaysAgo);
}

// ══════════════════════════════════════════
// HISTÓRICO: ANALYTICS
// ══════════════════════════════════════════

let _historico_kpiChart = null;

function updateAnalytics() {
  try {
    renderKPICards(_allRecords);
  } catch (err) {
    console.error('Error rendering KPI cards:', err);
  }

  try {
    renderAnalyticsGraph(_allRecords);
  } catch (err) {
    console.error('Error rendering analytics graph:', err);
  }
}

function renderKPICards(records) {
  // Get current period dates
  const currentFrom = document.getElementById('kpi-current-from').value;
  const currentTo = document.getElementById('kpi-current-to').value;
  const prevFrom = document.getElementById('kpi-prev-from').value;
  const prevTo = document.getElementById('kpi-prev-to').value;

  // Calculate current period KPIs
  const currentRecords = calculateAverageTimeBetweenRecords(records, currentFrom, currentTo);
  const prevRecords = calculateAverageTimeBetweenRecords(records, prevFrom, prevTo);

  const currentPhotos = calculateAveragePhotoTime(records, currentFrom, currentTo);
  const prevPhotos = calculateAveragePhotoTime(records, prevFrom, prevTo);

  // Calculate comparisons
  const recordsComp = calculatePeriodComparison(currentRecords.average, prevRecords.average);
  const photosComp = calculatePeriodComparison(currentPhotos.averageMinutes, prevPhotos.averageMinutes);

  // Update KPI 1: Days between records
  document.getElementById('kpi-days-value').textContent = currentRecords.average;
  document.getElementById('kpi-days-arrow').textContent = recordsComp.arrow;
  document.getElementById('kpi-days-arrow').style.color = recordsComp.isPositive ? '#ef4444' : recordsComp.isNew ? '#9ca3af' : '#10b981';
  document.getElementById('kpi-days-percent').textContent = recordsComp.percentChange.toFixed(1) + '%';
  document.getElementById('kpi-days-period').textContent = recordsComp.isNew ? 'primer período' : 'vs período anterior';

  // Update KPI 2: Photo time
  document.getElementById('kpi-photos-value').textContent = currentPhotos.averageHours;
  document.getElementById('kpi-photos-arrow').textContent = photosComp.arrow;
  document.getElementById('kpi-photos-arrow').style.color = photosComp.isPositive ? '#ef4444' : photosComp.isNew ? '#9ca3af' : '#10b981';
  document.getElementById('kpi-photos-percent').textContent = photosComp.percentChange.toFixed(1) + '%';
  document.getElementById('kpi-photos-period').textContent = photosComp.isNew ? 'primer período' : 'vs período anterior';
}

function renderAnalyticsGraph(records) {
  const currentFrom = document.getElementById('kpi-current-from').value;
  const currentTo = document.getElementById('kpi-current-to').value;
  const prevFrom = document.getElementById('kpi-prev-from').value;
  const prevTo = document.getElementById('kpi-prev-to').value;

  // Generate time series data
  const seriesData = generateTimeSeriesData(records, 'records', currentFrom, currentTo, prevFrom, prevTo);

  const ctx = document.getElementById('kpi-trend-chart').getContext('2d');

  // Destroy previous chart if exists
  if (_historico_kpiChart) {
    _historico_kpiChart.destroy();
  }

  _historico_kpiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: seriesData.labels,
      datasets: [
        {
          label: 'Período actual (' + currentFrom + ' a ' + currentTo + ')',
          data: seriesData.currentData,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Período anterior (' + prevFrom + ' a ' + prevTo + ')',
          data: seriesData.previousData,
          borderColor: '#d1d5db',
          backgroundColor: 'rgba(209, 213, 219, 0.05)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
          fill: true,
          pointRadius: 2,
          pointBackgroundColor: '#d1d5db',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 12, weight: '500' },
            color: '#6b7280',
            padding: 12,
            usePointStyle: true,
          }
        },
        tooltip: {
          backgroundColor: '#1a1a2e',
          titleFont: { size: 12, weight: '600' },
          bodyFont: { size: 11 },
          padding: 10,
          cornerRadius: 8,
          displayColors: true,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#9ca3af', font: { size: 11 } },
          grid: { color: '#e5e7eb' },
          title: {
            display: true,
            text: 'Número de registros',
            color: '#6b7280',
            font: { size: 12, weight: '500' }
          }
        },
        x: {
          ticks: { color: '#9ca3af', font: { size: 11 } },
          grid: { display: false },
          title: {
            display: true,
            text: 'Fecha',
            color: '#6b7280',
            font: { size: 12, weight: '500' }
          }
        }
      }
    }
  });
}

// ── Unit search autocomplete for inspection ──

let _unitSearchList = [];

async function loadUnitSearchData() {
  try {
    if (!isAPIReady()) { _unitSearchList = []; return; }
    _unitSearchList = await loadInventoryList();
  } catch (err) {
    console.error('Error loading unit list for search:', err);
    _unitSearchList = [];
  }
}

function onUnitSearchInput(query) {
  const dropdown = document.getElementById('unit-search-dropdown');
  const q = query.trim().toLowerCase();

  if (!q || q.length < 1) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    return;
  }

  const matches = _unitSearchList.filter(u => u.unitName.toLowerCase().includes(q));
  if (matches.length === 0) {
    dropdown.innerHTML = '<div class="unit-search-item empty">Sin resultados</div>';
    dropdown.style.display = 'block';
    return;
  }

  dropdown.innerHTML = matches.map(u =>
    `<div class="unit-search-item" onclick="selectUnitFromSearch('${u.unitId.replace(/'/g, "\\'")}')">
      <span class="material-symbols-rounded">apartment</span>
      <div>
        <div class="unit-search-name">${u.unitName}</div>
        <div class="unit-search-meta">${u.itemCount} artículo${u.itemCount !== 1 ? 's' : ''}</div>
      </div>
    </div>`
  ).join('');
  dropdown.style.display = 'block';
}

async function selectUnitFromSearch(unitId) {
  const dropdown = document.getElementById('unit-search-dropdown');
  dropdown.style.display = 'none';

  showToast('⏳ Cargando inventario...');
  try {
    const inventoryDoc = await loadInventoryByUnit(unitId);
    if (!inventoryDoc) {
      showToast('❌ Inventario no encontrado');
      return;
    }

    window._loadedInventory = inventoryDoc;
    window._selectedUnitId = unitId;

    document.getElementById('location').value = inventoryDoc.unitName;
    document.getElementById('location').readOnly = true;
    document.getElementById('unit-search-clear').style.display = 'flex';
    document.getElementById('btn-start-inspection').disabled = false;
    showToast(`✅ ${inventoryDoc.unitName} seleccionada`);
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar unidad');
  }
}

function clearUnitSelection() {
  window._loadedInventory = null;
  window._selectedUnitId = null;
  document.getElementById('location').value = '';
  document.getElementById('location').readOnly = false;
  document.getElementById('unit-search-clear').style.display = 'none';
  document.getElementById('btn-start-inspection').disabled = true;
  document.getElementById('location').focus();
}

// ── Navegación de inspección ──

function goBackFromInspection() {
  showStep('step-home');
}

function checkShareSupport() {
  const shareBtn = document.getElementById('btn-share');
  if (shareBtn && navigator.share && navigator.canShare) {
    shareBtn.style.display = '';
  }
}

function changeRoomCount(field, delta) {
  const el = document.getElementById(field);
  const val = Math.max(1, Math.min(10, parseInt(el.textContent) + delta));
  el.textContent = val;
}

function startInspection() {
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value;
  const auditor = document.getElementById('auditor').value.trim();

  // Must have a selected unit
  if (!window._loadedInventory) {
    showToast('⚠️ Selecciona una unidad primero');
    const group = document.getElementById('location').closest('.form-group');
    group.classList.add('error');
    setTimeout(() => group.classList.remove('error'), 800);
    return;
  }

  let valid = true;
  ['date', 'auditor'].forEach(id => {
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

  const inv = window._loadedInventory;
  inv.rooms.forEach((room, i) => {
    ROOM_CONFIG[room.roomId] = { icon: 'inventory_2', name: room.roomName, shortName: room.roomName };
    ROOM_COLORS[room.roomId] = DYNAMIC_ROOM_COLORS[i % DYNAMIC_ROOM_COLORS.length];
  });
  SECTIONS = buildSectionsFromInventory(inv);
  inspectionInfo = { location, date, auditor, fromInventory: true, sourceUnitId: window._selectedUnitId || inv.unitId };

  inspectionData = {};
  currentMode = 'inspection';
  startTimer();
  showStep('step-rooms');
  renderRooms();
}

// ── Construir secciones desde un inventario guardado en la base de datos ──

function buildSectionsFromInventory(inventoryDoc) {
  return inventoryDoc.rooms.map((room) => ({
    id: room.roomId,
    name: room.roomName,
    items: room.items.map(item => ({
      name: item.name,
      sub: item.sku || '',
      type: 'variable',
      qty: item.qty,
      hint: item.notes || '',
      area: room.roomName,
      price: item.price,
      inventoryItemId: item.itemId,
    })),
  }));
}

// ── Cargar y mostrar lista de unidades con inventario ──

async function loadAndRenderUnitList() {
  const listEl = document.getElementById('unit-list');
  listEl.innerHTML = `
    <div class="loading-state">
      <span class="material-symbols-rounded loading-icon">sync</span>
      <p>Cargando inventarios...</p>
    </div>
  `;

  if (!isAPIReady()) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">cloud_off</span>
        <p>No hay conexión a la base de datos.<br>Por favor, verifica que el servidor esté ejecutándose.</p>
      </div>
    `;
    return;
  }

  try {
    const units = await loadInventoryList();
    if (units.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <span class="material-symbols-rounded">inventory_2</span>
          <p>No hay inventarios guardados.<br>Crea uno primero en modo Inventario.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = units.map(u => {
      const date = u.updatedAt ? new Date(u.updatedAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
      return `
        <div class="unit-card">
          <span class="material-symbols-rounded unit-card-icon">apartment</span>
          <div class="unit-card-info">
            <div class="unit-card-name">${u.unitName}</div>
            <div class="unit-card-meta">${u.itemCount} artículo${u.itemCount !== 1 ? 's' : ''} · ${date}</div>
          </div>
          <div class="unit-card-actions">
            <button class="unit-action-btn" onclick="editInventory('${u.unitId}')" title="Editar inventario">
              <span class="material-symbols-rounded">edit</span>
            </button>
            <button class="unit-action-btn primary" onclick="selectUnitForInspection('${u.unitId}')" title="Iniciar inspección">
              <span class="material-symbols-rounded">fact_check</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">error</span>
        <p>Error al cargar inventarios.<br>${err.message}</p>
      </div>
    `;
  }
}

async function selectUnitForInspection(unitId) {
  showToast('⏳ Cargando inventario...');
  try {
    const inventoryDoc = await loadInventoryByUnit(unitId);
    if (!inventoryDoc) {
      showToast('❌ Inventario no encontrado');
      return;
    }

    window._loadedInventory = inventoryDoc;

    // Pre-llenar el formulario de inspección
    document.getElementById('location').value = inventoryDoc.unitName;
    document.getElementById('location').readOnly = true;
    const _today = new Date();
    document.getElementById('date').value = `${_today.getFullYear()}-${String(_today.getMonth() + 1).padStart(2, '0')}-${String(_today.getDate()).padStart(2, '0')}`;

    document.getElementById('auditor').value = '';

    // Ocultar controles de recámaras/baños
    document.getElementById('room-count-row').style.display = 'none';

    // Actualizar encabezado
    document.getElementById('insp-welcome-title').textContent = 'Inspección';
    document.getElementById('insp-welcome-sub').textContent = inventoryDoc.unitName;

    showStep('step-welcome');
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar unidad');
  }
}

// ══════════════════════════════════════════
// HISTÓRICO
// ══════════════════════════════════════════

let _allRecords = [];

async function loadAndRenderHistorico() {
  const listEl = document.getElementById('historico-list');
  listEl.innerHTML = `
    <div class="loading-state">
      <span class="material-symbols-rounded loading-icon">sync</span>
      <p>Cargando registros...</p>
    </div>
  `;

  if (!isAPIReady()) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">cloud_off</span>
        <p>No hay conexión al servidor. Verifica tu internet e intenta de nuevo.</p>
      </div>
    `;
    return;
  }

  try {
    _allRecords = await loadAllRecords();
    renderHistoricoList();
    // Update KPI analytics after loading records
    updateAnalytics();
  } catch (err) {
    console.error('Error loading histórico:', err);
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">error_outline</span>
        <p>Error al cargar registros: ${err.message}</p>
      </div>
    `;
  }
}

function filterHistorico() {
  renderHistoricoList();
}

function renderHistoricoList() {
  const listEl = document.getElementById('historico-list');
  const search = (document.getElementById('historico-search').value || '').trim().toLowerCase();
  const dateFrom = document.getElementById('historico-date-from').value;
  const dateTo = document.getElementById('historico-date-to').value;
  const sort = document.getElementById('historico-sort').value;

  // Filter (exclude onboarding — shown in its own folder)
  let records = _allRecords.filter(r => {
    if (r.type === 'onboarding') return false;
    if (search && !(r.unitName || '').toLowerCase().includes(search)) return false;
    if (dateFrom && r.date && r.date < dateFrom) return false;
    if (dateTo && r.date && r.date > dateTo) return false;
    return true;
  });

  // Group by unitName
  const groups = {};
  records.forEach(r => {
    const key = r.unitName;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  // Sort groups
  let sortedKeys = Object.keys(groups);
  if (sort === 'az') {
    sortedKeys.sort((a, b) => a.localeCompare(b));
  } else if (sort === 'za') {
    sortedKeys.sort((a, b) => b.localeCompare(a));
  } else if (sort === 'oldest') {
    sortedKeys.sort((a, b) => {
      const aDate = groups[a][groups[a].length - 1]?.updatedAt || '';
      const bDate = groups[b][groups[b].length - 1]?.updatedAt || '';
      return aDate.localeCompare(bDate);
    });
  } else {
    // 'recent' — default: most recent first (groups already sorted by most recent record)
    sortedKeys.sort((a, b) => {
      const aDate = groups[a][0]?.updatedAt || '';
      const bDate = groups[b][0]?.updatedAt || '';
      return bDate.localeCompare(aDate);
    });
  }

  // Build onboarding folder card (pinned, not affected by search/date filters)
  const allOnbRecords = _allRecords.filter(r => r.type === 'onboarding');
  const onbFolderHtml = allOnbRecords.length > 0 ? `
    <div class="historico-unit-card onboarding-folder-card" onclick="openOnboardingHistorico()">
      <span class="material-symbols-rounded historico-unit-icon" style="color:#10b981">home_work</span>
      <div class="historico-unit-info">
        <div class="historico-unit-name">Inspecciones de Onboarding</div>
        <div class="historico-unit-meta">${allOnbRecords.length} inspección${allOnbRecords.length !== 1 ? 'es' : ''} · ${[...new Set(allOnbRecords.map(r => r.unitName))].length} propiedad${[...new Set(allOnbRecords.map(r => r.unitName))].length !== 1 ? 'es' : ''}</div>
      </div>
      <span class="material-symbols-rounded unit-card-arrow">chevron_right</span>
    </div>` : '';

  if (sortedKeys.length === 0 && !onbFolderHtml) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">inventory_2</span>
        <p>${search ? 'No encontramos resultados para "' + search + '".' : 'Aún no hay registros guardados. ¡Crea tu primer inventario o inspección!'}</p>
      </div>
    `;
    return;
  }

  const unitCardsHtml = sortedKeys.map(unitName => {
    const recs = groups[unitName];
    const invCount  = recs.filter(r => r.type === 'inventory').length;
    const inspCount = recs.filter(r => r.type === 'inspection').length;
    const meta = [];
    if (invCount)  meta.push(`${invCount} inventario${invCount > 1 ? 's' : ''}`);
    if (inspCount) meta.push(`${inspCount} inspección${inspCount > 1 ? 'es' : ''}`);
    return `
      <div class="historico-unit-card" onclick="openHistoricoUnit('${unitName.replace(/'/g, "\\'")}')">
        <span class="material-symbols-rounded historico-unit-icon">apartment</span>
        <div class="historico-unit-info">
          <div class="historico-unit-name">${unitName}</div>
          <div class="historico-unit-meta">${meta.join(' · ')}</div>
        </div>
        <span class="material-symbols-rounded unit-card-arrow">chevron_right</span>
      </div>`;
  }).join('');

  listEl.innerHTML = onbFolderHtml + unitCardsHtml;
}

function openOnboardingHistorico() {
  const onbRecords = _allRecords.filter(r => r.type === 'onboarding');
  onbRecords.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

  const count = onbRecords.length;
  document.getElementById('historico-onboarding-sub').textContent =
    `${count} inspección${count !== 1 ? 'es' : ''} en ${[...new Set(onbRecords.map(r => r.unitName))].length} propiedad${[...new Set(onbRecords.map(r => r.unitName))].length !== 1 ? 'es' : ''}`;

  const listEl = document.getElementById('historico-onboarding-list');
  if (onbRecords.length === 0) {
    listEl.innerHTML = `<div class="empty-state"><span class="material-symbols-rounded">home_work</span><p>No hay inspecciones de onboarding.</p></div>`;
    showStep('step-historico-onboarding');
    return;
  }

  listEl.innerHTML = onbRecords.map(r => {
    const dateStr = r.date ? new Date(r.date + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const safeId  = r.unitId.replace(/'/g, "\\'");
    const delDesc = `Onboarding: ${r.unitName} · ${dateStr}`.replace(/'/g, "\\'");
    return `
      <div class="historico-record-card" onclick="viewOnboardingRecord('${safeId}')">
        <span class="material-symbols-rounded historico-record-icon onboarding">home_work</span>
        <div class="historico-record-info">
          <div class="historico-record-type">Onboarding${r.versionCount > 0 ? `<span class="version-badge">v${r.versionCount + 1}</span>` : ''}</div>
          <div class="historico-record-meta">${r.unitName} · ${dateStr} · ${r.auditor || 'Sin responsable'}</div>
        </div>
        <div class="unit-card-actions">
          <button class="unit-action-btn" onclick="event.stopPropagation(); editOnboardingFromHistorico('${safeId}')" title="Editar">
            <span class="material-symbols-rounded">edit</span>
          </button>
          <button class="unit-action-btn danger" onclick="event.stopPropagation(); showDeleteModal('${safeId}','${delDesc}')" title="Eliminar">
            <span class="material-symbols-rounded">delete</span>
          </button>
        </div>
      </div>`;
  }).join('');

  showStep('step-historico-onboarding');
}

function openHistoricoUnit(unitName) {
  document.getElementById('historico-unit-title').textContent = unitName;
  const recs = _allRecords.filter(r => r.unitName === unitName);

  // Sort by date descending
  recs.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

  const invSub = recs.filter(r => r.type === 'inventory').length;
  const inspSub = recs.filter(r => r.type === 'inspection').length;
  const onbSub = recs.filter(r => r.type === 'onboarding').length;
  const subParts = [];
  if (invSub) subParts.push(`${invSub} inventario${invSub !== 1 ? 's' : ''}`);
  if (inspSub) subParts.push(`${inspSub} inspección${inspSub !== 1 ? 'es' : ''}`);
  if (onbSub) subParts.push(`${onbSub} onboarding${onbSub !== 1 ? 's' : ''}`);
  document.getElementById('historico-unit-sub').textContent = subParts.join(', ');

  const listEl = document.getElementById('historico-unit-records');
  listEl.innerHTML = recs.map(r => {
    const isInsp = r.type === 'inspection';
    const isOnb = r.type === 'onboarding';
    const icon = isOnb ? 'home_work' : (isInsp ? 'fact_check' : 'inventory_2');
    const typeLabel = isOnb ? 'Onboarding' : (isInsp ? 'Inspección' : 'Inventario');
    const dateStr = r.date ? new Date(r.date + 'T00:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const detail = isInsp
      ? `${r.completedCount}/${r.itemCount} artículos`
      : `${r.itemCount} artículo${r.itemCount !== 1 ? 's' : ''}`;
    const safeId = r.unitId.replace(/'/g, "\\'");
    const editFn = isOnb
      ? `editOnboardingFromHistorico('${safeId}')`
      : (isInsp ? `editInspectionFromHistorico('${safeId}')` : `editInventory('${safeId}')`);
    const clickFn = isOnb ? `viewOnboardingRecord('${safeId}')` : `viewHistoricoRecord('${safeId}')`;
    const delDesc = `${typeLabel}: ${r.unitName} · ${dateStr}`;

    return `
      <div class="historico-record-card" onclick="${clickFn}">
        <span class="material-symbols-rounded historico-record-icon ${r.type}">${icon}</span>
        <div class="historico-record-info">
          <div class="historico-record-type">${typeLabel}${r.versionCount > 0 ? `<span class="version-badge">v${r.versionCount + 1}</span>` : ''}</div>
          <div class="historico-record-meta">${dateStr} · ${detail} · ${r.auditor || 'Sin responsable'}</div>
        </div>
        <div class="unit-card-actions">
          <button class="unit-action-btn" onclick="event.stopPropagation(); ${editFn}" title="Editar">
            <span class="material-symbols-rounded">edit</span>
          </button>
          <button class="unit-action-btn danger" onclick="event.stopPropagation(); showDeleteModal('${safeId}', '${delDesc.replace(/'/g, "\\'")}')" title="Eliminar">
            <span class="material-symbols-rounded">delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  showStep('step-historico-unit');
}

async function editInspectionFromHistorico(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) { showToast('❌ No encontrado'); return; }

    const sourceId = doc.sourceUnitId;
    if (!sourceId) { showToast('❌ Sin inventario base'); return; }

    const sourceInv = await loadInventoryByUnit(sourceId);
    if (!sourceInv) { showToast('❌ Inventario base no encontrado'); return; }

    window._loadedInventory = sourceInv;
    window._selectedUnitId = sourceId;
    window._editingInspectionId = unitId;

    document.getElementById('location').value = sourceInv.unitName;
    document.getElementById('location').readOnly = true;
    document.getElementById('unit-search-clear').style.display = 'flex';
    document.getElementById('btn-start-inspection').disabled = false;

    const today = new Date();
    document.getElementById('date').value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    document.getElementById('auditor').value = doc.auditor || '';

    showStep('step-welcome');
    showToast(`✅ Editando inspección de ${sourceInv.unitName}`);
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar inspección');
  }
}

async function viewHistoricoRecord(unitId) {
  showToast('⏳ Cargando...');
  try {
    const doc = await loadInventoryByUnit(unitId);
    if (!doc) {
      showToast('❌ Registro no encontrado');
      return;
    }

    if (doc.type === 'inspection') {
      // Show inspection in export/review mode
      doc.rooms.forEach((room, i) => {
        ROOM_CONFIG[room.roomId] = { icon: 'inventory_2', name: room.roomName, shortName: room.roomName };
        ROOM_COLORS[room.roomId] = DYNAMIC_ROOM_COLORS[i % DYNAMIC_ROOM_COLORS.length];
      });
      SECTIONS = buildSectionsFromInventory(doc);
      // Populate inspectionData from saved statuses
      inspectionData = {};
      doc.rooms.forEach(room => {
        const sectionIdx = SECTIONS.findIndex(s => s.id === room.roomId);
        if (sectionIdx < 0) return;
        room.items.forEach((item, idx) => {
          const key = `${room.roomId}-${idx}`;
          inspectionData[key] = {
            status: item.status || null,
            qty: item.qty || 1,
            observations: item.notes || '',
            photos: item.photos || [],
            photoTimes: item.photoTimes || [],
          };
        });
      });
      inspectionInfo = { location: doc.unitName, date: doc.date, auditor: doc.auditor, duration: doc.duration };
      currentMode = 'inspection';
      window._viewingRecord = true;
      showExport();
    } else {
      // Show inventory in export/review mode
      inventoryInfo = {
        unitId: doc.unitId,
        unitName: doc.unitName,
        date: doc.date,
        auditor: doc.auditor,
        duration: doc.duration,
        durationMs: doc.durationMs,
      };
      inventoryRooms = (doc.rooms || []).map(r => ({
        ...r,
        items: (r.items || []).map(i => ({ ...i, photos: [...(i.photos || [])], photoTimes: [...(i.photoTimes || [])] }))
      }));
      currentMode = 'inventory';
      showInventoryExport();
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Error al cargar registro');
  }
}

// ══════════════════════════════════════════
// PASO 2: SELECCIÓN DE CUARTO
// ══════════════════════════════════════════

function renderRooms() {
  const grid = document.getElementById('room-grid');
  const totalItems = getTotalItems();
  const totalCompleted = getTotalCompleted();

  const pct = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0;
  document.getElementById('overall-bar').style.width = pct + '%';
  const roomsCompleted = SECTIONS.filter((_, i) => isSectionCompleted(i)).length;
  document.getElementById('overall-label').textContent = `Cuartos listos: ${roomsCompleted} de ${SECTIONS.length}`;

  grid.innerHTML = '';

  SECTIONS.forEach((section, idx) => {
    const config = ROOM_CONFIG[section.id];
    const color = ROOM_COLORS[section.id];
    const completed = getSectionCompleted(idx);
    const total = section.items.length;
    const isDone = completed === total;
    const isStarted = completed > 0 && !isDone;

    const firstIncomplete = SECTIONS.findIndex((_, i) => !isSectionCompleted(i));
    const isPulseNext = !isDone && idx === firstIncomplete;
    const card = document.createElement('div');
    card.className = 'room-card' + (isDone ? ' completed' : '') + (isStarted ? ' in-progress' : '') + (isPulseNext ? ' pulse-next' : '');
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

  // Hint / descripción — always visible
  const hintEl = document.getElementById('item-hint');
  if (hintEl) {
    hintEl.textContent = item.hint || '';
  }

  // Botones de estado
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  if (data.status) {
    const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing' };
    const sel = document.querySelector(`#status-grid .status-btn${statusMap[data.status]}`);
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

  const notesBtn = document.querySelector('.notes-btn');
  if (data.observations) {
    notesBtn.classList.add('has-content');
  } else {
    notesBtn.classList.remove('has-content');
  }

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
  const alreadyHasStatus = !!(data.status);
  if (currentItemIndex === section.items.length - 1) {
    navNext.innerHTML = '<span class="material-symbols-rounded">check</span> Listo';
    navNext.className = 'nav-next finish' + (alreadyHasStatus ? ' nav-ready' : '');
  } else {
    navNext.innerHTML = 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';
    navNext.className = 'nav-next' + (alreadyHasStatus ? ' nav-ready' : '');
  }
}

function showHelpModal() {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const names = getItemNames(item.name);
  const iconName = getItemIcon(item.name);

  const modal = document.getElementById('help-modal');
  document.getElementById('help-modal-icon').textContent = iconName;
  document.getElementById('help-modal-name').textContent = names.es;
  document.getElementById('help-modal-hint').textContent = item.hint || 'Sin descripción adicional';

  // Descripción expandida de qué revisar
  const details = getExpandedHint(names.es, item);
  document.getElementById('help-modal-details').textContent = details;

  modal.classList.add('visible');
}

function closeHelpModal() {
  document.getElementById('help-modal').classList.remove('visible');
}

function getExpandedHint(name, item) {
  // Contexto adicional sobre cómo revisar el artículo
  const typeText = item.type === 'fixed' ? 'Activo fijo — revisar estado físico, funcionamiento y limpieza.' : 'Activo variable — verificar presencia, cantidad y condición.';
  return `${typeText} Cantidad esperada: ${item.qty}.`;
}

function setStatus(status) {
  const section = SECTIONS[currentSectionIndex];
  const item = section.items[currentItemIndex];
  const key = `${section.id}-${currentItemIndex}`;

  if (!inspectionData[key]) {
    inspectionData[key] = { qty: item.qty };
  }
  inspectionData[key].status = status;

  const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing' };
  document.querySelectorAll('#status-grid .status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  const sel = document.querySelector(`#status-grid .status-btn${statusMap[status]}`);
  if (sel) {
    sel.classList.add('selected', 'just-selected');
  }

  const labels = { 'good': '✅ BIEN', 'damaged': '🔧 DAÑADO', 'missing': '❌ FALTA' };
  showToast(labels[status] || '✅ Listo');

  // Highlight the Siguiente button so user knows to press it
  const navNext = document.getElementById('nav-next');
  if (navNext) navNext.classList.add('nav-ready');

  _scheduleSave();
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
  cancelAutoAdvance();
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
    if (!inspectionData[key].photoTimes) inspectionData[key].photoTimes = [];
    compressImage(e.target.result, 800, 0.7, (compressed) => {
      inspectionData[key].photos.push(compressed);
      inspectionData[key].photoTimes.push(new Date().toISOString());
      renderPhotos(key);
      document.querySelector('.camera-btn').classList.add('has-content');
      showToast('📷 Foto agregada');
      _scheduleSave();
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
  strip.innerHTML = data.photos.map((p, i) => {
    const timeStr = data.photoTimes && data.photoTimes[i]
      ? new Date(data.photoTimes[i]).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      : '';
    return `<div class="photo-thumb">
      <img src="${p}" alt="foto">
      ${timeStr ? `<span class="photo-time">${timeStr}</span>` : ''}
      <button class="remove-photo" onclick="removePhoto('${key}', ${i})">×</button>
    </div>`;
  }).join('');
}

function removePhoto(key, photoIndex) {
  inspectionData[key].photos.splice(photoIndex, 1);
  if (inspectionData[key].photoTimes) inspectionData[key].photoTimes.splice(photoIndex, 1);
  renderPhotos(key);
  if (!inspectionData[key].photos.length) {
    document.querySelector('.camera-btn').classList.remove('has-content');
  }
}

function toggleNotes() {
  cancelAutoAdvance();
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
  cancelAutoAdvance();
  saveCurrentNotes();
  if (currentItemIndex > 0) {
    currentItemIndex--;
    renderItem();
    window.scrollTo(0, 0);
  }
}

function nextItem() {
  cancelAutoAdvance();
  const navNext = document.getElementById('nav-next');
  if (navNext) navNext.classList.remove('nav-ready');
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
  cancelAutoAdvance();
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
  launchConfetti();

  // Auto-continue after 2.5s
  const hint = document.getElementById('auto-continue-hint');
  if (hint) hint.classList.add('visible');
  const autoContinueTimer = setTimeout(() => {
    if (document.getElementById('step-room-done').classList.contains('active')) {
      if (hint) hint.classList.remove('visible');
      backToRooms();
    }
  }, 2500);

  // Cancel auto-continue if user taps button manually
  const continueBtn = document.getElementById('room-done-continue');
  if (continueBtn) {
    const orig = continueBtn.onclick;
    continueBtn.onclick = () => {
      clearTimeout(autoContinueTimer);
      if (hint) hint.classList.remove('visible');
      backToRooms();
    };
  }
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';
  const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '🎈'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'confetti-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    el.style.animationDelay = Math.random() * 0.8 + 's';
    el.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
    container.appendChild(el);
  }
  setTimeout(() => { if (container) container.innerHTML = ''; }, 4000);
}

// ══════════════════════════════════════════
// PASO 5: EXPORTAR
// ══════════════════════════════════════════

function showExport() {
  stopTimer();
  showStep('step-export');

  // Reset export screen for inspection mode
  document.getElementById('export-icon').textContent = 'emoji_events';
  document.getElementById('export-title').textContent = '¡Todo Listo!';

  const total = getTotalItems();
  const completed = getTotalCompleted();
  document.getElementById('export-summary').textContent =
    `${inspectionInfo.location} — ${completed}/${total} artículos`;

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

      const photos = (data.photos || []).map((p, pi) => {
        const timeStr = data.photoTimes && data.photoTimes[pi]
          ? new Date(data.photoTimes[pi]).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          : '';
        let diffStr = '';
        if (pi > 0 && data.photoTimes && data.photoTimes[pi] && data.photoTimes[pi - 1]) {
          const diffMs = new Date(data.photoTimes[pi]) - new Date(data.photoTimes[pi - 1]);
          const diffSec = Math.floor(diffMs / 1000);
          const dm = Math.floor(diffSec / 60);
          const ds = diffSec % 60;
          diffStr = dm > 0 ? ` (+${dm}m${ds}s)` : ` (+${ds}s)`;
        }
        return `<div class="review-photo-wrap"><img src="${p}" alt="foto">${timeStr ? `<span class="review-photo-time">${timeStr}${diffStr}</span>` : ''}</div>`;
      }).join('');

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

  checkShareSupport();

  // Save inspection to database (skip when viewing a historic record)
  if (!window._viewingRecord && isAPIReady()) {
    saveInspectionToDatabase();
  }
  window._viewingRecord = false;
  _clearInspectionDraft();
}

async function saveInspectionToDatabase() {
  try {
    const total = getTotalItems();
    const completed = getTotalCompleted();
    const elapsed = getElapsedTime();
    const editingId = window._editingInspectionId || null;

    const inspDoc = {
      type: 'inspection',
      unitId: editingId || ('insp-' + Date.now()),
      sourceUnitId: inspectionInfo.sourceUnitId || null,
      unitName: inspectionInfo.location,
      date: inspectionInfo.date,
      auditor: inspectionInfo.auditor,
      duration: formatTime(elapsed),
      durationMs: elapsed,
      totalItems: total,
      completedItems: completed,
      rooms: SECTIONS.map(section => ({
        roomId: section.id,
        roomName: section.name,
        items: section.items.map((item, idx) => {
          const key = `${section.id}-${idx}`;
          const d = inspectionData[key] || {};
          return {
            itemId: item.inventoryItemId || `${section.id}-${idx}`,
            name: item.name,
            sku: item.sub || '',
            price: item.price || 0,
            qty: d.qty !== undefined ? d.qty : item.qty,
            status: d.status || null,
            notes: d.observations || '',
            photos: d.photos || [],
            photoTimes: d.photoTimes || [],
          };
        })
      })),
    };

    if (editingId) {
      await updateInspectionResult(editingId, inspDoc);
      window._editingInspectionId = null;
      showToast('☁️ Inspección actualizada');
    } else {
      await saveInspectionResult(inspDoc);
      showToast('☁️ Inspección guardada');
    }
  } catch (err) {
    console.error('Error guardando inspección:', err);
  }
}

// ══════════════════════════════════════════
// WEB SHARE API
// ══════════════════════════════════════════

async function shareFiles() {
  if (!SECTIONS || SECTIONS.length === 0) {
    showToast('⚠️ No hay datos de inspección para compartir');
    return;
  }

  try {
    showToast('⏳ Preparando archivos...');

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
      exportPDF();
      showToast('📄 Descargado (compartir no disponible)');
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
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

// ══════════════════════════════════════════
// LOGO Y CERTIFICACIONES (Canvas → DataURL)
// ══════════════════════════════════════════

function createLogoDataURL() {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 90;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 320, 90);

  // "DEL MAR" wordmark in white
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('DEL MAR', 0, 2);

  // Subtitle in gold
  ctx.fillStyle = '#E8C44A';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('GESTIÓN DE PROPIEDADES', 2, 50);

  // Gold underline
  ctx.strokeStyle = '#E8C44A';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 72);
  ctx.lineTo(260, 72);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

function createCertificationsDataURL() {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 44;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 720, 44);

  const labels = ['ISO 9001', 'MARRIOTT', 'SAFE TRAVELS', 'AIRBNB', 'APAR', 'AIRDNA'];
  ctx.font = 'bold 13px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  let x = 0;
  labels.forEach(text => {
    const tw = ctx.measureText(text).width;
    const pw = tw + 22;
    const ph = 28;
    const py = 8;
    const r = 6;

    // Pill background
    ctx.fillStyle = '#EFF6FF';
    ctx.beginPath();
    ctx.moveTo(x + r, py);
    ctx.lineTo(x + pw - r, py);
    ctx.arcTo(x + pw, py, x + pw, py + r, r);
    ctx.lineTo(x + pw, py + ph - r);
    ctx.arcTo(x + pw, py + ph, x + pw - r, py + ph, r);
    ctx.lineTo(x + r, py + ph);
    ctx.arcTo(x, py + ph, x, py + ph - r, r);
    ctx.lineTo(x, py + r);
    ctx.arcTo(x, py, x + r, py, r);
    ctx.closePath();
    ctx.fill();

    // Pill border
    ctx.strokeStyle = '#BFDBFE';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Label
    ctx.fillStyle = '#1E3A8A';
    ctx.fillText(text, x + pw / 2, py + ph / 2 + 0.5);

    x += pw + 10;
  });

  return canvas.toDataURL('image/png');
}

// ══════════════════════════════════════════
// CONSTRUIR PDF (diseño corporativo)
// ══════════════════════════════════════════

function buildPDF(jsPDF) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = 210;
  const pageH = 297;
  const margin = 14;
  const contentW = pageW - margin * 2;

  // Design tokens
  const navy     = [30, 58, 95];
  const gold     = [200, 150, 45];
  const lblue    = [232, 240, 254];
  const altRow   = [248, 250, 252];
  const border   = [226, 232, 240];
  const txtDark  = [15, 23, 42];
  const txtMid   = [71, 85, 105];
  const txtLight = [148, 163, 184];
  const maxY     = pageH - 14;

  const statusCfg = {
    good:    { text: [21, 128, 61],   bg: [220, 252, 231] },
    damaged: { text: [185, 28, 28],   bg: [254, 226, 226] },
    missing: { text: [180, 83, 9],    bg: [254, 243, 199] },
    new:     { text: [29, 78, 216],   bg: [219, 234, 254] },
  };

  let y = 0;

  function checkPage(needed) {
    if (y + needed > maxY) {
      doc.addPage();
      drawRunningHeader();
      y = 16;
    }
  }

  function drawRunningHeader() {
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 10, 'F');
    doc.setFillColor(...gold);
    doc.rect(0, 10, pageW, 1, 'F');
    doc.setFontSize(7.5);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('DEL MAR', margin, 7);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(200, 220, 255);
    doc.text(`${inspectionInfo.location}  ·  ${inspectionInfo.date}`, pageW - margin, 7, { align: 'right' });
  }

  // ── COVER HEADER ────────────────────────────────────────────────
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageW, 42, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 42, pageW, 1.5, 'F');

  try {
    const logoData = createLogoDataURL();
    doc.addImage(logoData, 'PNG', margin, 7, 54, 15);
  } catch (e) {}

  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(180, 210, 255);
  doc.text('REPORTE DE INSPECCIÓN E INVENTARIO', pageW - margin, 13, { align: 'right' });
  doc.setFontSize(15);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  const locLines = doc.splitTextToSize(inspectionInfo.location || '—', 110);
  doc.text(locLines, pageW - margin, 25, { align: 'right' });

  y = 51;

  // Metadata card
  doc.setFillColor(...altRow);
  doc.setDrawColor(...border);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 24, 2, 2, 'FD');

  const c1 = margin + 6;
  const c2 = margin + contentW / 2 + 4;
  const labelY  = y + 6;
  const valueY  = y + 12;
  const label2Y = y + 17;
  const value2Y = y + 23;

  doc.setFontSize(6.5);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...txtMid);
  doc.text('INSPECTOR', c1, labelY);
  doc.text('FECHA', c2, labelY);
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...txtDark);
  doc.text(inspectionInfo.auditor || '—', c1, valueY);
  doc.text(inspectionInfo.date || '—', c2, valueY);

  doc.setFontSize(6.5);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...txtMid);
  doc.text('DURACIÓN', c1, label2Y);
  doc.text('HABITACIONES  /  BAÑOS', c2, label2Y);
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...txtDark);
  doc.text(inspectionInfo.duration || '—', c1, value2Y);
  doc.text(`${inspectionInfo.numBedrooms || '—'}  /  ${inspectionInfo.numBathrooms || '—'}`, c2, value2Y);

  y += 30;

  // Status summary chips
  const allData = Object.values(inspectionData);
  const counts  = { good: 0, damaged: 0, missing: 0, new: 0 };
  allData.forEach(d => { if (d.status && counts[d.status] !== undefined) counts[d.status]++; });
  const totalFilled = Object.values(counts).reduce((a, b) => a + b, 0);

  if (totalFilled > 0) {
    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...txtMid);
    doc.text('RESUMEN DE CONDICIÓN', margin, y + 4);
    y += 7;

    const chipW = (contentW - 9) / 4;
    ['good', 'damaged', 'missing', 'new'].forEach((s, i) => {
      const cfg   = statusCfg[s];
      const label = (STATUS_OPTIONS.find(o => o.value === s) || {}).label || s;
      const cx    = margin + i * (chipW + 3);
      doc.setFillColor(...cfg.bg);
      doc.setDrawColor(...border);
      doc.setLineWidth(0.25);
      doc.roundedRect(cx, y, chipW, 14, 1.5, 1.5, 'FD');
      doc.setFontSize(15);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...cfg.text);
      doc.text(String(counts[s]), cx + chipW / 2, y + 9, { align: 'center' });
      doc.setFontSize(6);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...txtMid);
      doc.text(label.toUpperCase(), cx + chipW / 2, y + 13.5, { align: 'center' });
    });
    y += 19;
  }

  // ── SECTIONS ────────────────────────────────────────────────────
  if (!SECTIONS || SECTIONS.length === 0) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...txtMid);
    doc.text('No hay datos de inspección para mostrar.', margin, y + 20);
    doc.setFontSize(10);
    doc.setTextColor(...txtLight);
    doc.text('Asegúrate de haber cargado los items de inspección antes de exportar.', margin, y + 30, { maxWidth: contentW });
    return doc;
  }

  SECTIONS.forEach((section, sIdx) => {
    if (sIdx > 0) {
      doc.addPage();
      drawRunningHeader();
      y = 16;
    }

    checkPage(18);
    // Section header band
    doc.setFillColor(...navy);
    doc.rect(margin, y, contentW, 9, 'F');
    doc.setFillColor(...gold);
    doc.rect(margin, y, 3, 9, 'F');
    doc.setFontSize(9.5);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(section.name.toUpperCase(), margin + 8, y + 6);
    y += 13;

    // Build area groups
    const areaGroups = [];
    let curArea = null;
    section.items.forEach((item, idx) => {
      if (item.area !== curArea) {
        curArea = item.area;
        areaGroups.push({ area: curArea, items: [] });
      }
      areaGroups[areaGroups.length - 1].items.push({ item, idx });
    });

    areaGroups.forEach(group => {
      checkPage(24);

      // Area sub-header
      doc.setFillColor(...lblue);
      doc.rect(margin, y, contentW, 7, 'F');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...navy);
      doc.text(group.area.toUpperCase(), margin + 5, y + 5);
      y += 9;

      // Column header row
      const colX = [margin + 2, margin + 42, margin + 90, margin + 118, margin + 136, margin + 153];
      doc.setFillColor(245, 247, 250);
      doc.setDrawColor(...border);
      doc.setLineWidth(0.2);
      doc.rect(margin, y, contentW, 6, 'FD');
      doc.setFontSize(6.5);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...txtMid);
      ['SUBCATEGORÍA', 'ARTÍCULO', 'ESTADO', 'TIPO', 'CANT', 'OBSERVACIONES'].forEach((lbl, ci) => {
        doc.text(lbl, colX[ci], y + 4.2);
      });
      y += 7;

      let currentSub = null;
      let rowIdx     = 0;

      group.items.forEach(({ item, idx: itemIdx }) => {
        const key       = `${section.id}-${itemIdx}`;
        const data      = inspectionData[key] || {};
        const statusLbl = STATUS_OPTIONS.find(o => o.value === data.status);
        const names     = getItemNames(item.name);
        const hasPhotos = data.photos && data.photos.length > 0;
        const obsColWidth = contentW - (colX[5] - margin);

        let rowH = hasPhotos ? 26 : 7;

        // Calculate additional height needed for multi-line observations
        if (data.observations) {
          const obsLines = doc.splitTextToSize(data.observations, obsColWidth);
          const lineHeight = 3.8;
          const obsHeight = obsLines.length * lineHeight;
          const minObsHeight = 5;
          const additionalHeight = Math.max(0, obsHeight - minObsHeight);
          rowH += additionalHeight;
        }

        checkPage(rowH + 3);

        // Alternating stripe
        if (rowIdx % 2 === 1) {
          doc.setFillColor(...altRow);
          doc.rect(margin, y, contentW, rowH, 'F');
        }

        doc.setFontSize(7.5);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...txtDark);

        if (item.sub !== currentSub) {
          currentSub = item.sub;
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...navy);
          doc.text(doc.splitTextToSize(item.sub || '', 38)[0], colX[0], y + 5);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...txtDark);
        }

        doc.text(doc.splitTextToSize(names.es, 45)[0], colX[1], y + 5);

        // Status chip
        if (data.status && statusCfg[data.status]) {
          const cfg   = statusCfg[data.status];
          const label = statusLbl ? statusLbl.label : data.status;
          const cw = 26, ch = 5;
          doc.setFillColor(...cfg.bg);
          doc.roundedRect(colX[2], y + 1, cw, ch, 1, 1, 'F');
          doc.setFontSize(6.5);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...cfg.text);
          doc.text(label, colX[2] + cw / 2, y + 4.8, { align: 'center' });
          doc.setFont(undefined, 'normal');
          doc.setTextColor(...txtDark);
          doc.setFontSize(7.5);
        } else {
          doc.setTextColor(...txtLight);
          doc.text('—', colX[2], y + 5);
          doc.setTextColor(...txtDark);
        }

        doc.text(item.type === 'fixed' ? 'Fijo' : 'Variable', colX[3], y + 5);
        doc.setFont(undefined, 'bold');
        doc.text(String(data.qty !== undefined ? data.qty : item.qty), colX[4], y + 5);
        doc.setFont(undefined, 'normal');

        if (data.observations) {
          doc.setTextColor(...txtMid);
          doc.text(doc.splitTextToSize(data.observations, obsColWidth), colX[5], y + 5);
          doc.setTextColor(...txtDark);
        }

        if (hasPhotos) {
          const photoY = y + 8;
          data.photos.forEach((photo, pi) => {
            if (pi >= 3) return;
            const px = colX[1] + pi * 22;
            try {
              doc.setDrawColor(...border);
              doc.setLineWidth(0.3);
              doc.rect(px - 0.5, photoY - 0.5, 17, 17, 'D');
              doc.addImage(photo, 'JPEG', px, photoY, 16, 16);
            } catch (e) {}
            if (data.photoTimes && data.photoTimes[pi]) {
              const t = new Date(data.photoTimes[pi]);
              const tl = t.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              let dl = '';
              if (pi > 0 && data.photoTimes[pi - 1]) {
                const ds = Math.floor((t - new Date(data.photoTimes[pi - 1])) / 1000);
                const dm = Math.floor(ds / 60);
                dl = dm > 0 ? ` +${dm}m${ds % 60}s` : ` +${ds}s`;
              }
              doc.setFontSize(5);
              doc.setTextColor(...txtLight);
              doc.text(tl + dl, px, photoY + 18.5);
              doc.setFontSize(7.5);
              doc.setTextColor(...txtDark);
            }
          });
        }

        y += rowH;

        doc.setDrawColor(...border);
        doc.setLineWidth(0.1);
        doc.line(margin, y, margin + contentW, y);
        rowIdx++;
      });

      y += 5;
    });
  });

  // ── FOOTER ON EVERY PAGE ────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const fy = pageH - 9;
    doc.setFillColor(...altRow);
    doc.rect(0, fy - 1, pageW, 10, 'F');
    doc.setDrawColor(...border);
    doc.setLineWidth(0.3);
    doc.line(0, fy - 1, pageW, fy - 1);
    doc.setFontSize(6.5);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...txtMid);
    doc.text('Del Mar — Gestión de Propiedades  ·  ISO 9001  ·  Marriott  ·  Safe Travels  ·  Airbnb Prohost  ·  APAR  ·  AirDNA', margin, fy + 4);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...txtDark);
    doc.text(`${p} / ${totalPages}`, pageW - margin, fy + 4, { align: 'right' });
  }

  return doc;
}

// ══════════════════════════════════════════
// EXPORTAR XLSX con imágenes (ExcelJS)
// ══════════════════════════════════════════

async function exportXLSX() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Del Mar';

  const NAVY        = 'FF1E3A5F';
  const GOLD        = 'FFC8962D';
  const WHITE       = 'FFFFFFFF';
  const ALT         = 'FFF8FAFC';
  const INFO_BG     = 'FFF1F5F9';
  const BORDER_C    = 'FFE2E8F0';
  const MID_TXT     = 'FF475569';
  const DARK_TXT    = 'FF0F172A';

  const statusColors = {
    good:    { text: 'FF15803D', bg: 'FFD1FAE5' },
    damaged: { text: 'FFB91C1C', bg: 'FFFEE2E2' },
    missing: { text: 'FFB45309', bg: 'FFFEF3C7' },
    new:     { text: 'FF1D4ED8', bg: 'FFDBEAFE' },
  };

  const thin = {
    top:    { style: 'thin', color: { argb: BORDER_C } },
    bottom: { style: 'thin', color: { argb: BORDER_C } },
    left:   { style: 'thin', color: { argb: BORDER_C } },
    right:  { style: 'thin', color: { argb: BORDER_C } },
  };

  for (const section of SECTIONS) {
    const ws = workbook.addWorksheet(section.name.substring(0, 31), {
      properties: { tabColor: { argb: NAVY } },
    });

    ws.columns = [
      { width: 20 },
      { width: 20 },
      { width: 14 },
      { width: 34 },
      { width: 9  },
      { width: 44 },
      { width: 17 },
    ];

    // Row 1: title
    ws.addRow(['DEL MAR — Reporte de Inspección e Inventario', '', '', '', '', '', '']);
    ws.mergeCells('A1:G1');
    Object.assign(ws.getCell('A1'), {
      font:      { bold: true, size: 14, color: { argb: WHITE }, name: 'Calibri' },
      fill:      { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } },
      alignment: { vertical: 'middle', horizontal: 'left', indent: 1 },
    });
    ws.getRow(1).height = 30;

    // Row 2: gold accent stripe
    ws.addRow(['', '', '', '', '', '', '']);
    ws.mergeCells('A2:G2');
    ws.getCell('A2').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD } };
    ws.getRow(2).height = 3;

    // Row 3: info
    ws.addRow([`Ubicación: ${inspectionInfo.location}`, '', '', `Fecha: ${inspectionInfo.date}`, '', `Inspector: ${inspectionInfo.auditor}`, '']);
    ws.mergeCells('A3:C3'); ws.mergeCells('D3:E3'); ws.mergeCells('F3:G3');
    for (const addr of ['A3', 'D3', 'F3']) {
      Object.assign(ws.getCell(addr), {
        font:      { size: 10, name: 'Calibri', color: { argb: DARK_TXT } },
        fill:      { type: 'pattern', pattern: 'solid', fgColor: { argb: INFO_BG } },
        alignment: { vertical: 'middle', indent: 1 },
      });
    }
    ws.getRow(3).height = 20;

    // Row 4: info line 2
    ws.addRow([
      `Recámaras: ${inspectionInfo.numBedrooms || '—'}  |  Baños: ${inspectionInfo.numBathrooms || '—'}`,
      '', '',
      inspectionInfo.duration ? `Duración: ${inspectionInfo.duration}` : '',
      '', '', '',
    ]);
    ws.mergeCells('A4:C4'); ws.mergeCells('D4:G4');
    for (const addr of ['A4', 'D4']) {
      Object.assign(ws.getCell(addr), {
        font:      { size: 10, name: 'Calibri', color: { argb: DARK_TXT } },
        fill:      { type: 'pattern', pattern: 'solid', fgColor: { argb: INFO_BG } },
        alignment: { vertical: 'middle', indent: 1 },
      });
    }
    ws.getRow(4).height = 18;

    // Row 5: spacer
    ws.addRow([]);
    ws.getRow(5).height = 6;

    // Row 6: column headers
    const hdrRow = ws.addRow(['Área', 'Subcategoría', 'Estado', 'Descripción', 'Cant.', 'Observaciones', 'Foto']);
    hdrRow.height = 22;
    hdrRow.eachCell((cell, col) => {
      cell.font      = { bold: true, size: 9.5, color: { argb: WHITE }, name: 'Calibri' };
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } };
      cell.alignment = { vertical: 'middle', horizontal: col <= 2 ? 'left' : 'center', indent: col <= 2 ? 1 : 0 };
      cell.border    = thin;
    });

    let rowNum   = 7;
    let dataIdx  = 0;

    const areaGroups = [];
    let curArea = null;
    section.items.forEach((item, idx) => {
      if (item.area !== curArea) { curArea = item.area; areaGroups.push({ area: curArea, items: [] }); }
      areaGroups[areaGroups.length - 1].items.push({ item, idx });
    });

    for (const group of areaGroups) {
      const areaStartRow = rowNum;
      const subGroups    = [];
      let curSub = null;
      group.items.forEach(entry => {
        if (entry.item.sub !== curSub) { curSub = entry.item.sub; subGroups.push({ sub: curSub, entries: [] }); }
        subGroups[subGroups.length - 1].entries.push(entry);
      });

      for (const subGroup of subGroups) {
        const subStartRow = rowNum;

        for (let ei = 0; ei < subGroup.entries.length; ei++) {
          const { item, idx: itemIdx } = subGroup.entries[ei];
          const key      = `${section.id}-${itemIdx}`;
          const data     = inspectionData[key] || {};
          const names    = getItemNames(item.name);
          const hasPhoto = data.photos && data.photos.length > 0;
          const statusLbl = STATUS_OPTIONS.find(o => o.value === data.status);

          ws.addRow([
            ei === 0 && subGroup === subGroups[0] ? group.area : '',
            ei === 0 ? (subGroup.sub || '') : '',
            statusLbl ? statusLbl.label : '',
            names.es,
            data.qty !== undefined ? Number(data.qty) : item.qty,
            data.observations || '',
            '',
          ]);

          const row      = ws.getRow(rowNum);
          const isAlt    = dataIdx % 2 === 1;
          const rowFill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: isAlt ? ALT : WHITE } };
          row.height     = hasPhoto ? 65 : 18;

          row.eachCell({ includeEmpty: true }, (cell, col) => {
            if (col > 7) return;
            cell.fill      = rowFill;
            cell.border    = thin;
            cell.font      = { size: 9.5, name: 'Calibri', color: { argb: DARK_TXT } };
            cell.alignment = { vertical: 'middle', wrapText: col === 6 };
          });

          // Area cell
          const areaCell = row.getCell(1);
          areaCell.font      = { bold: true, size: 9.5, name: 'Calibri', color: { argb: NAVY } };
          areaCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true };

          // Sub cell
          const subCell  = row.getCell(2);
          subCell.font   = { size: 9, italic: true, name: 'Calibri', color: { argb: MID_TXT } };
          subCell.alignment = { vertical: 'middle', indent: 1 };

          // Status cell coloring
          if (data.status && statusColors[data.status]) {
            const sc       = statusColors[data.status];
            const sCell    = row.getCell(3);
            sCell.font     = { bold: true, size: 9, name: 'Calibri', color: { argb: sc.text } };
            sCell.fill     = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.bg } };
            sCell.alignment = { vertical: 'middle', horizontal: 'center' };
          }

          // Qty centered
          row.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };

          if (hasPhoto) {
            try {
              const b64   = data.photos[0].split(',')[1];
              const imgId = workbook.addImage({ base64: b64, extension: 'jpeg' });
              ws.addImage(imgId, { tl: { col: 6, row: rowNum - 1 }, br: { col: 7, row: rowNum }, editAs: 'oneCell' });
            } catch (_) {}
          }

          rowNum++;
          dataIdx++;
        }

        if (rowNum - 1 > subStartRow) ws.mergeCells(subStartRow, 2, rowNum - 1, 2);
      }

      if (rowNum - 1 > areaStartRow) ws.mergeCells(areaStartRow, 1, rowNum - 1, 1);

      ws.addRow([]);
      ws.getRow(rowNum).height = 6;
      rowNum++;
    }

    // Footer
    ws.addRow([]);
    ws.addRow(['Del Mar — Gestión de Propiedades  ·  ISO 9001  ·  Marriott International  ·  Safe Travels  ·  Airbnb Prohost  ·  APAR  ·  AirDNA']);
    ws.mergeCells(ws.rowCount, 1, ws.rowCount, 7);
    const fCell     = ws.getCell(`A${ws.rowCount}`);
    fCell.font      = { size: 8, name: 'Calibri', color: { argb: MID_TXT } };
    fCell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: INFO_BG } };
    fCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(ws.rowCount).height = 18;
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Inspeccion_${inspectionInfo.location}_${inspectionInfo.date}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📊 Excel descargado');
}

// ── Exportar PDF ──

function exportPDF() {
  if (!SECTIONS || SECTIONS.length === 0) {
    showToast('⚠️ No hay datos de inspección para exportar');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = buildPDF(jsPDF);
  doc.save(`Inspeccion_${inspectionInfo.location}_${inspectionInfo.date}.pdf`);
  showToast('📄 PDF descargado');
}

// ── Manejadores de exportación (enrutan según modo activo) ──

function handleExportXLSX() {
  if (currentMode === 'inventory') {
    exportInventoryXLSX();
  } else {
    exportXLSX();
  }
}

function handleExportPDF() {
  if (currentMode === 'inventory') {
    exportInventoryPDF();
  } else {
    exportPDF();
  }
}

function handleShare() {
  if (currentMode === 'inventory') {
    shareInventoryFiles();
  } else {
    shareFiles();
  }
}

function handleBackEdit() {
  if (currentMode === 'inventory') {
    showStep('step-inv-rooms');
    renderInventoryRooms();
  } else if (currentMode === 'inspection') {
    backToRooms();
  } else {
    showStep('step-home');
  }
}
