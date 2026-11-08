'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { Icon } from '@/components/common/Icon';

interface HeaderProps {
  onOpenMobile: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobile }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="lg:hidden sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md">
      {/* Mobile navigation trigger & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Ouvrir le menu de navigation"
        >
          <Icon name="menu" className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-700 text-white text-xs">
              🛡️
            </span>
          )}
          <span className="text-sm font-extrabold text-slate-900 tracking-tight">
            {isAdmin ? `${APP_NAME} Admin` : APP_NAME}
          </span>
        </div>
      </div>
    </header>
  );
};
