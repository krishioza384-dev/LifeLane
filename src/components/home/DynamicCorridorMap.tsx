import React from 'react';
import { GitFork, Layers } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';
import { LifeLaneMap } from '../map/LifeLaneMap';

export function DynamicCorridorMap() {
  const { corridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  return (
    <div className="rounded-[22px] bg-[#070D15]/90 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden select-none h-full">
      {/* Top Header of Map Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Dynamic Corridor CR-804
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-medium ${
                  isCorridorActive
                    ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                    : isCorridorReady
                    ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
                    : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
                }`}
              >
                ● {isCorridorActive ? 'GREEN WAVE ACTIVE' : isCorridorReady ? 'CORRIDOR READY' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-normal mt-0.5">
              Multi-phase preemptive timing across 6 key arterial intersections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[10px] font-mono text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>MODE: AUTONOMOUS PRIORITY</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-400 flex items-center gap-1 text-[10px] font-mono">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>ZONE OPS</span>
          </div>
        </div>
      </div>

      {/* Center Interactive Map Container */}
      <div className="relative rounded-xl bg-[#050A10] border border-white/[0.05] overflow-hidden my-3 min-h-[440px] flex-1 flex flex-col">
        {/* Floating Deployed Card (Top-Left) */}
        <div className="absolute top-3 left-3 z-20 w-[240px] rounded-xl bg-[#07131D]/90 border border-[#22E06B]/35 p-3 backdrop-blur-xl shadow-xl pointer-events-none">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-semibold ${
                isCorridorActive
                  ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                  : isCorridorReady
                  ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
                  : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
              }`}
            >
              ● {isCorridorActive ? 'CORRIDOR DEPLOYED' : isCorridorReady ? 'CORRIDOR READY' : 'STANDBY'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">CR-804</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight leading-none">
                {corridor.currentEta.toString().padStart(2, '0')} <span className="text-lg">MIN</span>
              </div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#64748B] mt-0.5 block">
                TIME SAVED
              </span>
            </div>

            {/* Circular Gauge */}
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold ${
                isCorridorActive
                  ? 'border-[#22E06B]/40 bg-[#0E271B] text-[#22E06B] shadow-[0_0_8px_#22E06B]'
                  : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
              }`}
            >
              {isCorridorActive ? `-${corridor.timeSaved}m` : '0m'}
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-300 flex items-center justify-between">
            <span>
              <strong className="text-white">8 min</strong> →{' '}
              <strong className="text-[#22E06B]">{corridor.currentEta} min</strong> ETA
            </span>
            <span className="text-slate-400">Unit A-402</span>
          </div>
        </div>

        {/* Floating Legend (Top-Right, shifted left of controls) */}
        <div className="absolute top-3 right-14 z-20 rounded-xl bg-[#07111B]/90 border border-white/[0.08] p-2.5 backdrop-blur-xl shadow-lg space-y-1.5 text-[10px] font-mono text-slate-300 pointer-events-none hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>Green Corridor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>Preempted Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
            <span>Held Cross-Traffic</span>
          </div>
        </div>

        {/* Unified LifeLaneMap Core Engine */}
        <LifeLaneMap
          mode="overview"
          selectedHospitalId="sunrise"
          showHospitals={true}
          showSignals={true}
          showControls={true}
          className="flex-1"
        />
      </div>

      {/* Bottom Corridor Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span className="text-white font-medium">Corridor CR-804 • A-402 → Sunrise General</span>
          <span className="text-[#64748B] hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">Distance: 8.4 km • 6 Intersections Preempted</span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-[10px] font-mono font-semibold text-[#22E06B] tracking-wider uppercase">
            SIGNALS LOCKED
          </span>
          <div className="px-3 py-1 rounded-md border border-white/[0.1] bg-white/[0.04] text-[10px] font-mono text-slate-300">
            DRAG TO PAN · WHEEL TO ZOOM
          </div>
        </div>
      </div>
    </div>
  );
}
