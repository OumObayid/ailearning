import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_2_CHAPTERS } from '@/content/courses/debugging/module-2/data';

export const metadata = {
  title: 'Module 2 : Techniques et outils fondamentaux de débogage • Ingénierie du Débogage',
  description: "Maîtriser les outils fondamentaux d'investigation : Chrome DevTools, débogueur de Visual Studio Code, Call Stack, breakpoints conditionnels et exécution pas à pas.",
};

export default function DebuggingModule2Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 2 — Chrome DevTools et VS Code"
        description="Maîtrisez l'arsenal d'investigation moderne des développeurs : explorez les fonctionnalités avancées de Chrome DevTools, du débogueur VS Code et de l'inspection mémoire. Configurez des points d'arrêt conditionnels, analysez la pile d'appels (Call Stack) en direct et formulez des hypothèses rigoureusement vérifiables."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 2' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-2" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_2_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-2/${chapter.slug}`}
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
            moduleId="debugging-module-2"
            baseHref="/cours/debugging/module-2"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}

