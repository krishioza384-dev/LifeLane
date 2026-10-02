import React from 'react';
import { PlusCircle, SlidersHorizontal, Clock, Radio, Play } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

interface ActiveOperationsPanelProps {
  onDeployCorridor?: () => void;
}

export function ActiveOperationsPanel({ onDeployCorridor }: ActiveOperationsPanelProps) {
  const { corridor, activateCorridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  const handleDeployClick = () => {
    if (isCorridorReady) {
      activateCorridor();
    }
    onDeployCorridor?.();
  };

  return (
    <div className="rounded-[22px] bg-[#070D15]/90 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl h-full select-none">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
              <Radio className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif font-normal text-white tracking-tight">
              Active Operations
            </h3>
          </div>

          <span className="px-2.5 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-semibold">
            3 IN FLIGHT
          </span>
        </div>

        {/* 3 Operations Cards */}
        <div className="space-y-3.5">
          {/* Card 1: A-402 (Hero Active) */}
          <div className="rounded-xl bg-[#09131F]/90 border border-[#22E06B]/30 p-4 space-y-2.5 backdrop-blur-md shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-mono font-bold text-white tracking-tight">
                  A-402
                </span>
                <span className="px-2 py-0.5 rounded-full border border-[#22E06B]/35 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-semibold">
                  PRIORITY 1
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#22E06B]">
                <Clock className="w-3.5 h-3.5" />
                <span>{corridor.currentEta} min</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                <span className="text-[#FF4D4D] font-medium">Cardiac</span> → Sunrise G...
              </span>
              <span className={isCorridorActive ? 'text-[#22E06B] font-medium' : isCorridorReady ? 'text-[#F5A524] font-medium' : 'text-slate-400'}>
                {isCorridorActive ? 'Corridor Locked' : isCorridorReady ? 'Corridor Ready' : 'Transit Phase'}
              </span>
            </div>

            {/* Glowing Emerald Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCorridorActive
                    ? 'bg-[#22E06B] shadow-[0_0_8px_#22E06B] w-3/4'
                    : 'bg-[#F5A524] w-1/2'
                }`}
              />
            </div>
          </div>

          {/* Card 2: A-417 */}
          <div className="rounded-xl bg-[#09131F]/70 border border-white/[0.06] p-4 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-mono font-bold text-white tracking-tight">
                  A-417
                </span>
                <span className="px-2 py-0.5 rounded-full border border-[#F5A524]/35 bg-[#201509] text-[#F5A524] text-[10px] font-mono font-semibold">
                  PRIORITY 2
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#F5A524]">
                <Clock className="w-3.5 h-3.5" />
                <span>11 min</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                <span className="text-[#F5A524] font-medium">Trauma</span> → Meridian He...
              </span>
              <span className="text-[#64748B]">Transit Phase</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-[#F5A524] w-1/2" />
            </div>
          </div>

          {/* Card 3: A-391 */}
          <div className="rounded-xl bg-[#09131F]/70 border border-white/[0.06] p-4 space-y-2.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-mono font-bold text-white tracking-tight">
                  A-391
                </span>
                <span className="px-2 py-0.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-slate-400 text-[10px] font-mono">
                  PRIORITY 3
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>14 min</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                ICU Transfer → Northgate C...
              </span>
              <span className="text-[#64748B]">Scheduled</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-slate-700 w-1/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="flex items-center gap-3 pt-4 mt-2">
        <button
          onClick={handleDeployClick}
          type="button"
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,224,107,0.3)] transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" strokeWidth={2.5} />
          <span>{isCorridorActive ? 'Corridor Active (6 min)' : isCorridorReady ? 'Deploy Green Corridor' : 'Deploy Corridor'}</span>
        </button>

        <button
          type="button"
          aria-label="Filter operations"
          className="w-11 h-11 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 text-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
