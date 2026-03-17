// ══════════════════════════════════════════
// INSPECCIÓN — APP REDISEÑADA v2
// Iconos Material Symbols, interfaz en español,
// cronómetro, Web Share API, cuartos dinámicos,
// descripciones de artículos, exportes mejorados
// ══════════════════════════════════════════

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

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
  window.scrollTo(0, 0);
}

// ══════════════════════════════════════════
// PASO 1: BIENVENIDA / INICIAR
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  checkShareSupport();
});

// ── Selección de modo desde la pantalla de inicio ──

function selectMode(mode) {
  currentMode = mode;
  if (mode === 'inventory') {
    document.getElementById('inv-date').valueAsDate = new Date();
    showStep('step-inv-welcome');
  } else {
    showStep('step-insp-select');
    loadAndRenderUnitList();
  }
}

// ── Navegación de inspección ──

function goBackFromInspection() {
  // Si viene de un inventario, volver al selector de unidades; si es directo, ir al inicio
  if (window._loadedInventory) {
    showStep('step-insp-select');
  } else {
    showStep('step-home');
  }
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
  // location is required only when not coming from a loaded inventory
  if (!location) {
    const group = document.getElementById('location').closest('.form-group');
    group.classList.add('error');
    setTimeout(() => group.classList.remove('error'), 800);
    valid = false;
  }

  if (!valid) {
    showToast('⚠️ Llena todos los campos');
    return;
  }

  if (window._loadedInventory) {
    // Inspección basada en un inventario guardado en Supabase
    const inv = window._loadedInventory;
    inv.rooms.forEach((room, i) => {
      ROOM_CONFIG[room.roomId] = { icon: 'inventory_2', name: room.roomName, shortName: room.roomName };
      ROOM_COLORS[room.roomId] = DYNAMIC_ROOM_COLORS[i % DYNAMIC_ROOM_COLORS.length];
    });
    SECTIONS = buildSectionsFromInventory(inv);
    inspectionInfo = { location, date, auditor, numBedrooms: 0, numBathrooms: 0, fromInventory: true };
  } else {
    // Inspección con plantilla estándar (sin inventario previo)
    const numBedrooms = parseInt(document.getElementById('num-bedrooms').textContent) || 2;
    const numBathrooms = parseInt(document.getElementById('num-bathrooms').textContent) || 2;
    inspectionInfo = { location, date, auditor, numBedrooms, numBathrooms };
    SECTIONS = buildSections(numBedrooms, numBathrooms);
  }

  inspectionData = {};
  currentMode = 'inspection';
  startTimer();
  showStep('step-rooms');
  renderRooms();
}

