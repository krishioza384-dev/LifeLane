import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ScreenId } from '../components/navigation/LifeLaneTopNavbar';
import { VerifiedEmergencyHandover } from '../types/voiceHandover';

export type UserRole = 'ambulance' | 'hospital';

export const ROLE_DEFAULT_SCREENS: Record<UserRole, ScreenId> = {
  ambulance: 'home',
  hospital: 'nurse',
};

export const ROLE_ALLOWED_SCREENS: Record<UserRole, ScreenId[]> = {
  ambulance: ['home', 'dispatch', 'traffic', 'settings'],
  hospital: ['nurse', 'hospital', 'settings'],
};

export interface BedInventory {
  icu: number;
  ventilator: number;
  oxygen: number;
  cardiac: number;
  burns: number;
}

export interface ChangeLogItem {
  id: string;
  resource: 'ICU' | 'Ventilator' | 'Oxygen' | 'Cardiac' | 'Burns';
  delta: number;
  time: string;
}

export interface EmergencyRequestState {
  status: 'idle' | 'offered' | 'accepted' | 'rejected';
  hospital: string;
  ambulance: string;
  patient: string;
  vitals: {
    heartRate: number;
    spO2: number;
    bp: string;
    condition: string;
  };
  bedStatus: 'provisional' | 'confirmed' | 'released';
  assignedBay: string;
  countdownSeconds: number;
  handover?: VerifiedEmergencyHandover;
}

export interface CorridorState {
  status: 'inactive' | 'ready' | 'active';
  baseEta: number;
  currentEta: number;
  timeSaved: number;
  signalsOnline: number;
  corridorSignals: number;
  preemptedSignals: number;
  crossTrafficHeld: number;
}

export type ThemeMode = 'dark' | 'light';

export interface LifeLaneContextType {
  // Theme Architecture
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Role Architecture
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;

  // Navigation
  activeScreen: ScreenId;
  navigateToScreen: (screen: ScreenId) => void;

  // Bed inventory (controlled by Nurse Station)
  beds: BedInventory;
  bedsHeldCount: number;
  updatedMinutesAgo: number;
  isJustUpdated: boolean;
  changeLogs: ChangeLogItem[];
  updateBed: (key: keyof BedInventory, delta: number, resourceName: ChangeLogItem['resource']) => void;
  confirmAccurate: () => void;

  // Emergency request (Dispatch -> Hospital Console)
  request: EmergencyRequestState;
  sendEmergencyRequest: (
    hospitalName?: string,
    verifiedHandover?: VerifiedEmergencyHandover,
    shouldNavigate?: boolean
  ) => void;
  acceptRequest: () => void;
  rejectRequest: () => void;

  // Corridor (Hospital Console -> Traffic Command -> Home)
  corridor: CorridorState;
  activateCorridor: () => void;
  emergencyStopCorridor: () => void;

  // Reset
  resetDemoState: () => void;
}

const INITIAL_BEDS: BedInventory = {
  icu: 3,
  ventilator: 2,
  oxygen: 8,
  cardiac: 1,
  burns: 0,
};

const INITIAL_CHANGE_LOGS: ChangeLogItem[] = [
  { id: '1', resource: 'Ventilator', delta: -1, time: '10:42' },
  { id: '2', resource: 'ICU', delta: 1, time: '10:31' },
  { id: '3', resource: 'Oxygen', delta: -2, time: '10:18' },
];

const INITIAL_REQUEST: EmergencyRequestState = {
  status: 'offered',
  hospital: 'Sunrise General Hospital',
  ambulance: 'A-402',
  patient: 'Cardiac',
  vitals: {
    heartRate: 112,
    spO2: 92,
    bp: '84/52',
    condition: 'Critical',
  },
  bedStatus: 'provisional',
  assignedBay: 'Bay 04',
  countdownSeconds: 120,
};

const INITIAL_CORRIDOR: CorridorState = {
  status: 'inactive',
  baseEta: 8,
  currentEta: 8,
  timeSaved: 0,
  signalsOnline: 12,
  corridorSignals: 6,
  preemptedSignals: 0,
  crossTrafficHeld: 0,
};

const LifeLaneContext = createContext<LifeLaneContextType | undefined>(undefined);

