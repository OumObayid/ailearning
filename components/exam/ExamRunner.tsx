'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExamQuestion } from '@/data/exams/types';
import { useAuth } from '@/context/AuthContext';
import { useExamProgress } from '@/context/ExamProgressContext';
import { AuthModal } from '@/components/auth/AuthModal';

interface ExamRunnerProps {
  courseId?: string;
  moduleId: string;
  moduleOrder: number;
  moduleTitle: string;
  durationMinutes: number;
  passingScorePercent: number;
  questions: ExamQuestion[];
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  courseId,
  moduleId,
  moduleOrder,
  moduleTitle,
  durationMinutes,
  passingScorePercent,
  questions,
}) => {
  // Contexte de progression
  const { refreshProgress } = useExamProgress();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // États du cycle d'épreuve : 'intro' | 'running' | 'submitted' | 'disqualified'
  const [examState, setExamState] = useState<'intro' | 'running' | 'submitted' | 'disqualified'>('intro');

  // Réponses sélectionnées de l'étudiant (questionId -> tableau de lettres)
  const [userAnswers, setUserAnswers] = useState<Record<number, ('A' | 'B' | 'C' | 'D')[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Chronomètre
  const totalSeconds = durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);

  // Surveillance Anti-Triche
  const [strikes, setStrikes] = useState<number>(0);
  const [antiCheatModal, setAntiCheatModal] = useState<{
    show: boolean;
    reason: string;
  }>({ show: false, reason: '' });
  const [infractionHistory, setInfractionHistory] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Modal personnalisée sophistiquée de confirmation de soumission
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);

  // Références d'isolation et d'intégrité
  const runnerContainerRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef<boolean>(false);
  const isGracePeriodRef = useRef<boolean>(false);

  // Authentification
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Identité pour le certificat
  const candidateName = user?.name || 'Le Candidat';
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Verrouillage du scroll global pendant l'épreuve
  useEffect(() => {
    if (examState === 'running') {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [examState]);

  // Gestion du plein écran ciblé sur le conteneur d'examen
  const requestFullscreen = async () => {
    try {
      const el = runnerContainerRef.current || document.documentElement;
      if (el && el.requestFullscreen) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      // Si refusé ou non supporté par le navigateur
    }
  };

  const exitFullscreenSafe = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignorer
    } finally {
      setIsFullscreen(false);
    }
  };

  // Calcul du score final
  const calculateResults = useCallback(() => {
    let score = 0;
    const details = questions.map((q) => {
      const userSelected = (userAnswers[q.id] || []).sort();
      const expected = [...q.correctAnswers].sort();
      const isCorrect =
        userSelected.length === expected.length &&
        userSelected.every((val, idx) => val === expected[idx]);

      if (isCorrect) score += 1;

      return {
        question: q,
        userSelected,
        expected,
        isCorrect,
      };
    });

    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= passingScorePercent;

    return { score, total: questions.length, percentage, passed, details };
  }, [questions, userAnswers, passingScorePercent]);

  // Calcul du formatage minute:seconde
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Callback de succès d'authentification
  const handleAuthSuccess = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  // Enregistrement d'infraction anti-triche sécurisé (sans faux positifs)
  const recordInfraction = useCallback((reason: string) => {
    if (isSubmittingRef.current || isGracePeriodRef.current) return;

    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${reason}`;
    setInfractionHistory((prev) => [...prev, entry]);

    setStrikes((prevStrikes) => {
      const nextStrikes = prevStrikes + 1;
      if (nextStrikes >= 3) {
        setExamState('disqualified');
        exitFullscreenSafe();
      } else {
        setAntiCheatModal({
          show: true,
          reason: `${reason} (Avertissement ${nextStrikes}/3. 3 avertissements entraînent une disqualification immédiate).`,
        });
      }
      return nextStrikes;
    });
  }, []);

  // Détection perte de focus et visibilité filtrée
  useEffect(() => {
    if (examState !== 'running') return;

    const handleVisibilityChange = () => {
      if (isSubmittingRef.current || isGracePeriodRef.current) return;
      if (document.hidden) {
        recordInfraction('Changement d\'onglet ou minimisation de la fenêtre détecté');
      }
    };

    const handleWindowBlur = () => {
      if (isSubmittingRef.current || isGracePeriodRef.current || showConfirmSubmitModal) return;
      // Ne déclencher que si le document est réellement masqué / en arrière-plan
      if (document.hidden) {
        recordInfraction('Perte de focus de la fenêtre d\'examen');
      }
    };

    const handleFullscreenChange = () => {
      if (isSubmittingRef.current || isGracePeriodRef.current) return;
      const hasFs = Boolean(document.fullscreenElement);
      setIsFullscreen(hasFs);
      if (!hasFs && examState === 'running') {
        recordInfraction('Sortie inattendue du mode plein écran');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloquer F12, Ctrl+Shift+I, Ctrl+C, Ctrl+V, etc.
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examState, recordInfraction, showConfirmSubmitModal]);

  // Soumission définitive de l'examen
  const handleSubmitExam = useCallback(async () => {
    isSubmittingRef.current = true;
    setShowConfirmSubmitModal(false);
    if (timerRef.current) clearInterval(timerRef.current);
    await exitFullscreenSafe();

    const results = calculateResults();
    const timeSpent = Math.max(0, totalSeconds - secondsRemaining);
    const resolvedCourseId =
      courseId ||
      (moduleId.startsWith('prompt-engineering')
        ? 'prompt-engineering-ide'
        : moduleId.startsWith('backend-ia')
          ? 'backend-ia'
          : moduleId.startsWith('debugging')
            ? 'debugging'
            : 'ai-engineering');

    if (user) {
      setSaveStatus('saving');
      try {
        const payload = {
          courseId: resolvedCourseId,
          moduleId: `module-${moduleOrder}`,
          score: results.percentage,
          totalQuestions: results.total,
          correctAnswersCount: results.score,
          passed: results.passed,
          timeSpentSeconds: timeSpent,
          answers: results.details.map((d) => ({
            questionId: d.question.id,
            selected: d.userSelected,
            expected: d.expected,
            isCorrect: d.isCorrect,
          })),
        };

        const res = await fetch('/api/exams/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setSaveStatus('saved');
          await refreshProgress();
        } else {
          setSaveStatus('error');
        }
      } catch (err) {
        console.error('Erreur lors de la sauvegarde de l’examen:', err);
        setSaveStatus('error');
      }
    }

    setExamState('submitted');
  }, [
    calculateResults,
    courseId,
    moduleId,
    moduleOrder,
    refreshProgress,
    secondsRemaining,
    totalSeconds,
    user,
  ]);

  // Décompte du chronomètre
  useEffect(() => {
    if (examState === 'running') {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState, handleSubmitExam]);

  const handleStartExam = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    isSubmittingRef.current = false;
    isGracePeriodRef.current = true;
    setStrikes(0);
    setInfractionHistory([]);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQuestionIndex(0);
    setShowConfirmSubmitModal(false);
    setExamState('running');
    setSecondsRemaining(totalSeconds);

    await requestFullscreen();

    // Période de grâce de 2,5s pour laisser le mode plein écran s'initialiser sans fausse alerte
    setTimeout(() => {
      isGracePeriodRef.current = false;
    }, 2500);
  };

  // Sélection d'une option pour la question courante
  const handleSelectOption = (questionId: number, letter: 'A' | 'B' | 'C' | 'D', isMulti: boolean) => {
    setUserAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        if (current.includes(letter)) {
          return { ...prev, [questionId]: current.filter((l) => l !== letter) };
        } else {
          return { ...prev, [questionId]: [...current, letter].sort() };
        }
      } else {
        return { ...prev, [questionId]: [letter] };
      }
    });
  };

  // Toggle drapeau pour révision
  const toggleFlagQuestion = (index: number) => {
    setFlaggedQuestions((prev) => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return updated;
    });
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => (userAnswers[Number(k)] || []).length > 0
  ).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);

  // 1. ÉCRAN D'ACCUEIL ET CONSIGNES
  if (examState === 'intro') {
    return (
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm space-y-6 select-text">
        {/* Synthèse en 4 métriques clés — Strictement 2 lignes de texte par carte */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-2xs h-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800 text-lg font-bold mb-2">⏱️</span>
            <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">{durationMinutes} Minutes</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Chronométré strict</div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs h-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg font-bold mb-2">📋</span>
            <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">{questions.length} Questions</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">QCM &amp; cas pratiques</div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs h-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 text-lg font-bold mb-2">🎯</span>
            <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Seuil {passingScorePercent}%</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Validation requise</div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-2xs h-full">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-800 text-lg font-bold mb-2">🛡️</span>
            <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Anti-Triche</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Surveillance active</div>
          </div>
        </div>

        {/* Consignes en 2 volets clairs et sans répétition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-5 space-y-2.5">
            <h4 className="font-black text-base text-slate-950 flex items-center gap-2">
              <span>📋</span> Déroulement
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-800 font-medium">
              <li>• Questions à choix simple et multiple avec cas pratiques.</li>
              <li>• Possibilité de marquer des questions pour révision avant soumission.</li>
              <li>• Corrigé détaillé et explications complètes affichés à la fin.</li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/60 p-5 space-y-2.5">
            <h4 className="font-black text-base text-rose-950 flex items-center gap-2">
              <span>🚨</span> Consignes de Sécurité
            </h4>
            <ul className="space-y-1.5 text-sm text-rose-950 font-medium">
              <li>• Mode plein écran obligatoire pendant toute l&apos;épreuve.</li>
              <li>• Changement d&apos;onglet, sortie de focus et copier-coller désactivés.</li>
              <li>• Disqualification automatique après 3 avertissements.</li>
            </ul>
          </div>
        </div>

        {/* Zone Candidat & Lancement */}
        {!user ? (
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6 text-center space-y-3">
            <h3 className="text-lg font-black text-slate-950">
              Connexion requise pour enregistrer votre certificat
            </h3>
            <p className="text-sm text-slate-700 max-w-md mx-auto font-medium">
              Connectez-vous pour valider votre identité sur l&apos;attestation officielle et synchroniser votre progression.
            </p>
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-6 py-3 text-sm font-black text-white shadow-sm hover:bg-indigo-800 transition cursor-pointer"
            >
              <span>Se connecter pour passer l&apos;examen</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-sm font-bold text-slate-900">
                Candidat : <strong className="text-slate-950 font-black">{user.name}</strong> ({user.email})
              </span>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-7 py-3 text-sm font-black text-white shadow-md hover:bg-indigo-800 transition cursor-pointer"
            >
              <span>Commencer l&apos;épreuve</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        {/* Modal d'Authentification */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // 2. DISQUALIFICATION PAR TRICHE
  if (examState === 'disqualified') {
    return (
      <div className="rounded-3xl border-4 border-rose-500 bg-rose-50 p-8 sm:p-12 text-center shadow-lg space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-600 text-white text-3xl font-black">
          🚫
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-rose-950">Épreuve Disqualifiée</h2>
          <p className="text-base text-rose-900 font-semibold max-w-lg mx-auto">
            Vous avez accumulé 3 infractions aux règles de surveillance de la certification.
            Par souci d&apos;équité et de rigueur académique, votre session a été clôturée.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 max-w-lg mx-auto text-left border-2 border-rose-300">
          <span className="font-black text-base text-slate-950 block mb-2">
            Journal des infractions relevées :
          </span>
          <ul className="space-y-1 font-mono text-sm text-rose-950 font-bold">
            {infractionHistory.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setExamState('intro')}
          className="rounded-xl bg-slate-900 px-7 py-3 text-base font-bold text-white hover:bg-slate-800 transition shadow cursor-pointer"
        >
          Retourner aux consignes et recommencer dans le respect des règles
        </button>
      </div>
    );
  }

  // 3. BILAN FINAL ET CERTIFICATION
  if (examState === 'submitted') {
    const results = calculateResults();

    return (
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 shadow-md space-y-8 select-text">
        {/* En-tête du résultat */}
        <div
          className={`rounded-2xl p-6 sm:p-8 text-center border-4 ${
            results.passed
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-amber-500 bg-amber-50'
          }`}
        >
          <div className="text-4xl mb-2">{results.passed ? '🎉' : '⚠️'}</div>
          <h2
            className={`text-2xl sm:text-3xl font-black ${
              results.passed ? 'text-emerald-950' : 'text-amber-950'
            }`}
          >
            {results.passed ? 'Certification Validée avec Succès !' : 'Examen Non Validé'}
          </h2>
          <p className="mt-2 text-base text-slate-950 font-semibold max-w-xl mx-auto">
            {results.passed
              ? `Félicitations ${candidateName || 'au candidat'} ! Vous avez démontré une maîtrise complète des compétences du Module ${moduleOrder}.`
              : `Vous avez obtenu ${results.score} / ${results.total} (${results.percentage}%). Le seuil minimal exigé pour l'obtention du certificat est de ${passingScorePercent}%.`}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm border-2 border-slate-300">
              <span className="text-base font-bold text-slate-950 block">Note Finale</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-950">
                {results.percentage} %
              </span>
            </div>
            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm border-2 border-slate-300">
              <span className="text-base font-bold text-slate-950 block">Réponses Exactes</span>
              <span className="text-3xl sm:text-4xl font-black text-indigo-700">
                {results.score} / {results.total}
              </span>
            </div>
            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm border-2 border-slate-300">
              <span className="text-base font-bold text-slate-950 block">Rapport Anti-Triche</span>
              <span
                className={`text-3xl sm:text-4xl font-black ${
                  strikes === 0 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {strikes === 0 ? '0 Infraction ✓' : `${strikes} Alerte(s)`}
              </span>
            </div>
          </div>

          {/* Statut d'enregistrement en base de données */}
          <div className="mt-4 flex items-center justify-center">
            {saveStatus === 'saved' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-black text-emerald-950 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Résultat enregistré sur votre compte
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-300 px-3.5 py-1 text-xs font-black text-blue-950 shadow-xs">
                Enregistrement en cours...
              </span>
            )}
          </div>
        </div>

        {/* Certificat Numérique si Réussi */}
        {results.passed && (
          <div className="relative overflow-hidden rounded-3xl border-4 border-indigo-400 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 sm:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="text-9xl font-black">AI</span>
            </div>

            <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-block rounded-full bg-indigo-500/30 px-4 py-1.5 text-base font-bold text-indigo-200 ring-1 ring-indigo-400">
                Certificat Officiel d&apos;Accomplissement
              </div>

              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Certificat de Réussite
              </h3>

              <p className="text-indigo-200 text-lg">
                Ce document atteste que
              </p>

              <div className="text-3xl sm:text-5xl font-black text-amber-300 tracking-wide underline decoration-amber-400/50 underline-offset-8">
                {candidateName}
              </div>

              <p className="text-indigo-200 text-base max-w-lg mx-auto pt-2 font-medium">
                a validé avec succès l&apos;examen d&apos;évaluation rigoureux du{' '}
                <strong className="text-white font-black">{moduleTitle}</strong> avec une note d&apos;excellence de{' '}
                <strong className="text-emerald-300 font-black">{results.percentage}%</strong>.
              </p>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-indigo-300 border-t border-indigo-800/80 gap-3">
                <span>Délivré le {new Date().toLocaleDateString('fr-FR')}</span>
                <span>Plateforme d&apos;Évaluation AiLearning</span>
                <span>ID d&apos;authenticité : {`${moduleId.slice(-4).toUpperCase()}-${((results.percentage * 104729 + questions.length * 7919) % 900000 + 100000).toString(36).toUpperCase()}`}</span>
              </div>
            </div>
          </div>
        )}

        {/* Corrigé Détaillé Question par Question */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-950">Corrigé Détaillé de l&apos;Épreuve</h3>

          <div className="space-y-4">
            {results.details.map((item, idx) => (
              <div
                key={item.question.id}
                className={`rounded-2xl border-2 p-5 space-y-3 ${
                  item.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-rose-300 bg-rose-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-slate-950">
                      Question {idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-black ${
                        item.isCorrect
                          ? 'bg-emerald-200 text-emerald-950'
                          : 'bg-rose-200 text-rose-950'
                      }`}
                    >
                      {item.isCorrect ? '✓ Exacte' : '✗ Erronée'}
                    </span>
                  </div>
                </div>

                <p className="font-bold text-slate-950 text-base">{item.question.question}</p>

                {item.question.codeSnippet && (
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-sm text-indigo-300 overflow-x-auto">
                    <pre>{item.question.codeSnippet}</pre>
                  </div>
                )}

                <div className="space-y-1.5 text-sm">
                  {item.question.options.map((opt) => {
                    const isExpected = item.expected.includes(opt.letter);
                    const isSelected = item.userSelected.includes(opt.letter);

                    return (
                      <div
                        key={opt.letter}
                        className={`rounded-xl p-3 border ${
                          isExpected
                            ? 'border-emerald-500 bg-emerald-100 font-bold text-emerald-950'
                            : isSelected
                            ? 'border-rose-500 bg-rose-100 text-rose-950 font-bold'
                            : 'border-slate-300 bg-white text-slate-950 font-medium'
                        }`}
                      >
                        <span className="font-black mr-1.5">{opt.letter}.</span>
                        {opt.text}
                        {isExpected && <span className="ml-1 text-emerald-800 font-black">✓ (Bonne réponse)</span>}
                        {isSelected && !isExpected && <span className="ml-1 text-rose-800 font-black">✗ (Votre choix)</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-white p-3.5 border-2 border-slate-300 text-slate-950 font-medium text-base">
                  <span className="font-black text-indigo-700">Explication : </span>
                  {item.question.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t-2 border-slate-300">
          <button
            onClick={() => setExamState('intro')}
            className="rounded-xl border-2 border-slate-400 bg-white px-6 py-3 text-base font-bold text-slate-950 hover:bg-slate-100 cursor-pointer"
          >
            ← Recommencer une nouvelle tentative
          </button>
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-indigo-700 px-6 py-3 text-base font-black text-white shadow hover:bg-indigo-800 cursor-pointer"
          >
            🖨️ Imprimer le Rapport et le Certificat
          </button>
        </div>

        {/* Modal d'Authentification */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // 4. ÉPREUVE EN COURS (MODE RUNNING)
  // Isolation complète en plein écran : couvre tout l'écran par-dessus sidebar et headers
  const isMulti = Boolean(currentQ.isMultiSelect);
  const selectedLetters = userAnswers[currentQ.id] || [];
  const isFlagged = flaggedQuestions.has(currentQuestionIndex);

  return (
    <div
      ref={runnerContainerRef}
      className="fixed inset-0 z-[100] bg-slate-100 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto select-text"
    >
      {/* Alerte Anti-Triche Modale */}
      {antiCheatModal.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border-4 border-rose-500 bg-white p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-2xl font-black">
              ⚠️
            </div>
            <h3 className="text-2xl font-black text-rose-950">
              Avertissement de Surveillance
            </h3>
            <p className="text-base text-slate-950 font-semibold leading-relaxed">
              {antiCheatModal.reason}
            </p>
            <p className="text-base font-black text-rose-700">
              Avertissements accumulés : {strikes} / 3. À 3 avertissements, vous serez disqualifié.
            </p>
            <button
              onClick={async () => {
                setAntiCheatModal({ show: false, reason: '' });
                await requestFullscreen();
              }}
              className="w-full rounded-xl bg-rose-600 py-3 text-base font-black text-white hover:bg-rose-700 shadow-md cursor-pointer"
            >
              Compris, reprendre l&apos;examen en plein écran
            </button>
          </div>
        </div>
      )}

      {/* Modal sophistiquée de confirmation de soumission définitive */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-[115] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 text-2xl shadow-xs">
                🎯
              </div>
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Validation de l&apos;Examen
                </h3>
                <p className="text-sm text-slate-600 font-semibold">
                  Module {moduleOrder} : {moduleTitle}
                </p>
              </div>
            </div>

            {/* Bilan des réponses */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-700">Questions répondues :</span>
                <span className={`font-black ${answeredCount === questions.length ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {answeredCount} / {questions.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-700">Questions marquées pour révision :</span>
                <span className="font-black text-amber-800">
                  {flaggedQuestions.size}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-700">Temps restant :</span>
                <span className="font-black text-indigo-700 font-mono text-base">
                  ⏱️ {formatTimer(secondsRemaining)}
                </span>
              </div>

              {unansweredCount > 0 && (
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-2.5 text-xs font-bold text-amber-950 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Il vous reste {unansweredCount} question(s) sans réponse !</span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 text-xs text-slate-600 font-medium leading-relaxed">
              Une fois validée, l&apos;épreuve sera définitivement clôturée, votre note sera calculée et votre certificat de compétences sera généré.
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmSubmitModal(false)}
                className="w-full sm:w-auto rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Reprendre l&apos;examen
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSubmitExam();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-black text-white hover:bg-emerald-700 shadow-md transition cursor-pointer"
              >
                <span>Confirmer et soumettre</span>
                <span aria-hidden="true">✓</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barre supérieure : Chronomètre et Indicateurs */}
      <div className="mb-4 rounded-2xl border-2 border-slate-300 bg-white px-6 py-3.5 shadow-md flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg text-slate-950">
              Module {moduleOrder} : {moduleTitle}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-black border ${
              isFullscreen
                ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                : 'bg-amber-100 text-amber-950 border-amber-300'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isFullscreen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
              {isFullscreen ? 'Plein écran verrouillé' : 'Fenêtre'}
            </span>
          </div>
          <div className="text-base font-bold text-slate-900 mt-0.5">
            Question {currentQuestionIndex + 1} sur {questions.length} ({answeredCount} répondue(s))
          </div>
        </div>

        {/* Compteur de Temps et Bouton de Validation */}
        <div className="flex items-center gap-4">
          <div
            className={`rounded-xl px-5 py-2 font-mono text-2xl font-black flex items-center gap-2 ${
              secondsRemaining < 300
                ? 'bg-rose-100 text-rose-900 animate-pulse border-2 border-rose-300'
                : 'bg-indigo-100 text-indigo-950 border-2 border-indigo-200'
            }`}
          >
            <span>⏱️</span> {formatTimer(secondsRemaining)}
          </div>

          <button
            onClick={() => setShowConfirmSubmitModal(true)}
            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-base font-black text-white shadow-md hover:bg-emerald-800 transition cursor-pointer"
          >
            Soumettre l&apos;Épreuve
          </button>
        </div>
      </div>

      {/* Contenu de la Question Centrale */}
      <div className="flex-1 rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-indigo-700 px-4 py-1.5 text-base font-black text-white">
              Question {currentQ.id}
            </span>
            {isMulti && (
              <span className="rounded-xl bg-amber-100 px-3 py-1.5 text-base font-black text-amber-950">
                Plusieurs réponses possibles
              </span>
            )}
          </div>

          <button
            onClick={() => toggleFlagQuestion(currentQuestionIndex)}
            className={`rounded-xl px-4 py-2 text-base font-bold transition flex items-center gap-2 cursor-pointer ${
              isFlagged
                ? 'bg-amber-200 text-amber-950 border-2 border-amber-400'
                : 'bg-slate-200 text-slate-950 hover:bg-slate-300'
            }`}
          >
            <span>🚩</span> {isFlagged ? 'Drapeau actif' : 'Marquer pour révision'}
          </button>
        </div>

        {/* Intitulé de la Question */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Snippet de code si présent */}
        {currentQ.codeSnippet && (
          <div className="rounded-2xl bg-slate-950 p-5 font-mono text-base text-indigo-300 overflow-x-auto border-2 border-slate-800">
            <pre className="whitespace-pre">{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options de réponse */}
        <div className="space-y-3.5 pt-2">
          {currentQ.options.map((option) => {
            const isSelected = selectedLetters.includes(option.letter);

            return (
              <div
                key={option.letter}
                onClick={() => handleSelectOption(currentQ.id, option.letter, isMulti)}
                className={`cursor-pointer rounded-2xl border-2 p-5 transition flex items-center gap-4 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500 shadow-md'
                    : 'border-slate-300 bg-white text-slate-950 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center font-black text-base ${
                    isMulti ? 'rounded-lg' : 'rounded-full'
                  } ${
                    isSelected
                      ? 'bg-indigo-700 text-white'
                      : 'border-2 border-slate-400 text-slate-950'
                  }`}
                >
                  {isSelected ? '✓' : option.letter}
                </div>

                <div className="text-lg font-bold leading-relaxed text-slate-950">
                  {option.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation et Palette des Questions */}
      <div className="mt-4 rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-md space-y-4 shrink-0">
        {/* Grille des questions */}
        <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-1">
          {questions.map((q, idx) => {
            const isAns = (userAnswers[q.id] || []).length > 0;
            const isFlag = flaggedQuestions.has(idx);
            const isCurr = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`h-9 w-9 rounded-xl font-mono text-base font-black transition flex items-center justify-center relative cursor-pointer ${
                  isCurr
                    ? 'ring-2 ring-indigo-700 font-black scale-110 shadow-lg'
                    : ''
                } ${
                  isFlag
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : isAns
                    ? 'bg-indigo-700 text-white font-black'
                    : 'bg-slate-200 text-slate-950 hover:bg-slate-300'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>

        {/* Boutons Suivant / Précédent */}
        <div className="flex justify-between items-center pt-3 border-t-2 border-slate-200">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            className="rounded-xl border-2 border-slate-400 bg-white px-6 py-2.5 text-base font-extrabold text-slate-950 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
          >
            ← Précédente
          </button>

          <div className="flex items-center gap-5 text-base font-extrabold text-slate-950">
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-full bg-indigo-700 inline-block" /> Répondu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-full bg-amber-400 inline-block" /> Drapeaux
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-full bg-slate-300 inline-block" /> Non répondu
            </span>
          </div>

          <button
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            className="rounded-xl bg-indigo-700 px-7 py-2.5 text-base font-black text-white hover:bg-indigo-800 disabled:opacity-40 shadow-md cursor-pointer"
          >
            Suivante →
          </button>
        </div>
      </div>

      {/* Modal d'Authentification */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};
