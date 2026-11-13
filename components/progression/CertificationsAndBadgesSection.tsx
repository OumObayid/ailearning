'use client';

import React, { useState } from 'react';
import { useExamProgress } from '@/context/ExamProgressContext';
import { useChapterProgress } from '@/context/ChapterProgressContext';
import { useAuth } from '@/context/AuthContext';
import { COURSES_CATALOG } from '@/lib/constants';
import { CourseService } from '@/services/courseService';
import { CertificatePDFModal, type CertificateData } from '@/components/courses/CertificatePDFModal';
import { ModulePassedBadge } from '@/components/courses/ModulePassedBadge';
import { Icon } from '@/components/common/Icon';

export const CertificationsAndBadgesSection: React.FC = () => {
  const { user } = useAuth();
  const { passedCourses, moduleScores, getModuleBadgeType } = useExamProgress();
  const { totalCompletedAllCourses } = useChapterProgress();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);

  // Comptage des badges débloqués
  let totalRoyalBadges = 0;
  let totalSuccessBadges = 0;

  COURSES_CATALOG.forEach((course) => {
    const modules = CourseService.getModulesByCourse(course.id);
    modules.forEach((mod) => {
      const badge = getModuleBadgeType(course.id, mod.order);
      if (badge === 'royal') totalRoyalBadges++;
      else if (badge === 'success') totalSuccessBadges++;
    });
  });

  return (
    <div className="space-y-5">
      {/* 1. Résumé des Récompenses d'Excellence — 4 colonnes sans wrap, marges et paddings compacts */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Étoiles de Chapitres */}
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-2.5 sm:p-3 shadow-2xs flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-950 flex items-center justify-center text-lg font-black shrink-0">
            ⭐
          </div>
          <div className="min-w-0 truncate">
            <div className="text-lg sm:text-xl font-black text-amber-950 leading-tight">{totalCompletedAllCourses || 0}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-amber-800 truncate">Étoiles Chapitres</div>
          </div>
        </div>

        {/* Badges Réussite */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-2.5 sm:p-3 shadow-2xs flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-2xs ring-1 ring-white/60">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0 truncate">
            <div className="text-lg sm:text-xl font-black text-emerald-950 leading-tight">{totalSuccessBadges}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-emerald-800 truncate">Réussite (≥ 80%)</div>
          </div>
        </div>

        {/* Badges Royaux */}
        <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50/80 p-2.5 sm:p-3 shadow-2xs flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-amber-950 flex items-center justify-center shrink-0 shadow-2xs border border-amber-600/50 ring-1 ring-white/60">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 16.5L2 6.5l5.5 4 4.5-7 4.5 7 5.5-4-1.5 10h-17z" />
              <path d="M4 18.5h16a1 1 0 011 1v.2a.8.8 0 01-.8.8H3.8a.8.8 0 01-.8-.8v-.2a1 1 0 011-1z" />
              <circle cx="2" cy="5.5" r="1.2" />
              <circle cx="12" cy="2.2" r="1.3" />
              <circle cx="22" cy="5.5" r="1.2" />
            </svg>
          </div>
          <div className="min-w-0 truncate">
            <div className="text-lg sm:text-xl font-black text-amber-950 leading-tight">{totalRoyalBadges}</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-amber-800 truncate">Royaux (100%)</div>
          </div>
        </div>

        {/* Certifications Officielles */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-2.5 sm:p-3 shadow-2xs flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-2xs ring-1 ring-white/60">
            <Icon name="academic-cap" className="w-4 h-4" />
          </div>
          <div className="min-w-0 truncate">
            <div className="text-lg sm:text-xl font-black text-indigo-950 leading-tight">{passedCourses.length} / 4</div>
            <div className="text-[10px] sm:text-[11px] font-bold text-indigo-800 truncate">Diplômes</div>
          </div>
        </div>
      </div>

      {/* 2. SECTION CERTIFICATIONS OFFICIELLES (Téléchargeables en PDF) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
              <span>🎓</span>
              <span>Certifications Officielles des Cursus</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Un diplôme est décerné lorsque tous les modules d&apos;un cours sont validés. Téléchargeable en PDF haute qualité.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {COURSES_CATALOG.map((course) => {
            const isCompleted = passedCourses.includes(course.id);
            const certificateData: CertificateData = {
              studentName: user?.name || 'Étudiant Certifié',
              courseTitle: course.title,
              courseId: course.id,
              completionDate: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }),
              certificateId: `AIL-${course.id.toUpperCase().slice(0, 4)}-${user?.id || 101}-${new Date().getFullYear()}`,
            };

            return (
              <div
                key={course.id}
                className={`rounded-2xl border-2 p-3.5 sm:p-4 flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'border-amber-300 bg-linear-to-br from-amber-50/90 via-white to-amber-50/50 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 opacity-80'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      {course.modulesCount} modules requis
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-950 border border-amber-300">
                        <span>🎓</span>
                        <span>Diplôme Débloqué</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700">
                        <span>🔒</span>
                        <span>En cours</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-950 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
                  {isCompleted ? (
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(certificateData)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-2xs cursor-pointer"
                    >
                      <Icon name="arrow-down-tray" className="w-3.5 h-3.5" />
                      <span>Télécharger mon Diplôme (PDF)</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-semibold italic">
                      Validez tous les modules pour débloquer.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. SECTION BADGES PAR MODULE (Royal 40/40 vs Réussite) */}
      <div className="space-y-3">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-2">
            <span>🎖️</span>
            <span>Galerie des Badges de Modules</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            👑 <strong>Badge Royal</strong> pour un score parfait (40/40) &bull; 🏅 <strong>Badge de Réussite</strong> pour un examen réussi (≥ 80%).
          </p>
        </div>

        <div className="space-y-3">
          {COURSES_CATALOG.map((course) => {
            const modules = CourseService.getModulesByCourse(course.id);
            return (
              <div key={course.id} className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-black text-slate-950">
                    {course.title}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    {modules.length} Modules évalués
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {modules.map((mod) => {
                    const badge = getModuleBadgeType(course.id, mod.order);
                    return (
                      <div
                        key={mod.id}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between space-y-1.5 transition ${
                          badge === 'royal'
                            ? 'border-amber-400 bg-linear-to-tr from-amber-50 to-yellow-50 shadow-2xs'
                            : badge === 'success'
                            ? 'border-emerald-300 bg-emerald-50/50'
                            : 'border-slate-200 bg-slate-50/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-700">
                            Mod. {mod.order}
                          </span>
                          {badge ? (
                            <ModulePassedBadge courseId={course.id} moduleOrder={mod.order} />
                          ) : (
                            <span className="text-[9px] font-bold text-slate-400">
                              🔒 En attente
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] font-bold text-slate-950 line-clamp-1" title={mod.title}>
                          {mod.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal PDF de Diplôme */}
      {selectedCertificate && (
        <CertificatePDFModal
          isOpen={Boolean(selectedCertificate)}
          onClose={() => setSelectedCertificate(null)}
          certificate={selectedCertificate}
        />
      )}
    </div>
  );
};
