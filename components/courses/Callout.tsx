import React from 'react';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'note' | 'warning' | 'info' | 'success' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'note',
  title,
  children,
}) => {
  const styleMap = {
    note: {
      border: 'border-l-4 border-indigo-600 border-t border-r border-b border-indigo-200',
      bg: 'bg-indigo-50/80',
      badgeBg: 'bg-indigo-200 text-indigo-950 font-black',
      iconColor: 'text-indigo-700',
      iconName: 'info' as const,
      defaultTitle: 'Note & Explication',
    },
    warning: {
      border: 'border-l-4 border-amber-500 border-t border-r border-b border-amber-200',
      bg: 'bg-amber-50/90',
      badgeBg: 'bg-amber-200 text-amber-950 font-black',
      iconColor: 'text-amber-700',
      iconName: 'alert' as const,
      defaultTitle: 'Attention & Vigilance',
    },
    danger: {
      border: 'border-l-4 border-rose-500 border-t border-r border-b border-rose-200',
      bg: 'bg-rose-50/90',
      badgeBg: 'bg-rose-200 text-rose-950 font-black',
      iconColor: 'text-rose-700',
      iconName: 'alert' as const,
      defaultTitle: 'Danger & Sécurité',
    },
    info: {
      border: 'border-l-4 border-cyan-500 border-t border-r border-b border-cyan-200',
      bg: 'bg-cyan-50/80',
      badgeBg: 'bg-cyan-200 text-cyan-950 font-black',
      iconColor: 'text-cyan-700',
      iconName: 'info' as const,
      defaultTitle: 'Information Clé',
    },
    tip: {
      border: 'border-l-4 border-emerald-500 border-t border-r border-b border-emerald-200',
      bg: 'bg-emerald-50/80',
      badgeBg: 'bg-emerald-200 text-emerald-950 font-black',
      iconColor: 'text-emerald-700',
      iconName: 'check' as const,
      defaultTitle: 'Astuce & Bonne pratique',
    },
    success: {
      border: 'border-l-4 border-emerald-500 border-t border-r border-b border-emerald-200',
      bg: 'bg-emerald-50/80',
      badgeBg: 'bg-emerald-200 text-emerald-950 font-black',
      iconColor: 'text-emerald-700',
      iconName: 'check' as const,
      defaultTitle: 'Critère de validation',
    },
  };

  const styles = styleMap[type] || styleMap.note;

  return (
    <div
      className={cn(
        'my-6 rounded-2xl p-5 sm:p-6 shadow-sm min-w-0 max-w-full overflow-hidden',
        styles.border,
        styles.bg
      )}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className={cn('shrink-0 mt-0.5 p-2 rounded-xl bg-white shadow-xs', styles.iconColor)}>
          <Icon name={styles.iconName} className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={cn(
                'inline-flex items-center rounded-md px-3 py-1 text-xs sm:text-sm font-black uppercase tracking-wider whitespace-normal break-words [overflow-wrap:anywhere]',
                styles.badgeBg
              )}
            >
              {title || styles.defaultTitle}
            </span>
          </div>
          <div className="text-base sm:text-lg text-slate-950 leading-relaxed font-semibold break-words [overflow-wrap:anywhere] min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
