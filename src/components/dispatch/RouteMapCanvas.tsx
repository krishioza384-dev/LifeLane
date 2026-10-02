import React, { useState } from 'react';
import { Plus, Minus, Compass, Layers, Navigation } from 'lucide-react';

interface RouteMapCanvasProps {
  selectedHospitalId: string;
}

export function RouteMapCanvas({ selectedHospitalId }: RouteMapCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapType, setMapType] = useState<'vector' | 'satellite'>('vector');

  return (
    <div className="rounded-[22px] bg-[#070D15]/85 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-lg h-full min-h-[680px] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-10 mb-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>LIVE ROUTE · GOOGLE MAPS OPS</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[10px] font-mono font-medium flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#22E06B] animate-ping" />
            <span>GPS LOCK</span>
          </div>
        </div>
      </div>

      {/* Google Maps Styled Dark Cartographic Canvas */}
      <div className="relative flex-1 rounded-xl bg-[#080E17] border border-white/[0.08] overflow-hidden my-2 shadow-inner select-none">
        {/* Google Maps Controls (Top-right & Bottom-right overlays) */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            type="button"
            aria-label="Zoom in"
            className="w-7 h-7 rounded-lg bg-[#09121E]/90 hover:bg-[#111F33] active:scale-95 border border-white/[0.1] text-white/80 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            type="button"
            aria-label="Zoom out"
            className="w-7 h-7 rounded-lg bg-[#09121E]/90 hover:bg-[#111F33] active:scale-95 border border-white/[0.1] text-white/80 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          {/* Compass / Orientation */}
          <div className="w-7 h-7 rounded-lg bg-[#09121E]/90 border border-white/[0.1] flex items-center justify-center text-[#22E06B] backdrop-blur-md shadow-md">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          </div>

          {/* Layer Indicator */}
          <div className="px-2 py-1 rounded-lg bg-[#09121E]/90 border border-white/[0.1] text-[10px] font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md shadow-md">
            <Layers className="w-3 h-3 text-[#38BDF8]" />
            <span>DARK TRANSIT</span>
          </div>
        </div>

        {/* Scale indicator at bottom right */}
        <div className="absolute bottom-3 right-3 z-30 pointer-events-none flex flex-col items-end">
          <div className="w-12 h-1 border-b-2 border-r-2 border-l-2 border-white/40" />
          <span className="text-[9px] font-mono text-slate-400 mt-0.5">500 m</span>
        </div>

        {/* SVG Map Container with scale transform for zoom */}
        <div
          className="w-full h-full min-h-[460px] transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            className="w-full h-full min-h-[460px]"
            viewBox="0 0 380 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Emerald route glow filter */}
              <filter id="gMapRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22E06B" floodOpacity="0.85" />
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#22E06B" floodOpacity="1" />
              </filter>

              {/* Highway drop shadow */}
              <filter id="roadBridgeShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* Base Landmass */}
            <rect width="100%" height="100%" fill="#070D14" />

            {/* Urban Block Parcels (Google Maps Dark Mode Building blocks / Neighborhoods) */}
            <g fill="#0B131E" stroke="#0E1A29" strokeWidth="0.8">
              {/* Northwest Neighborhood */}
              <polygon points="15,20 85,25 75,90 15,80" />
              <polygon points="95,28 175,32 165,95 85,90" />
              <polygon points="15,95 72,100 65,160 12,150" />
              <polygon points="80,105 160,110 150,170 72,165" />

              {/* Northeast Parcels */}
              <polygon points="210,35 280,40 270,100 200,95" />
              <polygon points="290,42 360,45 350,105 280,102" />
              <polygon points="205,110 270,115 260,165 195,160" />
              <polygon points="280,118 355,122 345,175 272,170" />

              {/* Central Parcels */}
              <polygon points="20,185 85,190 75,250 15,245" />
              <polygon points="95,195 165,200 155,260 85,255" />
              <polygon points="200,180 270,185 260,245 190,240" />
              <polygon points="280,190 355,195 345,255 272,250" />

              {/* Southwest Parcels */}
              <polygon points="15,275 80,280 70,340 10,335" />
              <polygon points="90,282 160,288 150,348 80,342" />
              <polygon points="12,365 75,370 65,430 8,425" />
              <polygon points="85,372 155,378 145,438 75,432" />

              {/* Southeast Parcels */}
              <polygon points="195,265 265,270 255,330 185,325" />
              <polygon points="275,272 350,278 340,338 268,332" />
              <polygon points="190,355 260,360 250,420 180,415" />
              <polygon points="270,362 348,368 338,428 262,422" />
            </g>

            {/* Urban Parks & Open Green Spaces (Dark Muted Emerald) */}
            <g fill="#0B1A14" stroke="#122A1E" strokeWidth="0.8">
              {/* Riverside Reserve Park */}
              <path d="M 22 105 C 45 105, 65 125, 60 155 C 55 180, 30 185, 20 170 Z" />
              {/* Metro Civic Green Park */}
              <path d="M 205 270 C 240 270, 255 290, 250 320 C 235 325, 200 320, 195 295 Z" />
              {/* North Botanical Strip */}
              <rect x="290" y="45" width="60" height="45" rx="6" />
            </g>

            {/* River / Waterway (Google Maps Dark Mode Oceanic Tone) */}
            <g>
              <path
                d="M -10 60 C 90 85, 140 150, 170 240 C 200 330, 230 420, 390 470"
                stroke="#0A1422"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M -10 60 C 90 85, 140 150, 170 240 C 200 330, 230 420, 390 470"
                stroke="#0E1B2D"
                strokeWidth="18"
                strokeLinecap="round"
              />
            </g>

            {/* Street Grid - Secondary Residential Streets */}
            <g stroke="#121D2C" strokeWidth="1.5" strokeLinecap="round">
              <line x1="-10" y1="50" x2="390" y2="50" />
              <line x1="-10" y1="120" x2="390" y2="120" />
              <line x1="-10" y1="210" x2="390" y2="210" />
              <line x1="-10" y1="300" x2="390" y2="300" />
              <line x1="-10" y1="390" x2="390" y2="390" />

              <line x1="50" y1="-10" x2="50" y2="510" />
              <line x1="130" y1="-10" x2="130" y2="510" />
              <line x1="220" y1="-10" x2="220" y2="510" />
              <line x1="310" y1="-10" x2="310" y2="510" />
            </g>

            {/* Major Arterial Roads & Avenues */}
            <g stroke="#18273B" strokeWidth="3.5" strokeLinecap="round">
              {/* Grand Avenue */}
              <line x1="-10" y1="165" x2="390" y2="165" />
              {/* Central Boulevard */}
              <line x1="-10" y1="345" x2="390" y2="345" />
              {/* Cross Town Parkway */}
              <line x1="175" y1="-10" x2="175" y2="510" />
              {/* Bayview Highway */}
              <line x1="270" y1="-10" x2="270" y2="510" />
              {/* Diagonal Connector */}
              <line x1="10" y1="440" x2="350" y2="80" strokeWidth="2.5" />
            </g>

            {/* Elevated Expressway Bridge over river */}
            <g filter="url(#roadBridgeShadow)">
              <line x1="140" y1="200" x2="200" y2="280" stroke="#101A28" strokeWidth="7" strokeLinecap="round" />
              <line x1="140" y1="200" x2="200" y2="280" stroke="#22334A" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Street Name Labels (Google Maps typography) */}
            <g fill="#4A5F78" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="500">
              <text x="60" y="160">GRAND AVE</text>
              <text x="60" y="340">STATION RD</text>
              <text x="180" y="100" transform="rotate(90 180,100)">METRO PKWY</text>
              <text x="275" y="440" transform="rotate(90 275,440)">BAYVIEW HWY</text>
              <text x="280" y="160">SUNRISE BLVD</text>
              <text x="110" y="240" fill="#2E4868">EAST RIVER</text>
            </g>

            {/* ======================================================== */}
            {/* GOOGLE MAPS NAVIGATION ROUTE (EMERGENCY GREEN CORRIDOR) */}
            {/* Navigates realistically from A-402 (Station Rd) to Sunrise */}
            {/* ======================================================== */}
            <g>
              {/* Outer broad emergency halo */}
              <path
                d="M 68 368 L 120 345 L 175 305 L 210 240 L 255 170"
                stroke="#22E06B"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.22"
              />

              {/* Google Maps active navigation casing */}
              <path
                d="M 68 368 L 120 345 L 175 305 L 210 240 L 255 170"
                stroke="#0B271B"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Glowing vibrant Google Maps emergency route core */}
              <path
                d="M 68 368 L 120 345 L 175 305 L 210 240 L 255 170"
                stroke="#22E06B"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#gMapRouteGlow)"
              />

              {/* Directional Chevrons / Waypoints along the turn-by-turn route */}
              <circle cx="120" cy="345" r="3" fill="#FFFFFF" stroke="#22E06B" strokeWidth="1.5" />
              <circle cx="175" cy="305" r="3" fill="#FFFFFF" stroke="#22E06B" strokeWidth="1.5" />
              <circle cx="210" cy="240" r="3" fill="#FFFFFF" stroke="#22E06B" strokeWidth="1.5" />

              {/* Live ambulance pulsing beacon */}
              <circle cx="68" cy="368" r="7" fill="#22E06B" fillOpacity="0.4">
                <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* ======================================================== */}
            {/* PRESERVED APPROVED MARKERS FROM LOCKED DESIGN */}
            {/* ======================================================== */}

            {/* 02 Meridian (Top Right) */}
            <g transform="translate(275, 82)">
              <rect x="0" y="0" width="88" height="24" rx="12" fill="#091A15" stroke="#22E06B" strokeWidth="1" strokeOpacity="0.6" />
              <text x="44" y="16" fill="#22E06B" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" textAnchor="middle">
                02 Meridian
              </text>
            </g>

            {/* 03 Riverside (Center Left - Stale) */}
            <g transform="translate(42, 215)">
              <rect x="0" y="0" width="94" height="25" rx="12.5" fill="#240D12" stroke="#FF4D4D" strokeWidth="1" strokeOpacity="0.75" />
              <text x="47" y="16" fill="#FF4D4D" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" textAnchor="middle">
                03 Riverside
              </text>
              <text x="47" y="35" fill="#FF4D4D" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                Stale
              </text>
            </g>

            {/* 04 Northgate (Bottom Right - Ageing) */}
            <g transform="translate(268, 355)">
              <rect x="0" y="0" width="92" height="25" rx="12.5" fill="#241708" stroke="#F5A524" strokeWidth="1" strokeOpacity="0.75" />
              <text x="46" y="16" fill="#F5A524" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" textAnchor="middle">
                04 Northgate
              </text>
            </g>

            {/* 01 Sunrise (Hero Match Marker with glowing corridor badge) */}
            <g transform="translate(210, 150)">
              {/* Outer Radiant Emerald Halo */}
              <rect x="-4" y="-4" width="108" height="34" rx="17" fill="#22E06B" fillOpacity="0.22" />
              <rect
                x="0"
                y="0"
                width="100"
                height="26"
                rx="13"
                fill="#0B271A"
                stroke="#22E06B"
                strokeWidth="1.8"
                filter="url(#gMapRouteGlow)"
              />
              <text x="50" y="17" fill="#22E06B" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle">
                01 Sunrise
              </text>

              {/* 6m Corridor badge below */}
              <g transform="translate(16, 31)">
                <rect x="0" y="0" width="68" height="17" rx="8.5" fill="#091811" stroke="#22E06B" strokeWidth="0.9" strokeOpacity="0.7" />
                <text x="34" y="12" fill="#22E06B" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="500" textAnchor="middle">
                  6m Corridor
                </text>
              </g>
            </g>

            {/* Ambulance A-402 Location Marker */}
            <g transform="translate(42, 354)">
              <rect
                x="0"
                y="0"
                width="82" height="26"
                rx="13"
                fill="#124026"
                stroke="#22E06B"
                strokeWidth="1.8"
                filter="url(#gMapRouteGlow)"
              />
              <text x="41" y="17" fill="#22E06B" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle">
                ✱ A-402
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Route Information Card */}
      <div className="rounded-xl bg-[#09111C]/95 border border-white/[0.08] p-3.5 backdrop-blur-md z-10 mt-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
            ACTIVE INCIDENT ROUTE
          </span>
          <span className="px-2 py-0.5 rounded border border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B] text-[9px] font-mono">
            SIMULATED TRAFFIC ACTIVE
          </span>
        </div>

        <h4 className="text-sm font-semibold text-white font-sans tracking-tight">
          Sunrise General Hospital
        </h4>

        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-lg font-semibold text-[#22E06B]">8 min</span>
            <span className="text-xs text-[#94A3B8]">(6 min with corridor)</span>
          </div>
          <span className="text-base font-mono font-medium text-white">8.4 km</span>
        </div>
      </div>
    </div>
  );
}
