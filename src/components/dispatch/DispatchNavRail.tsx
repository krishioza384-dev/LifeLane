import React from 'react';
import { Radio, GitFork, Truck, UserCheck, ShieldCheck } from 'lucide-react';

interface DispatchNavRailProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DispatchNavRail({ currentTab = 'dispatch', onTabChange }: DispatchNavRailProps) {
  return (
    <aside className="w-[230px] shrink-0 bg-[#070C14]/95 border-r border-white/[0.08] flex flex-col justify-between p-4 min-h-screen text-slate-300 select-none">
      {/* Top Header */}
      <div>
        {/* Brand & Version */}
        <div className="flex items-center justify-between px-2 pt-1 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Medical Star / Cross Icon badge */}
            <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
              <span className="text-lg font-bold leading-none">✱</span>
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white tracking-tight leading-none font-sans">
                LifeLane
              </h2>
              <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
                OPS CORE V2.4
              </span>
            </div>
          </div>
          {/* Subtle live pulse dot */}
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
        </div>

        {/* OPERATIONS Group */}
        <div className="mt-6">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            OPERATIONS
          </span>

          <nav className="space-y-1">
            {/* Dispatch - Active */}
            <button
              onClick={() => onTabChange?.('dispatch')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'dispatch'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white shadow-[0_0_15px_rgba(34,224,107,0.1)]'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Radio className={`w-4 h-4 ${currentTab === 'dispatch' ? 'text-[#22E06B]' : 'text-slate-400'}`} />
                <span>Dispatch</span>
              </div>
              {currentTab === 'dispatch' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
              )}
            </button>

            {/* Routes */}
            <button
              onClick={() => onTabChange?.('routes')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'routes'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GitFork className="w-4 h-4 text-slate-400" />
                <span>Routes</span>
              </div>
            </button>

            {/* Units */}
            <button
              onClick={() => onTabChange?.('units')}
              type="button"
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'units'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-slate-400" />
                <span>Units</span>
              </div>
              <span className="font-mono text-xs text-[#64748B]">12</span>
            </button>
          </nav>
        </div>

        {/* ACCOUNT Group */}
        <div className="mt-8">
          <span className="block px-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2.5">
            ACCOUNT
          </span>

          <nav className="space-y-1">
            <button
              onClick={() => onTabChange?.('profile')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'profile'
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30 text-white'
                  : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Status Card */}
      <div className="rounded-2xl bg-[#09101A]/90 border border-white/[0.08] p-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
          <span className="text-xs font-medium text-white">Network operational</span>
        </div>
        <p className="text-[11px] text-[#64748B] mb-3">
          Realtime state synchronized
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono">
          <span className="text-[#64748B]">LATENCY: 14ms</span>
          <span className="text-[#22E06B] font-semibold">99.98%</span>
        </div>
      </div>
    </aside>
  );
}
