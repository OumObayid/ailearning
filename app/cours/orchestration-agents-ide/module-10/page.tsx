import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ORCHESTRATION_MODULE_10_CHAPTERS } from '@/content/courses/orchestration-agents-ide/module-10/data';

export const metadata = {
  title: "Module 10 : Construire TaskFlow avec une équipe d'agents IA — AiLearning",
  description: "Projet pratique fil rouge complet : réalisez l'application TaskFlow (React, Vite, Express) avec votre équipe d'agents IA du cadrage à la livraison.",
};

export default function OrchestrationModule10Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 10 — Construire TaskFlow avec une équipe d'agents IA"
        description="Projet pratique fil rouge complet : réalisez l'application TaskFlow (React, Vite, Express) avec votre équipe d'agents IA du cadrage à la livraison."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: "Orchestration d'agents IA", href: '/cours/orchestration-agents-ide' },
          { label: 'Module 10' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start min-w-0 max-w-full">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4 min-w-0 max-w-full">
          {ORCHESTRATION_MODULE_10_CHAPTERS.map((chapter) => (
            <ChapterCard
              key={chapter.slug}
              number={chapter.number}
              title={chapter.title}
              href={`/cours/orchestration-agents-ide/module-10/${chapter.slug}`}
              duration={chapter.duration}
              description={chapter.description}
              theme="indigo"
            />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6 min-w-0 max-w-full">
          <CourseSidebar
            moduleId="orchestration-agents-module-10"
            baseHref="/cours/orchestration-agents-ide/module-10"
            theme="indigo"
          />
        </aside>
      </div>
    </div>
  );
}
