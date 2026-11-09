'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Icon } from '@/components/common/Icon';
import type { SelectionTutorResponse, SelectionTutorAction } from '@/services/tutorService';
import { cn } from '@/lib/utils';

interface SelectionTutorPopoverProps {
  courseTitle?: string;
}

interface Coords {
  top: number;
  left: number;
}

export const SelectionTutorPopover: React.FC<SelectionTutorPopoverProps> = ({ courseTitle }) => {
  const [selectedText, setSelectedText] = useState<string>('');
  const [coords, setCoords] = useState<Coords | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<SelectionTutorAction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<SelectionTutorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [surroundingContext, setSurroundingContext] = useState<string>('');
  const [chapterHeading, setChapterHeading] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const selectionRectRef = useRef<DOMRect | null>(null);
  const isInteractingWithPopover = useRef<boolean>(false);

  // Calcule et ajuste la position pour garantir que le popup est 100% visible dans l'écran
  const clampPosition = useCallback((rect: DOMRect, isExpanded: boolean) => {
    if (typeof window === 'undefined') return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;

    const el = containerRef.current;
    const popoverWidth = el ? el.offsetWidth : isExpanded ? Math.min(340, vw - 24) : 220;
    const popoverHeight = el ? el.offsetHeight : isExpanded ? 180 : 40;

    // Ajustement horizontal : centré sur la sélection, puis strictement borné dans l'écran
    const selectionCenter = rect.left + rect.width / 2;
    let left = selectionCenter - popoverWidth / 2;
    left = Math.max(margin, Math.min(vw - popoverWidth - margin, left));

    // Ajustement vertical : priorité au-dessus, sinon en-dessous, borné dans l'écran
    const spaceAbove = rect.top;
    const spaceBelow = vh - rect.bottom;
    let top: number;

    if (spaceAbove >= popoverHeight + 8) {
      top = rect.top - popoverHeight - 8;
    } else if (spaceBelow >= popoverHeight + 8) {
      top = rect.bottom + 8;
    } else {
      // Si l'espace est très serré (petit écran mobile), placer là où il y a le plus d'espace
      top = spaceBelow > spaceAbove
        ? Math.min(vh - popoverHeight - margin, rect.bottom + 8)
        : Math.max(margin, rect.top - popoverHeight - 8);
    }

    // Sécurité stricte pour éviter tout débordement
    top = Math.max(margin, Math.min(vh - popoverHeight - margin, top));

    setCoords({ top, left });
  }, []);

  // Détection du texte sélectionné
  const handleSelection = useCallback(() => {
    if (isInteractingWithPopover.current) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      if (!isOpen) {
        setCoords(null);
        setSelectedText('');
        selectionRectRef.current = null;
      }
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 2) {
      if (!isOpen) {
        setCoords(null);
        setSelectedText('');
        selectionRectRef.current = null;
      }
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;

      selectionRectRef.current = rect;

      // Contexte local de la phrase / paragraphe
      let surrounding = '';
      let node: Node | null = range.commonAncestorContainer;
      if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode;
      }
      const blockEl = (node as HTMLElement)?.closest('p, li, blockquote, td, th, section, article, div');
      if (blockEl) {
        surrounding = (blockEl.textContent || '').trim().slice(0, 500);
      }

      // Titre du chapitre
      let heading = courseTitle || '';
      if (!heading) {
        const h1 = document.querySelector('main h1, h1, article h1');
        if (h1 && h1.textContent) {
          heading = h1.textContent.trim();
        } else if (typeof document !== 'undefined') {
          heading = document.title || '';
        }
      }

      setSelectedText(text);
      setSurroundingContext(surrounding);
      setChapterHeading(heading);

      clampPosition(rect, isOpen);

      if (!isOpen) {
        setResponse(null);
        setError(null);
      }
    } catch {
      // Ignorer les sélections invalides
    }
  }, [isOpen, courseTitle, clampPosition]);

  // Recalcule la position dès que la taille du popup change (ouverture, réponse reçue, etc.)
  useLayoutEffect(() => {
    if (selectionRectRef.current) {
      clampPosition(selectionRectRef.current, isOpen);
    }
  }, [isOpen, response, loading, clampPosition]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCoords(null);
    setSelectedText('');
    setResponse(null);
    setActiveAction(null);
    setError(null);
    selectionRectRef.current = null;
    isInteractingWithPopover.current = false;
  }, []);

  useEffect(() => {
    const onMouseUp = () => {
      setTimeout(handleSelection, 20);
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else {
        setTimeout(handleSelection, 20);
      }
    };

    const onReposition = () => {
      if (selectionRectRef.current) {
        clampPosition(selectionRectRef.current, isOpen);
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('touchend', onMouseUp);
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [handleSelection, handleClose, clampPosition, isOpen]);

  // Fermer lors d'un clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !isInteractingWithPopover.current
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  const executeAction = async (action: SelectionTutorAction) => {
    if (!selectedText) return;
    setIsOpen(true);
    setActiveAction(action);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/assistant/selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: selectedText,
          action,
          courseContext: chapterHeading || courseTitle,
          chapterTitle: chapterHeading || courseTitle,
          surroundingContext,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Erreur réseau.');
      }

      const data: SelectionTutorResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError((err as Error).message || 'Erreur de chargement.');
    } finally {
      setLoading(false);
    }
  };

  if (!coords) return null;

  return (
    <div
      ref={containerRef}
      onMouseDown={() => {
        isInteractingWithPopover.current = true;
      }}
      onMouseUp={() => {
        setTimeout(() => {
          isInteractingWithPopover.current = false;
        }, 100);
      }}
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
      className="z-50 select-none animate-in fade-in zoom-in-95 duration-100 max-w-[calc(100vw-24px)]"
    >
      {/* 1. ÉTAT COMPACT : 3 boutons nets et directs */}
      {!isOpen && (
        <div className="flex items-center gap-1 bg-slate-950/95 backdrop-blur-md text-white px-2 py-1.5 rounded-2xl shadow-xl border border-slate-800 text-xs font-bold whitespace-nowrap">
          <button
            type="button"
            onClick={() => executeAction('synonym')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition active:scale-95 cursor-pointer shadow-xs"
            title="Synonyme français et arabe"
          >
            <span>📚</span>
            <span>Synonyme</span>
          </button>

          <span className="text-slate-700">|</span>

          <button
            type="button"
            onClick={() => executeAction('explain')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition active:scale-95 cursor-pointer shadow-xs"
            title="Expliquer dans le contexte du chapitre"
          >
            <span>💡</span>
            <span>Expliquer</span>
          </button>

          <span className="text-slate-700">|</span>

          <button
            type="button"
            onClick={() => executeAction('example')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition active:scale-95 cursor-pointer"
            title="Exemple concret"
          >
            <span>💻</span>
            <span>Exemple</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition ml-0.5 cursor-pointer"
            aria-label="Fermer"
          >
            <Icon name="x" className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. ÉTAT DÉVELOPPÉ : Nettoyé de tout texte surplus */}
      {isOpen && (
        <div className="w-[300px] sm:w-[340px] max-w-[calc(100vw-24px)] bg-white/98 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200 text-slate-900 text-xs space-y-2.5 select-text">
          {/* En-tête : juste le mot sélectionné et le bouton fermer */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm">
                {activeAction === 'synonym' ? '📚' : activeAction === 'explain' ? '💡' : '💻'}
              </span>
              <p className="font-black text-slate-950 truncate max-w-[230px] text-xs">
                « {selectedText} »
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="h-6 w-6 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer shrink-0"
              aria-label="Fermer"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chargement court */}
          {loading && (
            <div className="py-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                <span>Chargement...</span>
              </div>
            </div>
          )}

          {/* Erreur */}
          {error && !loading && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-800 text-xs text-center font-bold">
              {error}
            </div>
          )}

          {/* Résultat épuré */}
          {response && !loading && (
            <div className="space-y-2.5">
              {/* Option 1 : Synonyme -> STRICTEMENT 2 mots */}
              {activeAction === 'synonym' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-700 block">Français</span>
                    <p className="font-black text-sm sm:text-base text-emerald-950 truncate">
                      {response.frenchWord || (response.frenchSynonyms && response.frenchSynonyms[0]) || '—'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-700 block">Arabe</span>
                    <p dir="rtl" className="font-black text-sm sm:text-base text-amber-950 truncate font-sans">
                      {response.arabicWord || response.arabicTranslation || '—'}
                    </p>
                  </div>
                </div>
              )}

              {/* Option 2 : Explication exacte dans le contexte */}
              {activeAction === 'explain' && (
                <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[12px] text-slate-800 font-medium leading-relaxed max-h-[220px] overflow-y-auto">
                  {response.result}
                </div>
              )}

              {/* Option 3 : Exemple concret */}
              {activeAction === 'example' && (
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-100 leading-relaxed whitespace-pre-wrap max-h-[220px] overflow-y-auto">
                  {response.result}
                </div>
              )}

              {/* Barre de navigation simplifiée entre les 3 options */}
              <div className="flex items-center justify-center gap-1 pt-1.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => executeAction('synonym')}
                  className={cn(
                    'px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px]',
                    activeAction === 'synonym'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  📚 Synonyme
                </button>

                <button
                  type="button"
                  onClick={() => executeAction('explain')}
                  className={cn(
                    'px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px]',
                    activeAction === 'explain'
                      ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  💡 Expliquer
                </button>

                <button
                  type="button"
                  onClick={() => executeAction('example')}
                  className={cn(
                    'px-2 py-1 rounded-lg font-bold transition cursor-pointer text-[11px]',
                    activeAction === 'example'
                      ? 'bg-slate-200 text-slate-950 border border-slate-300'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  )}
                >
                  💻 Exemple
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
