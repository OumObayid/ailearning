import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_6_CHAPTERS } from '@/content/courses/debugging/module-6/data';

export const metadata = {
  title: 'Module 6 : Ingénierie du débogage assistée par IA • Ingénierie du Débogage',
  description: "Ingénierie du débogage assistée par IA : prompts structurés, analyse de logs, détection d'hallucinations, agents IDE sous Antigravity et validation par tests Vitest et Supertest.",
};

export default function DebuggingModule6Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 6 — Diagnostic assisté par IA"
        description="Adoptez une méthodologie d'investigation assistée par l'intelligence artificielle : formulez des prompts de diagnostic structurés et analysez de volumineux journaux d'erreurs (logs). Identifiez avec un regard critique les risques d'hallucinations techniques et validez chaque correctif par des tests de non-régression ciblés."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 6' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-6" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_6_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-6/${chapter.slug}`}
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
            moduleId="debugging-module-6"
            baseHref="/cours/debugging/module-6"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}
