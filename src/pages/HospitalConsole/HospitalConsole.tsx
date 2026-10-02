import React from 'react';
import { HospitalMetricsHeader } from '../../components/hospital/HospitalMetricsHeader';
import { IncomingRequestHero } from '../../components/hospital/IncomingRequestHero';
import { HospitalSideCards } from '../../components/hospital/HospitalSideCards';
import { ArrivalPreparationStrip } from '../../components/hospital/ArrivalPreparationStrip';
import { useLifeLane } from '../../context/LifeLaneContext';

export function HospitalConsole() {
  const {
    request,
    bedsHeldCount,
    corridor,
    acceptRequest,
    rejectRequest,
  } = useLifeLane();

  // Map request.status to IncomingRequestHero's expected prop
  const requestState =
    request.status === 'accepted'
      ? 'accepted'
      : request.status === 'rejected'
      ? 'rejected'
      : 'pending';

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[600px] h-[600px] bg-[#F5A524]/[0.025] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[550px] h-[550px] bg-[#22E06B]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="p-6 lg:p-8 max-w-[1520px] w-full mx-auto space-y-6 flex-1 flex flex-col">
        {/* Header & Metrics */}
        <HospitalMetricsHeader
          incomingCount={requestState === 'pending' ? 1 : 0}
          bedsHeldCount={bedsHeldCount}
        />

        {/* Main Area: Left/Center Hero Incoming Request + Right Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Dominant Hero Request Card (approx 65% width) */}
          <div className="lg:col-span-8 flex flex-col">
            <IncomingRequestHero
              requestState={requestState}
              onAccept={acceptRequest}
              onReject={rejectRequest}
            />
          </div>

          {/* Right Column Status Cards (approx 35% width) */}
          <div className="lg:col-span-4 flex flex-col">
            <HospitalSideCards requestState={requestState} />
          </div>
        </div>

        {/* Bottom Full-width Strip: Arrival Preparation */}
        <div className="pt-1 pb-8">
          <ArrivalPreparationStrip />
        </div>
      </div>
    </div>
  );
}
