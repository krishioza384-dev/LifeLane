import React from 'react';
import { HomeHeader } from '../../components/home/HomeHeader';
import { DynamicCorridorMap } from '../../components/home/DynamicCorridorMap';
import { ActiveOperationsPanel } from '../../components/home/ActiveOperationsPanel';
import { NetworkHealthCard } from '../../components/home/NetworkHealthCard';
import { RecentActivityCard } from '../../components/home/RecentActivityCard';

interface HomeOverviewProps {
  onNavigateToScreen?: (screen: 'nurse' | 'dispatch' | 'hospital' | 'traffic') => void;
}

export function HomeOverview({ onNavigateToScreen }: HomeOverviewProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[600px] h-[600px] bg-[#22E06B]/[0.025] rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[550px] h-[550px] bg-[#38BDF8]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="p-6 lg:p-8 max-w-[1520px] w-full mx-auto space-y-6 flex-1 flex flex-col">
        {/* Header & 4 Metrics */}
        <HomeHeader />

        {/* Center Main Section: Dynamic Corridor Map + Active Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Hero Map (approx 65% width) */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[540px]">
            <DynamicCorridorMap />
          </div>

          {/* Right Active Operations (approx 35% width) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <ActiveOperationsPanel
              onDeployCorridor={() => onNavigateToScreen?.('traffic')}
            />
          </div>
        </div>

        {/* Bottom Row: Network Health (42%) + Recent Activity (58%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pb-8">
          <div className="lg:col-span-5 flex flex-col">
            <NetworkHealthCard />
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <RecentActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
}
