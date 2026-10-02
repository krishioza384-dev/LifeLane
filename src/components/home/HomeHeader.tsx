import React from 'react';
import { Radio, Clock, ShieldCheck } from 'lucide-react';

export function HomeHeader() {
  return (
    <div className="space-y-6 select-none">
      {/* Page Title & System Latency Box */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-5">
        <div>
          {/* Tracking Sub-label */}
          <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#22E06B] font-semibold mb-1.5">
            EMERGENCY CONTROL MATRIX — REALTIME CORRIDOR PREEMPTION
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-[44px] font-serif font-normal text-white tracking-tight leading-tight">
            Good morning, <span className="italic font-normal">Operator</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] font-normal max-w-2xl leading-relaxed">
            Autonomous priority routing engaged across Sector 01. Three high-acuity life corridors operating with sub-6min transfer dynamics.
          </p>
        </div>

        {/* System Latency & Corridor Uptime Card */}
        <div className="rounded-xl bg-[#070D15]/90 border border-white/[0.08] px-4 py-3 flex items-center gap-6 shrink-0 backdrop-blur-xl">
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              SYSTEM LATENCY
            </span>
            <span className="text-sm font-mono font-bold text-white mt-0.5 block">
              12.4 ms avg
            </span>
          </div>

          <div className="w-px h-7 bg-white/[0.08]" />

          <div>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
              CORRIDOR UPTIME
            </span>
            <span className="text-sm font-mono font-bold text-[#22E06B] mt-0.5 block">
              100.0%
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: FLEET READINESS */}
        <div className="rounded-[20px] bg-[#070D15]/85 border border-white/[0.08] hover:border-white/[0.14] p-5 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                FLEET READINESS
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-medium">
                100% Active
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-mono font-normal text-white">
                12
              </span>
              <span className="text-xs font-mono text-[#22E06B] font-medium flex items-center gap-1">
                <span>((•))</span>
                <span>Synced</span>
              </span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
            <span className="text-[#94A3B8]">03 Critical Priority</span>
            <span className="text-[#22E06B] font-semibold">09 Available</span>
          </div>
        </div>

        {/* CARD 2: HOSPITALS SYNCED */}
        <div className="rounded-[20px] bg-[#070D15]/85 border border-white/[0.08] hover:border-white/[0.14] p-5 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                HOSPITALS SYNCED
              </span>
              <span className="px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300 text-[10px] font-mono">
                8 Trauma Bays
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-mono font-normal text-white">
                08
              </span>
              <span className="text-xs font-mono text-[#F5A524] font-medium flex items-center gap-1">
                <span>⊞</span>
                <span>All Online</span>
              </span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
            <span className="text-[#94A3B8]">ICU Buffer: 28 Beds</span>
            <span className="text-[#F5A524] font-semibold">Cath Labs Rdy</span>
          </div>
        </div>

        {/* CARD 3: ACTIVE WAVES */}
        <div className="rounded-[20px] bg-[#070D15]/85 border border-[#22E06B]/25 hover:border-[#22E06B]/40 p-5 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                ACTIVE WAVES
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-semibold">
                3 Locked
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-mono font-normal text-[#22E06B]">
                03
              </span>
              <span className="text-xs font-mono text-[#22E06B] font-semibold flex items-center gap-1">
                <span>🚦</span>
                <span>Green Wave</span>
              </span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
            <span className="text-[#94A3B8]">18 Signals Preempted</span>
            <span className="text-[#22E06B] font-semibold">Zero Halt</span>
          </div>
        </div>

        {/* CARD 4: RESPONSE DELTA */}
        <div className="rounded-[20px] bg-[#070D15]/85 border border-white/[0.08] hover:border-white/[0.14] p-5 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                RESPONSE DELTA
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#06B6D4]/30 bg-[#092126] text-[#06B6D4] text-[10px] font-mono font-semibold">
                -3.8m vs Benchmark
              </span>
            </div>

            {/* Metric Value */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl font-mono font-normal text-white">
                06 <span className="text-xl">MIN</span>
              </span>
              <span className="text-xs font-mono text-[#22E06B] font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#22E06B]" />
                <span>Avg Transfer</span>
              </span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
            <span className="text-[#94A3B8]">Target: &lt; 08:00 min</span>
            <span className="text-[#22E06B] font-semibold">Optimal Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
