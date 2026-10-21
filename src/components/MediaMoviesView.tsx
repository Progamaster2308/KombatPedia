import React, { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Search,
  Star,
  Calendar,
  Clock,
  Tv,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Terminal,
  Shield,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  MediaProduction,
  searchTmdbMovies,
  MK_MEDIA_DATABASE,
  MediaApiResponseLog
} from '../services/mediaApi';
import { playSound } from '../services/audio';

export const MediaMoviesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Mortal Kombat');
  const [filterType, setFilterType] = useState<string>('all');
  const [productions, setProductions] = useState<MediaProduction[]>(MK_MEDIA_DATABASE);
  const [selectedMedia, setSelectedMedia] = useState<MediaProduction>(MK_MEDIA_DATABASE[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLog, setApiLog] = useState<MediaApiResponseLog | null>(null);
  const [showInspector, setShowInspector] = useState(false);

  // Initial fetch using TMDb API via .env
  useEffect(() => {
    handleSearchTmdb('Mortal Kombat');
  }, []);

  const handleSearchTmdb = async (queryTerm: string) => {
    setIsLoading(true);
    try {
      const { productions: fetchedList, log } = await searchTmdbMovies(queryTerm);
      setProductions(fetchedList);
      setApiLog(log);
      if (fetchedList.length > 0) {
        setSelectedMedia(fetchedList[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    handleSearchTmdb(searchQuery.trim() || 'Mortal Kombat');
  };

  const filteredList = useMemo(() => {
    if (filterType === 'all') return productions;
    return productions.filter(p => p.type === filterType);
  }, [productions, filterType]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header MK11 Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-stone-950 via-[#140b0d] to-stone-950 p-6 sm:p-8 rounded-2xl mk11-gold-border">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 mb-1.5">
          <span>UNIVERSO CINEMATOGRÁFICO & MULTIMEDIA</span>
          <span aria-hidden="true">·</span>
          <span>API REST TMDB / OMDB</span>
          <span aria-hidden="true">·</span>
          <span>UNIDAD 3</span>
        </div>
        <h1 className="font-mk text-3xl sm:text-5xl font-black text-stone-100 uppercase tracking-wide">
          Películas, Series & Cameos
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Explora las producciones audiovisuales de Mortal Kombat: clásicos live-action, la aclamada saga animada <strong>Legends</strong> de Warner Bros. Animation, series y cameos estelares. Conexión en tiempo real con la API REST de <strong>The Movie Database (TMDb)</strong> usando variables protegidas en <code>.env</code>.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
        <form onSubmit={handleFormSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar películas o series (ej: Scorpion's Revenge, 1995, Legends, Cage Match)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Consultando TMDb...</span>
              </>
            ) : (
              <>
                <Film className="w-3.5 h-3.5" />
                <span>Consultar API Externa</span>
              </>
            )}
          </button>
        </form>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400">Filtrar por Formato:</span>
            {[
              { id: 'all', label: 'Todos los Títulos' },
              { id: 'Live-Action', label: 'Películas Live-Action' },
              { id: 'Animación Legends', label: 'Animación Legends (R-Rated)' },
              { id: 'Serie TV / Web', label: 'Series de TV & Web' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setFilterType(tab.id);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowInspector(!showInspector)}
            className="text-sky-400 hover:text-sky-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{showInspector ? 'Ocultar Inspector REST' : 'Inspeccionar HTTP Response (Unidad 3)'}</span>
          </button>
        </div>
      </div>

      {/* REST API Telemetry Inspector (Unidad 3) */}
      {showInspector && apiLog && (
        <div className="bg-stone-950 border border-sky-900/60 rounded-xl p-5 space-y-3 font-mono text-xs shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-800">
            <div className="flex items-center gap-2 text-sky-400 font-semibold">
              <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800">
                HTTP {apiLog.statusCode} {apiLog.statusText}
              </span>
              <span className="text-stone-300">{apiLog.method} {apiLog.endpoint}</span>
            </div>
            <div className="text-emerald-400">
              Latencia: {apiLog.durationMs} ms · TLS 1.3
            </div>
          </div>

          <div className="text-[11px] text-stone-400">
            Variables de entorno utilizadas: <code className="text-amber-400 font-semibold">VITE_TMDB_API_KEY</code> aislada en archivo <code>.env</code> y protegida por <code>.gitignore</code>.
          </div>

          <div className="bg-black/80 p-3 rounded-lg border border-stone-800/80 text-[11px] text-emerald-300/90 max-h-48 overflow-y-auto">
            {JSON.stringify(apiLog.data, null, 2)}
          </div>
        </div>
      )}

      {/* Main Split: Featured Highlight + Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Selected Movie Spotlight (5 cols) */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl sticky top-20">
          <div className="relative h-64 bg-stone-950 overflow-hidden">
            <img
              src={selectedMedia.posterUrl}
              alt={selectedMedia.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                // Fallback graceful
                (e.target as HTMLImageElement).src = '/src/assets/images/mk_hero_banner_1792619478202.jpg';
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

            <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono border border-stone-700/80 text-amber-400">
              {selectedMedia.type}
            </div>

            <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold border border-stone-700/80 text-emerald-400 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>{selectedMedia.ratingScore} / 10</span>
            </div>

            <div className="absolute bottom-3 left-4 right-4">
              <div className="text-xs text-amber-400 font-mono">
                {selectedMedia.year} · {selectedMedia.duration}
              </div>
              <h2 className="font-mk text-2xl font-bold text-stone-100 drop-shadow-md">
                {selectedMedia.title}
              </h2>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
                Sinopsis Canónica
              </div>
              <p className="text-stone-300 leading-relaxed bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                {selectedMedia.synopsis}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-stone-400 font-semibold shrink-0">Dirección:</span>
                <span className="text-stone-200">{selectedMedia.director}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-stone-400 font-semibold shrink-0">Estreno Oficial:</span>
                <span className="text-stone-300 font-mono">{selectedMedia.releaseDate}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-stone-400 font-semibold shrink-0">Universo:</span>
                <span className="text-amber-400/90">{selectedMedia.canonicalUniverse}</span>
              </div>
            </div>

            {/* Reparto Principal */}
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                Reparto Destacado
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedMedia.cast.map((actor, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-950 border border-stone-800 text-stone-300 text-[11px] px-2.5 py-1 rounded"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Cameos & Apariciones Especiales */}
            <div>
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Cameos & Apariciones Notables</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedMedia.cameos.map((cameo, idx) => (
                  <span
                    key={idx}
                    className="bg-red-950/40 border border-red-800/50 text-red-200 text-[11px] px-2.5 py-1 rounded font-medium"
                  >
                    {cameo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Media Catalog Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs text-stone-400 flex items-center justify-between">
            <span>Mostrando {filteredList.length} producciones audiovisuales</span>
            <span className="font-mono text-amber-500">TMDb / OMDb API Live</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  playSound('click');
                  setSelectedMedia(item);
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  selectedMedia.id === item.id
                    ? 'bg-stone-900 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.year}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                      {item.ratingScore}
                    </span>
                  </div>

                  <h3 className="font-mk text-base font-bold text-stone-100 line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="text-[11px] text-stone-400 font-mono">
                    {item.type} · {item.duration}
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.synopsis}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500 truncate max-w-[140px]">
                    Dir: {item.director}
                  </span>
                  <span className="text-amber-500 font-semibold flex items-center gap-1">
                    <span>Ver Ficha</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
