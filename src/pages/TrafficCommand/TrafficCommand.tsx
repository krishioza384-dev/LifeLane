import React, { useState } from 'react';
import { TrafficHeader } from '../../components/traffic/TrafficHeader';
import { TrafficMap } from '../../components/traffic/TrafficMap';
import { TrafficCommandPanel } from '../../components/traffic/TrafficCommandPanel';
import { TrafficEventFeed } from '../../components/traffic/TrafficEventFeed';
import { TrafficAnalyticsView } from '../../components/traffic/TrafficAnalyticsView';
import { TrafficLogsView } from '../../components/traffic/TrafficLogsView';

export function TrafficCommand() {
  const [activeView, setActiveView] = useState<'live' | 'analytics' | 'logs'>('live');

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Subtle ambient lighting layers */}
      <div className="fixed top-0 left-60 w-[600px] h-[600px] bg-[#22E06B]/[0.025] rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-[30%] right-[10%] w-[550px] h-[550px] bg-[#38BDF8]/[0.02] rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Page Content */}
      <div className="p-6 lg:p-8 max-w-[1520px] w-full mx-auto space-y-6 flex-1 flex flex-col">
        {/* Header & Tabs */}
        <TrafficHeader
          activeView={activeView}
          onViewChange={(v) => setActiveView(v)}
        />

        {/* Main Area based on active view */}
        {activeView === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
            {/* Large Live Map (approx 65% width) */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-[580px]">
              <TrafficMap />
            </div>

            {/* Right Command Panel (approx 35% width) */}
            <div className="lg:col-span-4 flex flex-col">
              <TrafficCommandPanel />
            </div>
          </div>
        )}

        {activeView === 'analytics' && <TrafficAnalyticsView />}

        {activeView === 'logs' && <TrafficLogsView />}

        {/* Bottom Live Event Feed */}
        <div className="pt-2 pb-8">
          <TrafficEventFeed />
        </div>
      </div>
    </div>
  );
}
