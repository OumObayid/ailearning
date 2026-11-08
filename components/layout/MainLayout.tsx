'use client';

import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './Header';
import { useCourseDisplay } from '@/context/CourseDisplayContext';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isFullWidth } = useCourseDisplay();
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');

  const handleOpenMobile = useCallback(() => setIsMobileOpen(true), []);
  const handleCloseMobile = useCallback(() => setIsMobileOpen(false), []);
  const handleToggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), []);

  return (
    <div className={cn('flex min-h-screen font-sans', isAdmin ? 'bg-slate-100 text-slate-900' : 'bg-slate-50 text-slate-900')}>
      {/* Sidebar navigation: hidden in full-width mode. In /admin, shows dedicated AdminSidebar */}
      {!isFullWidth && (
        isAdmin ? (
          <React.Suspense fallback={<aside className="hidden lg:flex w-72 bg-slate-950 h-screen sticky top-0" />}>
            <AdminSidebar
              isMobileOpen={isMobileOpen}
              onCloseMobile={handleCloseMobile}
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          </React.Suspense>
        ) : (
          <React.Suspense fallback={<aside className="hidden lg:flex w-72 bg-white h-screen sticky top-0" />}>
            <Sidebar
              isMobileOpen={isMobileOpen}
              onCloseMobile={handleCloseMobile}
              isCollapsed={isCollapsed}
              onToggleCollapse={handleToggleCollapse}
            />
          </React.Suspense>
        )
      )}

      {/* Main content wrapper */}
      <div className="flex flex-1 flex-col min-w-0">
        {!isFullWidth && (
          <Header
            onOpenMobile={handleOpenMobile}
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />
        )}
        <main
          className={cn(
            'flex-1 transition-all duration-200',
            isFullWidth ? 'p-2 sm:p-4 lg:p-6 w-full max-w-none' : 'p-4 sm:p-6 lg:p-8'
          )}
        >
          <div
            className={cn(
              'transition-all duration-200',
              isFullWidth ? 'w-full max-w-none' : 'mx-auto max-w-7xl'
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
