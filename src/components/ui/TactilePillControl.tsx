import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface TactilePillControlProps {
  onDecrement: () => void;
  onIncrement: () => void;
  disableDecrement?: boolean;
}

export function TactilePillControl({
  onDecrement,
  onIncrement,
  disableDecrement = false,
}: TactilePillControlProps) {
  return (
    <div className="inline-flex items-center justify-center bg-[#070D16]/90 border border-white/[0.12] rounded-full px-1.5 py-1 shadow-inner backdrop-blur-md">
      <button
        onClick={onDecrement}
        disabled={disableDecrement}
        type="button"
        aria-label="Decrease bed count"
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 ${
          disableDecrement
            ? 'text-white/20 cursor-not-allowed'
            : 'text-white/80 hover:text-white hover:bg-white/[0.08] active:scale-90 active:bg-white/[0.14] cursor-pointer'
        }`}
      >
        <Minus className="w-4 h-4" strokeWidth={2.5} />
      </button>

      <div className="w-[1px] h-4 bg-white/10 mx-1" />

      <button
        onClick={onIncrement}
        type="button"
        aria-label="Increase bed count"
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/[0.08] active:scale-90 active:bg-white/[0.14] transition-all duration-150 cursor-pointer"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
