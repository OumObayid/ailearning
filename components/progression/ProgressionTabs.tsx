'use client';

import React from 'react';
import { Icon, type IconName } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

export type ProgressionTabKey = 'overview' | 'reading' | 'exams' | 'profile';

interface TabItem {
  key: ProgressionTabKey;
  label: string;
  icon: IconName;
  badge?: string | number;
}

interface ProgressionTabsProps {
  activeTab: ProgressionTabKey;
  onSelectTab: (tab: ProgressionTabKey) => void;
  showProfileTab?: boolean;
  readingCount?: number;
  examsCount?: number;
}

export const ProgressionTabs: React.FC<ProgressionTabsProps> = ({
  activeTab,
  onSelectTab,
  showProfileTab = true,
  readingCount,
  examsCount,
}) => {
  const tabs: TabItem[] = [
    {
      key: 'overview',
      label: "Vue d'ensemble",
      icon: 'chart-bar',
    },
    {
      key: 'reading',
      label: 'Lectures & Chapitres',
      icon: 'book-open',
      badge: readingCount !== undefined ? readingCount : undefined,
    },
    {
      key: 'exams',
      label: 'Examens & Notes',
      icon: 'academic-cap',
      badge: examsCount !== undefined ? examsCount : undefined,
    },
  ];

  if (showProfileTab) {
    tabs.push({
      key: 'profile',
      label: 'Mon Profil',
      icon: 'user',
    });
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-200/70 rounded-2xl overflow-x-auto select-none border border-slate-300/80">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelectTab(tab.key)}
            className={cn(
              'inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer',
              isActive
                ? 'bg-white text-slate-950 shadow-xs border border-slate-300/60 font-black'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            )}
          >
            <Icon
              name={tab.icon}
              className={cn('w-4 h-4', isActive ? 'text-indigo-600' : 'text-slate-500')}
            />
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-black',
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-slate-300/60 text-slate-700'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

