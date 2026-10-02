import React from 'react';
import { Route, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function TrafficAnalyticsView() {
  return (
    <div className="space-y-6">
      {/* 4 Large Visual Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: REROUTES */}
        <div className="rounded-[22px] bg-[#070D15]/85 border border-[#38BDF8]/20 p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#38BDF8]">
              REROUTES
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#091E2C] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Route className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-mono font-bold text-white tracking-tight">
            03
          </div>
          <span className="text-xs text-[#94A3B8] font-mono mt-2 block">
            Automatic corridor preempts
          </span>
        </div>

        {/* Metric 2: MINUTES SAVED */}
        <div className="rounded-[22px] bg-[#070D15]/85 border border-[#22E06B]/25 p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#22E06B]">
              MINUTES SAVED
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-mono font-bold text-[#22E06B] tracking-tight">
            12
          </div>
          <span className="text-xs text-[#94A3B8] font-mono mt-2 block">
            Cumulative across active units
          </span>
        </div>

        {/* Metric 3: STALE LISTINGS CAUGHT */}
        <div className="rounded-[22px] bg-[#070D15]/85 border border-[#F5A524]/20 p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#F5A524]">
              STALE LISTINGS CAUGHT
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#221609] border border-[#F5A524]/30 flex items-center justify-center text-[#F5A524]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-mono font-bold text-white tracking-tight">
            04
          </div>
          <span className="text-xs text-[#94A3B8] font-mono mt-2 block">
            Prevented ambulance misdirection
          </span>
        </div>

        {/* Metric 4: OFFER OUTCOMES */}
        <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              OFFER OUTCOMES
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E1724] border border-white/10 flex items-center justify-center text-[#22E06B]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-5xl font-mono font-bold text-white tracking-tight">
            8 <span className="text-3xl text-slate-500 font-normal">/</span> 2
          </div>
          <span className="text-xs text-[#94A3B8] font-mono mt-2 block">
            Accepted vs declined offers
          </span>
        </div>
      </div>

      {/* Summary Operational Performance Chart / Visual Glass Panel */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-6 backdrop-blur-xl shadow-lg">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-4">
          CORRIDOR PERFORMANCE LOG & TIME RECOVERY
        </h3>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Station Rd → Sunrise General (A-402)</span>
              <span className="text-[#22E06B] font-semibold">2 min saved (-25%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-[#22E06B] w-3/4 shadow-[0_0_8px_#22E06B]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Harbor Expressway → Meridian Heart (B-108)</span>
              <span className="text-[#22E06B] font-semibold">4 min saved (-33%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-[#22E06B] w-2/3 shadow-[0_0_8px_#22E06B]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Central Ave → Northgate Trauma (C-204)</span>
              <span className="text-[#22E06B] font-semibold">6 min saved (-40%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full rounded-full bg-[#22E06B] w-3/5 shadow-[0_0_8px_#22E06B]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
