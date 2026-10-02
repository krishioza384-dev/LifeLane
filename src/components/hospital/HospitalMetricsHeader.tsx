import React from 'react';

interface HospitalMetricsHeaderProps {
  incomingCount: number;
  bedsHeldCount: number;
  activeCorridorsCount: number;
}

export function HospitalMetricsHeader({
  incomingCount,
  bedsHeldCount,
  activeCorridorsCount,
}: HospitalMetricsHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl sm:text-[44px] font-serif font-normal text-white tracking-tight leading-tight">
            Hospital Console
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8] font-normal">
            Sunrise General Hospital · ER Coordination
          </p>
        </div>

        {/* Right Badge: INCOMING REQUEST 1 active */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#F5A524]/30 bg-[#161208]/80 text-[#F5A524] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
          <span className="font-semibold uppercase tracking-wider">INCOMING REQUEST</span>
          <span className="px-2 py-0.5 rounded bg-[#2A1D0B] border border-[#F5A524]/30 text-[#F5A524] font-semibold text-[11px]">
            {incomingCount} active
          </span>
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: INCOMING */}
        <div className="rounded-[18px] bg-[#070D15]/85 border border-[#F5A524]/25 p-4 flex items-center justify-between backdrop-blur-xl shadow-md">
          <div>
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#F5A524]">
              INCOMING
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5 block">
              High-acuity inbound
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#F5A524]">
              {String(incomingCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] uppercase">UNIT</span>
          </div>
        </div>

        {/* Card 2: BEDS HELD */}
        <div className="rounded-[18px] bg-[#070D15]/85 border border-[#22E06B]/25 p-4 flex items-center justify-between backdrop-blur-xl shadow-md">
          <div>
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#22E06B]">
              BEDS HELD
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5 block">
              Provisional lock
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#22E06B]">
              {String(bedsHeldCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] uppercase">HELD</span>
          </div>
        </div>

        {/* Card 3: ACTIVE CORRIDORS */}
        <div className="rounded-[18px] bg-[#070D15]/85 border border-white/[0.08] p-4 flex items-center justify-between backdrop-blur-xl shadow-md">
          <div>
            <span className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-[#94A3B8]">
              ACTIVE CORRIDORS
            </span>
            <span className="text-xs text-[#64748B] mt-0.5 block">
              Traffic preempt
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-mono font-medium text-slate-500">
              {String(activeCorridorsCount).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono text-[#64748B] uppercase">
              {activeCorridorsCount > 0 ? 'ACTIVE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
