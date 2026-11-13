import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ORCHESTRATION_MODULE_2_CHAPTERS } from '@/content/courses/orchestration-agents-ide/module-2/data';

export const metadata = {
  title: "Module 2 : Concevoir l'organisation d'une équipe d'agents IA — AiLearning",
  description: "Définissez une hiérarchie collaborative structurée : Project Manager humain, Team Leader IA, agents spécialisés et protocoles de validation.",
};

export default function OrchestrationModule2Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 2 — Concevoir l'organisation d'une équipe d'agents IA"
        description="Définissez une hiérarchie collaborative structurée : Project Manager humain, Team Leader IA, agents spécialisés et protocoles de validation."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: "Orchestration d'agents IA", href: '/cours/orchestration-agents-ide' },
          { label: 'Module 2' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start min-w-0 max-w-full">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4 min-w-0 max-w-full">
          {ORCHESTRATION_MODULE_2_CHAPTERS.map((chapter) => (
            <ChapterCard
              key={chapter.slug}
              number={chapter.number}
              title={chapter.title}
              href={`/cours/orchestration-agents-ide/module-2/${chapter.slug}`}
              duration={chapter.duration}
              description={chapter.description}
              theme="indigo"
            />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6 min-w-0 max-w-full">
          <CourseSidebar
            moduleId="orchestration-agents-module-2"
            baseHref="/cours/orchestration-agents-ide/module-2"
            theme="indigo"
          />
        </aside>
      </div>
    </div>
  );
}
