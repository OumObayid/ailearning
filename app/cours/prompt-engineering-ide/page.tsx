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
  title: 'Prompt Engineering pour les Agents IA dans les IDE — Programme du cours • AiLearning',
  description: "Maîtriser la conception de prompts professionnels et le pilotage d'agents de développement dans les IDE (Antigravity, VS Code, Cursor).",
};

export default function PromptEngineeringIdeCoursePage() {
  const modules = CourseService.getPromptEngineeringModules();

  return (
    <div className="space-y-8 w-full">
      {/* 1. Titre principal et Description globale */}
      <PageHeader
        size="large"
        title="Prompt Engineering pour les Agents IA dans les IDE"
        description="Formation de référence au prompt engineering pour agents de développement : structure des instructions, gestion des tokens, élimination des ambiguïtés et maîtrise des 4 niveaux d'intervention dans l'IDE."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE' },
        ]}
      />

      {/* 2. Illustration visuelle du cours */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/prompt-engineering-ide/course-card-purple.jpg"
          alt="Illustration du cours Prompt Engineering pour les Agents IA dans les IDE"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      {/* Progression de lecture générale du cours & Certificat si tous modules validés */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-purple-200 bg-purple-50/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <CourseReadingProgressBar courseId="prompt-engineering-ide" />
        </div>
        <CoursePassedBadge courseId="prompt-engineering-ide" className="shrink-0" />
      </div>

      {/* 3. Une carte pour chaque module avec Titre, Petite description et Lien */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex flex-col justify-between rounded-2xl border-2 border-purple-200 bg-purple-50/80 hover:bg-purple-100/60 p-4 sm:p-6 shadow-sm hover:border-purple-400 hover:shadow-purple-500/10 hover:shadow-md transition min-w-0"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="inline-flex items-center rounded-lg bg-white px-2.5 sm:px-3 py-1 text-xs font-black text-purple-950 border border-purple-200 shadow-sm">
                    Module {module.order}
                  </span>
                  <Icon name={module.iconName || 'sparkles'} className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" />
                  <ModulePassedBadge courseId="prompt-engineering-ide" moduleOrder={module.order} />
                </div>

                <Link
                  href={`/cours/prompt-engineering-ide/module-${module.order}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-purple-300/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-purple-950 hover:bg-purple-400/80 transition shadow-sm shrink-0 cursor-pointer"
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

            {/* Progression de lecture du module — alignée au même niveau */}
            <div className="pt-3 border-t border-purple-200/80 mt-4">
              <ModuleReadingProgressBar courseId="prompt-engineering-ide" moduleId={module.order} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

