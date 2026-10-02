import React from 'react';
import { FreshnessCard } from '../../components/nurse/FreshnessCard';
import { BedCard } from '../../components/nurse/BedCard';
import { RecentChangesPanel } from '../../components/nurse/RecentChangesPanel';
import { useLifeLane } from '../../context/LifeLaneContext';

export function NurseBedUpdate() {
  const {
    beds,
    bedsHeldCount,
    updatedMinutesAgo,
    isJustUpdated,
    changeLogs,
    updateBed,
    confirmAccurate,
  } = useLifeLane();

  return (
    <div className="flex-1 flex flex-col justify-start relative overflow-x-hidden selection:bg-[#22E06B]/20 selection:text-[#22E06B]">
      {/* Subtle background ambient glow */}
      <div className="fixed top-0 left-0 w-[550px] h-[550px] bg-[#22E06B]/[0.025] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[20%] right-[10%] w-[500px] h-[500px] bg-[#38BDF8]/[0.02] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-8 py-5 flex flex-col flex-1">
        {/* Page Title Area: Bed availability and ● Sunrise General Hospital • Primary Care Center */}
        <div className="mt-2 mb-7">
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-[-0.01em] leading-tight">
            Bed availability
          </h1>

          <div className="flex items-center gap-2.5 mt-2.5 text-sm text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_8px_#22E06B] shrink-0" />
            <span className="text-slate-200 font-normal">Sunrise General Hospital</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#64748B] font-mono text-xs sm:text-sm">Primary Care Center</span>
          </div>
        </div>

        {/* Main Content Grid: Left Freshness Card + Right Bed Availability Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pb-10">
          {/* Left Column: Freshness SLA Card */}
          <div className="lg:col-span-4 flex flex-col">
            <FreshnessCard
              updatedMinutesAgo={updatedMinutesAgo}
              onConfirmAccurate={confirmAccurate}
              isJustUpdated={isJustUpdated}
            />
          </div>

          {/* Right Column: Bed Availability Cards & Recent Changes */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Row 1: 3 cards (ICU, Ventilator, Oxygen) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* ICU Card - Amber Hairline Border */}
              <BedCard
                title="ICU"
                count={beds.icu}
                borderColorClass="border-[#F5A524]/40"
                badge={
                  bedsHeldCount > 0 ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#F5A524]/30 bg-[#161208]/80 text-[#F5A524] text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A524]" />
                      <span>{bedsHeldCount} held for ambulance</span>
                    </div>
                  ) : undefined
                }
                onIncrement={() => updateBed('icu', 1, 'ICU')}
                onDecrement={() => updateBed('icu', -1, 'ICU')}
              />

              {/* Ventilator Card */}
              <BedCard
                title="Ventilator"
                count={beds.ventilator}
                onIncrement={() => updateBed('ventilator', 1, 'Ventilator')}
                onDecrement={() => updateBed('ventilator', -1, 'Ventilator')}
              />

              {/* Oxygen Card */}
              <BedCard
                title="Oxygen"
                count={beds.oxygen}
                onIncrement={() => updateBed('oxygen', 1, 'Oxygen')}
                onDecrement={() => updateBed('oxygen', -1, 'Oxygen')}
              />
            </div>

            {/* Row 2: 2 cards (Cardiac, Burns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cardiac Card */}
              <BedCard
                title="Cardiac"
                count={beds.cardiac}
                onIncrement={() => updateBed('cardiac', 1, 'Cardiac')}
                onDecrement={() => updateBed('cardiac', -1, 'Cardiac')}
              />

              {/* Burns Card - Subdued 0 with None Free Badge */}
              <BedCard
                title="Burns"
                count={beds.burns}
                isMutedZero={true}
                badge={
                  beds.burns === 0 ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#FF4D4D]/30 bg-[#1A0B0F]/80 text-[#FF4D4D] text-xs font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />
                      <span>None free</span>
                    </div>
                  ) : undefined
                }
                onIncrement={() => updateBed('burns', 1, 'Burns')}
                onDecrement={() => updateBed('burns', -1, 'Burns')}
              />
            </div>

            {/* Row 3: Recent Changes Panel */}
            <RecentChangesPanel logs={changeLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}
