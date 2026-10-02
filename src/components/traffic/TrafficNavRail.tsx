import React from 'react';
import { Radio, GitFork, Truck, Bell, Settings, RadioTower, ChevronRight } from 'lucide-react';

interface TrafficNavRailProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function TrafficNavRail({ currentTab = 'command', onTabChange }: TrafficNavRailProps) {
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
          </div>
        </div>

        {/* COMMAND Group */}
        <div className="mt-6">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            COMMAND
          </span>

          <nav className="space-y-1">
            {/* Command - Active */}
            <button
              onClick={() => onTabChange?.('command')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'command'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white shadow-[0_0_15px_rgba(34,224,107,0.12)]'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Radio className={`w-4 h-4 ${currentTab === 'command' ? 'text-[#22E06B]' : 'text-slate-400'}`} />
                <span>Command</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#22E06B]" />
            </button>

            {/* Routes */}
            <button
              onClick={() => onTabChange?.('routes')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <GitFork className="w-4 h-4 text-slate-400" />
                <span>Routes</span>
              </div>
            </button>

            {/* Fleet */}
            <button
              onClick={() => onTabChange?.('fleet')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-slate-400" />
                <span>Fleet</span>
              </div>
            </button>

            {/* Alerts with amber badge */}
            <button
              onClick={() => onTabChange?.('alerts')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Alerts</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
            </button>
          </nav>
        </div>

        {/* SYSTEM Group */}
        <div className="mt-8">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            SYSTEM
          </span>

          <nav className="space-y-1">
            <button
              onClick={() => onTabChange?.('config')}
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-white/[0.04] text-slate-400 hover:text-slate-200 transition-all"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Config</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Status Card: SIGNAL HEALTH */}
      <div className="rounded-2xl bg-[#09101A]/90 border border-white/[0.08] p-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
            SIGNAL HEALTH
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#22E06B]" />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
            <RadioTower className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-mono font-bold text-[#22E06B] block leading-tight">
              Healthy
            </span>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
              12 / 12 signals online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
