'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useCourseDisplay } from '@/context/CourseDisplayContext';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

export type CourseThemeKey = 'amber' | 'blue' | 'purple' | 'emerald' | 'lime' | 'default';

const THEME_STYLES: Record<CourseThemeKey, string> = {
  amber:
    'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-400 hover:text-amber-950 focus-visible:ring-amber-500 shadow-amber-900/5',
  blue:
    'border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-950 focus-visible:ring-blue-500 shadow-blue-900/5',
  purple:
    'border-purple-300 bg-purple-50 text-purple-900 hover:bg-purple-100 hover:border-purple-400 hover:text-purple-950 focus-visible:ring-purple-500 shadow-purple-900/5',
  emerald:
    'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 hover:text-emerald-950 focus-visible:ring-emerald-500 shadow-emerald-900/5',
  lime:
    'border-lime-300 bg-lime-50 text-lime-900 hover:bg-lime-100 hover:border-lime-400 hover:text-lime-950 focus-visible:ring-lime-500 shadow-lime-900/5',
  default:
    'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-slate-400 shadow-slate-900/5',
};

export function resolveCourseTheme(pathname?: string | null, explicitTheme?: string): CourseThemeKey {
  if (explicitTheme && explicitTheme in THEME_STYLES) {
    return explicitTheme as CourseThemeKey;
  }
  if (!pathname) return 'default';
  const p = pathname.toLowerCase();
  if (p.includes('/backend-ia')) return 'amber';
  if (p.includes('/ai-engineering')) return 'blue';
  if (p.includes('/prompt-engineering')) return 'purple';
  if (p.includes('/debugging')) return 'lime';
  return 'default';
}

interface CourseFullWidthToggleProps {
  className?: string;
  theme?: CourseThemeKey;
}

export const CourseFullWidthToggle: React.FC<CourseFullWidthToggleProps> = ({ className, theme }) => {
  const { isFullWidth, toggleFullWidth } = useCourseDisplay();
  const pathname = usePathname();
  const currentTheme = resolveCourseTheme(pathname, theme);

  // In full-width mode, this button is hidden so there is strictly ONLY ONE exit button on screen
  if (isFullWidth) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleFullWidth}
      title="Afficher en pleine largeur"
      aria-label="Afficher en pleine largeur"
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-150 shadow-sm active:scale-95 cursor-pointer outline-hidden focus-visible:ring-2',
        THEME_STYLES[currentTheme],
        className
      )}
    >
      <Icon name="maximize" className="w-5 h-5" />
    </button>
  );
};
