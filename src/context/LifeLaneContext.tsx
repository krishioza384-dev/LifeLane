import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScreenId } from '../components/navigation/LifeLaneTopNavbar';

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

export interface LifeLaneContextType {
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
  sendEmergencyRequest: (hospitalName?: string) => void;
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
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
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
  const sendEmergencyRequest = (hospitalName: string = 'Sunrise General Hospital') => {
    setRequest((prev) => ({
      ...prev,
      status: 'offered',
      hospital: hospitalName,
      ambulance: 'A-402',
      patient: 'Cardiac',
      bedStatus: 'provisional',
      countdownSeconds: 120,
    }));
    // Seamlessly navigate to Hospital Console for the next step of the demo
    navigateToScreen('hospital');
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
