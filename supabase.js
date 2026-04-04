// ══════════════════════════════════════════
// SUPABASE COMPATIBILITY LAYER
// Routes all calls to PostgreSQL via api-client.js
// Maintains same function signatures for backward compatibility
// ══════════════════════════════════════════

let _apiReady = false;

function initSupabase() {
  // API client auto-initializes with API_BASE_URL from api-client.js
  _apiReady = true;
  console.log('✅ API Client initialized (PostgreSQL)');
}

function isSupabaseReady() {
  return _apiReady && typeof API_BASE_URL !== 'undefined';
}

// ── All functions delegate to api-client.js ──
// The api-client.js must be loaded first!

async function saveInventory(inventoryDoc) {
  return saveInventory(inventoryDoc);
}

async function loadInventoryList() {
  return loadInventoryList();
}

async function loadInventoryByUnit(unitId) {
  return loadInventoryByUnit(unitId);
}

async function saveInspectionResult(inspectionDoc) {
  return saveInspectionResult(inspectionDoc);
}

async function loadAllRecords() {
  return loadAllRecords();
}

async function saveOnboardingRecord(onbDoc) {
  return saveOnboardingRecord(onbDoc);
}

async function deleteRecord(unitId) {
  return deleteRecord(unitId);
}

async function updateInspectionResult(unitId, newInspDoc) {
  return updateInspectionResult(unitId, newInspDoc);
}

// Auto-initialize on load
document.addEventListener('DOMContentLoaded', initSupabase);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabase);
} else {
  initSupabase();
}
