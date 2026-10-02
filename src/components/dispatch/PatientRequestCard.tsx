import React, { useState } from 'react';
import { Heart, MapPin, Plus, Check } from 'lucide-react';

interface PatientRequestCardProps {
  onAddBedType?: () => void;
}

export function PatientRequestCard({ onAddBedType }: PatientRequestCardProps) {
  const [bedsRequired, setBedsRequired] = useState([
    { id: 'icu', name: 'ICU', suggested: true },
    { id: 'cardiac', name: 'Cardiac', suggested: true },
    { id: 'oxygen', name: 'Oxygen', suggested: true },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const toggleBed = (id: string) => {
    setBedsRequired((prev) =>
      prev.some((b) => b.id === id)
        ? prev.filter((b) => b.id !== id)
        : [...prev, { id, name: id.toUpperCase(), suggested: false }]
    );
  };

  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-lg h-full">
      <div className="space-y-5">
        {/* Header: PATIENT REQUEST + Status badges */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
            PATIENT REQUEST
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E2419] text-[#22E06B] text-[10px] font-mono font-medium">
              CARDIAC
            </span>
            <span className="px-2 py-0.5 rounded border border-[#FF4D4D]/30 bg-[#281116] text-[#FF4D4D] text-[10px] font-mono font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#FF4D4D]" />
              CRITICAL
            </span>
          </div>
        </div>

        {/* Section 1: LIVE TELEMETRY */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
              LIVE TELEMETRY
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#22E06B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
              STREAMING
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Heart Rate Box */}
            <div className="rounded-xl bg-[#09111C]/80 border border-white/[0.06] p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
                  HEART RATE
                </span>
                <Heart className="w-3.5 h-3.5 text-[#FF4D4D]" strokeWidth={2.2} />
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-normal text-white">112</span>
                <span className="text-xs font-mono text-[#64748B]">bpm</span>
              </div>
            </div>

            {/* SpO2 Box */}
            <div className="rounded-xl bg-[#09111C]/80 border border-white/[0.06] p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#64748B] tracking-wider uppercase">
                  SPO2
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#F5A524]/15 border border-[#F5A524]/30 text-[#F5A524] text-[9px] font-mono font-semibold">
                  LOW
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-mono font-normal text-white">92</span>
                <span className="text-xs font-mono text-[#64748B]">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: PICKUP LOCATION */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
              PICKUP LOCATION
            </span>
            <span className="text-[10px] font-mono text-[#22E06B] font-semibold">
              UNIT A-402
            </span>
          </div>

          <div className="rounded-xl bg-[#09111C]/80 border border-white/[0.06] px-3.5 py-2.5 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#7DD3FC] shrink-0" />
            <span className="text-sm font-medium text-white tracking-wide">
              Station Road junction
            </span>
          </div>
        </div>

        {/* Section 3: REQUIRED BEDS */}
        <div>
          <span className="block text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-2.5">
            REQUIRED BEDS
          </span>

          <div className="flex flex-wrap gap-2 items-center">
            {bedsRequired.map((bed) => (
              <div
                key={bed.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/[0.1] bg-[#0E1522]/90 text-xs font-mono"
              >
                <span className="text-white font-medium">{bed.name}</span>
                {bed.suggested && (
                  <span className="text-[9px] text-[#64748B] uppercase tracking-wider">
                    SUGGESTED
                  </span>
                )}
              </div>
            ))}

            {/* + Add button */}
            <button
              onClick={() => {
                if (bedsRequired.length < 5) {
                  toggleBed('burns');
                }
              }}
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-dashed border-white/[0.15] hover:border-white/30 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>

          <p className="text-[11px] text-[#64748B] mt-2.5 leading-relaxed font-normal">
            Suggested from emergency type and vitals. Edit if needed.
          </p>
        </div>
      </div>

      {/* Section 4: Bottom status box */}
      <div className="mt-6 rounded-xl bg-[#09121E]/90 border border-white/[0.08] px-3.5 py-2.5 flex items-center justify-between">
        <span className="text-xs text-slate-300 font-mono">
          <strong className="text-white">{bedsRequired.length} bed types</strong> required
        </span>
        <span className="text-[11px] font-mono font-semibold text-[#22E06B] tracking-wider uppercase">
          READY TO RANK
        </span>
      </div>
    </div>
  );
}