export function LifeLaneProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('lifelane_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('lifelane_theme', newTheme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('lifelane_active_role');
      if (saved === 'ambulance' || saved === 'hospital') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'ambulance';
  });

  const [activeScreen, setActiveScreen] = useState<ScreenId>(() => {
    // Initial screen matches the initial role's default screen
    try {
      const savedRole = localStorage.getItem('lifelane_active_role') as UserRole | null;
      const initialRole = (savedRole === 'ambulance' || savedRole === 'hospital') ? savedRole : 'ambulance';
      return ROLE_DEFAULT_SCREENS[initialRole];
    } catch {
      return 'home';
    }
  });

  const [beds, setBeds] = useState<BedInventory>(INITIAL_BEDS);
  const [bedsHeldCount, setBedsHeldCount] = useState<number>(1);
  const [updatedMinutesAgo, setUpdatedMinutesAgo] = useState<number>(4);
  const [isJustUpdated, setIsJustUpdated] = useState<boolean>(false);
  const [changeLogs, setChangeLogs] = useState<ChangeLogItem[]>(INITIAL_CHANGE_LOGS);
  const [request, setRequest] = useState<EmergencyRequestState>(INITIAL_REQUEST);
  const [corridor, setCorridor] = useState<CorridorState>(INITIAL_CORRIDOR);

  const navigateToScreen = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.location.hash = screen;
  };

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    try {
      localStorage.setItem('lifelane_active_role', role);
    } catch {
      // ignore
    }
    // If the current screen is not allowed in the new role, redirect to role default
    if (!ROLE_ALLOWED_SCREENS[role].includes(activeScreen)) {
      navigateToScreen(ROLE_DEFAULT_SCREENS[role]);
    }
  };

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Nurse Station bed update
  const updateBed = (key: keyof BedInventory, delta: number, resourceName: ChangeLogItem['resource']) => {
    setBeds((prev) => {
      const nextVal = Math.max(0, prev[key] + delta);
      if (nextVal === prev[key]) return prev;

      const newLog: ChangeLogItem = {
        id: Date.now().toString(),
        resource: resourceName,
        delta: delta,
        time: getCurrentTimeFormatted(),
      };

      setChangeLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 4)]);
      setUpdatedMinutesAgo(0);
      setIsJustUpdated(true);
      setTimeout(() => setIsJustUpdated(false), 800);

      return {
        ...prev,
        [key]: nextVal,
      };
    });
  };

  const confirmAccurate = () => {
    setUpdatedMinutesAgo(0);
    setIsJustUpdated(true);
    setTimeout(() => setIsJustUpdated(false), 800);
  };

  // Dispatch -> Send request
  const sendEmergencyRequest = (
    hospitalName: string = 'Sunrise General Hospital',
    verifiedHandover?: VerifiedEmergencyHandover,
    shouldNavigate: boolean = false
  ) => {
    setRequest((prev) => ({
      ...prev,
      status: 'offered',
      hospital: hospitalName,
      ambulance: 'A-402',
      patient: verifiedHandover?.clinicalHandover.patient || 'Cardiac Patient',
      vitals: {
        heartRate: verifiedHandover?.clinicalHandover.vitals.heartRate ?? prev.vitals.heartRate,
        spO2: verifiedHandover?.clinicalHandover.vitals.spo2 ?? prev.vitals.spO2,
        bp: verifiedHandover?.clinicalHandover.vitals.bloodPressure ?? prev.vitals.bp,
        condition: verifiedHandover?.clinicalHandover.assessment ? 'Evaluated' : prev.vitals.condition,
      },
      bedStatus: 'provisional',
      countdownSeconds: 120,
      handover: verifiedHandover,
    }));
    if (shouldNavigate) {
      navigateToScreen('hospital');
    }
  };

  // Hospital Console -> Accept & Hold
  const acceptRequest = () => {
    setRequest((prev) => ({
      ...prev,
      status: 'accepted',
      bedStatus: 'confirmed',
    }));
    setBedsHeldCount(1);
    // Green Corridor becomes READY, but NOT yet active until Traffic Command deploys it!
    setCorridor((prev) => ({
      ...prev,
      status: 'ready',
    }));
  };

  // Hospital Console -> Reject
  const rejectRequest = () => {
    setRequest((prev) => ({
      ...prev,
      status: 'rejected',
      bedStatus: 'released',
    }));
    setBedsHeldCount(0);
    setCorridor((prev) => ({
      ...prev,
      status: 'inactive',
    }));
  };

  // Traffic Command -> Activate / Deploy Corridor
  const activateCorridor = () => {
    setCorridor({
      status: 'active',
      baseEta: 8,
      currentEta: 6,
      timeSaved: 2,
      signalsOnline: 12,
      corridorSignals: 6,
      preemptedSignals: 4,
      crossTrafficHeld: 2,
    });
  };

  // Traffic Command -> Emergency Stop
  const emergencyStopCorridor = () => {
    setCorridor({
      status: 'inactive',
      baseEta: 8,
      currentEta: 8,
      timeSaved: 0,
      signalsOnline: 12,
      corridorSignals: 6,
      preemptedSignals: 0,
      crossTrafficHeld: 0,
    });
  };

  // Reset entire demo flow
  const resetDemoState = () => {
    setBeds(INITIAL_BEDS);
    setBedsHeldCount(1);
    setUpdatedMinutesAgo(4);
    setIsJustUpdated(false);
    setChangeLogs(INITIAL_CHANGE_LOGS);
    setRequest(INITIAL_REQUEST);
    setCorridor(INITIAL_CORRIDOR);
  };

  return (
    <LifeLaneContext.Provider
      value={{
        theme,
        setTheme,
        activeRole,
        setActiveRole,
        activeScreen,
        navigateToScreen,
        beds,
        bedsHeldCount,
        updatedMinutesAgo,
        isJustUpdated,
        changeLogs,
        updateBed,
        confirmAccurate,
        request,
        sendEmergencyRequest,
        acceptRequest,
        rejectRequest,
        corridor,
        activateCorridor,
        emergencyStopCorridor,
        resetDemoState,
      }}
    >
      {children}
    </LifeLaneContext.Provider>
  );
}

export function useLifeLane() {
  const context = useContext(LifeLaneContext);
  if (!context) {
    throw new Error('useLifeLane must be used within a LifeLaneProvider');
  }
  return context;
}
