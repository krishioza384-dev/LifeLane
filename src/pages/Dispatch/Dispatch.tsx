import React, { useState } from 'react';
import { PatientRequestCard } from '../../components/dispatch/PatientRequestCard';
import { HospitalRankingCard } from '../../components/dispatch/HospitalRankingCard';
import { RouteMapCanvas } from '../../components/dispatch/RouteMapCanvas';

interface DispatchProps {
  onSwitchScreen?: (screen: 'nurse' | 'dispatch') => void;
}

export function Dispatch({ onSwitchScreen }: DispatchProps) {
  const [selectedHospitalId, setSelectedHospitalId] = useState('sunrise');
  const [requestNotice, setRequestNotice] = useState<string | null>(null);

  const handleRequestSent = (hospitalName: string) => {
    setRequestNotice(`Incident request dispatched to ${hospitalName}`);
    setTimeout(() => {
      setRequestNotice(null);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[600px] h-[600px] bg-[#22E06B]/[0.025] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[550px] h-[550px] bg-[#38BDF8]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="p-6 lg:p-8 max-w-[1520px] w-full mx-auto space-y-6 flex-1 flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-[46px] font-serif font-normal text-white tracking-[-0.015em] leading-tight">
              Dispatch
            </h1>
            <p className="mt-2 text-sm text-[#94A3B8] font-normal flex items-center gap-2 flex-wrap">
              <span>Unit A-402</span>
              <span className="text-[#64748B]">·</span>
              <span className="text-[#FF4D4D] font-medium">Critical patient</span>
              <span className="text-[#64748B]">·</span>
              <span>Station Road junction</span>
            </p>
          </div>

          {/* Right Header Status Chips */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#070D15]/80 text-xs font-mono text-slate-300">
              <span className="text-[#64748B]">STATUS</span>
              <span className="text-[#F5A524] font-semibold">Triage Active</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-[#070D15]/80 text-xs font-mono text-slate-300">
              <span className="text-[#64748B]">ZONE</span>
              <span className="text-white font-medium">Sector 4</span>
            </div>
          </div>
        </div>

        {/* Global Feedback Banner if request dispatched */}
        {requestNotice && (
          <div className="rounded-xl border border-[#22E06B]/30 bg-[#0E271B]/90 p-3.5 text-xs font-mono text-[#22E06B] flex items-center justify-between shadow-[0_0_20px_rgba(34,224,107,0.15)] animate-in fade-in slide-in-from-top-2">
            <span>✓ {requestNotice}</span>
            <span className="text-[10px] text-slate-400">Transmitted over LifeLane Network</span>
          </div>
        )}

        {/* Main 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column (5 cols on lg, 6 cols on xl): Patient Card + Hospital Rankings */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-5">
            {/* Top Patient Request Card */}
            <PatientRequestCard />

            {/* Hospital Ranking Cards List */}
            <HospitalRankingCard
              selectedHospitalId={selectedHospitalId}
              onSelectHospital={setSelectedHospitalId}
              onRequestSent={handleRequestSent}
            />
          </div>

          {/* Right Column (7 cols on lg, 7 cols on xl): Interactive Simulated City Map Canvas */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col min-h-[520px]">
            <RouteMapCanvas selectedHospitalId={selectedHospitalId} />
          </div>
        </div>
      </div>
    </div>
  );
}
