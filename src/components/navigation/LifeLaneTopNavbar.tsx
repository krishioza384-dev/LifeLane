import React from 'react';

export type ScreenId = 'home' | 'nurse' | 'dispatch' | 'hospital' | 'traffic' | 'about' | 'settings';

interface LifeLaneTopNavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export function LifeLaneTopNavbar({ currentScreen, onNavigate }: LifeLaneTopNavbarProps) {
  const navLinks: { label: string; screen: ScreenId }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Operations', screen: 'dispatch' },
    { label: 'Hospitals', screen: 'hospital' },
    { label: 'Traffic', screen: 'traffic' },
    { label: 'About', screen: 'about' },
  ];

  return (
    <header className="fixed top-3.5 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-[1440px] mx-auto pointer-events-auto">
        <nav className="h-[60px] rounded-full bg-[#0B0F1C]/85 border border-white/[0.08] backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.06)] px-5 sm:px-7 flex items-center justify-between select-none">
          {/* LEFT: LifeLane Logo + Wordmark */}
          <div
            onClick={() => onNavigate('home')}
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

          {/* CENTER: Knowra-style Pill Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {navLinks.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.screen)}
                  type="button"
                  className={`relative px-4 py-1.5 rounded-full text-sm font-sans transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle active glow & bottom accent line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-[#22E06B] shadow-[0_0_10px_#22E06B]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Operator & Online Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-200 font-medium">Operator</span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[#22E06B] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
                Online
              </span>
            </div>

            {/* Profile Avatar button that opens Settings */}
            <button
              onClick={() => onNavigate('settings')}
              type="button"
              title="Open Settings"
              className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center text-xs font-bold font-sans cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                  : 'bg-[#131A2B] border-white/[0.1] text-slate-300 hover:border-white/30'
              }`}
            >
              OP
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
