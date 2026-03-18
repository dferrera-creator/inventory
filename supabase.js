// ══════════════════════════════════════════
// SUPABASE — Integración con la nube
// ══════════════════════════════════════════
// Configuración: reemplaza con tus credenciales de Supabase
// 1. Ve a supabase.com, crea un proyecto gratuito
// 2. En SQL Editor ejecuta el script de creación de tabla (ver README o plan)
// 3. Copia tu Project URL y anon key aquí

const SUPABASE_URL = 'https://esuiqcqfkhpvnjpcxcxo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dLtQG61B7gn9ByJrRB2WqQ_5Zn5LSLj';

let _sb = null;

function initSupabase() {
  if (typeof supabase === 'undefined') {
    console.warn('Supabase SDK no cargado. Verifica la CDN en index.html.');
    return;
  }
  _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

function isSupabaseReady() {
  return _sb !== null && SUPABASE_URL !== 'https://TU_PROYECTO.supabase.co';
}

// ── Guardar inventario (crea o actualiza por unit_id) ──

async function saveInventory(inventoryDoc) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado. Configura SUPABASE_URL y SUPABASE_KEY en supabase.js');
  }

  const record = {
    unit_id: inventoryDoc.unitId,
    unit_name: inventoryDoc.unitName,
    auditor: inventoryDoc.auditor,
    updated_at: new Date().toISOString(),
    data: inventoryDoc,
  };

  // Buscar si ya existe un inventario para esta unidad
  const { data: existing } = await _sb
    .from('inventories')
    .select('id')
    .eq('unit_id', inventoryDoc.unitId)
    .single();

  if (existing) {
    const { error } = await _sb
      .from('inventories')
      .update(record)
      .eq('unit_id', inventoryDoc.unitId);
    if (error) throw error;
    return existing.id;
  } else {
    const { data, error } = await _sb
      .from('inventories')
      .insert(record)
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }
}

// ── Cargar lista de inventarios (para el selector de unidades) ──

async function loadInventoryList() {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado. Configura SUPABASE_URL y SUPABASE_KEY en supabase.js');
  }

  const { data, error } = await _sb
    .from('inventories')
    .select('unit_id, unit_name, updated_at, data')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map(row => {
    const rooms = row.data && row.data.rooms ? row.data.rooms : [];
    const itemCount = rooms.reduce((sum, r) => sum + (r.items ? r.items.length : 0), 0);
    return {
      unitId: row.unit_id,
      unitName: row.unit_name,
      updatedAt: row.updated_at,
      itemCount,
    };
  });
}

// ── Guardar resultado de inspección (siempre inserta, nunca actualiza) ──

async function saveInspectionResult(inspectionDoc) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado');
  }

  const record = {
    unit_id: inspectionDoc.unitId,
    unit_name: inspectionDoc.unitName,
    auditor: inspectionDoc.auditor,
    updated_at: new Date().toISOString(),
    data: inspectionDoc,
  };

  const { data, error } = await _sb
    .from('inventories')
    .insert(record)
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

// ── Cargar todos los registros (inventarios + inspecciones) para Histórico ──

async function loadAllRecords() {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado');
  }

  const { data, error } = await _sb
    .from('inventories')
    .select('id, unit_id, unit_name, auditor, updated_at, data')
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map(row => {
    const d = row.data || {};
    const rooms = d.rooms || [];
    const itemCount = rooms.reduce((sum, r) => sum + (r.items ? r.items.length : 0), 0);
    const type = d.type || 'inventory';
    let completedCount = 0;
    if (type === 'inspection') {
      completedCount = rooms.reduce((sum, r) =>
        sum + (r.items ? r.items.filter(i => i.status).length : 0), 0);
    }
    return {
      id: row.id,
      unitId: row.unit_id,
      unitName: row.unit_name,
      auditor: row.auditor,
      updatedAt: row.updated_at,
      date: d.date || '',
      type,
      itemCount,
      completedCount,
      sourceUnitId: d.sourceUnitId || null,
    };
  });
}

// ── Cargar inventario completo por unit_id ──

async function loadInventoryByUnit(unitId) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado. Configura SUPABASE_URL y SUPABASE_KEY en supabase.js');
  }

  const { data, error } = await _sb
    .from('inventories')
    .select('data')
    .eq('unit_id', unitId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }

  return data ? data.data : null;
}
