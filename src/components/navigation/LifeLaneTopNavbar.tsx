import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import { useLifeLane, ROLE_DEFAULT_SCREENS } from '../../context/LifeLaneContext';

export type ScreenId = 'home' | 'nurse' | 'dispatch' | 'hospital' | 'traffic' | 'about' | 'settings';

interface LifeLaneTopNavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export function LifeLaneTopNavbar({ currentScreen, onNavigate }: LifeLaneTopNavbarProps) {
  const { activeRole, setActiveRole } = useLifeLane();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener to dismiss role switcher
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogoClick = () => {
    onNavigate(ROLE_DEFAULT_SCREENS[activeRole]);
  };

  return (
    <header className="fixed top-3.5 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-[1440px] mx-auto pointer-events-auto">
        <nav className="h-[60px] rounded-full bg-[#0B0F1C]/85 border border-white/[0.08] backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.06)] px-5 sm:px-7 flex items-center justify-between select-none">
          {/* LEFT: LifeLane Logo + Wordmark */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0E271B] border border-[#22E06B]/35 flex items-center justify-center text-[#22E06B] shadow-[0_0_12px_rgba(34,224,107,0.25)] group-hover:scale-105 transition-transform">
              <span className="text-lg font-bold leading-none">✱</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-white font-sans">
                LifeLane
              </span>
            </div>
          </div>

          {/* RIGHT: Role Indicator & Role Switcher Popover */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer select-none group"
            >
              {/* Role badge */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-200 font-medium flex items-center gap-1.5">
                  <span>{activeRole === 'ambulance' ? '🚑' : '🏥'}</span>
                  <span className="hidden sm:inline">
                    {activeRole === 'ambulance' ? 'Ambulance Staff' : 'Hospital Staff'}
                  </span>
                  <span className="sm:hidden">
                    {activeRole === 'ambulance' ? 'Ambulance' : 'Hospital'}
                  </span>
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[#22E06B] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
                  Online
                </span>
              </div>

              {/* Avatar badge */}
              <div
                className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center text-xs font-bold font-sans ${
                  activeRole === 'ambulance'
                    ? 'bg-emerald-950/60 border-emerald-400/30 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-400/30 text-amber-300'
                }`}
              >
                {activeRole === 'ambulance' ? 'AS' : 'HS'}
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Popover */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#090D1A]/95 border border-white/[0.1] backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#64748B] block">
                    CURRENT PROFILE
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{activeRole === 'ambulance' ? '🚑' : '🏥'}</span>
                      <span className="text-xs font-semibold text-white">
                        {activeRole === 'ambulance' ? 'Ambulance Staff' : 'Hospital Staff'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#22E06B] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="p-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#64748B] px-2 py-1 block">
                    SWITCH TO
                  </span>

                  {activeRole === 'ambulance' ? (
                    <button
                      onClick={() => {
                        setActiveRole('hospital');
                        setIsOpen(false);
                      }}
                      type="button"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] text-slate-300 hover:text-white transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🏥</span>
                        <div>
                          <span className="text-xs font-medium text-white block">
                            Hospital Staff
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            Emergency & Bed Console
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveRole('ambulance');
                        setIsOpen(false);
                      }}
                      type="button"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.06] text-slate-300 hover:text-white transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">🚑</span>
                        <div>
                          <span className="text-xs font-medium text-white block">
                            Ambulance Staff
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            Dispatch & Green Wave
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