// ── Construir secciones desde un inventario guardado en Supabase ──

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

  if (!isSupabaseReady()) {
    listEl.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded">cloud_off</span>
        <p>Supabase no configurado.<br>Configura tu proyecto en <strong>supabase.js</strong>.</p>
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
        <div class="unit-card" onclick="selectUnitForInspection('${u.unitId}')">
          <span class="material-symbols-rounded unit-card-icon">apartment</span>
          <div class="unit-card-info">
            <div class="unit-card-name">${u.unitName}</div>
            <div class="unit-card-meta">${u.itemCount} artículo${u.itemCount !== 1 ? 's' : ''} · ${date}</div>
          </div>
          <span class="material-symbols-rounded unit-card-arrow">chevron_right</span>
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
    document.getElementById('date').valueAsDate = new Date();
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
// PASO 2: SELECCIÓN DE CUARTO
// ══════════════════════════════════════════

function renderRooms() {
  const grid = document.getElementById('room-grid');
  const totalItems = getTotalItems();
  const totalCompleted = getTotalCompleted();

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

  // Hint / descripción
  const hintEl = document.getElementById('item-hint');
  if (hintEl) {
    hintEl.textContent = item.hint || '';
    hintEl.style.display = item.hint ? 'block' : 'none';
  }

  // Botones de estado
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
  if (currentItemIndex === section.items.length - 1) {
    navNext.innerHTML = '<span class="material-symbols-rounded">check</span> Listo';
    navNext.className = 'nav-next finish';
  } else {
    navNext.innerHTML = 'Siguiente <span class="material-symbols-rounded">arrow_forward</span>';
    navNext.className = 'nav-next';
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

  const statusMap = { 'good': '.good', 'damaged': '.damaged', 'missing': '.missing', 'new': '.new-item' };
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.remove('selected', 'just-selected');
  });
  const sel = document.querySelector(`.status-btn${statusMap[status]}`);
  if (sel) {
    sel.classList.add('selected', 'just-selected');
  }

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
    if (!inspectionData[key].photoTimes) inspectionData[key].photoTimes = [];
    compressImage(e.target.result, 800, 0.7, (compressed) => {
      inspectionData[key].photos.push(compressed);
      inspectionData[key].photoTimes.push(new Date().toISOString());
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
}

// ══════════════════════════════════════════
// WEB SHARE API
// ══════════════════════════════════════════

async function shareFiles() {
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
  canvas.width = 240;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 240, 0);
  gradient.addColorStop(0, '#c8962d');
  gradient.addColorStop(0.5, '#e8c44a');
  gradient.addColorStop(1, '#c8962d');

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(15, 55);
  ctx.quadraticCurveTo(40, 10, 65, 45);
  ctx.quadraticCurveTo(90, 75, 115, 30);
  ctx.quadraticCurveTo(140, -10, 165, 45);
  ctx.quadraticCurveTo(185, 75, 210, 25);
  ctx.quadraticCurveTo(220, 10, 230, 18);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

function createCertificationsDataURL() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 60;
  const ctx = canvas.getContext('2d');

  const badges = [
    { text: 'ISO 9001', color: '#d4a843', bg: '#fef3c7' },
    { text: 'MARRIOTT', color: '#c62828', bg: '#ffebee' },
    { text: 'SAFE TRAVELS', color: '#2e7d32', bg: '#e8f5e9' },
    { text: 'AIRBNB', color: '#ff5a5f', bg: '#fce4ec' },
    { text: 'APAR', color: '#1565c0', bg: '#e3f2fd' },
    { text: 'AIRDNA', color: '#5c6bc0', bg: '#e8eaf6' },
  ];

  const spacing = 95;
  const startX = 30;

  badges.forEach((badge, i) => {
    const cx = startX + i * spacing;
    const cy = 30;
    const r = 24;

    // Círculo de fondo
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = badge.bg;
    ctx.fill();
    ctx.strokeStyle = badge.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Texto
    ctx.fillStyle = badge.color;
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badge.text, cx, cy);
  });

  return canvas.toDataURL('image/png');
}

// ══════════════════════════════════════════
// CONSTRUIR PDF (mejorado con agrupación y logos)
// ══════════════════════════════════════════

