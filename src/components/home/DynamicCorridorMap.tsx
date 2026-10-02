import React from 'react';
import { GitFork, Layers, Ambulance, Plus } from 'lucide-react';
import { useLifeLane } from '../../context/LifeLaneContext';

export function DynamicCorridorMap() {
  const { corridor } = useLifeLane();
  const isCorridorActive = corridor.status === 'active';
  const isCorridorReady = corridor.status === 'ready';

  return (
    <div className="rounded-[22px] bg-[#070D15]/90 border border-white/[0.08] p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden select-none h-full">
      {/* Top Header of Map Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0E271B] border border-[#22E06B]/30 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.2)]">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-white font-sans tracking-tight">
                Dynamic Corridor CR-804
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-medium ${
                  isCorridorActive
                    ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                    : isCorridorReady
                    ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
                    : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
                }`}
              >
                ● {isCorridorActive ? 'GREEN WAVE ACTIVE' : isCorridorReady ? 'CORRIDOR READY' : 'STANDBY'}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-normal mt-0.5">
              Multi-phase preemptive timing across 6 key arterial intersections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[10px] font-mono text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>MODE: AUTONOMOUS PRIORITY</span>
          </div>
          <button
            type="button"
            aria-label="Toggle layers"
            className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Interactive Map Container */}
      <div className="relative rounded-xl bg-[#050A10] border border-white/[0.05] overflow-hidden my-3 min-h-[440px] flex-1">
        {/* Floating Deployed Card (Top-Left) */}
        <div className="absolute top-3 left-3 z-20 w-[240px] rounded-xl bg-[#07131D]/90 border border-[#22E06B]/35 p-3 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-semibold ${
                isCorridorActive
                  ? 'border-[#22E06B]/30 bg-[#0E271B] text-[#22E06B]'
                  : isCorridorReady
                  ? 'border-[#F5A524]/30 bg-[#221609] text-[#F5A524]'
                  : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
              }`}
            >
              ● {isCorridorActive ? 'CORRIDOR DEPLOYED' : isCorridorReady ? 'CORRIDOR READY' : 'STANDBY'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">CR-804</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight leading-none">
                {corridor.currentEta.toString().padStart(2, '0')} <span className="text-lg">MIN</span>
              </div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#64748B] mt-0.5 block">
                TIME SAVED
              </span>
            </div>

            {/* Circular Gauge */}
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold ${
                isCorridorActive
                  ? 'border-[#22E06B]/40 bg-[#0E271B] text-[#22E06B] shadow-[0_0_8px_#22E06B]'
                  : 'border-white/[0.1] bg-white/[0.03] text-slate-400'
              }`}
            >
              {isCorridorActive ? `-${corridor.timeSaved}m` : '0m'}
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-300 flex items-center justify-between">
            <span><strong className="text-white">8 min</strong> → <strong className="text-[#22E06B]">{corridor.currentEta} min</strong> ETA</span>
            <span className="text-slate-400">Unit A-402</span>
          </div>
        </div>

        {/* Floating Legend (Top-Right) */}
        <div className="absolute top-3 right-3 z-20 rounded-xl bg-[#07111B]/90 border border-white/[0.08] p-2.5 backdrop-blur-xl shadow-lg space-y-1.5 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>Green Corridor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>Preempted Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
            <span>Held Cross-Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D4D]" />
            <span>Incident / Block</span>
          </div>
        </div>

        {/* SVG Graphic Map */}
        <svg
          className="w-full h-full min-h-[440px]"
          viewBox="0 0 680 440"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="homeRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22E06B" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Landmass */}
          <rect width="100%" height="100%" fill="#050B12" />

          {/* City Parcels */}
          <g fill="#09131F" stroke="#0E1E2E" strokeWidth="0.8" opacity="0.8">
            <polygon points="30,20 140,30 130,110 20,100" />
            <polygon points="155,35 270,45 255,120 145,110" />
            <polygon points="285,50 390,60 375,135 270,125" />
            <polygon points="405,65 520,75 505,150 390,140" />

            <polygon points="20,120 130,135 115,220 10,210" />
            <polygon points="145,140 255,155 240,240 130,225" />
            <polygon points="270,160 380,175 360,260 250,245" />

            <polygon points="10,230 115,245 95,350 0,335" />
            <polygon points="130,250 240,265 220,370 110,355" />
            <polygon points="255,275 365,290 345,395 235,380" />
            <polygon points="380,300 490,315 470,420 360,405" />
          </g>

          {/* Waterway */}
          <path
            d="M 220 -10 C 270 90, 310 180, 340 260 C 370 340, 420 410, 560 480"
            stroke="#081422"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Arterial Boulevards */}
          <g stroke="#18324C" strokeWidth="4.5" strokeLinecap="round">
            <path d="M -20 120 C 180 140, 400 190, 700 210" />
            <path d="M -20 330 C 260 300, 460 250, 700 230" />
            <path d="M 300 -20 C 290 160, 270 320, 250 460" />
          </g>

          {/* Green Corridor Active Route */}
          <g>
            <path
              d="M 185 325 L 245 280 L 305 260 L 370 245 L 435 210 L 490 175 L 535 145"
              stroke="#22E06B"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.2"
            />
            <path
              d="M 185 325 L 245 280 L 305 260 L 370 245 L 435 210 L 490 175 L 535 145"
              stroke="#082216"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 185 325 L 245 280 L 305 260 L 370 245 L 435 210 L 490 175 L 535 145"
              stroke="#22E06B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#homeRouteGlow)"
            />

            {/* Directional Chevron */}
            <g stroke="#082216" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 390 232 L 395 228 L 390 224" />
              <path d="M 460 196 L 465 192 L 460 188" />
            </g>
          </g>

          {/* Preempted Node Signals (Emerald rings) */}
          <g transform="translate(245, 280)">
            <circle cx="0" cy="0" r="10" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="6.5" fill="#0A2117" stroke="#22E06B" strokeWidth="2" filter="url(#homeRouteGlow)" />
            <circle cx="0" cy="0" r="2.5" fill="#22E06B" />
          </g>
          <g transform="translate(370, 245)">
            <circle cx="0" cy="0" r="10" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="6.5" fill="#0A2117" stroke="#22E06B" strokeWidth="2" filter="url(#homeRouteGlow)" />
            <circle cx="0" cy="0" r="2.5" fill="#22E06B" />
          </g>
          <g transform="translate(435, 210)">
            <circle cx="0" cy="0" r="10" fill="#22E06B" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="6.5" fill="#0A2117" stroke="#22E06B" strokeWidth="2" filter="url(#homeRouteGlow)" />
            <circle cx="0" cy="0" r="2.5" fill="#22E06B" />
          </g>

          {/* Held Cross-Traffic (Amber) */}
          <g transform="translate(315, 230)">
            <circle cx="0" cy="0" r="8" fill="#F5A524" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="5" fill="#231709" stroke="#F5A524" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#F5A524" />
          </g>

          {/* Incident / Block (Red) */}
          <g transform="translate(480, 290)">
            <circle cx="0" cy="0" r="8" fill="#FF4D4D" fillOpacity="0.18" />
            <circle cx="0" cy="0" r="5" fill="#240D12" stroke="#FF4D4D" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="2" fill="#FF4D4D" />
          </g>

          {/* Hospital Destination Marker (Top-Right) */}
          <g transform="translate(535, 145)">
            <circle cx="0" cy="0" r="18" fill="#22E06B" fillOpacity="0.12" />
            <circle cx="0" cy="0" r="12" fill="#0E271B" stroke="#22E06B" strokeWidth="1.8" filter="url(#homeRouteGlow)" />
            <path d="M -4 0 L 4 0 M 0 -4 L 0 4" stroke="#22E06B" strokeWidth="2" strokeLinecap="round" />

            <g transform="translate(-10, 18)">
              <rect x="0" y="0" width="125" height="34" rx="8" fill="#07121B" fillOpacity="0.94" stroke="#22E06B" strokeWidth="0.8" />
              <text x="10" y="16" fill="#FFFFFF" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">
                Sunrise General
              </text>
              <text x="10" y="27" fill="#22E06B" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                ● BAY 02 ALLOCATED
              </text>
            </g>
          </g>

          {/* Ambulance Marker (Bottom-Left) */}
          <g transform="translate(180, 325)">
            <circle cx="0" cy="0" r="14" fill="#22E06B" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="8" fill="#0A2417" stroke="#22E06B" strokeWidth="2" filter="url(#homeRouteGlow)" />

            <g transform="translate(12, -14)">
              <rect x="0" y="0" width="80" height="30" rx="8" fill="#07121B" fillOpacity="0.94" stroke="#22E06B" strokeWidth="0.8" />
              <text x="8" y="14" fill="#FFFFFF" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                A-402
              </text>
              <text x="8" y="24" fill="#22E06B" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                6 MIN ETA
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Corridor Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-white/[0.06] gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
          <span className="text-white font-medium">Corridor CR-804 • A-402 → Sunrise General</span>
          <span className="text-[#64748B] hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">Distance: 8.4 km • 6 Intersections Preempted</span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="text-[10px] font-mono font-semibold text-[#22E06B] tracking-wider uppercase">
            SIGNALS LOCKED
          </span>
          <button
            type="button"
            className="px-3 py-1 rounded-md border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-mono text-slate-300 transition-all cursor-pointer"
          >
            FOCUS PATH
          </button>
        </div>
      </div>
    </div>
  );
}
