import React from 'react';
import Link from 'next/link';
import { Icon } from './Icon';

interface ComingSoonProps {
  title?: string;
  description?: string;
  badge?: string;
  backHref?: string;
  backLabel?: string;
  actionHref?: string;
  actionLabel?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Fonctionnalité en cours de préparation",
  description = "Cette fonctionnalité sera disponible prochainement.",
  badge = "Prochainement",
  backHref,
  backLabel = "Retour",
  actionHref,
  actionLabel,
}) => {
  return (
    <div className="rounded-3xl border-2 border-dashed border-indigo-300 bg-white p-8 sm:p-12 text-center shadow-md">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 mb-5 ring-8 ring-indigo-50">
        <Icon name="clock" className="h-8 w-8" />
      </div>
      
      <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-sm font-black text-indigo-950 ring-1 ring-inset ring-indigo-300">
        {badge}
      </span>
      
      <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
        {title}
      </h2>
      
      <p className="mt-2 text-base sm:text-lg text-slate-900 font-semibold max-w-lg mx-auto leading-relaxed">
        {description}
      </p>

      {(backHref || actionHref) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3 text-base font-bold text-slate-950 hover:bg-slate-100 transition shadow-sm"
            >
              <Icon name="arrow-left" className="w-5 h-5" />
              {backLabel}
            </Link>
          )}
          {actionHref && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-base font-black text-white hover:bg-indigo-800 transition shadow-md"
            >
              {actionLabel}
              <Icon name="arrow-right" className="w-5 h-5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
