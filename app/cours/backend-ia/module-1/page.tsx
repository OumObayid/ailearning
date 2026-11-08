import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_1_CHAPTERS } from '@/content/courses/backend-ia/module-1/data';

export const metadata = {
  title: 'Module 1 : Architecture interne de Node.js, Mémoire & Event Loop • Parcours Backend IA',
  description: 'Comprendre et maîtriser la gestion mémoire V8, la Stack, le Heap, l’Event Loop et le profiling d’API d’intelligence artificielle.',
};

export default function BackendIaModule1Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 1 — Architecture et Mémoire V8"
        description="Fondations système essentielles pour le développement Backend IA : plongez au cœur du moteur Google V8 et comprenez la gestion mémoire (Stack, Heap et Garbage Collection). Maîtrisez les 6 phases de l'Event Loop libuv, la priorité des microtâches et réalisez le profiling avancé de vos API avec Chrome DevTools."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 1' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-1" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_1_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-1/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="amber"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId="backend-ia-module-1"
            baseHref="/cours/backend-ia/module-1"
          />
        </div>
      </div>
    </div>
  );
}

