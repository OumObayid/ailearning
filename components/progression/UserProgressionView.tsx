'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import type { UserProgressionResponse, CourseProgression } from '@/services/progressionService';
import { CourseReadingProgressBar } from '@/components/courses/CourseReadingProgressBar';
import { ModuleReadingProgressBar } from '@/components/courses/ModuleReadingProgressBar';

interface UserProgressionViewProps {
  data: UserProgressionResponse;
  isAdminView?: boolean;
}

const COURSE_CONFIG: Record<
  string,
  { label: string; badge: string; color: string; border: string; bg: string }
> = {
  'ai-engineering': {
    label: 'AI Engineering',
    badge: 'bg-blue-100 text-blue-900 border-blue-300',
    color: 'bg-blue-600',
    border: 'border-blue-400',
    bg: 'bg-blue-50/60',
  },
  'backend-ia': {
    label: 'Backend IA',
    badge: 'bg-amber-100 text-amber-950 border-amber-400',
    color: 'bg-amber-600',
    border: 'border-amber-400',
    bg: 'bg-amber-50/60',
  },
  'prompt-engineering-ide': {
    label: 'Prompt Engineering IDE',
    badge: 'bg-purple-100 text-purple-950 border-purple-300',
    color: 'bg-purple-600',
    border: 'border-purple-400',
    bg: 'bg-purple-50/60',
  },
  debugging: {
    label: 'Ingénierie du Débogage',
    badge: 'bg-lime-100 text-lime-950 border-lime-300',
    color: 'bg-lime-600',
    border: 'border-lime-400',
    bg: 'bg-lime-50/60',
  },
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '< 1 min';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins} min`;
  return `${mins}m ${secs}s`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export function UserProgressionView({ data, isAdminView = false }: UserProgressionViewProps) {
  const { courses, exams } = data;

  // Filtres pour le tableau des examens
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'passed' | 'failed'>('all');

  // Cours actif pour le schéma des modules
  const [activeCourseId, setActiveCourseId] = useState<string>(
    courses.length > 0 ? courses[0].id : 'ai-engineering'
  );

  // Filtrage du tableau des examens
  const filteredExams = useMemo(() => {
    return exams.filter((ex) => {
      if (courseFilter !== 'all' && ex.courseId !== courseFilter) {
        return false;
      }
      if (resultFilter === 'passed' && !ex.passed) {
        return false;
      }
      if (resultFilter === 'failed' && ex.passed) {
        return false;
      }
      return true;
    });
  }, [exams, courseFilter, resultFilter]);

  // Cours sélectionné pour le détail par modules
  const activeCourse: CourseProgression =
    courses.find((c) => c.id === activeCourseId) || courses[0] || {
      id: 'ai-engineering',
      title: 'AI Engineering',
      slug: 'ai-engineering',
      modulesCount: 8,
      evaluatedModulesCount: 0,
      passedCount: 0,
      averageScore: 0,
      modules: [],
    };

  // Statistiques globales de l'utilisateur
  const totalPassedModules = courses.reduce((acc, c) => acc + c.passedCount, 0);
  const totalModulesCount = courses.reduce((acc, c) => acc + c.modulesCount, 0);
  const totalCompletedCourses = courses.filter(
    (c) => c.modulesCount > 0 && c.passedCount === c.modulesCount
  ).length;

  return (
    <div className="space-y-6">
      {/* ==================================================================== */}
      {/* 1. RÉSUMÉ STATISTIQUES CLÉ                                           */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-500">Examens passés</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {exams.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Tentatives enregistrées</div>
        </div>

        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-500">Modules validés (≥ 80%)</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            {totalPassedModules} / {totalModulesCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Sur l&apos;ensemble du catalogue</div>
        </div>

        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-500">Cursus complétés</div>
          <div className="text-2xl font-black text-indigo-700 mt-1 font-mono">
            {totalCompletedCourses} / {courses.length}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Formations validées à 100%</div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. SCHÉMA DE PROGRESSION GÉNÉRAL (4 COURS => 4 MOYENNES GÉNÉRALES)   */}
      {/* ==================================================================== */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Icon name="chart-bar" className="w-5 h-5 text-indigo-700" />
            <span>Schéma de Progression Général (4 Cursus complets)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span>Seuil de réussite exigé :</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono">
              ≥ 80%
            </span>
          </span>
        </div>

        {/* Grille des moyennes générales (2 cartes par ligne, 2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const cfg = COURSE_CONFIG[course.id] || {
              label: course.title,
              badge: 'bg-slate-100 text-slate-800 border-slate-200',
              color: 'bg-slate-600',
              border: 'border-slate-200',
              bg: 'bg-slate-50',
            };

            const isPassed = course.averageScore >= 80;
            const hasEvaluations = course.evaluatedModulesCount > 0;

            return (
              <div
                key={course.id}
                onClick={() => setActiveCourseId(course.id)}
                className={cn(
                  "rounded-2xl border-2 p-4 transition-all cursor-pointer flex flex-col justify-between gap-3 min-h-[165px]",
                  activeCourseId === course.id
                    ? `${cfg.border} ${cfg.bg} ring-2 ring-indigo-500/20 shadow-xs`
                    : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/70"
                )}
              >
                <div className="space-y-2">
                  {/* Ligne 1 : Badge officiel du cours */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-black border whitespace-nowrap", cfg.badge)}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Ligne 2 : Moyenne générale & Ratio X/Y réussis parfaitement alignés */}
                  <div className="flex items-baseline justify-between gap-2 pt-0.5">
                    <div>
                      <span
                        className={cn(
                          "text-2xl sm:text-3xl font-black font-mono leading-none tracking-tight",
                          hasEvaluations
                            ? isPassed ? "text-emerald-700" : "text-amber-700"
                            : "text-slate-400"
                        )}
                      >
                        {hasEvaluations ? `${course.averageScore}%` : '0%'}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs shrink-0">
                      <span className="text-xs font-mono font-black text-slate-900">
                        {course.passedCount}/{course.modulesCount}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">réussis</span>
                    </div>
                  </div>

                  {/* Ligne 3 : Libellé explicatif */}
                  <div className="text-[11px] text-slate-500 font-medium">
                    Moyenne générale du cours
                  </div>
                </div>

                {/* Ligne 4 : Barre de progression avec marqueur de validation à 80% */}
                <div className="space-y-1 pt-1 border-t border-slate-100/80">
                  <div className="relative h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        isPassed ? "bg-emerald-600" : hasEvaluations ? "bg-amber-500" : "bg-slate-300"
                      )}
                      style={{ width: `${course.averageScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>0%</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded border border-emerald-200">80%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Progression de lecture générale du cours */}
                <div className="pt-2 border-t border-slate-100">
                  <CourseReadingProgressBar courseId={course.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. SCHÉMA DE PROGRESSION PAR COURS (SUIVANT LES MODULES => NOTES)    */}
      {/* ==================================================================== */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
        <div className="space-y-3 border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Icon name="chart-bar" className="w-5 h-5 text-indigo-700" />
            <span>Schéma de Progression par Cursus</span>
          </h3>

          {/* Sélecteur rapide des 4 cours en pleine largeur */}
          <div className="flex flex-wrap items-center gap-2">
            {courses.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCourseId(c.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer",
                  activeCourseId === c.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {COURSE_CONFIG[c.id]?.label || c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Schéma graphique visuel des modules : Barres de notes */}
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-2.5">
            {activeCourse.modules.map((m) => {
              const hasScore = m.score !== null;
              const isPassed = hasScore && m.score! >= 80;
              const heightPercent = hasScore ? Math.max(m.score!, 10) : 6;

              return (
                <div
                  key={m.order}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 flex flex-col justify-between items-center text-center space-y-2"
                >
                  <span className="text-[10px] font-black uppercase text-slate-500 font-mono">
                    Mod. {m.order}
                  </span>

                  {/* Jauge verticale miniature */}
                  <div className="h-24 w-8 rounded-xl bg-slate-200/80 p-1 flex flex-col justify-end items-center relative overflow-hidden">
                    {/* Ligne repère du seuil 80% */}
                    <div
                      className="absolute w-full border-b border-dashed border-emerald-500 z-10 left-0"
                      style={{ bottom: '80%' }}
                      title="Seuil minimal : 80%"
                    />
                    <div
                      className={cn(
                        "w-full rounded-lg transition-all",
                        isPassed ? "bg-emerald-600" : hasScore ? "bg-amber-500" : "bg-slate-300"
                      )}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Note affichée sous la jauge */}
                  <div className="space-y-0.5">
                    <div className="font-mono font-black text-xs">
                      {hasScore ? (
                        <span className={isPassed ? "text-emerald-700" : "text-amber-700"}>
                          {m.score}%
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">-</span>
                      )}
                    </div>
                    <div
                      className="text-[10px] text-slate-600 font-medium truncate max-w-[80px]"
                      title={m.title}
                    >
                      {m.title}
                    </div>

                    {/* Jauge compacte de lecture du module */}
                    <div className="w-full pt-1">
                      <ModuleReadingProgressBar
                        courseId={activeCourse.id}
                        moduleId={m.order}
                        compact={true}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. TABLEAU DES EXAMENS PASSÉS CLASSÉS PAR COURS PUIS PAR MODULE      */}
      {/* ==================================================================== */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
        <div className="space-y-3 border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Icon name="academic-cap" className="w-5 h-5 text-indigo-700" />
            <span>Tableau des Épreuves (Classé par cours puis par module)</span>
          </h3>

          {/* Filtres du tableau en pleine largeur */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filtre Cursus */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les cours</option>
              <option value="ai-engineering">AI Engineering</option>
              <option value="backend-ia">Backend IA</option>
              <option value="prompt-engineering-ide">Prompt Engineering IDE</option>
              <option value="debugging">Ingénierie du Débogage</option>
            </select>

            {/* Filtre Résultat */}
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value as 'all' | 'passed' | 'failed')}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les résultats</option>
              <option value="passed">Réussis (≥ 80%)</option>
              <option value="failed">Échoués (&lt; 80%)</option>
            </select>

            {/* Bouton icône Réinitialisation des filtres */}
            {(courseFilter !== 'all' || resultFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setCourseFilter('all');
                  setResultFilter('all');
                }}
                className="h-7 w-7 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition flex items-center justify-center cursor-pointer shadow-xs"
                title="Réinitialiser les filtres"
                aria-label="Réinitialiser les filtres"
              >
                <Icon name="rotate-ccw" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Table épurée */}
        {filteredExams.length === 0 ? (
          <div className="py-8 text-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
            Aucun examen enregistré pour cet utilisateur avec ces filtres.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 font-black uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-2.5">Cours</th>
                  <th className="py-2.5 px-2.5">Module</th>
                  <th className="py-2.5 px-2 text-center">Score</th>
                  <th className="py-2.5 px-2 text-center">Statut</th>
                  <th className="py-2.5 px-2">Date</th>
                  <th className="py-2.5 px-2 text-right">Temps</th>
                  {!isAdminView && <th className="py-2.5 px-2 text-right">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredExams.map((ex) => {
                  const meta = COURSE_CONFIG[ex.courseId];
                  const examHref = `/examens/${ex.courseId}/module-${ex.moduleOrder}`;

                  return (
                    <tr key={ex.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-2 px-2.5 whitespace-nowrap align-middle">
                        <span className={cn("px-2 py-0.5 rounded text-[10px] font-black border", meta?.badge || 'bg-slate-100')}>
                          {meta?.label || ex.courseId}
                        </span>
                      </td>

                      <td className="py-2 px-2.5 align-middle">
                        <div className="font-bold text-slate-900 leading-snug whitespace-normal break-words max-w-[220px]" title={ex.moduleTitle}>
                          {ex.moduleTitle}
                        </div>
                      </td>

                      <td className="py-2 px-2 text-center whitespace-nowrap align-middle">
                        <span className={cn("font-mono font-black text-xs sm:text-sm", ex.score >= 80 ? "text-emerald-700" : "text-amber-700")}>
                          {ex.score}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono ml-1">
                          ({ex.correctAnswersCount}/{ex.totalQuestions})
                        </span>
                      </td>

                      <td className="py-2 px-2 text-center whitespace-nowrap align-middle">
                        <span
                          className={cn(
                            "inline-block px-2 py-0.5 rounded-full text-[10px] font-black border",
                            ex.score >= 80
                              ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                              : "bg-amber-100 text-amber-950 border-amber-300"
                          )}
                        >
                          {ex.score >= 80 ? '✓ Réussi' : 'Échoué'}
                        </span>
                      </td>

                      <td className="py-2 px-2 whitespace-nowrap text-slate-500 font-mono text-[11px] align-middle">
                        {formatDate(ex.createdAt)}
                      </td>

                      <td className="py-2 px-2 text-right whitespace-nowrap font-mono text-slate-600 text-[11px] align-middle">
                        {formatDuration(ex.timeSpentSeconds)}
                      </td>

                      {!isAdminView && (
                        <td className="py-2 px-2 text-right whitespace-nowrap align-middle">
                          <Link
                            href={examHref}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-800 border border-slate-300 hover:border-indigo-300 px-2 py-1 text-[11px] font-bold text-slate-700 transition"
                          >
                            <span>Refaire</span>
                            <Icon name="arrow-right" className="w-3 h-3" />
                          </Link>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

