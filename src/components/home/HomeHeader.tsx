import React from 'react';
import { useLifeLane } from '../../context/LifeLaneContext';

export function HomeHeader() {
  const { beds, bedsHeldCount } = useLifeLane();

  return (
    <div className="space-y-5 select-none">
      {/* Page Title */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
        <div>
          {/* Tracking Sub-label */}
          <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#22E06B] font-semibold mb-1.5">
            EMERGENCY OPERATIONS · AMBULANCE UNIT A-402
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-[44px] font-serif font-normal text-white tracking-tight leading-tight">
            Good morning, <span className="italic font-normal">Operator</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] font-normal max-w-2xl leading-relaxed">
            Active emergency response in Sector 01. Destination hospital readiness and corridor routing active.
          </p>
        </div>
      </div>

      {/* HOSPITALS SYNCED: Real Hospital Inventory for Sunrise General */}
      <div className="rounded-[20px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              HOSPITALS SYNCED · SUNRISE GENERAL HOSPITAL
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-medium self-start sm:self-auto">
            Live Inventory Synced
          </span>
        </div>

        {/* Real Bed Inventory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {/* ICU */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              ICU
            </span>
            <div className="font-mono text-2xl font-bold text-white mt-1">
              {beds.icu} <span className="text-xs font-normal text-[#22E06B]">avail</span>
            </div>
            <span className="text-[10px] font-mono text-[#F5A524] mt-0.5 block">
              {bedsHeldCount} held
            </span>
          </div>

          {/* Ventilator */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              VENTILATOR
            </span>
            <div className="font-mono text-2xl font-bold text-white mt-1">
              {beds.ventilator}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              Available
            </span>
          </div>

          {/* Oxygen */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              OXYGEN
            </span>
            <div className="font-mono text-2xl font-bold text-white mt-1">
              {beds.oxygen}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              Available
            </span>
          </div>

          {/* Cardiac */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              CARDIAC
            </span>
            <div className="font-mono text-2xl font-bold text-[#38BDF8] mt-1">
              {beds.cardiac}
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              Available
            </span>
          </div>

          {/* Burns */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              BURNS
            </span>
            <div className="font-mono text-2xl font-bold text-slate-400 mt-1">
              {beds.burns}
            </div>
            <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
              Full
            </span>
          </div>

          {/* Readiness Status */}
          <div className="rounded-xl bg-[#09121D]/80 border border-[#22E06B]/20 p-3 text-center flex flex-col justify-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              TRAUMA STATUS
            </span>
            <span className="text-xs font-mono font-semibold text-[#22E06B] mt-1 block">
              READY FOR A-402
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              Cath Labs Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
