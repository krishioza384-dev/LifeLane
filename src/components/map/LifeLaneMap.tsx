import React from 'react';
import { Plus, Minus, Compass, LocateFixed, Navigation, ShieldCheck } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';
import { useMapTransform } from './hooks/useMapTransform';
import {
  MAP_VIEWBOX,
  AMBULANCE_ORIGIN,
  EMERGENCY_HOSPITALS,
  EMERGENCY_ROUTES,
  TRAFFIC_SIGNALS,
  CITY_PARCELS,
  RIVER_PATH,
  RIVER_BRIDGES,
  HospitalNode,
} from './data/emergencyZoneData';

export interface LifeLaneMapProps {
  mode?: 'overview' | 'dispatch' | 'traffic';
  selectedHospitalId?: string;
  onSelectHospital?: (id: string) => void;
  showHospitals?: boolean;
  showSignals?: boolean;
  showControls?: boolean;
  className?: string;
}

export function LifeLaneMap({
  mode = 'overview',
  selectedHospitalId = 'sunrise',
  onSelectHospital,
  showHospitals = true,
  showSignals,
  showControls = true,
  className = '',
}: LifeLaneMapProps) {
  const { corridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  // In traffic mode, signals are always shown; otherwise respect prop
  const renderSignals = showSignals !== undefined ? showSignals : mode === 'traffic';

  // Pan, Zoom & Recenter hook
  const {
    containerRef,
    zoom,
    transformString,
    zoomIn,
    zoomOut,
    recenter,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
  } = useMapTransform({
    minZoom: 0.8,
    maxZoom: 2.2,
    zoomStep: 0.2,
    initialZoom: 1.0,
  });

  // Active Route
  const activeRoute = EMERGENCY_ROUTES[selectedHospitalId] || EMERGENCY_ROUTES.sunrise;
  const isTargetCorridorActive = isCorridorActive && selectedHospitalId === 'sunrise';

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full h-full min-h-[420px] bg-[#050A10] overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Floating Tactile Navigation & Zoom Controls */}
      {showControls && (
        <div className="absolute top-3.5 right-3.5 z-30 flex flex-col gap-1.5 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomIn();
            }}
            type="button"
            title="Zoom in"
            aria-label="Zoom in"
            className="w-8 h-8 rounded-xl bg-[#07131D]/90 hover:bg-[#0E2333] active:scale-95 border border-white/[0.1] text-slate-200 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoomOut();
            }}
            type="button"
            title="Zoom out"
            aria-label="Zoom out"
            className="w-8 h-8 rounded-xl bg-[#07131D]/90 hover:bg-[#0E2333] active:scale-95 border border-white/[0.1] text-slate-200 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              recenter();
            }}
            type="button"
            title="Recenter view"
            aria-label="Recenter view"
            className="w-8 h-8 rounded-xl bg-[#07131D]/90 hover:bg-[#0E2333] active:scale-95 border border-white/[0.1] text-[#22E06B] flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mode & Scale Overlay Indicator (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-30 pointer-events-none flex items-center gap-3">
        <div className="flex flex-col items-end">
          <div className="w-14 h-1 border-b-2 border-r-2 border-l-2 border-white/40" />
          <span className="text-[9px] font-mono text-slate-400 mt-0.5">500 m</span>
        </div>
        <div className="px-2 py-0.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-[9px] font-mono text-slate-400 backdrop-blur-md">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div
        className="w-full h-full min-h-[420px] transition-transform duration-150 ease-out origin-center"
        style={{ transform: transformString }}
      >
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Emerald Green Corridor Glow */}
            <filter id="llCorridorGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22E06B" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#22E06B" floodOpacity="0.4" />
            </filter>

            {/* Blue Route Glow */}
            <filter id="llRouteBlueGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.8" />
            </filter>

            {/* Signal Glow */}
            <filter id="llSignalGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22E06B" floodOpacity="0.85" />
            </filter>

            {/* Bridge Drop Shadow */}
            <filter id="llBridgeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* 1. Base Landmass Background */}
          <rect width="100%" height="100%" fill="var(--map-bg, #050A10)" />

          {/* 2. City Block Parcels */}
          <g fill="var(--map-parcel, #09131F)" stroke="var(--map-parcel-border, #0E1E2E)" strokeWidth="0.8" opacity="0.85">
            {CITY_PARCELS.map((pointsStr, idx) => (
              <polygon key={idx} points={pointsStr} />
            ))}
          </g>

          {/* 3. Urban Open Green Spaces */}
          <g fill="var(--emerald-bg, #091B13)" stroke="var(--emerald-border, rgba(34,224,107,0.25))" strokeWidth="0.8" opacity="0.7">
            <path d="M 60 170 C 95 170, 115 195, 105 235 C 95 265, 60 270, 50 250 Z" />
            <path d="M 610 80 C 660 80, 680 110, 670 145 C 650 155, 600 145, 595 120 Z" />
            <path d="M 320 440 C 355 440, 375 465, 365 505 C 345 515, 310 510, 305 480 Z" />
          </g>

          {/* 4. River / Waterway */}
          <g>
            <path
              d={RIVER_PATH}
              stroke="var(--map-water, #081422)"
              strokeWidth="52"
              strokeLinecap="round"
            />
            <path
              d={RIVER_PATH}
              stroke="var(--map-water, #0D1E32)"
              strokeWidth="34"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>

          {/* 5. Street Grid: Secondary Roads */}
          <g stroke="var(--map-road-secondary, #122438)" strokeWidth="2.2" strokeLinecap="round">
            {/* Horizontal Grid */}
            <line x1="-20" y1="90" x2="1020" y2="120" />
            <line x1="-20" y1="210" x2="1020" y2="240" />
            <line x1="-20" y1="360" x2="1020" y2="390" />
            <line x1="-20" y1="510" x2="1020" y2="530" />

            {/* Vertical Grid */}
            <line x1="150" y1="-20" x2="120" y2="670" />
            <line x1="280" y1="-20" x2="250" y2="670" />
            <line x1="410" y1="-20" x2="380" y2="670" />
            <line x1="680" y1="-20" x2="650" y2="670" />
            <line x1="820" y1="-20" x2="790" y2="670" />
          </g>

          {/* 6. Major Arterial Boulevards */}
          <g stroke="var(--map-road, #18324C)" strokeWidth="5.5" strokeLinecap="round">
            {/* Grand Ave */}
            <path d="M -20 160 C 260 190, 600 240, 1020 270" />
            {/* Central Parkway */}
            <path d="M -20 440 C 380 400, 680 340, 1020 310" />
            {/* Bayview Highway */}
            <path d="M 760 -20 C 750 220, 730 440, 710 670" />
          </g>

          {/* 7. Bridges over River */}
          <g filter="url(#llBridgeShadow)">
            {RIVER_BRIDGES.map((b, idx) => (
              <g key={idx}>
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="var(--map-bg, #0E1A29)" strokeWidth={b.width + 4} strokeLinecap="round" />
                <line x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="var(--map-road, #18324C)" strokeWidth={b.width} strokeLinecap="round" />
              </g>
            ))}
          </g>

          {/* 8. Readable Street Name Labels */}
          <g fill="var(--text-dim, #64748B)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.08em">
            <text x="80" y="152">GRAND AVE</text>
            <text x="75" y="432">STATION RD</text>
            <text x="290" y="270" transform="rotate(76 290,270)">METRO PKWY</text>
            <text x="770" y="470" transform="rotate(90 770,470)">BAYVIEW HWY</text>
            <text x="710" y="260">SUNRISE BLVD</text>
            <text x="470" y="220" fill="var(--sky-accent, #38BDF8)" fontSize="9">EAST RIVER</text>
          </g>

          {/* ======================================================== */}
          {/* 9. ACTIVE EMERGENCY ROUTE / GREEN CORRIDOR */}
          {/* ======================================================== */}
          <g>
            {/* Outer halo / aura */}
            <path
              d={activeRoute.pathD}
              stroke={isTargetCorridorActive ? '#22E06B' : '#38BDF8'}
              strokeWidth={isTargetCorridorActive ? '16' : '10'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={isTargetCorridorActive ? '0.25' : '0.18'}
            />

            {/* Dark casing */}
            <path
              d={activeRoute.pathD}
              stroke={isTargetCorridorActive ? '#082216' : '#071A28'}
              strokeWidth={isTargetCorridorActive ? '8' : '6'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active Vibrant Core */}
            <path
              d={activeRoute.pathD}
              stroke={isTargetCorridorActive ? '#22E06B' : '#38BDF8'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={isTargetCorridorActive ? 'url(#llCorridorGlow)' : 'url(#llRouteBlueGlow)'}
            />

            {/* Turn Waypoints along Route */}
            {activeRoute.waypoints.map((wp, idx) => (
              <circle
                key={idx}
                cx={wp.x}
                cy={wp.y}
                r="3.5"
                fill="#FFFFFF"
                stroke={isTargetCorridorActive ? '#22E06B' : '#38BDF8'}
                strokeWidth="1.8"
              />
            ))}

            {/* Directional Chevron Arrows (when corridor active) */}
            {isTargetCorridorActive && (
              <g stroke="#082216" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 360 395 L 366 391 L 360 387" />
                <path d="M 550 305 L 556 301 L 550 297" />
                <path d="M 640 245 L 646 241 L 640 237" />
              </g>
            )}
          </g>

          {/* ======================================================== */}
          {/* 10. TRAFFIC SIGNALS OVERLAY */}
          {/* ======================================================== */}
          {renderSignals && (
            <g>
              {TRAFFIC_SIGNALS.map((sig) => {
                if (sig.type === 'corridor') {
                  const isPreempted = isCorridorActive || isCorridorReady;
                  return (
                    <g key={sig.id} transform={`translate(${sig.x}, ${sig.y})`}>
                      <circle cx="0" cy="0" r="13" fill={isPreempted ? '#22E06B' : '#38BDF8'} fillOpacity="0.18" />
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill="#0A2117"
                        stroke={isPreempted ? '#22E06B' : '#38BDF8'}
                        strokeWidth="2.2"
                        filter={isPreempted ? 'url(#llSignalGlow)' : undefined}
                      />
                      <circle cx="0" cy="0" r="3" fill={isPreempted ? '#22E06B' : '#38BDF8'} />
                    </g>
                  );
                }

                if (sig.type === 'cross_hold') {
                  return (
                    <g key={sig.id} transform={`translate(${sig.x}, ${sig.y})`}>
                      <circle cx="0" cy="0" r="10" fill="#F5A524" fillOpacity="0.18" />
                      <circle cx="0" cy="0" r="6.5" fill="#231709" stroke="#F5A524" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2.5" fill="#F5A524" />
                    </g>
                  );
                }

                if (sig.type === 'diversion') {
                  return (
                    <g key={sig.id} transform={`translate(${sig.x}, ${sig.y})`}>
                      <circle cx="0" cy="0" r="10" fill="#FF4D4D" fillOpacity="0.2" />
                      <circle cx="0" cy="0" r="6.5" fill="#240D12" stroke="#FF4D4D" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2.5" fill="#FF4D4D" />
                    </g>
                  );
                }

                // Normal signal
                return (
                  <g key={sig.id} transform={`translate(${sig.x}, ${sig.y})`}>
                    <circle cx="0" cy="0" r="8" fill="#38BDF8" fillOpacity="0.15" />
                    <circle cx="0" cy="0" r="5.5" fill="#091A26" stroke="#38BDF8" strokeWidth="1.6" />
                    <circle cx="0" cy="0" r="2" fill="#38BDF8" />
                  </g>
                );
              })}
            </g>
          )}

          {/* ======================================================== */}
          {/* 11. 4 REGIONAL HOSPITAL DESTINATIONS */}
          {/* ======================================================== */}
          {showHospitals && (
            <g>
              {EMERGENCY_HOSPITALS.map((hosp) => {
                const isSelected = hosp.id === selectedHospitalId;
                const isSunrise = hosp.id === 'sunrise';
                const isCorridorHero = isSunrise && isCorridorActive;

                return (
                  <g
                    key={hosp.id}
                    transform={`translate(${hosp.x}, ${hosp.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectHospital?.(hosp.id);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Concentric Halo for Selected or Active Target */}
                    {isSelected && (
                      <circle
                        cx="0"
                        cy="0"
                        r="24"
                        fill={isCorridorHero ? '#22E06B' : isSelected ? '#38BDF8' : '#22E06B'}
                        fillOpacity="0.2"
                      >
                        <animate attributeName="r" values="20;28;20" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Central Hospital Pin Circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r="14"
                      fill={isCorridorHero ? '#0E271B' : isSelected ? '#0A1E2F' : '#07111B'}
                      stroke={
                        isCorridorHero
                          ? '#22E06B'
                          : isSelected
                          ? '#38BDF8'
                          : hosp.status === 'stale'
                          ? '#FF4D4D'
                          : hosp.status === 'available'
                          ? '#F5A524'
                          : '#22E06B'
                      }
                      strokeWidth={isSelected ? '2.2' : '1.5'}
                      filter={isSelected ? (isCorridorHero ? 'url(#llCorridorGlow)' : 'url(#llRouteBlueGlow)') : undefined}
                    />

                    {/* Red Cross Icon inside circle */}
                    <path
                      d="M -4 0 L 4 0 M 0 -4 L 0 4"
                      stroke={
                        isCorridorHero
                          ? '#22E06B'
                          : isSelected
                          ? '#38BDF8'
                          : hosp.status === 'stale'
                          ? '#FF4D4D'
                          : hosp.status === 'available'
                          ? '#F5A524'
                          : '#22E06B'
                      }
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Hospital Name Badge (Always visible, perfectly positioned) */}
                    <g transform={`translate(${hosp.labelOffsetX}, ${hosp.labelOffsetY})`}>
                      <rect
                        x="0"
                        y="0"
                        width={hosp.name.length > 22 ? 140 : 120}
                        height="30"
                        rx="8"
                        fill="#07121B"
                        fillOpacity="0.95"
                        stroke={
                          isSelected
                            ? isCorridorHero
                              ? '#22E06B'
                              : '#38BDF8'
                            : 'rgba(255,255,255,0.12)'
                        }
                        strokeWidth={isSelected ? '1.4' : '0.8'}
                        className="group-hover:stroke-white/40 transition-colors"
                      />
                      <text
                        x="10"
                        y="14"
                        fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                        fontSize="10"
                        fontFamily="Inter, sans-serif"
                        fontWeight={isSelected ? '700' : '600'}
                      >
                        {hosp.shortName}
                      </text>
                      <text
                        x="10"
                        y="24"
                        fill={
                          isCorridorHero
                            ? '#22E06B'
                            : isSelected
                            ? '#38BDF8'
                            : hosp.status === 'stale'
                            ? '#FF4D4D'
                            : '#94A3B8'
                        }
                        fontSize="8"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        {isCorridorHero
                          ? `● 6m CORRIDOR`
                          : isSelected
                          ? `● ${hosp.etaMinutes}m ETA`
                          : hosp.badge}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}

          {/* ======================================================== */}
          {/* 12. AMBULANCE A-402 MARKER (ORIGIN) */}
          {/* ======================================================== */}
          <g transform={`translate(${AMBULANCE_ORIGIN.x}, ${AMBULANCE_ORIGIN.y})`}>
            {/* Live pulsing radar beacon */}
            <circle cx="0" cy="0" r="18" fill="#22E06B" fillOpacity="0.25">
              <animate attributeName="r" values="12;26;12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Central vehicle node */}
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="#0A2417"
              stroke="#22E06B"
              strokeWidth="2.2"
              filter="url(#llCorridorGlow)"
            />

            {/* Directional compass heading arrow */}
            <path d="M 0 -6 L 4 3 L 0 1 L -4 3 Z" fill="#22E06B" />

            {/* Ambulance Callsign Pill */}
            <g transform="translate(14, -14)">
              <rect
                x="0"
                y="0"
                width="84"
                height="32"
                rx="8"
                fill="#07121B"
                fillOpacity="0.95"
                stroke="#22E06B"
                strokeWidth="1"
              />
              <text
                x="8"
                y="14"
                fill="#FFFFFF"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
              >
                ✱ {AMBULANCE_ORIGIN.id}
              </text>
              <text
                x="8"
                y="25"
                fill="#22E06B"
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {isTargetCorridorActive ? '6 MIN ETA' : `${activeRoute.normalEtaMin} MIN ETA`}
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
