import React from 'react';
import { LifeLaneTopNavbar, ScreenId } from '../navigation/LifeLaneTopNavbar';
import { LifeLaneSidebar } from '../navigation/LifeLaneSidebar';

interface LifeLaneAppLayoutProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export function LifeLaneAppLayout({
  currentScreen,
  onNavigate,
  children,
}: LifeLaneAppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 flex flex-col relative selection:bg-[#22E06B]/20 selection:text-[#22E06B]">
      {/* Floating Knowra-style Top Navbar */}
      <LifeLaneTopNavbar
        currentScreen={currentScreen}
        onNavigate={onNavigate}
      />

      {/* Static Knowra-style Left Sidebar */}
      <LifeLaneSidebar
        currentScreen={currentScreen}
        onNavigate={onNavigate}
      />

      {/* Main Page Workspace Content with Left Margin for Static Sidebar & Top Margin for Floating Navbar */}
      <main className="flex-1 md:pl-[256px] pt-[76px] flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}
