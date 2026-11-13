import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Icon } from '@/components/common/Icon';
import { ModulePassedBadge } from '@/components/courses/ModulePassedBadge';
import { CourseReadingProgressBar } from '@/components/courses/CourseReadingProgressBar';
import { ModuleReadingProgressBar } from '@/components/courses/ModuleReadingProgressBar';
import { CoursePassedBadge } from '@/components/courses/CoursePassedBadge';

export const metadata = {
  title: 'Ingénierie du Débogage — Programme du cours • AiLearning',
  description: "Formation de référence au diagnostic, à l'analyse causale et à la résolution des anomalies logicielles dans les systèmes modernes.",
};

export default function DebuggingCoursePage() {
  const modules = CourseService.getDebuggingModules();

  return (
    <div className="space-y-8 w-full">
      {/* 1. Titre principal et Description globale */}
      <PageHeader
        size="large"
        title="Ingénierie du Débogage"
        description="Formation technique complète : diagnostic rigoureux, analyse de la cause racine (RCA), maîtrise des outils d'inspection (DevTools, VS Code, Postman, SQL) et collaboration avec les agents IA."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage' },
        ]}
      />

      {/* 2. Illustration visuelle du cours */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-lime-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/debugging/course-card-emerald.jpg"
          alt="Illustration du cours Ingénierie du Débogage"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      {/* Progression de lecture générale du cours & Certificat si tous modules validés */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-lime-200 bg-lime-50/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <CourseReadingProgressBar courseId="debugging" />
        </div>
        <CoursePassedBadge courseId="debugging" className="shrink-0" />
      </div>

      {/* 3. Une carte pour chaque module avec Titre, Petite description et Lien */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex flex-col justify-between rounded-2xl border-2 border-lime-200 bg-lime-50/80 hover:bg-lime-100/60 p-4 sm:p-6 shadow-sm hover:border-lime-400 hover:shadow-lime-500/10 hover:shadow-md transition min-w-0"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="inline-flex items-center rounded-lg bg-white px-2.5 sm:px-3 py-1 text-xs font-black text-lime-950 border border-lime-200 shadow-sm">
                    Module {module.order}
                  </span>
                  <Icon name={module.iconName || 'bug'} className="w-4 h-4 sm:w-5 sm:h-5 text-lime-800" />
                  <ModulePassedBadge courseId="debugging" moduleOrder={module.order} />
                </div>

                <Link
                  href={`/cours/debugging/module-${module.order}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-lime-300/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-lime-950 hover:bg-lime-400/80 transition shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Accéder</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>

              <div className="space-y-2 min-w-0">
                <h2
                  className="text-lg sm:text-xl font-black text-slate-950 leading-snug min-h-[3rem] sm:min-h-[3.5rem] flex items-center"
                  title={module.title}
                >
                  {module.title}
                </h2>

                <p
                  className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed min-h-[8.5rem] sm:min-h-[9.5rem]"
                  title={module.description}
                >
                  {module.description}
                </p>
              </div>
            </div>

            {/* Barre de lecture du module — alignée au même niveau */}
            <div className="pt-3 border-t border-lime-200/80 mt-4">
              <ModuleReadingProgressBar courseId="debugging" moduleId={module.order} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

