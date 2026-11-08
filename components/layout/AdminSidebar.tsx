'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon, IconName } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface AdminNavItem {
  id: string;
  label: string;
  href: string;
  tabKey: string;
  icon: IconName;
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    id: 'overview',
    label: "Vue d'Ensemble",
    href: '/admin?tab=overview',
    tabKey: 'overview',
    icon: 'layout',
  },
  {
    id: 'users',
    label: 'Membres & Rôles',
    href: '/admin?tab=users',
    tabKey: 'users',
    icon: 'user',
  },
  {
    id: 'exams',
    label: 'Surveillance Examens',
    href: '/admin?tab=exams',
    tabKey: 'exams',
    icon: 'shield-check',
  },
  {
    id: 'courses',
    label: 'Formations & Modules',
    href: '/admin?tab=courses',
    tabKey: 'courses',
    icon: 'book-open',
  },
  {
    id: 'settings',
    label: 'Configuration Système',
    href: '/admin?tab=settings',
    tabKey: 'settings',
    icon: 'settings',
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

  const currentTab = searchParams.get('tab') || 'overview';

  const handleLinkClick = () => {
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-slate-950 text-slate-100 select-text">
      {/* Admin Profile Header & Collapse Control */}
      <div>
        <div
          className={cn(
            'flex h-20 items-center border-b border-slate-800 transition-all',
            isCollapsed && !isMobileOpen ? 'flex-col justify-center gap-2 p-2' : 'justify-between px-4'
          )}
        >
          {(!isCollapsed || isMobileOpen) ? (
            <div className="flex items-center gap-3 overflow-hidden min-w-0">
              {user?.avatarUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-purple-500/40 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-sm shadow-md ring-2 ring-purple-400/30">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span
                  className="font-extrabold text-white tracking-tight leading-tight text-sm truncate"
                  title={user?.name}
                >
                  {user?.name || 'Administrateur'}
                </span>
                <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Administrateur
                </span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-sm shadow-md ring-2 ring-purple-400/30 hover:opacity-90 transition cursor-pointer"
              title={`${user?.name || 'Administrateur'} (Cliquer pour déplier)`}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
            </button>
          )}

          {/* Desktop Collapse Toggle */}
          {(!isCollapsed || isMobileOpen) && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer active:scale-95 shrink-0"
              title="Replier le menu admin"
              aria-label="Replier le menu admin"
            >
              <Icon
                name="chevron-left"
                className="w-4 h-4 text-slate-300"
                strokeWidth="1.5"
              />
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition shrink-0"
            aria-label="Fermer le menu"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Navigation Links */}
        <nav aria-label="Navigation administration" className="p-3 pt-4 space-y-1.5">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = pathname === '/admin' && currentTab === item.tabKey;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                title={isCollapsed && !isMobileOpen ? item.label : undefined}
                className={cn(
                  'flex items-center gap-3.5 rounded-xl px-3.5 py-3 transition-all cursor-pointer',
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/40'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white font-bold',
                  isCollapsed && !isMobileOpen && 'justify-center px-2 py-3'
                )}
              >
                <Icon
                  name={item.icon}
                  className={cn(
                    'shrink-0 w-5 h-5 transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  )}
                />
                {(!isCollapsed || isMobileOpen) && (
                  <span className="text-sm font-bold truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer : Logout Action */}
      <div className="p-3 border-t border-slate-800/80">
        {/* Logout Action */}
        <button
          type="button"
          onClick={() => logout()}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl p-2.5 text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 transition border border-transparent hover:border-rose-900/40 group cursor-pointer',
            isCollapsed && !isMobileOpen && 'justify-center p-2'
          )}
          title={isCollapsed && !isMobileOpen ? 'Déconnexion' : undefined}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-slate-400 group-hover:bg-rose-950 group-hover:text-rose-300 transition">
            <Icon name="x" className="w-4 h-4" />
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <span className="text-xs font-bold truncate">
              Déconnexion
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Admin Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col shrink-0 border-r border-slate-800 bg-slate-950 transition-all duration-300 ease-in-out sticky top-0 h-screen z-30 shadow-xl',
          isCollapsed ? 'w-20' : 'w-72'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-slate-950 shadow-2xl flex flex-col z-50 border-r border-slate-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

