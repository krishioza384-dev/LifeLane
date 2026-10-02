import React from 'react';

export function DispatchTopBar() {
  return (
    <header className="flex items-center justify-between w-full py-3.5 px-6 border-b border-white/[0.06] bg-[#05080C]/80 backdrop-blur-md">
      {/* Left: Brand + Network + Controller Ready */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-tight text-white font-sans">
          LifeLane
        </span>

        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span className="tracking-wider uppercase">EMERGENCY NETWORK</span>
        </div>

        <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-slate-400">
          DISPATCH CONTROLLER READY
        </div>
      </div>

      {/* Right: Unit & Live Status */}
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.1] bg-[#09111D]/80 backdrop-blur-md text-xs font-mono">
        <span className="text-slate-300">
          AMBULANCE DISPATCH <span className="text-[#64748B]">/</span> <strong className="text-white font-semibold">UNIT A-402</strong>
        </span>

        <span className="flex items-center gap-1.5 text-[#22E06B] font-semibold text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
          LIVE
        </span>
      </div>
    </header>
  );
}
