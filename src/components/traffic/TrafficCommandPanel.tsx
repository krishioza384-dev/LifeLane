import React, { useState } from 'react';
import { GitFork, RadioTower, OctagonAlert, ChevronRight, Check, AlertCircle, Play } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

export function TrafficCommandPanel() {
  const { corridor, activateCorridor, emergencyStopCorridor } = useLifeLane();
  const [controlStatus, setControlStatus] = useState<string | null>(null);

  const handlePreemptClick = () => {
    activateCorridor();
    setControlStatus('Green corridor CR-804 engaged. 6 signals preempted.');
    setTimeout(() => setControlStatus(null), 3500);
  };

  const handleStopClick = () => {
    emergencyStopCorridor();
    setControlStatus('EMERGENCY STOP EXECUTED. Signals returned to normal.');
    setTimeout(() => setControlStatus(null), 3500);
  };

  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  return (
    <div className="space-y-4">
      {/* CARD 1: ROUTE STATUS */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              ROUTE STATUS
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* 3 Metric Stats */}
        <div className="grid grid-cols-3 gap-2 text-center py-1">
          <div className="text-left">
            <div className="flex items-center gap-1.5 font-mono text-xl sm:text-2xl font-bold text-white">
              <span className={`w-2 h-2 rounded-full ${isCorridorActive ? 'bg-[#22E06B]' : 'bg-[#F5A524]'}`} />
              <span>8.4</span>
              <span className="text-xs font-normal text-slate-400">km</span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase block mt-0.5">
              Total distance
            </span>
          </div>

          <div>
            <div className="font-mono text-xl sm:text-2xl font-normal text-white">
              {corridor.baseEta} <span className="text-xs text-slate-400">min</span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase block mt-0.5">
              Base ETA
            </span>
          </div>

          <div className="text-right">
            <div className={`font-mono text-xl sm:text-2xl font-bold ${isCorridorActive ? 'text-[#22E06B]' : 'text-slate-300'}`}>
              {corridor.currentEta} <span className="text-xs">min</span>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] uppercase block mt-0.5">
              {isCorridorActive ? 'Corridor ETA (-2m)' : 'Current ETA'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/[0.08] mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCorridorActive
                ? 'bg-[#22E06B] shadow-[0_0_8px_#22E06B] w-3/4'
                : 'bg-[#F5A524] w-1/3'
            }`}
          />
        </div>
      </div>

      {/* CARD 2: SIGNAL STATUS */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <div className="flex items-center gap-2">
            <RadioTower className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              SIGNAL STATUS
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* 12/12 Online & Healthy */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#091522] border border-white/[0.08] flex items-center justify-center text-amber-400">
              <span className="text-lg">🚦</span>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-white leading-none">
                {corridor.signalsOnline} <span className="text-slate-500 font-normal">/</span> {corridor.signalsOnline}
              </div>
              <span className="text-[11px] font-mono text-[#22E06B] font-semibold mt-1 block">
                Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B]">
            <RadioTower className="w-3.5 h-3.5 text-[#22E06B]" />
            <span className="text-xs font-mono font-bold text-[#22E06B]">Healthy</span>
          </div>
        </div>

        {/* 3 Signal Metric Sub-boxes */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/[0.06]">
          {/* Corridor Signals */}
          <div className="rounded-xl bg-[#091522]/80 border border-[#22E06B]/20 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xl font-bold text-[#22E06B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
              <span>{corridor.corridorSignals}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 block mt-1 leading-tight">
              Corridor Signals
            </span>
          </div>

          {/* Preempted */}
          <div className="rounded-xl bg-[#091522]/80 border border-[#38BDF8]/20 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xl font-bold text-[#38BDF8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>{corridor.preemptedSignals}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 block mt-1 leading-tight">
              Preempted
            </span>
          </div>

          {/* Cross Traffic Held */}
          <div className="rounded-xl bg-[#091522]/80 border border-[#F5A524]/20 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5 font-mono text-xl font-bold text-[#F5A524]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
              <span>{corridor.crossTrafficHeld}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 block mt-1 leading-tight">
              Cross Traffic Held
            </span>
          </div>
        </div>
      </div>

      {/* CARD 3: COMMAND CONTROLS */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              COMMAND CONTROLS
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Notification Toast if pressed */}
        {controlStatus && (
          <div className="mb-3 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300">
            {controlStatus}
          </div>
        )}

        {/* If corridor is ready from Hospital Console, show primary deploy CTA */}
        {isCorridorReady && !isCorridorActive && (
          <div className="mb-3">
            <button
              onClick={handlePreemptClick}
              type="button"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,224,107,0.35)] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>ACTIVATE GREEN CORRIDOR NOW</span>
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Force Preempt */}
          <button
            onClick={handlePreemptClick}
            type="button"
            className={`rounded-2xl border p-3 flex flex-col items-center justify-center transition-all cursor-pointer group shadow-md ${
              isCorridorActive
                ? 'border-[#22E06B]/50 bg-[#0E271B] text-[#22E06B]'
                : 'border-[#F5A524]/35 bg-[#201509] hover:bg-[#2A1D0B] text-[#F5A524]'
            }`}
          >
            <div className="flex items-center gap-2 font-mono font-bold text-sm">
              <span>🚦</span>
              <span>{isCorridorActive ? 'Signals Locked' : 'Force Preempt'}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              {isCorridorActive ? 'Corridor Active' : 'Engage wave'}
            </span>
          </button>

          {/* Emergency Stop */}
          <button
            onClick={handleStopClick}
            type="button"
            className="rounded-2xl border border-[#FF4D4D]/35 bg-[#250F14] hover:bg-[#32121A] active:scale-95 p-3 flex flex-col items-center justify-center transition-all cursor-pointer group shadow-md"
          >
            <div className="flex items-center gap-2 text-[#FF4D4D] font-mono font-bold text-sm">
              <OctagonAlert className="w-4 h-4 text-[#FF4D4D]" />
              <span>Emergency Stop</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1">
              Returns signals to normal
            </span>
          </button>
        </div>
      </div>

      {/* CARD 4: ACTIVE CORRIDOR */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-[#22E06B]/20 p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#22E06B]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              CORRIDOR STATUS
            </span>
          </div>

          <span
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-semibold ${
              isCorridorActive
                ? 'border-[#22E06B]/40 bg-[#0E271B] text-[#22E06B]'
                : isCorridorReady
                ? 'border-[#F5A524]/40 bg-[#221609] text-[#F5A524]'
                : 'border-white/[0.1] bg-white/[0.02] text-slate-400'
            }`}
          >
            <span>{isCorridorActive ? 'ACTIVE' : isCorridorReady ? 'READY' : 'INACTIVE'}</span>
            {isCorridorActive && <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] animate-pulse" />}
          </span>
        </div>

        <div className="text-sm font-mono font-medium text-slate-200 mb-4">
          A-402 <span className="text-[#22E06B]">→</span> Sunrise General
        </div>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between text-center pt-2">
          {/* Step 1: Dispatched */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B]">
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1.5">
              Dispatched
            </span>
          </div>

          {/* Connecting line */}
          <div className={`flex-1 h-0.5 mx-1 ${isCorridorReady || isCorridorActive ? 'bg-[#22E06B]' : 'bg-white/10'}`} />

          {/* Step 2: Hospital Accepted */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isCorridorReady || isCorridorActive
                  ? 'bg-[#0E271B] border border-[#22E06B]/40 text-[#22E06B]'
                  : 'bg-white/10 text-slate-500'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1.5">
              Accepted
            </span>
          </div>

          {/* Connecting line */}
          <div className={`flex-1 h-0.5 mx-1 ${isCorridorActive ? 'bg-[#22E06B]' : 'bg-white/10'}`} />

          {/* Step 3: Corridor Active */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCorridorActive
                  ? 'bg-[#22E06B] text-[#051A0E] shadow-[0_0_10px_#22E06B]'
                  : 'bg-white/10 text-slate-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isCorridorActive ? 'bg-[#051A0E]' : 'bg-slate-500'}`} />
            </div>
            <span
              className={`text-[10px] font-mono mt-1.5 font-bold ${
                isCorridorActive ? 'text-[#22E06B]' : 'text-slate-400'
              }`}
            >
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
