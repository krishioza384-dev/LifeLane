import React from 'react';
import { LayoutDashboard, Radio, PlusSquare, RadioTower, Bell, Sliders, ChevronRight } from 'lucide-react';

interface HomeNavRailProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function HomeNavRail({ currentTab = 'overview', onTabChange }: HomeNavRailProps) {
  return (
    <aside className="w-[230px] shrink-0 bg-[#070C14]/95 border-r border-white/[0.08] flex flex-col justify-between p-4 min-h-screen text-slate-300 select-none">
      {/* Top Header */}
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 pt-1 pb-6 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
            <span className="text-lg font-bold leading-none">✱</span>
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-white tracking-tight leading-none font-sans">
              LifeLane
            </h2>
            <span className="text-[9px] font-mono text-[#22E06B] tracking-wider uppercase font-semibold">
              AUTONOMOUS OS
            </span>
          </div>
        </div>

        {/* TACTICAL OPERATIONS Group */}
        <div className="mt-6">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            TACTICAL OPERATIONS
          </span>

          <nav className="space-y-1">
            {/* Overview - Active */}
            <button
              onClick={() => onTabChange?.('overview')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'overview'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white shadow-[0_0_15px_rgba(34,224,107,0.12)]'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className={`w-4 h-4 ${currentTab === 'overview' ? 'text-[#22E06B]' : 'text-slate-400'}`} />
                <span>Overview</span>
              </div>
            </button>

            {/* Dispatch Units */}
            <button
              onClick={() => onTabChange?.('dispatch')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-slate-400" />
                <span>Dispatch Units</span>
              </div>
            </button>

            {/* Trauma Centers */}
            <button
              onClick={() => onTabChange?.('trauma')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <PlusSquare className="w-4 h-4 text-slate-400" />
                <span>Trauma Centers</span>
              </div>
            </button>

            {/* Signal Grid */}
            <button
              onClick={() => onTabChange?.('signals')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <RadioTower className="w-4 h-4 text-slate-400" />
                <span>Signal Grid</span>
              </div>
            </button>
          </nav>
        </div>

        {/* TELEMETRY NODE Group */}
        <div className="mt-8">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            TELEMETRY NODE
          </span>

          <nav className="space-y-1">
            {/* Incident Feed with amber pip */}
            <button
              onClick={() => onTabChange?.('incident_feed')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Incident Feed</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
            </button>

            {/* Parameters */}
            <button
              onClick={() => onTabChange?.('parameters')}
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Parameters</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Status Card: NODE SYNC 99.98% */}
      <div className="rounded-2xl bg-[#09101A]/90 border border-white/[0.08] p-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>NODE SYNC</span>
          </div>
          <span className="text-[11px] font-mono text-[#22E06B] font-bold">
            99.98%
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px] font-mono text-[#64748B]">
          <span>12/12 Corridors</span>
          <span>Edge: 14ms</span>
        </div>
      </div>
    </aside>
  );
}
