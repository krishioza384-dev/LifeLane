import React from 'react';
import { RadioTower, GitFork, Check, AlertTriangle } from 'lucide-react';

export function TrafficLogsView() {
  const events = [
    {
      time: '10:48',
      type: 'CORRIDOR',
      title: 'Activated for A-402',
      description: 'Green corridor cleared from Station Road junction to Sunrise General Hospital.',
      status: 'emerald',
      icon: GitFork,
    },
    {
      time: '10:47',
      type: 'SIGNALS',
      title: '4 signals preempted',
      description: 'Northbound arterials switched to corridor green. Cross traffic held at 2 intersections.',
      status: 'cyan',
      icon: RadioTower,
    },
    {
      time: '10:46',
      type: 'OFFER',
      title: 'Sunrise accepted',
      description: 'Sunrise General confirmed ICU & Cardiac bed reservation. Bay 04 assigned.',
      status: 'emerald',
      icon: Check,
    },
    {
      time: '10:44',
      type: 'RANKING',
      title: 'Riverside downgraded · stale data',
      description: 'Listing inventory 38 minutes old with unverified ICU status; penalised in dispatch queue.',
      status: 'amber',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-6 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
        <div>
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            OPERATIONAL AUDIT TRAIL
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-0.5">
            Immutable corridor and dispatch event log
          </p>
        </div>

        <span className="px-3 py-1 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] font-mono text-xs">
          ● LOG STREAMING
        </span>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-white/[0.06] before:z-0">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} className="relative z-10 flex items-start gap-4">
              {/* Node indicator */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  evt.status === 'emerald'
                    ? 'bg-[#0E271B] border-[#22E06B]/40 text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]'
                    : evt.status === 'cyan'
                    ? 'bg-[#091E2C] border-[#38BDF8]/40 text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-[#221609] border-[#F5A524]/40 text-[#F5A524] shadow-[0_0_12px_rgba(245,165,36,0.2)]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Event Card */}
              <div className="flex-1 rounded-xl bg-[#09121D]/70 border border-white/[0.06] p-4">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#64748B] font-semibold">
                      {evt.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        evt.status === 'emerald'
                          ? 'bg-[#0E271B] text-[#22E06B] border border-[#22E06B]/30'
                          : evt.status === 'cyan'
                          ? 'bg-[#091E2C] text-[#38BDF8] border border-[#38BDF8]/30'
                          : 'bg-[#221609] text-[#F5A524] border border-[#F5A524]/30'
                      }`}
                    >
                      {evt.type}
                    </span>
                    <h4 className="text-sm font-semibold text-white font-sans">
                      {evt.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] font-normal mt-1 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
