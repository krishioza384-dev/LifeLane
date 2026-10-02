import React from 'react';
import { User, Activity } from 'lucide-react';

export function HospitalTopBar() {
  return (
    <header className="flex items-center justify-between w-full py-3.5 px-6 border-b border-white/[0.06] bg-[#05080C]/80 backdrop-blur-md select-none">
      {/* Left: Brand + Emergency Network */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight text-white font-sans">
          LifeLane
        </span>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[11px] font-mono text-[#22E06B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Emergency Network</span>
        </div>
      </div>

      {/* Right: ER Coordinator + Hospital + Live + Avatar */}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-[#09111D]/80 backdrop-blur-md text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">🏥</span>
            <span>ER COORDINATOR</span>
          </div>

          <div className="w-px h-3.5 bg-white/10" />

          <span className="text-white font-medium">Sunrise General Hospital</span>

          <div className="w-px h-3.5 bg-white/10" />

          <span className="flex items-center gap-1 text-[#22E06B] font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            LIVE
          </span>
        </div>

        {/* Emerald user avatar badge */}
        <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_10px_rgba(34,224,107,0.2)]">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
