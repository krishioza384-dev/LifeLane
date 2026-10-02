import React, { useState } from 'react';
import {
  Mic,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  Pill,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import type { VerifiedEmergencyHandover } from '../../types/voiceHandover';

interface ClinicalHandoverSummaryProps {
  handover?: VerifiedEmergencyHandover;
}

export function ClinicalHandoverSummary({ handover }: ClinicalHandoverSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!handover) return null;

  const { clinicalHandover, systemMeta, verifiedAt } = handover;

  const formattedTime = new Date(verifiedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="rounded-2xl bg-[#09111D]/90 border border-emerald-400/30 overflow-hidden shadow-lg transition-all select-none">
      {/* Header Bar */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        type="button"
        className="w-full px-4 py-3 flex items-center justify-between bg-emerald-950/30 hover:bg-emerald-950/40 border-b border-emerald-400/20 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-sm">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                VOICE HANDOVER · UNIT {systemMeta.ambulanceId}
              </span>
              <span className="px-2 py-0.2 rounded-full bg-[#0E271B] border border-[#22E06B]/30 text-[#22E06B] text-[9px] font-mono">
                VERIFIED {formattedTime}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Paramedic-Dictated Clinical Record
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-[10px] font-mono">{isExpanded ? 'Collapse' : 'Expand'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 text-xs font-sans">
          {/* Situation & Onset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#070D16] border border-white/[0.06] space-y-1">
              <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block">
                Situation / Chief Complaint
              </span>
              <p className="text-white font-medium leading-snug">
                {clinicalHandover.situation || 'Not reported'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070D16] border border-white/[0.06] space-y-1">
              <span className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider block">
                Onset Duration
              </span>
              <p className="text-slate-200 font-medium">
                {clinicalHandover.onset || 'Not reported'}
              </p>
            </div>
          </div>

          {/* Paramedic Stated Assessment */}
          <div className="p-3 rounded-xl bg-[#070D16] border border-white/[0.06] space-y-1">
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider block font-semibold">
              Paramedic Stated Assessment (Not AI Diagnosis)
            </span>
            <p className="text-white font-medium">
              {clinicalHandover.assessment || 'No stated assessment provided'}
            </p>
          </div>

          {/* Interventions Given & Consciousness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#070D16] border border-white/[0.06] space-y-1">
              <span className="text-[9px] font-mono text-[#22E06B] uppercase tracking-wider block font-semibold flex items-center gap-1">
                <Pill className="w-3 h-3" />
                <span>Pre-Hospital Interventions Given</span>
              </span>
              <p className="text-slate-200 leading-relaxed">
                {clinicalHandover.treatment || 'None reported'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#070D16] border border-white/[0.06] space-y-1">
              <span className="text-[9px] font-mono text-sky-400 uppercase tracking-wider block font-semibold flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>Consciousness / Neurological</span>
              </span>
              <p className="text-slate-200">
                {clinicalHandover.consciousness || 'Not reported'}
              </p>
            </div>
          </div>

          {/* Allergies & History */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2.5 rounded-xl bg-[#070D16] border border-white/[0.06]">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                Allergies
              </span>
              <span className="text-slate-200 font-mono text-xs">
                {clinicalHandover.allergies || 'None reported / unverified'}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#070D16] border border-white/[0.06]">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                Medical History
              </span>
              <span className="text-slate-200 font-mono text-xs">
                {clinicalHandover.history || 'None reported'}
              </span>
            </div>
          </div>

          {/* Unreported / Missing Clinical Information Strip */}
          {clinicalHandover.missingFields.length > 0 && (
            <div className="p-2.5 rounded-xl bg-amber-950/25 border border-amber-400/30 flex items-start gap-2 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-semibold text-amber-300 uppercase block">
                  Unmentioned in Voice Handover ({clinicalHandover.missingFields.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {clinicalHandover.missingFields.map((field) => (
                    <span
                      key={field}
                      className="px-1.5 py-0.2 rounded bg-amber-950/50 border border-amber-400/30 text-amber-300 text-[9px] font-mono"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
