import React, { useState } from 'react';
import {
  Zap,
  BedDouble,
  Navigation,
  Cpu,
  Volume2,
  Check,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ScreenId } from '../../components/navigation/LifeLaneTopNavbar';
import { useLifeLane } from '../../context/LifeLaneContext';

interface SettingsProps {
  onNavigateToScreen: (screen: ScreenId) => void;
}

export function Settings({ onNavigateToScreen }: SettingsProps) {
  const { resetDemoState } = useLifeLane();
  // State for interactive settings controls
  // 1. Corridor Automation (Emerald)
  const [autoPreempt, setAutoPreempt] = useState(true);
  const [leadTime, setLeadTime] = useState<'15s' | '30s' | '45s' | '60s'>('30s');
  const [crossHold, setCrossHold] = useState<'10s' | '20s' | '30s'>('20s');
  const [opticalFailSafe, setOpticalFailSafe] = useState(true);

  // 2. Bed Freshness & SLAs (Amber)
  const [freshnessWindow, setFreshnessWindow] = useState<'10m' | '15m' | '20m'>('15m');
  const [staleDecayPenalty, setStaleDecayPenalty] = useState(true);
  const [audioExpiringWarning, setAudioExpiringWarning] = useState(true);
  const [oneTapQuickMode, setOneTapQuickMode] = useState(true);

  // 3. Dispatch & Triage (Sky Blue)
  const [rankingStrategy, setRankingStrategy] = useState<'balanced' | 'fastest' | 'capacity'>('balanced');
  const [triageRadius, setTriageRadius] = useState<'15km' | '25km' | '40km'>('25km');
  const [autoStreamVitals, setAutoStreamVitals] = useState(true);

  // 4. Edge Telemetry (Purple)
  const [streamRate, setStreamRate] = useState<'10Hz' | '20Hz' | '50Hz'>('20Hz');
  const [offlineCache, setOfflineCache] = useState(true);
  const [simSpeed, setSimSpeed] = useState<'1.0x' | '1.5x' | '2.0x'>('1.0x');

  // 5. Sound & Alert Signals (Crimson)
  const [sirenOverrideSound, setSirenOverrideSound] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [criticalIncidentPing, setCriticalIncidentPing] = useState(true);

  // Save notification state
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 2500);
  };

  const handleResetDefaults = () => {
    resetDemoState();
    setAutoPreempt(true);
    setLeadTime('30s');
    setCrossHold('20s');
    setOpticalFailSafe(true);
    setFreshnessWindow('15m');
    setStaleDecayPenalty(true);
    setAudioExpiringWarning(true);
    setOneTapQuickMode(true);
    setRankingStrategy('balanced');
    setTriageRadius('25km');
    setAutoStreamVitals(true);
    setStreamRate('20Hz');
    setOfflineCache(true);
    setSimSpeed('1.0x');
    setSirenOverrideSound(true);
    setHapticFeedback(true);
    setCriticalIncidentPing(true);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative selection:bg-[#22E06B]/20 selection:text-[#22E06B]">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[550px] h-[550px] bg-indigo-500/[0.025] rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[500px] h-[500px] bg-[#22E06B]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto space-y-8 pb-24">
        {/* Header (Clean & Text-Light) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-950/40 text-indigo-300 text-[11px] font-mono tracking-widest uppercase mb-2">
              <Sliders className="w-3 h-3 text-indigo-400" />
              <span>COMMAND PARAMETERS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              System Settings
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Sector 01 Alpha • Real-time operational thresholds
            </p>
          </div>

          {/* Action Buttons Top Right */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetDefaults}
              type="button"
              className="px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              type="button"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#17CB5C] to-[#22E06B] hover:brightness-105 active:scale-95 text-[#051A0E] text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,224,107,0.3)] transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              <span>Save Parameters</span>
            </button>
          </div>
        </div>

        {/* Global Save Toast */}
        {showSavedToast && (
          <div className="rounded-xl border border-[#22E06B]/40 bg-[#0E271B]/95 p-3 text-xs font-mono text-[#22E06B] flex items-center justify-between shadow-[0_0_20px_rgba(34,224,107,0.25)] animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" strokeWidth={2.5} />
              <span>Parameters synchronized across 12 edge nodes</span>
            </div>
            <span className="text-[10px] text-slate-400">Latency: 12.4ms</span>
          </div>
        )}

        {/* Grid of Chromatic Glass Effect Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ======================================================== */}
          {/* CARD 1: CORRIDOR AUTOMATION (EMERALD) */}
          {/* ======================================================== */}
          <div className="rounded-[22px] bg-gradient-to-b from-[#091E13]/90 to-[#070D15]/90 border border-[#22E06B]/35 shadow-[0_0_25px_rgba(34,224,107,0.08)] p-6 backdrop-blur-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/40 flex items-center justify-center text-[#22E06B] shadow-sm">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-sans">
                    Corridor Automation
                  </h3>
                  <span className="text-[10px] font-mono text-[#22E06B]">
                    Traffic Preemption Engine
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[9px] font-mono font-semibold">
                ACTIVE
              </span>
            </div>

            {/* Toggle 1: Autonomous Preemption */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-white block">
                  Autonomous Preemption
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Auto-engage green wave on priority 1 calls
                </span>
              </div>
              <button
                onClick={() => setAutoPreempt(!autoPreempt)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  autoPreempt ? 'bg-[#22E06B] shadow-[0_0_10px_#22E06B]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoPreempt ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Segmented Pill: Lead Time Window */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">Preemption Lead Window</span>
                <span className="font-mono text-[#22E06B]">{leadTime}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['15s', '30s', '45s', '60s'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setLeadTime(t)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      leadTime === t
                        ? 'bg-[#22E06B]/20 border-[#22E06B] text-[#22E06B] font-bold shadow-[0_0_10px_rgba(34,224,107,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Segmented Pill: Cross-Traffic Hold */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">Cross-Street Hold Buffer</span>
                <span className="font-mono text-[#22E06B]">{crossHold}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['10s', '20s', '30s'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setCrossHold(s)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      crossHold === s
                        ? 'bg-[#22E06B]/20 border-[#22E06B] text-[#22E06B] font-bold shadow-[0_0_10px_rgba(34,224,107,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: Optical Backup */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">
                  Optical Receiver Fail-Safe
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Fallback to strobe sensor if edge network drops
                </span>
              </div>
              <button
                onClick={() => setOpticalFailSafe(!opticalFailSafe)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  opticalFailSafe ? 'bg-[#22E06B]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    opticalFailSafe ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 2: BED FRESHNESS & SLAS (AMBER) */}
          {/* ======================================================== */}
          <div className="rounded-[22px] bg-gradient-to-b from-[#181108]/90 to-[#070D15]/90 border border-[#F5A524]/35 shadow-[0_0_25px_rgba(245,165,36,0.08)] p-6 backdrop-blur-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#221609] border border-[#F5A524]/40 flex items-center justify-center text-[#F5A524] shadow-sm">
                  <BedDouble className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-sans">
                    Bed Freshness SLAs
                  </h3>
                  <span className="text-[10px] font-mono text-[#F5A524]">
                    Hospital Inventory Decay
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-[#F5A524]/30 bg-[#221609] text-[#F5A524] text-[9px] font-mono font-semibold">
                ENFORCED
              </span>
            </div>

            {/* Segmented Pill: Freshness Window */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">SLA Staleness Threshold</span>
                <span className="font-mono text-[#F5A524]">{freshnessWindow}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['10m', '15m', '20m'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setFreshnessWindow(w)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      freshnessWindow === w
                        ? 'bg-[#F5A524]/20 border-[#F5A524] text-[#F5A524] font-bold shadow-[0_0_10px_rgba(245,165,36,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {w} {w === '15m' && '(Std)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle 1: Stale Bed Decay Penalty */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-white block">
                  Stale Facility Triage Penalty
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Drop ranking if beds not validated &gt; 15 min
                </span>
              </div>
              <button
                onClick={() => setStaleDecayPenalty(!staleDecayPenalty)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  staleDecayPenalty ? 'bg-[#F5A524] shadow-[0_0_10px_#F5A524]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    staleDecayPenalty ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Audio Warning on Expiring */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-white block">
                  Nurse Station SLA Chime
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Subtle audio reminder at minute 12 of decay
                </span>
              </div>
              <button
                onClick={() => setAudioExpiringWarning(!audioExpiringWarning)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  audioExpiringWarning ? 'bg-[#F5A524]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    audioExpiringWarning ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: One-Tap Quick Mode */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">
                  One-Tap "Still Accurate"
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Enable rapid confirmation without changing counts
                </span>
              </div>
              <button
                onClick={() => setOneTapQuickMode(!oneTapQuickMode)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  oneTapQuickMode ? 'bg-[#F5A524]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    oneTapQuickMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 3: DISPATCH & TRIAGE (SKY BLUE) */}
          {/* ======================================================== */}
          <div className="rounded-[22px] bg-gradient-to-b from-[#091524]/90 to-[#070D15]/90 border border-[#38BDF8]/35 shadow-[0_0_25px_rgba(56,189,248,0.08)] p-6 backdrop-blur-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0A1E2F] border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] shadow-sm">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-sans">
                    Dispatch Algorithm
                  </h3>
                  <span className="text-[10px] font-mono text-[#38BDF8]">
                    Multi-Factor Facility Matcher
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-[#38BDF8]/30 bg-[#0A1E2F] text-[#38BDF8] text-[9px] font-mono font-semibold">
                AI SCORER
              </span>
            </div>

            {/* Ranking Strategy */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">Triage Priority Weight</span>
                <span className="font-mono text-[#38BDF8] capitalize">{rankingStrategy}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['balanced', 'fastest', 'capacity'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setRankingStrategy(st)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono capitalize transition-all cursor-pointer border ${
                      rankingStrategy === st
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Triage Radius */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">Emergency Catchment Radius</span>
                <span className="font-mono text-[#38BDF8]">{triageRadius}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['15km', '25km', '40km'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTriageRadius(r)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      triageRadius === r
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: Auto Stream Vitals */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">
                  Field Vitals Auto-Broadcast
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Live telemetry stream from Ambulance A-402
                </span>
              </div>
              <button
                onClick={() => setAutoStreamVitals(!autoStreamVitals)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  autoStreamVitals ? 'bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    autoStreamVitals ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD 4: TELEMETRY & NETWORK EDGE (PURPLE) */}
          {/* ======================================================== */}
          <div className="rounded-[22px] bg-gradient-to-b from-[#150D24]/90 to-[#070D15]/90 border border-[#C084FC]/35 shadow-[0_0_25px_rgba(192,132,252,0.08)] p-6 backdrop-blur-xl space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#221235] border border-[#C084FC]/40 flex items-center justify-center text-[#C084FC] shadow-sm">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-sans">
                    Edge Telemetry
                  </h3>
                  <span className="text-[10px] font-mono text-[#C084FC]">
                    Low-Latency Grid Nodes
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-[#C084FC]/30 bg-[#221235] text-[#C084FC] text-[9px] font-mono font-semibold">
                12.4 MS
              </span>
            </div>

            {/* Stream Rate */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">GPS & Signal Refresh Frequency</span>
                <span className="font-mono text-[#C084FC]">{streamRate}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['10Hz', '20Hz', '50Hz'] as const).map((hz) => (
                  <button
                    key={hz}
                    onClick={() => setStreamRate(hz)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      streamRate === hz
                        ? 'bg-[#C084FC]/20 border-[#C084FC] text-[#C084FC] font-bold shadow-[0_0_10px_rgba(192,132,252,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {hz}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Speed */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white font-medium">Simulation Clock Speed</span>
                <span className="font-mono text-[#C084FC]">{simSpeed}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['1.0x', '1.5x', '2.0x'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSimSpeed(spd)}
                    type="button"
                    className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      simSpeed === spd
                        ? 'bg-[#C084FC]/20 border-[#C084FC] text-[#C084FC] font-bold shadow-[0_0_10px_rgba(192,132,252,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: Offline Local Cache */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">
                  Edge Memory Local Cache
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Preserve last-known signal states on connectivity loss
                </span>
              </div>
              <button
                onClick={() => setOfflineCache(!offlineCache)}
                type="button"
                className={`w-12 h-6 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  offlineCache ? 'bg-[#C084FC] shadow-[0_0_10px_#C084FC]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    offlineCache ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD 5: AUDIO & ALERTS (CRIMSON/RED - FULL WIDTH STRIP) */}
        {/* ======================================================== */}
        <div className="rounded-[22px] bg-gradient-to-r from-[#180A0E]/90 via-[#1F0D13]/90 to-[#070D15]/90 border border-[#FF4D4D]/35 shadow-[0_0_25px_rgba(255,77,77,0.08)] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#270E14] border border-[#FF4D4D]/40 flex items-center justify-center text-[#FF4D4D]">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white font-sans">
                  Critical Audio & Alert Signals
                </h3>
                <span className="text-[10px] font-mono text-[#FF4D4D]">
                  High-Acuity Priority Chimes
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full border border-[#FF4D4D]/30 bg-[#270E14] text-[#FF4D4D] text-[9px] font-mono font-semibold">
              CRITICAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Siren Audio Override */}
            <div className="flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">Siren Sound</span>
                <span className="text-[10px] text-slate-400 font-mono">Audio chime on lock</span>
              </div>
              <button
                onClick={() => setSirenOverrideSound(!sirenOverrideSound)}
                type="button"
                className={`w-11 h-5 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  sirenOverrideSound ? 'bg-[#FF4D4D]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    sirenOverrideSound ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Haptic Feedback */}
            <div className="flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">Tactile Vibration</span>
                <span className="text-[10px] text-slate-400 font-mono">Haptic on button press</span>
              </div>
              <button
                onClick={() => setHapticFeedback(!hapticFeedback)}
                type="button"
                className={`w-11 h-5 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  hapticFeedback ? 'bg-[#FF4D4D]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hapticFeedback ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Incident Paging */}
            <div className="flex items-center justify-between bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
              <div>
                <span className="text-xs font-medium text-white block">Automated Paging</span>
                <span className="text-[10px] text-slate-400 font-mono">Cath lab notification</span>
              </div>
              <button
                onClick={() => setCriticalIncidentPing(!criticalIncidentPing)}
                type="button"
                className={`w-11 h-5 rounded-full transition-all p-0.5 cursor-pointer relative ${
                  criticalIncidentPing ? 'bg-[#FF4D4D]' : 'bg-white/[0.1]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    criticalIncidentPing ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
