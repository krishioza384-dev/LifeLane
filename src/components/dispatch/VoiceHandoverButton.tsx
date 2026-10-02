import React from 'react';
import { Mic, Sparkles } from 'lucide-react';

interface VoiceHandoverButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export function VoiceHandoverButton({ onClick, className = '', disabled = false }: VoiceHandoverButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-sky-500/20 hover:from-emerald-500/30 hover:to-sky-500/30 border border-emerald-400/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-medium shadow-[0_0_20px_rgba(34,224,107,0.15)] hover:shadow-[0_0_25px_rgba(34,224,107,0.25)] backdrop-blur-md active:scale-95 transition-all cursor-pointer select-none ${className}`}
    >
      <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
        <Mic className="w-3 h-3 animate-pulse" />
      </div>
      <span className="font-semibold tracking-wide">Voice Handover</span>
      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/15 border border-emerald-400/30 text-emerald-400">
        AI
      </span>
    </button>
  );
}
