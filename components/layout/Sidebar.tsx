'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME } from '@/lib/constants';
import { Icon, IconName } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Tableau de bord',
    href: '/',
    icon: 'home',
  },
  {
    label: 'Cours',
    href: '/cours',
    icon: 'book-open',
  },
  {
    label: 'Examens',
    href: '/examens',
    icon: 'academic-cap',
  },
  {
    label: 'Espace Membre',
    href: '/profil',
    icon: 'user',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems: NavItem[] = React.useMemo(() => {
    const items = [...NAV_ITEMS];
    if (user?.role === 'admin') {
      items.push({
        label: 'Administration',
        href: '/admin',
        icon: 'shield-check',
      });
    }
    return items;
  }, [user?.role]);

  const isItemActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto">
      {/* Top Brand & Collapse Control */}
      <div>
        <div
          className={cn(
            'flex h-18 items-center border-b border-slate-200/80 transition-all',
            isCollapsed && !isMobileOpen ? 'justify-center px-2' : 'justify-between px-5'
          )}
        >
          {/* Logo masqué lorsque la barre latérale est repliée */}
          {(!isCollapsed || isMobileOpen) && (
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center gap-3.5 overflow-hidden focus:outline-none"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-lg shadow-sm ring-2 ring-indigo-500/20">
                AI
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 tracking-tight leading-none text-lg">
                  {APP_NAME}
                </span>
                <span className="text-sm font-semibold text-slate-600 mt-1">
                  Formation IA
                </span>
              </div>
            </Link>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              'hidden lg:flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer active:scale-95',
              isCollapsed && !isMobileOpen
                ? 'h-10 w-10 bg-slate-50 border border-slate-200/80 shadow-xs'
                : 'h-9 w-9 hover:bg-slate-100'
            )}
            title={isCollapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
            aria-label={isCollapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
          >
            <Icon
              name={isCollapsed ? 'chevron-right' : 'chevron-left'}
              className="w-4 h-4 text-slate-600 hover:text-slate-900"
              strokeWidth="1.5"
            />
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            aria-label="Fermer le menu"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav aria-label="Navigation principale" className="p-4 space-y-2.5">
          {navItems.map((item) => {
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                title={isCollapsed && !isMobileOpen ? item.label : undefined}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-bold transition-colors',
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-extrabold shadow-xs'
                    : 'text-slate-800 hover:bg-slate-100 hover:text-slate-950',
                  isCollapsed && !isMobileOpen && 'justify-center px-2.5'
                )}
              >
                <Icon
                  name={item.icon}
                  className={cn(
                    'shrink-0 w-6 h-6 transition-colors',
                    active ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-700'
                  )}
                />
                {(!isCollapsed || isMobileOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer User Button */}
      <div className="p-4 border-t border-slate-200/80">
        <Link
          href="/profil"
          onClick={handleLinkClick}
          className={cn(
            'flex items-center gap-3.5 rounded-xl p-3 text-left hover:bg-slate-100 transition group',
            isCollapsed && !isMobileOpen ? 'justify-center p-2' : ''
          )}
          title={isCollapsed && !isMobileOpen ? (user ? user.name : 'Espace Membre') : undefined}
        >
          {user?.avatarUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-slate-200"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm group-hover:bg-indigo-700 transition">
              {user ? user.name.slice(0, 2).toUpperCase() : 'IA'}
            </div>
          )}
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition truncate">
                {user ? user.name : 'Connexion Membre'}
              </span>
              <span className="text-sm font-semibold text-slate-600 truncate">
                {user ? (user.role === 'admin' ? '🛡️ Administrateur' : 'Espace Membre actif') : 'Accéder au profil'}
              </span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col shrink-0 border-r border-slate-200 bg-white transition-all duration-300 ease-in-out sticky top-0 h-screen z-30',
          isCollapsed ? 'w-20' : 'w-72'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-2xl flex flex-col z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
