import React from 'react';
import { Check, Ambulance } from 'lucide-react';

interface HospitalSideCardsProps {
  requestState: 'pending' | 'accepted' | 'rejected';
}

export function HospitalSideCards({ requestState }: HospitalSideCardsProps) {
  return (
    <div className="space-y-4">
      {/* CARD 1: BED STATUS */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-white">
              BED STATUS
            </h3>
            <p className="text-[11px] text-[#64748B] font-mono mt-0.5">
              Current verified bed availability
            </p>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
        </div>

        {/* Rows */}
        <div className="space-y-3 pt-1">
          {/* ICU */}
          <div className="flex items-center justify-between text-sm py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
              <span className="text-slate-200 font-medium font-sans">ICU</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-semibold text-white">3</span>
              <span className="px-2 py-0.5 rounded-full border border-[#F5A524]/30 bg-[#1A1309] text-[#F5A524] text-[10px] font-mono font-medium">
                1 held
              </span>
            </div>
          </div>

          {/* Ventilator */}
          <div className="flex items-center justify-between text-sm py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
              <span className="text-slate-200 font-medium font-sans">Ventilator</span>
            </div>
            <span className="font-mono text-base font-semibold text-white">2</span>
          </div>

          {/* Oxygen */}
          <div className="flex items-center justify-between text-sm py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
              <span className="text-slate-200 font-medium font-sans">Oxygen</span>
            </div>
            <span className="font-mono text-base font-semibold text-white">8</span>
          </div>

          {/* Cardiac */}
          <div className="flex items-center justify-between text-sm py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
              <span className="text-slate-200 font-medium font-sans">Cardiac</span>
            </div>
            <span className="font-mono text-base font-semibold text-white">1</span>
          </div>

          {/* Burns */}
          <div className="flex items-center justify-between text-sm py-0.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />
              <span className="text-slate-200 font-medium font-sans">Burns</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-base text-slate-500 font-light">0</span>
              <span className="px-2 py-0.5 rounded-full border border-[#FF4D4D]/30 bg-[#250F14] text-[#FF4D4D] text-[10px] font-mono font-medium">
                NONE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: INCOMING ARRIVAL */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-[#38BDF8]/20 p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#38BDF8]">
            INCOMING ARRIVAL
          </span>
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
        </div>

        {/* Content */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0B2135] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <Ambulance className="w-4 h-4" />
              </div>
              <span className="text-lg font-mono font-semibold text-white">
                A-402
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded border border-[#38BDF8]/35 bg-[#0B1E2E] text-[#38BDF8] text-[10px] font-mono font-medium">
              CARDIAC
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 font-mono text-xs">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#64748B] uppercase text-[10px]">ETA</span>
              <span className="text-base text-white font-medium">8 min</span>
            </div>

            <span
              className={`flex items-center gap-1.5 text-xs font-semibold ${
                requestState === 'accepted'
                  ? 'text-[#22E06B]'
                  : requestState === 'rejected'
                  ? 'text-[#FF4D4D]'
                  : 'text-[#F5A524]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  requestState === 'accepted'
                    ? 'bg-[#22E06B]'
                    : requestState === 'rejected'
                    ? 'bg-[#FF4D4D]'
                    : 'bg-[#F5A524]'
                }`}
              />
              <span>
                {requestState === 'accepted'
                  ? 'CONFIRMED'
                  : requestState === 'rejected'
                  ? 'REJECTED'
                  : 'AWAITING RESPONSE'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* CARD 3: BAY READY */}
      <div className="rounded-[22px] bg-[#070D15]/85 border border-[#22E06B]/20 p-5 backdrop-blur-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#22E06B]">
            BAY READY
          </span>
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B]" />
        </div>

        {/* Content */}
        <div className="rounded-xl bg-[#091512]/80 border border-[#22E06B]/25 p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
            <Check className="w-5 h-5" strokeWidth={2.5} />
          </div>

          <div>
            <h4 className="text-sm font-mono font-bold text-[#22E06B] tracking-wide">
              BAY 04 READY
            </h4>
            <p className="text-xs text-[#94A3B8] font-normal mt-0.5">
              ER bay prepared · equipment live
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
