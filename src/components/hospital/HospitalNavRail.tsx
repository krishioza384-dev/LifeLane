import React from 'react';
import { LayoutDashboard, GitFork, Users, Sliders, Activity } from 'lucide-react';

interface HospitalNavRailProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function HospitalNavRail({ currentTab = 'dashboard', onTabChange }: HospitalNavRailProps) {
  return (
    <aside className="w-[230px] shrink-0 bg-[#070C14]/95 border-r border-white/[0.08] flex flex-col justify-between p-4 min-h-screen text-slate-300 select-none">
      {/* Top Header */}
      <div>
        {/* Brand & Emergency */}
        <div className="flex items-center gap-3 px-2 pt-1 pb-6 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
            <span className="text-lg font-bold leading-none">✱</span>
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-white tracking-tight leading-none font-sans">
              LifeLane
            </h2>
            <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
              EMERGENCY
            </span>
          </div>
        </div>

        {/* OPERATIONS Group */}
        <div className="mt-6">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            OPERATIONS
          </span>

          <nav className="space-y-1">
            {/* Dashboard - Active */}
            <button
              onClick={() => onTabChange?.('dashboard')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white shadow-[0_0_15px_rgba(34,224,107,0.1)]'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity className={`w-4 h-4 ${currentTab === 'dashboard' ? 'text-[#22E06B]' : 'text-slate-400'}`} />
                <span>Dashboard</span>
              </div>
            </button>

            {/* Corridors */}
            <button
              onClick={() => onTabChange?.('corridors')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'corridors'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GitFork className="w-4 h-4 text-slate-400" />
                <span>Corridors</span>
              </div>
            </button>

            {/* Patients */}
            <button
              onClick={() => onTabChange?.('patients')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'patients'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Patients</span>
              </div>
            </button>
          </nav>
        </div>

        {/* HOSPITAL Group */}
        <div className="mt-8">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            HOSPITAL
          </span>

          <nav className="space-y-1">
            <button
              onClick={() => onTabChange?.('config')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'config'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Config</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Status Card: Sunrise General Online */}
      <div className="rounded-2xl bg-[#09101A]/90 border border-white/[0.08] p-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-white">Sunrise General</span>
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#22E06B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
          <span>ONLINE</span>
        </div>
        <p className="text-[10px] text-[#64748B] mt-1 font-mono">
          Realtime synchronized
        </p>
      </div>
    </aside>
  );
}
