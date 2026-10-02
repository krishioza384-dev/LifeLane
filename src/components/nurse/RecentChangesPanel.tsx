import React from 'react';

export interface ChangeLogItem {
  id: string;
  resource: 'ICU' | 'Ventilator' | 'Oxygen' | 'Cardiac' | 'Burns';
  delta: number;
  time: string;
}

interface RecentChangesPanelProps {
  logs: ChangeLogItem[];
}

export function RecentChangesPanel({ logs }: RecentChangesPanelProps) {
  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
          RECENT CHANGES
        </span>

        {/* Log active pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span className="text-xs text-[#94A3B8] font-normal font-mono">Log active</span>
        </div>
      </div>

      {/* Log items */}
      <div className="space-y-3.5 pt-3">
        {logs.map((log) => {
          const isPositive = log.delta > 0;
          return (
            <div
              key={log.id}
              className="flex items-center justify-between text-sm py-0.5"
            >
              {/* Left: Dot + Resource Name + Delta Badge */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500/80 shrink-0" />
                <span className="text-slate-200 font-normal">
                  {log.resource}
                </span>

                <span
                  className={`font-mono text-xs px-2.5 py-0.5 rounded border ${
                    isPositive
                      ? 'bg-[#0D2419] border-[#22E06B]/30 text-[#22E06B]'
                      : 'bg-[#281116] border-[#FF4D4D]/30 text-[#FF4D4D]'
                  }`}
                >
                  {isPositive ? `+${log.delta}` : log.delta}
                </span>
              </div>

              {/* Far Right: Timestamp */}
              <span className="font-mono text-sm text-[#64748B]">
                {log.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
