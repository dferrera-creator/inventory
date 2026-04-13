// ══════════════════════════════════════════
// AUTHENTICATION MODULE — Histórico Access
// ══════════════════════════════════════════

// Hardcoded credentials for histórico access
const HISTORICO_CREDENTIALS = {
  username: 'operaciones123',
  password: 'Delmar2026'
};

const AUTH_STORAGE_KEY = 'historico_auth_token';
const AUTH_TOKEN_VALUE = 'authenticated_historico_session';

/**
 * Check if user is authenticated for histórico
 * @returns {boolean} True if user has active session in localStorage
 */
function isHistoricoAuthenticated() {
  const token = localStorage.getItem(AUTH_STORAGE_KEY);
  return token === AUTH_TOKEN_VALUE;
}

/**
 * Authenticate user with username and password
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @returns {boolean} True if credentials are correct
 */
function loginHistorico(username, password) {
  if (username === HISTORICO_CREDENTIALS.username &&
      password === HISTORICO_CREDENTIALS.password) {
    localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN_VALUE);
    return true;
  }
  return false;
}

/**
 * Clear authentication session
 */
function logoutHistorico() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
