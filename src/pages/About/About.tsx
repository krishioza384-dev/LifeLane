import React, { useState } from 'react';
import {
  BedDouble,
  Navigation,
  Building2,
  Zap,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Activity,
  Maximize2,
} from 'lucide-react';
import { ScreenId } from '../../components/navigation/LifeLaneTopNavbar';

interface AboutProps {
  onNavigateToScreen: (screen: ScreenId) => void;
}

interface ModuleDetail {
  id: ScreenId;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  borderColor: string;
  shadowColor: string;
  bgTint: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  metricValue: string;
  metricLabel: string;
  summary: string;
  highlights: string[];
  sla: string;
}

export function About({ onNavigateToScreen }: AboutProps) {
  const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);

  const modules: ModuleDetail[] = [
    {
      id: 'nurse',
      title: 'Nurse Station',
      subtitle: 'Bed Availability Engine',
      badge: 'SCREEN 01 · 15M SLA',
      badgeColor: 'text-[#F5A524] bg-[#22160A] border-[#F5A524]/40',
      themeColor: '#F5A524',
      borderColor: 'border-[#F5A524]/40 hover:border-[#F5A524]/70',
      shadowColor: 'hover:shadow-[0_0_30px_rgba(245,165,36,0.15)]',
      bgTint: 'bg-gradient-to-b from-[#130E07]/90 to-[#070D15]/90',
      iconBg: 'bg-[#24170A] border border-[#F5A524]/40',
      iconColor: 'text-[#F5A524]',
      icon: BedDouble,
      metricValue: '15 MIN',
      metricLabel: 'Freshness Decay Window',
      summary: 'Eliminates ghost hospital capacity with tactile, one-tap bed updates.',
      highlights: [
        'Automatic staleness penalty after 15 minutes of inactivity',
        'Direct tracking for ICU, Ventilator, Oxygen, Cardiac, and Burns',
        'Instant 1-tap "Still accurate" freshness confirmation',
        'Ambulance bed holds flagged directly on charge nurse console',
      ],
      sla: 'Zero stale reroutes • 100% verified capacity',
    },
    {
      id: 'dispatch',
      title: 'Dispatch Triage',
      subtitle: 'Algorithmic Hospital Matcher',
      badge: 'SCREEN 02 · REALTIME',
      badgeColor: 'text-[#38BDF8] bg-[#0A1A26] border-[#38BDF8]/40',
      themeColor: '#38BDF8',
      borderColor: 'border-[#38BDF8]/40 hover:border-[#38BDF8]/70',
      shadowColor: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]',
      bgTint: 'bg-gradient-to-b from-[#07131F]/90 to-[#070D15]/90',
      iconBg: 'bg-[#0B2135] border border-[#38BDF8]/40',
      iconColor: 'text-[#38BDF8]',
      icon: Navigation,
      metricValue: '98.4%',
      metricLabel: 'Triage Match Accuracy',
      summary: 'Dynamic ranking of trauma centers based on distance and verified beds.',
      highlights: [
        'Multi-factor scoring: ETA, specialty trauma readiness, and bed age',
        'Automated penalty for facilities with stale bed timestamps',
        'Direct telemetry transmission to receiving facility',
        'Simulated vector routing across urban street grid',
      ],
      sla: '< 500ms multi-facility decision engine',
    },
    {
      id: 'hospital',
      title: 'Hospital Console',
      subtitle: '90-Second Intake Handshake',
      badge: 'SCREEN 03 · PROTOCOL',
      badgeColor: 'text-[#C084FC] bg-[#1A0E27] border-[#C084FC]/40',
      themeColor: '#C084FC',
      borderColor: 'border-[#C084FC]/40 hover:border-[#C084FC]/70',
      shadowColor: 'hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]',
      bgTint: 'bg-gradient-to-b from-[#130B1E]/90 to-[#070D15]/90',
      iconBg: 'bg-[#231136] border border-[#C084FC]/40',
      iconColor: 'text-[#C084FC]',
      icon: Building2,
      metricValue: '90 SEC',
      metricLabel: 'Decision Countdown Lock',
      summary: 'Guaranteed bed reservation lock before ambulance touches hospital tarmac.',
      highlights: [
        'Urgent 90s countdown clock for charge nurse to accept incoming unit',
        'Automated trauma team and catheterization lab mobilization',
        'Live patient vitals & ETA countdown stream',
        'Zero ramp delay upon vehicle arrival at bay 02',
      ],
      sla: 'Instant bed hold • Automated surgical prep',
    },
    {
      id: 'traffic',
      title: 'Traffic Command',
      subtitle: 'Green Wave Preemption',
      badge: 'SCREEN 04 · ARTERIAL',
      badgeColor: 'text-[#22E06B] bg-[#0E271B] border-[#22E06B]/40',
      themeColor: '#22E06B',
      borderColor: 'border-[#22E06B]/40 hover:border-[#22E06B]/70',
      shadowColor: 'hover:shadow-[0_0_30px_rgba(34,224,107,0.15)]',
      bgTint: 'bg-gradient-to-b from-[#091D13]/90 to-[#070D15]/90',
      iconBg: 'bg-[#0E271B] border border-[#22E06B]/40',
      iconColor: 'text-[#22E06B]',
      icon: Zap,
      metricValue: '-25%',
      metricLabel: 'Transit Time Recaptured',
      summary: 'Clears arterial avenues by holding cross-traffic and locking green signals.',
      highlights: [
        'Automated preemption across 6 key arterial intersections',
        'Cross-traffic holds prevent cross-street vehicular blockage',
        'Optical sensor feedback loop verifying intersection clearance',
        'Sub-6 minute golden-hour corridor transfer dynamics',
      ],
      sla: 'Zero-halt green wave • 100% signal lock',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 relative selection:bg-[#22E06B]/20 selection:text-[#22E06B]">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[550px] h-[550px] bg-[#22E06B]/[0.025] rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto space-y-10 pb-20">
        {/* ======================================================== */}
        {/* HERO BANNER (CLEAN & ELEGANT) */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[11px] font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
              <span>LIFELANE AUTONOMOUS OS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
              Emergency coordination, <span className="italic font-normal">synchronized</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal mt-2 max-w-2xl leading-relaxed">
              Connecting nurse bed validation, ambulance dispatch, trauma intake, and green traffic waves into a unified, zero-delay emergency corridor.
            </p>
          </div>

          {/* Quick System Telemetry Badge */}
          <div className="rounded-2xl bg-[#09101C]/80 border border-white/[0.08] p-3.5 flex items-center gap-5 shrink-0 backdrop-blur-md">
            <div>
              <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                SYSTEM LATENCY
              </span>
              <span className="text-lg font-mono font-bold text-white">12.4 ms</span>
            </div>
            <div className="w-px h-6 bg-white/[0.08]" />
            <div>
              <span className="block text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                CORRIDOR FLOW
              </span>
              <span className="text-lg font-mono font-bold text-[#22E06B]">Optimal</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4 COLORED INTERACTIVE CARDS */}
        {/* ======================================================== */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#94A3B8]">
              OPERATIONAL PILLARS (CLICK TO INSPECT)
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              4 Synchronized Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`group rounded-[22px] ${mod.bgTint} border ${mod.borderColor} ${mod.shadowColor} p-5 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 relative overflow-hidden`}
                >
                  {/* Subtle top corner glow */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: mod.themeColor }}
                  />

                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${mod.iconBg} flex items-center justify-center ${mod.iconColor} shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${mod.badgeColor}`}>
                        {mod.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="text-lg font-sans font-bold text-white group-hover:text-white transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color: mod.themeColor }}>
                      {mod.subtitle}
                    </p>

                    {/* Short Punchy Summary */}
                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                      {mod.summary}
                    </p>
                  </div>

                  {/* Bottom: Big KPI & Pop-up Action */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-end justify-between">
                    <div>
                      <span className="text-xl font-mono font-bold text-white block leading-none">
                        {mod.metricValue}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 mt-0.5 block">
                        {mod.metricLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Inspect details"
                      className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.03] group-hover:bg-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-all"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* PIPELINE STRIP (ELEGANT & COMPACT) */}
        {/* ======================================================== */}
        <div className="rounded-[22px] bg-[#070D16]/85 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#94A3B8]">
              END-TO-END PATIENT LIFECYCLE
            </span>
            <span className="text-xs font-mono text-[#22E06B]">Deterministic Flow</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            {/* Step 1 */}
            <div className="rounded-xl bg-[#09121D] border border-[#38BDF8]/20 p-3.5">
              <span className="text-[10px] text-[#38BDF8] font-bold block">01 · FIELD TRIAGE</span>
              <p className="text-white font-medium mt-1 font-sans">Ambulance A-402 Dispatched</p>
              <span className="text-[10px] text-slate-400 mt-1 block">Patient vitals streamed</span>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl bg-[#09121D] border border-[#F5A524]/20 p-3.5">
              <span className="text-[10px] text-[#F5A524] font-bold block">02 · FRESHNESS CHECK</span>
              <p className="text-white font-medium mt-1 font-sans">Sunrise General Ranked #1</p>
              <span className="text-[10px] text-slate-400 mt-1 block">Beds validated &lt; 4m ago</span>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl bg-[#09121D] border border-[#C084FC]/20 p-3.5">
              <span className="text-[10px] text-[#C084FC] font-bold block">03 · ER HANDSHAKE</span>
              <p className="text-white font-medium mt-1 font-sans">90s Bed Hold Accepted</p>
              <span className="text-[10px] text-slate-400 mt-1 block">Trauma Bay 02 staged</span>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl bg-[#09121D] border border-[#22E06B]/20 p-3.5">
              <span className="text-[10px] text-[#22E06B] font-bold block">04 · GREEN WAVE</span>
              <p className="text-white font-medium mt-1 font-sans">6 Arterial Signals Preempted</p>
              <span className="text-[10px] text-[#22E06B] mt-1 block">Sub-6 min arrival</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE CALL TO ACTION CARD */}
        {/* ======================================================== */}
        <div className="rounded-[22px] bg-gradient-to-r from-[#07131D] via-[#091C29] to-[#0A261B] border border-[#22E06B]/30 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div>
            <h3 className="text-xl font-serif text-white font-normal">
              Ready to test an operational scenario?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select any live screen to view real-time bed updates, dispatch triage, or traffic corridor preemption.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateToScreen('home')}
              type="button"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] font-bold text-xs shadow-[0_0_15px_rgba(34,224,107,0.3)] transition-all cursor-pointer"
            >
              Overview Matrix
            </button>
            <button
              onClick={() => onNavigateToScreen('traffic')}
              type="button"
              className="py-2.5 px-4 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 text-white font-medium text-xs transition-all cursor-pointer"
            >
              Traffic Command
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* POP-UP DETAIL CARD (MODAL) */}
      {/* ======================================================== */}
      {selectedModule && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedModule(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-[24px] ${selectedModule.bgTint} border ${selectedModule.borderColor} p-6 sm:p-7 backdrop-blur-2xl shadow-2xl relative animate-in zoom-in-95 duration-200`}
            style={{
              boxShadow: `0 0 40px ${selectedModule.themeColor}25, 0 20px 50px rgba(0,0,0,0.8)`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedModule(null)}
              type="button"
              aria-label="Close details"
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header: Icon + Badge + Title */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl ${selectedModule.iconBg} flex items-center justify-center ${selectedModule.iconColor} shrink-0 shadow-lg`}>
                <selectedModule.icon className="w-6 h-6" />
              </div>

              <div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${selectedModule.badgeColor} inline-block mb-1`}>
                  {selectedModule.badge}
                </span>
                <h3 className="text-2xl font-serif text-white font-normal">
                  {selectedModule.title}
                </h3>
                <p className="text-xs font-mono" style={{ color: selectedModule.themeColor }}>
                  {selectedModule.subtitle}
                </p>
              </div>
            </div>

            {/* Metric Callout Card */}
            <div className="rounded-xl bg-[#070D15]/90 border border-white/[0.08] p-4 flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block">
                  KEY PERFORMANCE TARGET
                </span>
                <span className="text-xs text-slate-300 font-sans mt-0.5 block">
                  {selectedModule.metricLabel}
                </span>
              </div>
              <span className="text-2xl font-mono font-bold text-white">
                {selectedModule.metricValue}
              </span>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] block mb-1">
                SYSTEM SPECIFICATIONS
              </span>
              {selectedModule.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: selectedModule.themeColor }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* SLA Tag */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-slate-400 mb-6 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#22E06B] shrink-0" />
              <span>{selectedModule.sla}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const target = selectedModule.id;
                  setSelectedModule(null);
                  onNavigateToScreen(target);
                }}
                type="button"
                className="flex-1 py-3 px-4 rounded-xl text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-sans"
                style={{
                  backgroundColor: selectedModule.themeColor,
                  color: selectedModule.id === 'nurse' || selectedModule.id === 'traffic' ? '#051A0E' : '#FFFFFF',
                  fontWeight: 'bold',
                }}
              >
                <span>Launch Live {selectedModule.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedModule(null)}
                type="button"
                className="py-3 px-4 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 text-xs font-medium transition-all cursor-pointer font-sans"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
