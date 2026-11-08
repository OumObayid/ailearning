'use client';

import React, { useState } from 'react';
import { useChapterProgress } from '@/context/ChapterProgressContext';
import { Icon } from '@/components/common/Icon';
import { AuthModal } from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

interface ChapterCompleteButtonProps {
  courseId: string;
  moduleId: string;
  chapterSlug: string;
  className?: string;
}

export function ChapterCompleteButton({
  courseId,
  moduleId,
  chapterSlug,
  className,
}: ChapterCompleteButtonProps) {
  const { isChapterCompleted, toggleChapter } = useChapterProgress();
  const [loading, setLoading] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const completed = isChapterCompleted(courseId, moduleId, chapterSlug);

  const handleClick = async () => {
    setLoading(true);
    setAlertMessage(null);
    try {
      const res = await toggleChapter(courseId, moduleId, chapterSlug);
      if (res.requiresAuth) {
        setAlertMessage('Cette fonctionnalité n’est active que si vous êtes connecté à votre compte.');
        setAuthModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center sm:items-end gap-1.5", className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        title={completed ? "Cliquer pour marquer comme non terminé" : "Marquer ce chapitre comme terminé"}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs border-2 select-none",
          loading && "opacity-70 cursor-wait",
          completed
            ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 shadow-emerald-600/20"
            : "bg-white text-slate-700 border-slate-300 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50/50"
        )}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Mise à jour...</span>
          </>
        ) : completed ? (
          <>
            <Icon name="check-circle" className="w-4 h-4 text-white" />
            <span>Chapitre terminé</span>
          </>
        ) : (
          <>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
            <span>Marquer comme terminé</span>
          </>
        )}
      </button>

      {/* Message d'avertissement si déconnecté */}
      {alertMessage && (
        <div className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl flex items-center gap-1.5 animate-fadeIn">
          <span>⚠️ {alertMessage}</span>
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="underline font-black text-indigo-700 hover:text-indigo-900 ml-1 cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      )}

      {/* Modale d'authentification */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
        onSuccess={() => {
          setAuthModalOpen(false);
          setAlertMessage(null);
        }}
      />
    </div>
  );
}

