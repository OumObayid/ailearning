'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface InteractiveChecklistProps {
  title?: string;
  items: string[];
}

export const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  title = 'Validation de la séance',
  items,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [index: number]: boolean }>({});

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = items.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="my-8 rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-2 border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800">
            <Icon name="check" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-950">{title}</h3>
            <p className="text-sm font-semibold text-slate-700">
              Cochez les acquis pour mesurer votre maîtrise du chapitre
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-base font-black text-slate-950">
            {completedCount} / {totalCount} validés
          </span>
          <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black ${
            completedCount === totalCount
              ? 'bg-emerald-100 text-emerald-950 ring-1 ring-emerald-300'
              : 'bg-indigo-100 text-indigo-950 ring-1 ring-indigo-300'
          }`}>
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Items list */}
      <div className="mt-6 space-y-3">
        {items.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleItem(idx)}
              className={`flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition ${
                isChecked
                  ? 'border-emerald-300 bg-emerald-50/50 text-slate-950'
                  : 'border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100/80 text-slate-900'
              }`}
            >
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                  isChecked
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-slate-400 bg-white'
                }`}
              >
                {isChecked && <Icon name="check" className="w-4 h-4 stroke-[3]" />}
              </div>
              <span className={`text-base font-semibold leading-relaxed ${
                isChecked ? 'line-through text-slate-700' : 'text-slate-950'
              }`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

