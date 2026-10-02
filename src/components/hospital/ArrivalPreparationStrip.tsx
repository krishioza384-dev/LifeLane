import React from 'react';
import { Check, Users, GitFork, ClipboardCheck } from 'lucide-react';

export function ArrivalPreparationStrip() {
  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
          <ClipboardCheck className="w-4 h-4 text-[#22E06B]" />
          <span>ARRIVAL PREPARATION</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#22E06B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Hospital Readiness Protocol Active</span>
        </div>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Step 01: BAY Ready */}
        <div className="rounded-xl bg-[#09111D]/80 border border-white/[0.06] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] font-mono text-xs font-semibold">
              01
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                BAY
              </span>
              <span className="text-sm font-mono font-bold text-[#22E06B]">
                Ready
              </span>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B]">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </div>

        {/* Step 02: TEAM Standby */}
        <div className="rounded-xl bg-[#09111D]/80 border border-white/[0.06] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] font-mono text-xs font-semibold">
              02
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                TEAM
              </span>
              <span className="text-sm font-mono font-bold text-[#22E06B]">
                Standby
              </span>
            </div>
          </div>

          <Users className="w-5 h-5 text-[#22E06B]" />
        </div>

        {/* Step 03: ROUTE 8 min */}
        <div className="rounded-xl bg-[#09111D]/80 border border-white/[0.06] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0B2135] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] font-mono text-xs font-semibold">
              03
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                ROUTE
              </span>
              <span className="text-sm font-mono font-bold text-[#38BDF8]">
                8 min
              </span>
            </div>
          </div>

          <GitFork className="w-5 h-5 text-[#38BDF8]" />
        </div>
      </div>
    </div>
  );
}
