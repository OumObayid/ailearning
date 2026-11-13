'use client';

import React from 'react';
import { Icon, type IconName } from '@/components/common/Icon';
import { cn } from '@/lib/utils';

export type ProgressionTabKey = 'overview' | 'badges' | 'reading' | 'exams' | 'profile';

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
  badgesCount?: number;
}

export const ProgressionTabs: React.FC<ProgressionTabsProps> = ({
  activeTab,
  onSelectTab,
  showProfileTab = true,
  readingCount,
  examsCount,
  badgesCount,
}) => {
  const tabs: TabItem[] = [
    {
      key: 'overview',
      label: "Vue d'ensemble",
      icon: 'chart-bar',
    },
    {
      key: 'badges',
      label: 'Certifications & Badges',
      icon: 'academic-cap',
      badge: badgesCount !== undefined ? badgesCount : undefined,
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
    <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-200/70 rounded-xl select-none border border-slate-300/80 overflow-hidden">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelectTab(tab.key)}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-xs transition-all whitespace-nowrap cursor-pointer',
              isActive
                ? 'bg-white text-slate-950 shadow-2xs border border-slate-300/70 font-black'
                : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
            )}
          >
            <Icon
              name={tab.icon}
              className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-indigo-600' : 'text-slate-500')}
            />
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-black',
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

