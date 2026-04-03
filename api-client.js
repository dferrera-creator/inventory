// ══════════════════════════════════════════
// API CLIENT — PostgreSQL Backend Integration
// Replaces Supabase with Express/PostgreSQL
// ══════════════════════════════════════════

// Configure API base URL
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api'
  : `${window.location.origin}/api`;

let _apiReady = true;

function isAPIReady() {
  return _apiReady;
}

// ── Check API health ──
async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    if (!response.ok) throw new Error('API not responding');
    return true;
  } catch (err) {
    console.error('API health check failed:', err);
    _apiReady = false;
    return false;
  }
}

// ── Save inventory (creates or updates) ──
async function saveInventory(inventoryDoc) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitId: inventoryDoc.unitId,
        unitName: inventoryDoc.unitName,
        auditor: inventoryDoc.auditor,
        data: inventoryDoc,
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    return result.id;
  } catch (err) {
    console.error('Error saving inventory:', err);
    throw err;
  }
}

// ── Load inventory list ──
async function loadInventoryList() {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Error loading inventory list:', err);
    throw err;
  }
}

// ── Load single inventory ──
async function loadInventoryByUnit(unitId) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory/${unitId}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Error loading inventory:', err);
    throw err;
  }
}

// ── Save inspection result ──
async function saveInspectionResult(inspectionDoc) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitId: inspectionDoc.unitId,
        unitName: inspectionDoc.unitName,
        auditor: inspectionDoc.auditor,
        data: inspectionDoc,
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    return result.id;
  } catch (err) {
    console.error('Error saving inspection:', err);
    throw err;
  }
}

// ── Load all records ──
async function loadAllRecords() {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/records`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Error loading records:', err);
    throw err;
  }
}

// ── Save onboarding record ──
async function saveOnboardingRecord(onbDoc) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitId: onbDoc.unitId,
        unitName: onbDoc.unitName,
        auditor: onbDoc.auditor,
        data: onbDoc,
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    return result.id;
  } catch (err) {
    console.error('Error saving onboarding:', err);
    throw err;
  }
}

// ── Update inspection result ──
async function updateInspectionResult(unitId, newInspDoc) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unitId,
        unitName: newInspDoc.unitName,
        auditor: newInspDoc.auditor,
        data: newInspDoc,
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    return result.id;
  } catch (err) {
    console.error('Error updating inspection:', err);
    throw err;
  }
}

// ── Delete record ──
async function deleteRecord(unitId) {
  if (!isAPIReady()) {
    throw new Error('API not available. Check server connection.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/inventory/${unitId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return true;
  } catch (err) {
    console.error('Error deleting record:', err);
    throw err;
  }
}
