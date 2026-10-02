import React from 'react';
import { Ambulance } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

export function RecentActivityCard() {
  const { request, corridor } = useLifeLane();

  // Construct events strictly relevant to Ambulance A-402's emergency
  const isAccepted = request.status === 'accepted';
  const isRejected = request.status === 'rejected';
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';
  const hasVoiceHandover = !!request.handover;

  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 backdrop-blur-xl shadow-lg select-none flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
              <Ambulance className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-serif font-normal text-white tracking-tight">
              Recent Activity
            </h3>
          </div>

          <span className="px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-300 text-[10px] font-mono font-medium">
            UNIT A-402 LOG
          </span>
        </div>

        {/* Operational Activity Rows for A-402 */}
        <div className="space-y-3.5">
          {/* Event 1: Green Corridor / Routing Status */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">
                {isCorridorActive ? '10:48' : '10:45'}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isCorridorActive
                      ? 'bg-[#22E06B] shadow-[0_0_6px_#22E06B]'
                      : isCorridorReady
                      ? 'bg-[#F5A524] shadow-[0_0_6px_#F5A524]'
                      : 'bg-slate-400'
                  }`}
                />
                <div>
                  <span className="font-semibold text-white block">
                    {isCorridorActive
                      ? 'Green Corridor Activated for A-402'
                      : isCorridorReady
                      ? 'Green Corridor Staged'
                      : 'Transit Phase En Route'}
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    {isCorridorActive
                      ? '6 signals preempted on route · ETA updated to 6 min'
                      : isCorridorReady
                      ? 'Route signals aligned · ready for deployment'
                      : 'Standard traffic routing · Estimated ETA 8 min'}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`text-[11px] font-mono font-semibold shrink-0 px-2 py-0.5 rounded ${
                isCorridorActive
                  ? 'border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                  : isCorridorReady
                  ? 'border border-[#F5A524]/30 bg-[#201509] text-[#F5A524]'
                  : 'text-slate-400'
              }`}
            >
              {isCorridorActive ? 'Active Wave' : isCorridorReady ? 'Staged' : '8 min'}
            </span>
          </div>

          {/* Event 2: Hospital Offer / Acceptance */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">
                {isAccepted || isRejected ? '10:46' : '10:45'}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isAccepted
                      ? 'bg-[#22E06B] shadow-[0_0_6px_#22E06B]'
                      : isRejected
                      ? 'bg-[#FF4D4D]'
                      : 'bg-[#F5A524]'
                  }`}
                />
                <div>
                  <span className="font-semibold text-white block">
                    {isAccepted
                      ? 'Hospital Accepted A-402'
                      : isRejected
                      ? 'Hospital Declined Hold'
                      : 'Provisional Hold Requested'}
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    {isAccepted
                      ? 'Sunrise General confirmed trauma hold & Bay 04 assigned'
                      : isRejected
                      ? 'Sunrise General capacity exceeded · alternate hospital search'
                      : 'Sunrise General Hospital offer pending response'}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`text-[11px] font-mono font-semibold shrink-0 px-2 py-0.5 rounded ${
                isAccepted
                  ? 'border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                  : isRejected
                  ? 'border border-[#FF4D4D]/30 bg-[#200D12] text-[#FF4D4D]'
                  : 'border border-[#F5A524]/30 bg-[#201509] text-[#F5A524]'
              }`}
            >
              {isAccepted ? 'Confirmed' : isRejected ? 'Declined' : 'Pending'}
            </span>
          </div>

          {/* Event 3: Voice Handover (if sent) or Destination Hospital Selection */}
          {hasVoiceHandover ? (
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 w-10">
                  {new Date(request.handover!.verifiedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">
                      Voice Handover Transmitted
                    </span>
                    <span className="text-[11px] text-slate-400 block font-normal">
                      Paramedic-verified clinical record sent to Sunrise General Hospital
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono font-semibold shrink-0 px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]">
                Delivered
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 w-10">10:44</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8] shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">
                      Destination Hospital Selected
                    </span>
                    <span className="text-[11px] text-slate-400 block font-normal">
                      Sunrise General Hospital selected · ICU and Cardiac beds requested
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono font-semibold shrink-0 px-2 py-0.5 rounded border border-[#38BDF8]/30 bg-[#0B1E2E] text-[#38BDF8]">
                Selected
              </span>
            </div>
          )}

          {/* Event 4: Initial Dispatch */}
          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-500 w-10">10:42</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B] shrink-0" />
                <div>
                  <span className="font-semibold text-white block">
                    A-402 Dispatched
                  </span>
                  <span className="text-[11px] text-slate-400 block font-normal">
                    Station Road junction · Priority 1 Cardiac Emergency
                  </span>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              Dispatched
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-mono">
        <span className="text-[#64748B]">
          Ambulance Crew Alpha-9 · Unit 14
        </span>
        <span className="text-[#22E06B] font-medium">
          Emergency Operations Active
        </span>
      </div>
    </div>
  );
}
