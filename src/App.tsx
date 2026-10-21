import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CharacterCatalogView } from './components/CharacterCatalogView';
import { MediaMoviesView } from './components/MediaMoviesView';
import { RegisterSecurityView } from './components/RegisterSecurityView';
import { Footer } from './components/Footer';
import { getCurrentSession, StoredUser } from './services/security';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'characters' | 'movies' | 'auth'>('home');
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);

  // Load existing session from secure local storage
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setCurrentUser(session);
    }
  }, []);

  const handleSelectCharacterFromHome = (charId: string) => {
    setSelectedCharId(charId);
    setCurrentTab('characters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: typeof currentTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080a] text-stone-100 selection:bg-amber-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        currentUser={currentUser}
        onUserUpdate={setCurrentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleTabChange}
            onSelectCharacter={handleSelectCharacterFromHome}
          />
        )}

        {currentTab === 'characters' && (
          <CharacterCatalogView
            initialCharacterId={selectedCharId}
            onClearInitialCharacter={() => setSelectedCharId(null)}
          />
        )}

        {currentTab === 'movies' && <MediaMoviesView />}

        {currentTab === 'auth' && (
          <RegisterSecurityView
            currentUser={currentUser}
            onUserUpdate={setCurrentUser}
            onNavigateToCatalog={() => handleTabChange('characters')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />
    </div>
  );
}
