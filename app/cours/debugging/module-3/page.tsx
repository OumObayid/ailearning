import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_3_CHAPTERS } from '@/content/courses/debugging/module-3/data';

export const metadata = {
  title: 'Module 3 : Débogage JavaScript et Node.js • Ingénierie du Débogage',
  description: "Diagnostic approfondi des anomalies JavaScript et Node.js : types, portées, closures, Promises, async/await, Race Conditions et inspection serveur avec Winston.",
};

export default function DebuggingModule3Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 3 — Débogage JavaScript et Node.js"
        description="Maîtrisez le diagnostic approfondi des erreurs d'exécution JavaScript et TypeScript : comprenez la typologie des exceptions du moteur Google V8 et les pièges du typage. Inspectez le Scope lexical, traquez les effets de bord indésirables liés aux closures et résolvez les rejets asynchrones non interceptés dans vos flux."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 3' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-3" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_3_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-3/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="lime"
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <CourseSidebar
            moduleId="debugging-module-3"
            baseHref="/cours/debugging/module-3"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}

