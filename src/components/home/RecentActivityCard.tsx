import React from 'react';
import { History, ArrowRight } from 'lucide-react';

export function RecentActivityCard() {
  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg select-none flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#201509] border border-[#F5A524]/30 flex items-center justify-center text-[#F5A524]">
              <History className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif font-normal text-white tracking-tight">
              Recent Activity
            </h3>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
            AUTOMATED AUDIT
          </span>
        </div>

        {/* 3 Activity Rows */}
        <div className="space-y-3">
          {/* Row 1: Corridor CR-804 Active */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">10:48</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B] shrink-0" />
                <div>
                  <span className="font-semibold text-white block">
                    Corridor CR-804 Active
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Green corridor engaged for A-402 • 6 signals locked
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-[#22E06B] font-semibold shrink-0">
              En Route
            </span>
          </div>

          {/* Row 2: A-402 Accepted by Trauma Desk */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">10:47</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524] shrink-0" />
                <div>
                  <span className="font-semibold text-white block">
                    A-402 Accepted by Trauma Desk
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Sunrise General confirmed trauma bed & cath labs ready
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              Confirmed
            </span>
          </div>

          {/* Row 3: Bed Capacity Synchronized */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">10:44</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524] shrink-0" />
                <div>
                  <span className="font-semibold text-white block">
                    Bed Capacity Synchronized
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Nurse Station refresh: ICU +1, Oxygen -2 reserves
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              Logged
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Link */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
        <span className="text-[#64748B]">
          LifeLane Tactical Telemetry v4.2
        </span>
        <button
          type="button"
          className="text-[#22E06B] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>View full telemetry archive</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
