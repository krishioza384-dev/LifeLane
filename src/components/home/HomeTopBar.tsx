import React from 'react';
import { User } from 'lucide-react';

export function HomeTopBar() {
  return (
    <header className="flex items-center justify-between w-full py-3.5 px-6 border-b border-white/[0.06] bg-[#05080C]/80 backdrop-blur-md select-none">
      {/* Left: AUTONOMOUS GRID + Sector Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
          <span>AUTONOMOUS GRID</span>
        </div>

        <span className="text-[#64748B] text-xs">•</span>

        <div className="hidden sm:inline-flex items-center px-3 py-1 rounded-md border border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-slate-300">
          SECTOR 01 ALPHA • METRO CENTRAL
        </div>
      </div>

      {/* Right: Telemetry Optimal | Live Feed | Profile */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[11px] font-mono font-semibold text-[#22E06B] shadow-[0_0_10px_rgba(34,224,107,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>TELEMETRY OPTIMAL</span>
        </div>

        <div className="w-px h-3.5 bg-white/10 hidden sm:block" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FF4D4D]/30 bg-[#250F14] text-[11px] font-mono font-semibold text-[#FF4D4D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D] shadow-[0_0_6px_#FF4D4D]" />
          <span>LIVE FEED</span>
        </div>

        {/* User avatar button */}
        <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_10px_rgba(34,224,107,0.2)]">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
