import React from 'react';
import { Check } from 'lucide-react';

interface FreshnessCardProps {
  updatedMinutesAgo: number;
  onConfirmAccurate: () => void;
  isJustUpdated?: boolean;
}

export function FreshnessCard({
  updatedMinutesAgo,
  onConfirmAccurate,
  isJustUpdated = false,
}: FreshnessCardProps) {
  // Determine SLA stage
  const isFresh = updatedMinutesAgo <= 15;
  const isAgeing = updatedMinutesAgo > 15 && updatedMinutesAgo <= 30;
  const isStale = updatedMinutesAgo > 30;

  return (
    <div className="relative rounded-[24px] bg-[#070D14]/85 border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6)] h-full min-h-[480px]">
      <div>
        {/* Top Header: Badge + STATUS REFRESH */}
        <div className="flex items-center justify-between">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2419] border border-[#22E06B]/30 text-[#22E06B] text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>{isFresh ? 'FRESH' : isAgeing ? 'AGEING' : 'STALE'}</span>
          </div>

          <span className="text-[11px] font-mono tracking-widest text-[#64748B] uppercase">
            STATUS REFRESH
          </span>
        </div>

        {/* Updated timestamp in emerald */}
        <div className="mt-3.5 mb-7">
          <p className="text-[13px] font-mono text-[#22E06B] font-medium tracking-wide">
            {updatedMinutesAgo === 0
              ? 'Updated just now'
              : `Updated ${updatedMinutesAgo} min ago`}
          </p>
        </div>

        {/* Freshness SLA Window Section */}
        <div>
          <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#64748B] mb-3.5">
            FRESHNESS SLA WINDOW
          </span>

          {/* 3-Segment Progress Bar */}
          <div className="grid grid-cols-3 gap-2 mb-4 items-center">
            {/* Segment 1 */}
            <div className="relative h-1.5 rounded-full bg-white/[0.08] overflow-visible">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isFresh || isAgeing || isStale
                    ? 'bg-[#22E06B] shadow-[0_0_8px_rgba(34,224,107,0.5)]'
                    : 'bg-white/[0.08]'
                }`}
                style={{ width: '100%' }}
              />
              {isFresh && (
                <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#22E06B] border-2 border-[#070D14] shadow-[0_0_10px_#22E06B]" />
              )}
            </div>

            {/* Segment 2 */}
            <div className="relative h-1.5 rounded-full bg-white/[0.08]">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isAgeing || isStale
                    ? 'bg-[#F5A524] shadow-[0_0_8px_rgba(245,165,36,0.5)] w-full'
                    : 'w-0'
                }`}
              />
              {isAgeing && (
                <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#F5A524] border-2 border-[#070D14] shadow-[0_0_10px_#F5A524]" />
              )}
            </div>

            {/* Segment 3 */}
            <div className="relative h-1.5 rounded-full bg-white/[0.08]">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isStale
                    ? 'bg-[#FF4D4D] shadow-[0_0_8px_rgba(255,77,77,0.5)] w-full'
                    : 'w-0'
                }`}
              />
              {isStale && (
                <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-[#FF4D4D] border-2 border-[#070D14] shadow-[0_0_10px_#FF4D4D]" />
              )}
            </div>
          </div>

          {/* SLA Rows */}
          <div className="space-y-1.5">
            {/* Fresh Row */}
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                isFresh
                  ? 'bg-[#0E271B]/90 border border-[#22E06B]/30'
                  : 'border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
                <span
                  className={`text-sm font-medium ${
                    isFresh ? 'text-[#22E06B]' : 'text-slate-300'
                  }`}
                >
                  Fresh
                </span>
              </div>
              <span
                className={`font-mono text-xs ${
                  isFresh ? 'text-[#22E06B]' : 'text-[#64748B]'
                }`}
              >
                up to 15 min
              </span>
            </div>

            {/* Ageing Row */}
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                isAgeing
                  ? 'bg-[#2A1D0E]/90 border border-[#F5A524]/30'
                  : 'border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
                <span
                  className={`text-sm font-medium ${
                    isAgeing ? 'text-[#F5A524]' : 'text-slate-400'
                  }`}
                >
                  Ageing
                </span>
              </div>
              <span
                className={`font-mono text-xs ${
                  isAgeing ? 'text-[#F5A524]' : 'text-[#64748B]'
                }`}
              >
                16 to 30 min
              </span>
            </div>

            {/* Stale Row */}
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                isStale
                  ? 'bg-[#2A0E13]/90 border border-[#FF4D4D]/30'
                  : 'border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />
                <span
                  className={`text-sm font-medium ${
                    isStale ? 'text-[#FF4D4D]' : 'text-slate-400'
                  }`}
                >
                  Stale
                </span>
              </div>
              <span
                className={`font-mono text-xs ${
                  isStale ? 'text-[#FF4D4D]' : 'text-[#64748B]'
                }`}
              >
                over 30 min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-8 pt-5 border-t border-white/[0.08]">
        <button
          onClick={onConfirmAccurate}
          type="button"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-[0.985] text-[#051A0E] font-semibold text-[16px] flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(34,224,107,0.35)] transition-all duration-150 cursor-pointer group"
        >
          <Check className="w-4 h-4 text-[#051A0E]" strokeWidth={3} />
          <span>Still accurate</span>
        </button>

        <p className="text-[12px] text-[#64748B] text-center mt-3 font-normal tracking-wide flex items-center justify-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#64748B]" />
          <span>Tap if nothing has changed</span>
        </p>
      </div>
    </div>
  );
}
