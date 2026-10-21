import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Shield,
  Swords,
  Gamepad2,
  Sparkles,
  Volume2,
  Skull,
  CheckCircle,
  Play,
  Layers,
  Flame,
  Award,
  ChevronRight,
  ShieldAlert,
  Zap,
  Target
} from 'lucide-react';
import {
  CHARACTERS_DATA,
  Character,
  ConsoleNotation,
  FighterCategory,
  GameKey,
  formatMoveInput
} from '../data/characters';
import { playSound } from '../services/audio';
import { sanitizeInput } from '../services/security';

interface CharacterCatalogViewProps {
  initialCharacterId?: string | null;
  onClearInitialCharacter?: () => void;
}

export const CharacterCatalogView: React.FC<CharacterCatalogViewProps> = ({
  initialCharacterId,
  onClearInitialCharacter
}) => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameFilter, setSelectedGameFilter] = useState<'all' | GameKey>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | FighterCategory>('all');

  // Console notation state: 'universal' | 'playstation' | 'xbox' | 'switch'
  const [notation, setNotation] = useState<ConsoleNotation>('playstation');

  // Active modal character
  const [activeModalChar, setActiveModalChar] = useState<Character | null>(() => {
    if (initialCharacterId) {
      return CHARACTERS_DATA.find((c) => c.id === initialCharacterId) || null;
    }
    return null;
  });

  // Modal active tab: 'moves' | 'designs' | 'lore'
  const [modalTab, setModalTab] = useState<'moves' | 'designs' | 'lore'>('moves');
  // Finisher simulation feedback state
  const [finisherAlert, setFinisherAlert] = useState<string | null>(null);

  // Sync if initialCharacterId changes
  React.useEffect(() => {
    if (initialCharacterId) {
      const match = CHARACTERS_DATA.find((c) => c.id === initialCharacterId);
      if (match) {
        setActiveModalChar(match);
      }
    }
  }, [initialCharacterId]);

  // Sanitize search query to protect against XSS/injections
  const sanitization = useMemo(() => sanitizeInput(searchQuery), [searchQuery]);

  const filteredCharacters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CHARACTERS_DATA.filter((char) => {
      const matchesSearch =
        char.name.toLowerCase().includes(q) ||
        char.alias.toLowerCase().includes(q) ||
        char.bioSummary.toLowerCase().includes(q);

      const matchesGame =
        selectedGameFilter === 'all' || char.gamesAppeared.includes(selectedGameFilter);

      const matchesCategory =
        selectedCategoryFilter === 'all' || char.category === selectedCategoryFilter;

      return matchesSearch && matchesGame && matchesCategory;
    });
  }, [searchQuery, selectedGameFilter, selectedCategoryFilter]);

  const handleOpenModal = (char: Character) => {
    playSound('hit');
    setActiveModalChar(char);
    setModalTab('moves');
    setFinisherAlert(null);
  };

  const handleCloseModal = () => {
    playSound('click');
    setActiveModalChar(null);
    if (onClearInitialCharacter) onClearInitialCharacter();
  };

  const handleExecuteFinisher = (finisherName: string) => {
    playSound('fatality');
    setFinisherAlert(`¡${finisherName.toUpperCase()} EJECUTADA! · FINISH HIM!`);
    setTimeout(() => {
      setFinisherAlert(null);
    }, 4500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - MK11 Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-stone-950 via-[#120b0c] to-stone-950 p-6 sm:p-8 rounded-2xl mk11-gold-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-1.5">
              <span>KOMBATPEDIA ARCHIVES</span>
              <span aria-hidden="true">·</span>
              <span>MK11 ENGINE & DESIGN SYSTEM</span>
              <span aria-hidden="true">·</span>
              <span>MK9, MKX, MK11, MK1</span>
            </div>
            <h1 className="font-mk text-3xl sm:text-5xl font-black text-stone-100 tracking-wide uppercase drop-shadow-lg">
              Kombatientes, Kameos & Invitados
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
              Catálogo completo de los guerreros de las 4 entregas modernas con move sets interactivos, Krushing Blows, Fatalities y análisis estético de armaduras y modelado 3D.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-stone-950/80 p-3 rounded-xl border border-amber-500/30 shrink-0">
            <div className="text-center px-2">
              <div className="text-2xl font-black text-amber-400 font-mono">{CHARACTERS_DATA.length}</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Total Guerreros</div>
            </div>
            <div className="w-px h-8 bg-stone-800"></div>
            <div className="text-center px-2">
              <div className="text-2xl font-black text-red-500 font-mono">4</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Entregas Canónicas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters & Console Notation Toolbar */}
      <div className="bg-stone-950/90 border border-stone-800/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
        
        {/* Row 1: Search & Console Notation Switcher */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre (ej: Scorpion, Sub-Zero, Shao Kahn, Spawn, Omni-Man, Sareena)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-900 border border-stone-800 focus:border-amber-500 rounded-xl text-sm text-stone-200 placeholder-stone-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Console Notation Selector with MK11 Gold Frame */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl border border-amber-500/40 shrink-0">
            <span className="text-[11px] font-bold text-amber-400 px-2 flex items-center gap-1">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Mando:</span>
            </span>

            {[
              { id: 'playstation', label: 'PlayStation' },
              { id: 'xbox', label: 'Xbox' },
              { id: 'switch', label: 'Switch' },
              { id: 'universal', label: 'Universal (FP/BP)' }
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setNotation(c.id as ConsoleNotation);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  notation === c.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md font-black'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Security Warning if suspicious query */}
        {!sanitization.isClean && (
          <div className="p-3 bg-red-950/40 border border-red-600/50 rounded-xl text-xs text-red-200 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Sanitización de Seguridad Activa:</span> {sanitization.detectedThreats.join(' ')}
              <div className="text-[11px] text-red-300/80 mt-0.5">
                La entrada fue higienizada preventivamente para evitar ataques XSS / SQLi.
              </div>
            </div>
          </div>
        )}

        {/* Row 2: Games Filter Tabs (MK9, MKX, MK11, MK1) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-stone-800/80 text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-amber-500 font-bold uppercase tracking-wider mr-1">Filtrar por Entrega:</span>
            {[
              { id: 'all', label: 'Todas las Entregas' },
              { id: 'mk8', label: 'MK vs DC (2008 · VIII)' },
              { id: 'mk9', label: 'MK9 (2011 · IX)' },
              { id: 'mkx', label: 'MKX (2015 · X)' },
              { id: 'mk11', label: 'MK11 (2019 · XI)' },
              { id: 'mk1', label: 'MK1 (2023 · XII)' }
            ].map((game) => (
              <button
                key={game.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setSelectedGameFilter(game.id as typeof selectedGameFilter);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedGameFilter === game.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-stone-100 border border-red-500 shadow-md'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {game.label}
              </button>
            ))}
          </div>

          {/* Categories filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-bold uppercase tracking-wider mr-1">Categoría:</span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'Plantilla Principal', label: 'Plantilla Principal' },
              { id: 'Universo DC (MK vs DC)', label: 'Universo DC (MK8)' },
              { id: 'Personaje Invitado/DLC', label: 'Invitados / DLC' },
              { id: 'Kameo Fighter', label: 'Kameo Fighters' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setSelectedCategoryFilter(cat.id as typeof selectedCategoryFilter);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Roster Character Selection Grid - MK11 Style */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-16 bg-stone-950 border border-stone-800 rounded-2xl">
          <Skull className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <h3 className="font-mk text-lg font-bold text-stone-200">Ningún kombatiente encontrado</h3>
          <p className="text-xs text-stone-400 mt-1">Prueba cambiando la entrega o la categoría seleccionada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              className="group relative bg-[#0e0f14] border border-stone-800/90 hover:border-amber-500/80 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(217,119,6,0.25)] flex flex-col justify-between"
            >
              {/* Card Media Header: Fallback Badge underneath + image on top */}
              <div className="relative h-60 overflow-hidden bg-stone-950">
                {/* Styled MK11 Fallback Badge (rendered in base layer z-0) */}
                <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${char.bgGradient} flex flex-col items-center justify-center p-6 text-center z-0`}>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black font-mk shadow-2xl border-2 border-amber-500/60 mb-2"
                    style={{
                      backgroundColor: char.fallbackBadge.primaryColor,
                      color: '#0a0a0a'
                    }}
                  >
                    {char.fallbackBadge.iconSymbol || char.fallbackBadge.initials}
                  </div>
                  <span className="font-mk text-xl font-bold text-stone-100 tracking-wide">{char.name}</span>
                  <span className="text-xs text-amber-400/90 mt-0.5 font-medium">{char.alias}</span>
                </div>

                {/* Character Image (if present, overlays on top with z-10) */}
                {char.image && (
                  <img
                    src={char.image}
                    alt={char.name}
                    className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/20 to-transparent pointer-events-none"></div>

                {/* Top Category Tag */}
                <div className="absolute top-2.5 left-2.5 z-30">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                    char.category === 'Kameo Fighter'
                      ? 'bg-purple-950/80 text-purple-300 border-purple-600'
                      : char.category === 'Universo DC (MK vs DC)'
                      ? 'bg-blue-950/80 text-blue-300 border-blue-600'
                      : char.category === 'Personaje Invitado/DLC'
                      ? 'bg-red-950/80 text-red-300 border-red-600'
                      : 'bg-stone-950/80 text-amber-400 border-amber-600/70'
                  }`}>
                    {char.category}
                  </span>
                </div>

                {/* Origin Realm */}
                <div className="absolute top-2.5 right-2.5 z-30">
                  <span className="bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono border border-stone-700 text-stone-300">
                    {char.originRealm}
                  </span>
                </div>

                {/* Bottom title in media */}
                <div className="absolute bottom-2.5 left-3.5 right-3.5 z-30">
                  <h3 className="font-mk text-xl font-black text-stone-100 drop-shadow-md group-hover:text-amber-400 transition-colors">
                    {char.name}
                  </h3>
                  <div className="text-[11px] text-amber-400 font-semibold truncate">
                    {char.alias}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {char.bioSummary}
                </p>

                {/* Appearances Roman Numerals */}
                <div className="pt-2 border-t border-stone-800/80 text-xs text-stone-400 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-medium">Entregas Canónicas:</span>
                    <div className="flex gap-1 font-mono font-bold">
                      {char.gamesAppeared.map((g) => (
                        <span key={g} className="px-1.5 py-0.2 rounded bg-stone-900 text-amber-400 border border-stone-800 uppercase">
                          {g === 'mk8' ? 'VIII' : g === 'mk9' ? 'IX' : g === 'mkx' ? 'X' : g === 'mk11' ? 'XI' : 'XII'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Arsenal de Kombat:</span>
                    <span className="text-stone-300 font-medium truncate max-w-[150px]">
                      {char.signatureWeapons.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(char)}
                  className="w-full py-2.5 px-3 bg-stone-900 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-stone-950 text-amber-400 border border-amber-500/40 hover:border-transparent text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm uppercase tracking-wider"
                >
                  <Swords className="w-3.5 h-3.5" />
                  <span>Kustomize & Move Set</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          MODAL DETALLADO ESTILO MK11: KUSTOMIZE & MOVE LIST
         ======================================================== */}
      {activeModalChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0b0c10] border-2 border-amber-500/70 rounded-2xl shadow-[0_0_50px_rgba(217,119,6,0.3)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header MK11 Style */}
            <div className="bg-gradient-to-r from-stone-950 via-[#180e0f] to-stone-950 border-b-2 border-amber-500/60 p-5 sm:p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {activeModalChar.image ? (
                  <img
                    src={activeModalChar.image}
                    alt={activeModalChar.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover object-top border-2 border-amber-500 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-2xl font-black font-mk border-2 border-amber-500"
                    style={{ backgroundColor: activeModalChar.fallbackBadge.primaryColor, color: '#000' }}
                  >
                    {activeModalChar.fallbackBadge.iconSymbol || activeModalChar.fallbackBadge.initials}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-0.5">
                    <span>{activeModalChar.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeModalChar.originRealm}</span>
                  </div>
                  <h2 className="font-mk text-2xl sm:text-4xl font-black text-stone-100 uppercase tracking-wide">
                    {activeModalChar.name}
                  </h2>
                  <p className="text-xs text-stone-300 font-medium mt-0.5">
                    {activeModalChar.alias}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Finisher Alert Banner */}
            {finisherAlert && (
              <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-b border-red-600 px-4 py-2 text-center text-xs font-black text-amber-300 uppercase tracking-widest animate-pulse">
                💀 {finisherAlert}
              </div>
            )}

            {/* MK11 Styled Navigation Tabs */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-3 bg-stone-950 border-b border-stone-800 overflow-x-auto text-xs font-bold">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setModalTab('moves');
                  }}
                  className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 uppercase tracking-wider ${
                    modalTab === 'moves'
                      ? 'border-amber-500 text-amber-400 font-black'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5 text-amber-500" />
                  <span>Move List & Kombos ({activeModalChar.moveset.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setModalTab('designs');
                  }}
                  className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 uppercase tracking-wider ${
                    modalTab === 'designs'
                      ? 'border-amber-500 text-amber-400 font-black'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Kustomize & Diseños ({activeModalChar.evolution.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setModalTab('lore');
                  }}
                  className={`pb-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 uppercase tracking-wider ${
                    modalTab === 'lore'
                      ? 'border-amber-500 text-amber-400 font-black'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Historia & Lore Canónico</span>
                </button>
              </div>

              {/* Console selector inside modal */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono pb-2">
                <span className="text-stone-500">Mando:</span>
                <span className="text-amber-400 font-bold uppercase">{notation}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-[#090a0d]">
              
              {/* TAB 1: MOVE LIST & KOMBOS */}
              {modalTab === 'moves' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-400 pb-2 border-b border-stone-800">
                    <span>
                      Comandos de kombate traducidos para: <strong className="text-amber-400 uppercase font-mono">{notation}</strong>
                    </span>
                    <span className="font-mono text-stone-500 text-[11px]">
                      F=Adelante · B=Atrás · D=Abajo · U=Arriba · AMP=Potenciar
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeModalChar.moveset.map((move, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-950/80 border border-stone-800/90 hover:border-amber-500/60 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-md"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mk font-black text-stone-100 text-base">
                              {move.name}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                              move.type === 'Fatality'
                                ? 'bg-red-950 text-red-400 border-red-700 font-black'
                                : move.type === 'Krushing Blow'
                                ? 'bg-orange-950 text-orange-400 border-orange-700'
                                : move.type === 'X-Ray / Fatal Blow'
                                ? 'bg-amber-950 text-amber-400 border-amber-700'
                                : move.type === 'Kombo Breaker'
                                ? 'bg-blue-950 text-blue-400 border-blue-700'
                                : 'bg-stone-900 text-stone-300 border-stone-700'
                            }`}>
                              {move.type}
                            </span>
                            {move.distance && (
                              <span className="text-[11px] text-stone-500 font-mono">
                                Distancia: {move.distance}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            {move.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Formatted Console Input */}
                          <div className="bg-stone-900 px-3.5 py-1.5 rounded-lg border border-amber-500/40 font-mono text-xs text-amber-300 font-bold shadow-inner">
                            {formatMoveInput(move.steps, notation)}
                          </div>

                          {move.type === 'Fatality' ? (
                            <button
                              type="button"
                              onClick={() => handleExecuteFinisher(move.name)}
                              className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-stone-100 font-black text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md uppercase tracking-wider"
                            >
                              <Skull className="w-3.5 h-3.5" />
                              <span>FINISH HIM!</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => playSound('hit')}
                              className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer"
                              title="Probar sonido de impacto"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: KUSTOMIZE & DISEÑOS POR ENTREGA */}
              {modalTab === 'designs' && (
                <div className="space-y-6">
                  <div className="text-xs text-stone-400">
                    Inspección estética de atuendos, shaders, armas y modelado 3D por juego:
                  </div>

                  <div className="space-y-5">
                    {activeModalChar.evolution.map((evo) => (
                      <div
                        key={evo.gameKey}
                        className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                          <div>
                            <span className="text-[11px] font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30 font-black">
                              {evo.releaseYear} · {evo.gameKey.toUpperCase()}
                            </span>
                            <h3 className="font-mk text-xl font-black text-stone-100 mt-1 uppercase">
                              {evo.gameTitle}
                            </h3>
                          </div>
                          <span className="text-xs font-mono text-amber-400 bg-stone-900 px-3 py-1 rounded border border-stone-800 font-bold">
                            {evo.signatureMechanic}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="bg-stone-900/80 p-3.5 rounded-lg border border-stone-800 space-y-1.5">
                            <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5" />
                              <span>Atuendo & Equipamiento Kustomize:</span>
                            </div>
                            <p className="text-stone-300 leading-relaxed">
                              {evo.costumeAesthetic}
                            </p>
                          </div>

                          <div className="bg-stone-900/80 p-3.5 rounded-lg border border-stone-800 space-y-1.5">
                            <div className="font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5" />
                              <span>Motor Gráfico & Fidelidad 3D:</span>
                            </div>
                            <p className="text-stone-300 leading-relaxed">
                              {evo.modelDesignDescription}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs text-stone-400 pt-2 flex items-center justify-between">
                          <span>Rol canónico: <strong className="text-stone-200">{evo.loreArc}</strong></span>
                        </div>

                        <div className="bg-[#120b0c] p-3 rounded-lg text-center border border-red-900/40 text-xs">
                          <span className="font-mk text-amber-400 font-bold">&ldquo;{evo.iconicQuote}&rdquo;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LORE & TRASFONDO HISTÓRICO */}
              {modalTab === 'lore' && (
                <div className="space-y-5 text-xs sm:text-sm">
                  <div className="bg-stone-950 border border-stone-800 p-5 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                      Resumen Biográfico del Kombatiente
                    </div>
                    <p className="text-stone-300 leading-relaxed text-sm">
                      {activeModalChar.bioSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5 text-xs">
                      <div className="text-stone-400 font-bold uppercase tracking-wider">Rol de Combate Táctico</div>
                      <p className="text-stone-300">{activeModalChar.combatRole}</p>
                    </div>

                    <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1.5 text-xs">
                      <div className="text-stone-400 font-bold uppercase tracking-wider">Armas Emblemáticas</div>
                      <p className="text-stone-300">{activeModalChar.signatureWeapons.join(' · ')}</p>
                    </div>

                    {activeModalChar.kameoPartnerRecommendation && (
                      <div className="bg-stone-950 p-4 rounded-xl border border-amber-500/40 space-y-1.5 text-xs col-span-1 sm:col-span-2">
                        <div className="text-amber-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>Sinergia de Relevo / Kameo Partner:</span>
                        </div>
                        <p className="text-stone-300">{activeModalChar.kameoPartnerRecommendation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono text-amber-500 font-semibold">Kombatpedia: Mortal Kombat Universe & Lore Explorer</span>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors cursor-pointer font-bold uppercase tracking-wider text-xs"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
