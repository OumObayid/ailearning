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
  nextChapterHref?: string | null;
  chapterTitle?: string;
}

export function ChapterCompleteButton({
  courseId,
  moduleId,
  chapterSlug,
  className,
  nextChapterHref,
  chapterTitle,
}: ChapterCompleteButtonProps) {
  const { isChapterCompleted, toggleChapter } = useChapterProgress();
  const [loading, setLoading] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showEncouragementModal, setShowEncouragementModal] = useState<boolean>(false);

  const completed = isChapterCompleted(courseId, moduleId, chapterSlug);

  const handleClick = async () => {
    setLoading(true);
    setAlertMessage(null);
    try {
      const res = await toggleChapter(courseId, moduleId, chapterSlug);
      if (res.requiresAuth) {
        setAlertMessage('Cette fonctionnalité n’est active que si vous êtes connecté à votre compte.');
        setAuthModalOpen(true);
      } else if (res.success && res.isCompleted) {
        // Déclencher le modal de félicitations et d'encouragement
        setShowEncouragementModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn('flex flex-col items-center sm:items-end gap-1.5', className)}>
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          title={completed ? 'Cliquer pour marquer comme non terminé' : 'Marquer ce chapitre comme terminé'}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs border-2 select-none',
            loading && 'opacity-70 cursor-wait',
            completed
              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 shadow-emerald-600/20'
              : 'bg-white text-slate-700 border-slate-300 hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50/50'
          )}
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Mise à jour...</span>
            </>
          ) : completed ? (
            <>
              <span className="text-amber-300 text-sm">⭐</span>
              <Icon name="check-circle" className="w-4 h-4 text-white" />
              <span>Chapitre validé !</span>
            </>
          ) : (
            <>
              <span className="text-slate-400 text-sm">☆</span>
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
      </div>

      {/* Modal d'encouragement et félicitations après validation d'un chapitre */}
      {showEncouragementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 relative">
            {/* Étoile de victoire */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-md">
              ⭐
            </div>

            <div className="space-y-1.5">
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                +1 Étoile de Chapitre
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Félicitations !
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                {chapterTitle ? (
                  <>Vous avez terminé avec succès le chapitre <strong>« {chapterTitle} »</strong>.</>
                ) : (
                  <>Vous venez de valider ce chapitre avec succès !</>
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs font-medium text-slate-600 leading-relaxed">
              💡 Continuez sur cette lancée ! Validez tous les modules du cours pour débloquer votre <strong>Certification Officielle en PDF</strong>.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              {nextChapterHref ? (
                <a
                  href={nextChapterHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition shadow-sm cursor-pointer"
                >
                  <span>Passer au chapitre suivant →</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowEncouragementModal(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-sm cursor-pointer"
                >
                  <span>Super, continuer !</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowEncouragementModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
}
