import React from 'react';
import { Flame, Shield, Film, Swords } from 'lucide-react';
import { playSound } from '../services/audio';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'characters' | 'movies' | 'auth') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#050608] border-t border-stone-800/80 text-stone-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 via-orange-600 to-amber-500 flex items-center justify-center p-1 text-black">
                <Flame className="w-3.5 h-3.5 text-amber-100" />
              </div>
              <span className="font-mk text-lg font-black tracking-wider text-stone-200">
                KOMBATPEDIA
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Mortal Kombat Universe & Lore Explorer. Catálogo exhaustivo de personajes, move sets con notación para PlayStation y Xbox, producciones audiovisuales con API de TMDb, y sistema seguro de autenticación de la Unidad 3.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Secciones
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    playSound('click');
                    onSelectTab('home');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playSound('click');
                    onSelectTab('characters');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Kombatants & Move Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playSound('click');
                    onSelectTab('movies');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Películas & Series (TMDb)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playSound('click');
                    onSelectTab('auth');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Registro & Auth Seguro
                </button>
              </li>
            </ul>
          </div>

          {/* Academic & Security Credits */}
          <div className="space-y-2">
            <div className="font-semibold text-stone-200 uppercase tracking-wider text-[11px]">
              Especificaciones Unidad 3
            </div>
            <div className="space-y-1 text-[11px] text-stone-400">
              <div>• API Externa: The Movie Database (TMDb REST API)</div>
              <div>• Manejo .env: Claves aisladas e ignoradas en .gitignore</div>
              <div>• Criptografía: SHA-256 + Salt + Pepper en Web Crypto</div>
              <div>• Higienización: Sanitización contra XSS y SQLi</div>
              <div>• Sesión Segura: Token Bearer simulado</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            Mortal Kombat es una marca registrada de NetherRealm Studios y Warner Bros. Games. Proyecto educativo sin fines de lucro.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidad & Cifrado</span>
            <span aria-hidden="true">·</span>
            <span>Unidad 3 Web Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
