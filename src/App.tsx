import React, { useEffect } from 'react';
import {
  LifeLaneProvider,
  useLifeLane,
  ROLE_ALLOWED_SCREENS,
  ROLE_DEFAULT_SCREENS,
} from './context/LifeLaneContext';
import { LifeLaneAppLayout } from './components/layout/LifeLaneAppLayout';
import { ScreenId } from './components/navigation/LifeLaneTopNavbar';
import { HomeOverview } from './pages/HomeOverview/HomeOverview';
import { NurseBedUpdate } from './pages/NurseBedUpdate/NurseBedUpdate';
import { Dispatch } from './pages/Dispatch/Dispatch';
import { HospitalConsole } from './pages/HospitalConsole/HospitalConsole';
import { TrafficCommand } from './pages/TrafficCommand/TrafficCommand';
import { Settings } from './pages/Settings/Settings';

function AppContent() {
  const { activeRole, activeScreen, navigateToScreen } = useLifeLane();

  // Support URL hash navigation with role-based access guard
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      let targetScreen: ScreenId | null = null;

      if (hash.includes('nurse')) {
        targetScreen = 'nurse';
      } else if (hash.includes('dispatch')) {
        targetScreen = 'dispatch';
      } else if (hash.includes('hospital') || hash.includes('console')) {
        targetScreen = 'hospital';
      } else if (hash.includes('traffic') || hash.includes('command')) {
        targetScreen = 'traffic';
      } else if (hash.includes('settings') || hash.includes('config') || hash.includes('param')) {
        targetScreen = 'settings';
      } else if (hash.includes('home') || hash === '' || hash === '#') {
        targetScreen = 'home';
      }

      // If requested screen is valid and allowed for activeRole, navigate to it; otherwise redirect to role default screen
      if (targetScreen && ROLE_ALLOWED_SCREENS[activeRole].includes(targetScreen)) {
        navigateToScreen(targetScreen);
      } else {
        navigateToScreen(ROLE_DEFAULT_SCREENS[activeRole]);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activeRole]);

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
