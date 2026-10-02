import React from 'react';
import { Maximize2, Hospital, RadioTower, Clock, ChevronRight } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

export function TrafficMap() {
  const { corridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  return (
    <div className="rounded-[22px] bg-[#050A10] border border-white/[0.08] relative overflow-hidden shadow-2xl min-h-[580px] h-full flex flex-col justify-between select-none">
      {/* Top Map Badges */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1 rounded-lg border border-white/[0.1] bg-[#07101B]/80 text-[10px] font-mono text-slate-300 tracking-wider backdrop-blur-md">
          SIMULATED TRAFFIC CONTROL
        </div>
        <button
          type="button"
          aria-label="Expand map"
          className="w-7 h-7 rounded-lg border border-white/[0.1] bg-[#07101B]/80 text-slate-400 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Card: CORRIDOR DEPLOYED (Top-Left) */}
      <div className="absolute top-4 left-4 z-20 w-[300px] sm:w-[320px] rounded-2xl bg-[#07141D]/90 border border-[#22E06B]/35 p-4 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(34,224,107,0.12)]">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-medium mb-3 ${
            isCorridorActive
              ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
              : isCorridorReady
              ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
              : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCorridorActive
                ? 'bg-[#22E06B] shadow-[0_0_6px_#22E06B]'
                : isCorridorReady
                ? 'bg-[#F5A524] shadow-[0_0_6px_#F5A524]'
                : 'bg-slate-500'
            }`}
          />
          <span>{isCorridorActive ? 'CORRIDOR DEPLOYED' : isCorridorReady ? 'CORRIDOR READY' : 'CORRIDOR STANDBY'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-mono font-bold text-white tracking-tight leading-none">
              {corridor.currentEta.toString().padStart(2, '0')} min
            </div>
            <span className="block text-[9px] font-mono uppercase tracking-[0.16em] text-[#64748B] mt-1">
              TIME SAVED
            </span>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#0E2218" strokeWidth="4" />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke={isCorridorActive ? '#22E06B' : '#64748B'}
                strokeWidth="4"
                strokeDasharray="150"
                strokeDashoffset={isCorridorActive ? '45' : '150'}
                strokeLinecap="round"
                style={{ filter: isCorridorActive ? 'drop-shadow(0 0 6px #22E06B)' : undefined }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-xs font-mono font-bold leading-none ${isCorridorActive ? 'text-[#22E06B]' : 'text-slate-400'}`}>
                {corridor.timeSaved} min
              </span>
              <span className="text-[8px] font-mono text-[#64748B] uppercase">saved</span>
            </div>
          </div>
        </div>

        {/* ETA transition pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-slate-300">
          <span className="text-slate-400">8 min</span>
          <span className="text-[#22E06B]">→</span>
          <span className="text-white font-semibold">{corridor.currentEta} min</span>
        </div>

        {/* Route labels */}
        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/[0.06] text-xs font-mono text-slate-300">
          <div className="flex items-center gap-1 text-[#38BDF8]">
            <RadioTower className="w-3.5 h-3.5" />
            <span className="font-semibold">A-402</span>
          </div>
          <span className="text-[#64748B]">→</span>
          <span className="text-white font-medium truncate">
            Sunrise General Hospital
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full h-full min-h-[580px] flex-1">
        <svg
          className="w-full h-full"
          viewBox="0 0 850 580"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Emerald glow filter for emergency corridor */}
            <filter id="corridorGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22E06B" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#22E06B" floodOpacity="0.4" />
            </filter>
            <filter id="preemptSignalGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22E06B" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Background Landmass */}
          <rect width="100%" height="100%" fill="#050B12" />

          {/* City Blocks & Parcels */}
          <g fill="#09131F" stroke="#0E1E2E" strokeWidth="0.8" opacity="0.85">
            <polygon points="40,30 180,45 165,140 30,120" />
            <polygon points="195,45 340,60 325,150 180,140" />
            <polygon points="355,60 480,75 465,160 340,150" />
            <polygon points="500,80 620,95 605,175 485,165" />
            <polygon points="635,95 780,110 765,190 620,175" />

            <polygon points="30,140 160,160 145,260 20,240" />
            <polygon points="175,165 310,180 290,280 160,265" />
            <polygon points="325,185 450,200 430,300 305,285" />
            <polygon points="530,195 660,210 640,310 515,295" />
            <polygon points="675,215 810,230 790,330 655,315" />

            <polygon points="20,265 140,285 120,400 10,380" />
            <polygon points="155,290 280,310 260,420 135,405" />
            <polygon points="295,315 420,335 400,445 275,430" />
            <polygon points="520,325 640,345 620,455 500,440" />
            <polygon points="655,350 790,370 770,480 635,465" />

            <polygon points="10,410 115,430 95,540 0,520" />
            <polygon points="130,435 250,455 230,560 110,545" />
            <polygon points="265,460 380,480 360,575 245,565" />
          </g>

          {/* Winding River */}
          <path
            d="M 280 -10 C 340 120, 390 220, 430 310 C 470 400, 520 490, 680 590"
            stroke="#081422"
            strokeWidth="48"
            strokeLinecap="round"
          />
          <path
            d="M 280 -10 C 340 120, 390 220, 430 310 C 470 400, 520 490, 680 590"
            stroke="#0D1E32"
            strokeWidth="30"
            strokeLinecap="round"
          />

          {/* Street Network: Secondary Roads */}
          <g stroke="#122336" strokeWidth="2.5" strokeLinecap="round">
            <line x1="-20" y1="90" x2="880" y2="120" />
            <line x1="-20" y1="210" x2="880" y2="240" />
            <line x1="-20" y1="360" x2="880" y2="390" />
            <line x1="-20" y1="480" x2="880" y2="510" />

            <line x1="100" y1="-20" x2="70" y2="600" />
            <line x1="240" y1="-20" x2="210" y2="600" />
            <line x1="480" y1="-20" x2="450" y2="600" />
            <line x1="610" y1="-20" x2="580" y2="600" />
            <line x1="740" y1="-20" x2="710" y2="600" />
          </g>

          {/* Major Arterial Boulevards */}
          <g stroke="#18324C" strokeWidth="6" strokeLinecap="round">
            <path d="M -20 150 C 220 180, 500 240, 870 270" />
            <path d="M -20 420 C 320 380, 580 320, 870 290" />
            <path d="M 370 -20 C 360 200, 340 400, 320 600" />
          </g>

          {/* Bridge over river */}
          <g>
            <line x1="390" y1="250" x2="460" y2="280" stroke="#0E1A29" strokeWidth="12" strokeLinecap="round" />
            <line x1="390" y1="250" x2="460" y2="280" stroke="#223854" strokeWidth="8" strokeLinecap="round" />
          </g>

          {/* ======================================================== */}
          {/* THE GREEN CORRIDOR ROUTE (HERO ELEMENT) */}
          {/* ======================================================== */}
          <g>
            {/* Broad emergency corridor aura */}
            <path
              d="M 210 420 L 275 365 L 345 340 L 415 320 L 490 280 L 560 235 L 600 205 L 635 150"
              stroke="#22E06B"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.22"
            />

            {/* Sharp dark casing */}
            <path
              d="M 210 420 L 275 365 L 345 340 L 415 320 L 490 280 L 560 235 L 600 205 L 635 150"
              stroke="#082216"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Emerald Main Beam */}
            <path
              d="M 210 420 L 275 365 L 345 340 L 415 320 L 490 280 L 560 235 L 600 205 L 635 150"
              stroke="#22E06B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#corridorGlow)"
            />

            {/* Directional Chevron Arrows along the corridor */}
            <g stroke="#082216" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 305 348 L 312 344 L 305 340" />
              <path d="M 312 348 L 319 344 L 312 340" />

              <path d="M 450 298 L 457 294 L 450 290" />
              <path d="M 457 298 L 464 294 L 457 290" />

              <path d="M 525 253 L 532 249 L 525 245" />
              <path d="M 532 253 L 539 249 L 532 245" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* TRAFFIC SIGNALS ALONG THE GRID */}
          {/* ======================================================== */}

          {/* 1. Preempted corridor signals (Green rings) */}
          {/* Signal 1 (at intersection 275, 365) */}
          <g transform="translate(275, 365)">
            <circle cx="0" cy="0" r="14" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="9" fill="#0A2117" stroke="#22E06B" strokeWidth="2.5" filter="url(#preemptSignalGlow)" />
            <circle cx="0" cy="0" r="4" fill="#22E06B" />
          </g>

          {/* Signal 2 (at intersection 415, 320) */}
          <g transform="translate(415, 320)">
            <circle cx="0" cy="0" r="14" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="9" fill="#0A2117" stroke="#22E06B" strokeWidth="2.5" filter="url(#preemptSignalGlow)" />
            <circle cx="0" cy="0" r="4" fill="#22E06B" />
          </g>

          {/* Signal 3 (at intersection 490, 280) */}
          <g transform="translate(490, 280)">
            <circle cx="0" cy="0" r="14" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="9" fill="#0A2117" stroke="#22E06B" strokeWidth="2.5" filter="url(#preemptSignalGlow)" />
            <circle cx="0" cy="0" r="4" fill="#22E06B" />
          </g>

          {/* Signal 4 (at intersection 560, 235) */}
          <g transform="translate(560, 235)">
            <circle cx="0" cy="0" r="14" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="9" fill="#0A2117" stroke="#22E06B" strokeWidth="2.5" filter="url(#preemptSignalGlow)" />
            <circle cx="0" cy="0" r="4" fill="#22E06B" />
          </g>

          {/* 2. Hold (cross traffic) Signals (Amber rings) */}
          {/* Amber 1 (cross street held at 355, 305) */}
          <g transform="translate(355, 305)">
            <circle cx="0" cy="0" r="10" fill="#F5A524" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="6.5" fill="#231709" stroke="#F5A524" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#F5A524" />
          </g>

          {/* Amber 2 (cross avenue held at 460, 250) */}
          <g transform="translate(460, 250)">
            <circle cx="0" cy="0" r="10" fill="#F5A524" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="6.5" fill="#231709" stroke="#F5A524" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#F5A524" />
          </g>

          {/* 3. Normal Traffic Signals (Blue/Cyan rings) */}
          {/* Normal 1 (Northwest grid 195, 270) */}
          <g transform="translate(195, 270)">
            <circle cx="0" cy="0" r="9" fill="#38BDF8" fillOpacity="0.15" />
            <circle cx="0" cy="0" r="6" fill="#091A26" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#38BDF8" />
          </g>

          {/* Normal 2 (North grid 410, 160) */}
          <g transform="translate(410, 160)">
            <circle cx="0" cy="0" r="9" fill="#38BDF8" fillOpacity="0.15" />
            <circle cx="0" cy="0" r="6" fill="#091A26" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#38BDF8" />
          </g>

          {/* Normal 3 (Central grid 330, 410) */}
          <g transform="translate(330, 410)">
            <circle cx="0" cy="0" r="9" fill="#38BDF8" fillOpacity="0.15" />
            <circle cx="0" cy="0" r="6" fill="#091A26" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#38BDF8" />
          </g>

          {/* 4. Blocked / Closed Signals (Red rings) */}
          {/* Red 1 (cross route diversion 585, 290) */}
          <g transform="translate(585, 290)">
            <circle cx="0" cy="0" r="10" fill="#FF4D4D" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="6.5" fill="#240D12" stroke="#FF4D4D" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#FF4D4D" />
          </g>

          {/* Red 2 (south perimeter closed 475, 480) */}
          <g transform="translate(475, 480)">
            <circle cx="0" cy="0" r="10" fill="#FF4D4D" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="6.5" fill="#240D12" stroke="#FF4D4D" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#FF4D4D" />
          </g>

          {/* ======================================================== */}
          {/* HOSPITAL DESTINATION MARKER (TOP-RIGHT) */}
          {/* ======================================================== */}
          <g transform="translate(635, 150)">
            {/* Concentric beacon rings */}
            <circle cx="0" cy="0" r="28" fill="#22E06B" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="18" fill="#0E271B" stroke="#22E06B" strokeWidth="2" filter="url(#corridorGlow)" />
            {/* Hospital cross */}
            <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="#22E06B" strokeWidth="2.5" strokeLinecap="round" />

            {/* Floating Glass Label */}
            <g transform="translate(-15, 26)">
              <rect x="0" y="0" width="145" height="38" rx="10" fill="#07121B" fillOpacity="0.92" stroke="#22E06B" strokeWidth="1" />
              <text x="72" y="24" fill="#FFFFFF" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">
                Sunrise General Hospital
              </text>
            </g>
          </g>

          {/* ======================================================== */}
          {/* AMBULANCE MARKER (BOTTOM-LEFT) */}
          {/* ======================================================== */}
          <g transform="translate(200, 420)">
            {/* Pulsing signal transmitter aura */}
            <circle cx="-15" cy="0" r="24" fill="#22E06B" fillOpacity="0.15" />
            <circle cx="-15" cy="0" r="14" fill="#0A2417" stroke="#22E06B" strokeWidth="2" />
            {/* Antenna icon */}
            <path d="M -15 -4 L -15 4 M -18 -1 C -18 -4, -12 -4, -12 -1" stroke="#22E06B" strokeWidth="1.5" strokeLinecap="round" />

            {/* Stylized Ambulance Vehicle Graphic */}
            <g transform="translate(10, -20)">
              {/* Vehicle body */}
              <rect x="0" y="0" width="46" height="26" rx="6" fill="#F8FAFC" stroke="#0E1B2D" strokeWidth="1.5" />
              {/* Windshield */}
              <rect x="28" y="4" width="14" height="18" rx="3" fill="#38BDF8" fillOpacity="0.7" />
              {/* Emergency Red Cross on side */}
              <path d="M 12 13 L 20 13 M 16 9 L 16 17" stroke="#FF4D4D" strokeWidth="2.5" strokeLinecap="round" />
              {/* Roof emergency lightbar */}
              <rect x="18" y="-3" width="10" height="3" rx="1.5" fill="#22E06B" />
            </g>

            {/* Ambulance Glass Pill Label */}
            <g transform="translate(16, 14)">
              <rect x="0" y="0" width="115" height="42" rx="12" fill="#07121B" fillOpacity="0.94" stroke="#22E06B" strokeWidth="1.2" />
              <text x="14" y="20" fill="#FFFFFF" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                A-402
              </text>
              <text x="14" y="34" fill="#22E06B" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                ⏱ {corridor.currentEta} min ETA
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Floating Map Legend (Bottom-Right) */}
      <div className="absolute bottom-4 right-4 z-20 rounded-2xl bg-[#07111B]/90 border border-white/[0.1] p-3.5 backdrop-blur-xl shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="text-sm">🚑</span>
          <span>Ambulance</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="w-4 h-1 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Green corridor</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span>Preempted signal</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
          <span>Hold (cross traffic)</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
          <span>Normal traffic</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D4D]" />
          <span>Blocked / closed</span>
        </div>
      </div>
    </div>
  );
}
