import React from 'react';
import { Icon } from '@/components/common/Icon';

interface PracticalWorkProps {
  title: string;
  objective?: string;
  duration?: string;
  steps?: string[];
  validationCriteria?: string[];
  children?: React.ReactNode;
}

export const PracticalWork: React.FC<PracticalWorkProps> = ({
  title,
  objective,
  duration,
  steps,
  validationCriteria,
  children,
}) => {
  return (
    <div className="my-8 rounded-3xl border-2 border-indigo-300 bg-white p-6 sm:p-8 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-indigo-100 pb-4 mb-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-700 text-white shadow-md">
            <Icon name="academic-cap" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-indigo-100 px-3 py-1 text-sm font-black uppercase tracking-wider text-indigo-950">
                Atelier Pratique
              </span>
              <span className="inline-flex items-center rounded-md bg-cyan-100 px-3 py-1 text-sm font-black text-cyan-950">
                Hands-on
              </span>
              {duration && (
                <span className="inline-flex items-center rounded-md bg-slate-200 px-3 py-1 text-sm font-black text-slate-950">
                  ⏱️ {duration}
                </span>
              )}
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-950 mt-1">{title}</h4>
          </div>
        </div>
      </div>

      <div className="text-base sm:text-lg text-slate-950 leading-relaxed space-y-4 font-semibold">
        {objective && (
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-4 text-slate-950">
            <p className="font-black text-indigo-950 text-base sm:text-lg">🎯 Objectif :</p>
            <p className="mt-1 text-slate-950 font-semibold">{objective}</p>
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="space-y-2">
            <p className="font-black text-slate-950 text-base sm:text-lg">📋 Étapes de réalisation :</p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-950 font-semibold">
              {steps.map((step, index) => (
                <li key={index} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {validationCriteria && validationCriteria.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <p className="font-black text-slate-950 text-base sm:text-lg">✅ Critères de validation :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-950 font-semibold">
              {validationCriteria.map((criterion, index) => (
                <li key={index} className="pl-1">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {children && <div className="pt-2">{children}</div>}
      </div>
    </div>
  );
};
