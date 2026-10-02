import React from 'react';
import { Activity, Check } from 'lucide-react';

export function NetworkHealthCard() {
  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg select-none flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif font-normal text-white tracking-tight">
              Network Health
            </h3>
          </div>

          <span className="px-2.5 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-semibold">
            AUTONOMOUS ENGINE 4.2
          </span>
        </div>

        {/* 3 Metric Sub-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Traffic Signals */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              TRAFFIC SIGNALS
            </span>
            <div className="font-mono text-2xl font-bold text-[#22E06B] mt-1">
              12 <span className="text-slate-500 font-normal">/</span> 12
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              100% Online
            </span>
          </div>

          {/* Trauma Centers */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              TRAUMA CENTERS
            </span>
            <div className="font-mono text-2xl font-bold text-[#22E06B] mt-1">
              08 <span className="text-slate-500 font-normal">/</span> 08
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
              Telemetry Synced
            </span>
          </div>

          {/* Active Units */}
          <div className="rounded-xl bg-[#09121D]/80 border border-white/[0.06] p-3 text-center">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              ACTIVE UNITS
            </span>
            <div className="font-mono text-2xl font-bold text-white mt-1">
              14
            </div>
            <span className="text-[10px] font-mono text-[#F5A524] font-medium mt-0.5 block">
              3 On High Alert
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Edge Latency: <strong className="text-white">14ms</strong></span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300">
          <Check className="w-3.5 h-3.5 text-[#22E06B]" strokeWidth={2.5} />
          <span>System Uptime: <strong className="text-[#22E06B]">99.98%</strong></span>
        </div>
      </div>
    </div>
  );
}
