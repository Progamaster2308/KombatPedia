import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  KeyRound,
  AlertTriangle,
  CheckCircle,
  Copy,
  Hash,
  Terminal,
  ShieldAlert,
  ArrowRight,
  LogOut,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  analyzePassword,
  hashPassword,
  generateSalt,
  generateCSRFToken,
  sanitizeInput,
  generateUserSessionToken,
  getStoredUsers,
  saveStoredUsers,
  getCurrentSession,
  setCurrentSession,
  StoredUser,
  PasswordAnalysis
} from '../services/security';
import { playSound } from '../services/audio';

interface RegisterSecurityViewProps {
  currentUser: StoredUser | null;
  onUserUpdate: (user: StoredUser | null) => void;
  onNavigateToCatalog: () => void;
}

export const RegisterSecurityView: React.FC<RegisterSecurityViewProps> = ({
  currentUser,
  onUserUpdate,
  onNavigateToCatalog
}) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');

  // Form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [realm, setRealm] = useState('Earthrealm');
  const [mentor, setMentor] = useState('Scorpion');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Security tokens & hashes
  const [csrfToken, setCsrfToken] = useState(() => generateCSRFToken());
  const [currentSalt, setCurrentSalt] = useState(() => generateSalt(8));
  const [computedHash, setComputedHash] = useState<string>('');
  
  // Validation feedback & errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Brute force lockout protection
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Sandbox inspector for testing attacks
  const [sandboxInput, setSandboxInput] = useState("<script>alert('XSS Attack')</script>");

  // Calculate live password analysis
  const passwordAnalysis: PasswordAnalysis = useMemo(() => analyzePassword(password), [password]);

  // Compute live SHA-256 hash
  useEffect(() => {
    let isCurrent = true;
    if (!password) {
      setComputedHash('');
      return;
    }
    hashPassword(password, currentSalt).then((h) => {
      if (isCurrent) setComputedHash(h);
    });
    return () => {
      isCurrent = false;
    };
  }, [password, currentSalt]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime <= 0) return;
    const interval = setInterval(() => {
      setLockoutTime((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime]);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Username
    const userSanitized = sanitizeInput(username);
    if (!username.trim()) {
      newErrors.username = 'El alias de guerrero es obligatorio.';
    } else if (username.length < 3) {
      newErrors.username = 'Debe contener al menos 3 caracteres.';
    } else if (!userSanitized.isClean) {
      newErrors.username = 'El alias contiene caracteres o patrones no permitidos.';
    }

    // 2. Email
    const emailSanitized = sanitizeInput(email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Introduce un correo válido (ejemplo: kombat@reinos.org).';
    } else if (!emailSanitized.isClean) {
      newErrors.email = 'El correo contiene secuencias no seguras.';
    }

    // 3. Password
    if (mode === 'register') {
      if (!password) {
        newErrors.password = 'La contraseña es obligatoria.';
      } else if (passwordAnalysis.score < 50) {
        newErrors.password = 'La contraseña no cumple con la política mínima de seguridad (debe ser al menos Aceptable o Segura).';
      }

      // 4. Confirm Password
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      }

      // 5. Terms
      if (!acceptTerms) {
        newErrors.terms = 'Debes aceptar los estatutos y reglas sagradas del Torneo.';
      }
    } else {
      // Login mode validation
      if (!password) {
        newErrors.password = 'Ingresa tu contraseña.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) {
      setErrors({ global: `Sistema temporalmente bloqueado por intentos excesivos. Espera ${lockoutTime} segundos.` });
      return;
    }

    if (!validateForm()) {
      playSound('hit');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 600)); // Simulated network latency

      const users = getStoredUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existing) {
        playSound('hit');
        setErrors({ email: 'Ya existe un guerrero registrado con este correo electrónico.' });
        setIsSubmitting(false);
        return;
      }

      // Calculate final hash
      const userSalt = generateSalt(16);
      const hashedPassword = await hashPassword(password, userSalt);

      const newUser: StoredUser = {
        id: 'kbt_' + Math.random().toString(36).substring(2, 9),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: hashedPassword,
        salt: userSalt,
        realm,
        mentor,
        registeredAt: new Date().toLocaleDateString()
      };

      // Generate JWT session token
      newUser.token = generateUserSessionToken(newUser);

      users.push(newUser);
      saveStoredUsers(users);
      setCurrentSession(newUser);
      onUserUpdate(newUser);

      playSound('gong');
      setSuccessMessage(`¡Bienvenido al Torneo, ${newUser.username}! Tu credencial de guerrero ha sido expedida de forma segura.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) {
      setErrors({ global: `Bloqueado contra fuerza bruta. Espera ${lockoutTime}s.` });
      return;
    }

    if (!validateForm()) {
      playSound('hit');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 500));

      const users = getStoredUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        registerFailedAttempt();
        setErrors({ email: 'No existe ninguna cuenta registrada con este correo.' });
        playSound('hit');
        setIsSubmitting(false);
        return;
      }

      // Compute verification hash using the user's stored salt
      const testHash = await hashPassword(password, user.salt);
      if (testHash !== user.passwordHash) {
        registerFailedAttempt();
        setErrors({ password: 'La contraseña ingresada es incorrecta.' });
        playSound('hit');
        setIsSubmitting(false);
        return;
      }

      // Successful login
      setFailedAttempts(0);
      user.token = generateUserSessionToken(user);
      setCurrentSession(user);
      onUserUpdate(user);
      playSound('gong');
      setSuccessMessage(`Sesión iniciada con éxito. Bienvenido nuevamente, ${user.username}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerFailedAttempt = () => {
    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    if (nextAttempts >= 3) {
      setLockoutTime(20);
      setErrors({ global: '⚠️ Ataque potencial detectado (3 intentos fallidos). Bloqueo de seguridad activado por 20 segundos.' });
    }
  };

  const handleLogout = () => {
    playSound('hit');
    setCurrentSession(null);
    onUserUpdate(null);
    setSuccessMessage(null);
  };

  // Sandbox sanitization result
  const sandboxResult = useMemo(() => sanitizeInput(sandboxInput), [sandboxInput]);

  return (
    <div className="space-y-12 pb-16">
      {/* Header MK11 Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-stone-950 via-[#140b0d] to-stone-950 p-6 sm:p-8 rounded-2xl mk11-gold-border">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 mb-1.5">
          <span>SISTEMA DE SEGURIDAD & AUTENTICACIÓN</span>
          <span aria-hidden="true">·</span>
          <span>UNIDAD 3</span>
          <span aria-hidden="true">·</span>
          <span>CRIPTO-GATEWAY</span>
        </div>
        <h1 className="font-mk text-3xl sm:text-4xl font-black text-stone-100 uppercase tracking-wide">
          Inscripción al Torneo & Control de Sesiones
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Validación estricta en tiempo real, medidor de entropía de contraseñas, hashing criptográfico nativo en cliente mediante <strong>SHA-256 (Web Crypto API)</strong> con Salt + Pepper, sanitización preventiva contra inyecciones XSS / SQLi y sesión con token Bearer.
        </p>
      </div>

      {/* Main Grid: Form vs Security Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Register / Login / Authenticated Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {currentUser ? (
            /* Authenticated Warrior Card */
            <div className="bg-stone-900/90 border border-amber-500/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl -z-0"></div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>SESIÓN AUTENTICADA · TOKEN BEARER ACTIVO</span>
                  </div>
                  <h2 className="font-mk text-2xl sm:text-3xl font-black text-stone-100">
                    Credencial Oficial de Kombate
                  </h2>
                  <div className="text-xs text-stone-400 font-mono mt-0.5">
                    ID: {currentUser.id} · Registrado el {currentUser.registeredAt}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 bg-stone-800 hover:bg-red-950/60 hover:text-red-400 border border-stone-700 hover:border-red-800/80 text-stone-300 text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>

              {/* Warrior Badge Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-[11px] text-stone-400">Alias de Guerrero</div>
                  <div className="text-base font-bold text-amber-400 truncate mt-0.5">
                    {currentUser.username}
                  </div>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <div className="text-[11px] text-stone-400">Reino Asignado</div>
                  <div className="text-base font-bold text-sky-400 truncate mt-0.5">
                    {currentUser.realm}
                  </div>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-stone-400">Mentor Elegido</div>
                  <div className="text-base font-bold text-stone-200 truncate mt-0.5">
                    {currentUser.mentor}
                  </div>
                </div>
              </div>

              {/* Stored Hash Inspection */}
              <div className="space-y-1.5 bg-stone-950 p-4 rounded-xl border border-stone-800">
                <div className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                  <span>Hash Criptográfico en Almacenamiento Seguro (SHA-256):</span>
                  <span className="text-[10px] text-emerald-400 font-mono">64 caracteres hex</span>
                </div>
                <div className="font-mono text-[11px] text-amber-400/90 break-all bg-black/60 p-2.5 rounded border border-stone-800/60">
                  {currentUser.passwordHash}
                </div>
                <div className="text-[11px] text-stone-400">
                  Sal criptográfica generada: <code className="text-stone-300 font-mono">{currentUser.salt}</code>
                </div>
              </div>

              {/* JWT Session Token Preview */}
              {currentUser.token && (
                <div className="space-y-1.5 bg-stone-950 p-4 rounded-xl border border-stone-800">
                  <div className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                    <span>Token de Sesión JWT Simulado (Header.Payload.Signature):</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentUser.token || '');
                        playSound('click');
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </button>
                  </div>
                  <div className="font-mono text-[10px] text-sky-400/90 break-all bg-black/60 p-2.5 rounded border border-stone-800/60 max-h-20 overflow-y-auto">
                    {currentUser.token}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={onNavigateToCatalog}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Ir al Catálogo de Personajes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Register / Login Form */
            <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              
              {/* Tab Selector: Register vs Login */}
              <div className="flex items-center gap-2 p-1 bg-stone-950 rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setMode('register');
                    setErrors({});
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'register'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Registro de Nuevo Guerrero
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setMode('login');
                    setErrors({});
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Iniciar Sesión de Kombate
                </button>
              </div>

              {/* Success Alert */}
              {successMessage && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-600/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Global Error Alert (Lockout) */}
              {errors.global && (
                <div className="p-4 bg-red-950/60 border border-red-600/50 rounded-xl text-xs text-red-200 flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errors.global}</span>
                </div>
              )}

              <form onSubmit={mode === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
                
                {/* 1. Username (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Alias de Guerrero / Nombre de Kombatiente <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Ej: ShiraiWarrior99"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-stone-950 border rounded-xl text-sm text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                          errors.username ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-xs text-red-400 mt-1">{errors.username}</p>
                    )}
                  </div>
                )}

                {/* 2. Email */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Correo Electrónico Oficial <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="kombatiente@earthrealm.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-950 border rounded-xl text-sm text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* 3. Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-stone-300">
                      Contraseña Maestra <span className="text-amber-500">*</span>
                    </label>
                    {mode === 'register' && password && (
                      <span
                        className="text-[11px] font-semibold font-mono"
                        style={{ color: passwordAnalysis.color }}
                      >
                        Fortaleza: {passwordAnalysis.label} ({passwordAnalysis.score}/100)
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-stone-950 border rounded-xl text-sm text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  {/* Password Entropy Meter (Register only) */}
                  {mode === 'register' && password && (
                    <div className="mt-2 space-y-2">
                      {/* Bar */}
                      <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden border border-stone-800">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${passwordAnalysis.score}%`,
                            backgroundColor: passwordAnalysis.color
                          }}
                        ></div>
                      </div>

                      {/* Criteria checklist */}
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-stone-400 pt-1">
                        <div className={`flex items-center gap-1 ${passwordAnalysis.hasMinLength ? 'text-emerald-400' : ''}`}>
                          <span>{passwordAnalysis.hasMinLength ? '✓' : '○'}</span> Mínimo 8 caracteres
                        </div>
                        <div className={`flex items-center gap-1 ${passwordAnalysis.hasUppercase ? 'text-emerald-400' : ''}`}>
                          <span>{passwordAnalysis.hasUppercase ? '✓' : '○'}</span> Letra mayúscula (A-Z)
                        </div>
                        <div className={`flex items-center gap-1 ${passwordAnalysis.hasLowercase ? 'text-emerald-400' : ''}`}>
                          <span>{passwordAnalysis.hasLowercase ? '✓' : '○'}</span> Letra minúscula (a-z)
                        </div>
                        <div className={`flex items-center gap-1 ${passwordAnalysis.hasNumber ? 'text-emerald-400' : ''}`}>
                          <span>{passwordAnalysis.hasNumber ? '✓' : '○'}</span> Número (0-9)
                        </div>
                        <div className={`flex items-center gap-1 col-span-2 ${passwordAnalysis.hasSpecialChar ? 'text-emerald-400' : ''}`}>
                          <span>{passwordAnalysis.hasSpecialChar ? '✓' : '○'}</span> Símbolo especial (!@#$%...)
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* 4. Confirm Password (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">
                      Confirmar Contraseña <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-stone-950 border rounded-xl text-sm text-stone-200 placeholder-stone-600 focus:outline-none transition-colors ${
                          errors.confirmPassword ? 'border-red-500' : 'border-stone-800 focus:border-amber-500'
                        }`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* 5. Realm & Mentor Selectors (Register only) */}
                {mode === 'register' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Reino de Origen:
                      </label>
                      <select
                        value={realm}
                        onChange={(e) => setRealm(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 text-stone-300 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Earthrealm">Earthrealm (La Tierra)</option>
                        <option value="Netherrealm">Netherrealm (Infierno)</option>
                        <option value="Outworld">Outworld (Mundo Exterior)</option>
                        <option value="Edenia">Edenia (Reino Paraíso)</option>
                        <option value="Orderrealm">Orderrealm (Seido)</option>
                        <option value="Chaosrealm">Chaosrealm (Caos)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Guerrero Mentor:
                      </label>
                      <select
                        value={mentor}
                        onChange={(e) => setMentor(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 text-stone-300 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Scorpion">Scorpion (Shirai Ryu)</option>
                        <option value="Sub-Zero">Sub-Zero (Lin Kuei)</option>
                        <option value="Raiden">Raiden (Dios del Trueno)</option>
                        <option value="Liu Kang">Liu Kang (Dios del Fuego)</option>
                        <option value="Johnny Cage">Johnny Cage (Fuerzas Especiales)</option>
                        <option value="Kitana">Kitana (Princesa de Edenia)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 6. Anti-CSRF Token Indicator */}
                <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800 text-[11px] font-mono text-stone-400 flex items-center justify-between">
                  <span>Token Anti-CSRF Activo:</span>
                  <span className="text-amber-500 truncate max-w-[200px]">{csrfToken}</span>
                </div>

                {/* 7. Terms Checkbox (Register only) */}
                {mode === 'register' && (
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-300">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-0.5 rounded border-stone-700 bg-stone-950 text-amber-500 focus:ring-amber-500"
                      />
                      <span>
                        Acepto las reglas de combate y el tratamiento de credenciales protegidas bajo los lineamientos de la <strong>Unidad 3 de Seguridad Web</strong>.
                      </span>
                    </label>
                    {errors.terms && (
                      <p className="text-xs text-red-400 mt-1">{errors.terms}</p>
                    )}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || lockoutTime > 0}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Procesando Credenciales...</span>
                    </>
                  ) : mode === 'register' ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Registrar y Expedir Credencial Segura</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Validar Hash & Iniciar Sesión</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Educational Security Engines & Attack Sandbox (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Engine 1: Client-Side SHA-256 Hasher in real time */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Hash className="w-4 h-4" />
              <span>Motor Criptográfico SHA-256 (Web Crypto)</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              En la <strong>Unidad 3</strong> aprendemos que las contraseñas jamás deben almacenarse en texto plano. Observa cómo tu contraseña ingresada en el formulario se transforma en un hash irreversible con Salt + Pepper:
            </p>

            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span>Sal Criptográfica (Salt):</span>
                <span className="font-mono text-amber-400">{currentSalt}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Algoritmo:</span>
                <span className="font-mono text-sky-400">SHA-256 / 256 bits</span>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Hash Resultante (Hex):</span>
                <div className="font-mono text-[10px] text-emerald-400 bg-black/60 p-2.5 rounded border border-stone-800 break-all">
                  {computedHash || 'Escribe una contraseña en el formulario para generar el hash...'}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-stone-400 italic">
              Nota: Aunque un atacante obtenga la base de datos, el hash SHA-256 no puede revertirse a la contraseña original.
            </div>
          </div>

          {/* Engine 2: Interactive Sandbox for Testing XSS & SQLi */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
              <Terminal className="w-4 h-4" />
              <span>Simulador de Detección de Ataques (XSS & SQLi)</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Prueba a escribir cadenas maliciosas o presiona los ejemplos para ver cómo la sanitización de la Unidad 3 neutraliza la amenaza:
            </p>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSandboxInput("<script>alert('Vulnerabilidad XSS')</script>")}
                className="text-[11px] bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-300 px-2 py-1 rounded cursor-pointer transition-colors"
              >
                Inyección &lt;script&gt;
              </button>
              <button
                type="button"
                onClick={() => setSandboxInput("' OR '1'='1' -- Bypass")}
                className="text-[11px] bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-300 px-2 py-1 rounded cursor-pointer transition-colors"
              >
                SQLi Tautología
              </button>
              <button
                type="button"
                onClick={() => setSandboxInput("<img src=x onerror=alert('cookie_stolen')>")}
                className="text-[11px] bg-stone-950 border border-stone-800 hover:border-amber-500 text-stone-300 px-2 py-1 rounded cursor-pointer transition-colors"
              >
                XSS con Img OnError
              </button>
            </div>

            <input
              type="text"
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-lg text-xs font-mono text-stone-200 focus:outline-none focus:border-sky-500"
              placeholder="Escribe código de prueba..."
            />

            {/* Live Detection Outcome */}
            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold">
                {sandboxResult.isClean ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Entrada Limpia y Segura
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Amenaza Detectada
                  </span>
                )}
              </div>

              {!sandboxResult.isClean && (
                <div className="text-[11px] text-red-300 space-y-0.5">
                  {sandboxResult.detectedThreats.map((threat, i) => (
                    <div key={i}>• {threat}</div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-stone-800">
                <span className="text-[11px] text-stone-400 block mb-1">Salida Sanitizada (Escapada en HTML):</span>
                <div className="font-mono text-[10px] text-sky-300 bg-black/60 p-2 rounded border border-stone-800 break-all">
                  {sandboxResult.sanitized}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
