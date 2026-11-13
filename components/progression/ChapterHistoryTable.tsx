'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { CompletedChapterItem } from '@/services/chapterProgressService';

interface ChapterHistoryTableProps {
  history: CompletedChapterItem[];
  emptyMessage?: string;
}

const COURSE_THEME_BADGES: Record<string, { label: string; badge: string }> = {
  'ai-engineering': {
    label: 'AI Engineering',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  'backend-ia': {
    label: 'Backend IA',
    badge: 'bg-amber-100 text-amber-950 border-amber-300',
  },
  'prompt-engineering-ide': {
    label: 'Prompt Eng. IDE',
    badge: 'bg-purple-100 text-purple-950 border-purple-300',
  },
  debugging: {
    label: 'Débogage',
    badge: 'bg-lime-100 text-lime-950 border-lime-300',
  },
};

function formatCompletedDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateStr;
  }
}

function getChapterNum(item: CompletedChapterItem): number | string {
  if (typeof item.chapterNumber === 'number' && !isNaN(item.chapterNumber)) {
    return item.chapterNumber;
  }
  const match = (item.chapterSlug || item.chapterId || '').match(/\d+/);
  return match ? match[0] : 1;
}

export const ChapterHistoryTable: React.FC<ChapterHistoryTableProps> = ({
  history,
  emptyMessage = "Aucun chapitre n'a encore été marqué comme terminé.",
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(10);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchCourse = selectedCourse === 'all' || item.courseId === selectedCourse;
      const chNum = String(getChapterNum(item));
      const matchSearch =
        searchTerm === '' ||
        item.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.moduleId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        `ch ${chNum}`.includes(searchTerm.toLowerCase()) ||
        `chapitre ${chNum}`.includes(searchTerm.toLowerCase()) ||
        chNum === searchTerm.trim();
      return matchCourse && matchSearch;
    });
  }, [history, selectedCourse, searchTerm]);

  const visibleItems = filteredHistory.slice(0, visibleCount);
  const hasMore = filteredHistory.length > visibleCount;

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center space-y-3">
        <span className="text-3xl">📖</span>
        <h3 className="font-bold text-slate-800 text-sm sm:text-base">Aucun historique de lecture</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">{emptyMessage}</p>
        <div>
          <Link
            href="/cours"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition shadow-xs"
          >
            <span>Explorer le catalogue des cours</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4 shadow-2xs space-y-3">
      {/* Header avec Filtres et Recherche */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-950 flex items-center gap-2">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
            <span>Historique chronologique des chapitres validés</span>
          </h3>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
            {filteredHistory.length} chapitre{filteredHistory.length > 1 ? 's' : ''} terminé
            {filteredHistory.length > 1 ? 's' : ''} au total
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Sélecteur de cursus */}
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setVisibleCount(10);
            }}
            className="rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tous les cursus</option>
            <option value="ai-engineering">AI Engineering</option>
            <option value="backend-ia">Backend IA</option>
            <option value="prompt-engineering-ide">Prompt Engineering</option>
            <option value="debugging">Débogage</option>
          </select>

          {/* Recherche */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un chapitre..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(10);
              }}
              className="rounded-lg border border-slate-300 bg-slate-50 pl-7 pr-2.5 py-1 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 w-40 sm:w-52"
            >
            </input>
            <Icon
              name="search"
              className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Liste / Tableau des chapitres validés */}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
              <th className="py-2 px-2.5">Cursus</th>
              <th className="py-2 px-2.5">Module</th>
              <th className="py-2 px-2.5">N°</th>
              <th className="py-2 px-2.5">Titre du Chapitre</th>
              <th className="py-2 px-2.5 whitespace-nowrap">Validé le</th>
              <th className="py-2 px-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleItems.map((item, idx) => {
              const theme = COURSE_THEME_BADGES[item.courseId] || {
                label: item.courseTitle,
                badge: 'bg-slate-100 text-slate-800 border-slate-300',
              };

              const rowKey = `${item.id ?? idx}-${item.courseId}-${item.moduleId}-${item.chapterSlug || item.chapterId || idx}`;
              const targetUrl = item.href || item.chapterUrl || '#';
              const moduleLabel = String(item.moduleId).replace('-', ' ');
              const chNum = getChapterNum(item);

              return (
                <tr key={rowKey} className="hover:bg-slate-50/80 transition group">
                  <td className="py-2 px-2.5 whitespace-nowrap">
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black border',
                        theme.badge
                      )}
                    >
                      {theme.label}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 whitespace-nowrap font-bold text-slate-700 text-[11px]">
                    <span className="capitalize">{moduleLabel}</span>
                  </td>
                  <td className="py-2 px-2.5 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-black font-mono bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">
                      Ch. {chNum}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 font-semibold text-slate-900 min-w-[180px] max-w-[320px]">
                    <span className="line-clamp-2 text-[11px]" title={item.chapterTitle}>
                      {item.chapterTitle}
                    </span>
                  </td>
                  <td className="py-2 px-2.5 whitespace-nowrap text-slate-500 font-medium text-[11px]">
                    {formatCompletedDate(item.completedAt)}
                  </td>
                  <td className="py-2 px-2.5 text-right whitespace-nowrap">
                    <Link
                      href={targetUrl}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-bold text-[11px] transition border border-slate-200 shadow-2xs group-hover:border-indigo-200 cursor-pointer"
                    >
                      <span>Relire</span>
                      <Icon name="arrow-right" className="w-2.5 h-2.5 text-slate-400 group-hover:text-indigo-600" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bouton afficher plus */}
      {hasMore && (
        <div className="pt-2 text-center border-t border-slate-100">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 15)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            <span>Afficher plus ({filteredHistory.length - visibleCount} restants)</span>
            <Icon name="chevron-down" className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

