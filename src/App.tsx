// Campus SOL Starter - Main App with Bottom Navigation

import { useState } from 'react';
import { Toaster } from 'sonner';
import { Home, Target, Trophy, User } from 'lucide-react';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { HomePage } from '@/pages/HomePage';
import { QuestsPage } from '@/pages/QuestsPage';
import { RankPage } from '@/pages/RankPage';
import { ProfilePage } from '@/pages/ProfilePage';

export type TabType = 'landing' | 'home' | 'quests' | 'rank' | 'profile';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('landing');

  const renderContent = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage onStart={setCurrentTab} />;
      case 'home':
        return <HomePage onNavigate={setCurrentTab} />;
      case 'quests':
        return <QuestsPage />;
      case 'rank':
        return <RankPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage onStart={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
          },
        }}
      />

      {/* Main Content */}
      <main className="animate-fade-in">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Hide on Landing) */}
      {currentTab !== 'landing' && (
        <nav className="bottom-nav">
          <button
            className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentTab('home')}
          >
            <Home />
            <span>Home</span>
          </button>
          <button
            className={`nav-item ${currentTab === 'quests' ? 'active' : ''}`}
            onClick={() => setCurrentTab('quests')}
          >
            <Target />
            <span>Quests</span>
          </button>
          <button
            className={`nav-item ${currentTab === 'rank' ? 'active' : ''}`}
            onClick={() => setCurrentTab('rank')}
          >
            <Trophy />
            <span>Rank</span>
          </button>
          <button
            className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentTab('profile')}
          >
            <User />
            <span>Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
