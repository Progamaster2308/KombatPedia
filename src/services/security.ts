/**
 * Servicios de Seguridad para la Unidad 3:
 * - Hashing criptográfico real (SHA-256 con Web Crypto API)
 * - Análisis y medidor de entropía de contraseñas
 * - Detección y sanitización de ataques XSS y SQL Injection
 * - Gestión de tokens CSRF y sesiones estilo JWT
 * - Prevención de ataques de fuerza bruta (Rate limiting de intentos)
 */

export interface PasswordAnalysis {
  score: number; // 0 - 100
  label: 'Muy Débil' | 'Débil' | 'Aceptable' | 'Segura' | 'Imbatible';
  color: string;
  feedback: string[];
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface SanitizationResult {
  isClean: boolean;
  sanitized: string;
  detectedThreats: string[];
  explanation: string;
}

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  realm: string;
  mentor: string;
  registeredAt: string;
  token?: string;
}

// Salt base del servidor / aplicación para robustez adicional (Pepper)
const APP_PEPPER = "MK_SHA256_SALT_UNIDAD3_2026_MORTAL_KOMBAT";

/**
 * Calcula un hash criptográfico SHA-256 real utilizando la API nativa Web Crypto del navegador.
 * Las contraseñas nunca deben guardarse ni enviarse en texto plano.
 */
export async function hashPassword(password: string, salt: string = ""): Promise<string> {
  const combined = `${salt}:${password}:${APP_PEPPER}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Genera una sal criptográfica pseudoaleatoria única por usuario.
 */
export function generateSalt(bytes: number = 16): string {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Genera un token CSRF seguro para proteger formularios contra falsificación de petición en sitios cruzados.
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  return 'mk_csrf_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Evalúa la fortaleza y entropía de una contraseña según estándares NIST / OWASP.
 */
export function analyzePassword(password: string): PasswordAnalysis {
  const feedback: string[] = [];
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);

  let score = 0;

  if (password.length > 0) {
    // Longitud
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (password.length >= 16) score += 10;

    // Variedad de caracteres
    if (hasUppercase) score += 15;
    if (hasLowercase) score += 10;
    if (hasNumber) score += 15;
    if (hasSpecialChar) score += 15;

    // Penalizaciones por patrones obvios
    if (/^[a-zA-Z]+$/.test(password)) score = Math.min(score, 40);
    if (/^[0-9]+$/.test(password)) score = Math.min(score, 20);
    if (/(1234|password|admin|mortalkombat|scorpion)/i.test(password)) {
      score = Math.max(5, score - 30);
      feedback.push("Contiene patrones predecibles o palabras comunes.");
    }
  }

  score = Math.min(100, Math.max(0, score));

  if (!hasMinLength) feedback.push("Debe tener al menos 8 caracteres.");
  if (!hasUppercase) feedback.push("Añade al menos una letra mayúscula (A-Z).");
  if (!hasLowercase) feedback.push("Añade al menos una letra minúscula (a-z).");
  if (!hasNumber) feedback.push("Añade al menos un número (0-9).");
  if (!hasSpecialChar) feedback.push("Añade un símbolo especial (!@#$%...).");

  let label: PasswordAnalysis['label'] = 'Muy Débil';
  let color = '#ef4444'; // red

  if (score >= 85) {
    label = 'Imbatible';
    color = '#10b981'; // emerald
  } else if (score >= 70) {
    label = 'Segura';
    color = '#22c55e'; // green
  } else if (score >= 50) {
    label = 'Aceptable';
    color = '#eab308'; // yellow
  } else if (score >= 25) {
    label = 'Débil';
    color = '#f97316'; // orange
  }

  return {
    score,
    label,
    color,
    feedback,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar
  };
}

/**
 * Sanitizador de entrada y detector de ataques XSS y SQL Injection.
 * Demuestra conceptos clave de la Unidad 3 sobre sanitización de datos.
 */
export function sanitizeInput(input: string): SanitizationResult {
  const detectedThreats: string[] = [];

  // Comprobar patrones de Cross-Site Scripting (XSS)
  if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(input)) {
    detectedThreats.push("Inyección XSS detectada: Etiqueta <script> maliciosa.");
  }
  if (/javascript:/gi.test(input)) {
    detectedThreats.push("Inyección XSS detectada: Pseudo-protocolo 'javascript:'.");
  }
  if (/on\w+\s*=/gi.test(input)) {
    detectedThreats.push("Inyección XSS detectada: Manipulador de eventos inline (ej. onload, onerror, onclick).");
  }

  // Comprobar patrones de SQL Injection (SQLi)
  if (/(?:')\s*(?:OR|AND)\s*[\w\d'"]+\s*=\s*[\w\d'"]/gi.test(input)) {
    detectedThreats.push("Inyección SQL detectada: Expresión tautológica (' OR '1'='1).");
  }
  if (/(?:UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|ALTER\s+TABLE)/gi.test(input)) {
    detectedThreats.push("Inyección SQL detectada: Sentencia DDL/DML destructiva de base de datos.");
  }

  // Sanitización escapando caracteres peligrosos para HTML
  const sanitized = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  const isClean = detectedThreats.length === 0;

  let explanation = "La entrada es segura y cumple las reglas de validación.";
  if (!isClean) {
    explanation = "Se detectaron patrones hostiles. Los caracteres peligrosos fueron neutralizados para proteger la base de datos y la interfaz.";
  }

  return {
    isClean,
    sanitized,
    detectedThreats,
    explanation
  };
}

/**
 * Genera un token JWT simulado para la sesión del usuario.
 */
export function generateUserSessionToken(user: { id: string; username: string; realm: string }): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    name: user.username,
    realm: user.realm,
    iss: "MortalKombat-AuthService",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 // 24 horas
  }));
  const signature = btoa(APP_PEPPER.slice(0, 16) + user.id);
  return `${header}.${payload}.${signature}`;
}

// Almacenamiento local persistente de usuarios para simulación de base de datos
const USERS_STORAGE_KEY = "mk_tournament_users_db_v1";
const CURRENT_USER_KEY = "mk_tournament_current_session_v1";

export function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Error al guardar usuarios en localStorage", err);
  }
}

export function getCurrentSession(): StoredUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentSession(user: StoredUser | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error("Error al actualizar sesión", err);
  }
}
