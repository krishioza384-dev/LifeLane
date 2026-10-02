import React from 'react';
import { User } from 'lucide-react';

export function TrafficTopBar() {
  return (
    <header className="flex items-center justify-between w-full py-3.5 px-6 border-b border-white/[0.06] bg-[#05080C]/80 backdrop-blur-md select-none">
      {/* Left: Brand + Emergency Network */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight text-white font-sans">
          LifeLane
        </span>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Emergency Network</span>
        </div>
      </div>

      {/* Right: Traffic Command Operator + Hospital + Live + Avatar */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:inline-flex items-center px-3 py-1 rounded-xl border border-white/[0.08] bg-[#09111D]/80 text-xs font-mono text-slate-300 uppercase tracking-wide">
          TRAFFIC COMMAND OPERATOR
        </div>

        <span className="text-xs font-mono text-white font-medium">
          Sunrise General Hospital
        </span>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] font-semibold text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          LIVE
        </span>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_10px_rgba(34,224,107,0.15)]">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
