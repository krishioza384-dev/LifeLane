import React from 'react';
import {
  Home,
  LayoutGrid,
  Navigation,
  Building2,
  Zap,
  CircleDot,
  AlertTriangle,
  Settings,
  Info,
  User,
} from 'lucide-react';
import { ScreenId } from './LifeLaneTopNavbar';

interface LifeLaneSidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export function LifeLaneSidebar({ currentScreen, onNavigate }: LifeLaneSidebarProps) {
  const mainItems: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'nurse', label: 'Nurse Station', icon: LayoutGrid },
    { id: 'dispatch', label: 'Dispatch', icon: Navigation },
    { id: 'hospital', label: 'Hospital Console', icon: Building2 },
    { id: 'traffic', label: 'Traffic Command', icon: Zap },
  ];

  return (
    <aside className="fixed top-[82px] left-4 bottom-4 w-[230px] z-30 hidden md:flex flex-col justify-between p-3 bg-[#090D1A]/90 border border-white/[0.08] backdrop-blur-xl rounded-2xl shadow-xl select-none">
      {/* Top Nav Groups */}
      <div className="space-y-6 pt-1">
        {/* MAIN Section */}
        <div>
          <span className="block px-2.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2 font-medium">
            MAIN
          </span>

          <nav className="space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  type="button"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#181D33] border border-indigo-400/25 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SYSTEM Section */}
        <div>
          <span className="block px-2.5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#64748B] mb-2 font-medium">
            SYSTEM
          </span>

          <nav className="space-y-1">
            {/* Network */}
            <button
              onClick={() => onNavigate('home')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <CircleDot className="w-4 h-4 text-slate-400" />
                <span>Network</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B]" />
            </button>

            {/* Alerts */}
            <button
              onClick={() => onNavigate('home')}
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-slate-400" />
                <span>Alerts</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#F5A524] shadow-[0_0_6px_#F5A524]" />
            </button>

            {/* About System */}
            <button
              onClick={() => onNavigate('about')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                currentScreen === 'about'
                  ? 'bg-[#181D33] border border-indigo-400/25 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Info className={`w-4 h-4 ${currentScreen === 'about' ? 'text-indigo-300' : 'text-slate-400'}`} />
              <span>About Platform</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onNavigate('settings')}
              type="button"
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-[#181D33] border border-indigo-400/25 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Settings className={`w-4 h-4 ${currentScreen === 'settings' ? 'text-indigo-300' : 'text-slate-400'}`} />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom Profile Area - clicking it also routes to settings */}
      <div className="pt-3 border-t border-white/[0.06]">
        <button
          onClick={() => onNavigate('settings')}
          type="button"
          className="w-full text-left rounded-xl bg-[#070B16]/80 hover:bg-[#0E1528] border border-white/[0.06] p-2.5 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#181D33] border border-indigo-400/20 flex items-center justify-center text-indigo-300 shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white leading-none truncate">
                Operator
              </span>
              <span className="text-[10px] text-[#64748B] font-mono leading-none mt-1 block truncate">
                LifeLane Command
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-[#22E06B] shrink-0 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22E06B] shadow-[0_0_6px_#22E06B]" />
            <span>Online</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
