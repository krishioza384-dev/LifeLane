import React from 'react';

export function NurseHeader() {
  return (
    <header className="flex items-center justify-between w-full pt-2 pb-6">
      {/* Brand wordmark with leading glowing emerald dot */}
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22E06B] opacity-50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22E06B] shadow-[0_0_10px_#22E06B]" />
        </span>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white font-sans">
          LifeLane
        </h1>
      </div>

      {/* Role Pill - clean amber outlined pill without avatar */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#F5A524]/40 bg-[#161208]/50 backdrop-blur-md">
        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#F5A524] uppercase font-mono">
          NURSE STATION
        </span>
      </div>
    </header>
  );
}
