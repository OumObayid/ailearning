import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_1_CHAPTERS } from '@/content/courses/debugging/module-1/data';

export const metadata = {
  title: "Module 1 : Fondamentaux de l'ingénierie du débogage • Ingénierie du Débogage",
  description: "Comprendre les principes fondamentaux du débogage moderne : vocabulaire technique, typologie des erreurs, cycle de vie des anomalies et méthodologie d'investigation.",
};

export default function DebuggingModule1Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 1 — Fondamentaux du Débogage"
        description="Acquérir les bases théoriques et pratiques de l'ingénierie du débogage moderne : distinguez avec précision bug, erreur, anomalie et défaillance logicielle. Maîtrisez le cycle de vie complet d'un incident, établissez un protocole de reproduction contrôlée et apprenez à remonter méthodiquement jusqu'à la cause racine."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 1' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-1" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_1_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-1/${chapter.slug}`}
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
            moduleId="debugging-module-1"
            baseHref="/cours/debugging/module-1"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}

