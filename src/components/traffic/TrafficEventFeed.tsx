import React from 'react';
import { Activity } from 'lucide-react';

export function TrafficEventFeed() {
  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-4 sm:p-5 backdrop-blur-xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Title */}
        <div className="flex items-center gap-2 shrink-0 md:pr-4 md:border-r border-white/[0.06]">
          <Activity className="w-4 h-4 text-[#38BDF8]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.14em] text-white">
            LIVE EVENT FEED
          </span>
        </div>

        {/* 3 Horizontal Event Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          {/* Event 1 */}
          <div className="rounded-xl bg-[#09121E]/60 border border-white/[0.04] p-2.5 flex items-start gap-2.5">
            <span className="font-mono text-xs text-[#64748B] shrink-0 pt-0.5">
              10:48
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#22E06B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
                <span>Corridor activated</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Green corridor active for A-402
              </p>
            </div>
          </div>

          {/* Event 2 */}
          <div className="rounded-xl bg-[#09121E]/60 border border-white/[0.04] p-2.5 flex items-start gap-2.5">
            <span className="font-mono text-xs text-[#64748B] shrink-0 pt-0.5">
              10:47
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#22E06B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
                <span>4 signals preempted</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Traffic cleared along route
              </p>
            </div>
          </div>

          {/* Event 3 */}
          <div className="rounded-xl bg-[#09121E]/60 border border-white/[0.04] p-2.5 flex items-start gap-2.5">
            <span className="font-mono text-xs text-[#64748B] shrink-0 pt-0.5">
              10:46
            </span>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#22E06B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
                <span>A-402 accepted by Sunrise</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                Hospital confirmed bed availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
