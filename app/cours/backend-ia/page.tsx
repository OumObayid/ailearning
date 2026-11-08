import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { Icon } from '@/components/common/Icon';
import { ModulePassedBadge } from '@/components/courses/ModulePassedBadge';

export const metadata = {
  title: 'Parcours Backend IA — Programme du cours • AiLearning',
  description: "Architecture, performance et flux de données pour l'intelligence artificielle : programme complet des 7 modules.",
};

export default function BackendIaCoursePage() {
  const modules = CourseService.getBackendIaModules();

  return (
    <div className="space-y-8 w-full">
      {/* 1. Titre principal et Description globale */}
      <PageHeader
        size="large"
        title="Parcours Backend IA"
        description="Architecture, performance et flux de données pour l'intelligence artificielle : moteur V8, Event Loop libuv, Worker Threads, streaming temps réel, indexation SQL B+Tree, cache Redis et WebGPU/WASM."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA' },
        ]}
      />

      {/* 2. Illustration visuelle du cours */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-amber-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/backend-ia/course-card-amber.jpg"
          alt="Illustration du cours Backend IA"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      {/* 3. Une carte pour chaque module avec Titre, Petite description et Lien */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex flex-col justify-between rounded-2xl border-2 border-amber-200 bg-amber-50/80 hover:bg-amber-100/60 p-4 sm:p-6 shadow-sm hover:border-amber-400 hover:shadow-amber-500/10 hover:shadow-md transition space-y-4 min-w-0"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="inline-flex items-center rounded-lg bg-white px-2.5 sm:px-3 py-1 text-xs font-black text-amber-950 border border-amber-200 shadow-sm">
                    Module {module.order}
                  </span>
                  <Icon name={module.iconName || 'server'} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
                  <ModulePassedBadge courseId="backend-ia" moduleOrder={module.order} />
                </div>

                <Link
                  href={`/cours/backend-ia/module-${module.order}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-amber-300/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-amber-950 hover:bg-amber-400/80 transition shadow-sm shrink-0 cursor-pointer"
                >
                  <span>Accéder au module</span>
                  <Icon name="arrow-right" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              </div>

              <div className="space-y-2 min-w-0">
                <h2
                  className="text-lg sm:text-xl font-black text-slate-950 leading-snug truncate"
                  title={module.title}
                >
                  {module.title}
                </h2>

                <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                  {module.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
