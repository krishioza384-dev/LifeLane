import React, { useState, useEffect } from 'react';
import { Heart, Activity, Check, X, Clock, Plus, Gauge, Ambulance } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';
import { ClinicalHandoverSummary } from './ClinicalHandoverSummary';

interface IncomingRequestHeroProps {
  requestState: 'pending' | 'accepted' | 'rejected';
  onAccept: () => void;
  onReject: () => void;
}

export function IncomingRequestHero({
  requestState,
  onAccept,
  onReject,
}: IncomingRequestHeroProps) {
  const { request } = useLifeLane();
  const handover = request.handover?.clinicalHandover;

  // Timer countdown initialized to 102 seconds (01:42)
  const [secondsRemaining, setSecondsRemaining] = useState(102);

  useEffect(() => {
    if (requestState !== 'pending') return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [requestState]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // SVG circular ring calculation (r = 54, circumference ~ 339)
  const circumference = 2 * Math.PI * 54;
  const progressRatio = secondsRemaining / 102;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const hrValue = handover ? (handover.vitals.heartRate ?? '—') : (request.vitals?.heartRate ?? 112);
  const spo2Value = handover ? (handover.vitals.spo2 ?? '—') : (request.vitals?.spO2 ?? 92);

  return (
    <div
      className={`rounded-[22px] bg-[#070D15]/90 border p-6 backdrop-blur-xl shadow-2xl relative transition-all duration-300 ${
        requestState === 'accepted'
          ? 'border-[#22E06B]/50 shadow-[0_0_35px_rgba(34,224,107,0.15)]'
          : requestState === 'rejected'
          ? 'border-[#FF4D4D]/40 shadow-[0_0_35px_rgba(255,77,77,0.15)]'
          : 'border-[#F5A524]/30 shadow-[0_0_30px_rgba(245,165,36,0.1)]'
      }`}
    >
      <div className="space-y-4">
        {/* Top Header: INCOMING REQUEST + Badges + Offer Tag */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_8px_#F5A524]" />
              <span className="text-[13px] font-mono font-bold uppercase tracking-[0.14em] text-white">
                INCOMING REQUEST
              </span>
            </div>

            <span className="px-2 py-0.5 rounded border border-[#FF4D4D]/35 bg-[#291014] text-[#FF4D4D] text-[10px] font-mono font-medium">
              CRITICAL
            </span>
            <span className="px-2 py-0.5 rounded border border-[#38BDF8]/35 bg-[#0B1E2E] text-[#38BDF8] text-[10px] font-mono font-medium">
              {handover?.situation ? 'EVALUATED' : 'CARDIAC'}
            </span>
            {request.handover && (
              <span className="px-2 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-950/40 text-emerald-300 text-[10px] font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                VOICE VERIFIED
              </span>
            )}
          </div>

          <span className="px-2.5 py-0.5 rounded-md border border-white/[0.1] bg-white/[0.03] text-xs font-mono text-[#94A3B8]">
            OFFER <strong className="text-white">#{request.handover?.systemMeta.ambulanceId || 'A402'}-01</strong>
          </span>
        </div>

        {/* Ambulance Banner */}
        <div className="rounded-xl bg-[#09111D]/80 border border-white/[0.06] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0B2135] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Ambulance className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Ambulance {request.handover?.systemMeta.ambulanceId || 'A-402'}
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Paramedic Crew Alpha-9 · Unit 14
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                SIMULATED ETA
              </span>
              <span className="text-lg font-mono font-semibold text-white">
                8 min
              </span>
            </div>

            <span className="px-2.5 py-1 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-medium">
              EN ROUTE
            </span>
          </div>
        </div>

        {/* Countdown Centerpiece Section */}
        <div className="py-2 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#F5A524] mb-3 uppercase tracking-wider font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>TIME TO RESPOND</span>
          </div>

          {/* Refined Circular Countdown Ring */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
              {/* Background Track */}
              <circle
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke="#1A1208"
                strokeWidth="6"
              />
              {/* Active Progress Arc */}
              <circle
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke={requestState === 'accepted' ? '#22E06B' : requestState === 'rejected' ? '#FF4D4D' : '#F5A524'}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={requestState === 'accepted' ? 0 : strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
                style={{
                  filter: `drop-shadow(0 0 8px ${requestState === 'accepted' ? '#22E06B' : requestState === 'rejected' ? '#FF4D4D' : '#F5A524'})`,
                }}
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-mono font-bold text-white tracking-widest leading-none">
                {requestState === 'accepted'
                  ? 'HELD'
                  : requestState === 'rejected'
                  ? 'REJ'
                  : formatTimer(secondsRemaining)}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#64748B] mt-1.5">
                {requestState === 'accepted'
                  ? 'CONFIRMED'
                  : requestState === 'rejected'
                  ? 'DECLINED'
                  : 'SECONDS REM.'}
              </span>
            </div>
          </div>

          {/* Provisional Hold Pill */}
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono tracking-wider uppercase font-semibold ${
                requestState === 'accepted'
                  ? 'border-[#22E06B]/40 bg-[#0E271B] text-[#22E06B]'
                  : requestState === 'rejected'
                  ? 'border-[#FF4D4D]/40 bg-[#250F14] text-[#FF4D4D]'
                  : 'border-[#F5A524]/40 bg-[#201509] text-[#F5A524]'
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
                  ? 'CONFIRMED HOLD'
                  : requestState === 'rejected'
                  ? 'HOLD RELEASED'
                  : 'PROVISIONAL HOLD'}
              </span>
            </span>
          </div>
        </div>

        {/* Patient Vitals: Heart Rate & SpO2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate Box */}
          <div className="rounded-xl bg-[#071320]/80 border border-[#38BDF8]/20 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#38BDF8]">
                <Heart className="w-3.5 h-3.5" />
                <span>HEART RATE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {hrValue !== '—' ? 'BPM' : 'Not stated'}
              </span>
            </div>

            <div className="flex items-end justify-between mt-3">
              <span className="text-4xl font-mono font-normal text-white leading-none">
                {hrValue}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0E253A] border border-[#38BDF8]/30 text-[#38BDF8] text-[10px] font-mono">
                {hrValue === '—'
                  ? 'Unreported'
                  : typeof hrValue === 'number' && hrValue > 100
                  ? 'Tachy'
                  : 'Normal'}
              </span>
            </div>
          </div>

          {/* SpO2 Box */}
          <div className="rounded-xl bg-[#181108]/80 border border-[#F5A524]/20 p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F5A524]">
                <Activity className="w-3.5 h-3.5" />
                <span>SPO2</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {spo2Value !== '—' ? 'Pulse Oxygen' : 'Not stated'}
              </span>
            </div>

            <div className="flex items-end justify-between mt-3">
              <span className="text-4xl font-mono font-normal text-[#F5A524] leading-none">
                {spo2Value !== '—' ? `${spo2Value}%` : '—'}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#2D1D09] border border-[#F5A524]/30 text-[#F5A524] text-[10px] font-mono">
                {spo2Value === '—'
                  ? 'Unreported'
                  : typeof spo2Value === 'number' && spo2Value < 95
                  ? 'Borderline'
                  : 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Clinical Voice Handover Summary (if verified handover exists) */}
        {request.handover && (
          <div className="pt-1">
            <ClinicalHandoverSummary handover={request.handover} />
          </div>
        )}

        {/* BED NEED Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
              BED NEED
            </span>
            <span className="text-[11px] text-[#64748B] font-mono">
              Suggested · editable
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#22E06B]/30 bg-[#0E271B] text-xs font-mono">
              <span className="text-[#22E06B]">⊞</span>
              <span className="text-white font-medium">ICU</span>
              <span className="text-[10px] text-[#64748B] uppercase">· SUGGESTED</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#38BDF8]/30 bg-[#0B1E2E] text-xs font-mono">
              <span className="text-[#38BDF8]">⊞</span>
              <span className="text-white font-medium">CARDIAC</span>
              <span className="text-[10px] text-[#64748B] uppercase">· SUGGESTED</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#06B6D4]/30 bg-[#091F26] text-xs font-mono">
              <span className="text-[#06B6D4]">⊞</span>
              <span className="text-white font-medium">OXYGEN</span>
              <span className="text-[10px] text-[#64748B] uppercase">· SUGGESTED</span>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-dashed border-white/[0.15] text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* ETA & Assigned Bay Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* ETA */}
          <div className="rounded-xl bg-[#09111D]/80 border border-white/[0.06] p-3 flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                ETA
              </span>
              <span className="text-2xl font-mono font-normal text-white mt-0.5 block">
                8 min
              </span>
            </div>
            <Gauge className="w-5 h-5 text-[#38BDF8]" />
          </div>

          {/* Assigned Bay */}
          <div className="rounded-xl bg-[#09111D]/80 border border-[#22E06B]/25 p-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#22E06B] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
                <span>ASSIGNED BAY</span>
              </div>
              <span className="text-2xl font-mono font-medium text-[#22E06B] mt-0.5 block">
                BAY 04
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B]">
              <Check className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Provisional Hold Status Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5A524]">
              PROVISIONAL HOLD
            </span>
            <span className="text-[11px] text-[#64748B] font-mono">
              Released if rejected or timed out
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-[#140F08]/80 border border-[#F5A524]/20 py-2 px-2.5 text-center text-xs font-mono text-[#F5A524] flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
              <span>ICU 1 held</span>
            </div>
            <div className="rounded-lg bg-[#140F08]/80 border border-[#F5A524]/20 py-2 px-2.5 text-center text-xs font-mono text-[#F5A524] flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
              <span>CARDIAC 1 held</span>
            </div>
            <div className="rounded-lg bg-[#140F08]/80 border border-[#F5A524]/20 py-2 px-2.5 text-center text-xs font-mono text-[#F5A524] flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
              <span>OXYGEN 1 held</span>
            </div>
          </div>
        </div>

        {/* Decision Actions Area */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-mono mb-2.5">
            <span className="flex items-center gap-1.5 text-[#F5A524]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
              <span>Respond before timer expires</span>
            </span>
            <span className="text-[#64748B] uppercase tracking-wider text-[10px]">
              ACTION REQUIRED
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Reject Button */}
            <button
              onClick={onReject}
              disabled={requestState !== 'pending'}
              type="button"
              className={`py-3.5 px-6 rounded-2xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                requestState !== 'pending'
                  ? 'border-white/[0.05] bg-white/[0.02] text-white/20 cursor-not-allowed'
                  : 'border-[#FF4D4D]/35 bg-[#200D12] text-[#FF4D4D] hover:bg-[#2C1018] active:scale-95 cursor-pointer shadow-lg'
              }`}
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
              <span>REJECT</span>
            </button>

            {/* Accept & Hold Button */}
            <button
              onClick={onAccept}
              disabled={requestState !== 'pending'}
              type="button"
              className={`flex-1 py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-base font-bold transition-all ${
                requestState === 'accepted'
                  ? 'bg-[#0E271B] border border-[#22E06B]/50 text-[#22E06B] cursor-default'
                  : requestState === 'rejected'
                  ? 'border-white/[0.05] bg-white/[0.02] text-white/20 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#17CB5C] to-[#22E06B] text-[#051A0E] shadow-[0_0_25px_rgba(34,224,107,0.35)] hover:brightness-105 active:scale-98 cursor-pointer'
              }`}
            >
              <Check className="w-4 h-4" strokeWidth={3} />
              <span>{requestState === 'accepted' ? 'ACCEPTED & HELD' : 'ACCEPT & HOLD →'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
