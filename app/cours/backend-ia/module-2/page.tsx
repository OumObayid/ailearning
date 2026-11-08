import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_2_CHAPTERS } from '@/content/courses/backend-ia/module-2/data';

export const metadata = {
  title: 'Module 2 : Multithreading, Worker Threads & Optimisation CPU • Parcours Backend IA',
  description: 'Maîtriser les Worker Threads Node.js, SharedArrayBuffer, Atomics et les Worker Pools pour les calculs lourds d’IA.',
};

export default function BackendIaModule2Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 2 — Multithreading et Worker Threads"
        description="Maîtrisez la délégation de charges lourdes hors de l'Event Loop : exploitez l'isolation mémoire des processus et la communication multithreadée via Worker Threads Node.js. Comparez le clonage structuré au transfert binaire ultra-rapide, utilisez SharedArrayBuffer avec Atomics et bâtissez un Worker Pool résilient."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 2' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-2" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_2_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-2/${chapter.slug}`}
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
            moduleId="backend-ia-module-2"
            baseHref="/cours/backend-ia/module-2"
          />
        </div>
      </div>
    </div>
  );
}

