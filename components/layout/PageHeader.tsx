import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title?: string;
  description?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  size?: 'default' | 'large';
  titleClassName?: string;
  descriptionClassName?: string;
  breadcrumbClassName?: string;
  theme?: 'blue' | 'amber' | 'purple' | 'indigo' | 'lime' | 'emerald';
}

const BREADCRUMB_HOVER: Record<string, string> = {
  blue: 'hover:text-blue-600',
  amber: 'hover:text-amber-700',
  purple: 'hover:text-purple-600',
  indigo: 'hover:text-indigo-700',
  emerald: 'hover:text-emerald-700',
  lime: 'hover:text-lime-700',
};

const BADGE_THEMES: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-900 ring-1 ring-inset ring-blue-300',
  amber: 'bg-amber-100 text-amber-950 ring-1 ring-inset ring-amber-400',
  purple: 'bg-purple-100 text-purple-950 ring-1 ring-inset ring-purple-300',
  indigo: 'bg-indigo-100 text-indigo-950 ring-1 ring-inset ring-indigo-300',
  emerald: 'bg-emerald-100 text-emerald-950 ring-1 ring-inset ring-emerald-300',
  lime: 'bg-lime-100 text-lime-950 ring-1 ring-inset ring-lime-300',
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  breadcrumbs,
  actions,
  size = 'default',
  titleClassName,
  descriptionClassName,
  breadcrumbClassName,
  theme,
}) => {
  const isLarge = size === 'large';

  const resolvedTheme = React.useMemo(() => {
    if (theme) return theme;
    if (breadcrumbs) {
      const allHrefs = breadcrumbs.map((b) => b.href || '').join(' ');
      if (allHrefs.includes('prompt-engineering-ide')) return 'purple';
      if (allHrefs.includes('backend-ia')) return 'amber';
      if (allHrefs.includes('debugging')) return 'lime';
      if (allHrefs.includes('ai-engineering')) return 'blue';
    }
    return 'indigo';
  }, [theme, breadcrumbs]);

  const breadcrumbHoverClass = BREADCRUMB_HOVER[resolvedTheme] || BREADCRUMB_HOVER.indigo;
  const badgeClass = BADGE_THEMES[resolvedTheme] || BADGE_THEMES.indigo;

  return (
    <div className={cn('space-y-4 pb-4 border-b-2 border-slate-300 w-full', title && isLarge && 'space-y-6 pb-8')}>
      <div className={cn('flex items-center justify-between gap-4 w-full', actions ? 'pr-12' : undefined)}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Fil d'Ariane"
            className={cn(
              'flex items-center gap-2 text-sm font-bold text-slate-700',
              isLarge && 'text-sm sm:text-base font-extrabold gap-2 text-slate-900',
              breadcrumbClassName
            )}
          >
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-slate-400 font-black">
                      /
                    </span>
                  )}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className={cn('underline underline-offset-4 decoration-slate-300 transition', breadcrumbHoverClass)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn('text-slate-950', isLast ? 'font-black' : 'font-bold')}>
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* When no title, show actions aligned with breadcrumbs on the same line */}
        {!title && actions && (
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            {actions}
          </div>
        )}
      </div>

      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
          <div className="space-y-2 w-full flex-1 min-w-0">
            <div className="flex items-center gap-3 w-full">
              <h1
                className={cn(
                  'text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-tight w-full',
                  isLarge && 'text-2xl sm:text-[30px] font-black leading-snug tracking-tight',
                  titleClassName
                )}
              >
                {title}
              </h1>
              {badge && (
                <span className={cn('inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-black shrink-0', badgeClass)}>
                  {badge}
                </span>
              )}
            </div>
            {description && (
              <p
                className={cn(
                  'text-sm sm:text-base text-slate-800 font-medium leading-relaxed w-full line-clamp-3',
                  isLarge && 'text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-4xl',
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
