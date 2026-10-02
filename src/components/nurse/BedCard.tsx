import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface BedCardProps {
  title: string;
  count: number;
  badge?: React.ReactNode;
  borderColorClass?: string;
  isMutedZero?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function BedCard({
  title,
  count,
  badge,
  borderColorClass = 'border-white/[0.08]',
  isMutedZero = false,
  onIncrement,
  onDecrement,
}: BedCardProps) {
  return (
    <div
      className={`rounded-[22px] bg-[#070D15]/85 border ${borderColorClass} p-6 flex flex-col justify-between backdrop-blur-xl shadow-lg min-h-[175px] transition-all`}
    >
      {/* Top Row: Title on Left, Badge on Right */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[16px] font-normal text-white/90 tracking-wide font-sans">
          {title}
        </span>
        {badge && <div>{badge}</div>}
      </div>

      {/* Bottom Row: Large Count on Left, Circular Action Buttons on Right */}
      <div className="flex items-end justify-between mt-6">
        {/* Large Count Number */}
        <span
          className={`text-5xl font-mono tracking-tight leading-none select-none ${
            isMutedZero && count === 0
              ? 'text-slate-600 font-light'
              : 'text-white font-normal'
          }`}
        >
          {count}
        </span>

        {/* Circular Action Buttons Side-by-Side */}
        <div className="flex items-center gap-2.5">
          {/* Decrement Button */}
          <button
            onClick={onDecrement}
            disabled={count <= 0}
            type="button"
            aria-label={`Decrease ${title}`}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              count <= 0
                ? 'border-white/[0.05] bg-white/[0.01] text-white/20 cursor-not-allowed'
                : 'border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 text-white/80 cursor-pointer'
            }`}
          >
            <Minus className="w-4 h-4" strokeWidth={2} />
          </button>

          {/* Increment Button */}
          <button
            onClick={onIncrement}
            type="button"
            aria-label={`Increase ${title}`}
            className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 flex items-center justify-center text-white/80 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
