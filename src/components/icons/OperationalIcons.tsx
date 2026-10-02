import React from 'react';

export function HospitalBedIcon({ className = "w-6 h-6", color = "#22E06B" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Headboard */}
      <path d="M2 4v14" />
      {/* Footboard */}
      <path d="M22 8v10" />
      {/* Mattress / Frame */}
      <path d="M2 14h20" />
      {/* Elevated upper body / backrest */}
      <path d="M2 14l5-4h4l3 4" />
      {/* Pillow */}
      <circle cx="6" cy="9" r="1.5" fill={color} fillOpacity="0.35" />
      {/* Wheels */}
      <circle cx="4" cy="18" r="1" fill={color} />
      <circle cx="20" cy="18" r="1" fill={color} />
    </svg>
  );
}

export function LungsIcon({ className = "w-6 h-6", color = "#38BDF8" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Trachea */}
      <path d="M12 2v6" />
      {/* Bronchi split */}
      <path d="M12 8c-2 1-3.5 2-4 4" />
      <path d="M12 8c2 1 3.5 2 4 4" />
      {/* Left lung */}
      <path d="M8 12c-2.8 0-4.5 2.2-4.5 5.5 0 2.8 1.8 4.5 4.5 4.5 2 0 3-1.5 3.5-3.5l.5-4.5" fill={color} fillOpacity="0.15" />
      {/* Right lung */}
      <path d="M16 12c2.8 0 4.5 2.2 4.5 5.5 0 2.8-1.8 4.5-4.5 4.5-2 0-3-1.5-3.5-3.5l-.5-4.5" fill={color} fillOpacity="0.15" />
    </svg>
  );
}

export function OxygenTankIcon({ className = "w-6 h-6", color = "#06B6D4" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Tank Valve / Nozzle */}
      <path d="M11 2h2" />
      <path d="M12 2v3" />
      <path d="M9 5h6" />
      {/* Cylinder body */}
      <rect x="7" y="7" width="10" height="14" rx="4" fill={color} fillOpacity="0.15" />
      {/* Pressure gauge */}
      <circle cx="12" cy="11" r="1.5" strokeWidth="1.2" />
      {/* O2 symbol line */}
      <path d="M10 15.5h4" strokeWidth="1.4" />
      <path d="M11 17.5h2" strokeWidth="1.4" />
    </svg>
  );
}

export function CardiacPulseIcon({ className = "w-6 h-6", color = "#C084FC" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Heart outline */}
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} fillOpacity="0.12" />
      {/* ECG Pulse waveform crossing the heart */}
      <path d="M3.5 11.5h3.2l1.6-3.2 2.4 6.8 2-4.6 1.4 2.2h4.4" strokeWidth="2" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BurnsFlameIcon({ className = "w-6 h-6", color = "#FF4D4D" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Flame body */}
      <path
        d="M8.5 14.5A3.5 3.5 0 0 0 12 18a3.5 3.5 0 0 0 3.5-3.5c0-1.8-1.2-3.2-2.3-4.5-.8-1-1.2-2.2-1.2-3.5 0 0-3.5 2.5-3.5 8z"
        fill={color}
        fillOpacity="0.25"
      />
      <path
        d="M12 2c1 3 4 5 4 9a6 6 0 1 1-12 0c0-4 3.5-6.5 4.5-9 1 2 2.5 3.5 3.5 0z"
        stroke={color}
      />
    </svg>
  );
}
