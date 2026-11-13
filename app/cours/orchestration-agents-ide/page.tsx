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
  title: "Orchestration d'une équipe d'agents IA dans un IDE — Programme du cours • AiLearning",
  description: "Apprenez à concevoir et piloter une équipe d'agents IA dans votre IDE (Google Antigravity, Git Worktrees, règles AGENTS.md, tests QA et projet pratique TaskFlow).",
};

export default function OrchestrationAgentsIdeCoursePage() {
  const modules = CourseService.getOrchestrationAgentsModules();

  return (
    <div className="space-y-8 w-full">
      {/* 1. Titre principal et Description globale */}
      <PageHeader
        size="large"
        title="Orchestration d'une équipe d'agents IA dans un IDE"
        description="Maîtrisez la conception, la coordination et le contrôle d'une équipe d'agents spécialisés dans votre environnement de développement : Project Manager humain, Team Leader IA, Git Worktrees en parallèle, règles d'instructions strictes, contrôle qualité automatisé et réalisation complète de l'application TaskFlow."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: "Orchestration d'agents IA" },
        ]}
      />

      {/* 2. Illustration visuelle du cours */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/orchestration-agents-ide/orchestration-team-maestro.jpg"
          alt="Illustration du cours Orchestration d'une équipe d'agents IA dans un IDE"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      {/* Progression de lecture générale du cours & Certificat si tous modules validés */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-indigo-200 bg-indigo-50/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <CourseReadingProgressBar courseId="orchestration-agents-ide" />
        </div>
        <CoursePassedBadge courseId="orchestration-agents-ide" className="shrink-0" />
      </div>

      {/* 3. Une carte pour chaque module avec Titre, Petite description et Lien - Grille 1 col par défaut, 2 col sur écran très large */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 min-w-0 max-w-full">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex flex-col justify-between rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100/60 p-4 sm:p-6 shadow-sm hover:border-indigo-400 hover:shadow-indigo-500/10 hover:shadow-md transition min-w-0 max-w-full overflow-hidden"
          >
            <div className="space-y-4 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap min-w-0">
                  <span className="inline-flex items-center rounded-lg bg-white px-2.5 sm:px-3 py-1 text-xs font-black text-indigo-950 border border-indigo-200 shadow-sm shrink-0">
                    Module {module.order}
                  </span>
                  <Icon name={module.iconName || 'users'} className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700 shrink-0" />
                  <ModulePassedBadge courseId="orchestration-agents-ide" moduleOrder={module.order} />
                </div>

                <Link
                  href={`/cours/orchestration-agents-ide/module-${module.order}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-indigo-300/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-indigo-950 hover:bg-indigo-400/80 transition shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Accéder</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>

              <div className="space-y-2 min-w-0">
                <h2
                  className="text-lg sm:text-xl font-black text-slate-950 leading-snug whitespace-normal break-words [overflow-wrap:anywhere]"
                  title={module.title}
                >
                  {module.title}
                </h2>

                <p
                  className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]"
                  title={module.description}
                >
                  {module.description}
                </p>
              </div>
            </div>

            {/* Progression de lecture du module */}
            <div className="pt-3 border-t border-indigo-200/80 mt-4 min-w-0">
              <ModuleReadingProgressBar courseId="orchestration-agents-ide" moduleId={module.order} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