function buildPDF(jsPDF) {
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
  } catch (e) { /* skip if fails */ }

  // Título
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(37, 99, 235);
  doc.text('Reporte de Inspección e Inventario', margin, y);
  y += 8;

  // Línea decorativa
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentW, y);
  y += 6;

  // Info
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Ubicación: ${inspectionInfo.location}`, margin, y);
  doc.text(`Fecha: ${inspectionInfo.date}`, margin + 90, y);
  y += 5;
  doc.text(`Inspector: ${inspectionInfo.auditor}`, margin, y);
  if (inspectionInfo.duration) {
    doc.text(`Duración: ${inspectionInfo.duration}`, margin + 90, y);
  }
  y += 3;
  doc.text(`Recámaras: ${inspectionInfo.numBedrooms} | Baños: ${inspectionInfo.numBathrooms}`, margin, y);
  y += 10;

  // Cada sección
  SECTIONS.forEach((section, sIdx) => {
    if (sIdx > 0) {
      doc.addPage();
      y = margin;
    }

    // Encabezado de sección
    checkPage(20);
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, y - 1, contentW, 8, 'F');
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(section.name.toUpperCase(), margin + 3, y + 5);
    y += 12;

    // Agrupar por área
    const areaGroups = [];
    let currentArea = null;
    section.items.forEach((item, idx) => {
      if (item.area !== currentArea) {
        currentArea = item.area;
        areaGroups.push({ area: currentArea, items: [] });
      }
      areaGroups[areaGroups.length - 1].items.push({ item, idx });
    });

    areaGroups.forEach((group) => {
      checkPage(16);

      // Sub-encabezado de área con fondo
      doc.setFillColor(240, 244, 255);
      doc.rect(margin, y - 1, contentW, 6, 'F');
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text(group.area.toUpperCase(), margin + 2, y + 3);
      y += 8;

      // Encabezados de columna
      const colX = [margin + 2, margin + 40, margin + 85, margin + 115, margin + 140, margin + 155];
      doc.setFontSize(7);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text('Subcategoría', colX[0], y);
      doc.text('Artículo', colX[1], y);
      doc.text('Estado', colX[2], y);
      doc.text('Tipo', colX[3], y);
      doc.text('Cant', colX[4], y);
      doc.text('Observaciones', colX[5], y);
      y += 1.5;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(margin, y, margin + contentW, y);
      y += 3;

      // Agrupar por subcategoría dentro del área
      let currentSub = null;

      group.items.forEach(({ item, idx: itemIdx }) => {
        const key = `${section.id}-${itemIdx}`;
        const data = inspectionData[key] || {};
        const statusLabel = STATUS_OPTIONS.find(o => o.value === data.status);
        const names = getItemNames(item.name);
        const hasPhotos = data.photos && data.photos.length > 0;
        const rowHeight = hasPhotos ? 22 : 5;

        checkPage(rowHeight + 4);

        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(50, 50, 50);

        // Subcategoría (solo si cambió)
        if (item.sub !== currentSub) {
          currentSub = item.sub;
          doc.setFont(undefined, 'bold');
          doc.setTextColor(100, 100, 100);
          doc.text(item.sub || '', colX[0], y);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(50, 50, 50);
        }

        doc.text(names.es, colX[1], y);

        // Estado con color
        if (data.status) {
          const statusColors = { good: [16, 185, 129], damaged: [239, 68, 68], missing: [245, 158, 11], new: [37, 99, 235] };
          const c = statusColors[data.status] || [100, 100, 100];
          doc.setTextColor(c[0], c[1], c[2]);
          doc.setFont(undefined, 'bold');
        }
        doc.text(statusLabel ? statusLabel.label : '-', colX[2], y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(50, 50, 50);

        doc.text(item.type === 'fixed' ? 'Fijo' : 'Variable', colX[3], y);
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
                doc.addImage(photo, 'JPEG', colX[1] + (pi * 22), y, 16, 16);
              } catch (e) { /* skip */ }
              // Mostrar hora de la foto y diferencia
              if (data.photoTimes && data.photoTimes[pi]) {
                const t = new Date(data.photoTimes[pi]);
                const timeLabel = t.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                let diffLabel = '';
                if (pi > 0 && data.photoTimes[pi - 1]) {
                  const diffMs = t - new Date(data.photoTimes[pi - 1]);
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

        // Línea separadora sutil
        doc.setDrawColor(230, 230, 230);
        doc.setLineWidth(0.1);
        doc.line(colX[1], y - 2, margin + contentW, y - 2);
      });

      y += 3;
    });
  });

  // Pie de página con certificaciones
  checkPage(30);
  y += 5;
  doc.setDrawColor(37, 99, 235);
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

// ══════════════════════════════════════════
// EXPORTAR XLSX (mejorado con agrupación)
// ══════════════════════════════════════════

function exportXLSX() {
  const wb = XLSX.utils.book_new();

  SECTIONS.forEach(section => {
    const rows = [];
    const merges = [];

    // Fila 0: Título
    rows.push(['DEL MAR — Reporte de Inspección e Inventario', '', '', '', '', '']);
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } });

    // Fila 1: Info
    rows.push([`Ubicación: ${inspectionInfo.location}`, '', `Fecha: ${inspectionInfo.date}`, '', `Inspector: ${inspectionInfo.auditor}`, '']);

    // Fila 2: Info adicional
    rows.push([`Recámaras: ${inspectionInfo.numBedrooms} | Baños: ${inspectionInfo.numBathrooms}`, '', inspectionInfo.duration ? `Duración: ${inspectionInfo.duration}` : '', '', '', '']);

    // Fila 3: Vacía
    rows.push(['', '', '', '', '', '']);

    // Fila 4: Encabezados de columnas
    // Col 0: Área, Col 1: Subcategoría, Col 2: Marcar, Col 3: Descripción, Col 4: Cantidad, Col 5: Observaciones
    rows.push(['', '', 'Marcar', 'Descripción', 'Cantidad', 'Observaciones']);

    let rowIdx = 5;

    // Agrupar items por área
    const areaGroups = [];
    let curArea = null;
    section.items.forEach((item, idx) => {
      if (item.area !== curArea) {
        curArea = item.area;
        areaGroups.push({ area: curArea, items: [] });
      }
      areaGroups[areaGroups.length - 1].items.push({ item, idx });
    });

    areaGroups.forEach((group) => {
      const areaStartRow = rowIdx;

      // Dentro del área, agrupar por subcategoría
      const subGroups = [];
      let curSub = null;
      group.items.forEach(entry => {
        if (entry.item.sub !== curSub) {
          curSub = entry.item.sub;
          subGroups.push({ sub: curSub, entries: [] });
        }
        subGroups[subGroups.length - 1].entries.push(entry);
      });

      subGroups.forEach(subGroup => {
        const subStartRow = rowIdx;

        subGroup.entries.forEach(({ item, idx: itemIdx }, ei) => {
          const key = `${section.id}-${itemIdx}`;
          const data = inspectionData[key] || {};
          const names = getItemNames(item.name);
          const markedStr = data.status ? '☑' : '☐';

          rows.push([
            ei === 0 && subGroup === subGroups[0] ? group.area : '',
            ei === 0 ? (subGroup.sub || '') : '',
            markedStr,
            names.es,
            data.qty !== undefined ? Number(data.qty) : item.qty,
            data.observations || ''
          ]);
          rowIdx++;
        });

        // Merge subcategoría (col 1)
        if (rowIdx - 1 > subStartRow) {
          merges.push({ s: { r: subStartRow, c: 1 }, e: { r: rowIdx - 1, c: 1 } });
        }
      });

      // Merge área (col 0)
      if (rowIdx - 1 > areaStartRow) {
        merges.push({ s: { r: areaStartRow, c: 0 }, e: { r: rowIdx - 1, c: 0 } });
      }

      // Fila separadora entre áreas
      rows.push(['', '', '', '', '', '']);
      rowIdx++;
    });

    // Pie de página
    rows.push(['', '', '', '', '', '']);
    rows.push(['ISO 9001 | Marriott International | Safe Travels | Airbnb Prohost | APAR | AirDNA', '', '', '', '', '']);
    merges.push({ s: { r: rows.length - 1, c: 0 }, e: { r: rows.length - 1, c: 5 } });

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!merges'] = merges;

    ws['!cols'] = [
      { wch: 18 },  // Área
      { wch: 18 },  // Subcategoría
      { wch: 8 },   // Marcar
      { wch: 32 },  // Descripción
      { wch: 10 },  // Cantidad
      { wch: 40 },  // Observaciones
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
  } else {
    backToRooms();
  }
}
