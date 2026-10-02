import React, { useEffect } from 'react';
import { LifeLaneProvider, useLifeLane } from './context/LifeLaneContext';
import { LifeLaneAppLayout } from './components/layout/LifeLaneAppLayout';
import { HomeOverview } from './pages/HomeOverview/HomeOverview';
import { NurseBedUpdate } from './pages/NurseBedUpdate/NurseBedUpdate';
import { Dispatch } from './pages/Dispatch/Dispatch';
import { HospitalConsole } from './pages/HospitalConsole/HospitalConsole';
import { TrafficCommand } from './pages/TrafficCommand/TrafficCommand';
import { About } from './pages/About/About';
import { Settings } from './pages/Settings/Settings';

function AppContent() {
  const { activeScreen, navigateToScreen } = useLifeLane();

  // Support URL hash navigation e.g. #home, #nurse, #dispatch, #hospital, #traffic, #about, #settings
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('nurse')) {
        navigateToScreen('nurse');
      } else if (hash.includes('dispatch')) {
        navigateToScreen('dispatch');
      } else if (hash.includes('hospital') || hash.includes('console')) {
        navigateToScreen('hospital');
      } else if (hash.includes('traffic') || hash.includes('command')) {
        navigateToScreen('traffic');
      } else if (hash.includes('about')) {
        navigateToScreen('about');
      } else if (hash.includes('settings') || hash.includes('config') || hash.includes('param')) {
        navigateToScreen('settings');
      } else if (hash.includes('home') || hash === '' || hash === '#') {
        navigateToScreen('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <LifeLaneAppLayout
      currentScreen={activeScreen}
      onNavigate={navigateToScreen}
    >
      {/* Active Screen View */}
      {activeScreen === 'home' && (
        <HomeOverview onNavigateToScreen={navigateToScreen} />
      )}
      {activeScreen === 'nurse' && <NurseBedUpdate />}
      {activeScreen === 'dispatch' && <Dispatch />}
      {activeScreen === 'hospital' && <HospitalConsole />}
      {activeScreen === 'traffic' && <TrafficCommand />}
      {activeScreen === 'about' && (
        <About onNavigateToScreen={navigateToScreen} />
      )}
      {activeScreen === 'settings' && (
        <Settings onNavigateToScreen={navigateToScreen} />
      )}
    </LifeLaneAppLayout>
  );
}

export default function App() {
  return (
    <LifeLaneProvider>
      <AppContent />
    </LifeLaneProvider>
  );
}
