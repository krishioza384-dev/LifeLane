import React from 'react';
import { Compass, Layers, Radio } from 'lucide-react';
import { LifeLaneMap } from '../map/LifeLaneMap';
import { EMERGENCY_HOSPITALS } from '../map/data/emergencyZoneData';

interface RouteMapCanvasProps {
  selectedHospitalId: string;
  onSelectHospital?: (id: string) => void;
}

export function RouteMapCanvas({
  selectedHospitalId,
  onSelectHospital,
}: RouteMapCanvasProps) {
  const currentHospital =
    EMERGENCY_HOSPITALS.find((h) => h.id === selectedHospitalId) || EMERGENCY_HOSPITALS[0];

  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-lg h-full min-h-[680px] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-10 mb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>LIVE ROUTE · EMERGENCY ZONE OPS</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-medium flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#22E06B] animate-ping" />
            <span>GPS LOCK</span>
          </div>
        </div>
      </div>

      {/* Cartographic Canvas Wrapper */}
      <div className="relative flex-1 rounded-xl bg-[#080E17] border border-white/[0.08] overflow-hidden my-2 shadow-inner select-none flex flex-col">
        {/* Floating Top Left Indicators */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2 pointer-events-none">
          <div className="w-7 h-7 rounded-lg bg-[#09121E]/90 border border-white/[0.1] flex items-center justify-center text-[#22E06B] backdrop-blur-md shadow-md">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#09121E]/90 border border-white/[0.1] text-[10px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md shadow-md">
            <Layers className="w-3 h-3 text-[#38BDF8]" />
            <span>INTERACTIVE ZONE</span>
          </div>
        </div>

        {/* LifeLaneMap Core Engine */}
        <LifeLaneMap
          mode="dispatch"
          selectedHospitalId={selectedHospitalId}
          onSelectHospital={onSelectHospital}
          showHospitals={true}
          showControls={true}
          className="flex-1"
        />
      </div>

      {/* Floating Route Information Card */}
      <div className="rounded-xl bg-[#09111C]/95 border border-white/[0.08] p-3.5 backdrop-blur-md z-10 mt-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
            ACTIVE INCIDENT ROUTE
          </span>
          <span className="px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[9px] font-mono">
            TAP MAP HOSPITAL TO SWITCH
          </span>
        </div>

        <h4 className="text-sm font-semibold text-white font-sans tracking-tight">
          {currentHospital.name}
        </h4>

        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-lg font-semibold text-[#22E06B]">
              {currentHospital.etaMinutes} min
            </span>
            <span className="text-xs text-[#94A3B8]">
              ({currentHospital.corridorEtaMinutes} min with corridor)
            </span>
          </div>
          <span className="text-base font-mono font-medium text-white">
            {currentHospital.distanceKm} km
          </span>
        </div>
      </div>
    </div>
  );
}
