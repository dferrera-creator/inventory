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
    const type = d.type || 'inventory';
    let itemCount = 0;
    let completedCount = 0;

    if (type === 'onboarding') {
      const sections = d.sections || [];
      sections.forEach(section => {
        section.groups && section.groups.forEach(group => {
          itemCount += (group.items || []).length;
          completedCount += (group.items || []).filter(i => i.status).length;
        });
      });
    } else {
      const rooms = d.rooms || [];
      itemCount = rooms.reduce((sum, r) => sum + (r.items ? r.items.length : 0), 0);
      if (type === 'inspection') {
        completedCount = rooms.reduce((sum, r) =>
          sum + (r.items ? r.items.filter(i => i.status).length : 0), 0);
      }
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
      versionCount: (d.versions || []).length,
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

// ── Guardar / actualizar inspección de Onboarding ──

async function saveOnboardingRecord(onbDoc) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado');
  }

  const record = {
    unit_id: onbDoc.unitId,
    unit_name: onbDoc.unitName,
    auditor: onbDoc.auditor,
    updated_at: new Date().toISOString(),
    data: onbDoc,
  };

  // Check if a record already exists for this unit_id
  const { data: existing } = await _sb
    .from('inventories')
    .select('id, data')
    .eq('unit_id', onbDoc.unitId)
    .single();

  if (existing) {
    // Save version history
    const prevData = existing.data;
    const versions = prevData ? (prevData.versions || []) : [];
    if (prevData) {
      const snapshot = { ...prevData };
      delete snapshot.versions;
      versions.push({ savedAt: prevData.updatedAt || new Date().toISOString(), ...snapshot });
    }
    const updatedDoc = { ...onbDoc, versions, updatedAt: new Date().toISOString() };
    const { error } = await _sb
      .from('inventories')
      .update({ ...record, data: updatedDoc })
      .eq('unit_id', onbDoc.unitId);
    if (error) throw error;
  } else {
    const { error } = await _sb
      .from('inventories')
      .insert(record);
    if (error) throw error;
  }
}

// ── Eliminar registro por unit_id ──

async function deleteRecord(unitId) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado');
  }

  const { error } = await _sb
    .from('inventories')
    .delete()
    .eq('unit_id', unitId);

  if (error) throw error;
}

// ── Actualizar inspección existente (guarda versión anterior) ──

async function updateInspectionResult(unitId, newInspDoc) {
  if (!isSupabaseReady()) {
    throw new Error('Supabase no configurado');
  }

  // Load existing record to get current data for version history
  const { data: existing, error: loadErr } = await _sb
    .from('inventories')
    .select('data')
    .eq('unit_id', unitId)
    .single();

  if (loadErr && loadErr.code !== 'PGRST116') throw loadErr;

  const prevData = existing ? existing.data : null;
  const versions = prevData ? (prevData.versions || []) : [];

  if (prevData) {
    // Push snapshot of previous version (rooms + metadata, without nested versions)
    const snapshot = { ...prevData };
    delete snapshot.versions;
    versions.push({ savedAt: prevData.updatedAt || new Date().toISOString(), ...snapshot });
  }

  const updatedDoc = {
    ...newInspDoc,
    versions,
    updatedAt: new Date().toISOString(),
  };

  const { error } = await _sb
    .from('inventories')
    .update({
      unit_name: updatedDoc.unitName,
      auditor: updatedDoc.auditor,
      updated_at: updatedDoc.updatedAt,
      data: updatedDoc,
    })
    .eq('unit_id', unitId);

  if (error) throw error;
}
