import React, { useState } from 'react';
import { SlidersHorizontal, ArrowRight, Check } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

interface HospitalRankingCardProps {
  selectedHospitalId: string;
  onSelectHospital: (id: string) => void;
  onRequestSent: (hospitalName: string) => void;
}

export function HospitalRankingCard({
  selectedHospitalId,
  onSelectHospital,
  onRequestSent,
}: HospitalRankingCardProps) {
  const { beds, bedsHeldCount, updatedMinutesAgo, sendEmergencyRequest } = useLifeLane();
  const [requestedId, setRequestedId] = useState<string | null>(null);

  const handleSendRequest = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setRequestedId(id);
    onRequestSent(name);
    setTimeout(() => {
      setRequestedId(null);
      sendEmergencyRequest(name);
    }, 400);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-white/90">
            RANKED HOSPITALS
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            4 hospitals evaluated
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
          <span>Corridor weighted</span>
        </div>
      </div>

      {/* Hospital List */}
      <div className="space-y-3.5">
        {/* CARD 01: SUNRISE GENERAL HOSPITAL */}
        <div
          onClick={() => onSelectHospital('sunrise')}
          className={`rounded-[22px] bg-[#070D15]/90 border p-5 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer ${
            selectedHospitalId === 'sunrise'
              ? 'border-[#22E06B]/40 shadow-[0_0_20px_rgba(34,224,107,0.08)]'
              : 'border-white/[0.08] hover:border-[#22E06B]/40 hover:shadow-[0_0_20px_rgba(34,224,107,0.08)]'
          }`}
        >
          {/* Top Row: Rank & Name & Travel Time */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#64748B]">01</span>
                <h3 className="text-xl font-normal text-white font-sans tracking-tight">
                  Sunrise General Hospital
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-normal leading-relaxed">
                Closest full match, fresh data, strong acceptance record.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-3xl font-mono font-normal text-white tracking-tight leading-none">
                8 <span className="text-xl">min</span>
              </div>
              <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full bg-[#0E271B] border border-[#22E06B]/30 text-[#22E06B] text-[11px] font-mono">
                6 min with corridor
              </div>
            </div>
          </div>

          {/* Middle Box: AVAILABILITY ARITHMETIC */}
          <div className="rounded-xl bg-[#060B12]/80 border border-white/[0.06] p-3.5 my-3.5 space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
              AVAILABILITY ARITHMETIC
            </span>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>ICU: {beds.icu} reported - {bedsHeldCount} held - 0 pending =</span>
                <span className="text-[#22E06B] font-medium">{Math.max(0, beds.icu - bedsHeldCount)} effective</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Cardiac: {beds.cardiac} reported =</span>
                <span className="text-[#22E06B] font-medium">{beds.cardiac} effective</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Oxygen: {beds.oxygen} reported =</span>
                <span className="text-[#22E06B] font-medium">{beds.oxygen} effective</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Trust evidence & Action button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#22E06B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
                <span>Fresh · Updated {updatedMinutesAgo} min ago</span>
              </div>
              <span className="block text-xs text-[#94A3B8] font-mono mt-0.5">
                Accepted 8 of last 10 offers
              </span>
            </div>

            <button
              onClick={(e) => handleSendRequest(e, 'sunrise', 'Sunrise General Hospital')}
              type="button"
              className={`py-2.5 px-5 rounded-xl border font-semibold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                requestedId === 'sunrise'
                  ? 'bg-[#0E271B] border-[#22E06B]/50 text-[#22E06B]'
                  : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-[#22E06B] hover:text-[#051A0E] hover:border-[#22E06B] hover:shadow-[0_0_15px_rgba(34,224,107,0.3)] active:scale-95'
              }`}
            >
              {requestedId === 'sunrise' ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Request Sent</span>
                </>
              ) : (
                <>
                  <span>Send request</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* CARD 02: MERIDIAN HEART INSTITUTE */}
        <div
          onClick={() => onSelectHospital('meridian')}
          className={`rounded-[22px] bg-[#070D15]/90 border p-5 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer ${
            selectedHospitalId === 'meridian'
              ? 'border-[#22E06B]/40 shadow-[0_0_20px_rgba(34,224,107,0.08)]'
              : 'border-white/[0.08] hover:border-[#22E06B]/40 hover:shadow-[0_0_20px_rgba(34,224,107,0.08)]'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#64748B]">02</span>
                <h3 className="text-xl font-normal text-white font-sans tracking-tight">
                  Meridian Heart Institute
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                Cardiac specialty, slightly farther.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-2xl font-mono font-normal text-white tracking-tight leading-none">
                11 <span className="text-lg">min</span>
              </div>
            </div>
          </div>

          {/* Middle Box */}
          <div className="rounded-xl bg-[#060B12]/80 border border-white/[0.06] p-3.5 my-3.5 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span>ICU: 1 =</span>
              <span className="text-[#22E06B] font-medium">1 effective</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Cardiac: 2 reported - 0 held - 1 pending =</span>
                <span className="px-1.5 py-0.2 rounded bg-[#241709] border border-[#F5A524]/40 text-[#F5A524] text-[10px] font-mono">
                  1 pending offer
                </span>
              </div>
              <span className="text-[#22E06B] font-medium">1 effective</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Oxygen: 4 =</span>
              <span className="text-[#22E06B] font-medium">4 effective</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#22E06B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
                <span>Fresh · Updated 9 min ago</span>
              </div>
              <span className="block text-xs text-[#94A3B8] font-mono mt-0.5">
                Accepted 9 of last 10 offers
              </span>
            </div>

            <button
              onClick={(e) => handleSendRequest(e, 'meridian', 'Meridian Heart Institute')}
              type="button"
              className={`py-2.5 px-5 rounded-xl border font-semibold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                requestedId === 'meridian'
                  ? 'bg-[#0E271B] border-[#22E06B]/50 text-[#22E06B]'
                  : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-[#22E06B] hover:text-[#051A0E] hover:border-[#22E06B] hover:shadow-[0_0_15px_rgba(34,224,107,0.3)] active:scale-95'
              }`}
            >
              {requestedId === 'meridian' ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Request Sent</span>
                </>
              ) : (
                <>
                  <span>Send request</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* CARD 03: RIVERSIDE MEDICAL CENTRE */}
        <div
          onClick={() => onSelectHospital('riverside')}
          className={`rounded-[22px] bg-[#070D15]/90 border p-5 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer ${
            selectedHospitalId === 'riverside'
              ? 'border-[#22E06B]/40 shadow-[0_0_20px_rgba(34,224,107,0.08)]'
              : 'border-white/[0.08] hover:border-[#22E06B]/40 hover:shadow-[0_0_20px_rgba(34,224,107,0.08)]'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#64748B]">03</span>
                <h3 className="text-xl font-normal text-white font-sans tracking-tight">
                  Riverside Medical Centre
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                Closest hospital, but ranked lower because its data is 38 minutes old.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-2xl font-mono font-normal text-white tracking-tight leading-none">
                6 <span className="text-lg">min</span>
              </div>
            </div>
          </div>

          {/* Middle Box */}
          <div className="rounded-xl bg-[#060B12]/80 border border-white/[0.06] p-3.5 my-3.5 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span>ICU: 2 reported</span>
              <span className="text-[#FF4D4D] font-medium">(unverified)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Cardiac: 1 reported</span>
              <span className="text-[#FF4D4D] font-medium">(unverified)</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF4D4D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />
                <span>STALE · Updated 38 min ago</span>
              </div>
              <span className="block text-xs text-[#94A3B8] font-mono mt-0.5">
                Accepted 5 of last 10 offers
              </span>
            </div>

            <button
              onClick={(e) => handleSendRequest(e, 'riverside', 'Riverside Medical Centre')}
              type="button"
              className={`py-2.5 px-5 rounded-xl border font-semibold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                requestedId === 'riverside'
                  ? 'bg-[#0E271B] border-[#22E06B]/50 text-[#22E06B]'
                  : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-[#22E06B] hover:text-[#051A0E] hover:border-[#22E06B] hover:shadow-[0_0_15px_rgba(34,224,107,0.3)] active:scale-95'
              }`}
            >
              {requestedId === 'riverside' ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Request Sent</span>
                </>
              ) : (
                <>
                  <span>Send request</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* CARD 04: NORTHGATE COMMUNITY HOSPITAL */}
        <div
          onClick={() => onSelectHospital('northgate')}
          className={`rounded-[22px] bg-[#070D15]/90 border p-5 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer ${
            selectedHospitalId === 'northgate'
              ? 'border-[#22E06B]/40 shadow-[0_0_20px_rgba(34,224,107,0.08)]'
              : 'border-white/[0.08] hover:border-[#22E06B]/40 hover:shadow-[0_0_20px_rgba(34,224,107,0.08)]'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-[#64748B]">04</span>
                <h3 className="text-xl font-normal text-white font-sans tracking-tight">
                  Northgate Community Hospital
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                Partial match: no cardiac bed free.
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-2xl font-mono font-normal text-white tracking-tight leading-none">
                14 <span className="text-lg">min</span>
              </div>
            </div>
          </div>

          {/* Middle Box */}
          <div className="rounded-xl bg-[#060B12]/80 border border-white/[0.06] p-3.5 my-3.5 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span>ICU: 1 =</span>
              <span className="text-[#22E06B] font-medium">1 effective</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Cardiac: 0 -</span>
              <span className="text-[#FF4D4D] font-medium">none free</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Oxygen: 6 =</span>
              <span className="text-[#22E06B] font-medium">6 effective</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#F5A524]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
                <span>AGEING · Updated 22 min ago</span>
              </div>
              <span className="block text-xs text-[#94A3B8] font-mono mt-0.5">
                Accepted 7 of last 10 offers
              </span>
            </div>

            <button
              onClick={(e) => handleSendRequest(e, 'northgate', 'Northgate Community Hospital')}
              type="button"
              className={`py-2.5 px-5 rounded-xl border font-semibold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                requestedId === 'northgate'
                  ? 'bg-[#0E271B] border-[#22E06B]/50 text-[#22E06B]'
                  : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-[#22E06B] hover:text-[#051A0E] hover:border-[#22E06B] hover:shadow-[0_0_15px_rgba(34,224,107,0.3)] active:scale-95'
              }`}
            >
              {requestedId === 'northgate' ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>Request Sent</span>
                </>
              ) : (
                <>
                  <span>Send request</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
