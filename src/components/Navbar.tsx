import React from 'react';
import { Volume2, VolumeX, Shield, User, LogOut, Flame, Swords, Film } from 'lucide-react';
import { StoredUser, setCurrentSession } from '../services/security';
import { playSound, isSoundEnabled, setSoundEnabled } from '../services/audio';

interface NavbarProps {
  currentTab: 'home' | 'characters' | 'movies' | 'auth';
  onSelectTab: (tab: 'home' | 'characters' | 'movies' | 'auth') => void;
  currentUser: StoredUser | null;
  onUserUpdate: (user: StoredUser | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onUserUpdate
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
    if (newState) playSound('click');
  };

  const handleNavClick = (tab: NavbarProps['currentTab']) => {
    playSound('click');
    onSelectTab(tab);
  };

  const handleLogout = () => {
    playSound('hit');
    setCurrentSession(null);
    onUserUpdate(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0c10]/95 backdrop-blur-md border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-orange-600 to-amber-500 flex items-center justify-center p-1 text-black shadow-lg shadow-red-950/50">
            <Flame className="w-5 h-5 text-amber-100" />
          </div>
          <span className="font-mk text-lg sm:text-xl font-black tracking-wider text-stone-100 group-hover:text-amber-400 transition-colors">
            KOMBATPEDIA
          </span>
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-400 cursor-pointer ${
              currentTab === 'home' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : 'text-stone-300'
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => handleNavClick('characters')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-400 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'characters' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : 'text-stone-300'
            }`}
          >
            <Swords className="w-4 h-4 text-amber-500" />
            <span>Kombatants & Move Sets</span>
          </button>

          <button
            onClick={() => handleNavClick('movies')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-400 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'movies' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : 'text-stone-300'
            }`}
          >
            <Film className="w-4 h-4 text-amber-500" />
            <span>Películas & Series (TMDb)</span>
          </button>

          <button
            onClick={() => handleNavClick('auth')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-400 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'auth' ? 'text-amber-400 font-bold border-b-2 border-amber-500 pb-0.5' : 'text-stone-300'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Registro & Auth Seguro</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Desactivar sonido' : 'Activar sonido'}
            className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Alternar audio"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-600" />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-stone-200 font-medium truncate max-w-[120px]">
                {currentUser.username}
              </span>
              <button
                onClick={handleLogout}
                title="Cerrar sesión"
                className="text-stone-400 hover:text-red-400 ml-1 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('auth')}
              className="px-4 py-2 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Registro / Iniciar Sesión
            </button>
          )}
        </div>
      </div>

      {/* Subnav for Mobile viewports */}
      <div className="md:hidden flex overflow-x-auto gap-4 px-4 py-2.5 bg-stone-950/90 border-t border-stone-900 text-xs text-stone-300">
        <button
          onClick={() => handleNavClick('home')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'home' ? 'text-amber-400 font-bold' : ''}`}
        >
          Inicio
        </button>
        <button
          onClick={() => handleNavClick('characters')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'characters' ? 'text-amber-400 font-bold' : ''}`}
        >
          Kombatants & Move Sets
        </button>
        <button
          onClick={() => handleNavClick('movies')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'movies' ? 'text-amber-400 font-bold' : ''}`}
        >
          Películas & Series
        </button>
        <button
          onClick={() => handleNavClick('auth')}
          className={`whitespace-nowrap shrink-0 ${currentTab === 'auth' ? 'text-amber-400 font-bold' : ''}`}
        >
          Registro & Auth
        </button>
      </div>
    </header>
  );
};
