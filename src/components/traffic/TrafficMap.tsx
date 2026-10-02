import React from 'react';
import { RadioTower, Maximize2 } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';
import { LifeLaneMap } from '../map/LifeLaneMap';

export function TrafficMap() {
  const { corridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  return (
    <div className="rounded-[22px] bg-[#050A10] border border-white/[0.08] relative overflow-hidden shadow-2xl min-h-[580px] h-full flex flex-col justify-between select-none">
      {/* Top Map Badges (Right side, left of controls) */}
      <div className="absolute top-4 right-16 z-20 flex items-center gap-2 pointer-events-none hidden sm:flex">
        <div className="px-3 py-1 rounded-lg border border-white/[0.1] bg-[#07101B]/80 text-[10px] font-mono text-slate-300 tracking-wider backdrop-blur-md">
          SIMULATED TRAFFIC CONTROL
        </div>
      </div>

      {/* Floating Card: CORRIDOR DEPLOYED (Top-Left) */}
      <div className="absolute top-4 left-4 z-20 w-[300px] sm:w-[320px] rounded-2xl bg-[#07141D]/90 border border-[#22E06B]/35 p-4 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(34,224,107,0.12)] pointer-events-none">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-medium mb-3 ${
            isCorridorActive
              ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
              : isCorridorReady
              ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
              : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCorridorActive
                ? 'bg-[#22E06B] shadow-[0_0_6px_#22E06B]'
                : isCorridorReady
                ? 'bg-[#F5A524] shadow-[0_0_6px_#F5A524]'
                : 'bg-slate-500'
            }`}
          />
          <span>{isCorridorActive ? 'CORRIDOR DEPLOYED' : isCorridorReady ? 'CORRIDOR READY' : 'CORRIDOR STANDBY'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight leading-none">
              {corridor.currentEta.toString().padStart(2, '0')} min
            </div>
            <span className="block text-[9px] font-mono uppercase tracking-[0.16em] text-[#64748B] mt-1">
              TIME SAVED
            </span>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#0E2218" strokeWidth="4" />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke={isCorridorActive ? '#22E06B' : '#64748B'}
                strokeWidth="4"
                strokeDasharray="150"
                strokeDashoffset={isCorridorActive ? '45' : '150'}
                strokeLinecap="round"
                style={{ filter: isCorridorActive ? 'drop-shadow(0 0 6px #22E06B)' : undefined }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-xs font-mono font-bold leading-none ${isCorridorActive ? 'text-[#22E06B]' : 'text-slate-400'}`}>
                {corridor.timeSaved} min
              </span>
              <span className="text-[8px] font-mono text-[#64748B] uppercase">saved</span>
            </div>
          </div>
        </div>

        {/* ETA transition pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-300">
          <span className="text-slate-400">8 min</span>
          <span className="text-[#22E06B]">→</span>
          <span className="text-white font-semibold">{corridor.currentEta} min</span>
        </div>

        {/* Route labels */}
        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.06] text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1 text-[#38BDF8]">
            <RadioTower className="w-3.5 h-3.5" />
            <span className="font-semibold">A-402</span>
          </div>
          <span className="text-[#64748B]">→</span>
          <span className="text-white font-medium truncate">
            Sunrise General Hospital
          </span>
        </div>
      </div>

      {/* SVG Canvas Map using LifeLaneMap */}
      <div className="relative w-full h-full min-h-[580px] flex-1 flex flex-col">
        <LifeLaneMap
          mode="traffic"
          selectedHospitalId="sunrise"
          showHospitals={true}
          showSignals={true}
          showControls={true}
          className="flex-1"
        />
      </div>

      {/* Floating Map Legend (Bottom-Right, left of zoom percentage) */}
      <div className="absolute bottom-4 right-20 z-20 rounded-2xl bg-[#07111B]/90 border border-white/[0.1] p-3 backdrop-blur-xl shadow-xl space-y-1.5 pointer-events-none hidden md:block">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span className="w-3.5 h-1 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Green Corridor</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Preempted Signal</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
          <span>Hold (Cross Traffic)</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
          <span>Normal Traffic</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D]" />
          <span>Blocked / Closed</span>
        </div>
      </div>
    </div>
  );
}
