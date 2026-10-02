import React from 'react';
import { Ambulance, Building2 } from 'lucide-react';

interface TrafficHeaderProps {
  activeView: 'live' | 'analytics' | 'logs';
  onViewChange: (view: 'live' | 'analytics' | 'logs') => void;
}

export function TrafficHeader({ activeView, onViewChange }: TrafficHeaderProps) {
  return (
    <div className="space-y-5">
      {/* Title & Top 3 Metric Cards */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-4xl sm:text-[44px] font-serif font-normal text-white tracking-tight leading-tight">
            Traffic Command
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8] font-normal flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>Live Grid · Emergency Corridor</span>
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: Active Unit */}
          <div className="rounded-[18px] bg-[#070D15]/85 border border-[#38BDF8]/20 px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-md">
            <div className="w-9 h-9 rounded-xl bg-[#091E2C] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Ambulance className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                ACTIVE UNIT
              </span>
              <span className="text-base font-mono font-bold text-[#38BDF8] block">
                A-402
              </span>
            </div>
          </div>

          {/* Card 2: Destination */}
          <div className="rounded-[18px] bg-[#070D15]/85 border border-[#38BDF8]/20 px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-md">
            <div className="w-9 h-9 rounded-xl bg-[#091E2C] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                DESTINATION
              </span>
              <span className="text-sm font-sans font-bold text-white block">
                Sunrise General
              </span>
            </div>
          </div>

          {/* Card 3: Corridor Active */}
          <div className="rounded-[18px] bg-[#070D15]/85 border border-[#22E06B]/30 px-4 py-3 flex items-center gap-3 backdrop-blur-xl shadow-md">
            <div className="relative flex items-center justify-center w-7 h-7">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22E06B] opacity-40" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#22E06B] shadow-[0_0_12px_#22E06B]" />
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#22E06B] font-bold">
                CORRIDOR ACTIVE
              </span>
              <span className="text-xs font-mono text-slate-300 block">
                A-402 → Sunrise General
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View Tabs: LIVE GRID | ANALYTICS | LOGS */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
        <button
          onClick={() => onViewChange('live')}
          type="button"
          className={`px-5 py-2.5 rounded-t-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
            activeView === 'live'
              ? 'bg-[#0E271B]/90 border-t border-x border-[#22E06B]/40 text-[#22E06B] shadow-[0_-4px_15px_rgba(34,224,107,0.1)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          LIVE GRID
        </button>

        <button
          onClick={() => onViewChange('analytics')}
          type="button"
          className={`px-5 py-2.5 rounded-t-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
            activeView === 'analytics'
              ? 'bg-[#0E271B]/90 border-t border-x border-[#22E06B]/40 text-[#22E06B] shadow-[0_-4px_15px_rgba(34,224,107,0.1)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          ANALYTICS
        </button>

        <button
          onClick={() => onViewChange('logs')}
          type="button"
          className={`px-5 py-2.5 rounded-t-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
            activeView === 'logs'
              ? 'bg-[#0E271B]/90 border-t border-x border-[#22E06B]/40 text-[#22E06B] shadow-[0_-4px_15px_rgba(34,224,107,0.1)]'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          LOGS
        </button>
      </div>
    </div>
  );
}
