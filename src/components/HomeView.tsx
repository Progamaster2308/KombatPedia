import React, { useState } from 'react';
import { ArrowRight, Film, Swords, ShieldCheck, Sparkles, RefreshCw, Star, Skull, Flame, Award, Zap } from 'lucide-react';
import { CHARACTERS_DATA, Character } from '../data/characters';
import { MK_MEDIA_DATABASE, MediaProduction } from '../services/mediaApi';
import { TIMELINE_ERAS } from '../data/realms';
import { playSound } from '../services/audio';

interface HomeViewProps {
  onNavigate: (tab: 'characters' | 'movies' | 'auth') => void;
  onSelectCharacter: (charId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectCharacter }) => {
  // Kombatant of the Day state
  const [kombatantIndex, setKombatantIndex] = useState(0);
  // Movie of the Day state
  const [movieIndex, setMovieIndex] = useState(0);

  const currentKombatant = CHARACTERS_DATA[kombatantIndex % CHARACTERS_DATA.length];
  const currentMovie = MK_MEDIA_DATABASE[movieIndex % MK_MEDIA_DATABASE.length];

  const handleRandomizeDaily = () => {
    playSound('hit');
    setKombatantIndex((prev) => (prev + 1) % CHARACTERS_DATA.length);
    setMovieIndex((prev) => (prev + 1) % MK_MEDIA_DATABASE.length);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section con estética cinemática de Mortal Kombat 11 */}
      <section className="relative overflow-hidden rounded-2xl mk11-gold-border bg-stone-950 shadow-2xl">
        <div className="relative h-[480px] sm:h-[560px] w-full">
          <img
            src="/src/assets/images/mk_hero_banner_1792619478202.jpg"
            alt="Mortal Kombat 11 Dragon Tournament Arena"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/65 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-transparent to-[#07080a]/80"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 mb-3 drop-shadow">
              <span>KOMBATPEDIA ARCHIVES</span>
              <span aria-hidden="true">·</span>
              <span>MK11 AESTHETIC & DESIGN</span>
              <span aria-hidden="true">·</span>
              <span>ROSTER COMPLETO</span>
            </div>

            <h1 className="font-mk text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide text-stone-100 leading-tight mb-4 text-balance uppercase">
              YOU WILL FACE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600">MORTAL KOMBAT</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl drop-shadow">
              El compendio definitivo de Mortal Kombat. Explora la historia, move sets para PlayStation, Xbox y Switch, personajes invitados de cómics y cine, la totalidad de Kameo Fighters y la saga cinematográfica desde <strong>Mortal Kombat 9</strong> hasta <strong>Mortal Kombat 1 (MK12)</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playSound('gong');
                  onNavigate('characters');
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer border border-amber-400/50"
              >
                <Swords className="w-4 h-4" />
                <span>Roster Completo ({CHARACTERS_DATA.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onNavigate('movies');
                }}
                className="px-5 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-amber-500/40 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Film className="w-4 h-4 text-amber-500" />
                <span>Películas & Series (TMDb)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onNavigate('auth');
                }}
                className="px-5 py-3.5 bg-stone-900/70 hover:bg-stone-800 text-stone-300 border border-stone-800 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Registro & Auth Seguro</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección Interactiva: "Kombatant / Movie of the Day" con Marco MK11 */}
      <section className="bg-gradient-to-r from-stone-950 via-[#120b0c] to-stone-950 mk11-gold-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Selección Destacada del Día</span>
            </div>
            <h2 className="font-mk text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-wide">
              Kombatant & Movie of the Day
            </h2>
          </div>

          <button
            type="button"
            onClick={handleRandomizeDaily}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-amber-500/60 hover:border-amber-400 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Rotar Kombatiente / Película</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Kombatant of the Day */}
          <div className="bg-[#0e0f14] border border-amber-500/50 rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="relative h-56 bg-stone-950 overflow-hidden">
              {currentKombatant.image ? (
                <img
                  src={currentKombatant.image}
                  alt={currentKombatant.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : null}

              {!currentKombatant.image && (
                <div className={`w-full h-full bg-gradient-to-br ${currentKombatant.bgGradient} flex items-center justify-center`}>
                  <div className="text-4xl">{currentKombatant.fallbackBadge.iconSymbol}</div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/30 to-transparent"></div>
              
              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-mono font-bold border border-amber-500/60 text-amber-400">
                {currentKombatant.category}
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-mk text-2xl font-black text-stone-100 uppercase tracking-wide">
                  {currentKombatant.name}
                </h3>
                <div className="text-xs text-amber-400 font-semibold">
                  {currentKombatant.alias}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                {currentKombatant.bioSummary}
              </p>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  Move set: <strong className="text-amber-400 font-mono">{currentKombatant.moveset.length} técnicas</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playSound('hit');
                    onSelectCharacter(currentKombatant.id);
                  }}
                  className="text-amber-500 font-bold hover:text-amber-400 flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  <span>Kustomize & Moves</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Movie of the Day */}
          <div className="bg-[#0e0f14] border border-amber-500/50 rounded-xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="relative h-56 bg-stone-950 overflow-hidden">
              <img
                src={currentMovie.posterUrl}
                alt={currentMovie.title}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/mk_hero_banner_1792619478202.jpg';
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/30 to-transparent"></div>

              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-mono font-bold border border-sky-500/60 text-sky-400">
                {currentMovie.type}
              </div>

              <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-xs font-bold text-emerald-400 flex items-center gap-1 border border-emerald-500/50">
                <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                <span>{currentMovie.ratingScore}/10</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-mk text-2xl font-black text-stone-100 uppercase tracking-wide">
                  {currentMovie.title}
                </h3>
                <div className="text-xs text-stone-300 font-mono">
                  {currentMovie.year} · {currentMovie.duration}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                {currentMovie.synopsis}
              </p>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  Director: <strong className="text-stone-200">{currentMovie.director}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    onNavigate('movies');
                  }}
                  className="text-amber-500 font-bold hover:text-amber-400 flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  <span>Ver Ficha TMDb</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Las 4 Entregas Clave con Estilo MK11 */}
      <section className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl">
          <div className="text-xs font-black uppercase tracking-widest text-amber-500 mb-1">
            Cronología Canónica de NetherRealm Studios
          </div>
          <h2 className="font-mk text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-wide">
            Evolución de las 4 Entregas (MK9, MKX, MK11, MK1)
          </h2>
          <p className="text-sm text-stone-400 mt-2">
            Cada entrega transformó la jugabilidad introduciendo X-Rays, sistemas de 3 Variaciones, Krushing Blows y los revolucionarios Kameo Fighters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {TIMELINE_ERAS.map((era) => (
            <div
              key={era.gameKey}
              onClick={() => {
                playSound('click');
                onNavigate('characters');
              }}
              className="bg-[#0e0f14] border border-stone-800 hover:border-amber-500/80 rounded-xl p-5 transition-all hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-black">
                    {era.year} · {era.gameKey === 'mk8' ? 'VIII' : era.gameKey === 'mk9' ? 'IX' : era.gameKey === 'mkx' ? 'X' : era.gameKey === 'mk11' ? 'XI' : 'XII'}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">
                    CANON
                  </span>
                </div>

                <h3 className="font-mk text-lg font-black text-stone-100 uppercase mb-0.5">
                  {era.title}
                </h3>
                <div className="text-xs text-amber-400 font-bold mb-2.5">
                  {era.subtitle}
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  {era.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Roster y Mecánicas</span>
                <span className="text-amber-500 font-bold flex items-center gap-1 uppercase tracking-wider text-[10px]">
                  Ver Roster <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
